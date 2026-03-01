
Date :  2026-02-03  
Tags :   [[C]]   
~ ***Yash Agrawall*** ~  

---
# Operators.c

## 1. Arithmetic Operators

| Operator | Meaning                       |
| -------- | ----------------------------- |
| `+`      | Addition                      |
| `-`      | Subtraction                   |
| `*`      | Multiplication                |
| `/`      | Division (Gives the Quotient) |
| `%`      | Modulus → Remainder           |
###### Examples : 
```c
int x;
x = 5/2;   // 2
int y;
y = 5%2;   // 1
int z;
z = 5.0/2; // 2.5
int a;
a = 2/5    // 0   if numerator < denominator : 0
int b;
b = 2%5    // 2   if numerator < denominator : numerator
```

- Division of 2 integers will always give an integer. 
- Division of 1 int and 1 float / double will give 1 float / double. 
	- c always prefers the larger datatype. 
	- by default decimal number is considered as double
###### Examples :
```c
int x;
x = -5/2;    // -2
int y;
y = 5/-2;    // -2
int z;
z = -5/-2;   //2

// a % b has the same sign as a (numerator)
int a; 
a = -5%2;   // -1
int b;
b = 5%-2;   // 1
int c;
c = -5%-2;  // -1
```

### Rules for Arithmetic Operators
1. `int/int` is always `int`
2. `%` → modulus operator cant be used in floating point numbers. 
	1. `5.0%2` ⇒ Error

### Precedence Rule
- If more than one operator is present in an expression then which will be solved first is explained by this rule.

```c
*   /   %   
+   -
```

- `*` , `/` , `%`  : have the same precedence  
- `+` , `-`  : have the same precedence 
- `*` , `/` , `%`  are given first priority ; then `+` , `-`.
- If the same operator is repeated in an expression. It is solved according to **Associative Rule**.
	- For Arithmetic Operators, they are solved Left to Right ( → ) .

### Associative Rule
- If more than one operator of the same precedence is present in an expression then which will be solved first in explained by this rule.
- For Arithmetic Operators, Associativity is from Left to Right ( → )

---
## 2. Assignment Operator

- Denoted by $=$
- LHS cannot be a constant.
- LHS should be a single variable. 
###### Examples : 
```c
int x;
x = 5;   // 5 is assigned to x
5 = x;   // SyntaxError

int x = 5 , y = 2 , z;
z = x + y;    // z = 5 + 2 = 7
x + y = z;    // SyntaxError
```


### Cascading of Assignment Operator
- Associativity of Assignment operator is from Right to Left ( ← ) .
Here `2` is first assigned to `z` ; then the value of `z` is assigned to `y` ; then the value of `y` is assigned to `x`
###### Example :
```c
int x, y, z;
x = 2;
y = 2;
z = 2;

// can be written as 
x = y = z = 2;
```

### Swapping values of two variables with the help of a third variable
- Use the third variable as a buffer and store the 1st value in it. Now there can be no loss of information, given we have a copy of the 1st variable.
###### Example : 
```c
int x = 5, y = 2, z;
z = x;    // z = 5
x = y;    // x = 2  &  y = 2
y = z;    // y = 5  &  x = 2  &  z = 5
```

### Swapping values of two variables without a third variable
- Many ways to do so.
###### Examples : 
```c
// Using Addition and Subtraction
int x = 5, y = 2;
x = x + y;  // x = 5 + 2 = 7
y = x - y;  // y = 7 - 2 = 5
x = x - y;  // x = 7 - 5 = 2

// Using Multiplication and Division
int x = 5, y = 2;
x = x * y;  // x = 5 * 2 = 10 
y = x / y;  // y = 10 / 2 = 5
x = x / y;  // x = 10 / 5 = 2
```

---
## 3. Relational Operators

- total 6 relational Operators
- Comparison Operator
- Compares two values
- Output is always `0`(False) or `1`(True).

| Operator              | Meaning               |
| --------------------- | --------------------- |
| `=​=` → double equals | check equality        |
| `!=`                  | not equal to          |
| `>`                   | greater than          |
| `<`                   | less than             |
| `>=`                  | greater than or equal |
| `<=`                  | less than or equal    |

###### Example :
```c
int x = 5, y = 2, z;
z = x > y;
printf("%d",z);

// z = 1
```

### Associativity of Relational Operators
- For Arithmetic Operators, Associativity is from Left to Right ( → )
###### Examples
```c
int a = 5, b = 2, c = 1, d;
d = a > b > c;
printf("%d", d);

/*
d = 5 > 2 > 1
d = 1 > 1
d = 0
*/


int a = 5, b = 5, c = 5, d;
d = a == b == c
printf("%d", d);

/*
d = 5 == 5 == 5
d = 1 == 5
d = 0
*/
```

