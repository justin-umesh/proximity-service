# 🧮 TypeScript Calculator

A comprehensive, feature-rich calculator library built with TypeScript, offering both programmatic API and command-line interface.

## ✨ Features

- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Operations**: Power, square root, percentage calculations
- **Memory Functions**: Store, recall, add to memory, subtract from memory
- **Method Chaining**: Fluent API for complex calculations
- **History Tracking**: Keep track of all operations performed
- **Error Handling**: Comprehensive error handling with custom error types
- **CLI Interface**: Interactive command-line calculator
- **TypeScript Support**: Full type safety and IntelliSense support
- **Undo Functionality**: Undo previous operations
- **Flexible Display**: Format numbers with custom decimal places

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd proximity-service

# Install dependencies
npm install

# Build the project
npm run build
```

### Basic Usage

```typescript
import { createCalculator, calc } from './src';

// Create a calculator instance
const calculator = createCalculator(10);

// Basic operations with method chaining
calculator
  .add(5)        // 15
  .multiply(2)   // 30
  .subtract(10)  // 20
  .divide(4);    // 5

console.log(calculator.value); // 5

// Quick calculations
console.log(calc.add(10, 25));      // 35
console.log(calc.multiply(7, 8));   // 56
console.log(calc.power(2, 8));      // 256
```

## 📖 API Reference

### Calculator Class

#### Constructor & Factory

```typescript
import { Calculator, createCalculator } from './src';

// Create with default value (0)
const calc1 = new Calculator();
const calc2 = createCalculator();

// Create with initial value
const calc3 = createCalculator(42);
```

#### Basic Operations

```typescript
calculator.add(number)        // Addition
calculator.subtract(number)   // Subtraction
calculator.multiply(number)   // Multiplication
calculator.divide(number)     // Division (throws error on division by zero)
```

#### Advanced Operations

```typescript
calculator.power(exponent)    // Raise to power
calculator.sqrt()            // Square root (throws error for negative numbers)
calculator.percentage(percent) // Calculate percentage
```

#### Memory Operations

```typescript
calculator.memoryStore()      // Store current value in memory
calculator.memoryRecall()     // Recall value from memory
calculator.memoryClear()      // Clear memory
calculator.memoryAdd(value?)  // Add to memory (current value if no parameter)
calculator.memorySubtract(value?) // Subtract from memory
```

#### Utility Methods

```typescript
calculator.setValue(number)   // Set current value
calculator.clear()           // Reset to 0
calculator.display(decimals?) // Format for display
calculator.toString()        // Convert to string
calculator.undo()           // Undo last operation
calculator.clearHistory()   // Clear calculation history
```

#### Properties

```typescript
calculator.value            // Current value (readonly)
calculator.memory          // Memory value (readonly, null if empty)
calculator.history         // Calculation history (readonly)
```

### Quick Calculation Functions

```typescript
import { calc } from './src';

calc.add(a, b)              // a + b
calc.subtract(a, b)         // a - b
calc.multiply(a, b)         // a * b
calc.divide(a, b)           // a / b
calc.power(base, exponent)  // base^exponent
calc.sqrt(value)            // √value
calc.percentage(value, percent) // (value * percent) / 100
```

## 🖥️ Command Line Interface

### Installation for CLI

```bash
# Build the project
npm run build

# Run CLI directly
npm run cli

# Or use the built version
node dist/cli.js
```

### CLI Commands

#### Basic Operations
```bash
# Individual commands
calc add 5
calc subtract 3
calc multiply 2
calc divide 4

# Aliases
calc sub 3    # subtract
calc mul 2    # multiply
calc div 4    # divide
calc pow 3    # power
calc pct 25   # percentage
```

#### Utility Commands
```bash
calc set 42        # Set current value
calc clear         # Clear calculator
calc value         # Show current value
calc history       # Show calculation history
```

#### Memory Commands
```bash
calc memory-store    # Store in memory (alias: ms)
calc memory-recall   # Recall from memory (alias: mr)
calc memory-clear    # Clear memory (alias: mc)
```

#### Interactive Mode
```bash
# Start interactive mode
calc interactive
# or
calc i
# or just
calc

