
Type : #Note    
Date : 2026-05-12    
Tags :  [[DBMS]] ; [[College]]       
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# DBMS — 1-Mark Scoring Notes

> All Q1 topics across 2021-22 to 2024-25 PYQs

---
## ★★★ Appeared 3 Times — Highest Priority

### 1. NULL Values — Why Handling is Difficult

- NULL ≠ 0 or blank — it means **unknown, missing, or not applicable**
- Comparisons with NULL produce **UNKNOWN** (not TRUE/FALSE) — causes 3-valued logic
- Aggregate functions (SUM, AVG) **ignore NULLs** — results can be misleading
- Complicates join operations — NULL does not match any value, including another NULL
- Recommended to **avoid NULL values** wherever possible during schema design

---
### 2. DB Schema vs State (Intention vs Extension)

|                 | Schema (Intension/Intention)    | State (Extension/Snapshot)            |
| --------------- | ------------------------------- | ------------------------------------- |
| **Definition**  | Structure/description of the DB | Actual data stored at a point in time |
| **Changes**     | Rarely (at design time)         | Every insert/update/delete            |
| **Also called** | Intension, DB description       | Instance, extension, DB state         |

**Example:**

- Schema = `STUDENT(Name, SSN, Age, GPA)`
- State = the actual rows/tuples stored right now

---
### 3. JOIN Operations

**Inner JOIN:** Returns only matching tuples. Non-matching tuples are **discarded**.

**Outer JOIN types:**

|Type|Symbol|Returns|
|---|---|---|
|Left Outer|⟕|All tuples of left + matching of right (NULLs for non-matches)|
|Right Outer|⟖|All tuples of right + matching of left|
|Full Outer|⟗|All tuples from both; NULLs where no match|

**Methods for implementing joins:**

1. **Nested Loop Join** — For each tuple in R, scan all of S
2. **Single Loop Join (Index-based)** — For each tuple in R, use index on S to find match
3. **Sort-Merge Join** — Sort both relations on join attribute, then merge

---

## ★★ Appeared 2 Times — High Priority

### 4. Entity Integrity + Referential Integrity

**Entity Integrity:**

- Primary key attribute(s) of any relation **cannot be NULL**
- Every tuple must be uniquely identifiable
- No part of a composite PK can have a NULL value

**Referential Integrity:**

- A FK value in relation R1 must either **match a PK value in R2** or be **NULL**
- R1 = referencing relation, R2 = referenced relation
- Prevents orphan records (references to non-existent entities)

Both constraints are enforced by the DBMS at all times.

---

### 5. Informal Guidelines for Relational Schema Design

1. **Semantics of attributes** — Each attribute should have one clear meaning; don't mix data from multiple entity types in one relation
2. **Reduce redundancy** — Storing same info in multiple tuples causes update anomalies
3. **Reduce NULLs** — Avoid attributes that are frequently NULL; create separate relations instead
4. **Disallow spurious tuples** — Decomposition must be lossless; joining decomposed relations must return exact original relation

---

### 6. Dangling Tuple

- A **dangling tuple** is a tuple that does not join with **any** tuple in another relation in a join operation
- These tuples are **lost** in an INNER JOIN but **retained** with outer joins (filled with NULLs)

**Example:**

- Employee with `Dno = 7` but no Department with `Dnum = 7` exists
- That employee tuple "dangles" — lost in `EMPLOYEE ⋈ DEPARTMENT`

---

## ★ Appeared Once — Know These Cold

### 7. 3-Tier Architecture of DBMS

Three levels of abstraction:

- **External Level (View Level):** How individual users/applications see the data — multiple views possible
- **Conceptual Level:** Complete logical structure of DB — entities, relationships, constraints; independent of storage
- **Internal Level (Physical Level):** How data is physically stored on disk — indexes, file organization, storage paths

**Goal:** Achieve **data independence** — changing lower level doesn't force changes at higher levels

---

### 8. DBMS vs Traditional File System

|File System|DBMS|
|---|---|
|Data redundancy (same data in multiple files)|Controlled redundancy|
|No integrity constraints enforced|Constraints enforced automatically|
|No concurrent access control|Multi-user concurrency with locking|
|No recovery mechanism|Backup and recovery built-in|
|Programs depend on file structure|Data abstraction — program-data independence|
|No security control|Role-based access control|

---
### 9. Types of Relationships in DBMS

- **1:1** — One entity in A maps to one entity in B (Employee manages one Department)
- **1:N** — One in A maps to many in B (Department has many Employees)
- **M:N** — Many in A map to many in B (Employee works on many Projects)
- **Recursive** — Entity relates to itself in different roles (Employee supervises Employee)
- **Weak entity relationship** — Existence depends on owner entity (Dependent of Employee)

---
### 10. Data Abstraction Levels

Three levels:

1. **Physical/Internal** — HOW data is stored (file structures, indexes, storage blocks)
2. **Conceptual/Logical** — WHAT data is stored (entities, attributes, relationships, constraints)
3. **External/View** — HOW specific users see a portion of data

**Two types of Data Independence:**

- **Logical** — Change conceptual schema without affecting external views _(harder to achieve)_
- **Physical** — Change internal schema without affecting conceptual schema _(easier)_

---

### 11. TRC and DRC (Short Definitions)

**TRC — Tuple Relational Calculus:**

- Non-procedural; specifies WHAT not HOW
- Uses tuple variables that range over relation tuples
- Syntax: `{t | COND(t)}`
- Example: `{t | EMP(t) AND t.Salary > 30000}`

**DRC — Domain Relational Calculus:**

- Uses domain variables (individual attribute values, not whole tuples)
- Order of attributes matters
- Syntax: `{x₁, x₂, ... xₙ | COND(x₁, x₂, ...)}`
- Example: `{u, v | EMP(q,r,s,t,u,v,w,x,y,z) AND q = 'John'}`

Both are **relationally complete** (equivalent in expressive power to RA).

---

### 12. Aggregation and Atomicity

**Aggregation:**

- An abstraction in EER where a **relationship** between entities is treated as a **higher-level entity**
- Used when a relationship itself needs to participate in another relationship
- Example: `{Instructor GUIDES Student on Project}` relationship being evaluated — aggregated as a unit

**Atomicity (Transaction Property):**

- A transaction must be **all-or-nothing** — either fully completed or not executed at all
- If any operation in a transaction fails → **entire transaction is rolled back**
- Part of ACID properties

---

### 13. FD vs Multivalued Dependency

**Functional Dependency (X → Y):**

- For any two tuples with same X values, Y values must also be same
- One-to-one mapping: each X value determines exactly one Y value
- Example: `SSN → Ename`

**Multivalued Dependency (X →→ Y):**

- For a given X, there is a **set** of Y values independent of other attributes Z in R
- One-to-many: each X value determines a set of Y values
- Example: `Employee →→ Skills` and `Employee →→ Dependents` (independent of each other)
- Causes 4NF violations; not detectable by 3NF/BCNF

---

### 14. Integrity Rules in DBMS

1. **Entity Integrity** — PK cannot be NULL
2. **Referential Integrity** — FK must reference an existing PK value or be NULL
3. **Domain Integrity** — Attribute values must be within the defined domain (data type, range, format)
4. **Key Integrity** — No two tuples can have identical PK values (uniqueness)

---

### 15. Defining / Manipulating / Sharing a Database

**Defining:**

- Specifying data types, structures, constraints for the database
- Stored in the **data dictionary / system catalog** (metadata)

**Manipulating:**

- Querying data (SELECT/retrieval)
- Updating data (INSERT, UPDATE, DELETE)
- Generating reports

**Sharing:**

- Allowing multiple users and applications to access the same database **simultaneously**
- Requires concurrency control to prevent conflicts

---

### 16. Relationship Instance vs Type vs Set

**Relationship Type:**

- Schema — defines which entity types participate and how
- Example: `WORKS_FOR` between `EMPLOYEE` and `DEPARTMENT`

**Relationship Instance:**

- A specific association between two (or more) entity instances
- Example: Employee "John" WORKS_FOR Department "Research"

**Relationship Set:**

- The **collection of all current relationship instances** of a relationship type at a given time
- Changes as data changes

---

### 17. Attribute Closure (X⁺)

**Definition:** The set of all attributes that can be **functionally determined** from attribute set X, given a set of FDs F.

**Algorithm:**

1. Start: X⁺ = X
2. For each FD Y→Z in F: if Y ⊆ X⁺, add Z to X⁺
3. Repeat until X⁺ doesn't change

**Uses:**

- If X⁺ = all attributes → X is a **superkey**
- If X⁺ = all attributes and no proper subset of X is also a superkey → X is a **candidate key**
- Check if a specific FD X→Y holds: check if Y ⊆ X⁺

---

### 18. Serializability for Concurrency Control

**Why needed:** Multiple transactions running concurrently can produce inconsistent results.

**Serial schedule:** Transactions execute one after another — no interleaving. Always correct but slow.

**Serializable schedule:** An interleaved schedule whose **result is equivalent** to some serial execution of the same transactions.

**Why useful:** Allows performance benefits of concurrency while guaranteeing correctness of serial execution. DBMS tests for serializability (using precedence graph) without actually running serially.

---

### 19. Stored vs Derived Attributes

**Stored Attribute:**

- Physically stored in the database
- Example: `DateOfBirth`

**Derived Attribute:**

- Computed from other stored attributes; **not physically stored**
- Example: `Age` = computed from `DateOfBirth` + current date
- Example: `TotalSalary` = computed from individual salaries

Derived attributes shown with **dashed oval** in ER diagrams.

---

### 20. Lossless Join Property

A decomposition of R into {R1, R2} has **lossless join** if: `R1 ⋈ R2 = R` (natural join returns exactly the original relation — no spurious/fake tuples)

**Condition (for binary decomposition):** Either:

- FD: (R1 ∩ R2) → (R1 - R2) is in F⁺, **OR**
- FD: (R1 ∩ R2) → (R2 - R1) is in F⁺

**Why important:** Ensures no data is lost or fabricated after decomposition. Without this, rejoining fragments creates **spurious tuples** (incorrect extra rows).

---

### 21. Search Algorithms for SELECT

|Algorithm|Condition for Use|
|---|---|
|**S1 — Linear Search**|Always applicable; scan all blocks|
|**S2 — Binary Search**|Equality/range on **ordered non-key** field|
|**S3 — Primary Index (Hash)**|Equality on **key** field with hash index → direct block access|
|**S4 — Primary Index (Ordered)**|Range condition on **ordering key** field|
|**S5 — Clustering Index**|Equality on **non-key ordering** field|
|**S6 — Secondary Index**|Equality on **non-ordering** field with secondary index|
|**S7 — Conjunctive selection**|Multiple conditions — use most selective index first|

---

### 22. View Equivalent Schedules

Two schedules S and S' are **view equivalent** if:

1. **Same transactions** participate in both
2. For each `read_i(X)` in S — if the value was written by `write_j(X)`, same must hold in S'
3. The **final write** on each data item X is the same transaction in both

A schedule is **view serializable** if it is view equivalent to any serial schedule.

Note: View serializability is a **weaker** condition than conflict serializability — all conflict serializable schedules are view serializable, but not vice versa.

---

### 23. Read-item / Write-item Operations

**read_item(X):**

1. Find disk block address containing X
2. Copy block into memory buffer
3. Copy value of X from buffer to program variable

**write_item(X):**

1. Find disk block address containing X
2. Copy block into memory buffer
3. Copy new value of X from program variable into buffer
4. Write updated buffer block back to disk

These are the **basic database operations** underlying all transactions.

---

### 24. Distributed DB Transparency Features

