
Date :  2026-02-16  
Tags :   [[C]] ; [[loop]]  
~ ***Yash Agrawall*** ~  

---
# for.c
- A `for` loop is an **entry-controlled iteration statement** that combines **initialization**, **condition checking**, and **update** into a single syntactic construct.
- its not a primitive construct 
- its a structured form of a [[while.c|while]] loop
```c
// syntax

for (initialization; condition; update)
{
    statement(s);
}
```

---
# Rules
- All three fields `(initialization; condition; update)` are optional
- Semicolons `;` are mandatory
- Parentheses `()` are mandatory
- Body executes only if condition `!= 0`
- Scope of [[loop]] [[Tokens.c#2.1 Variables|variables]] depends on declaration location

---
# Execution Flow
```
for (A; B; C)
{
    D;
}
```
1. Execute `A` once
2. Evaluate `B`
3. If `B == 0` → exit loop
4. If `B != 0` → Execute body `D`
5. Execute `C`
6. Go back to step 2

---
###### Examples : 
```c
// Q. WAP to print abc 10 times using for loop

# include <stdio.h>

int main(){
	for (int i = 1; i <= 10; i++)
	printf("abc ");
}

// abc abc abc abc abc abc abc abc abc abc 
```

```c
for (int i = 10; i < 5; i++)
printf("abc");
```
- entry controlled nature of `for`
- no output
- condition is false → exit [[loop]]

```c
int i;
for (i = 0; i < 10; i++);
printf("abc");

// abc
```
- scope of [[loop]] ended after `for (i = 0; i < 10; i++)` cause of the `;`.
- Hence `abc` was printed sequentially

```c
for (int i = 1; i <= 10; i++);
printf("%d ", i);

// 11
```

```c
for (int i = 1; i < 10; i++);
printf("%d ", i);

// 10
```

> There is no limit in the no. of [[Tokens.c#2.1 Variables|variables]] we are [[Tokens.c#3. Initialization|initializing]] or the no. of update we are doing. 
>- The condition field accepts exactly one expression
>- That expression can contain multiple conditions using [[Operators.c#4. Logical Operators|logical operators]]

```c
for (i = 1; i <= 10; i++)               // valid
for (i = 1, j = 0; i < 10; i++)         // valid
for (i = 1; i<= 10; i++, j--)           // valid
for (i = 1; i <= 10, j >= 100; i++)     // valid (but only last condition will be considered) 
for (i = 1; i <= 10 && j >= 100; i++)   // valid
for (i = 1; i <= 10;)                   // valid
for (; i <= 10; i++)                    // valid                 
for (; i <= 10;)                        // valid
for (;;)                                // valid -> infinite loop
for()                                   // invalid
```

```c
for (i = 1; i <= 10; i++,printf("%d ", i));
// 2 3 4 5 6 7 8 9 10 11

for (i = 1; i <= 10; printf("%d", i++));
// 1 2 3 4 5 6 7 8 9 10
	
for (i = 1; i <= 10; printf("%d", ++i));
// 2 3 4 5 6 7 8 9 10 11

```








---
# Questions




---
# Summary 

- `for` is an **entry-controlled iteration statement**.
    
- It combines **initialization**, **condition**, and **update** in one construct.
    
- Although primitive in C, any `for` loop can be rewritten using a `while` loop.
    
- Execution order:
    
    1. Initialization (once)
        
    2. Condition check
        
    3. Loop body
        
    4. Update
        
    5. Repeat from step 2
        
- All three fields of `for(init; cond; update)` are optional, but semicolons are mandatory.
    
- If the condition evaluates to `0`, the loop terminates immediately.
    
- A semicolon after `for` creates an **empty loop body**.
    
- Variables declared inside `for` have **block scope** (C99+).
    
- The condition field accepts **one expression**, but that expression may contain multiple logical conditions.
    
- The comma operator can be used in initialization and update sections.
    
- Misuse of the comma operator in the condition can cause subtle logic errors.
    
- `for(;;)` creates an infinite loop.



---
# References 

1. [YouTube Lecture](https://youtu.be/yoxL5KhfESw?si=sG9NR_zFJWucScgV)
2. [[Control Structures.c]]
3. [[while.c]]
4. [[do-while.c]]