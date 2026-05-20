
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
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# Semicolons in Python
- they are optional and rarely used because it affects readability.
- Indentation defines blocks
- Semicolons only separate statements on the same line
- mostly used for REPL convenience 




---
# Questions




---
# Summary 





---
# References 

1. [w3schools - Python](https://www.w3schools.com/python/python_intro.asp)