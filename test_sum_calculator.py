#!/usr/bin/env python3
"""
Tests for the Simple Sum Calculator
"""

import unittest
from sum_calculator import sum_numbers, sum_from_list


class TestSumCalculator(unittest.TestCase):
    """Test cases for the sum calculator functions."""
    
    def test_sum_numbers_positive(self):
        """Test summing positive numbers."""
        self.assertEqual(sum_numbers(1, 2, 3, 4, 5), 15)
        self.assertEqual(sum_numbers(10, 20, 30), 60)
        
    def test_sum_numbers_negative(self):
        """Test summing negative numbers."""
        self.assertEqual(sum_numbers(-1, -2, -3), -6)
        self.assertEqual(sum_numbers(-10, 5), -5)
        
    def test_sum_numbers_mixed(self):
        """Test summing mixed positive and negative numbers."""
        self.assertEqual(sum_numbers(10, -5, 3, -2), 6)
        self.assertEqual(sum_numbers(-1, 1, -2, 2), 0)
        
    def test_sum_numbers_floats(self):
        """Test summing floating point numbers."""
        self.assertAlmostEqual(sum_numbers(1.5, 2.5, 3.0), 7.0)
        self.assertAlmostEqual(sum_numbers(0.1, 0.2, 0.3), 0.6, places=10)
        
    def test_sum_numbers_single(self):
        """Test summing a single number."""
        self.assertEqual(sum_numbers(42), 42)
        self.assertEqual(sum_numbers(-17), -17)
        
    def test_sum_numbers_zero(self):
        """Test summing with zero."""
        self.assertEqual(sum_numbers(0), 0)
        self.assertEqual(sum_numbers(0, 0, 0), 0)
        self.assertEqual(sum_numbers(5, 0, -5), 0)
        
    def test_sum_numbers_empty(self):
        """Test summing no numbers."""
        self.assertEqual(sum_numbers(), 0)
        
    def test_sum_numbers_type_error(self):
        """Test that non-numeric types raise TypeError."""
        with self.assertRaises(TypeError):
            sum_numbers(1, 2, "3")
        with self.assertRaises(TypeError):
            sum_numbers([1, 2, 3])
        with self.assertRaises(TypeError):
            sum_numbers(1, None, 3)
            
    def test_sum_from_list_basic(self):
        """Test summing from a list."""
        self.assertEqual(sum_from_list([1, 2, 3, 4, 5]), 15)
        self.assertEqual(sum_from_list([10, -5, 3]), 8)
        
    def test_sum_from_list_empty(self):
        """Test summing from an empty list."""
        self.assertEqual(sum_from_list([]), 0)
        
    def test_sum_from_list_single(self):
        """Test summing from a single-item list."""
        self.assertEqual(sum_from_list([42]), 42)
        
    def test_sum_from_list_floats(self):
        """Test summing floats from a list."""
        self.assertAlmostEqual(sum_from_list([1.1, 2.2, 3.3]), 6.6, places=10)
        
    def test_sum_from_list_type_error(self):
        """Test that non-numeric items in list raise TypeError."""
        with self.assertRaises(TypeError):
            sum_from_list([1, 2, "3"])
        with self.assertRaises(TypeError):
            sum_from_list([1, None, 3])


if __name__ == "__main__":
    unittest.main()
