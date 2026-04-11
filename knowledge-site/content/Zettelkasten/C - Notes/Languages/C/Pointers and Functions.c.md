
Date :  2026-04-06  
Tags :  [[C]]  
~ ***Yash Agrawall*** ~  

---
# Pointers and Functions.c
## Core Function Argument Methods

In C programming, there are two primary ways to pass arguments to a function. The difference lies in whether the function operates on a copy of the data or the original data itself.

### Call by Value

In Call by Value, the actual values of the variables are passed as arguments to the formal parameters of the function.

- **Mechanism:** The function creates a separate local copy of the variables in its own memory space.
    
- **Result:** Any changes made inside the function are applied only to the local copies and do not reflect in the original variables of the calling function.
    

### Call by Reference

In Call by Reference, the addresses of the variables (using the address-of operator `&`) are passed to the function.

- **Mechanism:** The function's parameters must be pointers (using the `*` operator) to hold these addresses.
    
- **Result:** The function can access and modify the original variables directly in memory by dereferencing the pointers.
    

---
## Detailed Analysis: The Swapping Problem

The standard way to swap two numbers using a temporary variable serves as the best example to distinguish between these two methods.

### Swapping using Call by Value (Ineffective)

In this scenario, the values are copied, and the original variables remain unchanged after the function call.

```c
void main() {
    int x = 5, y = 2;
    swap(x, y); // Passing values
    printf("%d %d", x, y); // Output remains: 5 2
}

void swap(int a, int b) {
    int t;
    t = a;
    a = b;
    b = t;
    // Only local 'a' and 'b' are swapped
}
```

### Swapping using Call by Reference (Effective)

By passing the addresses of `x` and `y`, the `swap` function can modify the original values.

```c
void main() {
    int x = 5, y = 2;
    swap(&x, &y); // Passing addresses
    printf("%d %d", x, y); // Output: 2 5
}

void swap(int *a, int *b) {
    int t;
    t = *a;   // t = value at address a (5)
    *a = *b;  // value at address a = value at address b (2)
    *b = t;   // value at address b = 5
}
```

###### Example: Memory Visualization

In Call by Reference:

1. `x` is at address 2000, `y` is at 4000.
    
2. Pointer `a` stores 2000, pointer `b` stores 4000.
    
3. Operations like `*a = *b` directly overwrite the memory at address 2000 with the value from 4000.
    

---

## Syntactic Requirements for Call by Reference

1. **Function Prototype:** Must declare parameters as pointers (e.g., `void swap(int *, int *);`).
    
2. **Function Call:** Must pass addresses using the `&` operator (e.g., `swap(&x, &y);`).
    
3. **Function Definition:** Must use the dereference operator `*` to access and change the values at those addresses.
    

---

# Summary

- **Call by Value:** Simple but cannot modify original data; uses more memory for large structures due to copying.
    
- **Call by Reference:** Efficient and allows direct modification of original variables; essential for functions that need to "return" or update multiple values.
    
- **Key Operators:** `&` (Address-of) to send an address, and `*` (Value-at-address) to use it.
    
---
# References

- [YouTube Source: Pointer and Function](http://www.youtube.com/watch?v=GJAsx4i-rko)
    
- [C Programming: Call by Reference](https://en.cppreference.com/w/c/language/operator_precedence)

- [[pointers.c]]