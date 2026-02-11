# New Nanthu's Kitchen

Authentic Jaffna cuisine restaurant website — built with React, TypeScript, Three.js, and Material UI.

## Tech Stack

- **React 19** with TypeScript
- **Vite** (Rolldown) for build tooling
- **Material UI 7** for component library
- **Three.js** / React Three Fiber for 3D effects
- **Framer Motion** for animations
- **React Router 7** for client-side routing
- **GSAP** for advanced animations

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

## Project Structure

```
src/
+-- components/
¦   +-- common/       # Shared UI components (buttons, forms, backgrounds)
¦   +-- home/         # Landing page sections
¦   +-- menu/         # Menu page with interactive spiral view
¦   +-- special/      # Specials page with 3D coverflow
¦   +-- aboutUs/      # About page with image gallery
¦   +-- footer/       # Footer component
+-- data/             # Menu data and special items
+-- hooks/            # Custom React hooks
+-- theme/            # MUI theme configuration
+-- types/            # TypeScript type definitions
+-- utils/            # Utility functions (validation, accessibility)
```

## Routes

| Path | Page |
|------|------|
| / | Landing page |
| /menu | Interactive menu |
| /special | Chef's specials |
| /about | About us / Gallery |
