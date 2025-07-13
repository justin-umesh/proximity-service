/**
 * Basic usage examples for the TypeScript Calculator
 */

import { Calculator, createCalculator, calc } from '../index';

console.log('🧮 Basic Calculator Usage Examples');
console.log('==================================\\n');

// Example 1: Creating and using a calculator instance
console.log('1. Basic Calculator Operations:');
const calculator = createCalculator(10);
console.log(`Starting value: ${calculator.value}`);

calculator.add(5);
console.log(`After adding 5: ${calculator.value}`);

calculator.multiply(2);
console.log(`After multiplying by 2: ${calculator.value}`);

calculator.subtract(10);
console.log(`After subtracting 10: ${calculator.value}`);

calculator.divide(2);
console.log(`After dividing by 2: ${calculator.value}`);

// Example 2: Method chaining
console.log('\\n2. Method Chaining:');
const result = createCalculator(100)
  .percentage(25)  // 25% of 100 = 25
  .sqrt()          // √25 = 5
  .power(2)        // 5² = 25
  .add(75);        // 25 + 75 = 100

console.log(`Chained operations result: ${result.value}`);

// Example 3: Advanced operations
console.log('\\n3. Advanced Operations:');
const advancedCalc = createCalculator();

advancedCalc.setValue(16).sqrt();
console.log(`Square root of 16: ${advancedCalc.value}`);

advancedCalc.setValue(2).power(8);
console.log(`2 to the power of 8: ${advancedCalc.value}`);

advancedCalc.setValue(200).percentage(15);
console.log(`15% of 200: ${advancedCalc.value}`);

// Example 4: Memory operations
console.log('\\n4. Memory Operations:');
const memoryCalc = createCalculator(42);
console.log(`Initial value: ${memoryCalc.value}`);

memoryCalc.memoryStore();
console.log('Value stored in memory');

memoryCalc.setValue(0);
console.log(`Value after reset: ${memoryCalc.value}`);

memoryCalc.memoryRecall();
console.log(`Value after memory recall: ${memoryCalc.value}`);

// Add to memory
memoryCalc.setValue(8).memoryAdd();
memoryCalc.memoryRecall();
console.log(`After adding 8 to memory: ${memoryCalc.value}`);

// Example 5: History tracking
console.log('\\n5. History Tracking:');
const historyCalc = createCalculator(10);
historyCalc.add(5).multiply(3).subtract(15).divide(3);

console.log('Calculation history:');
historyCalc.history.forEach((entry, index) => {
  const operands = entry.operands.join(', ');
  console.log(`  ${index + 1}. ${entry.operation}(${operands}) = ${entry.value}`);
});

// Example 6: Quick calculations (utility functions)
console.log('\\n6. Quick Calculations:');
console.log(`calc.add(10, 25) = ${calc.add(10, 25)}`);
console.log(`calc.multiply(7, 8) = ${calc.multiply(7, 8)}`);
console.log(`calc.power(3, 4) = ${calc.power(3, 4)}`);
console.log(`calc.percentage(150, 20) = ${calc.percentage(150, 20)}`);

// Example 7: Error handling
console.log('\\n7. Error Handling:');
try {
  createCalculator(10).divide(0);
} catch (error) {
  console.log(`Division by zero error: ${error.message}`);
}

try {
  createCalculator(-4).sqrt();
} catch (error) {
  console.log(`Square root of negative number error: ${error.message}`);
}

// Example 8: Formatting output
console.log('\\n8. Formatting Output:');
const formatCalc = createCalculator(Math.PI);
console.log(`Default display: ${formatCalc.display()}`);
console.log(`2 decimal places: ${formatCalc.display(2)}`);
console.log(`4 decimal places: ${formatCalc.display(4)}`);

console.log('\\n✅ All examples completed successfully!');

