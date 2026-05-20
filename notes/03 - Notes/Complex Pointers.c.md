
Type : #Note    
Date :  2026-04-05  
Tags :  [[C]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Complex Pointers in C

This guide details the rules and methodologies for interpreting and defining complex pointer declarations in C. The core strategy involves assigned precedence to various operators to read declarations systematically.

---
## Precedence Rules for Reading Pointers

A systematic approach to reading complex pointers involves assigning numerical precedence to the symbols used in the declaration.

### Operator Precedence Hierarchy

1. **Group 1 (Highest):** `()`, `[]` (Parentheses for functions, Brackets for arrays)
    
    - **Associativity:** Left to Right.
        
2. **Group 2:** `*`, `identifier` (Asterisk for pointers, Name/ID of the pointer variable)
    
    - **Associativity:** Right to Left.
        
3. **Group 3 (Lowest):** `Data Type` (int, float, char, void, etc.)

###### Example 
```c
int *p; 
 3  21
 // p is a pointer to integer type
 
float *p1; 
  3   2 1 
  // p1 is a pointer to float type
  
int **p;
 4  321
 // p is a pointer to pointer to integer
 
int *p[10];
 4  32 1  
 // p is an array of 10 elements pointer to integer    
         
int (*p)[10];
 3  1    2                  
 1.2  1.1
 // p is a pointer to an array of 10 elements of int datatype
 
int *p();
 4  32 1 
 // p is a function returning pointer to integer    
         
int (*p)();
 3  1   2           
 1.2  1.1  
 // p is pointer to a function returning integer value  
  
int **p();
 5  432 1   
 // p is a function retuning pointer to pointer to integer  
        
int *(*p)();
 4   3  1  2          
  1.2  1.1
  // p is a pointer to a function returning pointer to integer 
  
int (**p)();
 3    1  2          
 1.3  1.2  1.1
 // p is a pointer to pointer to a function returning integer
 
int (*p)(int, char);
 3    1     2       
 1.2  1.1  2.1  2.2
 // p is pointer to function taking one integer arguement and one char arguement returning integer value
 
int **p[10];
 5  432  1 
 // p is an array of 10 elements pointer to pointer to integer 
        
int *(*p)[10];
 4  3 1   2        
 1.2  1.1 
 // p is a pointer to an array of 10 elements and each element of this array is pointer to integer   
 
int (**p)[10];    
 3     1   2        
 1.3  1.2  1.1  
 // p is a pointer to a pointer to an array of 10 elements of integer type  

void *(*p[5])(int, char);
 4   3   1        2    
 1.3 1.2 1.1  2.1 2.2   
 // p is an array of 5 elements, each element of this array is pointer to a function taking int and char type arguments respectively, returning a pointer to void datatype     
   
int (*(*p)[5])();
 3        1    2     
 1.3  1.1  1.2    
 1.1.2  1.1.1     
 // p is pointer to an array of 5 elements retuning pointer to a function returning int datatype
 
int *(*(*p)(int))[10];
 4  3     1       2  
 1.3  1.1  1.2
 1.1.2  1.1.1             
 // p is a pointer to a function taking an int arguement returning pointer to an array of 10 elements, each element is pointer to integer 
        
int *(*(*p[5]()))();
 4  3      1      2  
 1.2  1.1
 1.1.4  1.1.3  1.1.1  1.1.2
 // p is an array of 5 elements, each element is a function retuning a pointer to pointer to a function returing a pointer to integer   
 // ERROR -> every element of an array cant be a function 
                              
float (*(*p())[])();
  3       1       2   
  1.3  1.1  1.2      
  1.1.3  1.1.2  1.1.1
  // p is a function returing a pointer to an array, each element of the array is pointer to a function returning float value
  
int *((*p)[5])();
 4  3    1     2  
 1.1  1.2  
 1.1.2  1.1.1 
 // p is a pointer to an array of 5 elements, each element is a function returning a pointer to integer   
 // ERROR -> every element of an array cant be a function
```

### Decoding Methodology

- **Step 1:** Locate the identifier (variable name).
    
- **Step 2:** Apply precedence numbers to the remaining symbols based on the hierarchy above.
    
- **Step 3:** Read the declaration in the order of assigned numbers.
    

---

## Concept Analysis: Arrays vs. Pointers

The presence or absence of parentheses significantly alters the meaning of a declaration.

### Array of Pointers vs. Pointer to an Array

|**Declaration**|**Type**|**Interpretation**|
|---|---|---|
|`int *p[10]`|Array of Pointers|`p` is an array of 10 elements, where each element is a pointer to an integer.|
|`int (*p)[10]`|Pointer to an Array|`p` is a pointer to an array of 10 integers.|

###### Example

ASCII Representation of `int *p[10]`:

Plaintext

```
      +---+---+---+---+---+---+---+---+---+---+
p --> | * | * | * | * | * | * | * | * | * | * |
      +---+---+---+---+---+---+---+---+---+---+
        |   |   |   |   |   |   |   |   |   |
        v   v   v   v   v   v   v   v   v   v
       [int][int][int][int][int][int][int][int][int][int]
```

ASCII Representation of `int (*p)[10]`:

Plaintext

```
p ----> [ Array of 10 Integers ]
```

---

## Detailed Pointer Scenarios

### Function Pointers

Functions in C can be referenced via pointers, which is essential for callbacks and dynamic function calls.

#### Pointer to a Function

- **Syntax:** `int (*p)()`
    
- **Interpretation:** `p` is a pointer to a function that returns an integer.
    

#### Function Returning a Pointer

- **Syntax:** `int *p()`
    
- **Interpretation:** `p` is a function returning a pointer to an integer.
    

###### Example

Reading `int (*p[5])(int, char)`:

1. `p` is...
    
2. `[5]` ...an array of 5...
    
3. `*` ...pointers to...
    
4. `()` ...functions...
    
5. `(int, char)` ...taking int and char arguments...
    
6. `int` ...returning an integer.
    

---

## Advanced and Complex Declarations

#### Multi-level Pointers

- `int **p`: `p` is a pointer to a pointer to an integer.
    
- `int ***p`: `p` is a pointer to a pointer to a pointer to an integer.
    

#### Complex Combinations

###### Q1) Interpret `int (*(*p)())[10]`

A1)

1. `p` is a pointer...
    
2. ...to a function...
    
3. ...returning a pointer...
    
4. ...to an array of 10 integers.
    

###### Q2) Interpret `int *(*(*p[5])())()`

A2)

1. `p` is an array of 5 pointers...
    
2. ...to functions...
    
3. ...returning a pointer to a function...
    
4. ...returning a pointer to an integer.
    

---
## Invalid Declarations

Certain combinations are syntactically valid but logically impossible in C, leading to errors.

- **Array of Functions:** `int p[5]()` is invalid. While an array of function pointers is valid, a direct array of function definitions is not allowed.
    
- **Function Returning an Array:** `int p()[]` is invalid. Functions cannot return arrays directly; they must return a pointer to an array.
 
---
# Summary

- **Identification:** Always start decoding from the variable name (identifier).
    
- **Precedence:** Brackets `[]` and function parentheses `()` have the highest priority.
    
- **Pointers:** Asterisks `*` are evaluated next, moving right to left.
    
- **Return Type:** Data types have the lowest priority and represent the final result.
    
- **Validation:** Functions cannot return arrays directly, and you cannot have an array of functions (only an array of function pointers).

---
# References

- [Standard C Programming Documentation](https://en.cppreference.com/w/c/language/pointer)
    
- [YouTube Video Reference](https://www.google.com/search?q=https://youtu.be/0an69DcHsT0)
---
# Questions 



