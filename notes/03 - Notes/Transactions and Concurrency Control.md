
Type : #Note    
Date :  2025-12-30  
Tags :   [[DBMS]]  
Status : #complete     
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

---
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
# Solution is Schedule
- When two or more transaction executed together or one after another then they can be bundled up into a higher unit of execution called schedule
- A schedule of $n$ transactions $T_1,$ $T_2,$ $T_3,$ $…,$ $T_n$ is an ordering of the operations of the transactions. 
- Operations from different transactions can be interleaved in the schedule $S$. 
- However, schedule for a set of transaction must contain all the instruction of those transaction and for each transaction $T_i$ that participates in the schedule $S$, the operations of $T_i$ is $S$ must appear in the same order in which they occur in $T_i$.

---
## Serial Schedule 
- A serial schedule consists of sequence if first action belonging to different transactions, where instructions belonging to one single transaction appear together.
- Before complete execution of one transaction another transaction cannot be started.
- for a set of $n$ transactions, there exists $n!$ different valid serial schedules. Every serial schedule lead database into consistent state. Throughput of system is less.
- consistent but not efficient and concurrent
###### Example : 

| $T_0$    | $T_1$    |
| -------- | -------- |
| read(A)  |          |
| write(A) |          |
| read(B)  |          |
| write(B) |          |
|          | read(A)  |
|          | write(A) |
|          | read(B)  |
|          | write(B) |

---
## Non-Serial Schedule 
- A schedule in which sequence of instructions of a transaction appear in the same order as they appear in individual transaction but the instructions may be interleaved with the instructions of different transactions 
- Concurrent execution of transactions takes place
- for a set of $n$ transactions, where each transaction conations $n_1$, $n_2$, ..., $n_n$ respectively. 
	- the total no. of possible schedules will be : $$\frac{(n_1 + n_2 + n_3 +...+n_n)}{(n_1! n_2! n_3!...n_n!)}$$
	- the total no. of possible non-serial schedules will be : $$\frac{(n_1 + n_2 + n_3 +...+n_n)}{(n_1! n_2! n_3!...n_n!)} - n!$$
	- concurrent and efficient but no guarantee of consistency
###### Example : 

| $T_2$   | $T_3$    |
| ------- | -------- |
| read(B) |          |
|         | read(B)  |
|         | write(B) |
| read(A) |          |
|         | read(A)  |
|         | write(A) |

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
## Conclusion of Schedules 
- We do not have any method of proof that a schedule is consistent
- But we can understand that a serial schedule is always consistent
- if somehow we proof that a non-serial schedule will also have same effects as of a serial schedule then we get a proof that this particular non-serial schedule will also be consistent
- "Find those schedules that are logically equal to serial schedules"

### Serializability
#### Conflicting Instructions : 
Instructions are said to be conflicting to each other if these three conditions are satisfied : 
1. They must belong to different transactions.
2. They must operate on same data value.
3. There must be at least one `write()` operation.

#### Conflict Equivalent : 
- If one schedule can be converted to another schedule by swapping of non-conflicting instruction then they are called conflict equivalent schedule 
###### Example : Conflict Equivalent Schedules

| T1         | T2         |
| ---------- | ---------- |
| R(A)       |            |
| A = A - 50 |            |
|            | R(B)       |
|            | B = B + 50 |
| R(B)       |            |
| B = B + 50 |            |
|            | R(A)       |
|            | A = A + 10 |

| T1         | T2         |
| ---------- | ---------- |
|            | R(B)       |
|            | B = B + 50 |
| R(A)       |            |
| A = A - 50 |            |
| R(B)       |            |
| B = B + 50 |            |
|            | R(A)       |
|            | A = A + 10 |

#### Conflict Serializable
- Schedules which are conflict equivalent to a serial schedule are called conflict serializable schedule. 
- if a schedule S can be transformed into a schedule S' by a series of swaps of non-conflicting instructions, we say that S and S' are conflict equivalent
- A schedule S is conflict serializable, if it is conflict equivalent to a serial schedule

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
###### <span style="color:rgb(0, 176, 240)">Q3)</span> The following schedule is suffering from ?

| T1   | T2                                |
| ---- | --------------------------------- |
| R(y) |                                   |
|      | R(x)<br>R(y)<br>y = x + y<br>W(y) |
| R(y) |                                   |
###### a) Lost Update Problem
###### b) Unrepeatable read problem 
###### c) Both A and B
###### d) Neither A nor B

<span style="color:rgb(0, 176, 240)">A3)</span> <span style="color:rgb(146, 208, 80)">b) Unrepeatable read problem</span>

---
###### Q4) Which of the following scenario may lead to unrecoverable error in a database system?
###### (A) A transaction writes a data item after it is read by an uncommitted transaction
###### (B) A transaction reads a data item after it is read by an uncommitted transaction
###### (C) A transaction reads a data item after it is written by a committed transaction
###### (D) A transaction reads a data item after it is written by an uncommitted transaction

A4) (D) A transaction reads a data item after it is written by an uncommitted transaction

---
###### Q5) Consider a schedule of transactions T1 and T2. Here, RX stands for Read(X) and WX stands for Write(X). Which one of the following schedules is conflict equivalent to the above schedule?

| T1     | T2     |
| ------ | ------ |
| RA     |        |
|        | RB     |
|        | WB     |
| RC     |        |
|        | RD     |
| WD     |        |
|        | WC     |
| WB     |        |
| Commit |        |
|        | Commit |
###### a) 

| T1     | T2     |
| ------ | ------ |
|        | RB     |
|        | WB     |
|        | RD     |
| RA     |        |
| RC     |        |
| WD     |        |
| WB     |        |
|        | WC     |
| Commit |        |
|        | Commit |

###### b) 

| T1     | T2     |
| ------ | ------ |
| RA     |        |
| RC     |        |
| WD     |        |
| WB     |        |
|        | RB     |
|        | WB     |
|        | RD     |
|        | WC     |
| Commit |        |
|        | Commit |

###### c) 

| T1     | T2     |
| ------ | ------ |
| RA     |        |
| RC     |        |
| WD     |        |
|        | RB     |
|        | WB     |
|        | RD     |
| WB     |        |
|        | WC     |
| Commit |        |
|        | Commit |

###### d) 

| T1     | T2     |
| ------ | ------ |
|        | RB     |
|        | WB     |
|        | RD     |
|        | WC     |
| RA     |        |
| RC     |        |
| WD     |        |
| WB     |        |
| Commit |        |
|        | Commit |

A5) a  

---
###### Q6) Let Ri(z) and Wi(z) denote read and write operations on a data element z by transaction Ti, respectively. Consider the schedule S with four transactions. S: R4(x) R2(x) R3(x) R1(y) W1(y) W2(x) W3(y) R4(y) Which one of the following serial schedules is conflict equivalent to S?

###### (а) Т1 → Т3 → Т4 → Т2
###### (b) Т1 → Т4 → Т3 → Т2
###### (с) Т4 → Т1 → Т3 → Т2
###### (d) Т3 → T1 → Т4 → Т2

A6)  a

| T1   | T2   | T3   | T4   |
| ---- | ---- | ---- | ---- |
|      |      |      | R(x) |
|      | R(x) |      |      |
|      |      | R(x) |      |
| R(y) |      |      |      |
| W(y) |      |      |      |
|      | W(x) |      |      |
|      |      | W(y) |      |
|      |      |      | R(y) |

![[Pasted image 20260307144405.png]]
T1 → T3 → T4 → T2

---
###### Q7) Let ri(z) and wi(z) denote read and write operations respectively on a data item z by a transaction Ti. Consider the following two schedules. 
###### S1 : r1(x) r1(y) r2(x) r2(y) w2(y) w1(x)
###### S2 : r1(x) r2(x) r2(y) w2(y) r1(y) w1(x)
###### Which one of the following options is correct?
###### a) S1 is conflict serializable, and S2 is not conflict serializable
###### b) S1 is not conflict serializable, and S2 is conflict serializable
###### c) Both S1 and S2 are conflict serializable
###### d) Neither S1 nor S2 is conflict serializable

A7)  b) S1 is not conflict serializable, and S2 is conflict serializable
S1 : 

| T1   | T2   |
| ---- | ---- |
| r(x) |      |
| r(y) |      |
|      | r(x) |
|      | r(y) |
|      | w(y) |
| w(x) |      |

S2 : 

| T1   | T2   |
| ---- | ---- |
| r(x) |      |
|      | r(x) |
|      | r(y) |
|      | w(y) |
| r(y) |      |
| w(x) |      |

S1 is not conflict serializable as it forms a cycle 
![[Pasted image 20260307225750.png]]

S2 is conflict serializable as it doesn't form a cycle
![[Pasted image 20260307225852.png]]

---




---
# Summary 





---
# References 

1. [Transactions and Concurrency Control - DBMS - GATE](https://youtu.be/FchQ6wZVqsA?si=ZKojl0XNFk85OYH6&t=1356)
2. [[DBMS Basics]]