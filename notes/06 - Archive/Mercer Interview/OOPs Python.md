
Type : #Note    
Interview Date : 2026-05-14    
Tags :  [[job]]  
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# OOPs Python 

---
#### Why OOP exists (one line)

> Group **data** and **behaviour** that belong together into one unit called a **class**, instead of having loose variables and functions everywhere.

---
### 1. Class vs Object

- **Class** — blueprint / template
- **Object** — instance created from that blueprint

python

```python
class Dog:
    def __init__(self, name):
        self.name = name

d1 = Dog("Bruno")   # object 1
d2 = Dog("Max")     # object 2
```

- `Dog` is the class
- `d1`, `d2` are objects — both built from the same blueprint, but independent

**In your code:**

- `PasswordRule` is the class
- Each of the 5 rules (`length_rule`, `upper_rule`, etc.) is a separate object

---

### 2. `__init__` — Constructor

- Called **automatically** when you create an object
- Used to set up initial state (assign attributes)
- `self` = the object being created right now

python

```python
class PasswordRule:
    def __init__(self, name, check_fn, suggestion):
        self.name = name          # instance attribute
        self._check_fn = check_fn
        self.suggestion = suggestion
```

When you write:

python

```python
PasswordRule("Length", lambda p: len(p) >= 8, "Use 8+ chars")
```

Python internally does:

python

```python
obj = PasswordRule.__new__(PasswordRule)  # allocate memory
PasswordRule.__init__(obj, "Length", ...)  # initialize
```

---

### 3. `self` — what it actually is

- `self` is just the **first parameter** of every instance method
- Python passes it automatically — you never pass it manually
- It refers to **the current object**

python

```python
class Counter:
    def __init__(self):
        self.count = 0       # this object's count

    def increment(self):
        self.count += 1      # modifying this object's data

c = Counter()
c.increment()   # Python calls Counter.increment(c) internally
```

**Common interview trap:** "Why do we write `self`?"

> Because Python doesn't implicitly know which object's data to access. `self.name` means _this object's_ name, not some global variable.

---

### 4. Instance vs Class Attributes

python

```python
class PasswordAnalyzer:
    # CLASS attribute — shared by ALL instances
    STRENGTH_LABELS = {
        0: "Very Weak",
        1: "Weak",
        ...
    }

    def __init__(self):
        # INSTANCE attribute — unique to each object
        self.rules = [...]
```

| |Instance Attribute|Class Attribute|
|---|---|---|
|Defined in|`__init__` via `self.x`|directly in class body|
|Scope|per object|shared across all objects|
|Access|`obj.x`|`ClassName.x` or `obj.x`|

**In your code:** `STRENGTH_LABELS` is a class attribute — every `PasswordAnalyzer` object uses the same dict, no point duplicating it.

---

### 5. Instance Methods, Class Methods, Static Methods

#### Instance method — most common

python

```python
def analyze(self, password):   # has self
    ...
```

- Operates on the object's data
- Can read/modify `self.anything`

#### Static method

python

```python
@staticmethod
def display(password, result):  # no self, no cls
    ...
```

- Doesn't need object data
- Just a function logically grouped inside the class
- Called as `PasswordReport.display(...)` — no object needed

#### Class method

python

```python
@classmethod
def create_default(cls):   # gets the class, not the instance
    return cls()
```

- Used when you need to access/modify **class-level** data
- Common use: alternative constructors

**In your code:** `display` is `@staticmethod` because it doesn't touch any object's data — it just formats and prints.

---

### 6. Encapsulation

> Bundling data + methods together, and **hiding internal details**.

python

```python
self._check_fn = check_fn   # underscore = "private by convention"
```

- Single underscore `_x` → "don't touch this from outside, it's internal"
- Double underscore `__x` → name mangling, harder to access from outside
- Python doesn't enforce this — it's a **convention**

python

```python
# Bad (accessing internal detail)
rule._check_fn("hello")

# Good (using the public interface)
rule.check("hello")
```

**Why it matters:** If you change how `_check_fn` works internally, code that only uses `check()` still works — nothing breaks.

---

### 7. Inheritance

> One class **inherits** attributes and methods from another.

python

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):         # Dog inherits from Animal
    def speak(self):       # overrides the parent method
        return "Woof"

class Cat(Animal):
    def speak(self):
        return "Meow"

