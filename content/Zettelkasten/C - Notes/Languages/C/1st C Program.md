
Date :  2026-02-08  
Tags :   [[C]]  
~ ***Yash Agrawall*** ~  

---
# 1st C Program
```c
# include <stdio.h>

int main()
{
	int x, y, z;
	printf("Enter 2 no.: ");
	scanf("%d %d", &x, &y);
	z = x + y;
	printf("%d", z);
	return 0;
}
```

## File Inclusion - Preprocessor Directive
- The directive(commands) that run before the processing of the file
- `# include <stdio.h>` → include the library `stdio.h`
- `stdio.h` → standard I/O header file
- `.h` → header file extension 
- While compiling, this goes first, defining all the functions used.
- The preprocessor copies function declarations from the header file so the compiler knows about `printf`, `scanf`, etc.

## `int main()`
- This marks the beginning of our code block.
- `main()` is a special function defined by the C standard that must be written by the programmer.
- You cannot use another name instead of `main()`. 
	- Execution starts from `main`. 
	- The [[Operating System]] looks specifically for `main`
- `main()`  is not a keyword. But you cannot freely design it like other user-defined functions.
- Statements execute sequentially unless [[Control Structures.c|control statements]] alter the flow.
- `void main()` and `float main()` and `double main()` are not valid standard C. 
- `void main()` works in Turbo C / some compilers, but is non-standard.
- `return 0;` - returns 0 if there are no [[Errors#1. Compile-Time Errors|Compile]] or [[Errors#2. Runtime Errors|Runtime]] [[Errors]], signalling a successful execution to the [[Operating System]].
- We can also write `int main(void)` → for clarity that `main` takes no arguments.

## Code Block 
- Function is written within `{}`. 
###### Example : WAP to input 4 digit number from keyboard and find the sum of its digits
```c
#include <stdio.h>

int main(){
	int x, d1, d2, d3;
	printf("Enter 4 digit no. \n");
	scanf("%d",&x);
	d1 = x % 10; x /= 10;
	d2 = x % 10; x /= 10;
	d3 = x % 10; x /= 10;
	x = x + d1 + d2 + d3;
	printf("%d", x);
	return 0;
}
```
`\n` → [[Escape Sequences.c|Escape Sequence]] for new line → new line character

###### Example : WAP to find reverse of a 4 digit number.
```c
#include <stdio.h>

int main(){
	int x, d1, d2, d3;
	printf("Enter the 4 digit no.: ");
	scanf("%d",&x);
	d1 = x % 10; x /= 10;
	d2 = x % 10; x /= 10;
	d3 = x % 10; x /= 10;
	x = d1 * 1000 + d2 * 100 + d3 * 10 + x;
	printf("%d", x);
	return 0;
}
```












---
# Questions




---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/ybALcYlNfUc?si=P2f9lG8WtPBdv96I)