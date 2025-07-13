/**
 * Main entry point for the TypeScript Calculator
 * 
 * This module exports the Calculator class and utility functions
 * for programmatic use of the calculator functionality.
 */

export { Calculator, createCalculator } from './calculator';
export { Operation, CalculatorError, CalculationResult, CalculatorMemory } from './types';

// Re-export default calculator instance for convenience
import defaultCalculator from './calculator';
export default defaultCalculator;

/**
 * Quick calculation functions for common operations
 */
export const calc = {
  /**
   * Add two numbers
   */
  add: (a: number, b: number): number => a + b,
  
  /**
   * Subtract second number from first
   */
  subtract: (a: number, b: number): number => a - b,
  
  /**
   * Multiply two numbers
   */
  multiply: (a: number, b: number): number => a * b,
  
  /**
   * Divide first number by second
   */
  divide: (a: number, b: number): number => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  },
  
  /**
   * Raise first number to the power of second
   */
  power: (base: number, exponent: number): number => Math.pow(base, exponent),
  
  /**
   * Calculate square root
   */
  sqrt: (value: number): number => {
    if (value < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return Math.sqrt(value);
  },
  
  /**
   * Calculate percentage
   */
  percentage: (value: number, percent: number): number => (value * percent) / 100,
};

/**
 * Example usage demonstration
 */
export function demonstrateUsage(): void {
  console.log('🧮 TypeScript Calculator Demo');
  console.log('============================');
  
  // Create a new calculator instance
  const calculator = createCalculator(10);
  
  console.log(`Starting value: ${calculator.value}`);
  
  // Chain operations
  calculator
    .add(5)
    .multiply(2)
    .subtract(10)
    .divide(2);
  
  console.log(`After operations (10 + 5) * 2 - 10 / 2: ${calculator.value}`);
  
  // Advanced operations
  calculator.setValue(16).sqrt();
  console.log(`Square root of 16: ${calculator.value}`);
  
  calculator.setValue(100).percentage(25);
  console.log(`25% of 100: ${calculator.value}`);
  
  // Memory operations
  calculator.setValue(42).memoryStore();
  calculator.setValue(0).memoryRecall();
  console.log(`Recalled from memory: ${calculator.value}`);
  
  // Show history
  console.log('\\nCalculation History:');
  calculator.history.forEach((result, index) => {
    console.log(`${index + 1}. ${result.operation}: ${result.value}`);
  });
  
  // Quick calculations
  console.log('\\nQuick calculations:');
  console.log(`calc.add(5, 3) = ${calc.add(5, 3)}`);
  console.log(`calc.multiply(4, 7) = ${calc.multiply(4, 7)}`);
  console.log(`calc.power(2, 8) = ${calc.power(2, 8)}`);
}

// Run demo if this file is executed directly
if (require.main === module) {
  demonstrateUsage();
}

