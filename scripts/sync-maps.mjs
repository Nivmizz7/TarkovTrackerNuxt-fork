#!/usr/bin/env node
/**
 * Syncs map configuration from tarkov-dev repository.
 * Fetches their maps.json and transforms it to TarkovTracker's minimal format.
 * Merges in local overrides from maps-overrides.json for TarkovTracker-specific settings.
 *
 * Usage: npm run sync:maps
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TARKOV_DEV_MAPS_URL =
  'https://raw.githubusercontent.com/the-hideout/tarkov-dev/main/src/data/maps.json';
const OUTPUT_PATH = join(__dirname, '../app/data/maps.json');
const OVERRIDES_PATH = join(__dirname, '../app/data/maps-overrides.json');

/**
 * Extracts SVG filename from full URL path
 * e.g., "https://assets.tarkov.dev/maps/svg/Customs.svg" -> "Customs.svg"
 */
function extractSvgFilename(svgPath) {
  if (!svgPath) return null;
  const parts = svgPath.split('/');
  return parts[parts.length - 1];
}


/**
 * Extracts unique floor names from layers array
 * Layers have svgLayerName property for the floor they belong to
 */
function extractFloors(layers, defaultLayer) {
  if (!layers || layers.length === 0) {
    return defaultLayer ? [defaultLayer] : ['Ground_Level'];
  }

  const floors = new Set();

  // Add the default/base layer first
  if (defaultLayer) {
    floors.add(defaultLayer);
  }

  // Extract unique floor names from layers
  for (const layer of layers) {
    if (layer.svgLayerName) {
      floors.add(layer.svgLayerName);
    }
    if (layer.name) {
      // Some layers use 'name' instead of 'svgLayerName'
      floors.add(layer.name);
    }
  }

  // Sort floors in a logical order (underground first, then ground, then upper floors)
  const floorOrder = [
    'Underground_Level',
    'Bunkers',
    'Basement',
    'Tunnels',
    'Technical_Level',
    'Ground_Level',
    'Ground_Floor',
    'First_Level',
    'First_Floor',
    'Second_Level',
    'Second_Floor',
    'Third_Level',
    'Third_Floor',
    'Fourth_Floor',
    'Fifth_Floor',
  ];

  return Array.from(floors).sort((a, b) => {
    const aIndex = floorOrder.indexOf(a);
    const bIndex = floorOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

/**
 * Determines default floor from layers or svgLayer
 */
function getDefaultFloor(projection) {
  // If svgLayer is specified, use it
  if (projection.svgLayer) {
    return projection.svgLayer;
  }

  // Otherwise default to Ground_Level
  return 'Ground_Level';
}

/**
 * Transforms a tarkov-dev map entry to TarkovTracker format
 */
function transformMap(mapEntry) {
  // Find the interactive projection (primary map view)
  const interactive = mapEntry.maps?.find((m) => m.projection === 'interactive');

  if (!interactive) {
    // Map has no interactive projection - mark as unavailable
    return { unavailable: true };
  }

  const svgFile = extractSvgFilename(interactive.svgPath);
  const defaultFloor = getDefaultFloor(interactive);
  const floors = extractFloors(interactive.layers, interactive.svgLayer);

  // Determine if this is SVG-based or tile-based
  if (svgFile) {
    // SVG-based map
    const config = {
      svg: {
        file: svgFile,
        floors,
        defaultFloor,
        coordinateRotation: interactive.coordinateRotation,
        transform: interactive.transform,
        bounds: interactive.bounds,
      },
    };

    // Add optional properties if present
    if (interactive.svgBounds) {
      config.svg.svgBounds = interactive.svgBounds;
    }
    if (interactive.stackFloors !== undefined) {
      config.svg.stackFloors = interactive.stackFloors;
    }
    if (interactive.minZoom !== undefined) {
      config.svg.minZoom = interactive.minZoom;
    }
    if (interactive.maxZoom !== undefined) {
      config.svg.maxZoom = interactive.maxZoom;
    }

    return config;
  } else if (interactive.tilePath) {
    // Tile-based map
    return {
      tile: {
        tilePath: interactive.tilePath,
        coordinateRotation: interactive.coordinateRotation,
        transform: interactive.transform,
        bounds: interactive.bounds,
        minZoom: interactive.minZoom ?? 1,
        maxZoom: interactive.maxZoom ?? 6,
      },
    };
  }

  // No valid map data
  return { unavailable: true };
}

/**
 * Maps tarkov-dev normalizedName to our map keys
 */
function normalizeMapKey(normalizedName) {
  const keyMap = {
    'streets-of-tarkov': 'streetsoftarkov',
    'ground-zero': 'groundzero',
    'the-lab': 'lab',
    'the-labyrinth': 'labyrinth',
  };
  return keyMap[normalizedName] || normalizedName;
}

/**
 * Deep merges source object into target
 */
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key === '$comment') continue;
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Loads local overrides file
 */
function loadOverrides() {
  try {
    const content = readFileSync(OVERRIDES_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    console.log('No overrides file found, using tarkov-dev data only');
    return {};
  }
}

async function syncMaps() {
  console.log('Fetching maps from tarkov-dev...');

  const response = await fetch(TARKOV_DEV_MAPS_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch maps: ${response.status} ${response.statusText}`);
  }

  const tarkovDevMaps = await response.json();
  console.log(`Found ${tarkovDevMaps.length} maps`);

  const overrides = loadOverrides();
  const overrideKeys = Object.keys(overrides).filter((k) => k !== '$comment');
  if (overrideKeys.length > 0) {
    console.log(`Loaded ${overrideKeys.length} local overrides: ${overrideKeys.join(', ')}`);
  }

  const result = {};

  for (const mapEntry of tarkovDevMaps) {
    const key = normalizeMapKey(mapEntry.normalizedName);
    const transformed = transformMap(mapEntry);

    // Apply local overrides if they exist
    if (overrides[key]) {
      deepMerge(transformed, overrides[key]);
    }

    result[key] = transformed;
    const hasOverride = overrides[key] ? ' (+ override)' : '';
    console.log(
      `  ${key}: ${transformed.unavailable ? 'unavailable' : transformed.svg ? 'svg' : 'tile'}${hasOverride}`
    );
  }

  // Sort keys alphabetically for consistent output
  const sorted = Object.keys(result)
    .sort()
    .reduce((obj, key) => {
      obj[key] = result[key];
      return obj;
    }, {});

  // Write output
  const json = JSON.stringify(sorted, null, 2) + '\n';
  writeFileSync(OUTPUT_PATH, json);

  console.log(`\nWritten to ${OUTPUT_PATH}`);
  console.log(`Total maps: ${Object.keys(sorted).length}`);
  console.log(
    `  Available: ${Object.values(sorted).filter((m) => !m.unavailable).length}`
  );
  console.log(
    `  Unavailable: ${Object.values(sorted).filter((m) => m.unavailable).length}`
  );
}

syncMaps().catch((err) => {
  console.error('Error syncing maps:', err);
  process.exit(1);
});
