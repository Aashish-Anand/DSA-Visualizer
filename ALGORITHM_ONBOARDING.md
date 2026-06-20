# Algorithm Onboarding Standards

This document outlines the required checklist and technical standards for onboarding a new algorithm or problem to the AlgoLens platform. Following these guidelines ensures a consistent, high-quality learning experience for our users and keeps our codebase clean and maintainable.

---

## 📋 The "Done Definition" Checklist

To consider an algorithm fully onboarded, it **MUST** meet all the following requirements:

- [ ] **Core Logic Implementation**: The algorithm logic must be correct and cover edge cases.
- [ ] **Multi-Language Support**: The `config.ts` must include pseudocode, plus actual code translations for **Python**, **Java**, and **C++**.
- [ ] **Interactive Dry Run**: The `generator.ts` must yield `dryRunPrompt` objects at critical decision points to quiz the user.
- [ ] **Complexity Explorer**: The algorithm must include the `complexityExplorer` object in its config, tracking live `complexityMetrics` in the generator, and feature a live graph comparing performance against standard Big-O curves.
- [ ] **ELI5 Explanations**: Every step yielded by the generator must have both a technical `explanation` and a beginner-friendly `beginnerExplanation`.
- [ ] **Visualizer UI**: A React component dedicated to rendering the algorithm state.
- [ ] **Registered in App**: Added to `src/algorithms/index.ts` and the `Sidebar.tsx` navigation.

---

## 🏗️ Technical Standards & Best Practices

### 1. Zero Boilerplate & Reusability First
Do not reinvent the wheel for every algorithm.
- **Visualizers**: If visualizing a standard array, use `<SortingBarVisualizer />` or `<ArraySearchVisualizer />`. If visualizing a tree, use `<TreeVisualizer />`. Only create a bespoke visualizer component if the standard ones fundamentally cannot represent the problem state.
- **Controls**: Never build custom playback controls. Always use the standard `PlaybackControls` and `InputControls` provided in the `AlgorithmLayout`.
- **Layout**: Always wrap your page in the `<AlgorithmLayout>` which automatically handles the sidebar, explanation panels, code panels, and the Complexity Explorer toggles.

### 2. Generator Function Integrity
The core engine runs on ES6 Generator functions.
- Ensure the generator yields a complete, deep-cloned snapshot of the state at every step. 
- Avoid mutating the state object *after* yielding it, as this will corrupt the playback history. Always yield a fresh copy of the data structures (e.g., `[...array]`).
- Do not perform DOM manipulations inside the generator. The generator only calculates state.

### 3. Complexity Explorer Instrumentation
The Complexity Explorer relies on accurate, live metrics to teach users *why* an algorithm scales the way it does.
- You must track and yield `complexityMetrics` on every step (e.g., `comparisons`, `swaps`, `reads`, `writes`).
- The `config.ts` must define a `runExperiment` function that runs the algorithm silently across multiple input sizes (e.g., N=10 to N=100) to generate the empirical data points for the Growth Chart.

### 4. Interactive Dry Run Prompts
Do not quiz the user on trivial steps (e.g., "i incremented").
- Ask questions at critical conceptual junctions (e.g., "Why did the left pointer move instead of the right?", "What will be the next node pushed to the stack?").
- Always provide meaningful `options` and clearly mark the `correctAnswer`.
- Ensure the `dryRunPrompt` makes sense in the context of the active code line and current visual state.

### 5. Multi-Language Code Sync
- The indices in the `activeLine` property yielded by the generator must correctly map to the logical lines of code in the pseudocode.
- When writing the Python, Java, and C++ translations in `config.ts`, ensure they align structurally as close as possible to the pseudocode so the line highlighting remains accurate across all languages.

---

## 🚀 Onboarding Workflow

1. **Scaffold**: Create the directory `src/algorithms/<name>/`.
2. **Config**: Create `config.ts` defining the algorithm details, pseudocode, and language translations.
3. **Generator**: Create `generator.ts` containing the generator function and `runExperiment` logic.
4. **Visualizer**: Create `<Name>Visualizer.tsx` if a custom view is needed, otherwise use an existing one.
5. **Page Component**: Create `src/pages/<Name>Page.tsx` integrating the layout.
6. **Register**: Add the component to `App.tsx` routing.
7. **Sidebar**: Add the algorithm to the `CATEGORIES` and `PATTERNS` lists in `Sidebar.tsx` with an appropriate Lucide icon.
8. **Verify**: Run the dev server, play through the entire algorithm, test the Complexity Explorer, switch languages, and ensure the Dry Run quizzes trigger correctly.
