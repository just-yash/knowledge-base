
Type : #Note    
Date :  2026-03-24  
Tags :  [[C]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# void pointer.c
- A **void pointer (`void*`)**, also called a **generic pointer**, can store the address of any data type (`int`, `float`, `char`, etc.).
- [[Tokens.c#2. Declaration|declaration]]:
    ```c
    void *ptr;
    ```
- It has **no associated data type**, so the compiler does not know:
    - the size of the data
    - how to interpret the stored address

---
## Operations and Limitations

### 1. Assignment

- A `void*` can store the address of any variable **without explicit casting** (in C).
    
    ```c
    int a = 10;
    void *ptr = &a;  // valid
    ```
    
---
### 2. Dereferencing

- A `void*` **cannot be dereferenced directly**:
    
    ```c
    *ptr;  // ❌ invalid
    ```
    
```c
void * p;
int x = 5;
p = &x;
printf("%d", *p);
```
- [[Errors|Error]] : pointer doesn't know how many bytes it needs to consider here.
- to fix this [[Errors|error]] we need to use [[Type Conversion.c#2. Explicit Type Conversion (Type Casting)|type casting]] 
```c
// type casting doesnt work like this : 

void *p;
int x = 5; 
p = &(int*)x;
p = (int*)&x;
```
- this is the same as `p = &x`
- we know that the [[Operators.c#^6bbec9|precedence of a unary operator]] is right ← left. 
- so this will also not work : 
```c
void *p;
int x= 5;
p = &x;
printf("%d", (int*)*p);  
```

- It must be **typecast to the correct pointer type**: 
 ```c
void *p;
int x= 5;
p = &x;
printf("%d", *(int*)p);  // 5
 ```
#### Reason:
- The compiler needs type information to:
    - determine **how many bytes to read**
    - interpret the data correctly
- Since `void` has **no size**, dereferencing directly is not allowed.
  
### Summary - void pointer 

| **Operation**          | **Allowed?**  | **Reason**                                                                       |
| ---------------------- | ------------- | -------------------------------------------------------------------------------- |
| **Assignment**         | ✅ Yes<br>❌ No | `p = &x;` is always fine.<br>`*p = 10;` compiler doesn't know the size of `void` |
| **Pointer Arithmetic** | ❌ No          | `p++` fails because the compiler doesn't know the step size.                     |
| **Dereferencing**      | ❌ No          | Needs explicit typecasting first `*(type*)p`                                     |
| **Comparison**         | ✅ Yes         | You can check `if (p1 == p2)` to see if they point to the same spot.             |

---
### 3. Pointer Arithmetic

- **Not allowed in standard C**:
    
    ```c
    void* ptr;
    ptr++;  // ❌ invalid (standard C)
    ```
    
- Reason: compiler does not know the size of the data type.
- ⚠️ Some compilers (like GCC) allow it as an extension by treating `void*` as `char*`, but this is **non-portable**.
    
---
### 4. Type Safety Risk

- `void*` removes type checking:
    
    ```c
    int a = 10;
    void *ptr = &a;
    
    printf("%f", *(float*)ptr);  // ⚠️ undefined behavior
    ```
    
- The compiler **will not detect incorrect casts**, leading to runtime errors.
    

---

### 5. Function Pointer Limitation

- `void*` is meant for **object pointers only**.
    
- It is **not guaranteed** to safely store function pointers.
    
---
### Validity of Operations 

| **Expression** | **Type of p** | **Validity** | **Reasoning**                   |
| -------------- | ------------- | ------------ | ------------------------------- |
| `p + 1`        | `void *`      | **Invalid**  | `void` has no size.             |
| `*(int *)p`    | `int *`       | **Valid**    | Explicit cast to `int` pointer. |
| `(int *)p + 1` | `int *`       | **Valid**    | Arithmetic on `int` pointer.    |
| `++(int *)p`   | `int *`       | **Invalid**  | Assoc. evaluated `++p` first.   |
| `((int *)p)++` | `int *`       | **Valid**    | Cast forced by parentheses.     |

---

## Memory Allocation and Usage

### malloc() and calloc()

- These functions return `void*`:
    
    ```c
    int *p = malloc(sizeof(int));  // ✔ valid in C (no cast needed)
    ```
    

#### Important:

- In **C** → casting is **not required**
    
- In **C++** → casting is **required**
    
    ```cpp
    int *p = (int*)malloc(sizeof(int));
    ```
    

---

### Generic Programming

- `void*` enables creation of **generic functions** (e.g., swap, sort) that work with multiple data types.
    

---

## Example

```c
#include <stdio.h>

int main() {
    int n = 10;
    float f = 5.5;
    void *ptr;

    ptr = &n;
    printf("Value of n: %d\n", *(int*)ptr);

    ptr = &f;
    printf("Value of f: %.1f\n", *(float*)ptr);

    return 0;
}
```

---

## Key Question

### Q1) Why can we not dereference a void pointer directly?

**Answer:**

- Dereferencing requires knowledge of the data type.
    
- The compiler must know:
    
    - how many bytes to read
        
    - how to interpret those bytes
        
- Since `void` represents **no type**, this information is unavailable, so dereferencing is not allowed.
    

---
## Summary

- `void*` is a **generic pointer** that can hold any address.
    
- It **must be typecast before dereferencing**.
    
- Pointer arithmetic is **not allowed in standard C**.
    
- Used in **dynamic memory allocation** and **generic programming**.
    
- Reduces **type safety**, so must be used carefully.
    
---