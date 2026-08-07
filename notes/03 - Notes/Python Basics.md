
Type : #Note    
Date :  2026-01-16  
Tags :   [[Language]] ; [[Python]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Python Basics

- created by Guido van Rossum, and released in 1991
- Used for:
	- web dev (server side)
	- software development(to create workflows)
	- Connect to database systems and read and modify files
	- Mathematics(handles big data easily)
	- System Scripting(rapid prototyping)
	- AI ML
- Python runs on an interpreter system → code can be executed as soon as it is written.
- Procedural, Object Oriented, Functional Language. 

- Latest version → python 3
	- to check your version type: `python --version` or `python -V`
- extension → `xyz.py`

- Python has English type syntax → designed for readability
- no need of semicolon or parentheses at the end of each line of command
- uses indentation for the scope of loops, functions and classes.
	- other languages use curly brackets

---
# Basic Commands for Terminal

- `python filename.py` or `py filename.py` → to run the program
- `code filename.py` → open filename.py or create filename.py if it doesn't exist
- `python` or `py` → open python command line in your terminal → run/test a short amount of code quickly without writing it in a file
	- REPL → Read-Eval-Print-Loop
	- Read what you type
	- Evaluate it
	- Print the result
	- Loop back and wait for the next line
	- its an interactive mode of programming
	- Command line ≠ REPL
		- REPL runs inside the command line
	- Command line is understood by the OS → egs: Bash, PowerShell, Command Prompt, etc
	- REPL is understood by python
![[Pasted image 20260116103954.png]]
- `exit()` → exit the python command line

# Basic Commands for Python Command Line

![[Pasted image 20260116004756.png]]
- to check python version of the editor: 
```python
import sys
print(sys.version)
```
- `exit()` → exit the python command line


---
# Print Statements

```python
print("Hello, World")
```
---
# Python Indentation

- Python uses indentation to indicate a block of code.
- In other languages intention is used for cosmetics → better readability

```python
#correct
if 5 > 2:
	print('five is greater than two')
	
#incorrect
if 5 > 2:
print('five is greater than two')

if 5 > 2:  
 print("Five is greater than two!")  
        print("Five is greater than two!")
```

---
# Semicolons in Python

- they are optional and rarely used because it affects readability.
- Indentation defines blocks
- Semicolons only separate statements on the same line
- mostly used for REPL convenience 

---
# Python Character Set

- Uppercase `A–Z`, lowercase `a–z`
- Digits `0–9`
- Special symbols: `+`, `-`, `*`, `/`, `%`, `#`, `_`, `(`, `)`, etc.
- Whitespace: space, tab, newline
- ASCII and Unicode characters
- Python is close to English → all standard keyboard characters are valid

---
# Variables

- a variable = a **named memory location** that stores a value
- syntax: `variable_name = value`
- `=` is the **assignment operator** → right side value stored into left side variable
- Python is **dynamically typed** → no need to declare type manually

```python
name = "Yash"       # str
age = 20            # int
price = 25.99       # float
is_old = False      # bool
x = None            # NoneType
```

- to check type: `type(variable)`
```python
print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
```

### Variable Naming Rules
- valid: `A–Z`, `a–z`, `0–9`, `_`
- cannot start with a digit → `var1` ✅, `1var` ❌
- no special symbols (`%`, `@`, `#`, `$`) in names
- convention: **simple, short, meaningful** → `age`, `count`, `sum`, `price`
- Python is **case-sensitive** → `Age` ≠ `age`

---
# Data Types

5 primary types:

| Type | Keyword | Example | Notes |
|------|---------|---------|-------|
| Integer | `int` | `23`, `-5`, `0` | whole numbers |
| Float | `float` | `3.14`, `25.99` | decimal numbers |
| String | `str` | `"hello"`, `'world'` | text in quotes |
| Boolean | `bool` | `True`, `False` | capital T/F only |
| None | `NoneType` | `None` | absence of value |

- strings can use single, double, or triple quotes — double preferred by convention
- `True`/`False` must be capitalised — `true` causes a `NameError`

---
# Keywords

- reserved words with fixed meanings — cannot be used as variable names
- examples: `True`, `False`, `None`, `if`, `else`, `for`, `while`, `and`, `or`, `not`, `in`, `is`, `return`, `import`, `class`, `def`
- Python will error if you try to assign to a keyword
- learned naturally as you write more code — no need to memorise the full list upfront

---
# Operators

### Arithmetic
```python
a, b = 5, 2
print(a + b)    # 7
print(a - b)    # 3
print(a * b)    # 10
print(a / b)    # 2.5  → always float
print(a % b)    # 1    → remainder
print(a ** b)   # 25   → power
print(a // b)   # 2    → floor division
```

### Relational (Comparison) — always return bool
```python
print(a == b)   # False
print(a != b)   # True
print(a > b)    # True
print(a < b)    # False
print(a >= b)   # True
print(a <= b)   # False
```

### Assignment Shorthand
```python
x = 10
x += 5    # x = x + 5 → 15
x -= 3    # x = x - 3 → 12
x *= 2    # x = x * 2 → 24
x /= 4    # x = x / 4 → 6.0
x **= 2   # x = x ** 2 → 36.0
```

### Logical
```python
print(not True)          # False
print(True and False)    # False  → both must be True
print(True or False)     # True   → at least one True
```

---
# Type Conversion & Type Casting

### Implicit (automatic)
- Python auto-upgrades lower [[datatypes]] to higher type in expressions
- `float` > `int` → int gets promoted to float automatically
```python
a = 2       # int
b = 4.25    # float
print(a + b)          # 6.25
print(type(a + b))    # <class 'float'>
```

### Explicit (manual) —Type Casting
- use `int()`, `float()`, `str()`, `bool()` to force conversion
```python
int("25")       # → 25
float("3.14")   # → 3.14
str(100)        # → "100"
int("hello")    # ❌ ValueError — only valid numeric strings work
```

---
# Input

- `input()` pauses execution, waits for user to type, returns a **string always**
```python
name = input("Enter your name: ")
print("Welcome", name)
```

- type cast immediately for numeric input:
```python
age = int(input("Enter age: "))
marks = float(input("Enter marks: "))
```

- standard program structure:
  1. **Input** → get values
  2. **Process** → compute
  3. **Output** → print result

```python
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print("Sum =", a + b)
```

---
# Comments

- single-line: `#`
- multi-line: `"""..."""` or `'''...'''`
- commented code is not executed
- VS Code shortcut: `Ctrl+/` (Win) / `Cmd+/` (Mac) to toggle comment on selected lines

```python
# this is a single-line comment

"""
this is a
multi-line comment
"""
```

---
# References 

1. [w3schools - Python](https://www.w3schools.com/python/python_intro.asp)
2. [Apna College - Python Lecture 1](https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH)