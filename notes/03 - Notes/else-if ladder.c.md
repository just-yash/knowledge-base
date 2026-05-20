
Type : #Note    
Date :  2026-02-12  
Tags :   [[C]]  ; [[conditional]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# else-if ladder.c
An `else if` ladder is a multi-way conditional control structure that checks conditions sequentially from top to bottom and executes only the first block whose condition evaluates to non-zero.

Once a condition is satisfied:
- Its block executes
- All remaining conditions are skipped

```c
// syntax
if (condition1)
{
    statement(s);
}
else if (condition2)
{
    statement(s);
}
else if (condition3)
{
    statement(s);
}
else
{
    statement(s);
}
```

- `else if` is not a keyword
- it is parsed as: 
```c
else
{
    if (condition)
}
```

# Execution Flow
1. `condition1` is evaluated
2. If true → execute block → exit ladder
3. Else → check `condition2`
4. Continues until:
    - A condition is true or
    - Final `else` executes (optional)

###### Examples : 
```c
int marks = 72;

if (marks >= 90)
    printf("Excellent");
else if (marks >= 75)
    printf("Very Good");
else if (marks >= 60)
    printf("Good");
else
    printf("Average");

// Good
```

```c
int marks = 99;

if (marks >= 60)
    printf("Pass");
else if (marks >= 90)
    printf("Excellent");

// Pass
```
- Ordering Matters
- only one block executes




---
# Questions
###### Q1) WAP to print grade of student in range of marks is given below : 
###### 60 - 69 → D  
###### 70 - 79 → C  
###### 80 - 89 → B  
###### 90 - 99 → A  

A1) 
```c
#include <stdio.h>

int main(){
	int a;
	printf("Enter the marks");
	scanf("%d", &a);
	if (a >= 90 && a <= 99)
	printf("A");
	else if (a >= 80 && a <= 89)
	printf("B");
	else if (a >= 70 && a <= 79)
	printf("C");
	else if (a >= 60 && a <= 69)
	printf("D");
	else
	printf("invalid");
	return 0;
}
```






---
# Summary 

- An `else-if` ladder is a multi-way selection control structure.
    
- Conditions are evaluated sequentially from top to bottom.
    
- Only the first condition that evaluates to true is executed.
    
- Once a block executes, the rest of the ladder is skipped.
    
- `else if` is not a keyword; it is parsed as `else { if }`.
    
- Ordering of conditions is critical for correct execution.
    
- The final `else` block is optional and acts as a default case.
    
- `else-if` ladders are preferred over nested `if` when conditions are mutually exclusive.




---
# References 

1. [YouTube Lecture](https://youtu.be/NgnZ0OiT710?si=8_88V07Goju2FIPc)
2. [[Simple if.c]]
3. [[if-else.c]]
4. [[Nested if.c]]