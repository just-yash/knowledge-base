
Date :  2026-01-28  
Tags :   [[Language]] ; [[C]]  
~ ***Yash Agrawall*** ~  

---
# Tokens
In the [[C]] programming language, a **token** is the smallest individual unit of a program that is meaningful to the [[Language Translators#2. Compiler|compiler]]. During compilation, the source code is first broken into tokens before further analysis.

# Token Types 
## 1. Keywords
- Reserved words with predefined meaning
- these words cannot be used as Identifiers
- 32 keywords in [[C]]
- Keywords are case-sensitive in [[C]]

| Sl. No. | Keyword  | Category           |
| ------- | -------- | ------------------ |
| 1.      | break    | Control            |
| 2.      | case     | Control            |
| 3.      | continue | Control            |
| 4.      | default  | Control            |
| 5.      | else     | Control            |
| 6.      | goto     | Control            |
| 7.      | if       | Control            |
| 8.      | return   | Control            |
| 9.      | switch   | Control            |
| 10.     | char     | Data type          |
| 11.     | double   | Data type          |
| 12.     | float    | Data type          |
| 13.     | int      | Data type          |
| 14.     | void     | Data type          |
| 15.     | long     | Data type modifier |
| 16.     | short    | Data type modifier |
| 17.     | do       | Loop               |
| 18.     | for      | Loop               |
| 19.     | while    | Loop               |
| 20.     | sizeof   | Operator           |
| 21.     | auto     | Storage class      |
| 22.     | extern   | Storage class      |
| 23.     | register | Storage class      |
| 24.     | static   | Storage class      |
| 25.     | typedef  | Type definition    |
| 26.     | signed   | Type modifier      |
| 27.     | unsigned | Type modifier      |
| 28.     | const    | Type qualifier     |
| 29.     | volatile | Type qualifier     |
| 30.     | enum     | User-defined type  |
| 31.     | struct   | User-defined type  |
| 32.     | union    | User-defined type  |

---
## 2. Identifiers
- names given to variables, functions, [[3 - Zettelkasten/C - Notes/DSA/DS/Array|Array]], Structures, Pointers, Macros, Labels

Rules : 
- Must start with a letter (a–z, A–Z) or underscore `_`
- Can contain letters, digits, underscores
- Cannot be a keyword

---
### 2.1 Variables 
- A variable is a memory location that stores a value
- A container for data.
- A single variable can store a single value of the specified datatype. 

Eg : 
```c
int x;
```
- `x` → variable of integer type → can hold only one integer value at a time.
- whenever a variable is defined, memory gets allocated according to its data type. 
- Amount of memory depends on the [[Language Translators#2. Compiler|Compiler]] and the System Architecture
- value that was present in those allocated storage is knows as Garbage value. 

### 3 Basic Terms related to Variables
#### 1. Definition 
- Memory allocation 
- Whenever variable is defined, memory is allocated for that variable deepening on its datatype. 

Eg : 
```c
int x;
```

#### 2. Declaration
- Information about the datatype of the compiler is forwarded to the [[Language Translators#2. Compiler|compiler]].
- Does not allocate memory

Eg : 
```c
extern int x;
```

> Both are two different things, Define ≠ Declare 
> Its impossible to define a variable without declaring it.

| Define | Declare | Possible |
| ------ | ------- | -------- |
| ✅      | ✅       | Yes      |
| ✅      | ❌       | NO       |
| ❌      | ✅       | Yes      |
| ❌      | ❌       | No       |

#### 3. Initialization
- the first value that is assigned to a variable.

Example : 
```c
int x;
x = 5;   // initialization
x = 10;  // assignment, not initialization
```

Combined form :
```c
int x = 5; // delcaration + definition + initialization
```

---
## 3. Constants / Literals
- fixed values that don't change during execution. 
- The value that is assigned to a [[Tokens.c#2.1 Variables|variables]] is called a constant.

Types :
- Integer: `10`, `-5`, `100`
- Floating point: `3.14`, `0.5`
- Character: `'A'`, `'9'`
- String: `"Hello"`

---
## 4. Operators
- Symbols that perform operations

Examples : 
- Arithmetic : `+ - * / %`
- Relational : `> < >= <= == !=`
- Logical : `&& || !`
- Assignment : ` = += -=`
- Increment/Decrement: `++ --`

---
## 5. Special Symbols - Punctuators / Separators
- characters used for structure.

Examples : 
`(` `)` `{` `}` `[` `]` `;` `,` `#`





---
# Questions




---
# Summary 





---
# References 

1. [C YouTube Lecture](https://youtu.be/6tGB1gW2A3s?si=7ztltmD2Nd8Pqcv-)
