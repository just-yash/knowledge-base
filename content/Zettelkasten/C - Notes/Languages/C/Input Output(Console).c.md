
Date :  2026-02-07  
Tags :   [[C]]  
~ ***Yash Agrawall*** ~  

---
# Input Output(Console).c
- Keyboard and Monitor are together knows as Console
- C performs input and output using standard library functions, defined in `#include <stdio.h>`

---
# Format Specifiers

| Data Type                                                   | Specifier                                        |
| ----------------------------------------------------------- | ------------------------------------------------ |
| [[Primary DataTypes.c#`int`\|int]]                          | `%d` , `%i` → same in output, different in input |
| hexadecimal integer                                         | `%x`                                             |
| octal integer                                               | `%o`                                             |
| [[Primary DataTypes.c#1. `unsigned`\|unsigned]]             | `%u`                                             |
| [[Primary DataTypes.c#2. `long`\|long]]                     | `%ld`                                            |
| [[Primary DataTypes.c#3. `unsigned long`\|unsigned long]]   | `%lu`                                            |
| [[Primary DataTypes.c#4. `short`\|short]]                   | `%hd`                                            |
| [[Primary DataTypes.c#5. `unsigned short`\|unsigned short]] | `%hu`                                            |
| [[Primary DataTypes.c#`float`\|float]]                      | `%f`                                             |
| [[Primary DataTypes.c#`double`\|double]]                    | `%f` → output ; `%lf` → input                    |
| [[Primary DataTypes.c#`long`\|long double]]                 | `%Lf`                                            |
| [[Primary DataTypes.c#`char`\|char]]                        | `%c`                                             |
| [[Primary DataTypes.c#`unsigned`\|unsigned char]]           | `%hhu`                                           |
| [[Primary DataTypes.c#`signed`\|signed char]]               | `%hhd`                                           |
| **string**                                                  | `%s`                                             |
- When `printf` has `float` it gets promoted to `double`.
- When `printf` has `char` or `short`, they get promoted to [[Primary DataTypes.c#`int`|int|`int`]].
- for `float` and `double` , we can specify the no. of decimal digits we want the compiler to print by using a prefix of `.n` → n = no. of decimal digits we want to print. 
###### Examples : 
```c
int a = 10;
float b = 3.1469;

printf("a = %d, b = %.2f", a, b);       // a = 10, b = 3.14

```

- For Octal numbers we add a prefix `0`. For Hexadecimal number we add the prefix `0x`.
###### Examples :
```c
printf("%o", 0100);   // 100
printf("%x", 0x100);  // 100
```



---
# Output Functions
- `printf()`
###### Examples : 
```c
#include <stdio.h>

printf("Hello World");
```

```c
int x = 5; 
printf("%d", x);                  // 5
printf("value of x is %d", x);    // value of x is 5
```

```c
int x = 5, y = 2, z;
z = x + y;
printf("sum of %d & %d is %d", x, y, z);   // sum of 5 & 2 is 7
```

```c
printf("%d", 100);    // 100
printf("%o", 100);    // 144
printf("%x", 100);    // 64
printf("%o", 0100);   // 100
printf("%x", 0x100);  // 100
printf("%c", 'a');    // a
printf("%d", 'a');    // 97
printf("%c", 'ab');   // a    // This is actually `implementation defined`, but for most exams this is the ans they expect.
printf("%d", 'ab');   // 97  // This is actually `implementation defined`, but for most exams this is the ans they expect.
printf("%c", 100);    // d
printf(100);          // Error
printf("100");        // 100
printf("100",100);    // 100  // Extra arguments to `printf` are ignored if no format specifiers exist.
```

---
# Input Function
- `scanf()`
###### Example : 
```c
int x;
scanf("%d", &x);
```

### Rules : 
- `&` is required to store the input in an identifier(variable). 
- input value should match the format specifier
- It skips whitespace by default (except `%c`)
###### Examples : 
```c
int x;
float y;

scanf("%d %f", &x, &y);
```

- `%d` is used for purely decimal values 
###### Examples :
```c
int x;
scanf("%d", &x);

/* 
input          stored value       interpreted as
8                   8                decimal
08                  8                decimal
010                10                decimal
0x10              error               error
*/ 
```

- `%i` is dynamic, it changes with the input
###### Examples :
```c
int x;
scanf("%i", &x);

/* 
input          stored value         interpreted as
8                   8                  decimal
08                error                error
010                 8                  octal
0x10               16                 hexadecimal
*/ 
```
























---
# Questions




---
# Summary 





---
# References 
1. [YouTube Lecture](https://youtu.be/TkbbG7R-dtY?si=8mVARoy8t-3viFXa)
