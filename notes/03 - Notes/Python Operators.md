Type : #Note       
Date : 04-06-2025         
Tags : [[Python]] ; [[datatypes]]     
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# Operators in Python

---
## Key Ideas 

- An operator is a symbol that performs an operation on operands
- 4 main categories: Arithmetic, Relational (Comparison), Assignment, Logical
- Relational operators always return a boolean (`True` or `False`)
- Logical operators (`and`, `or`, `not`) operate on boolean values
- `//` = floor division, `%` = modulo (remainder), `**` = power

---
## Note

### Terminology
- **Operator**: the symbol (`+`, `-`, `>`, etc.)
- **Operand**: the values the operator acts on (`a` and `b` in `a + b`)

---

### 1. Arithmetic Operators

```python
a = 5
b = 2

print(a + b)   # 7   — addition
print(a - b)   # 3   — subtraction
print(a * b)   # 10  — multiplication
print(a / b)   # 2.5 — division (always returns float)
print(a % b)   # 1   — modulo (remainder)
print(a ** b)  # 25  — power (a^b)
print(a // b)  # 2   — floor division (integer part)
```

> **Note:** Division `/` always returns a float in Python, even if result is whole (e.g., `4/2 = 2.0`)

---

### 2. Relational (Comparison) Operators

Always return `True` or `False`.

```python
a = 50
b = 20

print(a == b)   # False — equal to
print(a != b)   # True  — not equal to
print(a > b)    # True  — greater than
print(a < b)    # False — less than
print(a >= b)   # True  — greater than or equal to
print(a <= b)   # False — less than or equal to
```

> In math, equality is `=`. In Python, equality check is `==`. Single `=` is only for assignment.

---

### 3. Assignment Operators

```python
num = 10

num += 10   # same as: num = num + 10  → 20
num -= 10   # same as: num = num - 10  → 0
num *= 5    # same as: num = num * 5   → 50
num /= 5    # same as: num = num / 5   → 2.0
num %= 5    # same as: num = num % 5   → remainder
num **= 5   # same as: num = num ** 5  → power
```

Shorthand operators — update the same variable in-place.

---

### 4. Logical Operators

Operate on boolean values. Three operators: `not`, `and`, `or`.

#### `not` — flips the value
```python
print(not True)    # False
print(not False)   # True
```

#### `and` — True only if BOTH are True
```python
val1 = True
val2 = False
print(val1 and val2)   # False
print(val1 and True)   # True
```

#### `or` — True if AT LEAST ONE is True
```python
print(val1 or val2)    # True
print(False or False)  # False
```

#### Combined with expressions
```python
a = 50
b = 30
print((a == b) or (a > b))   # False OR True → True
```

---

### Operator Precedence (informal)
- `**` > `*`, `/`, `//`, `%` > `+`, `-`
- Use parentheses to control order explicitly

---
# Questions 

- What is the exact precedence order for all Python operators?
- How does `and`/`or` behave with non-boolean values (short-circuit evaluation)?
- When would you use `//` over `/` in real code?

---
# Summary

Operators in Python perform operations on values. Arithmetic operators handle math (including `%` for remainder and `**` for power). Relational operators compare values and return booleans. Assignment operators update a variable in-place using shorthand. Logical operators (`not`, `and`, `or`) combine or flip boolean expressions and are fundamental to conditional logic.

---
# References 

- Video: https://youtu.be/t2_Q2BRzeEE?si=owFdrXv11UvrsbGH
- [[Operators]] 
- [[Operators.c]]
