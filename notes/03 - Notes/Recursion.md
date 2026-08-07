
Type : #Note    
Date :  2026-04-01  
Tags :  [[DSA]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Recursion

> The theory is less, but this Topic is very Important. Practice as many Qs as you can.

- Where a function calls itself to solve a problem. 
- It requires two essential elements:
	- A base condition to stop the recursion.
	- Logic to solve the problem step-by-step.
- A function is recursive if it invokes itself within its own definition. 
- It is particularly useful for solving problems involving repetitive tasks or iterations in reverse order. 
- Types of Recursion:
	- **Direct Recursion**: When a function calls itself directly. It can be:
		- **Tail Recursion**: The recursive call is the last statement in the function.
		- **Head Recursion**: The recursive call occurs before other operations.
	- **Indirect Recursion**: When two or more functions call each other in a cycle.
- Recursion is an alternative to iteration, and both techniques are used to repeatedly execute a function.
- Its better to solve recursion using [[Tree_DSA|Tree]] 

## Fibonacci Series
- Each number is the sum of the two preceding ones, starting from 0 & 1. 
- commonly denoted by $F_{n}$ or `f(n)`
- $F_{0} = 0$
- $F_{1} = 1$
- $F_{n} = F_{n-1} + F_{n-2}$ $for$ $n > 1$

The trouble begins when you compute it _recursively_ without remembering anything. If you compute `f(100)` using the plain recursive definition, the computer doesn’t “know” it has already computed `f(98)` somewhere else. It recomputes the same values again and again. This creates an enormous recursion tree.

**Dynamic Programming** : Never compute the same subproblem twice.
This can be implemented in two ways:
1. **Memorization** (*top-down*) : Store `f(n)` the first time you compute it. Future calls just look it up
2. **Tabulation**(*bottom-up*) : Compute `f(0)` , `f(1)` , `f(2)`  , … , `f(n)` iteratively. 

- with Dynamic programming:
	- Time complexity becomes O(n)
	- No. of additions becomes O(n-1)
	- No. of function calls becomes O(n) (or zero recursion at all)

| n                         | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| f(n)                      | 0   | 1   | 1   | 2   | 3   | 5   | 8   | 13  | 21  | 34  | 55  |
| no. of invocation<br>i(n) | 1   | 1   | 3   | 5   | 9   | 15  | 25  | 41  | 67  | 109 |     |
| no. of addition<br>a(n)   | 0   | 0   | 1   | 2   | 4   | 7   | 12  | 20  | 33  | 54  | 88  |

- $if$ $(n == 0)$ $;$ $F_{n} = 0$
- $if$ $(n == 1)$ $;$ $F_{n} = 1$
- $if$ $(n > 1)$ $;$ $F_{n} = F_{n-1} + F_{n-2}$

- $if$ $(n == 0)$ $;$ $i(n) = 1$
- $if$ $(n == 1)$ $;$ $i(n) = 1$
- $if$ $(n > 1)$ $;$ $i(n) = i(n-1) + i(n-2) + 1$
  The extra + 1 comes when the function call itself. Every `f(n)` makes two recursive calls except the base cases, plus the call you are currently in. 
- $for$ $all$ $n$ $;$ $i(n) = 2F_{n+1} - 1$

- $if$ $(n == 0)$ $;$ $a(n) = 0$
- $if$ $(n == 1)$ $;$ $a(n) = 0$
- $if$ $(n > 1)$ $;$ $a(n) = a(n-1) + a(n-2) + 1$

## Tower of Hanoi / Brahma
- It is a classic mathematical puzzle consisting of three rods and a set of disks of varying sizes. 
- The puzzle starts with the disks stacked on one rod in ascending order, forming a conical shape.
- Objective : Move the entire stack of disks to another rod while following these rules:
	- Only one disk can be moved at a time
	- A disk can only be placed on an empty rod or a larger disk
	- No larger disk can be placed on top of a smaller disk
- ![[Pasted image 20260113164618.png]]

- In order to shift $n$ no. of disks from Origin to Destination → first shift $n-1$ disks from origin to Mid-Tower. Only then can the $n^{th}$ disk be shifted to the Destination.
- Total no. of disk movements to shift $n$ no. of disks = $2^n-1$
- Total no. of function calls = $2^{n+1}-1$

---
###### Previous Qs are in [[Stack#Questions|Stack - Questions]]

###### <span style="color:rgb(0, 176, 240)">Q16)</span> Find the output of the following pseudo codes
```pseudo
void main()
{
	fun(4)
}

void fun(int x)
{
	if(x > 0)
	{
		printf("%d", x);
		fun(x - 1);
	}
}
```

<span style="color:rgb(0, 176, 240)">A16)</span>    

<span style="color:rgb(146, 208, 80)">4  3  2  1</span>
![[Pasted image 20260103185330.png]]
```pseudo
void main()
{
	fun(4);
}

void fun(int x)
{
	if(x > 0)
	{
		fun(x - 1);
		printf("%d", x);
	}
}
```

