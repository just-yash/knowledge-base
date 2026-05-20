
Type : #Note    
Date :  2026-03-01  
Tags :   [[C]] ; [[DSA]] ; [[Language]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# pointers.c

- Allows you to interact directly with the computer memory
- it is a [[Tokens.c#2.1 Variables|variable]] that stores the memory address of another [[Tokens.c#2.1 Variables|variable]]
- It doesn't hold the value, it points to the location where the data is stored 
- datatype of a pointer → `intialised_datatype*`
- specifier : `%p` → will return a Hexadecimal value but don't use `%x` or `%0x`
- `sizeof(p)` → same for all datatypes. 
	- depends on the system
	- 32 bit system : `sizeof(p)` = 4 bytes
	- 64 bit system : `sizeof(p)` = 8 bytes
- [[Tokens.c#2. Declaration|Declaration]] : `datatype *pointer_name;`
	- here [[datatypes|datatype]] is not the [[datatypes|datatype]] of the pointer
	- its the [[datatypes|datatype]] of the [[Tokens.c#2.1 Variables|variable]] the pointer points to
- [[Tokens.c#3. Initialization|Initialization]] : `&variable_name`
	- `&` → 'Address of' [[Operators.c|operator]]
- Dereferencing : the method by which we access the [[Tokens.c#2.1 Variables|variable]] that the pointer is pointing
	- Use the 'Indirection' / 'value at' [[Operators.c|operator]]  `*` to access the value at the stored address.
###### Example :
```c
int x = 10;
int *ptr = &x; // ptr now holds the address of x

printf("%d", *ptr); // Output: 10 (Dereferencing)
printf("%p", ptr);  // Output: 0x7ffd... (Memory Address)
```

```c
int *p; // p is pointer to a integer
float *p1; // p1 is pointer to a float
double *p2; // p2 is pointer to a double
```

---
### Why do we need to specify the [[datatypes|datatype]] every time we are [[Tokens.c#2. Declaration|declaring]] a pointer?

- value is not stored in 1 bit/byte. It is stored in a collection of bit/byte. 
- The no. of bytes the compiler needs to account for while dereferencing, that is learnt by the initial [[Tokens.c#2. Declaration|declaration]]

---
### What will happen if we try to store a [[datatypes|datatype]] of a different type instead of the one we declared? 

- [[Errors|Error]] :  incompatible-pointer-type
```c
#include <stdio.h>

int main(){
int *p;
float x = 5.2;
p = &x;
printf("%d", *p);
}
```
- [[Errors|error]] : [[Operators.c#2. Assignment Operator|assignment]] to `int *` from incompatible pointer type

---
### What will happen if we try to print using the memory address and not the name of the pointer?

```c
int x = 5;
int *p = &x;
printf("%d", *2000);  // suppose 2000 is the address of x
```

- [[Errors|Error]] : Compiler will get confused as `2000` doesn't say anything about the no. of bytes it needs to club and consider for the output. 

---
### Uses 

- DMA - Dynamic Memory Allocation
	- Allocating memory at runtime using `malloc()`, `calloc()`, or `new`.
- Efficiency and Speed 
	- Instead of copying the entire data, use pointers to point them. 
	- Avoids Duplication of data 
	- Saves memory 
	- Increases speed 
	- Decreases Computational load
- [[DSA]]
	- Essential for building non-contiguous structures like [[Linked List]] & [[Tree_DSA|Tree]]
- Hardware Interaction 
	- Assessing specific memory - mapped I/O addresses.

---
## Pointer to Pointer

- pointer also has a address
- the pointer that is used to access and store that address is called pointer to pointer
###### Example :
```c
int x = 5, *p, **p1;
p = &x;
p1 = &p;
printf("%d", x);          // 5
printf("%d", *p);         // 5
printf("%d", **p1);       // 5
```

---
# Pointer Arithmetic

- relative to the `sizeof(datatype)`
##### Addition / Subtraction 
- `ptr + n` moves the pointer by $n \times \text{sizeof}(type)$ bytes
- Subtraction of two pointers 
	- gives the no. of elements between them
	- not the no. of bytes

##### Illegal Operations 
- Multiply and Divide pointers
- Addition of two pointers

###### Example : 
```c
int *p = 2000, *p1 = 2;
printf("%p", p - p1);  // (2000 - 2)/2 = 999
printf("%p", p - 2);   // 2000 - 2*2 = 1996
```

```c
float **p;
p++;
```
`p` will move by `sizeof(float*)` which is 4 bytes for a 32 bit system and 8 bytes for a 64 bit system.

---
### Pointers and [[Array|Arrays]]

- the name of an array acts as a constant pointer to its first element
- `arr[i]` is internally evaluated as `*(arr + i)`
- Difference : 
	- `ptr` can be [[Operators.c#5. Increment Operator|incremented]] (`ptr++` or `++ptr`)
	- array name `arr` cannot be [[Operators.c#5. Increment Operator|incremented]]
		- [[Errors#1. Compile-Time Errors|Compilation Error]]
###### Example : 
```c
int arr[3] = {10, 20, 30};
int *p = arr;
printf("%d", *p);             // 10
printf("%d", *(p + 1));       // 20
```

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
### Special Pointer Types

| **Type**                         | **Description**                                          | **Key Note for Exams**                                                                                                                              |
| -------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Null Pointer**                 | Points to `NULL` (0).                                    | Used to prevent crashes; check `if(ptr != NULL)`.                                                                                                   |
| [[void pointer.c\|void pointer]] | A generic pointer (`void *ptr`).                         | Can hold address of any type but **cannot be dereferenced** without [[Type Conversion.c#2. Explicit Type Conversion (Type Casting)\|type casting]]. |
| **Wild Pointer**                 | An uninitialized pointer.                                | Danger! Points to an arbitrary memory location.                                                                                                     |
| **Dangling Pointer**             | Points to a memory location that has been freed/deleted. | Occurs after `free(ptr)` if `ptr` isn't set to `NULL`.                                                                                              |











---
# Questions

###### Q1) How to define a pointer?

A1) `int *ptr;` or `int* ptr;`
- 2nd is also correct as `*` will bind with `ptr` and not with `int`
- better practice to write like this : `int *ptr;`

---
###### Q2) How to initialize a pointer?

A2) `int *ptr = &x;`

---
###### Q3) How to dereference a pointer?

A3) `printf("%d", *ptr);`

---
###### Q4) What are the 2 operators be related to pointer?

A4) `&` → 'address of' operator ; `*` → 'value at' operator

---
###### Q5) What is the output of this Q. Let the address of x be 2000. Address of p be 4000. Address of p1 be 6000.
```c
int x = 5;
int *p = &x;
int **p1 = &p;
printf("%d", x);
printf("%u", p);
printf("%u", p1);
printf("%u", *p);
printf("%p", *p1);
printf("%p", **p1);
printf("%p", *&p);
printf("%p", &*p);
printf("%p", *&**p1);
printf("%p", *&x);
printf("%p", &*x);
printf("%p", &&x);
printf("%p", **&*&p);
printf("%p", *&*&**&*p1);
```

A5) 
```c
int x = 5;
int *p = &x;
int **p1 = &p;
printf("%d", x);           // 5
printf("%u", p);           // 2000
printf("%u", p1);          // 4000
printf("%u", *p);          // 5
printf("%p", *p1);         // 2000
printf("%p", **p1);        // 5
printf("%p", *&p);         // 2000
printf("%p", &*p);         // 2000
printf("%p", *&**p1);      // 5
printf("%p", *&x);         // 5
printf("%p", &*x);         // ERROR
printf("%p", &&x);         // ERROR
printf("%p", **&*&p);      // 5
printf("%p", *&*&**&*p1);  // 5
```


---
# Summary 





---
# References