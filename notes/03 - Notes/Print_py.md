
Type : #Note    
Date :  2026-01-16    
Tags :   [[Python]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Print_py

Python `print()` function
- built-in function 
- Syntax:
```python
print(object(s), sep=separator, end=end of line, file = file, flush = flush)
```

| Parameters | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| object(s)  | Any object → will be converted to string before printing                                              |
| sep        | 1. optional<br>2. specify how to separate the objects, if there is more than one.<br>3. default → ' ' |
| end        | 1. optional<br>2. specify what to print at the end.<br>3. default → '\n' → line feed                  |
| file       | 1. optional<br>2. An object with a write method<br>3. default → 'sys.stdout'                          |
| flush      | 1. optional<br>2. output is stored and printed out later → buffering <br>3. default → False           |

file → redirects destination → where to print
flush → controls timing

In python, output produced is usually buffered → stored temporarily and written to the output device(screen, file, pipe → controlled by `file`)

The `flush` parameter controls when this buffered output is actually written. 
- `flush = False` (default) → Output delayed until :
	- a newline is printed
	- the buffer filles
	- the program ends
- `flush = True` → forces the output buffer to be written immediately
	- useful when real-time feedback is required → debugging, long running programs, or printing without a newline. 
	- excessive flushing can slow down a program → use only when timely output is important

---
## objects in python
- written inside quotes → double or single → ' ' or " "
```python
# correct
print("This will work")
print('This will also work')

# incorrect
print("This will not work')
print(This will also cause an error)
```
- each object is separated by a comma. 
```python
print("Yash","Zettelkasten",sep = "'s ", end= "!!!\n")
```

---
## Printing Numbers & Expressions

- numbers can be printed directly — no quotes needed
- arithmetic expressions are evaluated before printing
```python
print(23)           # 23
print(35 + 23)      # 58
print(10 * 5)       # 50
print(10 / 4)       # 2.5  → always float for division
```

- with quotes → treated as string literal, printed as-is
- without quotes → treated as variable or expression, evaluated first
```python
name = "Yash"
print("name")    # name   ← string literal
print(name)      # Yash   ← variable value
```

---
## Multi-value printing behaviour

- comma-separated values → printed on **same line**, separated by `sep` (default: space)
- separate `print()` calls → each on a **new line** (because `end='\n'` by default)

```python
print("Hello", "World")         # Hello World
print("Hello")
print("World")                  # Hello
                                # World
```

- to print on same line without space:
```python
print("Hello", "World", sep="")     # HelloWorld
print("Hello", end=" "); print("World")  # Hello World
```

---
# Questions

- When does `flush=True` become a real bottleneck — at what output volume?
- How does `print()` handle objects that don't have a `__str__` method?
- What's the difference between `print(x)` and `sys.stdout.write(str(x))`?

---
# Summary 

`print()` is Python's built-in output function. It accepts any number of objects, converts them to strings, separates them with `sep` (default: space), and ends with `end` (default: newline). Numbers and expressions are evaluated before printing — quotes make something a literal string. Output is buffered by default; `flush=True` forces immediate write. The `file` parameter redirects output away from stdout entirely.


---
# References

1. [w3schools - print()](https://www.w3schools.com/python/ref_func_print.asp)
2. [Apna College - Python Lecture 1](https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH)