
Type : #Note    
Date :  2026-04-09  
Tags :   [[DBMS]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# DB 3-level Architecture

- [[DB System Concepts#Data Abstraction|Data Abstraction]] Model
- How data is viewed
- Defined by 3-level 
	- #### External Level  ^8912bb
	- #### Conceptual Level  ^f50df6
	- #### Physical Level ^c03567
- AIM : Separate program area from physical storage 
![[Pasted image 20260409231416.png]]

---
## Data Independence 

- Ability to change schema at one level without affecting the schema at another level 

Two Types : 

---
### Logical 
- Doing changes in conceptual level without changing the viewing level 

---
### Physical 
- Changes in internal schema without affecting the conceptual level 
- Easier than [[#Logical]]

---
### Increased Complexity 
- Requires managing 3 separate layers 
- Mapping between them adds complexity 
- Harder to design and maintain compared to simple systems 

---
### Performance Overhead 
- Every query passes through multiple levels 
- Transaction/mapping causes extra processing time 
- can slightly reduce system performance 

---
### Higher Cost 
- Needs more resources and skilled professionals 
- Implementation and maintenance are expensive 
- Not suitable for small-scale applications 

---
### Difficult Implementation 
- Full 3-level architecture is rarely fully implemented 
- Many [[DBMS]] like (MySQL, PostgreSQL) only follow it partially 

---
### Learning Curve 
- Harder for beginners to understand 
- Requires deeper knowledge of [[DBMS]] concepts 

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]

---