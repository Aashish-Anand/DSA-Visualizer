# AlgoLens — Learn Data Structures & Algorithms by Seeing

A modern, interactive visual learning platform that helps developers and students master **Data Structures & Algorithms** through step-by-step animations, interactive runtime experiments, and intuitive mental models.

> **Zero server latency.** All algorithm execution and state generation happens entirely client-side in the browser.

🚀 **Live Demo:** [https://dsa-visualizer-two-pi.vercel.app/](https://dsa-visualizer-two-pi.vercel.app/)

![Algorithms](https://img.shields.io/badge/Algorithms-22+-7c3aed?style=for-the-badge) ![Built with React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Key Features

- **🎬 Step-by-Step Visualization Engine** — Every algorithm generates deterministic, granular state steps. Play, pause, rewind, jump forward, and adjust speed from 0.5x to 4x.
- **📖 Problem Context ("Understand First" Panel)** — Build intuition before diving into code. Includes formal problem statements, intuitive visual analogies, brute-force vs. optimal approach evolutions, time/space trade-offs, real-world software applications, and DSA pattern tags.
- **📊 Complexity Explorer** — Go beyond static Big-O notation. Run live empirical experiments with variable input sizes, measure exact operation counts (comparisons, swaps, reads, writes, recursive calls), and visualize interactive growth curves.
- **💻 Multi-Language Code Sync** — Line-by-line synchronized execution tracking available in **Python**, **Java**, **C++**, and **TypeScript / Pseudocode**.
- **🧪 Interactive Dry Run** — Active learning mode that challenges you with interactive quiz checkpoints at critical decision points during execution.
- **🔗 Shareable Deep Links** — Copy and share direct URLs encoding selected algorithms and view states (`?algo=quick-sort`).
- **📬 In-App Feedback Pipeline** — Serverless Google Sheets / Excel integration with built-in anti-bot honeypots, rate-limiting caches, and spam filtering.
- **🌓 Dark & Light Modes** — Clean, harmonious design system with automatic system preference detection and smooth glassmorphism styling.
- **⌨️ Keyboard Navigation** — `Space` (Play/Pause), `←` / `→` (Step Backward/Forward), `R` (Reset).

---

## 🧠 Supported Algorithms

AlgoLens includes **22+ fully animated algorithms** across 6 core DSA categories:

| Category | Algorithm | Difficulty | Key Visual Highlights |
| :--- | :--- | :---: | :--- |
| **Arrays & Two Pointers** | Two Sum | Easy | Real-time HashMap lookup table & complement tracking |
| | Container With Most Water | Medium | 2D dynamic water boundary & capacity calculations |
| | Trapping Rain Water | Hard | Elevation histogram, left/right max water physics |
| | Three Sum & Four Sum | Medium | Sorted two-pointer sweeps & duplicate skipping |
| | Stock Buy and Sell | Medium | Dynamic min-price pointer & profit maximization |
| | Kadane's Algorithm | Medium | Maximum contiguous subarray boundary tracking |
| | Majority Element (I & II) | Easy/Medium | Boyer-Moore voting counters & candidate frequencies |
| **Sorting** | Bubble, Selection, Insertion | Easy | Dynamic comparison pointers, sorted partitions, & swaps |
| | Quick Sort | Medium | Pivot selection (Lomuto), partition splits, & call stack |
| | Merge Sort | Medium | Divide-and-conquer tree splitting & auxiliary array merging |
| | Counting Sort | Medium | Frequency array, prefix-sum indices, & stable output placement |
| | Radix Sort | Medium | LSD 10-bucket place-value distribution (1s, 10s, 100s) |
| **Searching** | Linear Search | Easy | Sequential element scanning & match detection |
| | Binary Search | Easy | Low/Mid/High boundary elimination on sorted arrays |
| **Linked Lists** | Singly Linked List Search | Easy | Head-to-tail pointer traversal & target lookup |
| | Reverse Linked List | Easy | Three-pointer in-place link reversal (`prev`, `curr`, `next`) |
| | Middle of the Linked List | Easy | Fast & Slow pointer (Tortoise & Hare) midpoint detection |
| | Delete K-th Node | Easy | Pointer bypass & unlinking logic |
| | Merge Two Sorted Lists | Easy | Two-pointer comparative splicing with dummy head node |
| | Add Two Numbers | Medium | Reverse-order digit summation with carry propagation |
| **Trees** | Pre / In / Post-order Traversal | Easy | DFS call stack execution & visited node highlights |
| | Level-order Traversal (BFS) | Medium | FIFO Queue state & layer-by-layer tree scanning |
| **Graphs** | Breadth-First Search (BFS) | Medium | FIFO queue exploration & shortest path frontiers |
| | Depth-First Search (DFS) | Medium | Recursive call stack traversal & backtracking |
| **Dynamic Programming** | Climbing Stairs | Easy | 1D tabulation, memoization, & recursion tree breakdown |
| | Frog Jump (Min Cost) | Medium | 1D DP decision transitions & min energy path calculation |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- npm v9.0.0 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Aashish-Anand/DSA-Visualizer.git
cd DSA-Visualizer

# 2. Install dependencies
npm install

# 3. (Optional) Set up Environment Variables
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ⚙️ Environment Configuration

AlgoLens works 100% out of the box without any environment variables. If you wish to connect the feedback modal to your own Google Sheet:

1. Create a `.env` file based on `.env.example`:
   ```env
   VITE_FEEDBACK_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_ID/exec"
   ```
2. For production deployments (e.g. **Vercel**), add `VITE_FEEDBACK_WEBHOOK_URL` in **Project Settings > Environment Variables** and redeploy.

---

## 🧪 Quality Assurance & Testing

This project adheres to a strict testing and linting workflow:

```bash
# Run unit tests
npm run test

# Run complete validation (typecheck + ESLint + Vitest)
npm run validate

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

> **Pre-Commit Enforcement:** We use **Husky** and **lint-staged** to automatically run ESLint and TypeScript checks before every commit, ensuring that `main` is always build-ready.

---

## 🏗️ Architecture

```
Algorithm Generator → VisualizationStep<T>[] → usePlaybackEngine<T> → UI Visualizer Component
```

The core architecture strictly separates algorithm computation from UI rendering:
1. **Generators (`src/algorithms/*/generator.ts`)**: Pure functions that simulate algorithm execution and yield an array of immutable `VisualizationStep<T>` state snapshots.
2. **Playback Engine (`src/hooks/usePlaybackEngine.ts`)**: An algorithm-agnostic React hook managing playback state, stepping, timing, and progress.
3. **Visualizers (`src/visualizers/*`)**: React components that render current state frames with smooth Framer Motion animations.
4. **Problem Context & Complexity Explorer**: Modular panels driven by declarative configurations in `config.ts`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev), [Vite 8](https://vite.dev), [TypeScript 6](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com/) |
| **Motion & UI** | [Framer Motion](https://motion.dev), [Lucide Icons](https://lucide.dev) |
| **Testing** | [Vitest](https://vitest.dev) |
| **Tooling** | ESLint v10, Husky, lint-staged |
| **Deployment** | Vercel |

---

## 📋 Roadmap

- [x] Tree Traversals (Pre, In, Post, Level-order)
- [x] Graph Traversals (BFS, DFS)
- [x] 1D Dynamic Programming (Climbing Stairs, Frog Jump)
- [x] Advanced Linked List suite (Reverse, Middle, Delete, Merge, Add Two Numbers)
- [x] Complexity Explorer with live empirical experiments
- [x] Problem Context ("Understand First") system
- [x] Shareable deep links via URL query params
- [x] Serverless Anti-Spam Feedback Pipeline
- [ ] Multi-Language pseudocode rollout for remaining sorting & array algorithms
- [ ] Interactive Dry Run quiz integration across all categories
- [ ] Binary Search Tree operations (Insertion, Deletion, Balancing)
- [ ] Stack & Queue visual sandbox

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
