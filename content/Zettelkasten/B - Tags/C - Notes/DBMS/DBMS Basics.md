
Date :  2025-12-27   
Tags :   [[DBMS]] ; [[GATE]]   
~ ***Yash Agrawall*** ~   

---
# DBMS Basics

### Data
- Characteristics, usually numerical that are collected through observations. 
- set of values of qualitative or quantitative variables about one or more persons or objects.
- datum(singular of data) is a single value of a single variable

### Information
- Processed Data is called information.
- data → post analysis → Information
- Data : all the trains and their time schedule. Info : The train and its time in which you will travel

### Data Base
- organised collection of data stored and accessed electronically from a computer system.

### Data Base Management System
- Software that interacts with end users, applications and database itself to capture and analyse the data
- DBMS Software additionally encompasses the core facilities provided to administer the database. 
- The sum total of the database, the DBMS and the associated application(Security, encryption, input output, etc) can be referred to as a "**Database Management System**".

### Relational Data Base
- Data that inter connected or inter linked in some or the other way. 

### Problem with File System
1. **Data Redundancy and Inconsistency** :  Redundancy → having multiple copies of same data. Inconsistency → information about the data varies or is inconsistent.
	- Eg: Imagine two spreadsheets that list employee contacts, but one is updated with a new phone number while the other is not. This leads to confusion about the correct number to use. 
2. **Difficulty in Accessing Data** : Writing long codes or you have to request it from an IT specialist in order to extract a specific set of information. This causes delays.
3. **Data Isolation** : different information about the same entity is stored in different files.  Eg: Marks, attendance, behaviour, etc about a student are stored in different files, In order to make a comprehensive report, you will have to look at multiple files.
4. **Integrity Problem** : Change of information, is not universal in the system. Eg: Finding same address or ph. no. on a website even though you changed multiple times.
5. **Atomicity Problem** : Either Complete the work, or don't do it at all. But don't leave it incomplete. Eg: A bank transaction that deducts money from one account to deposit it in another but leave the transaction incomplete and accounts unbalanced. 
6. **Concurrent access Anomalies** : Multiple traffic on a website. Eg: Booking of tickets, 1 ticket is for 1 person. 

### Instance and Schemas
- Instance : Collection of information stored in the database at a particular moment
- Schema : The overall design of the database

# Chapters:
1. [[ Transactions and Concurrency Control]] 
2. ER Model
3. Relational Model
4. Integrity Constraints
5. Normal Forms
6. File Organization, Indexing
7. Relational algebra, Tuple Calculus, SQL


---
# Questions




---
# Summary 





---
# References 

1. [DBMS Lecture Series (YouTube)](https://www.youtube.com/watch?v=FchQ6wZVqsA)

