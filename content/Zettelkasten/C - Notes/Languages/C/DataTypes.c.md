
Date :  2026-01-28  
Tags :   [[Language]] ; [[C]]  
~ ***Yash Agrawall*** ~  

---
# DataTypes.c
A data type specifies : 
- what kind of data a variable can store
- how much memory is allocated
- what operations are allowed

---
# Classification of Data Types in C

## 1. [[Primary DataTypes.c|Primary/Basic/Predefined Data Types]] 
| Data Type | Typical Size* | Description                |
| --------- | ------------- | -------------------------- |
| char      | 1 byte        | Character                  |
| int       | 4 bytes       | Integer                    |
| float     | 4 bytes       | Decimal (single precision) |
| double    | 8 bytes       | Decimal (double precision) |
| void      | 0 bytes       | Represents no Value.       |
→ size depends on [[Language Translators#2. Compiler|compiler]] and system architecture. 

### Type Modifiers 
Used with the primary types :
- short
- long
- signed
- unsigned

Examples : 
```c
short int a;
long int b;
unsigned int c;
signed char d;
```

---
## 2. Derived Data Types
Derived from basic data types.
- Array → arr
- Pointer
- Structure 
- Union
- Function

Eg : 
```c
int arr[10];     // array
int *p;          // pointer
```

---
## 3. User-Defined Data Types
Created by a programmer. 
- struct
- union
- enum
- typedef

Eg : 
```c
typedef int marks;
marks m1;
```

---


















---
# Questions




---
# Summary 





---
# References 

