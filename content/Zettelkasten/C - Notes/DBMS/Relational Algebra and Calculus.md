
Date :  2026-04-13  
Tags :  [[DBMS]]
~ ***Yash Agrawall*** ~  

---
# Relational Algebra and Calculus

- tuple relational calculus 
- domain related calculus 
- Relational Algebra and Calculus are formal query languages used to retrieve data from relational databases.
- Set of operations to operate on the relational model

---
## Relational Algebra

- A **procedural query language**
- Specifies **how to retrieve data**
- Works on relations (tables)
- Set of operations on relational model

---
### 📌 Importance

- Provides formal foundation for Relational Model operations
- Used as a basis for implementing and optimizing the queries in a Relational Model
- SQL is based on relational algebra concepts

---
## Types of Operations

---
### 1. Unary Operations

- Operate on a **single relation(table)**

#### Selection (σ)

- Selects  and displays some of the tuples from a Relational Model satisfying some condition

##### Syntax:

```
σ<condition>(R)
```

###### Example : Select employees with salary > 30000

```
σ salary > 30000 (Employee)
```

###### Example : Select tuples having dept. no. 4 and salary = 30000 or dept. no. 5 and salary 50000 

```
σ (DeptNo = 4 AND salary = 30000) OR (DeptNo = 5 AND salary = 50000) (Employee)
```

##### Cascade of Selection 

```
(σ <condition 1>) (σ <condition 2>) (....(σ <condition n> (Relation)))
```

```
σ <condition 1> AND <condition 2> .... AND <condition n> (Relation)
```

##### Combined Conditions:

```
σ (Dno = 4 AND salary > 30000) OR (Dno = 5 AND salary > 50000) (Employee)
```

##### Property(Commutative):

```
σ cond1 (σ cond2 (R)) = σ cond2 (σ cond1 (R))
```

---
#### Projection (π)

- Selects specific attributes (columns) from a relation

##### Syntax:

```
π <attribute list> (R)
```

###### Example : Display last name, first name, salary of employee

```
π FName, LName, Salary (Employee)
```

###### Example : Display SSN and Salary of Employees 

```
π SSN, Salary (Employee)
```

---
#### Sequence of operations 

###### Example : Suppose we want to display first name, last name and salary of Dept 4 of Employees 

```
π FName, LName, Salary (σ DeptNo = 4 (Employee))
```

or 

```
Temp 1 = σ DeptNo = 4 (Employee)
Result = π FName, LName, Salary (Temp 1)
```

---
#### Rename (ρ)

- Used to rename relation or attributes

##### Syntax : Change in attributes 

```
ρ S(B1, B2, ..., Bn) (R)
```

##### Syntax : Change in Relation 
```
ρ S(R)
``` 
- S → New 
- R → Original 

---

### 2. Binary Operations

- Operate on two relations

---

#### Union (∪)

- Combines tuples from two relations

##### Condition:
- Same number of attributes
- Same domains

R ∪ S

---

#### Intersection (∩)

- Gives common tuples

R ∩ S

---

#### Difference (−)

- Tuples in R but not in S

R − S

- Not commutative:
R − S ≠ S − R

---

#### Cartesian Product (×)

- Combines every tuple of R with every tuple of S

R × S

##### Result:
- Tuples = m × n
- Degree = sum of attributes

---

#### Join (⨝)

- Combines related tuples based on a condition

##### Syntax:

```
R ⨝ <condition> S
```

##### Example:

```
DEPARTMENT ⨝ (Mgr_SSN = SSN) EMPLOYEE
```

---

### Relational Calculus

- A **non-procedural query language**
- Specifies **what to retrieve**

---

#### Types:

1. Tuple Relational Calculus (TRC)
2. Domain Relational Calculus (DRC)

---

### Final Summary

- σ → selection (rows)
- π → projection (columns)
- ρ → rename
- ∪ ∩ − → set operations
- × → cartesian product
- ⨝ → join (most important)







































## Relational Calculus

- A **non-procedural query language**
- Specifies **what to retrieve**, not how

### Types:

- Tuple Relational Calculus (TRC)
- Domain Relational Calculus (DRC)

---

## 📌 Final Memory Lines

- **Algebra = How (procedural)**
- **Calculus = What (non-procedural)**
- **σ = Selection (filter rows)**

---
---
# Questions




---
# Summary 





---
# References 