### Precedence of Relational and Arithmetic Operators
- Arithmetic > Relational > Assignment
```c
// Precedence Order
* / %
+ -
> < >= <= 
== !=
=
```

###### Examples : 
```c
int a = 5, b = 2, c = 1, d;
d = c + a > b;
printf("%d", d);

/*
d = 1 + 5 > 2
d = 6 > 2
d = 1
*/


int x = 1 < 0 == 0;
printf("%d", x);

/* 
x = 1 < 0 == 0
x = 0 == 0
x = 1
*/
```

---
## 4. Logical Operators
- Used with Conditions
- Output is always `0`(False) or `1`(True).

| Operator          | Meaning     |                     |
| ----------------- | ----------- | ------------------- |
| `&&`              | Logical AND | double Ampersand    |
| `\|\|` → two \|\| | Logical OR  | double piped symbol |
| `!`               | Logical NOT | exclamation         |

^32ad15

- Any non-zero value in case of C is considered as True
###### Examples :
```c
int x = 5 && 2;          // x = 1

int x = -5000 && 500;    // x = 1

int x = 5 && 0;          // x = 0

int x = 5 || 2;          // x = 1

int x = 5 || 0;          // x = 1

int x = !5;              // x = 0

int x = !0;              // x = 1

```

- `!=` ≠ `=!`
###### Example :
```c
int x = 5, y = 2, z;
z = x != y;           

/* 
z = 5 != 2
z = 1
*/ 


z = x = !y;

/* 
z = 0 , x = 0 , y = 2
*/

```

### Short Circuiting in Logical Operators
- In case of `OR` Operator, if any one of the inputs is `1` then the output is `1`. So we can ignore the rest of the expression. 
- In case of `AND` Operator, if any of the inputs is `0` then the output is `0`. So we can ignore the rest of the expression. 

###### Examples :
```c
int x = 1 || (0 && 0);                   // x = 1

int x = 1 || 0 && 5 || 6 || 7 && !3;     // x = 1

int x = 0 && 1 || 0 && 1 || 5;           // x = 0

int x = 0 && 5 || 6 && 7 || 4 && !6;     // x = 0
```

### Precedence of Logical Operators
Precedence of Unary Operators is always greater than Binary Operators
```c
!
* / %
+ -
> < >= <= 
== !=
&&
||
=
```

> Note : Operator Precedence is applied first. Then Short Circuiting is done.
###### Examples : 
```c 
int x = 2 + 3 * 5 > !4 == 3 || 5 && 6;  

/* 
2 + 3 * 5 > 0 == 1 || 5 && 6
2 + 15 > 0 == 1 || 5 && 6
17 > 0 == 1 || 5 && 6
1 == 1 || 5 && 6
1 || 5 && 6     (Short Circuiting)
1
*/
```

### Associativity of Logical Operators
- for `&&` and `||` associativity is from Left to Right ( → ). 

Associativity of all Unary Operators is always Right to Left ( ← ).
- for `!` associativity is from Right to Left ( ← ).
###### Example : 
```c
int x = 5, y;
y = !!!!x;

/* 
!!!!5
!!!0
!!1
!0
1
*/
```

---
## 5. Increment Operator
- Increases value by 1.
- Two types : 
	1. Pre : `++x`
	2. Post : `x++`
###### Examples : 
```c
int x = 5; 
++x;           // x = 6

int y = 5;
y++;           // y = 6
```

- There is **no difference** between pre-increment (`++x`) and post-increment (`x++`) when you observe the variable **in the next statement**.
- The **difference appears only when the value is used within the same expression** in which the increment happens.

- In pre-increment, increment is done first then the rest of the expression is evaluated
- In post-increment, first the expression is evaluated then the value is incremented.
- Increment can be done only on a Variable, not a Constant. `x = 5++;` → will throw an error.

### Precedence
Precedence of Unary Operators is always greater than Binary Operators
###### Example :
```c
int x = 5, y , z = 6;
y = ++z + x++;       // x = 6 ; y = 12 ; z = 7
```

- Increment happens once per operator, but using ++ more than once on the same variable inside a single expression is undefined behavior.
	- The compiler may run and show a result, but the result would differ for every compiler. 
	- It may not throw a compilation error.

### Associativity of Increment Operator
- Increment Operator is a Unary Operator ⇒ Associativity Right to Left ( ← ).
###### Example : 
```c
int x = 5, y;
y = !x++;        
/* first we will solve x++ according to associativity.
y = !x++  (post increment)
y = (!5)++
y = 0++   (Error : lvalue required)       
x = 6
*/
```

- `x++++` and `++++x` are invalid because increment expression returns a [[Tokens.c#^517040|rvalues]](Temporary Value), and the increment operator requires an [[Tokens.c#^5efd01|lvalues]](locator value) operand. The error is due to operand category, not due to multiple increments in one statement. Same goes for `++x++`.

```c
// valid
int x = 5;
x++; x++;
  
// Error : l value not found
int x = 5;
x++++;
```

###### Example : 
```c
int x = 5, y;
y = x+++x;
y = x + x++;
/* 
This will also result in undefined behaviour as x is modified and used in the same statement.
```

---
## 6. Decrement Operator
- Decreases value by 1.
- Two types : 
	1. Pre : `--x`
	2. Post : `x--`

- Everything written above about `++` applies to `--`
- Replace “increase” with “decrease”
- Same precedence
- Same associativity
- Same lvalue rules
- Same undefined behavior patterns

---
## 7. Shortcut Operator

| Operator | Meaning                       |
| -------- | ----------------------------- |
| `+=`     | Add and assign                |
| `-=`     | Subtract and assign           |
| `*=`     | Multiply and assign           |
| `/=`     | Divide and assign             |
| `%=`     | Modulus(Remainder) and assign |

> `=+` , `=-` , `=*` , `=/` `=%` these are not same as the above listed shorthand operators.

###### Examples : 
```c
int x = 5;
x += 2;          // x = x + 2 = 5 + 2 = 7

int x = 5;
x /= 2;          // x = x / 2 = 5 / 2 = 2
```

### Precedence of Shorthand Operators
- Same as [[Operators.c#2. Assignment Operator|Assignment Operator]]
###### Example :
```c
int x = 5;
x /= 2 + 1;      

/* 
x /= 2 + 1 
x /= 3
x = x / 3
x = 5 / 3
x = 1
*/
```

---
## 8. Ternary Operator
- Denoted by `?:` 
- Also called **Conditional Operator**
- Used as a compact form of if else

### Syntax : 
```c
condition ? expression1 : expression2
```
- If `condition` is `true` → `expression1`
- Else → `expression2`

###### Example : Finding the greatest of 2 numbers
```c
int a = 5, b = 3, c;
c = a > b ? a : b;

/* 
here a = 5 which is greater than 3. condition is true
=> c = a = 5
```

###### Example : Finding the greatest of 3 numbers using 2 other variables
![[Pasted image 20260205235238.png]]
The above [[Tree]] is called Decision Tree.
```c
int a, b, c, d, e;
d = a > b ? a : b;
e = d > c ? d : c;
```

We can solve this without using 2 other variables by **Nesting of Conditional Operator**.
### Nesting of Conditional Operator
```
d = a > b ? a > c ? a : c : b > c ? b : c;          // not that readable

d = a > b ? (a > c ? a : c) : (b > c ? b : c);      // better

d = (a > b)
        ? ((a > c) ? a : c)
        : ((b > c) ? b : c);                       // even better
```

### Associativity of Ternary Operator
- Associativity is from Right to Left ( ← ). 
- scan the statement from right to left
- when you find the first `?` , pair it with its immediate `:`. 
###### Example : 
```c
a = 10 ? 0 ? 2 : 3 : 1 

/* 
a = 10 ? 0 ? 2 : 3 : 1  
a = 10 ? (0 ? 2 : 3) : 1  
a = 0 ? 2 : 3  
a = 3  
*/
```

- The no. of `?` and the no. of `:` must be equal. If not → `Syntax Error`
```c
// invalid -> Syntax Error
a = 3 ? 4 ? 2 : 4 : 3 : 5
```

---

## 9. sizeof Operator
- unary operator 
- gives size in terms of bytes of its operand
- depends on the compiler
### Rules
- Parentheses is optional
	- its not a function. For functions, parentheses is compulsory.
- Its usually evaluated at compile time
- Does not evaluate expression (in most cases)
###### Examples : Based on Turbo C compiler
```c
int x, y;
x = sizeof(y);           // x = 2
x = sizeof int;         // x = 2
x = sizeof (float);       // x = 4
x = sizeof 500;         // x = 2
x = sizeof(3.2);         // x = 8  (default -> double)
x = sizeof 3.2f;        // x = 4
```

```c
int x = 5;
sizeof x++;   // x is not incremented and directly evaluated saving time
```

### Associativity of sizeof operator 
- unary operator : Right to Left ( ← )

---
## 10.  Type Casting Operator 

- we use this for [[Type Conversion.c#2. Explicit Type Conversion (Type Casting)| Explicit Type Conversion or Type Casting]]
- Syntax : `(type) expression`
- Here type can be all the [[Primary DataTypes.c|primary data types]] along with their valid [[Primary DataTypes.c|modifiers]] combinations.

---
## 11. Comma Operator

- used as an **Operator** or **Separator**
- Operator → when used in an expression
- Separator → function calls / declaration / definition
- The comma operator evaluates expressions from **left to right**, discards all results except the last one, and yields the value of the final expression.

### Associativity of Comma Operator
- Associativity of Comma Operator is from Left to Right ( → ).

### Precedence of Comma Operator
- Least precedence amongst all

###### Example : 
```c
int x;
x = (3, 5, 7);

/* 
3 -> evaluated, result ignored
5 -> evaluated, result ignored
7 -> evaluated, result returned
```

- if we wont use parentheses then it will store the first value only as precedence of `,` is the least of all. 
```c
int x;
x = 3, 5;
// same as
(x = 3),5;            // x = 3

int x, y;
y = (x = 3, 5, 7);    // x = 3 ; y = 7
```

---
# Precedence, Associativity Table 

| Precedence Level | Description                                      | Operators                                                | Associativity |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------- | ------------- |
| 1 (Highest)      | Function call, Array subscript, Structure access | `()` `[]` `.` `->`                                       | Left → Right  |
| 2                | Unary operators                                  | `++` `--` `+` `-` `!` `~` `&` `*` `(type)` `sizeof`      | Right ← Left  |
| 3                | Multiplicative                                   | `*` `/` `%`                                              | Left → Right  |
| 4                | Additive                                         | `+` `-`                                                  | Left → Right  |
| 5                | Shift                                            | `<<` `>>`                                                | Left → Right  |
| 6                | Relational                                       | `<` `<=` `>` `>=`                                        | Left → Right  |
| 7                | Equality                                         | `==` `!=`                                                | Left → Right  |
| 8                | Bitwise AND                                      | `&`                                                      | Left → Right  |
| 9                | Bitwise XOR                                      | `^`                                                      | Left → Right  |
| 10               | Bitwise OR                                       | `\|`                                                     | Left → Right  |
| 11               | Logical AND                                      | `&&`                                                     | Left → Right  |
| 12               | Logical OR                                       | `\|\|`                                                   | Left → Right  |
| 13               | Conditional                                      | `?:`                                                     | Right ← Left  |
| 14               | Assignment                                       | `=` `+=` `-=` `*=` `/=` `%=` `<<=` `>>=` `&=` `^=` `\|=` | Right ← Left  |
| 15 (Lowest)      | Comma operator                                   | `,`                                                      | Left → Right  |



























---

# Questions
###### <span style="color:rgb(0, 176, 240)">Q1)</span> If int takes 2 bytes then  
```
```c
int x = 300*300/300;
printf("%d", x);
```
<span style="color:rgb(0, 176, 240)">A1)</span> x ≠ 1  
- According to Associativity, first we will calculate `300*300` then we will calculate `(300*300)/300`. 
- `300*300 = 90000` this is bigger than the range of `int` when it has 2 bytes. 
- range here is $-2^{15}$ to $2^{15}-1$ 
- C performs **wraparound (two’s complement truncation)*×
- for 16 bits $2^{16}=65536$
- 90000 % 65536 = 24464
- 24464 / 300 = 81
- Output = <span style="color:rgb(146, 208, 80)">81</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q2)</span> `int x = 3/3/3/3;`. what is the value of x?

<span style="color:rgb(0, 176, 240)">A2)</span>  <span style="color:rgb(146, 208, 80)">0 </span>   
$(3/3)/3/3  = (1/3)/3 = 0/3 = 0$

---
###### <span style="color:rgb(0, 176, 240)">Q3)</span> `int x = 3 + 3 * 4 * 3 / 6 / 4 * 3 - 2;`. what is the value of x?

<span style="color:rgb(0, 176, 240)">A3)</span>   <span style="color:rgb(146, 208, 80)">4  </span>  
$3 + (3*4)*3/6/4*3-2$ 
$3 + (12 * 3)/6/4*3-2$
$3 + (36/6)/4*3-2$
$3 + (6/4)*3-2$
$3+(1*3)-2$
$(3+3)-2$
$6 - 2$
4

---
###### <span style="color:rgb(0, 176, 240)">Q4)</span> `int x = (13 / 4 * 3) % 5 + 1;`. what is the value of x?

<span style="color:rgb(0, 176, 240)">A4)</span>   <span style="color:rgb(146, 208, 80)">5  </span>  
$((13/4)*3)$ % $5+1$    
$(3*3)$ % $5+1$    
$(9$ % $5) + 1$    
$4 + 1$    
$5$    

---
###### <span style="color:rgb(0, 176, 240)">Q5)</span> `x -= y + 1` is same as
###### a) `x = x - y + 1`
###### b) `x = x - y - 1`
###### c) Compiler Dependent 
###### d) none

<span style="color:rgb(0, 176, 240)">A5)   </span> <span style="color:rgb(146, 208, 80)">b</span><span style="color:rgb(146, 208, 80)">)</span> `x = x - y - 1`    
x = x - (y + 1)    
x = x - y - 1    

---
###### <span style="color:rgb(0, 176, 240)">Q6)</span> Solve :
###### <span style="color:rgb(0, 176, 240)">i)</span> a = 2 ? 3 ? 4 : 5 : 7 ? 6 : 8
###### <span style="color:rgb(0, 176, 240)">ii</span><span style="color:rgb(0, 176, 240)"><span style="color:rgb(0, 176, 240)">)</span></span> a = 0 ? 7 ? 2 : 3 : 4
###### <span style="color:rgb(0, 176, 240)">iii)</span> a = 3 ? 2 ? 5 : 4 ? 6 : 7 : 1
###### <span style="color:rgb(0, 176, 240)">iv)</span> a = 3 ? 2 ? 5 ? 4 : 1 : 8 : 9

<span style="color:rgb(0, 176, 240)">A6)</span> 
<span style="color:rgb(0, 176, 240)">i)</span> 
a = 2 ? 3 ? 4 : 5 : 7 ? 6 : 8  
a = 2 ? (3 ? 4 : 5) : (7 ? 6 : 8)
a = 3 ? 4 : 5
a = <span style="color:rgb(146, 208, 80)">4</span>

<span style="color:rgb(0, 176, 240)">ii)</span> 
a = 0 ? 7 ? 2 : 3 : 4
a = 0 ? (7 ? 2 : 3) : 4
a = <span style="color:rgb(146, 208, 80)">4</span>

<span style="color:rgb(0, 176, 240)">iii</span><span style="color:rgb(0, 176, 240)">)</span> 
a = 3 ? 2 ? 5 : 4 ? 6 : 7 : 1
a = 3 ? (2 ? 5 : (4 ? 6 : 7)) : 1
a = 2 ? 5 : (4 ? 6 : 7)
a = <span style="color:rgb(146, 208, 80)">5</span>

<span style="color:rgb(0, 176, 240)">iv)</span> 
a = 3 ? 2 ? 5 ? 4 : 1 : 8 : 9
a = 3 ? (2 ? (5 ? 4 : 1) : 8) : 9
a = 2 ? (5 ? 4 : 1) : 8
a = 5 ? 4 : 1
a = <span style="color:rgb(146, 208, 80)">4</span>

---
# Summary 

- Arithmetic operators perform mathematical calculations.
- Integer division always truncates toward zero.
- Modulus operator works only with integers.
- Operator precedence decides which operation happens first.
- Associativity decides evaluation order when precedence is equal.
- Assignment operator (`=`) assigns RHS value to LHS variable.
- Assignment and shorthand assignment operators associate Right to Left.
- Relational operators compare values and produce `0` or `1`.
- Arithmetic operators have higher precedence than relational operators.
- Logical operators work on truth values.
- Any non-zero value is treated as true.
- Logical operators use short-circuit evaluation.
- Increment and decrement operators modify variables by 1.
- Pre-increment updates first, then uses value.
- Post-increment uses value first, then updates.
- Using multiple modifications of the same variable in one expression leads to undefined behavior.
- Shorthand operators combine arithmetic with assignment.
- Ternary operator (`?:`) is a compact alternative to `if-else`.
- Ternary operator associates Right to Left.
- `sizeof` is a unary operator that returns size in bytes.
- `sizeof` usually does not evaluate its operand.
- Type casting explicitly converts one data type to another.
- C performs no overflow or bounds checking, which can cause wraparound behavior.



---
# References 

1. [[Operators]]
2. [Operators in C YouTube Lecture](https://youtu.be/BI3epVCgAbE?si=rurJKedD7kXDB-yh)
3. [[Primary Logical Operators Across Different Domains]]