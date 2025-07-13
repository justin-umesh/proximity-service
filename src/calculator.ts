import { Operation, CalculatorError, CalculationResult, CalculatorMemory } from './types';

/**
 * A comprehensive TypeScript calculator with basic and advanced operations
 */
export class Calculator {
  private _currentValue: number = 0;
  private _memory: CalculatorMemory | null = null;
  private _history: CalculationResult[] = [];

  /**
   * Get the current value of the calculator
   */
  get value(): number {
    return this._currentValue;
  }

  /**
   * Get the calculation history
   */
  get history(): CalculationResult[] {
    return [...this._history];
  }

  /**
   * Get the memory value
   */
  get memory(): number | null {
    return this._memory?.value ?? null;
  }

  /**
   * Set the current value
   */
  setValue(value: number): Calculator {
    if (!this.isValidNumber(value)) {
      throw new CalculatorError('Invalid number provided');
    }
    this._currentValue = value;
    return this;
  }

  /**
   * Clear the calculator (reset to 0)
   */
  clear(): Calculator {
    this._currentValue = 0;
    this.addToHistory(Operation.CLEAR, [], 0);
    return this;
  }

  /**
   * Clear all history
   */
  clearHistory(): Calculator {
    this._history = [];
    return this;
  }

  /**
   * Add two numbers
   */
  add(value: number): Calculator {
    this.validateInput(value);
    const result = this._currentValue + value;
    this.updateValue(result, Operation.ADD, [this._currentValue, value]);
    return this;
  }

  /**
   * Subtract a number from current value
   */
  subtract(value: number): Calculator {
    this.validateInput(value);
    const result = this._currentValue - value;
    this.updateValue(result, Operation.SUBTRACT, [this._currentValue, value]);
    return this;
  }

  /**
   * Multiply current value by a number
   */
  multiply(value: number): Calculator {
    this.validateInput(value);
    const result = this._currentValue * value;
    this.updateValue(result, Operation.MULTIPLY, [this._currentValue, value]);
    return this;
  }

  /**
   * Divide current value by a number
   */
  divide(value: number): Calculator {
    this.validateInput(value);
    if (value === 0) {
      throw new CalculatorError('Division by zero is not allowed', Operation.DIVIDE);
    }
    const result = this._currentValue / value;
    this.updateValue(result, Operation.DIVIDE, [this._currentValue, value]);
    return this;
  }

  /**
   * Raise current value to the power of given number
   */
  power(exponent: number): Calculator {
    this.validateInput(exponent);
    const result = Math.pow(this._currentValue, exponent);
    this.updateValue(result, Operation.POWER, [this._currentValue, exponent]);
    return this;
  }

  /**
   * Calculate square root of current value
   */
  sqrt(): Calculator {
    if (this._currentValue < 0) {
      throw new CalculatorError('Cannot calculate square root of negative number', Operation.SQRT);
    }
    const result = Math.sqrt(this._currentValue);
    this.updateValue(result, Operation.SQRT, [this._currentValue]);
    return this;
  }

  /**
   * Calculate percentage of current value
   */
  percentage(percent: number): Calculator {
    this.validateInput(percent);
    const result = (this._currentValue * percent) / 100;
    this.updateValue(result, Operation.PERCENTAGE, [this._currentValue, percent]);
    return this;
  }

  /**
   * Store current value in memory
   */
  memoryStore(): Calculator {
    this._memory = {
      value: this._currentValue,
      lastUpdated: new Date()
    };
    return this;
  }

  /**
   * Recall value from memory
   */
  memoryRecall(): Calculator {
    if (this._memory === null) {
      throw new CalculatorError('No value stored in memory');
    }
    this._currentValue = this._memory.value;
    return this;
  }

  /**
   * Clear memory
   */
  memoryClear(): Calculator {
    this._memory = null;
    return this;
  }

  /**
   * Add current value to memory
   */
  memoryAdd(value?: number): Calculator {
    const valueToAdd = value ?? this._currentValue;
    this.validateInput(valueToAdd);
    
    if (this._memory === null) {
      this._memory = { value: 0, lastUpdated: new Date() };
    }
    
    this._memory.value += valueToAdd;
    this._memory.lastUpdated = new Date();
    return this;
  }

  /**
   * Subtract current value from memory
   */
  memorySubtract(value?: number): Calculator {
    const valueToSubtract = value ?? this._currentValue;
    this.validateInput(valueToSubtract);
    
    if (this._memory === null) {
      this._memory = { value: 0, lastUpdated: new Date() };
    }
    
    this._memory.value -= valueToSubtract;
    this._memory.lastUpdated = new Date();
    return this;
  }

  /**
   * Get the last calculation result
   */
  getLastResult(): CalculationResult | null {
    return this._history.length > 0 ? this._history[this._history.length - 1] : null;
  }

  /**
   * Undo the last operation
   */
  undo(): Calculator {
    if (this._history.length < 2) {
      throw new CalculatorError('No operation to undo');
    }
    
    // Remove the last operation
    this._history.pop();
    
    // Get the previous result
    const previousResult = this._history[this._history.length - 1];
    this._currentValue = previousResult.value;
    
    return this;
  }

  /**
   * Format the current value for display
   */
  toString(): string {
    return this._currentValue.toString();
  }

  /**
   * Get a formatted display of the current value
   */
  display(decimals?: number): string {
    if (decimals !== undefined) {
      return this._currentValue.toFixed(decimals);
    }
    return this._currentValue.toString();
  }

  /**
   * Validate input number
   */
  private validateInput(value: number): void {
    if (!this.isValidNumber(value)) {
      throw new CalculatorError(`Invalid input: ${value}`);
    }
  }

  /**
   * Check if a number is valid
   */
  private isValidNumber(value: number): boolean {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  /**
   * Update current value and add to history
   */
  private updateValue(newValue: number, operation: Operation, operands: number[]): void {
    if (!this.isValidNumber(newValue)) {
      throw new CalculatorError('Operation resulted in invalid number');
    }
    
    this._currentValue = newValue;
    this.addToHistory(operation, operands, newValue);
  }

  /**
   * Add operation to history
   */
  private addToHistory(operation: Operation, operands: number[], result: number): void {
    this._history.push({
      value: result,
      operation,
      operands: [...operands],
      timestamp: new Date()
    });
  }
}

/**
 * Create a new calculator instance
 */
export function createCalculator(initialValue: number = 0): Calculator {
  return new Calculator().setValue(initialValue);
}

// Export default instance for convenience
export default new Calculator();

