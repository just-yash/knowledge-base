
Type : #Note    
Date :  2026-04-11  
Tags :  [[DBMS]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Relational Model

The **Relational Model** represents data as a collection of **tables (relations)** where each table consists of **rows (tuples)** and **columns (attributes)**.

---
## Relation

- A **relation** is a table that represents an entity or relationship.
- A relation is mathematically defined as a **set of tuples**.
- Relation is a **subset of Cartesian product** of domains
- Each tuple is an element of this set
- A relation **r(R)** is defined as:
```
r(R) ⊆ dom(A₁) × dom(A₂) × ... × dom(Aₙ)
```

---
## Tuple

- A **tuple** is a single row in a relation.
- Each tuple represents one record.

###### Example:

```
Student(101, "Yash", CSE)
```

---
## Attribute

- An **attribute** is a column of a relation.
- Represents a property of an entity.

###### Example:

```
Student(RollNo, Name, Branch)
```

---
## Degree of Relation

- Number of attributes in a relation.
- Representation : `R(A₁, A₂, A₃, ..., Aₙ)`
	- `R` = Relation name
	- `A₁, A₂, ..., Aₙ` = Attributes
###### Example:
```
Student(RollNo, Name, Branch)
Degree = 3
```

---
## Domain

- The **domain** of an attribute is the set of valid values.
- Represented by $dom(A_{i})$
	- $A$ → Attribute 
	- $i$ → $i^{th}$
###### Example:
- Age → 0 – 120
- Gender → {Male, Female, Other}

---
## Relation Schema 

- Structure/definition of a table
- defined with a relation name along with attribute(s)
###### Example : 
`Student(RollNo, Name, Age)`

---
## Relation Instance / State

- Actual data in the table at a particular time.
- Dynamic; changes with insert/delete/update.

---
## Keys 

- Should have no Redundant values
- Needed to identify a table 

---
### Super Key

- Any set of attributes that uniquely identifies a tuple.
- May contain extra attributes → not minimal 

###### Example:

```
{RollNo, Name} → Super Key
```

---
### Candidate Key

- Key is to be always a minimal super key 
- It is to be designed in such a way that it has minimal attributes 
- No redundant attributes.

###### Example:

```
{RollNo}
```

---
### Primary Key

- Any one of the candidate key is called a primary key (we choose)
- Candidate key selected to uniquely identify tuples.
- Must be:
    - Unique
    - Not NULL

---
### Alternate Key

- Candidate keys not chosen as primary key.

---
### Composite Key

- Key formed using multiple attributes.

###### Example:

```
{StudentID, CourseID}
```

---
### Foreign Key

- When establishing a relationship between 2 tables → a common attribute 
	- Primary key of one table common with Candidate key of another 
- Attribute in one relation referring to primary key of another.

###### Example:

```
Student(DeptID) references Department(DeptID)
```

---
## Integrity Constraints 

- If a DB in a state obeys all the integrity of all constraints → **Valid State** 
- Otherwise → **Invalid State**

---
### Entity Integrity 

- Once a Candidate key is set as Primary → it cant be NULL 
- Otherwise integrity breaks

---
### Referential Integrity 

- A constraint that ensures consistency between related relations
- A **foreign key (FK)** in one relation must refer to a **primary key (PK)** in another relation
- The FK attribute in relation R1(Referencing Relation) must have the **same domain** as the PK of relation R2(Referenced Relation)
- For every tuple t₁ in R1:
	- Either FK value = some PK value in R2
	- Or FK value is **NULL**

---
### Domain Constraints 

- Attribute values must belong to defined domain 

###### Example : 
`Age > 0`

---
### Key Constraints 

- Two distinct tuples at any state of relation cannot have identical values for the attributes in the key 

---
### 1. Atomic Values (1NF Property)

- Each cell contains an atomic (indivisible) value
- No multivalued or composite attributes allowed

---
### 2. No Duplicate Tuples (Rows)

- A relation is a set of tuples
- Sets do not allow duplicate elements
- Therefore, duplicate rows are not allowed

---
### 3. Unique Attribute Names

- Each attribute (column) must have a distinct name
- Prevents ambiguity during queries and operations

---
### 4. Ordering of Tuples

- There is no ordering of tuples (rows) in a relation
- Relations are mathematical sets, and sets are unordered

---
### 5. Ordering of Attributes

- In the relational model, attribute order theoretically does not matter
- However, in practical table representation, attributes are shown in a fixed order for readability and interpretation

###### Example:

```
Student(Name, ID, Phone)
```

Changing the displayed order does not change the relation itself, but may affect interpretation by users.

---
### 6. Formal View of a Relation

If `R` is a relation schema, then a relation state `r(R)` is a finite set of tuples:

```
r(R) = {t₁, t₂, ..., tₙ}
```

Where:

- Each tuple maps attributes to values
- Each value belongs to the domain of its attribute

---
### 7. Tuple Representation

A tuple can be represented as:

```
t = (v₁, v₂, ..., vₙ)
```

OR

```
t = {A₁:v₁, A₂:v₂, ..., Aₙ:vₙ}
```

---
### 8. Values from Domains

- Every attribute value must come from its predefined domain

Ensures:

- Data consistency
- Valid data entries
- Integrity of the database

---
### 9. NULL Values

NULL may represent:

- Unknown value
- Missing value
- Not applicable value

NULL values should generally be minimized.

---
### 10. Meaning of a Relation

The meaning of a relation depends on:

- Relation name
- Attribute names
- Domains of attributes

###### Example:

```
Student(Name, RollNo, Dept)
```

This clearly describes the purpose and meaning of the relation.

---
## Advantages of the Relational Model

- Easy to understand and implement.
- Reduces redundancy.
- High flexibility.
- Supports powerful query languages (SQL).
- Strong mathematical foundation (Relational Algebra).

---
## Limitations of the Relational Model

- Less efficient for complex hierarchical data.
- May require multiple joins (performance cost).
- Cannot directly represent some real-world complex relationships.

---
## Relational Model Notations 

- A [[#Relation Schema]] $R(A_{1} \dots A_{n})$ with degree n can be represented by $Q, R, S$
- [[#Relation Instance / State]] can be represented with $q, r, s$
- [[#Tuple]] can be represented by $t, u, g$
- [[#Attribute]] can be represented by $RA_{i}$

---
###### Example : Company Database Tables

-  EMPLOYEE

```text
EMPLOYEE(Fname, Mname, Lname, SSN, DOB, Add, Sex, Sal, Super_ssn, Dno)
```

| Attribute | Meaning                              |
| --------- | ------------------------------------ |
| Fname     | First Name                           |
| Mname     | Middle Name                          |
| Lname     | Last Name                            |
| SSN       | Employee ID / Social Security Number |
| DOB       | Birth Date                           |
| Add       | Employee Address                     |
| Sex       | Gender                               |
| Sal       | Employee Salary                      |
| Super_ssn | Supervisor's SSN                     |
| Dno       | Department Number                    |

- DEPARTMENT

```text
DEPARTMENT(Dname, Dnumber, Mgr_ssn, Mgr_start_date)
```

|Attribute|Meaning|
|---|---|
|Dname|Department Name|
|Dnumber|Department Number|
|Mgr_ssn|Manager SSN|
|Mgr_start_date|Manager Start Date|

- DEPT_LOCATIONS

```text
DEPT_LOCATIONS(Dnum, Dloc)
```

| Attribute | Meaning             |
| --------- | ------------------- |
| Dnum      | Department Number   |
| Dloc      | Department Location |

- PROJECT

```text
PROJECT(Pname, Pnumber, Ploc, Dnum)
```

| Attribute | Meaning                       |
| --------- | ----------------------------- |
| Pname     | Project Name                  |
| Pnumber   | Project Number                |
| Ploc      | Project Location              |
| Dnum      | Controlling Department Number |

- WORKS_ON

```text
WORKS_ON(Essn, Pno, Hours)
```

Represents relationship between employees and projects.

|Attribute|Meaning|
|---|---|
|Essn|Employee SSN|
|Pno|Project Number|
|Hours|Working Hours|

- DEPENDENT

```text
DEPENDENT(Essn, Dependent_name, Sex, Bdate, Relationship)
```

Stores information about employee dependents.

---
## 🔗 Connections

- Relations are sets; relational algebra is applied set theory → [[Set Theory]]
- Relation as a mathematical concept → [[Relations]]
- Relational algebra formalizes queries → [[Relational Algebra]]

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]