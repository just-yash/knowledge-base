
Date :  2026-02-09  
Tags :   [[C]]  
~ ***Yash Agrawall*** ~  

---
# Escape Sequences
- An escape sequence in C is a backslash(`\`) followed by one or more characters, used to represent special characters inside character [[Tokens.c#3. Constants / Literals|constants]] and string [[Tokens.c#3. Constants / Literals|literals]].
- Escape sequences are interpreted by the compiler as a single [[Primary DataTypes.c#`char`|character]]. 
###### Example : 
```c
printf("Hello\nWorld");

/* 
Hello
World
*/
```

---
# Why are Escape Sequences are needed
Some characters:
- cannot be typed directly (newline, tab)
- have special meaning (`"`, `'`, `\`)
- represent non-printable characters (null, alert)
Escape sequences allow these characters to be represented safely.

---
# Standard Escape Sequences
(Exam POV)
- There are a lot of Escape Sequences. 
- They are called escape sequences because they consist of a backslash followed by one or more characters interpreted as a single character.
- (a - z), Octal(0 - 7), Hexadecimal (x0 - xf). Here are some commonly used escape sequences.

|Escape Sequence|Meaning|
|---|---|
|`\n`|Newline|
|`\t`|Horizontal tab|
|`\r`|Carriage return|
|`\b`|Backspace|
|`\f`|Form feed|
|`\v`|Vertical tab|
|`\a`|Alert (bell)|
|`\\`|Backslash (`\`)|
|`\'`|Single quote (`'`)|
|`\"`|Double quote (`"`)|
|`\?`|Question mark|

###### Example : 
```c
printf("Hello\tWorld\n");

/*
Hello    World
 
*/
```

---
# Octal Escape Sequences
- Represent a character using octal digits
- General form : `\nnn` → 1 to 3 octal digits (0-7)
###### Examples : 
```c
\0          // octal 0 (null character)
\07         // octal 7
\101        // 'A' (octal 101 = decimal 65)
```
- `\0` → most commonly used octal escape.
- Its also used in [[Strings.c|strings]]

---
# Hexadecimal Escape Sequences 
- Represents a character using hexadecimal digits
- General form : `\xhh`
###### Examples : 
```c
\x41   // 'A'
\x61   // 'a'
```
- Hex escape sequences continue until a non-hex character is found.

---
# `\0` v/s `0` v/s `NULL`

These three look similar but have **different meanings and uses** in C.

| Expression | Type             | Meaning                                                                                 | Usage                        |
| ---------- | ---------------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| `'\0'`     | `char`           | Null character ([[Primary DataTypes.c#ASCII Codes\|ASCII]] 0) <br>Octal Escape Sequence | String termination           |
| `0`        | `int`            | Integer zero                                                                            | Numeric operations           |
| `NULL`     | pointer constant | Null pointer                                                                            | Pointer initialization/check |

```c
'\0' == 0;       // value wise
'\0' != NULL;    // different concept
```









---
# Questions




---
# Summary 





---
# References 

