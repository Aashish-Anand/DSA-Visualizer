import { describe, it, expect } from 'vitest';
import { generateBubbleSortSteps } from './generator';

describe('Bubble Sort Generator', () => {
  it('should generate steps that result in a sorted array', () => {
    const input = [5, 2, 8, 1, 9];
    const steps = generateBubbleSortSteps(input);
    
    // The last step should contain the fully sorted array
    const finalStep = steps[steps.length - 1];
    
    expect(finalStep.state.array).toEqual([1, 2, 5, 8, 9]);
    // Also verify that the sortedIndices length matches the array length
    expect(finalStep.state.sortedIndices.length).toBe(5);
  });

  it('should handle an empty array', () => {
    const steps = generateBubbleSortSteps([]);
    const finalStep = steps[steps.length - 1];
    
    expect(finalStep.state.array).toEqual([]);
  });

  it('should handle an already sorted array', () => {
    const input = [1, 2, 3, 4, 5];
    const steps = generateBubbleSortSteps(input);
    const finalStep = steps[steps.length - 1];
    
    expect(finalStep.state.array).toEqual([1, 2, 3, 4, 5]);
  });
});
