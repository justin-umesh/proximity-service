/**
 * Advanced usage examples for the TypeScript Calculator
 */

import { Calculator, createCalculator } from '../index';
import { CalculatorError } from '../types';

console.log('🚀 Advanced Calculator Usage Examples');
console.log('====================================\\n');

// Example 1: Complex mathematical calculations
console.log('1. Complex Mathematical Calculations:');

// Calculate compound interest: A = P(1 + r/n)^(nt)
// P = 1000, r = 0.05, n = 12, t = 2
function calculateCompoundInterest(principal: number, rate: number, compoundingFrequency: number, time: number): number {
  const calc = createCalculator(1);
  
  return calc
    .add(rate / compoundingFrequency)  // (1 + r/n)
    .power(compoundingFrequency * time)  // ^(nt)
    .multiply(principal)  // P * result
    .value;
}

const compoundInterest = calculateCompoundInterest(1000, 0.05, 12, 2);
console.log(`Compound Interest Result: $${compoundInterest.toFixed(2)}`);

// Example 2: Statistical calculations
console.log('\\n2. Statistical Calculations:');

function calculateMean(numbers: number[]): number {
  const calc = createCalculator(0);
  numbers.forEach(num => calc.add(num));
  return calc.divide(numbers.length).value;
}

function calculateVariance(numbers: number[]): number {
  const mean = calculateMean(numbers);
  const calc = createCalculator(0);
  
  numbers.forEach(num => {
    const diff = createCalculator(num).subtract(mean).power(2).value;
    calc.add(diff);
  });
  
  return calc.divide(numbers.length).value;
}

const dataset = [10, 15, 20, 25, 30];
const mean = calculateMean(dataset);
const variance = calculateVariance(dataset);
const standardDeviation = createCalculator(variance).sqrt().value;

console.log(`Dataset: [${dataset.join(', ')}]`);
console.log(`Mean: ${mean}`);
console.log(`Variance: ${variance}`);
console.log(`Standard Deviation: ${standardDeviation.toFixed(2)}`);

// Example 3: Unit conversions
console.log('\\n3. Unit Conversions:');

class UnitConverter {
  private calc: Calculator;

  constructor() {
    this.calc = createCalculator();
  }

  // Temperature conversions
  celsiusToFahrenheit(celsius: number): number {
    return this.calc.setValue(celsius).multiply(9).divide(5).add(32).value;
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return this.calc.setValue(fahrenheit).subtract(32).multiply(5).divide(9).value;
  }

  // Distance conversions
  milesToKilometers(miles: number): number {
    return this.calc.setValue(miles).multiply(1.60934).value;
  }

  kilometersToMiles(kilometers: number): number {
    return this.calc.setValue(kilometers).divide(1.60934).value;
  }

  // Area calculations
  circleArea(radius: number): number {
    return this.calc.setValue(Math.PI).multiply(radius).power(2).value;
  }

  rectangleArea(length: number, width: number): number {
    return this.calc.setValue(length).multiply(width).value;
  }
}

const converter = new UnitConverter();
console.log(`25°C in Fahrenheit: ${converter.celsiusToFahrenheit(25).toFixed(1)}°F`);
console.log(`77°F in Celsius: ${converter.fahrenheitToCelsius(77).toFixed(1)}°C`);
console.log(`10 miles in kilometers: ${converter.milesToKilometers(10).toFixed(2)} km`);
console.log(`Circle area (radius 5): ${converter.circleArea(5).toFixed(2)} square units`);

// Example 4: Financial calculations
console.log('\\n4. Financial Calculations:');

class FinancialCalculator {
  private calc: Calculator;

  constructor() {
    this.calc = createCalculator();
  }

  // Simple interest: I = P * r * t
  simpleInterest(principal: number, rate: number, time: number): number {
    return this.calc.setValue(principal).multiply(rate).multiply(time).value;
  }

