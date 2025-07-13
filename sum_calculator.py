#!/usr/bin/env python3
"""
Simple Sum Calculator

A basic calculator that can sum multiple numbers.
"""

def sum_numbers(*args):
    """
    Calculate the sum of multiple numbers.
    
    Args:
        *args: Variable number of numeric arguments
        
    Returns:
        float: The sum of all provided numbers
        
    Raises:
        TypeError: If any argument is not a number
    """
    total = 0
    for num in args:
        if not isinstance(num, (int, float)):
            raise TypeError(f"All arguments must be numbers. Got {type(num).__name__}: {num}")
        total += num
    return total


def sum_from_list(numbers):
    """
    Calculate the sum of numbers from a list.
    
    Args:
        numbers (list): List of numbers to sum
        
    Returns:
        float: The sum of all numbers in the list
        
    Raises:
        TypeError: If any item in the list is not a number
    """
    return sum_numbers(*numbers)


def interactive_calculator():
    """
    Interactive calculator that prompts user for numbers to sum.
    """
    print("Simple Sum Calculator")
    print("Enter numbers to sum (press Enter with empty input to calculate):")
    
    numbers = []
    while True:
        try:
            user_input = input(f"Number {len(numbers) + 1} (or press Enter to calculate): ").strip()
            
            if not user_input:
                break
                
            number = float(user_input)
            numbers.append(number)
            
        except ValueError:
            print("Please enter a valid number.")
        except KeyboardInterrupt:
            print("\nCalculation cancelled.")
            return
    
    if not numbers:
        print("No numbers entered.")
        return
    
    try:
        result = sum_from_list(numbers)
        print(f"\nSum of {numbers} = {result}")
    except Exception as e:
        print(f"Error calculating sum: {e}")


if __name__ == "__main__":
    # Example usage
    print("Example calculations:")
    print(f"sum_numbers(1, 2, 3, 4, 5) = {sum_numbers(1, 2, 3, 4, 5)}")
    print(f"sum_from_list([10, 20, 30]) = {sum_from_list([10, 20, 30])}")
    print(f"sum_numbers(1.5, 2.5, 3.0) = {sum_numbers(1.5, 2.5, 3.0)}")
    print()
    
    # Start interactive calculator
    interactive_calculator()
