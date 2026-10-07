# AlgoLens UI improvement plan

## Scope and evidence

Reviewed the hosted desktop pages for Majority Element, Climbing Stairs, and Frog Jump on October 7, 2026, and checked their local implementation. This is an implementation plan; application code has not been changed. Mobile and tablet behavior still need direct validation.

Preserve the existing visual identity and Generator → Playback Engine → Visualizer architecture. Improve learning continuity, correctness, readability, and use of space.

## Findings

| Area | Observed issue | Implication |
| --- | --- | --- |
| Navigation | DP opens in Problem Simulation; the article is inside Algorithm Execution → Understand First. Other algorithms use a different hierarchy. | Learners must discover multiple levels to access one lesson. |
| Approach context | Climbing Stairs Recursive still opens iterative complexity content. Frog Jump Memoized + Python displays bottom-up code. | Visuals, code, and performance explanations can describe different algorithms. |
| Simulation | Climbing Stairs animates a random path; Frog Jump animates a greedy attempt. | The teaching objective needs explicit framing and a bridge to the algorithm. |
| Explanation | Large nested cards, literal backticks, long text, and examples disconnected from visualization inputs. | Extra scrolling and difficulty connecting prose to animation. |
| Example accuracy | Frog Jump example `[30,10,60,10,60,50]` gives path `0→1→3→5` and total 40, although costs sum to 60. | Correct the path to `0→2→4→5`, with costs 30 + 0 + 10 = 40. |
| Problem wording | Frog Jump's visualization description mentions absent stones and avoiding water; its actual problem uses an indexed heights array. | Use one consistent minimum-energy problem definition. |
| DP state | Uncomputed cells display infinity; a spinner says Calculating while playback is paused. | Uncomputed values and playback activity are ambiguous. |
| DP layout | Input and DP cells have different sizes and spacing; the label calls heights Costs. | The relationship between input index and DP state is harder to follow. |
| Recursion | Plain recursion displays an empty memo table. | It suggests caching where none exists. |
| Workspace | Spacious canvas alongside cramped code/explanation, horizontal scrolling for small arrays, and floating feedback near content. | Space allocation does not follow teaching importance. |
| Complexity | Current-step metrics lack step/approach context; DP configurations mix O(1) optimization with O(n) table storage as space cases. | Learners may confuse implementation choices with input-dependent cases. |
| Growth chart | Reference curves are independently scaled to one endpoint, without a normalization explanation. | Relative curve heights can be interpreted incorrectly. |

## Target experience

One persistent problem header with title, difficulty, topic, Share, and a collapsible sidebar. One navigation row: **Understand / Visualize / Complexity**.

Understand contains the problem statement, visual examples, an optional problem simulation, intuition, approach comparison, and secondary applications/patterns. The simulation belongs beside the concept it explains. It can offer an expanded view without becoming another required navigation level.

Visualize and Complexity share the selected approach and input context. Changing the approach resets playback explicitly but retains the input when supported. Retain article position, language preference when available, and experiment results for their corresponding approach. Pause animation when leaving its view.

### Understand

- Use a readable article column with headings and restrained cards for examples and key insights.
- Render a controlled subset of inline formatting for code and formulas; do not render arbitrary HTML.
- Add “Visualize this example” to load the example input and enter the appropriate visualization.
- Present approaches in a compact comparison, with expandable detail and a direct “Use this approach” action.
- Climbing Stairs: show all three paths for n=3, then illustrate arrivals from n−1 and n−2. Explain that the simulation shows one path while the algorithm counts all paths.
- Frog Jump: show indexed stones, their heights, jump costs, and the final route cost. Use a curated greedy counterexample for the lesson about local versus global choices.
- Majority Element: illustrate cancellation of different values and emphasize the majority-exists assumption.
- Separate memoization, tabulation, and the optional rolling-variable optimization in explanations. Mark approaches as available to run or explanation-only.

### Visualize

- Put approach selection above the entire workspace, alongside a short approach description and time/space summary.
- Put input editing and example presets in a compact toolbar. Label Climbing Stairs input “Number of stairs (n)” and Frog Jump input “Stone heights.”
- Main area: animation and state display; right panel: resizable code; beneath the animation: a persistent step explanation; bottom: playback and timeline.
- Fit small inputs without horizontal scrolling. Use explicit pan/scroll and follow-active controls for large arrays or trees. Respect users who manually inspect another region.
- Align Frog Jump height and DP cells in columns with a shared index. Define dp[i] as minimum energy to reach stone i.
- Show the current recurrence with substituted values and highlighted dependencies. For stairs, show addition; for Frog Jump, compare the two total arrival costs and emphasize the chosen minimum.
- Use “Not computed” or a dash for uncomputed cells, with a legend. Reserve infinity for states where it is mathematically meaningful.
- Use Ready / Paused / Playing / Complete statuses; do not show a perpetual calculation spinner for a prepared, paused timeline.
- Recursive view: call tree and stack, repeated subproblems highlighted. Memoized view: add cache entries and cache-hit markers. Tabulation view: table and dependencies.
- Add tree fit/reset/zoom controls. Add final answers with units: “8 ways” or “30 energy.” An optimal route display for Frog Jump requires predecessor/path data and is a later enhancement.
- Majority Element: compact candidate/balance strip, label balance accurately, and explain cancellations directly below the array.
- Rename ELI12 to “Simple explanation.” Hide unsupported quizzes, add accessible control names, and move Feedback away from lesson content.

### Complexity

