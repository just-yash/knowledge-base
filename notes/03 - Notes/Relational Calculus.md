
Type : #Note    
Date : 2026-05-12    
Tags :  [[DBMS]]      
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# Relational Calculus

- Relational Calculus is a formal non-procedural query language used in DBMS.
- It specifies **what data is required**, not how to retrieve it.
- Based on mathematical predicate logic.

---
# Core Idea

```
Relational Algebra → HOW
Relational Calculus → WHAT
```

- In [[Relational Algebra]]:
    - User specifies procedure/steps
- In Relational Calculus:
    - User specifies conditions only

---
# Features of Relational Calculus

- Non-procedural query language
- Based on first-order predicate logic
- Describes desired result
- Does not specify execution method
- Foundation for high-level query languages

---
# Types of Relational Calculus

[[#1. Tuple Relational Calculus (TRC)]]
[[#2. Domain Relational Calculus (DRC)]]

---
# 1. Tuple Relational Calculus (TRC)

- Variables represent tuples
- Uses tuple variables to retrieve data

---
## General Form

```
{ t | condition(t) }
```

Where:

- `t` → tuple variable
- `condition(t)` → condition satisfied by tuple
- Result contains tuples satisfying condition

---
## Syntax Structure

```
{ t.Attribute | Relation(t) AND condition }
```

---
## Example 1

Retrieve employees having salary greater than 30000

### Relational Algebra

```
π Fname, Lname (σ Salary > 30000 (EMPLOYEE))
```

### Tuple Relational Calculus

```
{ t | EMPLOYEE(t) AND t.Salary > 30000 }
```

---

## Example 2

Display Bdate and Address of employee John B Smith

### Relational Algebra

```
π Bdate, Address(σ Fname = 'John'AND Minit = 'B'AND Lname = 'Smith' (EMPLOYEE))
```

### Tuple Relational Calculus

```
{ t.Bdate, t.Address |EMPLOYEE(t)AND t.Fname = 'John'AND t.Minit = 'B'AND t.Lname = 'Smith' }
```

---

## Example 3

Display names and addresses of employees working in Research department

### Tuple Relational Calculus

```
{ t.Fname, t.Lname, t.Address |EMPLOYEE(t)AND DEPARTMENT(d)AND d.Dname = 'Research'AND d.Dnumber = t.Dno }
```

---

# Important Points of TRC

- Uses tuple variables
- More descriptive than procedural
- Based on logical conditions
- Retrieves tuples satisfying conditions

---

# 2. Domain Relational Calculus (DRC)

- Variables represent attribute values (domains)
- Uses domain variables instead of tuples

---

## General Form

```
{ <x1, x2, ..., xn> | condition }
```

Where:

- `x1, x2, ..., xn` are domain variables
- Condition specifies required values

---

## Example 1

Retrieve names of employees having salary greater than 30000

### Domain Relational Calculus

```
{ <Fname, Lname> |< Fname, Minit, Lname, SSN, Bdate, Address, Sex, Salary, Super_ssn, Dno >∈ EMPLOYEEAND Salary > 30000 }
```

---

## Example 2

Display Bdate and Address of John B Smith

### Domain Relational Calculus

```
{ <Bdate, Address> |< 'John', 'B', 'Smith', SSN, Bdate, Address, Sex, Salary, Super_ssn, Dno >∈ EMPLOYEE }
```

---

# Difference Between TRC and DRC

|Feature|TRC|DRC|
|---|---|---|
|Variables Represent|Tuples|Attribute values|
|Based On|Tuple variables|Domain variables|
|General Form|`{ t|condition }`|
|Simplicity|Easier to understand|More mathematical|

---

# Relational Algebra vs Relational Calculus

|Relational Algebra|Relational Calculus|
|---|---|
|Procedural|Non-procedural|
|Specifies HOW|Specifies WHAT|
|Uses operations|Uses logical conditions|
|Operational approach|Declarative approach|

---

# Why It Matters

- Foundation of query languages
- Important for understanding SQL
- Used in query optimization
- Frequently asked in DBMS exams
- Helps understand declarative querying

---

# Final Memory Lines

```
Relational Algebra → HOWRelational Calculus → WHATTRC → Tuple VariablesDRC → Domain Variables
```

---

# Questions

1. Define Relational Calculus
2. Difference between Relational Algebra and Relational Calculus
3. Explain Tuple Relational Calculus with examples
4. Explain Domain Relational Calculus with examples
5. Difference between TRC and DRC
6. Why is Relational Calculus called non-procedural?

---

# Summary

- Relational Calculus is a non-procedural query language
- Specifies required data using logical conditions
- TRC uses tuple variables
- DRC uses domain variables
- Foundation for declarative query languages like SQL

---
# References

- [[Database Management System (DBMS) - CSE 14th.pdf]]  