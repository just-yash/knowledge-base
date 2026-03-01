
Date :  2026-02-23  
Tags :   [[Maths]] ; [[DLD]]
~ ***Yash Agrawall*** ~  

---
# Normal Forms, SOP, POS and Canonical Forms

## SOP / DNF (General Form)
- SOP (Sum of Products) in Boolean Algebra ≡ DNF (Disjunctive Normal Form) in Propositional Logic  
- An expression is in SOP / DNF if it is written as OR (+ / ∨) of AND terms  
	- Each AND term is a product of literals  
- Variables may be missing in individual terms  
- SOP / DNF is not necessarily canonical  
- Example:
	- SOP : AB + A'C + B  
	- Truth Table:

| A   | B   | C   | AB  | A'C | B   | AB + A'C + B |
| --- | --- | --- | --- | --- | --- | ------------ |
| 0   | 0   | 0   | 0   | 1   | 0   | 1            |
| 0   | 0   | 1   | 0   | 1   | 0   | 1            |
| 0   | 1   | 0   | 0   | 1   | 1   | 1            |
| 0   | 1   | 1   | 0   | 1   | 1   | 1            |
| 1   | 0   | 0   | 0   | 0   | 0   | 0            |
| 1   | 0   | 1   | 0   | 0   | 0   | 0            |
| 1   | 1   | 0   | 1   | 0   | 1   | 1            |
| 1   | 1   | 1   | 1   | 0   | 1   | 1            |

> SOP is in Boolean Algebra.   
> DNF is in Logic

---
## POS / CNF (General Form)
- POS (Product of Sums) in Boolean Algebra ≡ CNF (Conjunctive Normal Form) in Propositional Logic  
- An expression is in POS / CNF if it is written as AND (· / ∧) of OR terms  
	- Each OR term is a sum of literals  
- Variables may be missing in individual terms  
- Example:
	- POS : (A + B)(A' + C)  
	- Truth Table:

| A   | B   | C   | A+B | A'+C | (A+B)(A'+C) |
| --- | --- | --- | --- | ---- | ----------- |
| 0   | 0   | 0   | 0   | 1    | 0           |
| 0   | 0   | 1   | 0   | 1    | 0           |
| 0   | 1   | 0   | 1   | 1    | 1           |
| 0   | 1   | 1   | 1   | 1    | 1           |
| 1   | 0   | 0   | 1   | 0    | 0           |
| 1   | 0   | 1   | 1   | 1    | 1           |
| 1   | 1   | 0   | 1   | 0    | 0           |
| 1   | 1   | 1   | 1   | 1    | 1           |

> POS is in Boolean Algebra   
> CNF is in Logic

---
## Minterms or Boolean Terms (m)
- A minterm is a product (AND term) that contains all variables  
	- Each variable appears exactly once  
	- Either complemented or uncomplemented  
- Each minterm corresponds to exactly one truth-table row where the function value is 1  
- For n variables, there are 2ⁿ possible minterms  
- For n variables, tautology contains 2ⁿ minterms (sum of all minterms is 1, each individual minterm is 1)
- For n variables, contradiction contains 0 minterms (sum of all minterms is 1, each individual minterm is 1)
- For n variables, contingency contains 1 to (2ⁿ -1) minterms (if all is 1 then it will be tautology, if all is false it will be contradiction)
- Example (variables x, y):

| x | y | Minterm |
|---|---|---------|
| 0 | 0 | x'y' |
| 0 | 1 | x'y |
| 1 | 0 | xy' |
| 1 | 1 | xy |

> Minterms is in Boolean Algebra

---
## PDNF / Canonical SOP
- PDNF (Principal Disjunctive Normal Form) ≡ Canonical SOP (Standard SOP)
- A Boolean function is in PDNF if:
	- It is written as a sum of minterms  
	- Each minterm corresponds to a truth-table row where output = 1  
	- No variable is omitted in any term  
- PDNF is unique for a given truth table  
- For n variables, there are 2<sup>2<sup>n</sup></sup> possible CSOPs i.e. the total no. of possible boolean functions.
- Example:
	- If function is 1 for x'y and xy'  
	- PDNF = x'y + xy'  
	- Truth Table:

| x | y | Output |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> Canonical SOP is in Boolean Algebra  
> PDNF is in Logic

---
## Maxterms (M)
- A maxterm is a sum (OR term) that contains all variables  
	- Each variable appears exactly once  
	- Either complemented or uncomplemented  
- Each maxterm corresponds to exactly one truth-table row where the function value is 0  
- For n variables, there are 2ⁿ possible maxterms  
- For n variables, tautology contains 0 maxterms (sum of all maxterms is 0, each individual maxterm is 0)
- For n variables, contradiction contains 2ⁿ maxterms (sum of all maxterms is 0, each individual maxterm is 0)
- For n variables, contingency contains 1 to (2ⁿ -1) maxterms (if all is 1 then it will be tautology, if all is false it will be contradiction)
- For an individual term:
	- The complement of a minterm gives the corresponding maxterm.
	- The complement of a maxterm gives the corresponding minterm.
