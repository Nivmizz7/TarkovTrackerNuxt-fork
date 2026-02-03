import { describe, expect, it, vi } from 'vitest';
import { isRef, ref } from 'vue';
import type { HideoutStation } from '@/types/tarkov';
const createStations = (): HideoutStation[] => [
  {
    id: 'station-available',
    name: 'Available Station',
    levels: [
      {
        id: 'station-available-1',
        level: 1,
        description: 'Level 1',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [],
        skillRequirements: [],
        traderRequirements: [],
        crafts: [],
      },
      {
        id: 'station-available-2',
        level: 2,
        description: 'Level 2',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [
          {
            id: 'req-station',
            station: { id: 'station-prereq', name: 'Prereq' },
            level: 1,
          },
        ],
        skillRequirements: [],
        traderRequirements: [],
        crafts: [],
      },
    ],
  },
  {
    id: 'station-skill-locked',
    name: 'Skill Locked Station',
    levels: [
      {
        id: 'station-skill-locked-1',
        level: 1,
        description: 'Level 1',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [],
        skillRequirements: [
          {
            id: 'req-skill',
            name: 'Strength',
            level: 5,
          },
        ],
        traderRequirements: [],
        crafts: [],
      },
    ],
  },
  {
    id: 'station-maxed',
    name: 'Maxed Station',
    levels: [
      {
        id: 'station-maxed-1',
        level: 1,
        description: 'Level 1',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [],
        skillRequirements: [],
        traderRequirements: [],
        crafts: [],
      },
    ],
  },
  {
    id: 'station-locked',
    name: 'Locked Station',
    levels: [
      {
        id: 'station-locked-1',
        level: 1,
        description: 'Level 1',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [
          {
            id: 'req-missing',
            station: { id: 'station-missing', name: 'Missing' },
            level: 1,
          },
        ],
        skillRequirements: [],
        traderRequirements: [],
        crafts: [],
      },
      {
        id: 'station-locked-2',
        level: 2,
        description: 'Level 2',
        constructionTime: 0,
        itemRequirements: [],
        stationLevelRequirements: [],
        skillRequirements: [],
        traderRequirements: [],
        crafts: [],
      },
    ],
  },
];
const createProgressStore = () => ({
  hideoutLevels: {
    'station-available': { self: 1 },
    'station-maxed': { self: 1 },
    'station-locked': { self: 0 },
    'station-prereq': { self: 1 },
  },
  visibleTeamStores: { self: {} },
});
const setup = async (view: string) => {
  const hideoutStations = createStations();
  const metadataStore = {
    hideoutStations: ref(hideoutStations),
    hideoutLoading: ref(false),
    hasInitialized: true,
  };
  const progressStore = createProgressStore();
  const tarkovStore = {
    getCurrentProgressData: () => ({
      skills: { Strength: 1 },
    }),
    getSkillLevel: (_name: string) => 0,
    getTraderLevel: (_id: string) => 1,
  };
  const preferencesStore = {
    getHideoutPrimaryView: view,
    setHideoutPrimaryView: vi.fn(),
    getHideoutSortReadyFirst: false,
    getHideoutRequireStationLevels: true,
    getHideoutRequireSkillLevels: true,
    getHideoutRequireTraderLoyalty: true,
  };
  vi.resetModules();
  vi.doMock('pinia', async () => {
    const actual = await vi.importActual<typeof import('pinia')>('pinia');
    return {
      ...actual,
      storeToRefs: (store: Record<string, unknown>) => {
        const refs: Record<string, unknown> = {};
        Object.entries(store).forEach(([key, value]) => {
          refs[key] = isRef(value) ? value : ref(value);
        });
        return refs;
      },
    };
  });
  vi.doMock('@/stores/useMetadata', () => ({
    useMetadataStore: () => metadataStore,
  }));
  vi.doMock('@/stores/useProgress', () => ({
    useProgressStore: () => progressStore,
  }));
  vi.doMock('@/stores/usePreferences', () => ({
    usePreferencesStore: () => preferencesStore,
  }));
  vi.doMock('@/stores/useTarkov', () => ({
    useTarkovStore: () => tarkovStore,
  }));
  const { useHideoutFiltering } = await import('@/composables/useHideoutFiltering');
  return {
    hideoutFiltering: useHideoutFiltering(),
  };
};
describe('useHideoutFiltering', () => {
  it('calculates station counts', async () => {
    const { hideoutFiltering } = await setup('all');
    expect(hideoutFiltering.stationCounts.value).toEqual({
      available: 2,
      maxed: 1,
      locked: 1,
      all: 4,
    });
  });
  it('shows available stations when filtered', async () => {
    const { hideoutFiltering } = await setup('available');
    expect(hideoutFiltering.visibleStations.value.map((station) => station.id)).toEqual([
      'station-available',
      'station-skill-locked',
    ]);
  });
  it('shows maxed stations when filtered', async () => {
    const { hideoutFiltering } = await setup('maxed');
    expect(hideoutFiltering.visibleStations.value.map((station) => station.id)).toEqual([
      'station-maxed',
    ]);
  });
  it('shows locked stations when filtered', async () => {
    const { hideoutFiltering } = await setup('locked');
    expect(hideoutFiltering.visibleStations.value.map((station) => station.id)).toEqual([
      'station-locked',
    ]);
  });
  it('shows all stations when view is "all"', async () => {
    const { hideoutFiltering } = await setup('all');
    expect(hideoutFiltering.visibleStations.value.map((station) => station.id)).toEqual([
      'station-available',
      'station-skill-locked',
      'station-maxed',
      'station-locked',
    ]);
  });
});
