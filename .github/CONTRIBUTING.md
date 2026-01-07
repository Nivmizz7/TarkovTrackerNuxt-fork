# Contributing to TarkovTracker

Thank you for your interest in contributing to TarkovTracker! This document provides guidelines and information for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Process](#pull-request-process)
- [Label System](#label-system)
- [Project Board](#project-board)
- [Coding Standards](#coding-standards)

## Code of Conduct

Please be respectful and constructive in all interactions. We're building a tool for the Tarkov community together.

## Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Set up environment**: Copy `.env.example` to `.env` and add your Supabase credentials
4. **Start dev server**: `npm run dev`
5. **Read CLAUDE.md** for detailed development guidelines

## Development Workflow

### 1. Find or Create an Issue
- Check existing issues before creating new ones
- Use appropriate issue templates (Bug Report, Feature Request, Enhancement, Data Issue)
- Clearly describe the problem or feature

### 2. Get Assigned
- Comment on the issue to express interest
- Wait for maintainer assignment to avoid duplicate work
- Issues labeled `good-first-issue` are great for newcomers

### 3. Create a Branch
```bash
git checkout -b type/short-description
```

Branch naming convention:
- `fix/issue-description` - Bug fixes
- `feat/feature-name` - New features
- `enhance/improvement` - Enhancements
- `refactor/area-name` - Code refactoring
- `docs/topic` - Documentation
- `chore/task` - Maintenance tasks

### 4. Make Your Changes
- Follow coding standards (see [Coding Standards](#coding-standards))
- Write meaningful commit messages
- Test your changes thoroughly
- Keep PRs focused on a single issue

### 5. Submit a Pull Request
- Use the PR template
- Link related issues
- Provide clear description and test plan
- Add screenshots/videos for UI changes
- Ensure all checks pass

## Issue Guidelines

### Creating Issues

**Use the right template:**
- **Bug Report** - Something isn't working
- **Feature Request** - New feature or major addition
- **Enhancement** - Improvement to existing feature
- **Data Issue** - Incorrect quest/item/game data

**Provide details:**
- Clear, descriptive title
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots when relevant
- Game mode (PvP/PvE)
- Browser/environment info

### Issue Labels

Issues are automatically labeled based on template selection. Maintainers will add additional labels for:
- **Area**: `area:frontend`, `area:backend`, `area:tasks`, `area:team`, etc.
- **Priority**: `priority:critical`, `priority:high`, `priority:medium`, `priority:low`
- **Status**: `status:inbox`, `status:blocked`, `status:needs-info`, etc.
- **Data**: `data:quest`, `data:item` for data-related issues

## Pull Request Process

### Before Submitting

1. **Self-review your code**
   - Remove debug logs and commented code
   - Check for typos and formatting
   - Ensure no secrets or credentials

2. **Test thoroughly**
   - Test manually in browser
   - Run `npm run lint` (must pass with zero warnings)
   - Run `npx vitest` if applicable
   - Test in both PvP and PvE modes if relevant

3. **Update documentation**
   - Update README if adding features
   - Add JSDoc comments for new functions
   - Update CLAUDE.md if changing architecture

### PR Requirements

- Title follows format: `[Type]: Brief description`
- All template sections completed
- Linked to related issue(s)
- Passes all CI checks
- No merge conflicts
- Approved by at least one maintainer

### Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, maintainers will merge
4. Your contribution will be in the next release!

## Label System

### Type Labels
- `type:bug` - Something isn't working (red)
- `type:feature` - New feature or major addition (green)
- `type:enhancement` - Improvement to existing feature (light blue)
- `type:refactor` - Code refactoring (yellow)
- `type:docs` - Documentation changes (blue)
- `type:dependencies` - Dependency updates (blue)
- `type:chore` - Maintenance tasks (cream)

### Area Labels (all light green)
- `area:frontend` - UI/UX components
- `area:backend` - Supabase/Nitro/Workers
- `area:tasks` - Task/quest tracking
- `area:team` - Team features
- `area:hideout` - Hideout tracking
- `area:maps` - Map features
- `area:traders` - Trader features
- `area:i18n` - Translations/localization
- `area:api` - API endpoints

### Priority Labels
- `priority:critical` - Blocking issues, security, data loss (dark red)
- `priority:high` - Important features/bugs (red)
- `priority:medium` - Normal priority (yellow)
- `priority:low` - Nice to have (green)

### Status Labels
- `status:inbox` - Needs triage (gray)
- `status:blocked` - Blocked by external factor (red)
- `status:needs-info` - Waiting for more information (purple)
- `status:in-progress` - Actively being worked on (blue)
- `status:ready-for-review` - PR ready for review (green)

### Data Labels (light pink)
- `data:quest` - Quest data issues
- `data:item` - Item data issues

### Special Labels
- `good-first-issue` - Good for newcomers
- `help-wanted` - Community help needed
- `duplicate` - Duplicate issue
- `wontfix` - Will not be addressed

## Project Board

Our GitHub Project uses these columns:

- **📥 Inbox** - New issues awaiting triage
- **📋 Backlog** - Triaged but not yet prioritized
- **📝 Todo** - Ready to work on, prioritized
- **🚧 In Progress** - Actively being worked on
- **👀 In Review** - PR open, awaiting review
- **✅ Done** - Completed/merged

Issues move automatically based on actions:
- Creating an issue → Inbox
- Opening a PR → In Progress
- Marking PR ready for review → In Review
- Merging PR → Done

## Coding Standards

**See CLAUDE.md for comprehensive coding standards. Key points:**

### TypeScript & Vue
- Use `<script setup lang="ts">` with TypeScript
- Use `<style scoped lang="scss">` for styles
- 2-space indentation, 100-char line width
- Single quotes, semicolons, trailing commas (es5)

### Imports & Structure
- No blank lines between import groups
- Alphabetically sorted imports
- Use `@/` aliases instead of relative parent imports (`../../`)
- PascalCase components, camelCase functions, kebab-case files

### Styling
- Tailwind CSS v4 theme layer only - no hex colors
- Use semantic color variables from theme
- Responsive design (mobile-first)

### Error Handling
- Log errors with `logger` from `@/utils/logger`
- Provide user-friendly error messages
- Handle edge cases gracefully

### Testing
- Write tests for new features
- Keep tests deterministic
- Mock network/Supabase calls
- Run `npx vitest` before submitting

### Git Commits
- Write clear, descriptive commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers when applicable
- Keep commits focused and atomic

## Questions?

- Join our [Discord](https://discord.gg/tarkovtracker)
- Ask in issue comments
- Check existing documentation

Thank you for contributing to TarkovTracker! 🎮
