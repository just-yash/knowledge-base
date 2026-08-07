
Type : #Note       
Date : 04-06-2025        
Tags : [[Python]] ; [[datatypes]]    
Status : #complete      
~ ***Yash Agrawall*** ~     

---
## Key Ideas 

- A variable = a named memory location that stores a value
- Python auto-detects the type of a variable (dynamic typing)
- 5 primary data types: `int`, `float`, `str`, `bool`, `NoneType`
- `=` is the **assignment operator** — right side value goes into left side variable
- Variable names must be simple, short, and meaningful
- Python is **case-sensitive** — `Age` and `age` are different variables

---
## Note

### What is a Variable?
- In math: `a`, `b` in formulas are variables — their value changes
- In Python: same concept — a variable is a **name given to a memory location**
- Example analogy: memory = empty plots of land → creating a variable = building a house on a plot

```python
name = "Yash"   # 'name' is the variable, "Yash" is the value
age = 23
price = 25.99
```

### [[Operators#4. Assignment Operators|Assignment Operators]]
- `=` in Python ≠ equality in math
- It means: **take value on the right → store it in the variable on the left**
- `age = 23` → 23 gets stored in `age`
- `age2 = age` → value of `age` gets copied into `age2`

### Printing Variables
```python
print("name")   # prints literal string: name
print(name)     # prints variable value: Yash
print("My name is:", name)  # prints: My name is: Yash
```

### 5 Primary Data Types

| Type | Keyword | Example | Notes |
|------|---------|---------|-------|
| Integer | `int` | `23`, `-5`, `0` | Whole numbers, no decimal |
| Float | `float` | `25.99`, `3.14` | Decimal numbers |
| String | `str` | `"hello"`, `'world'` | Text in quotes |
| Boolean | `bool` | `True`, `False` | Capital T/F — case-sensitive |
| None | `NoneType` | `None` | Represents absence of value |

```python
name = "Yash"          # str
age = 23               # int
price = 25.99          # float
is_old = False         # bool
a = None               # NoneType

print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(price))     # <class 'float'>
print(type(is_old))    # <class 'bool'>
print(type(a))         # <class 'NoneType'>
```

### Strings — Three Valid Syntaxes
```python
name1 = "Yash"     # double quotes (preferred)
name2 = 'Yash'     # single quotes
name3 = """Yash""" # triple quotes
```

### Variable Naming Rules
- Valid characters: A–Z, a–z, 0–9, underscore `_`
- Cannot start with a digit: `var1` ✅, `1var` ❌
- No special symbols: `%`, `@`, `#`, `$` not allowed in names
- Convention: **simple, short, meaningful** — `age`, `name`, `count`, `sum`
- Python is **case-sensitive**: `Apple` ≠ `apple`

### Keywords — Reserved Words
- Python has reserved words that cannot be used as variable names
- Examples: `True`, `False`, `None`, `if`, `else`, `for`, `while`, `and`, `or`, `not`
- These have fixed meanings in Python — cannot be repurposed

---
# Questions 

- How does Python store variables internally — stack or heap?
- What happens when you reassign a variable — does the old memory get freed?
- Why does `type()` show `<class '...'>` — what does "class" mean here?

---
# Summary

A variable is a named memory slot that holds a value. Python automatically determines the data type — no need to declare it. The 5 primary types are int, float, str, bool, and NoneType. The `=` operator assigns values, not equality. Variable names must follow naming rules and should be simple and descriptive. Python is case-sensitive, so `Name` and `name` are distinct.

---
# References 

- Video: [Apna College Python Series Lecture 1](https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH)
