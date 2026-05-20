
Type : #project ; #InterviewPrep    
Interview Date : 2026-05-14    
Tags :  [[job]] ; [[projects]]    
Status : #complete     
~ ***Yash Agrawall*** ~     

---
### Password Strength Analyzer — Full Breakdown

---

#### What it does

Takes a password as CLI input → runs 5 rules against it → gives a score, label, and suggestions → loops until you type `quit`.

---

#### File structure (single file, 3 classes + 1 function)

```
password_checker.py
├── class PasswordRule        → one rule
├── class PasswordAnalyzer    → runs all rules, produces result
├── class PasswordReport      → prints result
└── def main()                → CLI loop
```

---

#### Class 1 — `PasswordRule`

**What it is:** A blueprint for a single validation rule.

python

```python
def __init__(self, name, check_fn, suggestion):
    self.name = name
    self._check_fn = check_fn   # a lambda function
    self.suggestion = suggestion
```

- `check_fn` is a **lambda** — a small anonymous function passed in at creation time
- Example: `lambda p: len(p) >= 8` — takes password `p`, returns `True`/`False`
- `check(password)` just calls that lambda and returns the result

**Why this design:** You define the rule _once_ when creating the object. The object carries its own logic. You never need to write `if` chains like `if len(p) < 8: ...` scattered everywhere.

**5 rules created:**

|Rule|Lambda used|
|---|---|
|Length ≥ 8|`len(p) >= 8`|
|Uppercase|`re.search(r"[A-Z]", p)`|
|Lowercase|`re.search(r"[a-z]", p)`|
|Digit|`re.search(r"\d", p)`|
|Special char|`re.search(r"[!@#$...]", p)`|

`re.search` → scans the whole string, returns a match object (truthy) or `None` (falsy). Wrapped in `bool()` to make it clean.

---

#### Class 2 — `PasswordAnalyzer`

**What it is:** The brain. Holds all 5 rules, runs them, produces the result dict.

python

```python
def __init__(self):
    self.rules = [ PasswordRule(...), PasswordRule(...), ... ]  # 5 rules
```

**`STRENGTH_LABELS`** — a class-level dict (not instance-level):

python

```python
{ 0: "Very Weak", 1: "Weak", 2: "Weak", 3: "Moderate", 4: "Strong", 5: "Very Strong" }
```

Score 1 and 2 both map to "Weak" — intentional, since 1/5 and 2/5 are both bad.

**`analyze(password)`** — the core method:

python

```python
for rule in self.rules:
    if rule.check(password):
        passed.append(rule.name)
    else:
        failed.append(rule.name)
        suggestions.append(rule.suggestion)

score = len(passed)   # count of passed rules = score
label = self.STRENGTH_LABELS[score]
```

Returns a **dict** with: `score`, `label`, `passed`, `failed`, `suggestions`.

Why a dict? Clean to pass around. `PasswordReport` just unpacks it — no tight coupling between classes.

---

#### Class 3 — `PasswordReport`

**What it is:** Only responsible for printing. Zero logic, zero analysis.

python

```python
@staticmethod
def display(password, result):
    ...
```

`@staticmethod` — means you don't need an instance to call it. No `self`. Called as `PasswordReport.display(...)` directly.

Prints in sections:

1. Header — masked password (`*` × length), score, label
2. ✅ Passed rules
3. ❌ Failed rules
4. 💡 Suggestions (or success message if score = 5)

**Why separate from `PasswordAnalyzer`?** Single Responsibility Principle — analyzer shouldn't care how output looks. If you wanted to swap CLI output for JSON output or a web response, you'd only touch `PasswordReport`, not the logic.

---

#### `main()` — CLI loop

python

```python
while True:
    password = input("Enter password: ").strip()
    if password.lower() == "quit": break
    if not password: print("empty warning"); continue
    result = analyzer.analyze(password)
    reporter.display(password, result)
```

- `strip()` → removes accidental spaces
- Empty string check → caught before it reaches the analyzer
- Loop keeps running — user can test multiple passwords in one session

---

#### Data flow (end to end)

```
User types password
       ↓
main() → analyzer.analyze(password)
       ↓
PasswordAnalyzer loops through 5 PasswordRule objects
Each rule.check(password) returns True/False
       ↓
Returns dict { score, label, passed, failed, suggestions }
       ↓
PasswordReport.display() prints it formatted
       ↓
Loop repeats
```

---

#### Why OOP here specifically

- **Extensibility** — add a 6th rule? One new `PasswordRule(...)` line. Nothing else changes.
- **Separation of concerns** — rule definition, analysis logic, display logic are 3 different responsibilities in 3 different classes
- **No hardcoded if-else chains** — rules are data, not branching logic
- **Testable** — you can unit test `PasswordRule.check()` and `PasswordAnalyzer.analyze()` independently

---

#### Edge cases handled

|Scenario|Handling|
|---|---|
|Empty input|Caught in `main()`, prints warning, loops|
|Password displayed|Masked with `*` × length|
|Score 1 and 2 both "Weak"|Intentional label mapping|
|All rules pass|Suggestions list is empty → success message shown|
|`quit` input|Case-insensitive `.lower()` check|