|Transparency|Meaning|
|---|---|
|**Location**|User need not know WHERE data is stored|
|**Replication**|User unaware that multiple copies of data exist|
|**Fragmentation**|User unaware data is split across sites|
|**Failure**|System continues operating despite partial node failures|
|**Concurrency**|Multiple users see consistent data despite concurrent access|
|**Performance**|System optimizes queries across sites automatically|

---

### 25. DBMS Capabilities

A DBMS must provide:

- **Data definition** — DDL to define schema, types, constraints
- **Data manipulation** — DML to query and update (INSERT, UPDATE, DELETE, SELECT)
- **Data sharing** — Multi-user concurrent access with consistency
- **Data security** — Access control (authorization, authentication)
- **Integrity enforcement** — Entity, referential, domain constraints
- **Backup and recovery** — Restore DB after failures
- **Data independence** — Physical and logical independence
- **Query optimization** — Efficient execution plans

---

### 26. Database Utilities

|Utility|Function|
|---|---|
|**Loading**|Loads existing data files into DB; auto-reformats source file format to DB format|
|**Backup**|Creates backup copy to recover from failures; incremental backups record changes only|
|**File Reorganization**|Reorganizes DB file into different file organization for better performance|
|**Performance Monitoring**|Monitors DB usage statistics; provides info to DBA for tuning|

---

### 27. Relationally Complete

A query language is **relationally complete** if it can express **any query** that can be expressed in Relational Algebra.

- RA is the **baseline standard** for completeness
- TRC and DRC are relationally complete (equivalent to RA)
- SQL is relationally complete + more (has aggregate functions, GROUP BY)
- A language missing even one RA operation (e.g., cannot do DIFFERENCE) is NOT relationally complete

---

### 28. Recursive Relationship Type

A **recursive** (self-referencing) relationship is when the **same entity type** participates **more than once** in a relationship, in different roles.

**Examples:**

- `EMPLOYEE` **supervises** `EMPLOYEE` (Supervisor role vs Supervisee role)
- `EMPLOYEE` **is_married_to** `EMPLOYEE`
- `PART` **has_subpart** `PART` (Assembly role vs Component role)

**Key point:** Role names are **mandatory** to distinguish the two participations of the same entity type.

---

### 29. Join Dependency + 5NF

**Join Dependency (JD):**

- Relation R has JD _(R1, R2, ..., Rn)_ if R = R1 ⋈ R2 ⋈ ... ⋈ Rn
- A generalization of MVD — MVD is a special case of JD with two projections

**5NF (Project-Join Normal Form / PJNF):**

- A relation R is in 5NF if for every **non-trivial JD** _(R1, R2, ..., Rn)_ in R, each Ri is a **superkey** of R
- Eliminates redundancy caused by JDs not implied by candidate keys

**Why called PJNF:** Because violations are detected and fixed by project-join operations.

---

### 30. Constrained vs Unconstrained Write

**Constrained write:**

- Transaction **reads X first**, then writes a new value based on the old value
- New value depends on old value → `X = X + 100`
- Most realistic — represents actual business logic

**Unconstrained (Blind) write:**

- Transaction writes X **without reading it first**
- New value is completely independent of old value → `X = 500`
- Rare in practice; used in view serializability analysis

**More realistic:** Constrained write — virtually all updates in real systems depend on current values.

---

### 31. Shadow Paging Recovery

**Mechanism:**

- DB is divided into fixed-size pages
- Maintain **two page tables**: _current_ and _shadow_
- Shadow page table is **never modified** during a transaction (kept on disk as backup)
- During transaction: only current page table is updated

**On COMMIT:** Shadow is overwritten with current page table → shadow becomes permanent record **On ABORT/Crash:** Discard current page table, restore from shadow → automatic recovery

**Does NOT require a log when:**

- Operating in single-user mode
- Complete recovery achievable from shadow page table alone

**Disadvantage:** High overhead for large DBs; requires garbage collection of old pages; costly for long transactions.


---
# References 

- [[Database Management System (DBMS) - CSE 14th.pdf]]
- [[DBMS 4th Sem.pdf]]
