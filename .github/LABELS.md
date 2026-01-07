# Label Reference Guide

This document describes the streamlined label system used in the TarkovTracker repository.

## Philosophy

Labels describe **what** an issue is (type, technical area, priority), not **where** it is in the workflow. Workflow states (needs info, blocked, in progress) are managed through the GitHub Project board columns.

## Label Categories

### Type Labels (What kind of issue/PR)
| Label | Color | Description | When to Use |
|-------|-------|-------------|-------------|
| `bug` | ![#d73a4a](https://via.placeholder.com/15/d73a4a/000000?text=+) `#d73a4a` | Something isn't working | Broken functionality, errors, unexpected behavior |
| `feature` | ![#0e8a16](https://via.placeholder.com/15/0e8a16/000000?text=+) `#0e8a16` | New feature or major addition | Completely new functionality |
| `enhancement` | ![#a2eeef](https://via.placeholder.com/15/a2eeef/000000?text=+) `#a2eeef` | Improvement to existing feature | Making existing features better |
| `dependencies` | ![#0366d6](https://via.placeholder.com/15/0366d6/000000?text=+) `#0366d6` | Dependency updates | npm package updates (often automated) |
| `docs` | ![#0075ca](https://via.placeholder.com/15/0075ca/000000?text=+) `#0075ca` | Documentation changes | README, comments, guides, CONTRIBUTING.md |

### Area Labels (Technical boundaries - which systems are affected)
All area labels use `#c2e0c6` (light green) for visual grouping.

| Label | Description | Examples |
|-------|-------------|----------|
| `area:ui` | Vue components, pages, styling | Component bugs, layout issues, Tailwind CSS, responsive design |
| `area:api` | Nitro server routes, workers, API endpoints | Server routes in `app/server/api/`, Cloudflare Workers, GraphQL proxy |
| `area:database` | Supabase schema, migrations, queries | Database schema, Postgres queries, migrations, RLS policies |
| `area:auth` | Authentication and authorization | Login/logout, Supabase Auth, permissions, session management |
| `area:realtime` | Team sync, Supabase broadcasts | Team features, real-time sync, Supabase Realtime, broadcasts |
| `area:i18n` | Translations and localization | Language files, translation keys, i18n system, locale switching |

**Note:** Issues can have multiple area labels if they affect multiple systems (e.g., `area:ui` + `area:realtime` for team page display issues).

### Priority Labels (How urgent)
| Label | Color | Description | When to Use |
|-------|-------|-------------|-------------|
| `priority:high` | ![#d93f0b](https://via.placeholder.com/15/d93f0b/000000?text=+) `#d93f0b` | Important features/bugs | Critical bugs, security issues, data loss, blocking issues, important features |
| `priority:medium` | ![#fbca04](https://via.placeholder.com/15/fbca04/000000?text=+) `#fbca04` | Normal priority | Standard bugs and features (default) |
| `priority:low` | ![#0e8a16](https://via.placeholder.com/15/0e8a16/000000?text=+) `#0e8a16` | Nice to have | Minor improvements, edge cases, quality-of-life enhancements |

### Special Labels
| Label | Color | Description | When to Use |
|-------|-------|-------------|-------------|
| `good-first-issue` | ![#7057ff](https://via.placeholder.com/15/7057ff/000000?text=+) `#7057ff` | Good for newcomers | Simple, well-defined issues perfect for first-time contributors |
| `help-wanted` | ![#008672](https://via.placeholder.com/15/008672/000000?text=+) `#008672` | Community help needed | Issues where community contributions are especially welcome |
| `upstream` | ![#e99695](https://via.placeholder.com/15/e99695/000000?text=+) `#e99695` | Issue belongs in data-overlay repo | Quest/item data issues that need fixes in the data-overlay repository |

## Label Usage Guidelines

### Combining Labels
Issues and PRs should typically have:
1. **One Type label** (required) - bug, feature, enhancement, dependencies, or docs
2. **One or more Area labels** - Which technical systems are affected
3. **One Priority label** (for issues) - How urgent is it
4. **Zero or more Special labels** - Additional context

### Examples

**Bug in task display:**
```
bug, area:ui, priority:medium
```

**API endpoint missing CORS headers:**
```
bug, area:api, priority:high
```

**Team page shows wrong level:**
```
bug, area:ui, area:realtime, priority:medium
```

**New feature spanning multiple areas:**
```
feature, area:api, area:database, area:auth, priority:high
```

**Enhancement to UI:**
```
enhancement, area:ui, priority:low, good-first-issue
```

**Missing quest data (send to data-overlay):**
```
upstream
```
Close the issue with a comment explaining it belongs in the data-overlay repo and link to where they should report it.

**Dependency update PR:**
```
dependencies
```

### Workflow States (Use Project Board, NOT Labels)

These are **NOT** labels - they're handled by GitHub Project columns:

| ❌ Don't Use Label | ✅ Use Project Column Instead |
|-------------------|-------------------------------|
| ~~needs-info~~ | **Waiting for Info** column |
| ~~blocked~~ | **Blocked** column |
| ~~in-progress~~ | **In Progress** column |
| ~~ready-for-review~~ | **In Review** column |
| ~~duplicate~~ | Close with comment linking to original |
| ~~wontfix~~ | Close with explanation in comment |

### Automated Labeling
- Issue templates automatically apply initial type labels
- Area and priority labels are added during triage
- Dependabot PRs automatically get `dependencies` label

### Label Hygiene
- Keep labels current and accurate
- Update priority as needed
- Add area labels during triage
- Use project board for workflow states

## For Maintainers

### Triage Process
1. Review new issues in **Inbox** column
2. Add **one type label** (usually auto-applied by template)
3. Add **one or more area labels** based on technical systems affected
4. Add **priority label** (default to `priority:medium` if unsure)
5. Add special labels if appropriate:
   - `good-first-issue` for simple, well-defined issues
   - `help-wanted` for community contributions
   - `upstream` if it's a data issue → close with comment
6. Move to appropriate project column:
   - **Waiting for Info** if clarification needed
   - **Blocked** if waiting on external dependency
   - **Backlog** if triaged but not prioritized
   - **Todo** if ready to work on

### Label Management
- Keep labels organized and consistent
- Don't create new labels without team discussion
- Use existing labels whenever possible
- Remove unused labels rather than letting them accumulate

### Data Issues (Quest/Item Data)
When someone reports incorrect quest requirements, missing items, wrong item properties, etc.:

1. Add `upstream` label
2. Close the issue
3. Comment:
   > Thanks for reporting! This is a data issue that needs to be fixed in our data source repository. Please report it at: [link to data-overlay repo issues]
   >
   > We'll pick up the fix once it's merged upstream.

## Quick Reference

**Total Labels: 17**

**By Category:**
- Type: 5 labels (bug, feature, enhancement, dependencies, docs)
- Area: 6 labels (ui, api, database, auth, realtime, i18n)
- Priority: 3 labels (high, medium, low)
- Special: 3 labels (good-first-issue, help-wanted, upstream)

**Most Common Combinations:**
- `bug, area:ui, priority:medium`
- `enhancement, area:ui, priority:low`
- `feature, area:api, priority:high`
- `upstream` (then close)
