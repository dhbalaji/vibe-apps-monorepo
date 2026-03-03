# Vibe Apps

A monorepo for quick, vibe-coded applications. Build fast, ship faster.

## What's Inside

Quick utility apps built for real-world needs:

### Multi-Store Search
Electron app that compares prices across Amazon, Blinkit, and Zepto in one window. Search once, see all results side-by-side with persistent sessions.

**Location:** `packages/multi-store-search`

## Prerequisites

Before you start, make sure you have:

- **Git** - [Download here](https://git-scm.com/downloads)
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/vibe-apps-monorepo.git
cd vibe-apps-monorepo
```

2. Install dependencies:
```bash
npm install
```

3. Run an app:
```bash
# Multi-Store Search
npm run price-compare
```

## Running Individual Apps

Each app can also be run independently:

```bash
cd packages/multi-store-search
npm install
npm start
```

## Adding New Apps

Create a new package under `packages/` and add a script in the root `package.json`.
