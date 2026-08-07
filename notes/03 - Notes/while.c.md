
Type : #Note    
Date :  2026-02-15  
Tags :   [[C]] ; [[loop]]  
Status : #complete     
~ *Yash Agrawall* ~  

---
# while.c
- A `while` [[loop]] is an entry-controlled iteration statement that repeatedly executes a block of code as long as a given condition evaluates to non-zero (true).

```c
// syntax

while (expression)
{
    statement(s);
}

```

---
# Rules
- `expression` is evaluated before every iteration
- if `expression == 0` initially, [[loop]] body never executes. 
- Parentheses around the `expression` are mandatory
- Once the `expression` evaluates to `0`, the loop terminates. The condition is re-evaluated only at the loop entry, so it cannot become true again unless control re-enters the loop.

---
# Execution Flow
1. Evaluate `expression`
2. If `false` (`0`) → exit [[loop]]
3. if `true` (`!= 0`) → execute body
4. go back to step 1

> This is why its called entry controlled.

---
###### Examples : 
```c
int i = 1;

while (i <= 5)
{
    printf("%d ", i);
    i++;
}
printf("\nvalue of i = %d", i);

// 1 2 3 4 5
// value of i = 6
```

```c
while (0)
{
    printf("Hello");
}

// 
```
- The `expression` is `false` initially

```c
while (1)
{
    // infinite loop
}
```

- `1` is non-zero → always true
- Common in: 
	- [[Operating System]] kernels
	- Embedded Systems
	- Event [[loop]]s
	- Flight software

```c
int i = 0;
while (i < 10);
{
	printf("abc ");
	i++;
}

// 
```
- infinite [[loop]]
- `while (i < 10);` creates an empty loop
- The condition `i < 10` is checked repeatedly
- Since `i` is never modified inside the loop, it remains `true`
- The block `{ ... }` executes once, after the loop finishes (which it never does)

```c
int i = 0;

while (i < 10)
printf ("abc");
i++;

// abcabcabcabcabcabc...
```
- infinite [[loop]]
- By default, a [[Control Structures.c|Control Structures]] governs only the next single statement. Since `i++` is outside the loop, the loop condition never changes, resulting in an infinite loop.

```c
int i = 1;

while (i++ <= 10)
printf("%d ", i);

// 2 3 4 5 6 7 8 9 10 11
```
- step 1 : Compare current value of `i**` with `10`
- step 2 : Then increment `i`
- step 3 : If condition was true, print incremented `i`
- step 4 : go to step 1

```c
int i = 1;

while (++i <= 10)
printf("%d ", i);

// 2 3 4 5 6 7 8 9 10
```
- step 1 : assign `i = i + 1` then check if `i < 10`
- step 2 : if `true` print `(i)` 
- step 3 : go to step 1

---
###### Q1) Find the Output
```c
int i = 1;

while (i++ <= 10);
{
	printf("abc");
	i++;
}
printf("%d", i);
```

A1)  `abc13`  
- the `;` after `while (i++ <= 10)`, ends the scope of the loop there only. 
- even though the condition that `i++ <= 10` is false for `i == 11`, the `i++` will change its value to `12`. So when the control goes to `i++` in the block, the value becomes `i == 13`. Hence the answer is `abc13`

---
###### Q2) Find the Output
```c
int i = 1;

while (++i <= 10);
{
	printf("abc");
	i++;
}
printf("%d", i);
```

A2)  `abc12`
- the `;` after `while (++i <= 10)`, ends the scope of the loop there only. 
- When the control goes to the inner loop the value of `i` becomes `12`. Hence the answer is `abc12`

---
###### Q3) Find the Output. What will be the output if we swap the statements in the loop.
```c
int i = 1;

while (i <= 10)
{
	printf("%d ", i);
	i++;
}
printf("%d", i);

```

A3) 
Before Swapping : `1 2 3 4 5 6 7 8 9 10 11`
After Swapping :   `2 3 4 5 6 7 8 9 10 11 11`

In both cases, the final value of `i` is `11`, but the printed sequence differs due to pre- vs post-update relative to the print statement.

---
###### Q4) WAP to find the sum of 1st n natural no. 

A4) 
```c
#include <stdio.h>

int main(){
	int n; 
	scanf("%d", &n);
	int i = 1, j = 0;
	while (i <= n){
		j += i;
		i++;
	}
printf("%d", j);
return 0;
}
```
- By using loop → [[Algorithm Basics#^f7c166|Complexity]] = O(n)

or 

```c
#include <stdio.h>

int main(){
	int n;
	scanf("%d", &n);
	n = n * (n + 1) / 2
	printf("%d", n)
	return 0;
}
```
- By using formula → [[Algorithm Basics#^f7c166|Complexity]] = O(1)

---
###### Q5) WAP to find sum of 1st n even natural no. 

A5)
```c
#include <stdio.h>

int main(){
	int n; 
	scanf("%d", &n);
	n = 2 * n;
	int i = 2, j = 0;
	while (i <= n){
		j += i;
		i += 2;
	}
printf("%d", j);
return 0;
}
```
- Instead of putting `2*n` in the loop, its better to change the value of `n` altogether. For better efficiency of the code. As this way, the Compiler will save time by not calculating the value of `2*n` again and again.
- If we use a conditional statement inside instead of using `i += 2`. That will also affect its [[Algorithm Basics#^f7c166|Complexity]].

---
###### Q6) WAP to find sum of 1st n odd natural no. 

A6) 
```c
#include <stdio.h>

int main(){
	int n; 
	scanf("%d", &n);
	n = 2 * n;
	int i = 1, j = 0;
	while (i <= n){
		j += i;
		i += 2;
	}
printf("%d", j);
return 0;
}
```
- for first n even numbers, initialize `i` with `2`
- for first n odd numbers, initialize `i` with `1`

---
###### Q7) WAP to print table of a given number.

A7) 
```c
#include <stdio.h>

int main(){
	int a, b = 0, c;
	scanf("%d", &a);
	while (++b <= 10){
		c = a * b
		printf("%d * %d = %d\n", a, b, c);
	}
	return 0;
}
```

---
###### Q8) WAP to print the factorial of a given number

A8) 
```c
#include <stdio.h>

int main(){
	int n; 
	scanf("%d", &n);
	int i = 1, j = 1;
	while (i <= n){
		j *= i;
		i++;
	}
printf("%d", j);
return 0;
}
```

---
# Summary 

- `while` is an entry-controlled loop
- Condition is evaluated before every iteration
- Loop may execute zero or more times
- Uses integer truth (`0` → false, non-zero → true)
- A stray `;` after `while` creates an empty infinite loop
- Absence of braces limits the loop body to one statement
- `i++` and `++i` inside conditions change both logic and output
- Infinite loops commonly arise from:
	- Missing update
	- Wrong scope
	- Empty loop body
- Time complexity depends on:
	-  Number of iterations
	- Whether a formula can replace iteration

> A `while` loop is simple syntax wrapped around dangerously powerful control flow.

---
# References 

1. [YouTube Lecture](https://youtu.be/L5lCV_6i66s?si=9hbKlwVGARA4IOkj)
2. [[Control Structures.c]]