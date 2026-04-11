
Date :  2026-04-06  
Tags :  [[C]]   
~ ***Yash Agrawall*** ~  

---
# Dynamic Memory Allocation (DMA)

- Dynamic Memory Allocation refers to the process of allocating memory at **runtime**. 
- This is distinct from static memory allocation, where the size of data structures must be known and fixed at compile time.

## Core Concepts of DMA

- **Runtime vs. Compile Time:** DMA allows for memory requirements to be determined based on user input or program state during execution.
    
- **Heap Memory:** All dynamically allocated memory is sourced from the **Heap** section of the memory.
    
    - _Static Memory_ (e.g., `int x;`, `int arr[100];`) is allocated from the **Stack**.
        
- **Pointer Requirement:** Since dynamic memory lacks a variable name, it must be accessed via a pointer that stores the starting address of the allocated block.
    

---

## Standard Library Functions for DMA

C provides four primary functions in `<stdlib.h>` for managing dynamic memory.

|**Function**|**Purpose**|**Initial Value**|
|---|---|---|
|`malloc()`|Allocates a single block of memory.|Contains Garbage values.|
|`calloc()`|Allocates multiple blocks (contiguous).|Initialized to Zero.|
|`realloc()`|Resizes previously allocated memory.|Maintains existing data.|
|`free()`|Releases allocated memory back to the heap.|N/A|

---

## Memory Allocation: malloc() vs. calloc()

### malloc() (Memory Allocation)

- **Syntax:** `ptr = (cast_type*) malloc(size_in_bytes);`
    
- **Characteristics:**
    
    - Takes a single argument: the total size in bytes.
        
    - Returns a `void*` pointer; requires type casting to the desired type.
        
    - Faster than `calloc()` because it does not initialize memory.
        

### calloc() (Contiguous Allocation)

- **Syntax:** `ptr = (cast_type*) calloc(n, element_size);`
    
- **Characteristics:**
    
    - Takes two arguments: number of elements (`n`) and size of each element.
        
    - Automatically initializes all bits in the allocated block to zero.
        

###### Example: Allocating an Array for $n$ Integers

Using `malloc()`:

`p = (int*) malloc(n * sizeof(int));`

Using `calloc()`:

`p = (int*) calloc(n, sizeof(int));`

---

## Modifying Memory: realloc()

The `realloc()` function is used to change the size of a memory block that was previously allocated using `malloc` or `calloc`.

- **Syntax:** `ptr = (cast_type*) realloc(ptr, new_size_in_bytes);`
    
- **Logic:**
    
    1. If the current block has sufficient adjacent free space, it extends the block.
        
    2. If not, it allocates a **new block** elsewhere in the heap, copies the old data, frees the old block, and returns the new address.
        
- **Data Integrity:** Existing data is preserved up to the minimum of the old and new sizes.
    

---

## Memory Management: free()

To prevent **Memory Leaks**, dynamically allocated memory must be manually released when no longer needed.

- **Syntax:** `free(ptr);`
    
- **Rule of Thumb:** Every call to `malloc`, `calloc`, or `realloc` should eventually have a corresponding `free`.
    
- **Danger:** Once `free(ptr)` is called, `ptr` becomes a **Dangling Pointer**. It still holds an address, but that memory is no longer valid for use by the program.
    

###### Q1) Why is type casting necessary for malloc and calloc?

A1) Both functions return a `void*` (generic pointer) because the compiler doesn't know what type of data you intend to store. You must cast it (e.g., `(int*)`) so the pointer arithmetic and dereferencing work correctly for your specific data type.

###### Q2) What happens if you re-assign a pointer without freeing the DMA memory it pointed to?

A2) The memory block becomes "orphaned" in the heap. The program can no longer access or free it, resulting in a **memory leak**, which can eventually exhaust the system's available memory.

---

# Summary

- **DMA** happens at runtime using the **Heap**; **Static allocation** happens at compile time using the **Stack**.
    
- **malloc** is for single blocks (uninitialized); **calloc** is for multiple blocks (zero-initialized).
    
- **realloc** allows for dynamic resizing of arrays, ensuring flexibility.
    
- **free** is critical to avoid memory leaks.
    
- Always use `sizeof(type)` to ensure portability across different architectures where data type sizes may vary.
    
---
# References

- [Standard Library: stdlib.h](https://en.cppreference.com/w/c/memory)
    
- [Dynamic Memory Allocation Lecture](https://www.google.com/search?q=https://youtu.be/8Om3PhqVphU)

- [[pointers.c]]