
Date :  2026-02-17  
Tags :   [[C]] ; [[jump statements]]
~ ***Yash Agrawall*** ~  

---
# break.c
- `break` is a [[jump statements]] that causes an immediate termination of the nearest enclosing [[loop]] or [[switch-case.c|switch]] statement, transferring control to the statement that follows it.
- it performs an unconditional control escape
- Syntax : `break;`
- It takes no arguments, no labels.
- Semicolon `;` is mandatory

---
# Rules
- `break` is valid only inside a [[loop]] and [[switch-case.c|switch-case]]
- using`break` outside these constructs → [[Errors#1. Compile-Time Errors|Compile Time Error]]
- `break` exits exactly one enclosing control structure 
- Control jumps to the first statement after the [[loop]] or [[switch-case.c|switch-case]]


---
###### Examples :
###### `break` in [[for.c|for loop]]
```c 
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break;
    printf("%d ", i);
}
printf("abc");

// 0 1 2 3 4 abc
```

###### `break` in [[while.c|while loop]]
```c
int i = 0;

while (i < 10)
{
    if (i == 3)
        break;
    printf("%d ", i);
    i++;
}
printf("abc");

// 0 1 2 abc
```

###### `break` in [[do-while.c|do-while loop]]
```c
int i = 0;

do
{
    if (i == 2)
        break;
    printf("%d ", i);
    i++;
}
while (i < 5);
printf("abc");

// 0 1 abc
```

###### `break` in [[switch-case.c|switch-case]]
```c
switch (x)
{
    case 1:
        printf("One");
        break;
    case 2:
        printf("Two");
}
```
- `break` exits the `case`
- it does not exit any enclosing [[loop]]

###### WAP to check given number is prime or not
```c
#include <stdio.h>
#include <math.h>

int main(){
	int p, i, q = 1;
	scanf("%d", &p);
	if (p < 2)
	printf("not prime");
	else
	{
		for (i = 2; i <= sqrt(p); i++){
			if (p % i == 0){
				q = 0;
				break;
			}
		}
		if (q)
		printf("prime");
		else
		printf("not prime");
	}
	return 0;
}	
```

###### WAP to print all the prime numbers between 1 to 500.
```c
#include <stdio.h>
#include <math.h>

int main(){
    int n, i, flag;

    for (n = 2; n <= 500; n++){
        flag = 1;

        for (i = 2; i <= sqrt(n); i++){
            if (n % i == 0){
                flag = 0;
                break;
            }
        }

        if (flag)
            printf("%d ", n);
    }

    return 0;
}

```











---
# Questions




---
# Summary 

- `break` is a jump statement that immediately terminates the **nearest enclosing loop or switch**.
    
- It causes an unconditional transfer of control to the statement following that construct.
    
- `break` is valid only inside loops and `switch` statements.
    
- Using `break` outside these constructs results in a compile-time error.
    
- In nested loops, `break` exits only the **innermost loop**.
    
- In `switch`, `break` exits the `switch` block, not any enclosing loop.
    
- `break` is commonly used with:
    
    - Flags
        
    - Conditional termination
        
    - Optimization (early exit)
        
- `break` does **not terminate the program**.
    
- `break` cannot be labeled in C.
    
- For decision-based problems (e.g., prime checking), computation and output must be separated.



---
# References 

1. [YouTube Lecture](https://youtu.be/Tfm_CKYkyq4?si=2hjG5H2eIjbqoMdg)