  // Monthly payment for a loan: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  loanPayment(principal: number, monthlyRate: number, months: number): number {
    const calc1 = createCalculator(1).add(monthlyRate).power(months); // (1+r)^n
    const numerator = createCalculator(monthlyRate).multiply(calc1.value).value; // r(1+r)^n
    const denominator = createCalculator(calc1.value).subtract(1).value; // (1+r)^n - 1
    
    return this.calc.setValue(principal).multiply(numerator).divide(denominator).value;
  }

  // Return on investment: ROI = (Gain - Cost) / Cost * 100
  returnOnInvestment(initialInvestment: number, finalValue: number): number {
    return this.calc
      .setValue(finalValue)
      .subtract(initialInvestment)
      .divide(initialInvestment)
      .multiply(100)
      .value;
  }
}

const finCalc = new FinancialCalculator();
console.log(`Simple Interest (P=1000, r=0.05, t=3): $${finCalc.simpleInterest(1000, 0.05, 3).toFixed(2)}`);
console.log(`Monthly Loan Payment (P=10000, r=0.005, n=60): $${finCalc.loanPayment(10000, 0.005, 60).toFixed(2)}`);
console.log(`ROI (Initial: $1000, Final: $1200): ${finCalc.returnOnInvestment(1000, 1200).toFixed(2)}%`);

// Example 5: Error handling and recovery
console.log('\\n5. Error Handling and Recovery:');

function safeCalculation(operations: (() => void)[]): void {
  const calc = createCalculator(100);
  
  operations.forEach((operation, index) => {
    try {
      const previousValue = calc.value;
      operation();
      console.log(`  Operation ${index + 1}: Success, result = ${calc.value}`);
    } catch (error) {
      if (error instanceof CalculatorError) {
        console.log(`  Operation ${index + 1}: Error - ${error.message}`);
        // Calculator maintains its previous state on error
        console.log(`  Calculator value maintained at: ${calc.value}`);
      }
    }
  });
}

const operations = [
  () => createCalculator(100).add(50),
  () => createCalculator(150).divide(0), // This will throw an error
  () => createCalculator(150).sqrt(),
  () => createCalculator(-4).sqrt(), // This will throw an error
  () => createCalculator(16).power(2),
];

safeCalculation(operations);

// Example 6: Calculator state management
console.log('\\n6. Calculator State Management:');

class CalculatorSession {
  private calc: Calculator;
  private snapshots: number[] = [];

  constructor(initialValue: number = 0) {
    this.calc = createCalculator(initialValue);
  }

  saveSnapshot(): void {
    this.snapshots.push(this.calc.value);
    console.log(`  Snapshot saved: ${this.calc.value}`);
  }

  restoreSnapshot(index: number): void {
    if (index >= 0 && index < this.snapshots.length) {
      this.calc.setValue(this.snapshots[index]);
      console.log(`  Restored to snapshot ${index}: ${this.calc.value}`);
    } else {
      console.log(`  Invalid snapshot index: ${index}`);
    }
  }

  getCalculator(): Calculator {
    return this.calc;
  }

  showSnapshots(): void {
    console.log(`  Available snapshots: [${this.snapshots.join(', ')}]`);
  }
}

const session = new CalculatorSession(10);
const sessionCalc = session.getCalculator();

session.saveSnapshot(); // Save initial state
sessionCalc.add(20).multiply(2);
session.saveSnapshot(); // Save after operations

sessionCalc.divide(3).subtract(10);
console.log(`Current value: ${sessionCalc.value}`);

session.showSnapshots();
session.restoreSnapshot(1); // Restore to previous state

// Example 7: Performance testing
console.log('\\n7. Performance Testing:');

function performanceTest(): void {
  const iterations = 10000;
  const calc = createCalculator(1);
  
  console.log(`  Running ${iterations} operations...`);
  const startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    calc.add(1).multiply(1.001).subtract(0.5).divide(1.001);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log(`  Completed ${iterations} operations in ${duration}ms`);
  console.log(`  Average time per operation: ${(duration / iterations).toFixed(4)}ms`);
  console.log(`  Final result: ${calc.display(6)}`);
}

performanceTest();

console.log('\\n✅ All advanced examples completed successfully!');

