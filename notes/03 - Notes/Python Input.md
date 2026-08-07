
Type : #Note    
Date : 2026-06-04    
Tags : [[Python]]    
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# Input in Python

---
## Core Idea 

`input()` pauses program execution, waits for user to type, and **always returns a string** — regardless of what was typed. For numeric input, type cast immediately using `int()` or `float()`.

```python
age = int(input("Enter age: "))   # standard pattern for numeric input
```

---
## Explanation 

### Basic Syntax

```python
name = input("Enter your name: ")
print("Welcome", name)
```

- Program pauses at `input()` line
- User types → presses Enter → value stored in variable
- Execution continues

### Always Returns String

```python
val = input("Enter a number: ")
print(type(val))    # <class 'str'>  — even if user typed 25
```

- `"25"` typed → stored as string `"25"`, not integer `25`
- `"3.14"` typed → stored as string `"3.14"`, not float `3.14`

### Fix — Cast at Input Time

```python
age   = int(input("Enter age: "))      # str → int immediately
marks = float(input("Enter marks: "))  # str → float immediately
```

### Practical Example

```python
name  = input("Enter name: ")
age   = int(input("Enter age: "))
marks = float(input("Enter marks: "))

print("Welcome", name)
print("Age:", age)
print("Marks:", marks)
```

### Program Structure: Input → Process → Output

```python
# Sum of two numbers
a = int(input("First number: "))
b = int(input("Second number: "))
print("Sum =", a + b)
```

Most Python programs follow this 3-step flow:
1. **Input** — collect values
2. **Process** — compute/transform
3. **Output** — print result

---
## Why It Matters 

`input()` always returning a string is the most common source of beginner bugs — doing `a + b` on two inputs gives string concatenation (`"5" + "3" = "53"`) not addition. The fix is one word (`int` or `float`) but the understanding of why matters. This connects directly to [[Python Type Conversion & Type Casting]]

---
# Questions 

- What happens if user enters text when `int()` is expected — how to handle gracefully?
- Is there a way to take multiple inputs on one line in Python?
- What's the difference between `input()` and `sys.stdin.readline()` for performance?

---
# References 

1. [Apna College - Python Lecture 1](https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH)
2. [[Python Type Conversion & Type Casting]]
