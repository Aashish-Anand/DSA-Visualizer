# DSA Visual — Learn Algorithms by Seeing

A visual, interactive learning platform that helps beginners understand **Data Structures & Algorithms** through step-by-step animations and beginner-friendly explanations.

> **No backend required.** All algorithm execution happens entirely in the browser.

![Bubble Sort visualization with animated histogram bars](https://img.shields.io/badge/Algorithms-2-7c3aed?style=for-the-badge) ![Built with React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript)

---

## ✨ Features

- **Step-by-step visualization** — Every algorithm generates a sequence of states. The UI renders them one at a time so you can see exactly what happens at each step.
- **Animated visualizations** — Smooth Framer Motion animations for bar swaps, cell highlights, and HashMap entries.
- **Pseudocode tracking** — See which line of pseudocode is executing at every step.
- **"Explain Like I'm 12" mode** — Toggle beginner-friendly explanations with a single switch.
- **Playback controls** — Play, Pause, Step Forward, Step Backward, Reset, and adjustable speed (0.5x–4x).
- **Keyboard shortcuts** — `Space` (play/pause), `←` / `→` (step), `R` (reset).
- **Dark mode** — Automatic system preference detection.
- **Responsive** — Desktop sidebar, mobile hamburger drawer.

---

## 🧠 Algorithms

### Bubble Sort (Sorting)

Visualizes the array as animated histogram bars with color-coded states:

| Color | Meaning |
|-------|---------|
| 🟡 Amber | Currently being compared |
| 🔴 Red | Being swapped |
| 🟢 Green | In its final sorted position |

**Controls:** Randomize array, adjust array size (5–20 elements).

### Two Sum (Arrays)

Visualizes the HashMap approach step by step:

- **Array display** — Cells highlight as the algorithm scans through
- **Info cards** — Current index, current value, complement needed
- **HashMap table** — Entries animate in as they're added
- **Success state** — Celebration animation when the pair is found

**Controls:** Generate random input, adjust target value.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/DSA_Visualizer.git
cd DSA_Visualizer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture

```
Algorithm Generator → VisualizationStep[] → Playback Engine → UI Components
```

The core design principle: **algorithms generate states, the UI renders states.**

- Algorithms produce a `VisualizationStep<T>[]` array containing every intermediate state.
- The generic `usePlaybackEngine<T>` hook manages playback (play/pause/step/speed).
- Visualizer components render the current state with animations.
- The engine is **fully algorithm-agnostic** — adding a new algorithm requires zero changes to the playback system.

---

## 📁 Project Structure

```
src/
├── algorithms/                 # Algorithm step generators
│   ├── bubbleSort/
│   │   ├── generator.ts        # generateBubbleSortSteps()
│   │   └── config.ts           # Pseudocode, metadata
│   └── twoSum/
│       ├── generator.ts        # generateTwoSumSteps()
│       └── config.ts           # Pseudocode, metadata
├── components/                 # Reusable UI components
│   ├── Controls/
│   │   ├── PlaybackControls.tsx # Play/pause/step/speed controls
│   │   └── InputControls.tsx    # Algorithm-specific inputs
│   ├── ExplanationPanel/
│   │   └── ExplanationPanel.tsx # Step explanation + ELI12 toggle
│   ├── PseudocodePanel/
│   │   └── PseudocodePanel.tsx  # Line-highlighted pseudocode
│   ├── Sidebar/
│   │   └── Sidebar.tsx          # Topic navigation
│   └── ui/                     # shadcn/ui primitives
├── hooks/
│   └── usePlaybackEngine.ts    # Generic playback engine
├── visualizers/                # Algorithm-specific visualizers
│   ├── BubbleSortVisualizer/
│   └── TwoSumVisualizer/
├── types/
│   └── index.ts                # All TypeScript interfaces
├── pages/
│   └── AlgorithmPage.tsx       # Main layout composition
├── lib/
│   └── utils.ts                # Utility functions
├── App.tsx                     # Root with dark mode
├── main.tsx                    # Entry point
└── index.css                   # Design system & theme
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Build tool & dev server |
| [TailwindCSS v4](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | UI component primitives |
| [Framer Motion](https://motion.dev) | Animations |
| [Lucide React](https://lucide.dev) | Icons |

---

## 🔮 Adding a New Algorithm

The architecture is designed for easy extension. To add a new algorithm:

1. **Create the generator** in `src/algorithms/<name>/generator.ts`:
   ```typescript
   function generateMyAlgorithmSteps(input): VisualizationStep<MyState>[] {
     // Generate all intermediate states
   }
   ```

2. **Create the config** in `src/algorithms/<name>/config.ts`:
   ```typescript
   export const myAlgorithmConfig: AlgorithmConfig = {
     id: "my-algorithm",
     title: "My Algorithm",
     category: "Category",
     pseudocode: [...],
     difficulty: "Easy",
   };
   ```

3. **Build the visualizer** in `src/visualizers/<Name>Visualizer/`:
   ```typescript
   function MyAlgorithmVisualizer({ state }: { state: MyState }) {
     // Render the current state with animations
   }
   ```

4. **Register it** in `AlgorithmPage.tsx` and `Sidebar.tsx`.

The playback engine, pseudocode panel, explanation panel, and controls work automatically — no changes needed.

---

## 📋 Future Roadmap

- [ ] Binary Search
- [ ] Linked Lists (insertion, deletion, traversal)
- [ ] Stack & Queue operations
- [ ] Binary Search Trees
- [ ] Graph traversal (BFS, DFS)
- [ ] Dynamic Programming (Fibonacci, Knapsack)
- [ ] Algorithm complexity annotations
- [ ] Shareable visualization links

---

## 📄 License

MIT
