
Type : #Note    
Date :  2026-04-09  
Tags : [[DBMS]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## DDL 
- Data Definition Language 
- Used to define and modify database structure ([[DB System Concepts#Schemas|schema]])
- Commands : `CREATE`, `ALTER`, `DROP`
- used at [[DB 3-level Architecture#^f50df6|Conceptual Level]]

---
## SDL 
- Storage Definition Language 
- Used to define how data is stored internally
- Works at [[DB 3-level Architecture#^c03567|Physical / Internal level]] 
- Rarely used explicitly in modern [[DBMS]]  

---
## VDL 
- View Definition Language 
- Used to define user views ([[DB 3-level Architecture#^8912bb|External Schema]])
- To manipulate the view level of data 
- Commands : `CREATE VIEW`

---
## DML 
- Data Manipulation Language 
- Used to retrieve, insert, update, delete data
- Commands : `SELECT` , `INSERT` , `UPDATE` , `DELETE`
- Used to manipulate the data 

Two Types : 

---
### High Level Non-Procedural Language
- User specifies what to do, not how
- Example: SQL
- Used for both retrieval and manipulation

---
### Low Level Procedural Language 
- User specifies how to do it
- Requires step-by-step instructions
- Used for both retrieval and manipulation

---
# Summary 

|Language|Full Form|Purpose|Level|Examples / Notes|
|---|---|---|---|---|
|**DDL**|Data Definition Language|Defines and modifies database structure (schema)|Conceptual Level|CREATE, ALTER, DROP|
|**SDL**|Storage Definition Language|Defines how data is stored internally|Internal (Physical) Level|Rarely used explicitly|
|**VDL**|View Definition Language|Defines user views (external schema)|External Level|CREATE VIEW|
|**DML**|Data Manipulation Language|Retrieves and modifies data|All levels (mainly conceptual/external)|SELECT, INSERT, UPDATE, DELETE|

|Type|Nature|Description|
|---|---|---|
|**High-Level (Non-Procedural)**|Declarative|Specifies _what_ to do (e.g., SQL)|
|**Low-Level (Procedural)**|Procedural|Specifies _how_ to do it step-by-step|

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]

---