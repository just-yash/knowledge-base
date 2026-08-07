
Type : #Note    
Date :  2026-04-13  
Tags :  [[DBMS]]
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Relational Algebra

- Relational Algebra and Relational Calculus are formal query languages used to retrieve data from relational databases.
- They provide a mathematical foundation for the relational model.
    
---
### Relational Algebra

- Procedural query language
- Specifies **how** to retrieve data
- Uses operations on relations (tables)
       

---
## Importance

- Provides formal foundation for [[relational model]] operations
- Used in query optimization and query processing
- SQL is based on relational algebra concepts
- Helps understand [[DBMS]] internals and joins
    
---
## Types of Operations

### 1. Unary Operations

- Operate on a single relation

#### Selection (σ)

- Selects tuples satisfying a given condition
- Operates on rows

##### Syntax

```text
σ <select condition> (R)
```

###### Example : Select employees having salary greater than 30000

```text
σ Salary > 30000 (EMPLOYEE)
```

###### Example : Select employees from department 4 having salary 30000 OR employees from department 5 having salary 50000

```text
σ (Dno = 4 AND Sal = 30000) OR (Dno = 5 AND Sal = 50000) (EMPLOYEE)
```

---
#### Cascade of Selection

```text
σ cond1 (σ cond2 (R))
```

Equivalent to:

```text
σ cond1 AND cond2 (R)
```

##### Property (Commutative)

```text
σ cond1 (σ cond2 (R)) = σ cond2 (σ cond1 (R))
σ cond1 AND cond2 (R) = σ cond2 AND cond 1 (R)
```

---
#### Projection (π)

- Selects specific attributes (columns)
- Operates on columns
- Duplicate tuples may be removed

##### Syntax

```text
π <attribute-list> (R)
```

###### Example : Display first name, last name and salary of employees

```text
π Fname, Lname, Salary (EMPLOYEE)
```

###### Example : Display SSN and salary of employees

```text
π SSN, Salary (EMPLOYEE)
```

---
#### Rename (ρ)

- Used to rename relations or attributes
    
##### Syntax (Rename Attributes)
- if only attributes needs changing
```text
ρ S(B1, B2, ..., Bn) (R)
```

##### Syntax (Rename Relation)
- if only relation name needs changing
```text
ρ S(R)
```

Where, 
- `S` → new name
- `R` → original name

---
## Sequence of Operations

Operations can be nested.

###### Example : Display first name, last name and salary of employees in department 4

```DBMS
π Fname, Lname, Salary (σ Dno = 4 (EMPLOYEE))
```

OR

```DBMS
Temp1 = σ Dno = 4 (EMPLOYEE)

Result = π Fname, Lname, Salary (Temp1)
```

---
### 2. Binary Operations

- Operate on two relations
    
#### Union (∪)

- Combines tuples from two relations

##### Conditions for Union Compatibility

- Same number of attributes
- Corresponding attributes must have same domains
- Degree of both relations must be same to union them

##### Syntax

```text
R ∪ S
```

###### Example : Retrieve the SSN of all employees who either work in department 5 or directly supervise an employee who works in department 5

```
DEP5_EMPS = (σ Dno = 5 (EMPLOYEE))

RESULT1 = π SSN (DEP5_EMPS)

RESULT2 = π Super_ssn (DEP5_EMPS)

RESULT = RESULT1 ∪ RESULT2
```

---
#### Intersection (∩)

- Returns common tuples from both relations

##### Syntax

```text
R ∩ S
```

###### Example : Retrieve the SSN of employees who work on both Project 1 and Project 2

```
PROJ1_EMPS = π Essn (σ Pno = 1 (WORKS_ON))

PROJ2_EMPS = π Essn (σ Pno = 2 (WORKS_ON))

RESULT = PROJ1_EMPS ∩ PROJ2_EMPS
```

---
#### Difference (−)

- Returns tuples present in R but not in S

##### Syntax

```text
R − S
```

##### Property

- Non-commutative

```text
R − S ≠ S − R
```

---
#### Cartesian Product (×)

- Combines every tuple of R with every tuple of S
- Also called Cross Product

##### Syntax

```text
R × S
```

