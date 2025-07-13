import { Calculator, createCalculator } from '../calculator';
import { CalculatorError, Operation } from '../types';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = createCalculator();
  });

  describe('Basic Operations', () => {
    test('should initialize with value 0', () => {
      expect(calculator.value).toBe(0);
    });

    test('should set initial value', () => {
      const calc = createCalculator(10);
      expect(calc.value).toBe(10);
    });

    test('should add numbers correctly', () => {
      calculator.setValue(5).add(3);
      expect(calculator.value).toBe(8);
    });

    test('should subtract numbers correctly', () => {
      calculator.setValue(10).subtract(4);
      expect(calculator.value).toBe(6);
    });

    test('should multiply numbers correctly', () => {
      calculator.setValue(6).multiply(7);
      expect(calculator.value).toBe(42);
    });

    test('should divide numbers correctly', () => {
      calculator.setValue(15).divide(3);
      expect(calculator.value).toBe(5);
    });

    test('should throw error on division by zero', () => {
      expect(() => {
        calculator.setValue(10).divide(0);
      }).toThrow(CalculatorError);
    });

    test('should support method chaining', () => {
      const result = calculator
        .setValue(10)
        .add(5)
        .multiply(2)
        .subtract(10)
        .divide(2);
      
      expect(result.value).toBe(10);
      expect(result).toBe(calculator); // Should return same instance
    });
  });

  describe('Advanced Operations', () => {
    test('should calculate power correctly', () => {
      calculator.setValue(2).power(3);
      expect(calculator.value).toBe(8);
    });

    test('should calculate square root correctly', () => {
      calculator.setValue(16).sqrt();
      expect(calculator.value).toBe(4);
    });

    test('should throw error on square root of negative number', () => {
      expect(() => {
        calculator.setValue(-4).sqrt();
      }).toThrow(CalculatorError);
    });

    test('should calculate percentage correctly', () => {
      calculator.setValue(200).percentage(25);
      expect(calculator.value).toBe(50);
    });

    test('should handle zero percentage', () => {
      calculator.setValue(100).percentage(0);
      expect(calculator.value).toBe(0);
    });
  });

  describe('Memory Operations', () => {
    test('should store and recall memory', () => {
      calculator.setValue(42).memoryStore();
      calculator.setValue(0).memoryRecall();
      expect(calculator.value).toBe(42);
    });

    test('should throw error when recalling empty memory', () => {
      expect(() => {
        calculator.memoryRecall();
      }).toThrow(CalculatorError);
    });

    test('should clear memory', () => {
      calculator.setValue(42).memoryStore();
      calculator.memoryClear();
      expect(() => {
        calculator.memoryRecall();
      }).toThrow(CalculatorError);
    });

    test('should add to memory', () => {
      calculator.setValue(10).memoryStore();
      calculator.setValue(5).memoryAdd();
      calculator.memoryRecall();
      expect(calculator.value).toBe(15);
    });

    test('should subtract from memory', () => {
      calculator.setValue(20).memoryStore();
      calculator.setValue(5).memorySubtract();
      calculator.memoryRecall();
      expect(calculator.value).toBe(15);
    });

    test('should handle memory operations with empty memory', () => {
      calculator.setValue(10).memoryAdd();
      calculator.memoryRecall();
      expect(calculator.value).toBe(10);
    });
  });

  describe('Utility Functions', () => {
    test('should clear calculator', () => {
      calculator.setValue(42).clear();
      expect(calculator.value).toBe(0);
    });

    test('should display value as string', () => {
      calculator.setValue(42.5);
      expect(calculator.toString()).toBe('42.5');
      expect(calculator.display()).toBe('42.5');
    });

    test('should display value with fixed decimals', () => {
      calculator.setValue(42.123456);
      expect(calculator.display(2)).toBe('42.12');
    });

    test('should track calculation history', () => {
      calculator.setValue(10).add(5).multiply(2);
      const history = calculator.history;
      
      expect(history).toHaveLength(3); // setValue, add, multiply
      expect(history[1].operation).toBe(Operation.ADD);
      expect(history[1].operands).toEqual([10, 5]);
      expect(history[1].value).toBe(15);
    });

    test('should get last result', () => {
      calculator.setValue(10).add(5);
      const lastResult = calculator.getLastResult();
      
      expect(lastResult).not.toBeNull();
      expect(lastResult!.operation).toBe(Operation.ADD);
      expect(lastResult!.value).toBe(15);
    });

    test('should return null for last result when no operations', () => {
      const lastResult = calculator.getLastResult();
      expect(lastResult).toBeNull();
    });

    test('should clear history', () => {
      calculator.setValue(10).add(5).multiply(2);
      calculator.clearHistory();
      expect(calculator.history).toHaveLength(0);
    });
  });

  describe('Undo Functionality', () => {
    test('should undo last operation', () => {
      calculator.setValue(10).add(5).multiply(2);
      expect(calculator.value).toBe(30);
      
      calculator.undo();
      expect(calculator.value).toBe(15);
    });

    test('should throw error when trying to undo with insufficient history', () => {
      expect(() => {
        calculator.undo();
      }).toThrow(CalculatorError);
      
      calculator.setValue(10);
      expect(() => {
        calculator.undo();
      }).toThrow(CalculatorError);
    });
  });

  describe('Error Handling', () => {
    test('should throw error for invalid numbers', () => {
      expect(() => {
        calculator.setValue(NaN);
      }).toThrow(CalculatorError);
      
      expect(() => {
        calculator.setValue(Infinity);
      }).toThrow(CalculatorError);
      
      expect(() => {
        calculator.add(NaN);
      }).toThrow(CalculatorError);
    });

    test('should handle edge cases', () => {
      // Very large numbers
      calculator.setValue(Number.MAX_SAFE_INTEGER);
      expect(calculator.value).toBe(Number.MAX_SAFE_INTEGER);
      
      // Very small numbers
      calculator.setValue(Number.MIN_SAFE_INTEGER);
      expect(calculator.value).toBe(Number.MIN_SAFE_INTEGER);
      
      // Zero operations
      calculator.setValue(0).add(0).multiply(0);
      expect(calculator.value).toBe(0);
    });

    test('should preserve calculator state on errors', () => {
      calculator.setValue(10);
      
      try {
        calculator.divide(0);
      } catch (error) {
        // Calculator should maintain its previous state
        expect(calculator.value).toBe(10);
      }
    });
  });

  describe('Memory Properties', () => {
    test('should return null for empty memory', () => {
      expect(calculator.memory).toBeNull();
    });

    test('should return memory value when stored', () => {
      calculator.setValue(42).memoryStore();
      expect(calculator.memory).toBe(42);
    });

    test('should return null after memory clear', () => {
      calculator.setValue(42).memoryStore();
      calculator.memoryClear();
      expect(calculator.memory).toBeNull();
    });
  });

  describe('Complex Calculations', () => {
    test('should handle complex chained operations', () => {
      const result = calculator
        .setValue(100)
        .percentage(50)  // 50
        .sqrt()          // ~7.07
        .power(2)        // 50
        .add(25)         // 75
        .divide(3);      // 25
      
      expect(result.value).toBe(25);
    });

    test('should maintain precision for decimal operations', () => {
      calculator.setValue(0.1).add(0.2);
      // Due to floating point precision, we need to check with tolerance
      expect(calculator.value).toBeCloseTo(0.3);
    });
  });
});

