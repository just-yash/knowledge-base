
Type : #Note    
Date :  2026-02-08  
Tags :   [[C]] ; [[datatypes]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Strings.c
- String is not a primary datatype.
- Format Specifier : `%s`
- It is stored in a [[Array]] of [[Primary DataTypes.c#`char`|char]] with the last character being null → `\0`
- `\0` marks the end of the string without this, compiler cannot detect where the string ends
- without `'\0'` → undefined behaviour.
- `\0` is an octal [[Escape Sequences.c|escape sequence]].
###### Example : 
```c 
char str[] = "Hello";
// H e l l o \0
```

---
# String Declaration Methods
## 1. Using string literals (recommended)
- String can be declared using double quotes and writing the whole string.
- Compiler allocates size automatically
###### Example : 
```c
char s[] = "Hello";
```

## 2. Manual initialization 
- We can also use single quotes and writing each `char` separately → Manual declaration.
- Make sure to end it with `'\0'`. 
###### Example : 
```c
char s[] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

- within the square brackets we can specify the size of the string. But we have to leave space for `'\0'`. 
###### Example : 
```c
char s[5] = "Hello";   // No space for '\0'
char s[6] = "Hello";   // valid
```

---
# String Input Methods
## `scanf("%s", str);`
- Stops at whitespace
- No bound checking by default 
###### Examples : 
```c
char str[5];
scanf("%s", str);   
/*
inputs                  storage
hello         undefined behaviour -> no scape for \0
hi r                       hi
*/
```

## `fgets()`  (Best)
- Syntax : `fgets(str, size, stdin);`
- Reads spaces
- Prevents overflow
	- stores at max `size - 1` characters. 
- includes newline if entered
###### Examples : 
```c
char str[10];
fgets(str, 10, stdin);

/* 
inputs                 storage
hello                   hello
hi there               hi there
hi everyone           hi everyo
*/
```

## `gets()` (Never Use)
- Syntax : `gets(str);`
- No size checking
- No bounding check
- Removed from C11 standard

---
# String Output Methods
## `printf()`
- Prints characters until `'\0'`
- Does NOT add newline
###### Example :
```c
printf("%s", str);
```

## `puts()`
- Simpler than `printf`
- Automatically adds newline
###### Example : 
```c
puts(str);
```

---
# String Input Exception 
- for `scanf()`, using `$` for string is invalid
###### Example : 
```c
scanf("%s", &str);   // Error
scanf("%s", str);    // correct
```

---
# Character v/s String

|Character|String|
|---|---|
|`'a'`|`"a"`|
|Single value|Array of characters|
|`%c`|`%s`|
|Stored as int|Stored as char array|

---
# String Functions
- String functions can be enabled by the header `<string.h>`
### Important String Functions

|Function|Purpose|
|---|---|
|`strlen()`|Length (excluding `'\0'`)|
|`strcpy()`|Copy string|
|`strcat()`|Concatenate|
|`strcmp()`|Compare strings|

```c
strlen("Hello");   // 5
```

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---



























---
# Questions

in fgets
what will happen in the following cases : 
```c
char str[10];
fgets(str, 20, stdin);

char str[20];
fgets(str, 10, stdin);
```

### ❌ Using string as format string
`printf(str);   // Dangerous`
Correct:
`printf("%s", str);`
what do you mean by dangerous 

Give examples of each string function 



---
# Summary 





---
# References