
Type : #Note    
Date :  2025-12-27   
Tags :   [[DBMS]] ; [[GATE]]   
Status : #complete     
~ ***Yash Agrawall*** ~   

---
# DBMS Basics

### Data
- Characteristics, usually numerical that are collected through observations. 
- set of values of qualitative or quantitative variables about one or more persons or objects.
- datum(singular of data) is a single value of a single variable

---
### Information
- Processed Data is called information.
- data → post analysis → Information
- Data : all the trains and their time schedule. Info : The train and its time in which you will travel

---
### Two ways to store data 
1. Manual (File Folder System, Excel Sheets)
2. Computerized (DBMS)

---
### Problem with File System
1. **Data Redundancy and Inconsistency** :  Redundancy → having multiple copies of same data. Inconsistency → information about the data varies or is inconsistent.
	- Eg: Imagine two spreadsheets that list employee contacts, but one is updated with a new phone number while the other is not. This leads to confusion about the correct number to use. 
2. **Difficulty in Accessing Data** : Writing long codes or you have to request it from an IT specialist in order to extract a specific set of information. This causes delays.
3. **Data Isolation** : different information about the same entity is stored in different files.  Eg: Marks, attendance, behaviour, etc about a student are stored in different files, In order to make a comprehensive report, you will have to look at multiple files.
4. **Integrity Problem** : Change of information, is not universal in the system. Eg: Finding same address or ph. no. on a website even though you changed multiple times.
5. **Atomicity Problem** : Either Complete the work, or don't do it at all. But don't leave it incomplete. Eg: A bank transaction that deducts money from one account to deposit it in another but leave the transaction incomplete and accounts unbalanced. 
6. **Concurrent access Anomalies** : Multiple traffic on a website. Eg: Booking of tickets, 1 ticket is for 1 person. 

---
### Data Base
- organised collection of data stored and accessed electronically from a computer system.

---
### Relational Data Base
- Data that inter connected or inter linked in some or the other way. 

---
### Data Base Management System
- Software that interacts with end users, applications and database itself to capture and analyse the data
- DBMS Software additionally encompasses the core facilities provided to administer the database. 
- The sum total of the database, the DBMS and the associated application(Security, encryption, input output, efficiency, etc) can be referred to as a "**Database Management System**".
#### Defining 
- To provide a particular representation either in tree, queue or graph 
#### Constructing 
- To arrange or put data in a particular order 
#### Manipulating 
- To delete, edit, insert the stored data 
#### Sharing 
- To share the stored data between different systems 

---
### Types of DBMS 

[[DB Users & Administrators|According to Users]] :  
1. Single User 
2. Desktop Database
3. Multi User 
4. 50 User 
5. Enterprise   

According to location :   
1. Centralised DBS → single location 
2. Distributive DBS → more than one location

According to type of data stored : 
1. General purpose DBS 
2. Discipline Specific  

According to type of use : 
1. Operational DB 
	- concentration on the day-to-day data of company 
	- OLTP (Online Transactional Processing)
2. Analytical DB 
	- Storing historical data and analysis 
	- decision making capabilities 
	- OLAP (Online Analytical Processing)
	- Data Warehouse

According to Structure 
1. Unstructured 
	- Raw unstructured data is used 
2. Structured 
	- Data is formatted before use
3. Semi-Structured 

---
### Characteristics of Database 
- Self-describing in nature 
- Insulation between programs and data and [[DB System Concepts#Data Abstraction|data abstraction]]
- Suppose of multiple views 
- Sharing of data and multiuser transaction processing 
- No Data redundancy (no duplicate data) and no inconsistency 
- Security

---
### Advantages of DBMS Approach 
- No redundancy unlike the [[#Problem with File System|File System]] → no duplication of data 
- Restricting persistent storage for program objects 
- Providing storage structure for efficient query processing 
- Providing back-up and Recovery
- Providing multiple user interface 

---
# Chapters:
1. [[ Transactions and Concurrency Control]] 
2. ER Model
3. Relational Model
4. Integrity Constraints
5. Normal Forms
6. File Organization, Indexing
7. Relational algebra, Tuple Calculus, SQL

---
# References 

1. [DBMS Lecture Series (YouTube)](https://www.youtube.com/watch?v=FchQ6wZVqsA)
2. [[Database Management System (DBMS) - CSE 14th.pdf]]

---