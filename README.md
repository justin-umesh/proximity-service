# proximity-service

## Simple Sum Calculator

This repository contains a simple sum calculator implemented in Python.

### Features

- **sum_numbers(*args)**: Calculate the sum of multiple numbers passed as arguments
- **sum_from_list(numbers)**: Calculate the sum of numbers from a list
- **interactive_calculator()**: Interactive mode for user input
- Comprehensive error handling for non-numeric inputs
- Support for both integers and floating-point numbers

### Usage

#### Basic Usage

```python
from sum_calculator import sum_numbers, sum_from_list

# Sum multiple arguments
result = sum_numbers(1, 2, 3, 4, 5)  # Returns 15

# Sum from a list
result = sum_from_list([10, 20, 30])  # Returns 60

# Works with floats too
result = sum_numbers(1.5, 2.5, 3.0)  # Returns 7.0
```

#### Interactive Mode

Run the calculator interactively:

```bash
python3 sum_calculator.py
```

This will start an interactive session where you can enter numbers one by one.

#### Running Tests

```bash
python3 test_sum_calculator.py
```

### Files

- `sum_calculator.py` - Main calculator implementation
- `test_sum_calculator.py` - Comprehensive test suite
- `README.md` - This documentation
