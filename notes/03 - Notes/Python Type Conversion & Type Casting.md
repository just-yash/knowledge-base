Type : #Note       
Date : 04-06-2025        
Tags : [[Python]] ; [[datatypes]]   
Status : #complete             
~ ***Yash Agrawall*** ~     

---
# Type Conversion & Type Casting in Python

---
## Key Ideas 

- **Type Conversion (Implicit)**: Python auto-converts types in expressions — no manual action needed
- **Type Casting (Explicit)**: You manually force a value into a different type using `int()`, `float()`, `str()`
- Float is "superior" to int — in mixed expressions, int gets auto-upgraded to float
- String cannot be auto-converted to int/float — causes a `TypeError`
- Type casting only works if the value is actually compatible with the target type

---
## Note

### Type Conversion — Implicit (Automatic)

Python auto-converts when types are mixed in an expression — always upgrades to the more capable type.

```python
a = 2       # int
b = 4.25    # float

sum = a + b
print(sum)         # 6.25
print(type(sum))   # <class 'float'>
```

- Python converted `a` (int `2`) → `2.0` (float) internally before adding
- No error, no manual step needed
- Rule: **float > int** → int gets promoted

### When Implicit Conversion FAILS

```python
a = "2"    # string
b = 4.25   # float

sum = a + b   # ❌ TypeError
# TypeError: can only concatenate str (not "float") to str
```

- Python cannot auto-convert string `"2"` to a number — doesn't assume intent
- You must manually cast it

---

### Type Casting — Explicit (Manual)

Use built-in functions to manually convert:

| Function | Converts to |
|----------|------------|
| `int(x)` | Integer |
| `float(x)` | Float |
| `str(x)` | String |
| `bool(x)` | Boolean |

```python
a = "2"
b = 4.25

a = int(a)          # "2" → 2
sum = a + b
print(sum)          # 6.25
print(type(a))      # <class 'int'>
```

#### int to float
```python
x = float(5)        # → 5.0
```

#### number to string
```python
x = 3.14
x = str(x)
print(type(x))      # <class 'str'>
```

### When Casting FAILS

```python
x = int("Yash")   # ❌ ValueError
```

- Only valid numeric strings can be cast to int/float
- `"25"` → `int("25")` works ✅
- `"hello"` → `int("hello")` fails ❌

---
# Questions 

- What happens when you cast `bool(0)` or `bool("")` — what counts as falsy in Python?
- Is there a way to safely attempt type casting without crashing (try/except)?
- How does Python decide precedence when multiple types are mixed in one expression?

---
# Summary

Python handles type mixing in two ways. Implicit conversion happens automatically when Python can safely upgrade a type (e.g., int → float in arithmetic). Explicit casting is manual — you call `int()`, `float()`, or `str()` to force a conversion. Casting only works when the value is actually convertible; trying to cast `"hello"` to int will crash. This distinction matters whenever you process user input or mix data sources.

---
# References 

- Video: https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH
- [[Type Conversion.c]] 
