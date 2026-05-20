
Type : #Note    
Date :  2026-01-28    
Tags :   [[C]]  ; [[datatypes]]  
Status : #complete     
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
| Data Type                              | Typical Size* | Description                             |
| -------------------------------------- | ------------- | --------------------------------------- |
| [[Primary DataTypes.c#int\|int]]       | 2 to 4 bytes  | Integer                                 |
| [[Primary DataTypes.c#float\|float]]   | 4 bytes       | Decimal (single precision)              |
| [[Primary DataTypes.c#double\|double]] | 8 to 10 bytes | Decimal (double precision)              |
| [[Primary DataTypes.c#char\|char]]     | 1 byte        | Character                               |
| [[Primary DataTypes.c#void\|void]]     | 0 bytes       | Represents no Value.                    |
| [[Primary DataTypes.c#`_Bool`\|_Bool]] |               | represents boolean value (1 and 0 only) |

→ size depends on [[Language Translators#2. Compiler|compiler]] and system architecture. 

### Type Modifiers 
- mainly apply to integer and character types
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
- Derived from basic data types.
- constructed from existing types
### Types :
- [[Array]] → arr
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
- Created by a programmer.
### Types : 
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
# Questions
###### Q1) Which of the following is a derived data type?  
###### a) int  
###### b) float  
###### c) array  
###### d) enum

A1) d) enum

---
###### Q2) Which is a user-defined data type?  
###### a) pointer  
###### b) structure  
###### c) double  
###### d) char

A2) b) structure	

---
###### Q3) Which declaration is invalid?  
###### a) unsigned int x;  
###### b) short int y;  
###### c) unsigned float f;  
###### d) signed char c;

A3) c) unsigned float f;

---
###### Q4) `_Bool` can store:  
###### a) any integer  
###### b) only 0 or 1  
###### c) any character  
###### d) address only

A4) b) only 0 or 1


---
# Summary 
- Data type determines kind of data, memory size, and allowed operations.
- C data types are classified as [[Primary DataTypes.c|Primary]], Derived, and User-defined.
- [[Primary DataTypes.c|Primary]] types include `int`, `float`, `double`, `char`, `void`, and `_Bool`.
- Derived types include arrays, pointers, structures, unions, and functions.
- User-defined types allow creation of new type names and structures.
- Type modifiers alter size or sign of basic types.
- Actual size of data types depends on compiler and architecture.




---
# References