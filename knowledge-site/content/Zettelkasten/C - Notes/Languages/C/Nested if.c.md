
Date :  2026-02-12  
Tags :   [[C]]  ; [[conditional]]  
~ ***Yash Agrawall*** ~  

---
# Nested if.c
- A nested `if` means an `if` statement placed inside another `if` or `else` block.
- It is used when a decision depends on multiple conditions evaluated in sequence.
- Each `if` is evaluated only if control reaches it.
```c
// syntax
if (expression1)
{
    if (expression2)
    {
        statement(s);
    }
}
```
- There is no limit on nesting depth.
- Each `else` pairs with the nearest unmatched `if`.

### Rules : 
- Conditions are evaluated top-down
- Inner `if` executes only if outer `if` condition is `true`.
- `else` always attaches to the nearest unmatched `if`. 
- Indentation does not affect execution 
- `{}` determines actual scope, not formatting.

###### Examples : 
```c
int x = 5, y = 3;

if (x > 0)
{
    if (y > 0)
    {
        printf("Both positive");
    }
}

// Both positive
```

```c
int x = 5, y = -2;

if (x > 0)
{
    if (y > 0)
        printf("Both positive");
    else
        printf("x positive, y non-positive");
}

// x positive, y non-positive
```

```c
int x = 5, y = 0;

if (x > 0)
if (y > 0)
        printf("Both positive");
else
        printf("x positive, y non-positive");

// x positive, y non-positive
```
- `else` pairs with nearest `if`

###### WAP to input marks of a student in 2 subjects. Student is pass if marks in both subjects are greater than 50, otherwise fail.
```c
#include <stdio.h>

int main(){
	int s1, s2;
	printf("Enter the marks in subject 1: ");
	scanf("%d", &s1);
	printf("\nEnter the marks in subject 2: ");
	scanf("%d", &s2);
	if (s1 > 50)
	if (s2 > 50)
	printf("student is pass");
	else
	printf("student is fail");
	else 
	printf("student is fail");
}
```
- We can also solve this using [[Operators.c#^32ad15|logical AND]] 

- nested if can cause errors, hence its always wiser to use [[Operators.c#4. Logical Operators|logical operators]] wherever we can.






















---
# Questions
###### Q1) WAP to input marks of a student in 3 subjects, Student is pass if mark in all subjects are greater than 50, if any 2 then compartment else fail.

```c
#include <stdio.h>

int main(){
	int s1, s2, s3;
	printf("Enter the marks in three subject: ");
	scanf("%d %d %d", &s1, &s2, &s3);
	s1 = (s1 > 50); s2 = (s2 > 50); s3 = (s3 > 50);
	if (s1 + s2 + s3 == 3)
	printf("PASS!");
	else if (s1 + s2 + s3 == 2)
	printf("COMPARTMENT!");
	else 
	printf("FAIL!");
	return 0;
}	
```

###### Q2) Greatest of 3 numbers, considering all are distinct
```c
#include <stdio.h>

int main(){
	int x, y, z;
	printf("Enter the three numbers : ");
	scanf("%d %d %d", &x, &y, &z);
	if (x > y && x > z)
	printf("x is the greatest");
	else if (y > x && y > z)
	printf("y is the greatest");
	else if (z > x && z > y)
	printf("z is the greatest");
	return 0;
}
```

---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/NgnZ0OiT710?si=SUosht9uaY5O1K7m)
2. [[Simple if.c]]
3. [[if-else.c]]
4. [[else-if ladder.c]]