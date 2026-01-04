# Frontend Directory

Reserved for future web-based UI for the GitHub Project Populator.

## Overview

This directory is currently a placeholder for a future web-based dashboard that will provide a graphical interface for the GitHub Project Populator tool. The current version of the tool operates via CLI commands.

## Planned Features

When implemented, the frontend will include:

- **Visual Project Template Editor** - Graphical interface to customize WordPress project templates
- **Drag-and-Drop Phase/Task Reordering** - Intuitive task management interface
- **Real-time Project Population Preview** - Preview GitHub Projects before creation
- **Multi-Project Dashboard** - Overview of all 6 parallel projects at once
- **Developer Assignment Matrix** - Visual team workload distribution
- **Progress Tracking Visualization** - Charts and graphs showing project health metrics
- **Client Portal View** - Read-only client-facing project status pages

## Planned Tech Stack

- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **Authentication:** GitHub OAuth integration
- **State Management:** Zustand or Redux Toolkit
- **API Communication:** GraphQL via @octokit/graphql
- **Charts:** Recharts or Chart.js

## Current Status

The frontend is not yet implemented. All functionality is currently available through the backend CLI tool:

- `npm run populate` - Populate a single project
- `npm run batch-create` - Create multiple projects
- `npm run list-projects` - List existing projects

For more information, see the [main README](../reference/README.md) or [project plan](../reference/github_project_plan.md).
