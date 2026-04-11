
Date :  2026-04-10  
Tags :  [[DBMS]]   
~ ***Yash Agrawall*** ~  

---
# DBMS Architecture

- System Design / Deployment 
- Where and How DBMS runs

---
## 1. Centralized Architecture  (Single Layer)

- All components are located at a single system  
- Terminals are connected to a central server  

![[Pasted image 20260410013517.png]]
### Features:  
- Easy control  
- High dependency on central system  
  
---  
## 2. Client-Server Architecture  (Double Layer)

- Database is stored on server  
- Clients send requests  

![[Pasted image 20260410013843.png]]
### Components:  
- Client → User interface  
- Server → DBMS + Data  
  
---  
## 3. Three-Tier Architecture  (Triple Layer)

- Additional intermediate layer between client & DB server 
- App Server / Web Server also acts as a channel for passing processed data from DB server 
- In client side, data can be processed and filtered further to make it more presentable (GUI)

![[Pasted image 20260410014712.png]]
### Layers:  
  
1. **Client Layer**  
- GUI / Web Interface  
	        $\updownarrow$
2. **Application Server / Web Servers** 
- Applications, Programs, Web Pages
- Stores rules used to access data from DB server → Accepts and processes requests from clients → sends DB Command to DB server
	        $\updownarrow$
3. **Database Server**  
- DBMS  
- Data storage  
  
---  
## Flow  

Client → Application Server → DB Server → Response back  

---
# References 

1. [[Database Management System (DBMS) - CSE 14th.pdf]]
