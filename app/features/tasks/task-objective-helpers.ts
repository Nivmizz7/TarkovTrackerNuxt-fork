import type { TaskObjective } from '@/types/tarkov';
/**
 * Extended objective interface with optional location data.
 * These fields are present on some objectives from the tarkov.dev API.
 */
interface ObjectiveWithLocation extends TaskObjective {
  zones?: Array<{ map: { id: string }; outline: { x: number; z: number }[] }>;
  possibleLocations?: Array<{
    map: { id: string };
    positions?: { x: number; y?: number; z: number }[];
  }>;
}
/**
 * Checks if an objective has actionable map location data.
 * Used to determine if the "Jump To Map" button should be shown.
 *
 * Only returns true when we have actual coordinate data to jump to:
 * - Zones with non-empty outline arrays
 * - PossibleLocations with non-empty positions arrays
 *
 * Note: We intentionally exclude objectives that only have `maps` without
 * coordinates, as there's no specific point to jump to on the map.
 *
 * @param objective - The basic objective from props
 * @param fullObjective - Optional full objective from metadata store with additional fields
 * @returns true if the objective has actionable coordinate data
 */
export function objectiveHasMapLocation(
  objective: TaskObjective,
  fullObjective?: TaskObjective
): boolean {
  const target = (fullObjective ?? objective) as ObjectiveWithLocation;

  // Check for zones with actual outline coordinates
  const hasZonesWithOutlines =
    Array.isArray(target.zones) &&
    target.zones.some((zone) => Array.isArray(zone.outline) && zone.outline.length > 0);

  // Check for possibleLocations with actual position coordinates
  const hasLocationsWithPositions =
    Array.isArray(target.possibleLocations) &&
    target.possibleLocations.some(
      (loc) => Array.isArray(loc.positions) && loc.positions.length > 0
    );

  return hasZonesWithOutlines || hasLocationsWithPositions;
}
