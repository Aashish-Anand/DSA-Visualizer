# DSA Visualizer — Architecture & Agent Context

This document serves as a "brain dump" and architectural guide for any AI assistant or new developer working on this repository. It outlines how the application works, the core concepts, and the strict rules to follow.

## 1. Core Architecture

The visualizer operates on a strict **Generator/Engine/Visualizer** pattern. It completely decouples the algorithmic logic from the UI rendering.

### The Playback Engine (`usePlaybackEngine.ts`)
- **What it is:** A generic React hook (`usePlaybackEngine<T>`) that manages state transitions, playback speed, playing/pausing, and stepping forward/backward.
- **Rule:** Do NOT modify the engine to handle specific algorithm data. It is 100% agnostic. It simply takes an array of `PlaybackStep<T>` and manages the playback index.

### The Generators (`src/algorithms/*/generator.ts`)
- **What it is:** Pure typescript functions that take an input (like an array to sort, or a graph to traverse) and yield an array of `PlaybackStep<T>` objects.
- **Rule:** Generators must run *synchronously* upfront to generate the entire history of the algorithm (all steps from start to finish). Do NOT try to use `setInterval` or React state inside the generators.

### The Visualizers (`src/visualizers/*/`)
- **What it is:** React components (`SortingBarVisualizer`, `LinkedListVisualizer`, `GraphVisualizer`, etc.) that take a single snapshot of state (`state: T`) and render it.
- **Rule:** Visualizers are stateless "dumb" components. They only render what the Generator tells them is happening at the current step. They use `framer-motion` (`layout` props) for smooth transitions.

---

## 2. UI / UX & Layout Rules

1. **Aesthetics are #1:** The app must look premium. Use glassmorphism (`bg-card/50`), glowing effects (`boxShadow: 0 0 20px ...`), and vibrant colors (emerald for sorted/found, amber for checking/curr, primary for active).
2. **Mobile Responsiveness:** 
   - Never use strict `h-screen overflow-hidden` on mobile. The layout must allow vertical scrolling on mobile (`min-h-[100dvh]`).
   - Visualizers MUST be wrapped in `overflow-x-auto` with `min-w-max` or specific widths to allow horizontal swiping. Never squish bars or nodes together so much that text overlaps.

---

## 3. Strict Linting & CI/CD Rules

This project has a highly strict CI/CD pipeline integrated via GitHub Actions and Husky pre-commit hooks.

1. **No `any` types:** The linter strictly forbids `@typescript-eslint/no-explicit-any`. If you must bypass it (e.g., in a generic wrapper), you MUST explicitly use `// eslint-disable-next-line @typescript-eslint/no-explicit-any`.
2. **Unused Variables:** ESLint will fail the build (and abort commits) if there are unused variables or imports. Clean up your code!
3. **React Compiler / Hooks:** Do NOT call `setState()` synchronously inside a `useEffect` body. This triggers `react-hooks/set-state-in-effect` and cascading renders. Compute initial state in the `useState` initializer instead.
4. **TypeScript Deprecations:** The `tsconfig.app.json` includes `"ignoreDeprecations": "6.0"` to suppress the `baseUrl` warning during the CI build.

---

## 4. How to add a new Algorithm
1. Create a folder in `src/algorithms/<name>/`.
2. Write `config.ts` (Title, description, pseudocode).
3. Write `generator.ts` (The pure function returning `PlaybackStep` arrays).
4. Update `src/types/index.ts` with the new specific state type.
5. Create a visualizer in `src/visualizers/` (or reuse an existing one).
6. Register the algorithm in `src/components/Sidebar/Sidebar.tsx` and `src/pages/AlgorithmPage.tsx`.
