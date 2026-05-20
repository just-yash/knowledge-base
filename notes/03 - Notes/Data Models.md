
Type : #Note    
Date :  2026-04-10  
Tags :  [[DBMS]]    
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Data Models

A **data model** is a collection of concepts used to describe the structure, relationships, and constraints of data in a database.

---
## Components of Data Model

Each data model has 3 main components:

1. **Structural Part**
    - Defines how data is organized
    - ###### Example: tables, records, nodes
2. **Operational / Manipulative Part**
    - Defines operations on data
    - ###### Example: insert, delete, update
3. **Integrity Part (Data Accuracy)**
    - Rules to maintain data accuracy
    - ###### Example: primary key, uniqueness

---
## Types of Data Models

---
### 1. Hierarchical Model

- Data is organized in a **tree (relay) structure**
- Parent → Child relationship (1)

**Features:**

- Simple and fast
- Rigid structure

---
### 2. Network Model

- Data is stored using **graph structure** → links
- Supports **many-to-many relationships**

**Features:**

- Flexible than hierarchical → searching is easier 
- Complex to design

---
### 3. Relational Model

- Data is stored in **tables (relations)** 
- maintain data in terms of Attributes
- Most widely used model

**Features:**

- Easy to use
- Reduces redundancy
- Based on rows (tuples) and columns (attributes)

---
## Classification of Data Models

---
### 1. Object-Based Models

- Used at conceptual level
###### Example:
- ER Model
- Object-Oriented Model

---

### 2. Record-Based Models

- Used to represent data in records
###### Example:
- Hierarchical
- Network
- Relational

---
### 3. Physical Data Models

- Describe how data is stored in memory
###### Example:
- File structure
- Indexing

---
## Model Selection

- Done on the basis of 
	- Organization's Primary Goal and Requirements 
	- Volume of transaction 
	- Estimated no. of enquiry 

> Relational Model is best among all for representation of Data

---
# Summary 

- Model = Structure + Operations + Constraints
- Relational = Most important

- Hierarchical → Tree (relay)
- Network → Graph (links)
- Relational → Table (tuple and attributes)

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]


---
# Questions 



