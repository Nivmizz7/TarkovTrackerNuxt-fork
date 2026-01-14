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
 * Checks if an objective has map location data (zones, possibleLocations, or maps).
 * Used to determine if the "Jump to map" button should be shown.
 *
 * @param objective - The basic objective from props
 * @param fullObjective - Optional full objective from metadata store with additional fields
 * @returns true if the objective has any location data
 */
export function objectiveHasMapLocation(
  objective: TaskObjective,
  fullObjective?: TaskObjective
): boolean {
  const target = (fullObjective ?? objective) as ObjectiveWithLocation;
  const hasZones = Array.isArray(target.zones) && target.zones.length > 0;
  const hasLocations =
    Array.isArray(target.possibleLocations) && target.possibleLocations.length > 0;
  const hasMaps = Array.isArray(target.maps) && target.maps.length > 0;
  return hasZones || hasLocations || hasMaps;
}