- For the entire Boolean function:
	- The set of minterms is NOT the complement of the set of maxterms.
	- Hence, minterms and maxterms are NOT complements of each other as a whole.
- Example (variables x, y):

| x | y | Maxterm |
|---|---|----------|
| 0 | 0 | (x + y) |
| 0 | 1 | (x + y') |
| 1 | 0 | (x' + y) |
| 1 | 1 | (x' + y') |

> Maxterms is in Boolean Algebra

---
## PCNF / Canonical POS
- PCNF (Principal Conjunctive Normal Form) ≡ Canonical POS  (Standard POS)
- A Boolean function is in PCNF if:
	- It is written as a product of maxterms  
	- Each maxterm corresponds to a truth-table row where output = 0  
	- No variable is omitted in any term  
- PCNF is unique for a given truth table  
- For n variables, there are 2<sup>2<sup>n</sup></sup> possible CPOSs i.e. the total no. of possible boolean functions.
- Example:
	- If function is 0 for (x + y) and (x' + y')  
	- PCNF = (x + y)(x' + y')  
	- Truth Table:

| x | y | Output |
|---|---|--------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

> Canonical POS is in Boolean Algebra  
> PCNF is in Logic

---
## Unified Problem-Solving Strategy
- Logic, Boolean Algebra, and Set Theory follow the same algebraic laws  
- Any expression can be converted to Boolean Algebra  
- Simplification is done using Boolean identities or K-Map  
- The simplified result is then converted back to the original domain  

---
## Key Equivalences
- DNF ≡ SOP  
- CNF ≡ POS  
- PDNF ≡ Canonical SOP (built from minterms)  
- PCNF ≡ Canonical POS (built from maxterms)  

---
# Conversions Between SOP, POS, CSOP and CPOS

## SOP → CSOP (Canonical SOP / PDNF)
- SOP may have missing variables
- CSOP requires each term to be a minterm (all variables present)
- For each missing variable in a product term:
	- Multiply by (X + X') = 1
	- Then expand

- Rule:
	- A → A(X + X')
	- AB → AB(C + C')

- Example:
	- SOP : AB + A'C
	- Variables : A, B, C

	- AB = AB(C + C') = ABC + ABC'
	- A'C = A'C(B + B') = A'BC + A'B'C

	- CSOP = ABC + ABC' + A'BC + A'B'C

---
## POS → CPOS (Canonical POS / PCNF)
- POS may have missing variables
- CPOS requires each term to be a maxterm (all variables present)
- For each missing variable in a sum term:
	- Add the variable in both forms using distributive expansion

- Rule:
	- (A + B) → (A + B + C)(A + B + C')

- Example:
	- POS : (A + B)(A' + C)
	- Variables : A, B, C

	- (A + B) = (A + B + C)(A + B + C')
	- (A' + C) = (A' + B + C)(A' + B' + C)

	- CPOS = (A + B + C)(A + B + C')(A' + B + C)(A' + B' + C)

---
## CSOP → CPOS
- CSOP gives all minterms where f = 1
- Remaining rows correspond to f = 0
- Steps:
	- Write truth table from CSOP
	- Identify rows where output = 0
	- Write maxterms for those rows
	- Multiply them to get CPOS

- Shortcut method:
	- If CSOP = Σm(k₁, k₂, ...)  (sum of all minterms)
	- Then CPOS = ΠM(remaining indices)  (product of all maxterms)

- Example:
	- CSOP = x'y + xy'
	- Truth table rows where f = 0:
		- (0,0) and (1,1)
	- Maxterms:
		- (x + y)(x' + y')
	- CPOS = (x + y)(x' + y')

---
## CPOS → CSOP
- CPOS gives all maxterms where f = 0
- Remaining rows correspond to f = 1
- Steps:
	- Write truth table from CPOS
	- Identify rows where output = 1
	- Write minterms for those rows
	- Add them to get CSOP

- Shortcut method:
	- If CPOS = ΠM(k₁, k₂, ...)
	- Then CSOP = Σm(remaining indices)

- Example:
	- CPOS = (x + y)
	- Zero occurs at:
		- x = 1, y = 0
	- Ones occur at:
		- (0,0), (0,1), (1,1)
	- CSOP = x'y' + x'y + xy

---
## SOP ↔ POS (General Conversion)
- Convert SOP → CSOP → CPOS → POS (if needed)
- Convert POS → CPOS → CSOP → SOP (if needed)
- Direct SOP ↔ POS conversion is not recommended
- Canonical forms act as safe intermediate forms

---
## Truth Table Based Conversion (Universal Method)
- Any form → Truth Table → Desired Form
- From truth table:
	- f = 1 → minterms → CSOP
	- f = 0 → maxterms → CPOS

---
## Summary Rules
- SOP → CSOP : expand missing variables using (X + X')
- POS → CPOS : expand missing variables using distributive multiplication
- CSOP → CPOS : take complement rows (0s)
- CPOS → CSOP : take complement rows (1s)
- Truth table method always works

---
# Properties 
- PCNF & PDNF of every function is unique but CNF & DNF may or may not be unique
- f1 ≡ f2 iff PDNF(f1) ≡ PDNF(f2) or PCNF(f1) ≡ PCNF(f2)
- Total no. of minterms + Total no. of maxterms = 2<sup>n</sup>















---
# Questions

###### Q1) Consider the following truth table and write maxterm and minterms for the same. 

| x   | y   | f(x,y) |
| --- | --- | ------ |
| 0   | 0   | 1      |
| 0   | 1   | 1      |
| 1   | 0   | 0      |
| 1   | 1   | 0      |

A1) 
Minterms (consider rows where f = 1)  
- x = 0, y = 0 → x'y'  
- x = 0, y = 1 → x'y  
Minterm expression:  
- Minterm = x'y' + x'y 

Maxterms (consider rows where f = 0)
- x = 1, y = 0  → (x' + y)
- x = 1, y = 1 → (x' + y')
Maxterm expression:
- Maxterm = (x' + y) . (x' + y') 

----
###### Q2) Which of the following propositional logic formulas is True when exactly two of p, q & r are True
###### a) ((p ↔ q) ∧ r ) ∨ (p ∧ q ∧ ~r)
###### b) (<sub></sub> ~(p ↔ q) ∧ r) ∨ (p ∧ q ∧ ~r)
###### c) ((p → q) ∧ r) ∨ (p ∧ q ∧ ~r)
###### d) (~(p ↔ q) ∧ r) ∧ (p ∧ q ∧ ~r)

A2) b  
Exactly two of p, q, r are true  ≡  pqr' + pq'r + p'qr  
a) (p'q' + pq)r + pqr' ≡ p'q'r + pqr + pqr'  
b) pq'r + p'qr + pqr'  
c) (p'+q)r + (pqr') ≡ p'r + qr + pqr' ≡ p'qr + p'q'r + pqr + p'qr + pqr'  
d) (p'q + pq')rpqr' ≡ 0  
 
Hence b is the correct option  

---





---
# Summary 

## SOP / POS / Normal Forms
- SOP (Sum of Products) ≡ DNF (Disjunctive Normal Form)
- POS (Product of Sums) ≡ CNF (Conjunctive Normal Form)
- SOP/DNF and POS/CNF are **general forms**
	- Variables may be missing
	- Not necessarily unique

---
## Minterms and Maxterms
- For n variables:
	- Total rows = 2ⁿ
	- Total minterms = 2ⁿ
	- Total maxterms = 2ⁿ
- Minterms:
	- AND of all variables
	- Correspond to rows where f = 1
- Maxterms:
	- OR of all variables
	- Correspond to rows where f = 0
- Term-wise:
	- (minterm)' = corresponding maxterm
	- (maxterm)' = corresponding minterm
- Function-wise:
	- Set of minterms is NOT the complement of set of maxterms

---
## Canonical Forms
- PDNF ≡ Canonical SOP (Standard SOP)
- PCNF ≡ Canonical POS (Standard POS)
- Properties:
	- Every Boolean function has a **unique PDNF and PCNF**
	- CNF and DNF need not be unique
- For n variables:
	- Total possible Boolean functions = 2^(2ⁿ)

---
## Tautology / Contradiction / Contingency
- Tautology:
	- Contains all 2ⁿ minterms
	- Contains 0 maxterms
- Contradiction:
	- Contains 0 minterms
	- Contains all 2ⁿ maxterms
- Contingency:
	- Contains 1 to (2ⁿ − 1) minterms
	- Contains 1 to (2ⁿ − 1) maxterms

---
## Index Notation
- mᵢ → ith minterm (row where f = 1)
- Mᵢ → ith maxterm (row where f = 0)
- Σm(indices) → Canonical SOP
- ΠM(indices) → Canonical POS
- Σm(indices) and ΠM(remaining indices) represent the same function

---
## Conversions
- SOP → CSOP:
	- Add missing variables using (X + X')
- POS → CPOS:
	- Add missing variables using distributive expansion
- CSOP → CPOS:
	- Take rows where f = 0
- CPOS → CSOP:
	- Take rows where f = 1
- Truth table method always works

---
## Fast Problem-Solving Rules
- Convert Logic / Set expressions to Boolean Algebra
- Solve using Boolean identities or K-map
- Convert back if required
- Exactly two of (p, q, r) true:
	- pqr' + pq'r + p'qr

---
## Key Identities
- DNF ≡ SOP
- CNF ≡ POS
- PDNF ≡ Canonical SOP
- PCNF ≡ Canonical POS
- Total minterms + total maxterms = 2ⁿ
- f₁ ≡ f₂ ⇔ PDNF(f₁) ≡ PDNF(f₂) ⇔ PCNF(f₁) ≡ PCNF(f₂)




---
# References 

1. [YouTube Lecture 1](https://youtu.be/ZmooZD9DdA4?si=JWkhd5Ej3X1eNPaE)
2. [YouTube Lecture 2](https://youtu.be/zfUlmbAYGwU?si=rqU-Kwa7b6_0FizK)