# Interactive commands
calc> + 5          # Add 5
calc> * 2          # Multiply by 2
calc> sqrt         # Square root
calc> help         # Show help
calc> exit         # Exit interactive mode
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## 📝 Examples

### Basic Example

```typescript
import { createCalculator } from './src';

const calc = createCalculator(100);

// Calculate 25% of 100, then find square root
const result = calc
  .percentage(25)  // 25
  .sqrt();         // 5

console.log(result.value); // 5
```

### Advanced Example

```typescript
import { createCalculator } from './src';

// Compound interest calculation: A = P(1 + r/n)^(nt)
function compoundInterest(principal: number, rate: number, n: number, t: number) {
  return createCalculator(1)
    .add(rate / n)           // (1 + r/n)
    .power(n * t)            // ^(nt)
    .multiply(principal)     // P * result
    .value;
}

const result = compoundInterest(1000, 0.05, 12, 2);
console.log(`Final amount: $${result.toFixed(2)}`);
```

### Error Handling

```typescript
import { createCalculator, CalculatorError } from './src';

const calc = createCalculator(10);

try {
  calc.divide(0);
} catch (error) {
  if (error instanceof CalculatorError) {
    console.log(`Calculator error: ${error.message}`);
    console.log(`Operation: ${error.operation}`);
  }
}
```

### Memory Usage

```typescript
import { createCalculator } from './src';

const calc = createCalculator(42);

calc.memoryStore();           // Store 42 in memory
calc.setValue(0);             // Reset to 0
calc.memoryRecall();          // Recall 42
calc.memoryAdd(8);            // Add 8 to memory (now 50)
calc.memoryRecall();          // Current value is now 50

console.log(calc.memory);     // 50
```

### History Tracking

```typescript
import { createCalculator } from './src';

const calc = createCalculator(10);
calc.add(5).multiply(3).subtract(15);

// View history
calc.history.forEach((entry, index) => {
  console.log(`${index + 1}. ${entry.operation}: ${entry.value}`);
});

// Undo last operation
calc.undo();
console.log(calc.value); // Back to previous value
```

## 🛠️ Development

### Available Scripts

```bash
npm run build        # Build TypeScript to JavaScript
npm run dev          # Run in development mode
npm run start        # Run built version
npm run cli          # Start CLI interface
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run clean        # Clean build directory
```

### Project Structure

```
src/
├── calculator.ts           # Main Calculator class
├── types.ts               # Type definitions
├── cli.ts                 # Command-line interface
├── index.ts               # Main entry point
├── __tests__/
│   └── calculator.test.ts # Test suite
└── examples/
    ├── basic-usage.ts     # Basic usage examples
    └── advanced-usage.ts  # Advanced usage examples
```

## 🔧 Configuration

### TypeScript Configuration

The project uses modern TypeScript configuration with strict type checking:

- Target: ES2020
- Strict mode enabled
- Declaration files generated
- Source maps included

### Testing Configuration

Uses Jest with ts-jest for TypeScript support:

- Test files: `**/__tests__/**/*.test.ts`
- Coverage reports in multiple formats
- Node.js test environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Build the project: `npm run build`
7. Commit your changes: `git commit -am 'Add feature'`
8. Push to the branch: `git push origin feature-name`
9. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the examples in the `src/examples/` directory
2. Run the test suite to ensure everything is working
3. Create an issue with detailed information about the problem

## 🚀 Future Enhancements

- [ ] Scientific calculator functions (sin, cos, tan, log, etc.)
- [ ] Expression parser for string-based calculations
- [ ] Plugin system for custom operations
- [ ] Web interface
- [ ] REST API endpoints
- [ ] Calculation export/import functionality
- [ ] Multiple number base support (binary, hexadecimal, etc.)

---

**Happy Calculating! 🧮✨**

