
Type : #Note    
Date : 2026-05-13    
Tags : [[DBMS]]       
Status : #incomplete     
~ ***Yash Agrawall*** ~     

---
# Functional Dependency (FD)

- A Functional Dependency is a constraint between two sets of attributes in a relation.
- Denoted by:

```text
X → Y
```

Meaning:
- Attribute set `X` functionally determines attribute set `Y`

---
# Definition

For a relation `R`:
If two tuples `t1` and `t2` agree on attributes `X`, then they must also agree on attributes `Y`.

```text
If t1[X] = t2[X]

Then t1[Y] = t2[Y]
```

---
###### Example :

```text
SSN → Ename
```

Meaning:
- Same SSN must always correspond to same employee name

If:
```text
t1[SSN] = t2[SSN]
```

Then:
```text
t1[Ename] = t2[Ename]
```

---
## Trivial FD

A dependency is trivial if:

```text
Y ⊆ X
```

###### Example:

```text
{SSN, Name} → SSN
```

---
## Non-Trivial FD

A dependency is non-trivial if:

```text
Y ⊄ X
```

###### Example:

```text
SSN → Ename
```

---
# Closure of Functional Dependencies (F⁺)

- `F⁺` contains all functional dependencies that can be derived from a given set `F`
    
###### Example : 

If:
```text
SSN → {Ename, Salary, Address, Dno}
```

Then:
```text
F⁺ = {SSN, Ename, Salary, Address, Dno}
```

---
# Armstrong’s Inference Rules

Used to derive new functional dependencies.

---
## 1. Reflexive Rule

If:
```text
Y ⊆ X
```

⊨ (Logically Implies):
```text
X → Y
```

###### Example:

```text
{SSN, Name} → SSN
```

---
## 2. Augmentation Rule 

If:
```text
X → Y
```

⊨ (Logically Implies):
```text
XZ → YZ
```

###### Example:

```text
A → B

⊨ AC → BC
```

---
## 3. Transitive Rule

If:
```text
X → Y

Y → Z
```

⊨ (Logically Implies):
```text
X → Z
```

###### Example:

```text
A → B

B → C

⊨ A → C
```

---
## 4. Decomposition Rule

If:
```text
X → YZ
```

⊨ (Logically Implies):
```text
X → Y

X → Z
```

---
## 5. Union Rule

If:

```text
X → Y

X → Z
```

Then:

```text
X → YZ
```

---
## 6. Pseudotransitive Rule

If:
```text
X → Y

WY → Z
```

⊨ (Logically Implies) :
```text
WX → Z
```

---
# Summary 

|Rule|Pattern|
|---|---|
|Reflexive|If Y ⊆ X → X → Y|
|Augmentation|If X → Y → XZ → YZ|
|Transitive|If X → Y and Y → Z → X → Z|
|Decomposition|If X → YZ → X → Y and X → Z|
|Union|If X → Y and X → Z → X → YZ|
|Pseudotransitive|If X → Y and WY → Z → WX → Z|

---
# Attribute Closure (X⁺)

- Closure of attribute set `X`
- Contains all attributes functionally determined by `X`

###### Example
Given:
```text
SSN → Ename

Pno → Pname, Ploc

{SSN, Pno} → Hours
```

---
## Find Closures

### SSN⁺

```text
SSN⁺ = {SSN, Ename}
```

---
### Pno⁺

```text
Pno⁺ = {Pno, Pname, Ploc}
```

---
### {SSN, Pno}⁺

```text
{SSN, Pno}⁺ =
{SSN, Pno, Ename, Pname, Ploc, Hours}
```

---

# Example 2

Given:

```text
Sno → Sname

Cno → Cname
```

Find:

```text
{Sno, Cno}⁺
```

Result:

```text
{Sno, Cno}⁺ =
{Sno, Sname, Cno, Cname}
```

---

# Equivalence of FD Sets

Two sets of FDs `F` and `E` are equivalent if:

```text
F⁺ = E⁺
```

Meaning:

- Both imply same dependencies
    

---

# Minimal Cover

A minimal cover is a set of functional dependencies satisfying:

1. Every dependency has single attribute on RHS
    
2. No dependency can be removed
    
3. No attribute can be removed from LHS
    

---

# Example

Given:

```text
F = { B → A, D → A, AB → D }
```

Using transitivity:

```text
B → A

AB → D

D → A
```

Can derive:

```text
B → D
```

Minimal cover removes redundant dependencies.

---

# Important Points

- Armstrong’s rules are sound and complete
    
- Attribute closure is used to:
    
    - Find candidate keys
        
    - Check normalization
        
    - Test dependency preservation
        

---

# Memory Lines

```text
FD → Relationship between attributes

X⁺ → Attributes determined by X

F⁺ → All derivable dependencies
```

---
# Why It Matters

- Basis of normalization
    
- Used in decomposition
    
- Helps remove redundancy
    
- Important for BCNF and 3NF
    
- Frequently asked in exams

---