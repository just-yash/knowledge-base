
Type : #Note    
Date :  2026-02-10  
Tags :   [[C]] ; [[conditional]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Simple if.c
- The simple `if` statement is a selection control structure that conditionally executes a block of code only when a given expression evaluates to non-zero or `true`.
- Every control structure has by default scope of 1 statement. → statement ends with `;`.
- If there are more than 1 statement then we use code block → multiple statements within `{}`.

```c
// syntax
if (expression)
{
	statement(s);  // code block
}

// for a single statment ;
if (expression)
	statement;
```
- Expression is always written within `()`
### Rules : 
- expression is evaluated
- if `result != 0 || true` → code block executes.
- if `result == 0 || false` → code block skipped.
- Control moves to the next statement
 
###### Examples :
```c
int x = 10;
if (x > 5)
printf("x is greater than 5");

// x is greater than 5
```

```c
if (5)
{
	printf("Executed");
}

// Executed
```

```c
int x;

if (x = 5)
{
	printf("True");
}

// True
```
- `x = 5` → assignment
- expression is true as `5 != 0`
- Remember the difference between `=` and `==` [[Operators.c|operator]].
- The [[Operators.c#2. Assignment Operator|assignmement operator]] (`=`) returns the value that is assigned.

```c
int x = 9;
if(x = 5)
printf("x is equal to 5");

// x is equal to 5
```

```c
int x = 5; 
if (x == 4);
	printf("x is equal to 5");

// x is equal to 5
```
- here there's a `;` after the `if` statement → `if` statement with the expression. Hence the `printf` statement doesn't come under the `if` statement. So it will be printed as it is. 
- indentation doesn't have any meaning in C → its used for readability  

```c
int x = 9;
if(x == 5)
printf("x is equal to 5");
printf("x is equal to 9");

// x is equal to 9

int x = 5;
if(x == 5)
printf("x is equal to 5");
printf("x is equal to 9");

// x is equal to 5x is equal to 9
```

 ```c
 int x = 0;
 
 if (x = 0)
 {
 printf("x is equal to 5");
 printf("x is equal to 9");
 }
 ```
- Expression is false → [[Operators.c#2. Assignment Operator|assignment operator]] used. 

```c
int x = 0;
 
 if (x == 0)
 {
 printf("x is equal to 5");
 printf("x is equal to 9");
 }

// x is equal to 5x is equal to 9
```

 ```c
 int x = 0;
 
 if (x = 0);
 {
 printf("x is equal to 5");
 printf("x is equal to 9");
 }

// x is equal to 5x is equal to 9
 ```
- `;` closed the `if` statement before the code block

---
# Hacks
- You can write the [[Tokens.c#3. Constants / Literals|constants]] before the [[Tokens.c#2.1 Variables|variables]] in a [[Operators.c#3. Relational Operators|relational]] expression to avoid accidental use of [[Operators.c#2. Assignment Operator|assignment operator]].
###### Example :
```c
if (5 == x);   // valid

if (x = 5);    // bug
if (5 = x);    // compile-time error
```

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# Usability in ternary operators
- we cannot use Simple if in [[Operators.c#8. Ternary Operator|ternary operator]] as [[Operators.c#8. Ternary Operator|ternary operator]] should have both `if` and `else`.

---
# Questions




---
# Summary 
- `if` is a selection control structure used for conditional execution.
- The condition inside `if` is evaluated as an integer expression.
- Zero means false; any non-zero value means true.
- By default, `if` controls only one statement.
- Multiple statements must be enclosed within `{}`.
- The assignment operator (`=`) returns the assigned value.
- Using assignment instead of comparison inside `if` is a common logical error.
- A semicolon after `if` terminates the conditional immediately.
- Indentation has no effect on program execution.
- Writing constants on the left side of comparisons helps prevent bugs.
- we cannot use Simple if in [[Operators.c#8. Ternary Operator|ternary operator]] as [[Operators.c#8. Ternary Operator|ternary operator]] should have both `if` and `else`.
---
# References 

1. [YouTube Lecture](https://youtu.be/tqFhPQULWfA?si=y-MFiDF-1vZaMZBB)
2. [[if-else.c|if-else]]
3. [[Nested if.c|Nested if]]
4. [[else-if ladder.c|else-if ladder]]