##### Result
###### Cardinality :
If:
- R has m tuples
- S has n tuples
Then:
- Number of tuples in R × S = m × n

###### Degree : 
If:
- R has m attributes
- S has n attributes
Then:
- Number of attributes in R × S = m + n
```text
Degree = degree(R) + degree(S)
```

---
#### Join (⨝)

- Combines related tuples based on a condition
- Join = Cartesian Product + Selection

##### Syntax

```text
R ⨝ <join-condition> S
```

###### Example : Retrieve manager details of each department

```text
DEPARTMENT ⨝ (Mgr_SSN = SSN) EMPLOYEE
```

Project required attributes:

```text
π Dname, Lname, Fname (...)
```

##### Types of Join 

 1. Theta Join (θ-Join)
	- Join operation with a general condition
	- Uses operators like:
	    - `<`
	    - `>`
	    - `<=`
	    - `>=`
	    - `=`
	    - `≠`
	- Syntax : `R ⨝ <condition> S`

 2. Equi Join
	- Special type of Theta Join
	- Join condition uses equality operator `(=)` only
	- Example : `DEPARTMENT ⨝ (Mgr_SSN = SSN) EMPLOYEE`

 3. Natural Join
	- Automatically joins relations using common attributes having same names
	- Duplicate common attributes are removed from result
	- Common attribute names must be same in both relations
	- Example : Retrieve names of employees who work in Research department
	`RESEARCH_DEPT ← σ Dname = 'Research' (DEPARTMENT)`
	`DEPT_EMP ← RESEARCH_DEPT ⨝ (Dnumber = Dno) EMPLOYEE`
	`RESULT ← π Fname, Lname, Dname (DEPT_EMP)`

4. Inner Join
	- Match and merge operation
	- First matches tuples using common attribute values
	- Then merges matching tuples

5. Outer Join 
	- Used to avoid loss of information in Join operations
	- Keeps tuples even when matching values are not found
	- Missing values are filled with `NULL`
	- Types of Outer Join
		- Left Outer Join (⟕)
			- Keeps all tuples from left relation `R`
			- Matching tuples from right relation `S` are added
			- If no match exists, attributes of `S` become `NULL`
			- Syntax : `R ⟕ S`
			- Example : `EMPLOYEE ⟕ DEPARTMENT`
		- Right Outer Join (⟖)
			- Keeps all tuples from right relation `S`
			- Matching tuples from left relation `R` are added
			- If no match exists, attributes of `R` become `NULL`
			- Syntax : `R ⟖ S`
			- Example : `EMPLOYEE ⟖ DEPARTMENT`
		- Full Outer Join (⟗)
			- Keeps all tuples from both relations
			- Matching tuples are merged
			- Non-matching tuples contain `NULL` values
			- Syntax : `R ⟗ S`
			- Example : `EMPLOYEE ⟗ DEPARTMENT`

---
#### Division (÷)

- Generally used in queries containing “all”

###### Example : Retrieve names of employees who work on all projects that John Smith works on

```
SMITH ← σ Fname = 'John' AND Lname = 'Smith' (EMPLOYEE)

SMITH_PNO ← π Pno (WORKS_ON ⨝ (Essn = SSN) SMITH)

SSN_PNO ← π Essn, Pno (WORKS_ON)

SSNS ← SSN_PNO ÷ SMITH_PNO

RESULT ← π Fname, Lname (SSNS ⨝ EMPLOYEE)
```

---
# Operator Summary Table

|Symbol|Operation|Works On|
|---|---|---|
|σ|Selection|Rows|
|π|Projection|Columns|
|ρ|Rename|Relation/Attributes|
|∪|Union|Two Relations|
|∩|Intersection|Common Tuples|
|−|Difference|Tuple Subtraction|
|×|Cartesian Product|All Tuple Combinations|
|⨝|Join|Related Tuples|

---

# Final Memory Lines

```text
Relational Algebra → HOW (Procedural)

σ → Selection → Rows

π → Projection → Columns

ρ → Rename

∪ → Union

∩ → Intersection

− → Difference

× → Cartesian Product

⨝ → Join
```

---

# References

- [[Database Management System (DBMS) - CSE 14th.pdf]]
- [[Relational Calculus]]