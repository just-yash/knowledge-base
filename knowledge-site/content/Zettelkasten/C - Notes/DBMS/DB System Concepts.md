
Date :  2026-04-09  
Tags :   [[DBMS]]   
~ ***Yash Agrawall*** ~  

---
# DB System Concepts

---
## Data Model 
- Collection of models used to describe the structure of DB 
- Defines : 
	- Data 
	- Relationships 
	- Constraints 

---
## Data Abstraction 
- The way to supress the actual usage of data 
- Hiding internal details and showing only essential features to the end user.
- Hides implementation details
- Reduces Complexity 

Levels : 
- [[DB 3-level Architecture#^c03567|Physical Level]] → How data is stored 
- [[DB 3-level Architecture#^f50df6|Conceptual Level]] → What data is stored 
- [[DB 3-level Architecture#^8912bb|External Level]] → How users view data

---
## Schemas
- The overall design of the database
- Description of DB 
- The displayed schema is called **schema diagram** 
- Each object in schema diagram is called **schema construct**

---
## DB State / Snapshot / Instance 
- Data in a DB in a particular time is called DB state 
- Collection of information stored in the database at a particular moment

---
###### Example : 

`int i = 10;`  
`int i` → schema  
`10` → instance.    

---
# DBMS Components / Modules

Defines how DBMS processes queries and manages data internally.

![[Pasted image 20260410011429.png]]

---
## [[DB Users & Administrators|Users]]

- [[DB Users & Administrators#DBA (Database Administrator) (The 1st User)|DBA]]
- [[DB Users & Administrators#Casual End-User|Casual Users]]
- [[DB Users & Administrators#System Analysts and Application Programmer|Application Programmers]]
- [[DB Users & Administrators#Naive and Parametric User|Parametric Users]]

---
## Query Processing

- [[DB Languages#DDL|DDL]] Compiler → Processes schema definitions
- **Query Compiler** → Converts queries into internal form
- **Query Optimizer** → Chooses best execution plan
- **Precompiler** → Extracts embedded SQL
- [[DB Languages#DML|DML]] Compiler → Processes DML queries
- **Host Language Compiler** → Compiles application code

---
## Execution

- **Runtime Database Processor**
    - Executes queries
    - Interacts with storage
- **Stored Data Manager**
    - Handles storage, retrieval, update

---
## Control

- **Concurrency Control & Recovery Subsystem**
    - Maintains consistency
    - Handles failures
    - Backup & recovery

---
## Storage

- **Data Dictionary (System Catalog)**
    - Stores metadata
- **Stored Database**
    - Actual data

---
## Flow

User → Compiler → Optimizer → Execution → Storage

---
# Database System Utilities

Utilities are tools provided by DBMS to perform maintenance, optimization, and data management tasks.

---
## Types of Utilities

---
### 1. Loading

- Used to load existing data files into the database
- Takes:
    - Source file format
    - Target database structure
- Automatically reformats and stores data into DB

---
### 2. Backup

- Creates a backup copy of the DB for recovery

#### Types:

- **Full Backup** → Entire DB
- **Incremental Backup** → Only changes since last backup

> Incremental backup saves space but is more complex

---
### 3. File Reorganization

- Reorganizes DB files into a different file organization
- Improves:
    - Performance
    - Access speed

---
### 4. Performance Monitoring

- Monitors DB usage
- Provides statistics to [[DB Users & Administrators#DBA (Database Administrator) (The 1st User)|DBA]]
- Helps in tuning and optimization

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]