<span style="color:rgb(146, 208, 80)">1  2  3  4</span>
![[Pasted image 20260103190053.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q17)</span> Find the output of the following pseudo code:
```pseudo
void main()
{
	fun();
}

void fun(int x)
{
	if (x > 0)
	{
		printf("%d", x);
		fun(x - 1);
		printf("%d", x);
		fun(x - 1);
		printf("%d", x);
	}
}
```

<span style="color:rgb(0, 176, 240)">A17)</span> 
fun(3) = <span style="color:rgb(146, 208, 80)">3 2 1 1 1 2 1 1 1 2 3 2 1 1 1 2 1 1 1 2 3</span>
fun(2) = 2 1 1 1 2 1 1 1 2
fun(1) = 1 1 1

![[Pasted image 20260103192720.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q18)</span> Find the output of the following pseudo code on n = 6?
```pseudo 
int x(int n)
{
	if(n < 3)
		return 1;
	else
		return x(n-1) + x(n-1) + 1;
}
```

<span style="color:rgb(0, 176, 240)">A18)</span>  <span style="color:rgb(146, 208, 80)">  31</span>
n = 6

x(6) = x(5) + x(5) + 1
x(5) = x(4) + x(4) + 1
x(4) = x(3) + x(3) + 1
x(3) = x(2) + x(2) + 1
x(2) = 1

x(3) = 1 + 1 + 1 = 3
x(4) = 3 + 3 + 1 = 7
x(5) = 7 + 7 + 1 = 15 
x(6) = 16 + 16 + 1 = 31

---
###### <span style="color:rgb(0, 176, 240)">Q19)</span> Consider the following recursive C function that takes two arguments
```c
unsigned int foo(unsigned int n, unsigned int r)
{
	if(n > 0)
		return(n%r + foo(n/r, r));
	else
		return 0;
}
```
###### What is the return value of the function foo when it is called as foo (345, 10)? <span style="color:rgb(255, 192, 0)">(GATE - 2011) (2 Marks)</span>

###### (A) 345
###### (B) 12
###### (C) 5
###### (D) 3

<span style="color:rgb(0, 176, 240)">A19)</span>    <span style="color:rgb(146, 208, 80)">(B) 12</span>

3 + 4 + 5 = 12

We can the pattern, Its basically the sum of all the digits of n.

![[Pasted image 20260112200533.png]]
###### What is the return value of the function foo when it is called as foo(513, 2)? <span style="color:rgb(255, 192, 0)">(GATE - 2011) (2 Marks)</span>
###### (A) 9
###### (B) 8
###### (C) 5
###### (D) 2

<span style="color:rgb(0, 176, 240)">A19)</span> <span style="color:rgb(146, 208, 80)"> </span><span style="color:rgb(146, 208, 80)">(D) 2</span>
1 + 1 = 2
![[Pasted image 20260112202252.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q20)</span> Consider the following ANSI C function :int SomeFunction (int x, int y) <span style="color:rgb(255, 192, 0)">(GATE - 2021) (2 Marks)</span>
~~~~c
int SomeFunction (int x, int y)
{
	if ((x == 1) ||(y == 1))
		return 1;
	if (x == y)
		return x;
	if (x>y)
		return SomeFunction(x-y, y);
	if (y > x)
		return SomeFunction (x, y-x);
}
~~~~
###### The value returned by SomeFunction(15, 255) is _ _ _ _ .

<span style="color:rgb(0, 176, 240)"><span style="color:rgb(0, 176, 240)">A20)</span></span>  <span style="color:rgb(146, 208, 80)">15</span>

![[Pasted image 20260112204148.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q21)</span> Consider the following ANSI C program <span style="color:rgb(255, 192, 0)">(GATE - 2021) (2 Marks)</span>
```c
#include <stdio.h>
int foo(int x, int y, int q)
{
	if ((x <= 0) && (y <= 0))
		return q;
	if (x <= 0)
		return foo(x, y-q, q);
	if (y <= 0)
		return foo(x-q, y, q);
	return foo(x, y-q, q) + foo(x-q, y, q);
}
int main()
{
	int r = foo(15, 15, 10);
	printf("%d", r);
	return 0;
}
```

###### The output of the program upon execution is _ _ _ _

<span style="color:rgb(0, 176, 240)">A21)</span>  <span style="color:rgb(146, 208, 80)">60</span>

![[Pasted image 20260113000418.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q22)</span> Consider the following recursive C function. If get (6) function is being called in main() then how many times will the get () function be invoked before returning to the main ()? <span style="color:rgb(255, 192, 0)">GATE - 2015) (2 Marks)</span>
```
void get (int n)
{
	if (n < 1)
		return;
	get(n-1);
	get(n-3);
	printf ("%d", n);
}
```
###### (A) 15
###### (B) 25
###### (C) 35
###### (D) 45

<span style="color:rgb(0, 176, 240)">A22)</span>  <span style="color:rgb(146, 208, 80)">(B) 25</span>
g(-2) , g(-1) , g(-2) → 1
g(1) → 3
g(2) → 5
g(3) → 7
g(4) → 11
g(5) → 17
g(6) → 25
![[Pasted image 20260113001928.png]]

---
## 🔗 Connections

- Recursion uses the call stack → [[Stack]]
- Tree traversal algorithms are recursive → [[Binary Tree Traversal]]
- Divide-and-conquer recursion used in → [[Merge Sort]]
- Recursive subproblems relate to → [[Algorithm Basics]]

---
# References 

1. [[Stack]]