
Date :  2026-02-12  
Tags :   [[C]] ; [[conditional]]  
~ ***Yash Agrawall*** ~  

---
# if-else.c
- `if-else` is a selection control structure that allows execution of exactly one of two code paths.
- if the condition is `true` or non-zero, the `if` code block is executed
- otherwise, the `else` code block is executed.
- Every control structure has by default scope of 1 statement. → statement ends with `;`.
- If there are more than 1 statement then we use code block → multiple statements within `{}`.

```c
// syntax
if (expression)
{
    statement(s);
}
else
{
    statement(s);
}

```
- `else` is optional 
- `else` always pairs with nearest unmatched `if`

### Rules
- Expression inside `if` is evaluated first
- if `expression != 0 || true` → `if` block is executes
- if `expression == 0 || false` → `else` block executes
- only one block executes
- control then moves to the next statement after `if-else` sequentially. 

###### Examples : 
```c
int x = 5;

if (x > 5)
{
    printf("Positive");
}
else
{
    printf("Non-positive");
}

// Non-positive
```

```c
int x = 0;

if (x)
    printf("True");
else
    printf("False");

// False
```

```c
int x = 5;

if (x = 0)
    printf("IF");
else
    printf("ELSE");

// ELSE
```
- `x = 0` → [[Operators.c#2. Assignment Operator|assignment]]
- expression value = `0` → `false`
- `else` executes

```c
int x = 5;

if (x == 0);
    printf("IF");
else
    printf("ELSE");
```
- [[Errors#1.1 Syntax Errors|Compilation Error]] → `misplaced else`
- `if (x == 0);` ended with `;` → `else` has no `if` to pair with.

```c
int x = 3;

if (x > 3);
else
printf("abc");

// abc
```

```c
int x = 3;

if (x > 0);
else;
printf("abc");

// abc
```
- here `printf("abc");` is not part of the `else` block. 
- it would have been printed no matter what.

```c
int x = 5;

if (x > 0)
    printf("Positive");
    printf("Done");
else
    printf("Negative");
```
- [[Errors#1.1 Syntax Errors|Compilation Error]] → `misplaced else`
- no curly brackets `{}` for `if`
- `else` must immediately follow `if`
- only one statement belongs to `if`

```c
float x = 0.7;

if (x == 0.7)
printf("abc");
else
printf("def");

// def
```
- by default a decimal number is considered as [[Primary DataTypes.c#`double`|double]]
- hence its comparing `0.7f` with `0.7` which are not same when converted to binary. 
- `0.7` base 10 = `0.101101011010110...` base 2
- [[Primary DataTypes.c#`float`|float]] is single precision and [[Primary DataTypes.c#`double`|double]] is double precision, so [[Primary DataTypes.c#`double`|double]] will store more digits after the point → `0.7f != 0.7`

```c
float x = 0.5;

if (x == 0.5)
printf("abc");
else
printf("def");

// abc
```
- even though `0.7f != 0.7` , `0.5f = 0.5`
- `0.5` base 10 = `0.1` base 2
- as it is not reoccurring and finite the values in [[Primary DataTypes.c#`float`|float]] and [[Primary DataTypes.c#`double`|double]] are same

```c
int x = 052;

if (x == 52)
printf("abc");
else 
printf("def");

// def
```
- whenever there is a `0` in front of a number, the compiler treats it as an Octal number
- `052 != 52` → `052 = 42`

```c
int x = 052;

if (x == 42)
printf("abc");
else 
printf("def");

// abc
```
- `052` is an octal number. its decimal is `42`

```c
int x = 092;

if (x == 092)
printf("abc");
else 
printf("def");

// def
```
- [[Errors#1. Compile-Time Errors|Compile-Time Error]] → Octal numbers are from `(0-7)`
- whenever there is a `0` in front of a number, the compiler treats it as an Octal number

```c
int x = 0x52;

if (x == 52)
printf("abc");
else
printf("def");

// def
```
- whenever there is a `0x` in front of a number, the compiler treats it as an Hexadecimal number
- `0x52 = 82`

```c
int x = 5, y = 0;

if (x > 0)
    if (y > 0)
        printf("Both positive");
    else
        printf("x positive, y non-positive");

// x positive, y non-positive
```
- `else` attaches to nearest `if`
- more on this in [[Nested if.c|nested if]]

```c
int x = 3;

if (x > 0)
else 
printf("abc");
```
- [[Errors#1.1 Syntax Errors|Compilation Error]] → `misplaced else`
- here the `else` block is inside `if` as there is no `;` to mark the end of the statement
- `else` cannot pair with `if` if it comes under it. 

---
# Hacks
- Always use `{}` with `if–else`
- Avoid assignment inside conditions
- Prefer constant on left side

---
# Usability in ternary operators
- we can use `if-else` in [[Operators.c#8. Ternary Operator|ternary operator]].



---
# Questions




---
# Summary 
- `if–else` is a selection control structure that executes exactly one of two code paths.
- The condition is evaluated as an integer expression.
- Zero is treated as false; non-zero is treated as true.
- By default, `if` and `else` control only one statement.
- Multiple statements must be enclosed in `{}`.
- The assignment operator returns the assigned value, which can lead to logical errors in conditions.
- A semicolon after `if` terminates the conditional statement.
- `else` always pairs with the nearest unmatched `if`.
- Floating-point values should not be compared using `==`.
- Integer literals with leading `0` are treated as octal; `0x` indicates hexadecimal.
- we can use `if-else` in [[Operators.c#8. Ternary Operator|ternary operator]].



---
# References 
1. [YouTube Lecture](https://youtu.be/7uBI6FLRLx0?si=y3Y_8YTMSLSeXRl7)
2. [[Simple if.c]]
3. [[Nested if.c|Nested if]]
4. [[else-if ladder.c|else-if ladder]]