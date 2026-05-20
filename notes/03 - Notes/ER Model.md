
Type : #Note    
Date :  2026-04-10  
Tags :  [[DBMS]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# ER Model (Entity-Relationship Model)

The **ER Model** is a high-level conceptual data model used to design the structure of a database using entities, attributes, and relationships.

---
## Basic Concepts

---
### 1. Entity

- A real-world object or thing

#### Weak Entity

- An entity that **cannot be uniquely identified** by its own attributes.
- Depends on another entity (called **Owner Entity**).
- Always has **total participation** in the identifying relationship.

###### Example:

- **Account** may be a weak entity dependent on **Person**.

#### Strong Entity

- Has its own **primary key**.
- Exists independently.

###### Example:

- Person, Employee, Department.

---
### 2. Entity Set

- Collection of similar entities
###### Example: 
- All students

---
### 3. Attribute

- Property of an entity

#### Types:

##### Simple 
- Cannot be divided 
###### Example : 
- Age

##### Composite 
- Can be divided 
###### Example : 
- Name → First + Last 
- Sheet Address → city , state, zip code

##### Stored 
- Given value used to derive Derived Attributes 
###### Example : 
- DOB 

##### Derived 
- Calculated 
###### Example : 
- Age from DOB

##### Multivalued 
- Multiple values 
###### Example : 
- Phone number(s)

##### Complex 
- Composite + Multivalued 
###### Example : 
- Phone (Country Code , Phone No.)

> Entry of `NULL` values with attribute list → **Forgot Data** or **No idea about data** or **Not Valid** 
> Usually recommended to avoid using `NULL` values 

---
### 4. Relationship

- Association between entities
###### Example :
- Student _enrolls in_ Course

---
### 5. Relationship Type

- A **relationship type** defines a relationship between entity sets
- Represented using **R(E₁, E₂, ..., Eₙ)**
- **1:1** → One-to-One
- **1:M** → One-to-Many
- **M:1** → Many-to-One
- **M:M** → Many-to-Many

###### Example: 
- M:1 Relationship
![[Pasted image 20260410032419.png]]

---
### 6. Relationship Instance

- A **set of actual relationships at a given time**
- It is a **subset of the Cartesian product** of entity sets

###### Example:

 - (Employee₁, Dept₁), (Employee₂, Dept₂)

---
### 7. Degree of Relationship

- Number of entities participating in a relationship

#### Types:

- **Unary** → One entity
- **Binary** → Two entities
- **Ternary** → Three entities

###### Example : 

- Supplier — Supply — Project (Ternary)

---
### 8. Role Names

- Used to specify **roles played by entities in a relationship**
- Important when same entity participates multiple times

###### Example : 

- Employee (Supervisor) → supervises → Employee (Subordinate)

---
### 9. Recursive Relationship

- When an entity is related to **itself**

###### Example : 

- Employee supervises Employee

---
### 10. Cardinality Ratio

- Specifies number of entity instances involved
- Example: One student → many courses
- 1 : 1 → One Employee : One Department
- 1 : N → One Employee : N Departments 
- N : 1 → N Employees : One Department 
- Many : Many → Many Employees : Many Departments 

---
### 11. Participation Constraint

- **Total Participation** → Mandatory
- **Partial Participation** → Optional

---
## ER Diagram Components

![[Pasted image 20260410045940.png]]

---
## Extended / Enhanced ER (EER) Concepts

---
### 1. Superclass and Subclass (inheritance)

- Superclass : General entity 
- Subclass : specialized entity 
- Subclass inherits all attributes of superclass 

###### Example : 
- Employee → Manager, Engineer, Technician 
- Superclass → Subclasses 

---
### 2. Specialization 

- Top-down approach 
- Breaking one entity into sub-entities
- Dividing a superclass into subclasses based on differences 

###### Example : 
- Employee → Salaried Employee, Hourly Employee 

---
### 3. Generalization 

- Bottom-up approach 
- Combining multiple entities into one
- Combining similar entities into a higher-level entity 

###### Example : 
- Car, Truck → Vehicle 

---
### 4. Aggregation

- Treats a relationship as a higher-level entity
- Used when relationships have relationships

###### Example:
- Project evaluated by Student and Instructor  
    (The relationship “Project Assignment” becomes an entity)

---
### 5. Disjoint v/s Overlapping Constraints 

**Disjoint** : 
- An entity can belong to only one subclass
###### Example : 
- Employee is either Manager or Technician 

**Overlapping** : 
- An entity can belong to multiple subclasses 
###### Example : 
- Person can be both Student and Employee 

---
### 6. Total vs Partial Participation

- **Total Participation:**  
    Every superclass instance must be in at least one subclass
- **Partial Participation:**  
    Some superclass instances may not belong to any subclass

---
### 7. Specialization Constraints (4 Types)

| Type                  | Meaning                             |
| --------------------- | ----------------------------------- |
| Disjoint + Total      | Must belong to exactly one subclass |
| Disjoint + Partial    | Can belong to none or one           |
| Overlapping + Total   | Must belong to at least one         |
| Overlapping + Partial | Can belong to multiple or none      |

---
### 8. Specialization Lattice

- A subclass can be derived from multiple superclasses

###### Example:
- EMP-Manager derived from Employee and Manager

---
# Questions

---
###### Q1) A person has account in bank, bank operates on different counter, person gets loan from counter. Draw ER Model diagram 

A1) 
![[Pasted image 20260410053243.png]]

---
###### Q2) A person is either an employee, alumni or a student. Employee can either be staff or faculty. Student can be either PG or UG. Show entity diagram. 

A2) 
![[Pasted image 20260410175645.png]]

---
###### Q3) Stars in movies. Movies owned by studios. Attributes in movies : title, year, length, film type. Attributes in stars : name, address, ID. Attributes in studios : name, address

A3) ![[Pasted image 20260410225530.png]]

---
###### Q4) In a birth, one mother, no. pf nurses and doctors. Draw the ER model. Then Redraw : birth as entity 

A4)   ![[Pasted image 20260410230302.png]]

---
# Summary 

- Entity = Object | Attribute = Property | Relationship = Link
- ER Model = Design before implementation
- EER = Advanced ER (Specialization, Generalization, Aggregation)

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]