- Keep the problem identity and selected approach visible.
- Order: approach time/space summary → experiment → result interpretation → detailed analysis.
- Distinguish “Current playback step” metrics from experiment totals; show step number and a return-to-visualization action. Show unavailable metrics as unavailable, rather than fabricated zeroes.
- Give each runnable approach its own complexity explanation, tracked metrics, experiment function, and supported input range. Bound recursion experiments to small sizes.
- Report table-based DP storage as O(n), including recursion stack and cache for memoization. Show O(1) rolling storage as a separate implementation option.
- Define counted operations. Display recursive calls/cache hits for recursion and memoization, and computed states/transitions for tabulation.
- Default chart to measured data and the expected reference. Allow optional reference curves, explicitly labeled as normalized shapes if normalized. Keep axes stable during a run and use readable labels and tooltips.
- Compare approaches on the same input when practical; do not imply arbitrary visual playback steps are comparable operation counts.

## Delivery sequence

### Phase 1: Correct lesson context

Fix the erroneous Frog Jump example and problem wording. Make code languages and complexity metadata variant-specific. Remove the memo table from plain recursion, distinguish unknown states from infinity, correct playback status, and expose input limits without silently truncating a learner's input. Unsupported language variants must fall back visibly to pseudocode.

Acceptance: selected approach, code, explanation, metrics, and complexity agree in every DP variant. Switching variants never silently discards the original input. Unsupported instrumentation is labeled.

### Phase 2: Build the shared lesson structure

Extract reusable lesson header, navigation, input toolbar, workspace, and explanation areas from AlgorithmPage.tsx. Centralize view/input/approach state at the lesson level. Apply the structure first to the three reviewed problems, then migrate remaining page wrappers. Keep algorithm-specific computation outside the shared playback hook.

Acceptance: one navigation hierarchy; title always visible; switching sections preserves lesson context; small default inputs fit; code and explanation remain usable at common desktop sizes; feedback never overlaps controls.

### Phase 3: Improve explanation and DP teaching

Restructure the article, add safe inline formatting, wire example-to-visualization actions, integrate simulations, align DP input/state rows, and show substituted recurrences. Add clear tree/cache/stack roles. Use deterministic examples for the initial lesson; preserve Randomize as an explicit action.

Acceptance: every example launches matching input; learners can see where each current DP value comes from; simulations explain their objective and lead into execution.

### Phase 4: Rebuild the complexity experience

Add approach-specific experiments and summaries, clarify metric scope, correct reference-curve presentation, and provide an explicit takeaway from the experiment. Approach comparison is a follow-on feature after individual measurements are reliable.

Acceptance: the experiment matches the selected approach; references disclose scaling; displayed storage matches the actual implementation; recursive experiments remain responsive.

### Phase 5: Validate and roll out

Check the three pilot problems in both themes at desktop, tablet, and phone widths. On narrower screens, use a sidebar drawer and a stacked visualization/explanation layout with code in an accessible tab or expandable panel. Avoid compressing every desktop control into one row. Verify keyboard navigation, focus visibility, accessible names, reduced-motion behavior, and contrast.

Add focused regression checks for variant-language selection, variant complexity, example input loading, view preservation, and input limits. Run lint, tests, and the TypeScript production build. Manually inspect transitions, tree growth, long code lines, custom inputs, and small-height windows. Smoke-check at least one sorting, linked-list, tree, and graph problem before migrating the remaining pages.

## Implementation touchpoints

- `src/pages/AlgorithmPage.tsx`: shared layout and duplicated page wrappers; lesson state ownership.
- `src/types/index.ts`: variant-specific language/complexity capabilities and optional teaching metadata.
- `src/components/ProblemContext/ProblemContextPanel.tsx`: article structure and example actions.
- `src/components/Controls/`, `src/components/CodePanel/`, `src/components/ExplanationPanel/`: toolbar, language availability, and explanation placement.
- `src/visualizers/DP1DVisualizer/`, `src/visualizers/RecursionTreeVisualizer/`, `src/visualizers/ProblemVisualizer/`: state semantics, diagram layout, simulation integration.
- `src/components/Complexity/`: metric context, experiments, and chart interpretation.
- DP configs/generators: correct examples, variant metadata, instrumentation, and later route reconstruction.

## First review checkpoint

Complete correctness fixes and one shared-layout pilot across Majority Element, Climbing Stairs, and Frog Jump. Review this working result before migrating every algorithm or adding larger features such as synchronized approach comparison and optimal-route reconstruction.


## Delivered implementation

- Shared Understand / Visualize / Complexity navigation now covers all 32 routes.
- Lesson header includes Share and Feedback; desktop navigation collapses and the mobile drawer has keyboard focus handling.
- Articles use safe inline code formatting, visual examples, compact approach details, and secondary application sections.
- The three pilot problems have example-to-visualization actions and deterministic conceptual diagrams.
- DP approaches select their own code availability, complexity explanation, metrics, and experiments. Missing translations visibly fall back to pseudocode.
- DP tables align heights and computed states, label uncomputed values explicitly, and show substituted recurrence calculations. Majority Element labels vote balance and fits its default input.
- Explanations sit beneath the animation; playback has a scrubber and remains available on mobile. Code highlighting scrolls only its own panel.
- Tree views separate recursion from memoization, provide fit/zoom controls, and use corrected call stacks.
- Experiments retain results per approach, distinguish playback counts from experiment totals, and disclose theoretical-reference scaling.
- Recursive input restrictions retain the original input and explain the limit.

Validation: lint and production TypeScript build pass; eight unit tests cover algorithm answers, selected-approach metadata/languages, recursive metric agreement, snapshot isolation, and stack integrity. Browser checks cover all 32 routes rendering, representative category stepping, example selection, variant/language fallback, input preservation, experiment preservation, and phone/tablet/desktop layouts in both themes.

Follow-on features remain separate: synchronized side-by-side approach playback and reconstruction of Frog Jump's optimal route. They are not part of this shared UI rollout. The existing large production-bundle warning remains; code splitting is a separate performance improvement.
