export interface Question {
    id: string;
    title: string;
    description: string;
    interrogationQuestion: string;
    templates: {
        javascript: string;
        python: string;
        cpp: string;
        c: string;
    };
    extension: {
        javascript: string;
        python: string;
        cpp: string;
        c: string;
    };
}

export const QUESTIONS: Question[] = [
    {
        id: 'hello-world',
        title: 'Hello World',
        description: 'Write a program that prints "Hello, World!". This is a simple test to ensure your environment is set up correctly.',
        interrogationQuestion: 'Explain how you used the standard output function in your chosen language to print the exact text requested.',
        templates: {
            javascript: '// Print "Hello, World!"\nfunction helloWorld() {\n    // Your code here\n}',
            python: '# Print "Hello, World!"\ndef hello_world():\n    # Your code here\n    pass',
            cpp: '// Print "Hello, World!"\n#include <iostream>\nusing namespace std;\n\nvoid helloWorld() {\n    // Your code here\n}',
            c: '// Print "Hello, World!"\n#include <stdio.h>\n\nvoid helloWorld() {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'odd-or-even',
        title: 'Odd or Even Number',
        description: 'Write a function that determines whether a given integer is odd or even. For the purpose of this exercise, you should return true if even and false if odd.',
        interrogationQuestion: 'How does the modulo operator help in determining if a number is even or odd, and what does it actually calculate?',
        templates: {
            javascript: '// Return true if n is even\nfunction isEven(n) {\n    // Your code here\n}',
            python: '# Return True if n is even\ndef is_even(n):\n    # Your code here\n    pass',
            cpp: '// Return true if n is even\nbool isEven(int n) {\n    // Your code here\n}',
            c: '// Return true if n is even\n#include <stdbool.h>\n\nbool isEven(int n) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'prime-number',
        title: 'Prime Number Verification',
        description: 'Implement a function that checks if a given integer is a prime number. Optimize for performance by checking up to the square root of the number.',
        interrogationQuestion: 'Why is it mathematically sufficient to check for factors only up to the square root of the number "n" instead of checking all the way to "n-1"?',
        templates: {
            javascript: '// Verify if a number is prime\nfunction isPrime(n) {\n    // Your code here\n}',
            python: '# Verify if a number is prime\ndef is_prime(n):\n    # Your code here\n    pass',
            cpp: '// Verify if a number is prime\nbool isPrime(int n) {\n    // Your code here\n}',
            c: '// Verify if a number is prime\n#include <stdbool.h>\n\nbool isPrime(int n) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'factorial-calculation',
        title: 'Factorial Calculation',
        description: 'Implement a function to calculate the factorial of an integer n. Ensure it handles the base case (0! = 1) correctly.',
        interrogationQuestion: 'Explain how your code ensures that the factorial of 0 correctly returns 1, and what happens in your loop for larger values of "n"?',
        templates: {
            javascript: '// Calculate factorial of n\nfunction factorial(n) {\n    // Your code here\n}',
            python: '# Calculate factorial of n\ndef factorial(n):\n    # Your code here\n    pass',
            cpp: '// Calculate factorial of n\nlong long factorial(int n) {\n    // Your code here\n}',
            c: '// Calculate factorial of n\nlong long factorial(int n) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'fibonacci-series',
        title: 'Fibonacci Sequence',
        description: 'Write a function that returns the n-th Fibonacci number. Consider both iterative and recursive approaches, though iteration is generally preferred for large n.',
        interrogationQuestion: 'In your iterative approach, explain how you update the temporary variables to compute the next number in the sequence without losing the previous context.',
        templates: {
            javascript: '// Get n-th Fibonacci number\nfunction fibonacci(n) {\n    // Your code here\n}',
            python: '# Get n-th Fibonacci number\ndef fibonacci(n):\n    # Your code here\n    pass',
            cpp: '// Get n-th Fibonacci number\nlong long fibonacci(int n) {\n    // Your code here\n}',
            c: '// Get n-th Fibonacci number\nlong long fibonacci(int n) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'armstrong-number',
        title: 'Armstrong Number Check',
        description: 'Write a function to check if a given integer is an Armstrong number. An Armstrong number of three digits is an integer such that the sum of the cubes of its digits is equal to the number itself.',
        interrogationQuestion: 'Describe the mathematical operations you used in your loop to extract individual digits from the overall number to sum their cubes.',
        templates: {
            javascript: '// Check if n is an Armstrong number\nfunction isArmstrong(n) {\n    // Your code here\n}',
            python: '# Check if n is an Armstrong number\ndef is_armstrong(n):\n    # Your code here\n    pass',
            cpp: '// Check if n is an Armstrong number\nbool isArmstrong(int n) {\n    // Your code here\n}',
            c: '// Check if n is an Armstrong number\n#include <stdbool.h>\n\nbool isArmstrong(int n) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    },
    {
        id: 'palindrome-check',
        title: 'Palindrome Check',
        description: 'Write a function to determine if a given string is a palindrome. A palindrome reads the same forwards and backwards, ignoring case and non-alphanumeric characters.',
        interrogationQuestion: 'Explain how your logic handles non-alphanumeric characters (like spaces or punctuation) to ensure they do not interfere with the palindrome comparison.',
        templates: {
            javascript: '// Check if a string is a palindrome\nfunction isPalindrome(s) {\n    // Your code here\n}',
            python: '# Check if a string is a palindrome\ndef is_palindrome(s):\n    # Your code here\n    pass',
            cpp: '// Check if a string is a palindrome\n#include <string>\n\nbool isPalindrome(std::string s) {\n    // Your code here\n}',
            c: '// Check if a string is a palindrome\n#include <stdbool.h>\n\nbool isPalindrome(char* s) {\n    // Your code here\n}'
        },
        extension: {
            javascript: 'js',
            python: 'py',
            cpp: 'cpp',
            c: 'c'
        }
    }
];
