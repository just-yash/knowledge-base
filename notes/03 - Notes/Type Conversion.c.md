
Type : #Note    
Date :  2026-02-06  
Tags :   [[C]] ; [[datatypes]]
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# Type Conversion.c
- Converting a value from one data type to another. 

## Types of Type Conversion in C
### 1. Implicit Type Conversion (Automatic)
- Performed Automatically by the Compiler 
- Occurs when different [[DataTypes.c|data types]] are used in the same expression 
- Smaller type is converted into larger type

#### Order of Type Promotion (Low → High) for Numeric Values 
`char` → `short` → `int` → `long` → `float` → `double` → `long double`

###### Examples : 
```c 
int x = 10; 
float y = x;             // y = 10.0 ; x = 10

int a = 5;
double b = 2.5;
double c = a + b;        // c = 7.5 ; b = 2.5 ; a = 5 

char a = 10, b = 20;
int c = a + b;           // c = 30 (int) ; a = 10(char) ; b = 20(char)


float x = 3.2;           // x = 3.2f (By default 3.2 is considered as a double)
```

#### Data Loss Possibility : Truncate
- Implicit conversion may cause data loss when converting from larger [[DataTypes.c|data types]] to smaller [[DataTypes.c|data types]].
###### Example : 
```c
float a = 3.9;
int x = a;       // x = 3 ; a = 3.9

float z = 5/2;    // z = 2.0
float z = 5.0/2;  // z = 2.5f   (5.0 is a double, it gets converted to float implicitly)
```
- When `float` or `double` or `long double` are converted to `int` → loss of fractional part.

- Division `/` of two `int` always results in an `int`.
- Division of `float` or `double` or `long double` with an `int` → implicit conversion to higher [[DataTypes.c|data types]]
```c
int x = 5, y = 2;
float z = x / y;

/* 
z = 5/2 = 2.0
x = 5
y = 2
*/ 
```

### 2. Explicit Type Conversion (Type Casting)
- Programmer forces conversion manually 
- Syntax : `(type) expression`

###### Examples : 
```c
float f = 5.7;
int x = (int)f;        // not int(f) ;  x = 5
```
- Here it can be converted implicitly too.

```c
int x = 5, y = 2;
float z = (float)x / y;

/* 
z = 5.0/2 = 2.5
x = 5
y = 2
*/ 
```
























---
# Questions
###### Q1) What is type conversion?

Type conversion is the process of converting a value from one data type to another.

---

###### Q2) What is implicit type conversion?

Implicit type conversion is automatic conversion performed by the compiler when different data types appear in an expression.

---

###### Q3) What is explicit type conversion?

Explicit type conversion (type casting) is manual conversion forced by the programmer using `(type)`.

---

###### Q4) What will be the value of `x`?

`int x = 5/2;`

Answer: `2`

---

###### Q5) What will be the value of `x`?

`float x = 5/2;`

Answer: `2.0`

---

###### Q6) What will be the value of `x`?

`float x = 5.0/2;`

Answer: `2.5`

---

###### Q7) What will be the value of `x`?

`int x = (int)3.9;`

Answer: `3`

---

###### Q8) What will be the value of `z`?

`int a = 5; double b = 2.5; double z = a + b;`

Answer: `7.5`

---

###### Q9) Which conversion may cause data loss?

Conversion from larger data type to smaller data type.

---

###### Q10) Arrange in increasing order of type promotion.

char → short → int → long → float → double → long double



---
# Summary 
- Type conversion changes a value from one data type to another.
- Two types of conversion exist:
	-  Implicit (automatic by compiler)
	- Explicit (manual using type casting)
- In expressions, smaller data types are promoted to larger data types.
- Integer division always produces an integer result.
- If both operands are integers, division truncates fractional part.
- Presence of at least one floating operand makes the result floating.
- Converting floating values to integer removes the decimal part.
- Explicit type casting is used to control calculation type.
- Implicit conversion from larger type to smaller type may cause data loss.

---
# References