d = Dog("Bruno")
print(d.name)    # inherited from Animal
print(d.speak()) # Dog's own version
```

**`super()`** — calls the parent class method:

python

```python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # Animal's __init__
        self.breed = breed
```

**Your code doesn't use inheritance** — honest answer in interview: "The problem didn't need it. Each class had a distinct, unrelated responsibility."

---

### 8. Polymorphism

> Same interface, different behaviour depending on the object.

python

```python
animals = [Dog("Bruno"), Cat("Kitty")]

for animal in animals:
    print(animal.speak())   # Dog → "Woof", Cat → "Meow"
```

Same method name `speak()`, different result — **that's polymorphism**.

**In your code:**

python

```python
for rule in self.rules:
    rule.check(password)
```

Every `rule` object is a `PasswordRule`, but each has a different `_check_fn` inside. Same call `rule.check()`, different logic runs — polymorphism through lambdas.

---

### 9. Abstraction

> Hiding **how** something works, exposing only **what** it does.

python

```python
result = analyzer.analyze("MyP@ssw0rd")
```

You don't care how `analyze()` loops rules internally. You just call it and get the result. The complexity is hidden — that's abstraction.

Formal abstraction uses `ABC` (Abstract Base Class):

python

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def area(self):
        return 3.14 * r * r
```

`Shape` can't be instantiated — it just defines the contract. Subclasses must implement `area()`.

---

### 10. Dunder (Magic) Methods

Special methods Python calls automatically — named `__like_this__`.

|Method|When called|
|---|---|
|`__init__`|object creation|
|`__str__`|`print(obj)`|
|`__repr__`|`repr(obj)`, debugging|
|`__len__`|`len(obj)`|
|`__eq__`|`obj1 == obj2`|
|`__add__`|`obj1 + obj2`|

python

```python
class PasswordRule:
    def __str__(self):
        return f"Rule: {self.name}"

r = PasswordRule("Length", lambda p: len(p) >= 8, "Use 8+")
print(r)   # → Rule: Length
```

---

### 11. `@property` — controlled attribute access

python

```python
class Person:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):           # getter
        return self._age

    @age.setter
    def age(self, value):    # setter with validation
        if value < 0:
            raise ValueError("Age can't be negative")
        self._age = value

p = Person(20)
print(p.age)    # 20 — looks like attribute access, runs a method
p.age = -1      # raises ValueError
```

---

### 12. Key Principles (SOLID — know S and O)

**S — Single Responsibility**

> A class should do one thing only.

- `PasswordRule` → defines one rule
- `PasswordAnalyzer` → runs analysis
- `PasswordReport` → handles display

**O — Open/Closed**

> Open for extension, closed for modification.

Your analyzer is open for extension — add a new `PasswordRule(...)` to the list, analysis works automatically. You don't modify `analyze()`.

---

### Interview Q&A — Ready Answers

**Q: What is a class?**

> A blueprint that defines attributes (data) and methods (behaviour). Objects are instances of a class.

**Q: What is `self`?**

> A reference to the current instance. Python passes it automatically when you call an instance method.

**Q: Difference between class and instance attribute?**

> Class attribute is shared across all objects. Instance attribute is unique to each object, set via `self` in `__init__`.

**Q: What is encapsulation?**

> Bundling data and methods together, and restricting direct access to internals using `_` or `__` conventions.

**Q: What is polymorphism?**

> Same method name behaving differently based on the object. Example: `rule.check()` runs different logic for each of the 5 rules.

**Q: What's a static method?**

> A method that doesn't access `self` or `cls`. Logically belongs to the class but doesn't need object data. Defined with `@staticmethod`.

**Q: Why did you use OOP here?**

> Each rule is an object — name, logic, and suggestion bundled together. Adding a new rule means one new object, nothing else changes. Analysis and display are separate classes because they have different responsibilities. OOP made the code extensible and clean.

**Q: What design principle does your code follow?**

> Single Responsibility — each class does exactly one thing. Open/Closed — new rules extend the system without modifying existing logic.

---

### Cheat sheet — what to remember cold

```
Class        → blueprint
Object       → instance of class
__init__     → constructor, runs on creation
self         → current object reference
Encapsulation → hide internals, expose interface
Inheritance   → child gets parent's stuff
Polymorphism  → same call, different behaviour
Abstraction   → hide complexity, show interface
@staticmethod → no self, no cls
@classmethod  → gets cls, not self
_x            → private by convention
__x           → name mangling (truly private)
```