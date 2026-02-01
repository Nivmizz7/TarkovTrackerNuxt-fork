# useNeededItems Composable Design

**Date:** 2026-02-01
**Status:** Approved
**Issue:** CodeRabbit review suggestion to extract filtering/grouping logic from needed-items.vue

## Overview

Extract heavy filtering, grouping, and sorting logic from `app/pages/needed-items.vue` (~730 lines) into a dedicated `useNeededItems` composable to keep the page lean and testable.

## Motivation

The needed-items page currently owns substantial data shaping logic:

- `allItems` - aggregates and deduplicates task objectives + hideout modules
- `filteredItems` - applies 8+ filter conditions
- `groupedItems` - groups by itemId with aggregated counts
- `objectivesByItemId` - maps item IDs to their objectives
- `filterTabsWithCounts` - calculates counts per filter tab
- Sorting logic (priority, name, count)

This violates the principle of keeping page files lean and makes testing difficult.

## Design Decisions

### Separation of Concerns

**Composable handles (data layer):**

- All filter state bindings (persisted to preferences)
- Data aggregation, filtering, grouping, sorting
- Loading state management
- Tab count calculations

**Page keeps (presentation layer):**

- Local `search` ref (not persisted)
- Infinite scroll state (`visibleCount`, sentinels, `loadMore`)
- Screen-size adjusted render counts
- Template and lifecycle hooks

### API Design

```typescript
export interface UseNeededItemsOptions {
  search?: Ref<string>;
}

export function useNeededItems(options: UseNeededItemsOptions = {}) {
  return {
    // Filter bindings (two-way with preferences store)
    activeFilter, // 'all' | 'tasks' | 'hideout' | 'completed'
    firFilter, // 'all' | 'fir' | 'non-fir'
    groupByItem, // boolean
    hideNonFirSpecialEquipment, // boolean
    hideTeamItems, // boolean
    kappaOnly, // boolean
    hideOwned, // boolean
    sortBy, // 'priority' | 'name' | 'category' | 'count'
    sortDirection, // 'asc' | 'desc'
    viewMode, // 'list' | 'grid'
    cardStyle, // 'compact' | 'expanded'

    // Core data
    allItems, // ComputedRef<(NeededItemTaskObjective | NeededItemHideoutModule)[]>
    filteredItems, // ComputedRef<...[]> - filtered and sorted
    groupedItems, // ComputedRef<GroupedNeededItem[]>
    displayItems, // ComputedRef<...[]> - grouped or individual
    objectivesByItemId, // ComputedRef<Map<string, {...}>>
    filterTabsWithCounts, // ComputedRef<FilterTab[]>

    // Loading state
    itemsReady, // ComputedRef<boolean>
    itemsError, // ComputedRef<Error | null>
    itemsFullLoaded, // ComputedRef<boolean>
    ensureNeededItemsData, // () => void
    queueFullItemsLoad, // (options?) => void
  };
}
```

### Store Dependencies

- `useMetadataStore` - items, tasks, hideout stations, editions
- `useProgressStore` - completions, faction
- `usePreferencesStore` - filter preferences (read/write)
- `useTarkovStore` - game edition, objective/hideout counts

### Filtering Pipeline (in order)

1. **Completion status** - completed vs incomplete, filter by type
2. **FIR status** - fir / non-fir / all
3. **Special equipment** - hide non-FIR special equipment
4. **Kappa-only** - filter to kappa-required quests
5. **Hide owned** - filter out fully collected items
6. **Search** - fuzzy match on item/task/station names
7. **Sort** - by priority/name/category/count with direction

## File Structure

```
app/composables/
├── useNeededItems.ts              (~300 lines)
└── __tests__/
    └── useNeededItems.test.ts     (~260 lines)
```

## Implementation Plan

### Phase 1: Create Composable

1. Create `app/composables/useNeededItems.ts`
2. Set up store imports and filter bindings
3. Extract `allItems` computed with aggregation logic
4. Extract `isParentCompleted` helper
5. Extract `filterTabsWithCounts` computed
6. Extract `filteredItems` with full filtering pipeline
7. Extract `groupedItems` and `objectivesByItemId`
8. Extract `displayItems` selector
9. Extract `queueFullItemsLoad` and watchers
10. Export composable function

### Phase 2: Refactor Page

1. Import `useNeededItems` composable
2. Create local `search` ref and pass to composable
3. Destructure all bindings from composable
4. Remove extracted logic (~400 lines)
5. Keep infinite scroll state and functions
6. Verify template bindings unchanged

### Phase 3: Add Tests

1. Create test file following `useTaskFiltering.test.ts` pattern
2. Set up store mocks with factory functions
3. Test filtering logic (each filter condition)
4. Test grouping logic (count aggregation)
5. Test sorting logic (each sort mode)

### Phase 4: Verify

1. Run `npx vitest` - ensure all tests pass
2. Run `npm run dev` - manual testing
3. Test all filter combinations
4. Verify infinite scroll works

## Testing Strategy

Follow `useTaskFiltering.test.ts` pattern:

- Use `vi.doMock()` with `vi.resetModules()` for store mocks
- Create factory functions for test data
- Async setup function that imports after mocking
- Organize tests by feature (filtering, grouping, sorting)

## Success Criteria

- [ ] Page reduced from ~730 lines to ~250 lines
- [ ] Composable is ~300 lines with clear structure
- [ ] All existing functionality preserved
- [ ] Tests cover filtering, grouping, sorting logic
- [ ] No TypeScript errors
- [ ] All existing tests pass
