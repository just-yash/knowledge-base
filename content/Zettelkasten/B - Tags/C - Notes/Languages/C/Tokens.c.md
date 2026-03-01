
Date :  2026-01-28    
Tags :   [[C]]    
~ ***Yash Agrawall*** ~    
 
---
# Tokens
In the [[C]] programming language, a **token** is the smallest individual unit of a program that is meaningful to the [[Language Translators#2. Compiler|compiler]]. During compilation, the source code is first broken into tokens before further analysis.
###### Example : 
```c
int sum = a + 5;
int | sum | = | a | + | 5 | ;
// Each of these is a token
```

# Token Types 
## 1. Keywords
- Reserved words with predefined meaning
- these words cannot be used as Identifiers
- 55 keywords in [[C|C23]]
- Keywords are case-sensitive in [[C]]

| Sl. No. | Keyword       | Category               |
| ------: | ------------- | ---------------------- |
|       1 | auto          | Storage class          |
|       2 | break         | Control                |
|       3 | case          | Control                |
|       4 | char          | Data type              |
|       5 | const         | Type qualifier         |
|       6 | constexpr     | Constant specifier     |
|       7 | continue      | Control                |
|       8 | default       | Control                |
|       9 | do            | Loop                   |
|      10 | double        | Data type              |
|      11 | else          | Control                |
|      12 | enum          | User-defined type      |
|      13 | extern        | Storage class          |
|      14 | float         | Data type              |
|      15 | for           | Loop                   |
|      16 | goto          | Control                |
|      17 | if            | Control                |
|      18 | inline        | Function specifier     |
|      19 | int           | Data type              |
|      20 | long          | Type modifier          |
|      21 | register      | Storage class          |
|      22 | restrict      | Type qualifier         |
|      23 | return        | Control                |
|      24 | short         | Type modifier          |
|      25 | signed        | Type modifier          |
|      26 | sizeof        | Operator               |
|      27 | static        | Storage class          |
|      28 | static_assert | Compile-time assertion |
|      29 | struct        | User-defined type      |
|      30 | switch        | Control                |
|      31 | thread_local  | Storage class          |
|      32 | typedef       | Type definition        |
|      33 | union         | User-defined type      |
|      34 | unsigned      | Type modifier          |
|      35 | void          | Data type              |
|      36 | volatile      | Type qualifier         |
|      37 | while         | Loop                   |
|      38 | bool          | Data type              |
|      39 | true          | Boolean literal        |
|      40 | false         | Boolean literal        |
|      41 | nullptr       | Pointer literal        |
|      42 | typeof        | Type operator          |
|      43 | typeof_unqual | Type operator          |
|      44 | alignas       | Alignment specifier    |
|      45 | alignof       | Alignment operator     |

### Deprecated but still Reserved Keywords (C23)

|Sl. No.|Keyword|Category|
|--:|---|---|
|46|_Bool|Data type (deprecated)|
|47|_Atomic|Type qualifier|
|48|_Complex|Data type|
|49|_Generic|Generic selection|
|50|_Imaginary|Data type|
|51|_Alignas|Alignment specifier|
|52|_Alignof|Alignment operator|
|53|_Noreturn|Function specifier|
|54|_Static_assert|Compile-time assertion|
|55|_Thread_local|Storage class|

---
## 2. Identifiers
- names given to variables, functions, [[Array|Array]], Structures, Pointers, Macros, Labels, Enum constants, Typedef names

Rules : 
- Must start with a letter (a–z, A–Z) or underscore `_`
- Can contain letters, digits, underscores
- Cannot be a keyword
- C is a case sensitive language 
- Identifier name must be unique within a code block.

---
### 2.1 Variables 
- A variable is a memory location that stores a value
- A container for data.
- A single variable can store a single value of the specified datatype. 
- All variable _names_ evaluate to lvalues (Locator Value). ^5efd01
	- it has a memory location
	- can generally appear on the LHS of [[Operators.c#2. Assignment Operator|assignment]]

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
- Information about the [[DataTypes.c|data type]] of the variable is forwarded to the [[Language Translators#2. Compiler|compiler]].
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
- A **literal** is a fixed value written directly in code.  
- A **constant** is an entity whose value cannot change.
- All literal constants evaluate to rvalues (Read Value). ^517040
	- Temporary Value
	- Does not represent a persistent memory location 
	- cannot be on the LHS of [[Operators.c#2. Assignment Operator|assignment]].

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
- Bitwise: `& | ^ ~ << >>`
- Conditional: `?:`
- sizeof : `sizeof`

---
## 5. Special Symbols - Punctuators / Separators
- characters used for structure.

Examples : 
`(` `)` `{` `}` `[` `]` `;` `,` `#`





---
# Questions
###### Q1) Which of the following is **not** a valid identifier?  
###### a) `_count`  
###### b) `total_sum`  
###### c) `2value`  
###### d) `value2`

A1)  c) `2value`  

---
###### Q2) Which statement is true?  
###### a) Declaration allocates memory  
###### b) Definition never allocates memory  
###### c) Initialization assigns first value  
###### d) Assignment and initialization are identical

A2)  c) Initialization assigns first value  

---
###### Q3) Which of the following is an rvalue?  
###### a) x  
###### b) arr  
###### c) 10  
###### d) ptr

A3) c) 10

---
###### Q4) Which token category does `++` belong to?  
###### a) Keyword  
###### b) Identifier  
###### c) Operator  
###### d) Punctuator

A4) c) Operator

---
# Summary 

- A token is the smallest meaningful unit of a C program.
- Main token types: keywords, identifiers, constants/literals, operators, punctuators.
- Keywords are reserved and case-sensitive.
- Identifiers name program entities and follow strict naming rules.
- Definition allocates memory; declaration only introduces the name and type.
- Initialization is the first assignment to a variable.
- Literals are fixed values; variables store values.
- Variables generally evaluate to lvalues; literals evaluate to rvalues.



---
# References 

1. [C YouTube Lecture](https://youtu.be/6tGB1gW2A3s?si=7ztltmD2Nd8Pqcv-)
