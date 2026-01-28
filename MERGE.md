# Merge Guide for Split PRs

This document explains the split pull requests created from the original large PR and how to
merge them safely.

## Summary of PRs

1. CI/CD automation & tooling  
   - Branch: `pr10-ci-tooling`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/11  
   - Content: GitHub workflows, husky hooks, commitlint, renovate, tooling scripts, CI fixes.

2. API retry & error handling  
   - Branch: `pr10-api-reliability`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/12  
   - Content: tarkov.dev retry/error handling + api-protection/logger fixes.

3. Dependency updates  
   - Branch: `pr10-deps`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/13  
   - Content: version bumps in `package.json`, `package-lock.json`, and worker deps.

4. UI refresh core  
   - Branch: `pr10-ui-core`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/14  
   - Content: UI refactors, component updates, styling, assets, and localization.

5. User preferences for task filters  
   - Branch: `pr10-user-preferences`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/15  
   - Base: `pr10-ui-core`  
   - Content: additional task filter preferences + migration + settings UI.

6. Offline mode support  
   - Branch: `pr10-offline-mode`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/16  
   - Content: Supabase offline stub, login UX changes, `.env.example`, cache-meta safety.

7. Docs & Claude plugin  
   - Branch: `pr10-docs-claude`  
   - PR: https://github.com/Nivmizz7/TarkovTrackerNuxt-fork/pull/17  
   - Content: `.claude-plugin`, `AGENTS.md`, `CLAUDE.md`, UI improvement docs.

## Recommended Merge Order

The only hard dependency is #15 on #14. Everything else is independent.

Suggested order:
1. #11 CI/CD automation & tooling
2. #12 API retry & error handling
3. #13 Dependency updates
4. #14 UI refresh core
5. #15 User preferences for task filters (depends on #14)
6. #16 Offline mode support
7. #17 Docs & Claude plugin

If you prefer, #16 and #17 can be merged earlier because they do not depend on the UI changes.

## How to Merge

1. Merge #14 (UI refresh core) first, then #15 (user preferences).  
   - Since #15 is based on `pr10-ui-core`, once #14 is merged you can:
     - merge #15 as-is, or
     - retarget #15’s base to `prod` if you want it to appear as a normal PR.

2. For all PRs:
   - Ensure CI is green before merge.
   - Prefer “Squash and merge” to keep history compact.
   - If you need to preserve full commit history, use “Merge commit”.

## After Merge Checks

- Pull `prod` locally and run:
  - `npm install`
  - `npm run format`
  - `npm run build` (or `npm run generate` if that is the release target)

This validates formatting/linting and confirms the SPA build still completes.
