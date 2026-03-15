
Date :  2026-02-26  
Tags : [[Maths]] 
~ ***Yash Agrawall*** ~  

---
# Predicate Logic (First Order Logic)

## Why Predicate Logic?
- Propositional Logic treats statements as atomic (True / False only)
- Predicate Logic adds **structure inside statements**
	- Talks about objects
	- Talks about properties of objects
	- Talks about relations between objects
- Predicate Logic = Propositional Logic + Quantifiers + Variables

---
## Basic Components

### Domain (Universe of Discourse)
- The set of all objects under consideration
- Must be **clearly defined**
- Examples:
	- Integers
	- Real numbers
	- Students in a class
	- Nodes in a graph

---
### Variables
- Symbols that represent elements of the domain
- Usually: x, y, z, a, b
- Variables by themselves have **no truth value**

---
### Predicates
- A predicate is a statement with variables
- Becomes a proposition when variables are assigned values
- Examples:
	- P(x): “x is even”
	- Q(x, y): “x > y”
	- Prime(x): “x is prime”

---
### Atomic Formula
- Predicate applied to variables or constants
- Examples:
	- P(x)
	- Q(x, y)
	- Prime(7)

---
## Quantifiers

### Universal Quantifier (∀)
- ∀x P(x)
- Meaning:
	- “For all x”
	- “For every x”
- True **only if P(x) is true for every element** in the domain
- Logical meaning:
	- ∀x P(x) ≡ P(a₁) ∧ P(a₂) ∧ ... ∧ P(aₙ)

---
### Existential Quantifier (∃)
- ∃x P(x)
- Meaning:
	- “There exists an x”
	- “For some x”
- True if **at least one element** satisfies P(x)
- Logical meaning:
	- ∃x P(x) ≡ P(a₁) ∨ P(a₂) ∨ ... ∨ P(aₙ)

---
## Quantifier Scope
- They have the highest precedence.
- ∃ x P(x) ∧ Q(x) ≡ {∃ x P(x)} ∧ Q (x) 
	- here the x in Q(x) ≠ the x in P(x)
- The part of the formula where the quantifier applies
- Parentheses matter
- Examples:
	- ∀x (P(x) → Q(x))
	- (∀x P(x)) → Q(x)   ❌ different meaning

---
## Free and Bound Variables
- Bound Variable:
	- Variable inside the scope of a quantifier
- Free Variable:
	- Variable not bound by any quantifier
- A formula with **no free variables** is a **closed formula / [[well formed formula]]**
- Only closed formulas can be True or False

---
## Well Formed Formula ([[well formed formula|wff]]) in Predicate Logic
- Atomic formulas are wffs
- If φ is a wff, then ¬φ is a wff
- If φ and ψ are wffs, then:
	- (φ ∧ ψ), (φ ∨ ψ), (φ → ψ), (φ ↔ ψ) are wffs
- If φ is a wff and x is a variable:
	- ∀x φ and ∃x φ are wffs

---
## Negation of Quantifiers (Very Important)

- ¬∀x P(x) ≡ ∃x ¬P(x)
- ¬∃x P(x) ≡ ∀x ¬P(x)

> Negation **switches the quantifier**

---
## Order of Quantifiers / Nested Quantifiers
- Order matters when predicates depend on multiple variables

- ∀x ∃y P(x, y)  
	- For every x, there exists a y depending on x

- ∃y ∀x P(x, y)  
	- There exists one y that works for all x

> These two are **not equivalent**

### Combination Cases
- eg : P(x, y) : x ≥ y ; x = {1, 2, 3} ; y = {1, 2, 3}
#### 1. ∀ x ∀ y (P(x, y))
{(1,1) ∧ (1,2) ∧ (1,3)}  
∧  
{(2,1) ∧ (2,2) ∧ (2,3)}  
∧  
{(3,1) ∧ (3,2) ∧ (3,3)}  

False

#### 2. ∃ x ∃ y (P(x, y))
{(1,1) ∨ (1,2) ∨ (1,3)}  
∨  
{(2,1) ∨ (2,2) ∨ (2,3)}  
∨  
{(3,1) ∨ (3,2) ∨ (3,3)}  

True  

#### 3. ∀ x ∃ y (P(x, y))
{(1,1) ∨ (1,2) ∨ (1,3)}  
∧  
{(2,1) ∨ (2,2) ∨ (2,3)}  
∧  
{(3,1) ∨ (3,2) ∨ (3,3)}  

True  

#### 4. ∃ y ∀ x (P(x, y))
{(1,1) ∧ (2,1) ∧ (3,1)}  
∨  
{(1,2) ∧ (2,2) ∧ (3,2)}  
∨  
{(1,3) ∧ (2,3) ∧ (3,3)}  

True

#### 5. ∃ x ∀ y (P(x , y))
{(1,1) ∧ (1,2) ∧ (1,3)}  
∨  
{(2,1) ∧ (2,2) ∧ (2,3)}  
∨  
{(3,1) ∧ (3,2) ∧ (3,3)}  

True  

#### 6. ∀ y ∃ x (P (x, y))
{(1,1) ∨ (2,1) ∨ (3,1)}    
∧  
{(1,2) ∨ (2,2) ∨ (3,2)}  
∧  
{(1,3) ∨ (2,3) ∨ (3,3)}  

True  

---
## Predicate Logic vs Propositional Logic

| Propositional Logic | Predicate Logic |
|--------------------|----------------|
| Talks about whole statements | Talks about objects |
| No variables | Uses variables |
| No quantifiers | Uses ∀ and ∃ |
| Limited expressiveness | Much more expressive |

---
## Translation Examples

- “All humans are mortal”
	- ∀x (Human(x) → Mortal(x))

- “Some student passed the exam”
	- ∃x (Student(x) ∧ Passed(x))

- “Every prime number greater than 2 is odd”
	- $∀x [(Prime(x) ∧ x > 2) → Odd(x)]$

- “There exists a unique solution”
	- $∃x [Solution(x) ∧ ∀y (Solution(y) → y = x)]$

---
## Implication inside Predicate Logic
- Same rules as propositional logic
- P(x) → Q(x) is false only when:
	- P(x) is True and Q(x) is False

---
## Common Mistakes (Exam Traps)
- Forgetting domain specification
- Mixing ∀ and ∃ incorrectly
- Negating predicates but not quantifiers
- Assuming ∀x∃y = ∃y∀x
- Leaving free variables

---
## Validity and Satisfiability
- Predicate logic formulas can be:
	- Valid (True for all domains and interpretations)
	- Satisfiable (True for at least one interpretation)
	- Unsatisfiable (False for all interpretations)

---
## Relation to Boolean Algebra
- After fixing domain and variable values:
	- Predicate logic reduces to propositional logic
- Useful exam trick:
	- Convert quantified statements into propositional form when domain is finite

---
## GATE / LEEE Exam Tips
- Pay extra attention to:
	- “only if”
	- “necessary”
	- “sufficient”
- Always rewrite English into logic symbols
- Negation of quantified statements is frequently tested
- Validity questions often use counterexamples

---
# Summary
- Predicate Logic extends Propositional Logic
- Quantifiers give power and complexity
- Order and scope of quantifiers are critical
- Negation rules must be memorized
- Parentheses save marks

---
# References 

1. [YouTube Lecture](https://youtu.be/BPI-o44e4s8?si=iMJEulVDKtte7L3D)