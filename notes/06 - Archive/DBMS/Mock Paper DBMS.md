
# INDIRA GANDHI INSTITUTE OF TECHNOLOGY, SARANG

**4th Semester Regular Examination — Predicted Paper** **Subject Name: Database Management System | Subject Code: PCCS4205** **Branch: Computer Science & Engineering | Time: 03 Hours | Maximum Marks: 60**

**Answer Question No. 1 which is compulsory and any five from the rest. Each question carries marks as indicated in the right-hand margin.**

---

## Q1. Answer the following questions. `(1×10)`

**(a)** State all four ACID properties of a transaction and explain in one line what each guarantees.

**(b)** What is the difference between a dense index and a sparse index? When would you prefer a sparse index over a dense one?

**(c)** List all five states of a transaction and briefly describe the condition under which a transaction transitions from the "partially committed" state to the "failed" state.

**(d)** What is a checkpoint in database recovery? Why does a DBMS periodically write checkpoints to the log?

**(e)** What is the phantom read problem in concurrent transaction processing? Give a one-line example.

**(f)** Differentiate between OLTP and OLAP systems with respect to their query patterns and data freshness requirements.

**(g)** What is write-ahead logging (WAL)? State the two rules it enforces.

**(h)** What is a system catalog (data dictionary)? What kind of metadata does it store?

**(i)** Define a correlated subquery in SQL. How does its execution differ from an uncorrelated nested subquery?

**(j)** What is the Two-Phase Commit (2PC) protocol? In which context is it used?

---

## Q2. `(5+5)`

**Topic: File Organization and Index Structures (Module II)**

**(a)** Show the step-by-step construction of a B+ tree of order 3 (maximum 2 keys per node) by inserting the following values one at a time in the order given: **5, 10, 15, 20, 25, 8, 12**. Draw the tree after every split occurs and clearly label leaf nodes and internal nodes. `(5)`

**(b)** A relation R has 50,000 records. Each disk block can hold 25 records (blocking factor = 25). A primary sparse index is built on the ordering key field with one index entry per disk block of data. Each index block can hold 50 index entries. Compute: (i) the number of data file blocks, (ii) the number of primary index blocks, (iii) the number of block accesses needed to retrieve a record using linear search on the data file, (iv) the number of block accesses using binary search on the data file, and (v) the number of block accesses using binary search on the primary index followed by one data block access. Comment on which method is most efficient. `(5)`

---

## Q3. `(5+5)`

**Topic: SQL Queries — Multi-table, Aggregation, Subqueries (Module III)**

Use the following schema for both parts. This is the Company database from your course:

`EMPLOYEE(SSN, FName, LName, BDate, Address, Sex, Salary, SuperSSN, DNo)` `DEPARTMENT(DNumber, DName, MgrSSN, MgrStartDate)` `PROJECT(PName, PNumber, PLoc, DNum)` `WORKS_ON(ESSN, PNo, Hours)` `DEPENDENT(ESSN, DepName, Sex, BDate, Relationship)`

**(a)** Write SQL queries for each of the following: `(5)`

(i) Retrieve the first name, last name, and total hours worked of every employee who works on more than two projects.

(ii) For each department that has more than four employees, retrieve the department name and the average salary of employees in that department.

(iii) Find the names of all employees who have **no dependents**. Use a subquery approach.

(iv) List the project name and the count of employees working on it, for only those projects that have at least three employees assigned. Order the result by employee count in descending order.

**(b)** Explain the difference between a correlated and an uncorrelated subquery with a concrete example from the COMPANY schema. Then rewrite your answer to Q3(a)(iii) using a correlated subquery instead of an uncorrelated one. Explain why both produce the same result. `(5)`

---

## Q4. `(5+5)`

**Topic: Normalization — Complex FD Problem + 4NF / MVD (Module III)**

**(a)** Consider the following universal relation for a university registration system: `(5)`

`R(StudentID, CourseID, CourseName, InstructorID, InstructorName, InstructorDept, Grade, TextbookID, TextbookTitle)`

The following functional dependencies hold:

- {StudentID, CourseID} → Grade
- CourseID → CourseName, InstructorID, TextbookID
- InstructorID → InstructorName, InstructorDept
- TextbookID → TextbookTitle

(i) Identify the candidate key of R. (ii) Identify all partial dependencies and transitive dependencies. (iii) State which normal form R currently satisfies (1NF, 2NF, or 3NF) and justify your answer. (iv) Decompose R fully into BCNF relations. Verify that your decomposition is lossless.

**(b)** Consider the relation `TEACH(Professor, Course, Textbook)` with the following multivalued dependencies: `(5)`

- Professor →→ Course (a professor teaches multiple courses)
- Professor →→ Textbook (a professor recommends multiple textbooks)

Courses and textbooks are independent of each other for a given professor. Show the data anomaly that arises in this relation with a concrete example instance. Determine whether TEACH is in 4NF. If not, decompose it into 4NF relations and verify that the non-additive join property holds for your decomposition.

---

## Q5. `(5+5)`

**Topic: Query Processing and Optimization (Module III)**

**(a)** Consider the following SQL query on the COMPANY schema: `(5)`

```sql
SELECT E.LName, E.FName, P.PName
FROM EMPLOYEE E, WORKS_ON W, PROJECT P
WHERE E.SSN = W.ESSN
  AND W.PNo = P.PNumber
  AND P.PLoc = 'Stafford'
  AND E.Salary > 45000;
```

(i) Represent this query as an initial (canonical) query tree using Cartesian products and selections. (ii) Apply the heuristic optimization rules in order: push all selections as far down the tree as possible, replace Cartesian products combined with selection conditions by join operations, and then push projections down to eliminate unnecessary attributes at each step. (iii) Draw the optimized query tree and explain in one sentence why each step reduces cost.

**(b)** A join operation is to be performed between EMPLOYEE (1000 tuples, 100 blocks) and DEPARTMENT (50 tuples, 5 blocks). The available memory buffer holds 10 blocks. Compute the estimated cost (in block accesses) for: (i) simple nested-loop join using EMPLOYEE as the outer relation, (ii) block-based nested-loop join, and (iii) sort-merge join assuming both relations are already sorted on the join attribute. State which algorithm you would choose and why. `(5)`

---

## Q6. `(5+5)`

**Topic: Concurrency Control — Conflict Serializability + Timestamp Protocol (Module IV)**

**(a)** Consider the following schedule involving three transactions T1, T2, and T3: `(5)`

`S: r1(A); r2(B); w3(A); r1(B); w2(A); r3(C); w1(B); w2(C); c3; c1; c2`

(i) Identify all pairs of conflicting operations and state the type of conflict for each pair (read-write, write-read, or write-write). (ii) Construct the precedence (serializability) graph. (iii) Determine whether the schedule is conflict serializable. If yes, give the equivalent serial order. If no, explain why and determine whether it might still be view serializable.

**(b)** Three transactions T1, T2, and T3 arrive with timestamps TS(T1)=1, TS(T2)=2, TS(T3)=3. Initially for all data items: read_TS = 0 and write_TS = 0. The following operations arrive in sequence: `(5)`

`r2(X), w1(X), r3(X), w2(Y), r1(Y), w3(X), w1(Y)`

Apply the **basic timestamp ordering protocol** to each operation. For each operation, state the current read_TS and write_TS values, determine whether the operation is executed or the transaction is aborted, and update the timestamps if the operation proceeds. Show your working for each step.

---

## Q7. `(5+5)`

**Topic: Transaction Recovery — WAL Protocol + Distributed Transactions (Module IV)**

**(a)** A database system uses write-ahead logging. The system log at the time of a crash contains the following entries in order: `(5)`

```
[start, T1]
[write, T1, A, old=500, new=700]
[start, T2]
[write, T2, B, old=300, new=400]
[write, T1, C, old=100, new=150]
[commit, T1]
[checkpoint]
[start, T3]
[write, T3, A, old=700, new=900]
[write, T2, D, old=200, new=250]
[start, T4]
[write, T4, C, old=150, new=180]
--- SYSTEM CRASH ---
```

(i) Identify which transactions need to be **redone** and which need to be **undone** after crash recovery. Justify your classification. (ii) Specify the final values of A, B, C, and D after recovery is complete, assuming the last written values to disk before the crash were: A=700, B=300, C=150, D=200.

**(b)** Explain the Two-Phase Commit (2PC) protocol for distributed transaction management. Describe both Phase 1 (voting phase) and Phase 2 (decision phase). What happens when the coordinator fails after sending "PREPARE" messages but before the decision is made? Why is this called the blocking problem of 2PC? `(5)`

---

## Q8. Short Notes — Answer any TWO. `(5×2)`

**(a)** RAID — explain levels 0, 1, and 5. For each level, describe how data is stored, what the fault tolerance is, and what the read/write performance trade-off is. Which level would you recommend for a high-transaction banking system?

**(b)** Extendible Hashing — explain how the directory and local depth work. Show with an example what happens when a bucket overflows and a split occurs.

**(c)** Write-Ahead Logging (WAL) Protocol — state both WAL rules formally, explain why each rule is necessary for recovery correctness, and describe how the UNDO and REDO operations use the log to restore the database after a crash.

**(d)** Thomas's Write Rule — state the rule formally, explain how it modifies the basic timestamp ordering protocol, give an example where Thomas's rule allows a write that basic timestamp ordering would abort, and explain the trade-off in terms of serializability class.
