
Date :  2026-01-16    
Tags :   [[Language]] ; [[Python]]  
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
# Questions




---
# Summary 





---
# References 

