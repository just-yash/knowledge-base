
Date :  2025-12-30
Tags :   [[3 - Zettelkasten/B - Tags/DBMS]]
~ ***Yash Agrawall*** ~

---
# Transactions and Concurrency Control

# Transactions: 
- When a set of instructions or procedure is done without skipping any step in between, it is called a complete transaction.
- In DBMS either all the instructions are followed, or nothing is done, somewhere in between(incomplete) or skipping steps is not allowed.
- If the transaction is incomplete, it will generate inconsistency. 
- To remove this partial execution problem, we increase the level of atomicity and bundle all the instruction of a logical operation into a unit called transaction. 
- A transaction is a set of logically related instructions to perform a logical unit of work.

---
# 2 Fundamental Operations in DBMS
- **READ(X)** : Accessing the database item X from disk
- **WRITE(X)** : Writing the data item from memory variable X to disk. 

---
# Desirable Properties of a Transaction
- The smallest unit which have atomicity in DBMS view is a Transaction. 
- So in order to keep the data base consistent, we must concentrate on each transaction.
- Transaction should posses **ACID** properties. 
				$A = Atomicity$
				$C = Consistency$
				$I = Isolation$
				$D = Durability$
### Atomicity 
- A Transaction is an atomic unit of processing; it should either be performed in its entirety or not performed at all.
- It is the responsibility of _Recovery Control Manager / Transaction Control Manager of DBMS_ to ensure atomicity.

### Consistency
- a transaction should be consistency preserving
- If it is completely executed from beginning to end without interference from other transactions, it should take the database from one consistent state to another.
- The preservation of consistency is the responsibility of the programmer(user) or the DBMS modules that enforces integrity constrains.

### Isolation
- A transaction should appear as though it is being executed in isolation from other transactions, even though many transactions are executing concurrently.
- Even when many transactions are running at the same time, each transaction must behave as if it is the only one running. It should not see half-done work from other transactions.
- The execution of a transaction should not be interfered with by any other transaction executing concurrently.
- It is the responsibility of _Concurrency Control Manager of Database_ to ensure isolation.

### Durability 
- The changes applied to the database by a committed transaction must persist in the database
- These changes must not be lost because of any failure. 
- It is the responsibility of _Recovery Control Manager of DBMS_ to ensure Durability.

---
# Transaction States
![[Pasted image 20251230222040.png]]
- **ACTIVE** - It is the initial state. Transaction remains in this state while it is executing operations. 
- **PARTIALLY COMMITTED** - After the final statement of a transaction has been executed, the state of transaction is partially committed as it is still possible that it may have to be aborted (due to any failure) since the actual output may still be temporarily residing in main memory and not to disk.
- **FAILED** - After the discovery that the transaction can no longer proceed (because of hardware /logical errors). Such a transaction must be rolled back.
- **ABORTED** - A transaction is said to be in aborted state when the when the transaction has been rolled back and the database has been restored to its state prior to the start of execution.
- **COMMITTED** - A transaction enters committed state after successful completion of a transaction and final updation in the database.

> Both, Committed and Aborted states are consistent.

---
# Why we need Concurrent(Parallel) Execution? 
- Concurrent Execution is necessary because- 
	- good database performance, less weighting time.
	- Overlapping I/O activity with CPU increases throughput and response time

# Problems due to Concurrent Execution of Transaction.
The local Buffer is common for every executing transaction. Every Transaction believes that its operating in isolation
- Dirty Read Problem / Read - Write Problem
	- The transaction reads a data item updated by another uncommitted transaction, this transaction may in future be aborted or failed. The reading transactions end with incorrect results.
	- For eg: Here T1 write and changes the value of A, which is then read by T2. But when T1 aborted the Transaction → it reverted back to the original value of A, but for T2 the value of A is still the one it read.

| T1       | T2      |
| -------- | ------- |
| Read(A)  |         |
| Write(A) |         |
|          | Read(A) |
|          | Commit  |
| Abort    |         |

- Unrepeatable Read Problem
	- When a transaction tries to read a value of a data item twice and another transaction updates the data item in between, then the result of the two read operation of the first transaction will differ, this problem is called Non-Repeatable read problem.
	- For Eg: Here, T1 will read the value of A, then T2 will read the same value of A as nothing has been changed by both the transactions till now, but then T2 writes and changes the value of A of which T1 is unaware. Hence, T1 will show error, cause according to it, its the only one in the system, and it did not change anything, then how did the value of A change. 

| T1      | T2       |
| ------- | -------- |
| Read(A) |          |
|         | Read(A)  |
|         | Write(A) |
| Read(A) |          |

- Lost Update Problem / Write-Write Problem 
	- If there are two write operation of different transaction on same data value, and between them there is no read operations, then the 2nd write, over writes the first write.
	- for eg: Here both work in the same buffer and as all the transactions work in isolation, and to make the transaction more efficient, T1 didn't read the value of A again and again, hence when it commits, it commits the value T2 already committed.
	
| T1       | T2       |
| -------- | -------- |
| Read(A)  |          |
| Write(A) |          |
|          | Write(A) |
|          | Commit   |
| Commit   |          |

- Phantom Read Problem
	- If one transaction reads a value while the other completely deletes the schema, the first transaction will get confused and throw an error cause a few seconds ago it just read the instance of that schema, but now there is no such schema even though it works in isolation and it didn't perform any delete operation. 
	- For eg: Here T1 reads the value of A, but T2 deletes the entire variable. Now when T1 uses the read operation again, it gets confused as there is no A in the buffer anymore.

| T1      | T2        |
| ------- | --------- |
| Read(A) |           |
|         | Delete(A) |
| Read(A) |           |







---
# Questions
###### <span style="color:rgb(0, 176, 240)">Q1)</span> Which of the following is NOT a part of the ACID properties of database transactions?
###### (a) Atomicity 
###### (b) Consistency 
###### (c) Isolation 
###### (d) Deadlock-freedom 

<span style="color:rgb(0, 176, 240)">A1)</span>  <span style="color:rgb(146, 208, 80)">(d) Deadlock-freedom</span> 

---
###### <span style="color:rgb(0, 176, 240)">Q2)</span> If the transaction is in which of the state what we can guarantee that data base is in consistent state.
###### a) aborted
###### b) committed
###### c) both aborted & committed
###### d) none

<span style="color:rgb(0, 176, 240)">A2)</span>   <span style="color:rgb(146, 208, 80)">c) both aborted & committed</span>



---
# Summary 





---
# References 

1. [Transactions and Concurrency Control - DBMS - GATE](https://youtu.be/FchQ6wZVqsA?si=ZKojl0XNFk85OYH6&t=1356)
2. [[DBMS Basics]]
