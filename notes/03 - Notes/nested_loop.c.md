
Type : #Note    
Date :  2026-02-17  
Tags :   [[C]] ; [[loop]]
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# nested_loop.c
A **nested loop** is a loop that exists **inside the body of another loop**.
- The outer loop controls **how many times** the inner loop runs
- The inner loop executes **completely** for each iteration of the outer loop
- There is **no language-imposed limit** on nesting depth.

```c
// syntax

for (outer_init; outer_cond; outer_update)
{
    for (inner_init; inner_cond; inner_update)
    {
        statement(s);
    }
}
```
The same structure applies to any valid combination.

# Rule
- The inner loop runs to completion for every single iteration of the outer loop.
- This is very important for [[Algorithm Basics#^f7c166|Complexity]]

---
###### Examples : 
```c
for (i = 1; i <= 3; i++){
	for (j = 1; j <= 2; j++){
		printf("abc ");
	}
}

// abc abc abc abc abc abc 
```

```c
for (i = 1; i <= 3; i++){
for (j = 1; j <= 2; j++)
printf("abc ");
printf("\n");}

/* 
abc abc
abc abc
abc abc
*/
```
- `printf("\n")` is in the scope of the outer loop

---
###### Q1) WAP to print the table of numbers 1 to 10

A1)
```c
#include <stdio.h>

int main(){
	for(int i = 1; i <= 10; i++){
		for(int j = 1; j <= 10; j++){
			printf("%d * %d = %d\n", i, j, i*j);
		}
		printf("\n");
	}
	return 0;
}
```

---
###### Q2) Find the Output
```c
int x = 5; 
do{
	while(x <= 7){
		printf("abc ");
		x++;
	} printf("%d", x);
}while ("x <= 10");
```

A2) 
```markdown
abc abc abc 8
```
- after this output it will turn into an infinite loop

---
###### Q3) WAP to input any natural number & find the sum of its digits

A3)
```c
#include <stdio.h>

int main(){
	int i, d, s = 0;
	scanf("%d", &i);
	if (i <= 0)
	printf("The number is not a natural number");
	else{
		while (i!= 0){
			d = i % 10;
			i = i / 10;
			s = s + d;
		}
		printf("%d", s);
	}
	return 0;
}
```

---
###### Q4) WAP to reverse a given natural number

A4)
```c
#include <stdio.h>

int main(){
	int n, i, j = 0;
	scanf("%d", &n);
	while (n > 0){
		i = n % 10;
		j = j * 10 + i;
		n = n / 10;
	}
	
    printf("%d", j);
	return 0;
}
```

---
# Summary 

- A nested loop is a loop placed inside another loop.
    
- The **inner loop runs completely** for each iteration of the outer loop.
    
- There is **no language-defined limit** on nesting depth.
    
- Nested loops are commonly used for:
    
    - Tables
        
    - Matrices
        
    - Digit-wise operations
        
    - Pattern printing
        
- Time complexity of nested loops is typically **multiplicative** (e.g., O(n²)).
    
- `break` exits only the **innermost loop**.
    
- `continue` affects only the **current loop**.
    
- Loop conditions must be evaluated carefully; non-zero values (including pointers) are treated as `true`.
    
- Incorrect placement of statements can change which loop they belong to due to scope rules.

---
# References 

1. [YouTube Lecture](https://youtu.be/0wtwI_nZ3Y8?si=WMYRdci7-aGM3g2D)
2. [[Control Structures.c]]