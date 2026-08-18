# Features Backlog: Complexity, Dry Run, Multi-Language, & Problem Context

Below is the current completion status for all 29 algorithm directories in the project. We have a solid foundation, but there is still plenty of data entry and feature wiring to do to get every algorithm to 100%!

| Algorithm | Problem Context ("Understand First") | Complexity Explorer | Multi-Language (Py/Java/C++) | Interactive Dry Run |
| :--- | :---: | :---: | :---: | :---: |
| **Two Sum** | ✅ | ✅ | ✅ | ✅ |
| **Binary Search** | ✅ | ✅ | ✅ | ❌ |
| **Climbing Stairs** | ✅ | ✅ | ✅ | ❌ |
| **Frog Jump** | ✅ | ✅ | ✅ | ❌ |
| **Bubble Sort** | ✅ | ✅ | ❌ | ❌ |
| **Insertion Sort** | ✅ | ✅ | ❌ | ❌ |
| **Selection Sort** | ✅ | ✅ | ❌ | ❌ |
| **Container With Most Water** | ✅ | ✅ | ❌ | ❌ |
| **Counting Sort** | ✅ | ✅ | ❌ | ❌ |
| **Four Sum** | ✅ | ✅ | ❌ | ❌ |
| **Graph BFS / DFS** | ✅ | ✅ | ❌ | ❌ |
| **Kadane's Algorithm** | ✅ | ✅ | ❌ | ❌ |
| **Linear Search** | ✅ | ✅ | ❌ | ❌ |
| **Majority Element I & II** | ✅ | ✅ | ❌ | ❌ |
| **Merge Sort** | ✅ | ✅ | ❌ | ❌ |
| **Quick Sort** | ✅ | ✅ | ❌ | ❌ |
| **Radix Sort** | ✅ | ✅ | ❌ | ❌ |
| **Singly Linked List Search** | ✅ | ✅ | ❌ | ❌ |
| **Stock Buy Sell** | ✅ | ✅ | ❌ | ❌ |
| **Three Sum** | ✅ | ✅ | ❌ | ❌ |
| **Trapping Rain Water** | ✅ | ✅ | ❌ | ❌ |
| **Tree Traversal (In/Pre/Post/Level)** | ✅ | ✅ | ❌ | ❌ |

## Legend
- **Problem Context ("Understand First")**: Requires adding `problemContext` object to `config.ts` containing problem statement, examples, intuition prompt, approach evolution, real-world applications, and pattern tags.
- **Complexity Explorer**: Requires adding `complexityExplorer` object to `config.ts`, instrumenting the `generator.ts` with `complexityMetrics`, and creating an `runExperiment()` function.
- **Multi-Language**: Requires adding `python`, `java`, and `cpp` pseudocode properties to `config.ts`.
- **Interactive Dry Run**: Requires adding `dryRunPrompt` objects to specific steps in `generator.ts` to quiz the user during execution.

