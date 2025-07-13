/**
 * Supported mathematical operations
 */
export enum Operation {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
  DIVIDE = 'divide',
  POWER = 'power',
  SQRT = 'sqrt',
  PERCENTAGE = 'percentage',
  CLEAR = 'clear'
}

/**
 * Calculator error types
 */
export class CalculatorError extends Error {
  constructor(message: string, public operation?: Operation) {
    super(message);
    this.name = 'CalculatorError';
  }
}

/**
 * Result of a calculation operation
 */
export interface CalculationResult {
  value: number;
  operation: Operation;
  operands: number[];
  timestamp: Date;
}

/**
 * Calculator memory interface
 */
export interface CalculatorMemory {
  value: number;
  lastUpdated: Date;
}

