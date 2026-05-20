
Type : #Note    
Date :  2026-02-16  
Tags :   [[C]] ; [[loop]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# do-while.c
- A `do-while` loop is an exit controlled iteration statement in C. 
- It executes the loop body at least once and then repeatedly executes it as long as the condition evaluates to non-zero (`true`).
```c
do 
{
	statement(s);
}
while (expression);
```

---
# Rules
- The `while (expression)` must end with a semicolon `;`
- Parentheses around `expression` is mandatory
- Braces `{}` are mandatory only if more than one statement exists
- `expression` must be a scalar expression

> The body of a `do–while` loop executes exactly once before the condition is evaluated.

---
# Execution Flow
1. Execute loop body
2. Evaluate `expression`
3. if `expression != 0` → repeat
4. if `expression == 0` → exit loop

> This is why it is called exit-controlled

---
###### Examples :
```c
int x = 11;

while (x <= 10)
printf("abc");
```
- no output 
- the condition is false initially only 

```c
int x = 11;

do
printf("abc");
while (x <= 10);

// abc
```
- statement was executed once before the condition was evaluated.

```c
do
printf("abc");
while(1);

// abcabcabcabcabc...
```
- infinite [[loop]]

```c
int x = -2;

do 
printf("abc");

while(x++);

// abcabc
```
- Condition is non-zero until `x` becomes `0`
- Loop exits when `x` becomes 0

```c
int x = 1;

do 
printf("abc");

while(x++);

// abcabcbabcbabc...
```
- This behavior depends on integer overflow, which is **undefined behavior in standard C**.  
- On some compilers (e.g., Turbo C), it may terminate when `x` wraps to 0.  
- On standard-compliant compilers, result is unpredictable.

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# [[while.c|while]] & `do-while` have same power
-  [[while.c|while]] & `do-while` loops have same power  
- Any program which can be made from `do-while` [[loop]] can also be made from [[while.c|while]] [[loop]], and vice-versa.  
	- To turn `do-while` into an entry controlled loop. We can use [[conditional]] statements, along with [[jump statements]], like `break`
	- To turn [[while.c|while]] into an exit controlled loop. We can use [[conditional]] statements, along with [[jump statements]] like `break`
###### Examples : 
```c
int i = 11;

do
{
	if (i > 10)
	break;
	else
	{
		printf("abc");
		i++;
	}
} while (i <= 10);

// ---

int i = 11;

while (i <= 10){
	printf("abc");
	i++;
}
```

```c
int i = 11;

while(1){
	printf("abc");
	if (i < 10)
	break;
}

// ---

int i = 11;

do{
	printf("abc");
}
while (i < 10);
```

# [[while.c|while]] v/s `do-while`

|while|do-while|
|---|---|
|Entry-controlled|Exit-controlled|
|Condition checked first|Body executes once before check|
|May execute zero times|Executes at least once|
|No trailing semicolon|Requires semicolon|

---
# Questions




---
# Summary 
- `do-while` is an **exit-controlled loop** in C.
    
- The loop body **executes at least once** before the condition is checked.
    
- The condition is evaluated **after** executing the loop body.
    
- The loop continues as long as the condition evaluates to **non-zero**.
    
- A semicolon `;` after `while(expression)` is **mandatory**.
    
- Braces `{}` are required only when there is **more than one statement**.
    
- `do-while` and `while` loops have **equal expressive power**; any program written using one can be written using the other.
    
- `do-while` is preferred when **at least one execution is required** (e.g., menu-driven programs).
    
- Infinite loops can be created using `while(1)` or `do { } while(1)`.
    
- Relying on **signed integer overflow** to terminate a `do-while` loop leads to **undefined behavior** in standard C.
    
- Only **unsigned integers** guarantee wraparound behavior.
    
- `continue` in a `do-while` loop transfers control directly to the **condition check**, not the top of the loop body.




---
# References 
1.  [YouTube Lecture](https://youtu.be/1E6ZctQiEZ0?si=icNeNJdJi_5_yjyi)
2. [[while.c]]
3. [[conditional]]
4. [[Control Structures.c]]