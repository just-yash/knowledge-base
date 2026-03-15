
Date :  2026-02-14  
Tags :   [[C]]  ; [[datatypes]] ; [[functions]]  
~ *Yash Agrawall* ~  

---
# char functions.c
- Character functions are classification and transformation functions used to test or modify single characters.
- They are declared in `<ctype.h>`

---
# Rules
- All `ctype.h` functions return [[Primary DataTypes.c#`int`|int]] , not [[Primary DataTypes.c#`char`|char]]
- test functions (return just like [[Operators.c#3. Relational Operators|Relational Operators]] & [[Operators.c#4. Logical Operators|Logical Operators]]) : 
	- return non-zero → `true`
	- return `0` → `false`
- conversion functions : 
	- return the converted character(as [[Primary DataTypes.c#`int`|int]] → [[Primary DataTypes.c#ASCII Codes|ASCII Codes]]) 

---
# Test Functions
Passing a negative `char` value (other than `EOF`) to `ctype.h` functions causes undefined behavior.

| Function      | True if character is…                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `isalpha(c)`  | Alphabet (`A–Z`, `a–z`)                                                                                         |
| `isdigit(c)`  | Digit (`0–9`)                                                                                                   |
| `isalnum(c)`  | Alphanumeric                                                                                                    |
| `islower(c)`  | Lowercase letter                                                                                                |
| `isupper(c)`  | Uppercase letter                                                                                                |
| `isspace(c)`  | Whitespace (`' '`, `\n`, `\t`, etc.)                                                                            |
| `isblank(c)`  | Space or tab                                                                                                    |
| `ispunct(c)`  | Punctuation (`!`, `.`, `,`, etc.)                                                                               |
| `isxdigit(c)` | Hex digit (`0–9`, `A–F`, `a–f`)                                                                                 |
| `isprint(c)`  | Printable character                                                                                             |
| `iscntrl(c)`  | Control character (`\n`, `\t`, etc.) Control characters are non-printable characters used for control purposes. |
| `isgraph(c)`  | Printable except space                                                                                          |

###### Example : 
```c
#include <stdio.h>
#include <ctype.h>

char c = 'A';

if (isalpha(c))
    printf("Alphabet");

if (isdigit(c))
    printf("Digit");
    
// Alphabet
```

```c
if (isupper(c) == 1)
```
- Not necessarily return `1`. It returns a non-zero value, which can be anything.

```c
char c = -1;
if (isalpha(c))   // undefined behavior

if (isalpha((unsigned char)c))
```
- function doesn't take negative values.

---
# Conversion Functions

| Funtion      | what they do?                                                                  |
| ------------ | ------------------------------------------------------------------------------ |
| `tolower(c)` | return the converted character, represented as an `int` (its character code)   |
| `toupper(c)` | return the converted character, represented as an `int` (its character code)\| |

###### Examples : 
```c
char c = 'A';
c = tolower(c);   // 'a'
```
- If the character is already lowercase, it is returned unchanged.

---
# Tips
- Never manually compare [[Primary DataTypes.c#ASCII Codes|ASCII]] ranges when `<ctype.h>` exists. 
- Exams expect library usage awareness. 
- for any `char` value, make sure it is [[Primary DataTypes.c#`unsigned`|unsigned char]] → negative values give undefined behavior. 
- [[Type Conversion.c#2. Explicit Type Conversion (Type Casting)|Type Cast]] to unsigned to avoid [[Errors#2. Runtime Errors|runtime bugs]].

---
# Usability for [[Strings.c|Strings]]
- `ctype.h` → single character
- `string.h` → character [[Array|arrays]] → [[Strings.c|Strings]] 
```c
isalpha("A");    // invalid
isalpha('A');    // valid
```

- for strings you may use it using loops.

---
# Using [[Primary DataTypes.c#`char`|char]] functions in [[Control Structures.c#^6c7864|Conditions]]
```c
if (isalpha(c) && isupper(c))
{
    printf("Uppercase alphabet");
}

```
- Short-circuiting applied normally.












---
# Questions




---
# Summary 
- Declared in `<ctype.h>`
    
- Operate on **single characters**
    
- All functions return `int`
    
- Test functions return non-zero for true, `0` for false
    
- Conversion functions return converted character as `int`
    
- Safer and more portable than manual ASCII comparisons
    
- Arguments should be cast to `unsigned char` to avoid undefined behavior



---
# References 

1. [[Primary DataTypes.c]]
