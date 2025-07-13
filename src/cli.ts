#!/usr/bin/env node

import { Command } from 'commander';
import * as readline from 'readline';
import { Calculator, createCalculator } from './calculator';
import { CalculatorError } from './types';

const program = new Command();
const calculator = createCalculator();

program
  .name('calc')
  .description('A simple TypeScript calculator with CLI interface')
  .version('1.0.0');

// Basic operations
program
  .command('add <number>')
  .description('Add a number to current value')
  .action((number: string) => {
    try {
      const result = calculator.add(parseFloat(number));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('subtract <number>')
  .alias('sub')
  .description('Subtract a number from current value')
  .action((number: string) => {
    try {
      const result = calculator.subtract(parseFloat(number));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('multiply <number>')
  .alias('mul')
  .description('Multiply current value by a number')
  .action((number: string) => {
    try {
      const result = calculator.multiply(parseFloat(number));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('divide <number>')
  .alias('div')
  .description('Divide current value by a number')
  .action((number: string) => {
    try {
      const result = calculator.divide(parseFloat(number));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('power <exponent>')
  .alias('pow')
  .description('Raise current value to the power of exponent')
  .action((exponent: string) => {
    try {
      const result = calculator.power(parseFloat(exponent));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('sqrt')
  .description('Calculate square root of current value')
  .action(() => {
    try {
      const result = calculator.sqrt();
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('percentage <percent>')
  .alias('pct')
  .description('Calculate percentage of current value')
  .action((percent: string) => {
    try {
      const result = calculator.percentage(parseFloat(percent));
      console.log(`Result: ${result.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

// Utility commands
program
  .command('set <value>')
  .description('Set the current value')
  .action((value: string) => {
    try {
      calculator.setValue(parseFloat(value));
      console.log(`Value set to: ${calculator.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('clear')
  .description('Clear the calculator (reset to 0)')
  .action(() => {
    calculator.clear();
    console.log('Calculator cleared. Current value: 0');
  });

program
  .command('value')
  .description('Show current value')
  .action(() => {
    console.log(`Current value: ${calculator.display()}`);
  });

program
  .command('history')
  .description('Show calculation history')
  .action(() => {
    const history = calculator.history;
    if (history.length === 0) {
      console.log('No calculation history');
      return;
    }
    
    console.log('Calculation History:');
    history.forEach((result, index) => {
      const operandsStr = result.operands.join(', ');
      console.log(`${index + 1}. ${result.operation}(${operandsStr}) = ${result.value} [${result.timestamp.toLocaleString()}]`);
    });
  });

// Memory commands
program
  .command('memory-store')
  .alias('ms')
  .description('Store current value in memory')
  .action(() => {
    calculator.memoryStore();
    console.log(`Value ${calculator.display()} stored in memory`);
  });

program
  .command('memory-recall')
  .alias('mr')
  .description('Recall value from memory')
  .action(() => {
    try {
      calculator.memoryRecall();
      console.log(`Memory recalled: ${calculator.display()}`);
    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

program
  .command('memory-clear')
  .alias('mc')
  .description('Clear memory')
  .action(() => {
    calculator.memoryClear();
    console.log('Memory cleared');
  });

// Interactive mode
program
  .command('interactive')
  .alias('i')
  .description('Start interactive calculator mode')
  .action(() => {
    startInteractiveMode();
  });

function startInteractiveMode(): void {
  console.log('🧮 Interactive Calculator Mode');
  console.log('Type "help" for available commands, "exit" to quit');
  console.log(`Current value: ${calculator.display()}`);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'calc> '
  });

  rl.prompt();

  rl.on('line', (input: string) => {
    const trimmedInput = input.trim();
    
    if (trimmedInput === 'exit' || trimmedInput === 'quit') {
      console.log('Goodbye! 👋');
      rl.close();
      return;
    }
    
    if (trimmedInput === 'help') {
      showInteractiveHelp();
      rl.prompt();
      return;
    }
    
    if (trimmedInput === '') {
      rl.prompt();
      return;
    }
    
    try {
      processInteractiveCommand(trimmedInput);
    } catch (error) {
      console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    console.log(`Current value: ${calculator.display()}`);
    rl.prompt();
  });

  rl.on('close', () => {
    process.exit(0);
  });
}

function processInteractiveCommand(input: string): void {
  const parts = input.split(' ');
  const command = parts[0].toLowerCase();
  const arg = parts[1];

  switch (command) {
    case '+':
    case 'add':
      calculator.add(parseFloat(arg));
      console.log(`✅ Added ${arg}`);
      break;
    case '-':
    case 'subtract':
    case 'sub':
      calculator.subtract(parseFloat(arg));
      console.log(`✅ Subtracted ${arg}`);
      break;
    case '*':
    case 'multiply':
    case 'mul':
      calculator.multiply(parseFloat(arg));
      console.log(`✅ Multiplied by ${arg}`);
      break;
    case '/':
    case 'divide':
    case 'div':
      calculator.divide(parseFloat(arg));
      console.log(`✅ Divided by ${arg}`);
      break;
    case '^':
    case 'power':
    case 'pow':
      calculator.power(parseFloat(arg));
      console.log(`✅ Raised to power of ${arg}`);
      break;
    case 'sqrt':
      calculator.sqrt();
      console.log('✅ Square root calculated');
      break;
    case '%':
    case 'percentage':
    case 'pct':
      calculator.percentage(parseFloat(arg));
      console.log(`✅ Calculated ${arg}% of value`);
      break;
    case 'set':
      calculator.setValue(parseFloat(arg));
      console.log(`✅ Value set to ${arg}`);
      break;
    case 'clear':
    case 'c':
      calculator.clear();
      console.log('✅ Calculator cleared');
      break;
    case 'value':
    case 'v':
      console.log(`Current value: ${calculator.display()}`);
      break;
    case 'history':
    case 'h':
      showHistory();
      break;
    case 'ms':
      calculator.memoryStore();
      console.log('✅ Value stored in memory');
      break;
    case 'mr':
      calculator.memoryRecall();
      console.log('✅ Memory recalled');
      break;
    case 'mc':
      calculator.memoryClear();
      console.log('✅ Memory cleared');
      break;
    case 'undo':
      calculator.undo();
      console.log('✅ Last operation undone');
      break;
    default:
      console.log(`❓ Unknown command: ${command}. Type "help" for available commands.`);
  }
}

function showInteractiveHelp(): void {
  console.log(`
📖 Available Commands:
  Basic Operations:
    + <number>, add <number>     - Add number to current value
    - <number>, sub <number>     - Subtract number from current value
    * <number>, mul <number>     - Multiply current value by number
    / <number>, div <number>     - Divide current value by number
    ^ <number>, pow <number>     - Raise to power of number
    sqrt                         - Calculate square root
    % <number>, pct <number>     - Calculate percentage of current value

  Utility:
    set <number>                 - Set current value
    clear, c                     - Clear calculator (reset to 0)
    value, v                     - Show current value
    history, h                   - Show calculation history
    undo                         - Undo last operation

  Memory:
    ms                          - Store current value in memory
    mr                          - Recall value from memory
    mc                          - Clear memory

  Other:
    help                        - Show this help
    exit, quit                  - Exit interactive mode
  `);
}

function showHistory(): void {
  const history = calculator.history;
  if (history.length === 0) {
    console.log('📝 No calculation history');
    return;
  }
  
  console.log('📝 Calculation History:');
  history.slice(-10).forEach((result, index) => {
    const operandsStr = result.operands.join(', ');
    console.log(`  ${history.length - 9 + index}. ${result.operation}(${operandsStr}) = ${result.value}`);
  });
}

// If no command provided, start interactive mode
if (process.argv.length === 2) {
  startInteractiveMode();
} else {
  program.parse();
}

