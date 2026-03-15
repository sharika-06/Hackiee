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

// ─── BEGINNER ──────────────────────────────────────────────────────────────
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
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'odd-or-even',
        title: 'Odd or Even Number',
        description: 'Write a function that determines whether a given integer is odd or even. Return true if even and false if odd.',
        interrogationQuestion: 'How does the modulo operator help in determining if a number is even or odd, and what does it actually calculate?',
        templates: {
            javascript: '// Return true if n is even\nfunction isEven(n) {\n    // Your code here\n}',
            python: '# Return True if n is even\ndef is_even(n):\n    # Your code here\n    pass',
            cpp: '// Return true if n is even\nbool isEven(int n) {\n    // Your code here\n}',
            c: '// Return true if n is even\n#include <stdbool.h>\n\nbool isEven(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'prime-number',
        title: 'Prime Number Verification',
        description: 'Implement a function that checks if a given integer is a prime number. Optimize for performance by checking up to the square root of the number.',
        interrogationQuestion: 'Why is it mathematically sufficient to check for factors only up to the square root of the number instead of checking all the way to n-1?',
        templates: {
            javascript: '// Verify if a number is prime\nfunction isPrime(n) {\n    // Your code here\n}',
            python: '# Verify if a number is prime\ndef is_prime(n):\n    # Your code here\n    pass',
            cpp: '// Verify if a number is prime\nbool isPrime(int n) {\n    // Your code here\n}',
            c: '// Verify if a number is prime\n#include <stdbool.h>\n\nbool isPrime(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'factorial-calculation',
        title: 'Factorial Calculation',
        description: 'Implement a function to calculate the factorial of an integer n. Ensure it handles the base case (0! = 1) correctly.',
        interrogationQuestion: 'Explain how your code ensures that the factorial of 0 correctly returns 1, and what happens in your loop for larger values of n?',
        templates: {
            javascript: '// Calculate factorial of n\nfunction factorial(n) {\n    // Your code here\n}',
            python: '# Calculate factorial of n\ndef factorial(n):\n    # Your code here\n    pass',
            cpp: '// Calculate factorial of n\nlong long factorial(int n) {\n    // Your code here\n}',
            c: '// Calculate factorial of n\nlong long factorial(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'fibonacci-series',
        title: 'Fibonacci Sequence',
        description: 'Write a function that returns the n-th Fibonacci number. Consider both iterative and recursive approaches.',
        interrogationQuestion: 'In your iterative approach, explain how you update the temporary variables to compute the next number in the sequence without losing the previous context.',
        templates: {
            javascript: '// Get n-th Fibonacci number\nfunction fibonacci(n) {\n    // Your code here\n}',
            python: '# Get n-th Fibonacci number\ndef fibonacci(n):\n    # Your code here\n    pass',
            cpp: '// Get n-th Fibonacci number\nlong long fibonacci(int n) {\n    // Your code here\n}',
            c: '// Get n-th Fibonacci number\nlong long fibonacci(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'armstrong-number',
        title: 'Armstrong Number Check',
        description: 'Write a function to check if a given integer is an Armstrong number (sum of cubes of digits equals the number itself).',
        interrogationQuestion: 'Describe the mathematical operations you used in your loop to extract individual digits from the overall number to sum their cubes.',
        templates: {
            javascript: '// Check if n is an Armstrong number\nfunction isArmstrong(n) {\n    // Your code here\n}',
            python: '# Check if n is an Armstrong number\ndef is_armstrong(n):\n    # Your code here\n    pass',
            cpp: '// Check if n is an Armstrong number\nbool isArmstrong(int n) {\n    // Your code here\n}',
            c: '// Check if n is an Armstrong number\n#include <stdbool.h>\n\nbool isArmstrong(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'palindrome-check',
        title: 'Palindrome Check',
        description: 'Write a function to determine if a given string is a palindrome, ignoring case and non-alphanumeric characters.',
        interrogationQuestion: 'Explain how your logic handles non-alphanumeric characters to ensure they do not interfere with the palindrome comparison.',
        templates: {
            javascript: '// Check if a string is a palindrome\nfunction isPalindrome(s) {\n    // Your code here\n}',
            python: '# Check if a string is a palindrome\ndef is_palindrome(s):\n    # Your code here\n    pass',
            cpp: '// Check if a string is a palindrome\n#include <string>\n\nbool isPalindrome(std::string s) {\n    // Your code here\n}',
            c: '// Check if a string is a palindrome\n#include <stdbool.h>\n\nbool isPalindrome(char* s) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    }
];

// ─── INTERMEDIATE — Series & Patterns ──────────────────────────────────────
export const INTERMEDIATE_QUESTIONS: Question[] = [
    {
        id: 'number-pattern',
        title: 'Number Triangle Pattern',
        description: 'Print a right-angled triangle number pattern of n rows. Row 1 has "1", row 2 has "1 2", row 3 has "1 2 3", and so on.',
        interrogationQuestion: 'Explain the role of the nested loops in constructing the triangle pattern, and how the inner loop boundary relates to the outer loop variable.',
        templates: {
            javascript: '// Print number triangle pattern of n rows\nfunction numberTriangle(n) {\n    // Your code here\n}',
            python: '# Print number triangle pattern of n rows\ndef number_triangle(n):\n    # Your code here\n    pass',
            cpp: '// Print number triangle pattern of n rows\nvoid numberTriangle(int n) {\n    // Your code here\n}',
            c: '// Print number triangle pattern of n rows\nvoid numberTriangle(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'star-pattern',
        title: 'Star Pyramid Pattern',
        description: 'Print a centered star pyramid of n rows. Each row i (1-indexed) has (2i-1) stars, centered with leading spaces.',
        interrogationQuestion: 'Describe how you calculate the number of leading spaces and stars for each row to achieve the centered pyramid effect.',
        templates: {
            javascript: '// Print centered star pyramid of n rows\nfunction starPyramid(n) {\n    // Your code here\n}',
            python: '# Print centered star pyramid of n rows\ndef star_pyramid(n):\n    # Your code here\n    pass',
            cpp: '// Print centered star pyramid of n rows\nvoid starPyramid(int n) {\n    // Your code here\n}',
            c: '// Print centered star pyramid of n rows\nvoid starPyramid(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'sum-of-digits',
        title: 'Sum of Digits',
        description: 'Write a function that repeatedly sums the digits of a number until a single digit remains (digital root). E.g., 493 → 4+9+3=16 → 1+6=7.',
        interrogationQuestion: 'Why is the digital root of a number always equivalent to n mod 9 (with special treatment for multiples of 9), and how does this relate to your loop?',
        templates: {
            javascript: '// Compute digital root of n\nfunction digitalRoot(n) {\n    // Your code here\n}',
            python: '# Compute digital root of n\ndef digital_root(n):\n    # Your code here\n    pass',
            cpp: '// Compute digital root of n\nint digitalRoot(int n) {\n    // Your code here\n}',
            c: '// Compute digital root of n\nint digitalRoot(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'collatz-sequence',
        title: 'Collatz Sequence',
        description: 'Generate the Collatz sequence starting from n: if n is even divide by 2, if odd multiply by 3 and add 1. Stop when n reaches 1. Return the full sequence.',
        interrogationQuestion: 'Explain why the Collatz conjecture remains unproven despite seeming simple, and what your code does differently for even vs odd numbers.',
        templates: {
            javascript: '// Return Collatz sequence starting from n\nfunction collatz(n) {\n    // Your code here\n}',
            python: '# Return Collatz sequence starting from n\ndef collatz(n):\n    # Your code here\n    pass',
            cpp: '// Return Collatz sequence starting from n\n#include <vector>\nstd::vector<int> collatz(int n) {\n    // Your code here\n}',
            c: '// Print Collatz sequence starting from n\nvoid collatz(int n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'pascal-triangle',
        title: "Pascal's Triangle",
        description: "Generate the first n rows of Pascal's Triangle. Each element is the sum of the two elements directly above it.",
        interrogationQuestion: "Describe how you compute each element in a row using the previous row, and explain the relationship between Pascal's Triangle and binomial coefficients.",
        templates: {
            javascript: "// Generate n rows of Pascal's Triangle\nfunction pascalTriangle(n) {\n    // Your code here\n}",
            python: "# Generate n rows of Pascal's Triangle\ndef pascal_triangle(n):\n    # Your code here\n    pass",
            cpp: "// Generate n rows of Pascal's Triangle\n#include <vector>\nstd::vector<std::vector<int>> pascalTriangle(int n) {\n    // Your code here\n}",
            c: "// Print n rows of Pascal's Triangle\nvoid pascalTriangle(int n) {\n    // Your code here\n}"
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'reverse-number',
        title: 'Reverse a Number',
        description: 'Write a function that reverses the digits of an integer. E.g., 1234 → 4321. Handle negative numbers by preserving the sign.',
        interrogationQuestion: 'Explain the digit extraction technique using modulo and integer division, and how you reassemble the reversed number.',
        templates: {
            javascript: '// Reverse digits of n\nfunction reverseNumber(n) {\n    // Your code here\n}',
            python: '# Reverse digits of n\ndef reverse_number(n):\n    # Your code here\n    pass',
            cpp: '// Reverse digits of n\nlong long reverseNumber(long long n) {\n    // Your code here\n}',
            c: '// Reverse digits of n\nlong long reverseNumber(long long n) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    }
];

// ─── EXPERT — DSA ──────────────────────────────────────────────────────────
export const EXPERT_QUESTIONS: Question[] = [
    {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Implement binary search on a sorted array. Return the index of the target element, or -1 if not found. Achieve O(log n) time complexity.',
        interrogationQuestion: 'Explain exactly how you calculate the mid-point to avoid integer overflow, and what you do when the mid element is greater vs less than the target.',
        templates: {
            javascript: '// Binary search: return index of target or -1\nfunction binarySearch(arr, target) {\n    // Your code here\n}',
            python: '# Binary search: return index of target or -1\ndef binary_search(arr, target):\n    # Your code here\n    pass',
            cpp: '// Binary search: return index of target or -1\nint binarySearch(std::vector<int>& arr, int target) {\n    // Your code here\n}',
            c: '// Binary search: return index of target or -1\nint binarySearch(int* arr, int n, int target) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'linked-list-reverse',
        title: 'Reverse a Linked List',
        description: 'Implement a function to reverse a singly linked list in-place. Return the new head. Achieve O(n) time and O(1) space.',
        interrogationQuestion: 'Walk through exactly what happens to the next pointers during one iteration of your loop. What are the three pointer assignments and why are they in that order?',
        templates: {
            javascript: '// Node class and reverseList function\nclass ListNode {\n    constructor(val, next = null) {\n        this.val = val;\n        this.next = next;\n    }\n}\n\nfunction reverseList(head) {\n    // Your code here\n}',
            python: '# Node class and reverse_list function\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your code here\n    pass',
            cpp: '// Reverse linked list in-place\nstruct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int v) : val(v), next(nullptr) {}\n};\n\nListNode* reverseList(ListNode* head) {\n    // Your code here\n}',
            c: '// Reverse linked list in-place\ntypedef struct Node {\n    int val;\n    struct Node* next;\n} Node;\n\nNode* reverseList(Node* head) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'two-sum',
        title: 'Two Sum (Hash Map)',
        description: 'Given an array of integers and a target sum, return the indices of the two numbers that add up to the target. Use a hash map to achieve O(n) time complexity.',
        interrogationQuestion: 'Explain why using a hash map reduces this from an O(n²) brute-force solution to O(n), and what exactly you store as the key and value.',
        templates: {
            javascript: '// Return indices [i, j] such that arr[i]+arr[j] === target\nfunction twoSum(arr, target) {\n    // Your code here\n}',
            python: '# Return indices [i, j] such that arr[i]+arr[j] == target\ndef two_sum(arr, target):\n    # Your code here\n    pass',
            cpp: '// Return indices such that arr[i]+arr[j] == target\n#include <vector>\n#include <unordered_map>\nstd::vector<int> twoSum(std::vector<int>& arr, int target) {\n    // Your code here\n}',
            c: '// Print indices i, j such that arr[i]+arr[j] == target\nvoid twoSum(int* arr, int n, int target) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'stack-using-queue',
        title: 'Implement Stack Using Queue',
        description: 'Implement a LIFO stack using only queue operations (enqueue, dequeue, peek, size). The push operation can be costly.',
        interrogationQuestion: 'Describe the reordering trick you use to make the most recently pushed element accessible at the front of the queue, and what the amortized complexity is.',
        templates: {
            javascript: '// Implement Stack using Queue\nclass MyStack {\n    constructor() {\n        this.queue = [];\n    }\n    push(x) { /* Your code here */ }\n    pop()    { /* Your code here */ }\n    top()    { /* Your code here */ }\n    empty()  { /* Your code here */ }\n}',
            python: '# Implement Stack using Queue\nfrom collections import deque\n\nclass MyStack:\n    def __init__(self):\n        self.queue = deque()\n    def push(self, x): pass  # Your code\n    def pop(self):     pass  # Your code\n    def top(self):     pass  # Your code\n    def empty(self):   pass  # Your code',
            cpp: '// Implement Stack using Queue\n#include <queue>\nclass MyStack {\n    std::queue<int> q;\npublic:\n    void push(int x) { /* Your code */ }\n    int pop()        { /* Your code */ }\n    int top()        { /* Your code */ }\n    bool empty()     { /* Your code */ }\n};',
            c: '// Implement Stack push using circular array queue\nvoid stackPush(int* queue, int* front, int* rear, int size, int x) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'merge-sort',
        title: 'Merge Sort',
        description: 'Implement the merge sort algorithm. Sort an array in ascending order in O(n log n) time. Implement both the divide and merge steps.',
        interrogationQuestion: 'Explain the "merge" step: how do you combine two already-sorted halves into a single sorted array, and what determines when you stop comparing elements from each half?',
        templates: {
            javascript: '// Sort array using merge sort; return sorted array\nfunction mergeSort(arr) {\n    // Your code here\n}',
            python: '# Sort array using merge sort; return sorted array\ndef merge_sort(arr):\n    # Your code here\n    pass',
            cpp: '// Sort array in-place using merge sort\n#include <vector>\nvoid mergeSort(std::vector<int>& arr, int left, int right) {\n    // Your code here\n}',
            c: '// Sort array in-place using merge sort\nvoid mergeSort(int* arr, int left, int right) {\n    // Your code here\n}'
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    },
    {
        id: 'detect-cycle',
        title: 'Detect Cycle in Linked List',
        description: "Detect if a linked list has a cycle using Floyd's Tortoise and Hare algorithm. Return true if a cycle exists, false otherwise. O(n) time, O(1) space.",
        interrogationQuestion: "Explain Floyd's algorithm: why does the fast pointer eventually meet the slow pointer inside the cycle, and why doesn't a single-speed pointer suffice?",
        templates: {
            javascript: '// Detect cycle using Floyd\'s algorithm\nclass ListNode {\n    constructor(val, next = null) { this.val = val; this.next = next; }\n}\n\nfunction hasCycle(head) {\n    // Your code here\n}',
            python: "# Detect cycle using Floyd's algorithm\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef has_cycle(head):\n    # Your code here\n    pass",
            cpp: "// Detect cycle using Floyd's algorithm\nstruct ListNode { int val; ListNode* next; };\nbool hasCycle(ListNode* head) {\n    // Your code here\n}",
            c: "// Detect cycle using Floyd's algorithm\ntypedef struct Node { int val; struct Node* next; } Node;\nbool hasCycle(Node* head) {\n    // Your code here\n}"
        },
        extension: { javascript: 'js', python: 'py', cpp: 'cpp', c: 'c' }
    }
];
