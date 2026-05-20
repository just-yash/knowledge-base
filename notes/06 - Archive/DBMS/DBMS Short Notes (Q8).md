
Type : #Note    
Date : 2026-05-12    
Tags :  [[DBMS]] ; [[College]]       
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# DBMS — Short Notes Scoring Notes (Q8)

> All Q8 short note topics across 2021-22 to 2024-25 PYQs Format: Answer any TWO — 5 marks each

---

## ★★ Appeared 2 Times

### Constraints on Specialization / Generalization Hierarchies

_(23-24 Regular Q8c, 24-25 Q8d)_

**Disjointness Constraints** — Can an entity belong to more than one subclass?

|Constraint|Symbol|Meaning|Example|
|---|---|---|---|
|**Disjoint**|`d`|Entity belongs to **only one** subclass|VEHICLE is either CAR or TRUCK, never both|
|**Overlapping**|`o`|Entity can belong to **multiple** subclasses|PERSON can be EMPLOYEE and STUDENT simultaneously|

**Completeness Constraints** — Must every superclass entity belong to a subclass?

|Constraint|Notation|Meaning|Example|
|---|---|---|---|
|**Total**|Double line|Every superclass entity **must** be in at least one subclass|Every SHAPE must be CIRCLE or RECTANGLE|
|**Partial**|Single line|Superclass entity **may or may not** belong to any subclass|Some PERSONS may not be EMPLOYEE or STUDENT|

**Four combinations:**

| Type                  | Meaning                             |
| --------------------- | ----------------------------------- |
| Disjoint + Total      | Must belong to exactly one subclass |
| Disjoint + Partial    | Can belong to none or one           |
| Overlapping + Total   | Must belong to at least one         |
| Overlapping + Partial | Can belong to multiple or none      |


**Note:** These constraints are defined by the designer based on real-world requirements and are enforced by the DBMS.

---

## ★ Appeared Once — From 2021-22

### Anomalies in DBMS

Database **anomalies** arise due to poorly designed relations with **redundant data**. Three types:

**1. Insertion Anomaly:** Cannot insert data about one entity without inserting data for another entity.

> _Example:_ Cannot add a new DEPARTMENT until at least one EMPLOYEE is assigned to it (if stored in same EMP-DEPT table).

**2. Deletion Anomaly:** Deleting data about one entity **inadvertently destroys** data about another entity.

> _Example:_ Deleting the last EMPLOYEE in a department removes all information about that department.

**3. Update (Modification) Anomaly:** Updating one fact requires updating multiple tuples. If only some are updated → **inconsistency**.

> _Example:_ If department name changes, it must be updated in every single employee row. Missing one causes inconsistency.

**Root cause:** Storing data about multiple entity types in a single relation (poor normalization).

**Solution:** Normalize — decompose relations to eliminate redundancy while preserving lossless join and dependency preservation.

---

### Physical and Logical Data Independence

**Data Independence:** Capacity to change schema at one level **without affecting** the schema at a higher level.

**Logical Data Independence** _(harder to achieve):_

- Change the **conceptual schema** without changing external schemas or application programs
- Example: Adding a new attribute `Phone` to `EMPLOYEE` table should not break existing views or apps
- Hard because applications are directly written against the logical structure
- Achieved through views — views absorb logical changes

**Physical Data Independence** _(easier to achieve):_

- Change the **internal/physical schema** without changing the conceptual schema
- Example: Changing index structure, file organization (heap → B+ tree), or storage device
- DBMS handles the mapping between physical and conceptual — applications are completely unaffected

**Why important:**

- Allows DB to **evolve** — new attributes added, storage optimized — without breaking existing systems
- Reduces cost and risk of database changes

---

### Transitive Dependency

**Definition:** In a relation R, FD X→Z is **transitive** if there exists attribute set Y such that:

- X → Y (Y is not a superkey of R)
- Y → Z (Z is not a prime attribute — not part of any candidate key)
- Y does not determine X (Y ↛ X)

Then Z is **transitively dependent** on X via Y.

**Example:**

```
EMP_DEPT(SSN, Ename, Dnum, Dname, Dmgr_SSN)
FDs: SSN → Dnum, Dnum → {Dname, Dmgr_SSN}
→ Dname is transitively dependent on SSN via Dnum
```

**Problems caused:**

- **Update anomaly:** Changing department name requires updating every employee row in that department
- **Insertion anomaly:** Cannot store department info without at least one employee

**Solution — 3NF:** Decompose to remove transitive dependency:

```
EMP(SSN, Ename, Dnum)
DEPT(Dnum, Dname, Dmgr_SSN)
```

**3NF rule:** A relation is in 3NF if no non-prime attribute is transitively dependent on the primary key.

---

### De-normalization

**Definition:** **Intentional introduction of redundancy** into a normalized schema to improve read/query performance.

**When to use:**

- Read-heavy systems (data warehouses, reporting dashboards)
- Normalized schema causes too many expensive joins
- Query performance is unacceptable after profiling

**Common techniques:**

- Combine related tables (reverse a decomposition)
- Store derived/computed values (store `Age` instead of computing from `DOB`)
- Add redundant foreign key columns to avoid joins
- Pre-join frequently joined tables into a single wide table

**Trade-offs:**

|Benefit|Cost|
|---|---|
|Faster SELECT queries|Extra storage space|
|Fewer joins needed|Update/insert/delete anomalies|
|Simpler query logic|Risk of data inconsistency|
|Better reporting performance|Requires careful application-level management|

**Rule:** Always **normalize first**. De-normalize only after **profiling proves** it is necessary. Document every de-normalization decision.

---

## ★ Appeared Once — From 2023-24 Back Paper

### Deadlock Prevention Protocols

A **deadlock** occurs when two or more transactions wait indefinitely for each other to release locks — a circular wait.

**Protocol 1 — Wait-Die (Non-preemptive):**

- Each transaction gets a timestamp when it starts; older = smaller TS
- If T_i requests a lock held by T_j:
    - TS(T_i) < TS(T_j) → T_i **waits** (older waits for younger)
    - TS(T_i) > TS(T_j) → T_i **dies** (aborted and restarted with original timestamp)

**Protocol 2 — Wound-Wait (Preemptive):**

- If T_i requests a lock held by T_j:
    - TS(T_i) < TS(T_j) → T_i **wounds** T_j (T_j is aborted, T_i gets the lock)
    - TS(T_i) > TS(T_j) → T_i **waits**

**Protocol 3 — No Waiting:**

- If a transaction cannot immediately get a lock → **abort immediately** without waiting
- Prevents deadlock entirely but causes frequent unnecessary aborts

**Detection-based approach (instead of prevention):**

- Allow deadlocks to occur; detect using **Wait-for Graph**
- If cycle exists in graph → deadlock detected → abort one victim transaction

---

### System Lock Tables

A **system lock table** is maintained by the **lock manager** to track all locks granted or waiting in the system.

**Entry structure (basic binary lock):**

```
<Data-item-name, Lock, Locking-transaction>
```

**Entry structure (shared/exclusive lock):**

```
<Data-item-name, Lock-type, No-of-reads, Locking-transaction(s)>
```

**Lock types:**

- `read-locked` (shared) — multiple transactions can hold simultaneously; no writes allowed
- `write-locked` (exclusive) — only one transaction; no other reads or writes allowed

**Rules enforced by lock manager:**

1. Transaction must issue `lock_item(X)` before any `read_item(X)` or `write_item(X)`
2. After work is done, must issue `unlock_item(X)`
3. Cannot issue `read_lock(X)` if X is write-locked by another transaction
4. Cannot issue `write_lock(X)` if X is read-locked OR write-locked by another transaction

**Unlock operation:** Sets lock to 0, wakes one waiting transaction, assigns X to it.

---

### Query Graph

A **query graph** is a graphical (visual) representation of a relational calculus or relational algebra query.

**Components:**

- **Relations** — represented by circles/ellipses
- **Join conditions** — represented by edges between relation nodes
- **Constant values** — represented by double circles or rectangles
- **Attributes to retrieve** — shown above the relation circle

**Example:** Query: _"Find LN, Address, BDate of managers working on project at Stafford"_

```
Relations: PROJECT (P), DEPARTMENT (D), EMPLOYEE (E)
Join conditions:
  P.Dnum = D.Dnum  (edge between P and D)
  D.Mgr_SSN = E.SSN  (edge between D and E)
Constant: P.Ploc = 'Stafford'
Retrieve: {E.LN, E.Address, E.BDate}
```

**Advantages:**

- Visual — easier to understand the query structure
- Useful for explaining query to non-technical users
- Helps in visualizing joins and conditions

**Disadvantage:**

- Order of operations is **not specified** — optimizer must decide join order separately
- Less useful for optimization compared to query tree

---

### Dirty Read Problem

Also called **Temporary Update Problem** or **Uncommitted Data Problem**.

**Scenario:**

1. Transaction T1 updates data item X
2. T1 has **NOT committed** yet
3. Transaction T2 **reads the updated (dirty) value** of X
4. T1 then **fails and rolls back** → X restored to original value
5. T2 has used a value that **never officially existed** → database is inconsistent

**Example:**

```
Initial: X = 100
T1: read(X) → write(X=50)    [X is now 50 in DB, uncommitted]
T2:              read(X)     [T2 reads X=50 — DIRTY READ]
T1: ROLLBACK                 [X restored to 100]
T2 used X=50 which no longer exists → inconsistency
```

**Problems caused:** Incorrect computations, wrong decisions, cascading rollbacks

**Solutions:**

- **Cascadeless schedules** — T2 cannot read X until T1 commits
- **Strict 2PL** — Hold write locks until commit; prevents any read of uncommitted data
- Isolation level `READ COMMITTED` prevents dirty reads

---

## ★ Appeared Once — From 2023-24 Regular

### Data Warehousing Characteristics

A **data warehouse** is a large integrated collection of data designed to support **decision-making** (not day-to-day operations).

**4 Key Characteristics (Inmon's definition):**

**1. Subject-Oriented:**

- Organized around key subjects (Sales, Customers, Products)
- Focuses on needs of decision makers, NOT operational transactions
- Excludes data irrelevant to decision support

**2. Integrated:**

- Data from **multiple heterogeneous sources** (OLTP systems, flat files, external sources)
- Cleaned, transformed, and integrated with **consistent naming, encoding, and measurement**
- Example: Gender stored as M/F in one system, 0/1 in another → unified as Male/Female

**3. Time-Variant:**

- Historical data stored over long periods (5–10 years)
- Every record has a **time dimension** (snapshot with timestamp)
- Allows trend analysis and comparison over time

**4. Non-Volatile:**

- Data is **loaded once** and then only **read** for analysis
- No real-time updates or deletes during normal use
- Only two operations: initial data load and data access/query

**Additional features:** Uses OLAP, star/snowflake schema, optimized for complex aggregations.

---

### Multiversion Concurrency Control (MVCC)

**Core idea:** Instead of locking and blocking, maintain **multiple versions** of each data item. Reads access an older version; writes create new versions. This eliminates most read-write conflicts.

**How it works:**

- Each `write_item(X)` creates a new version `Xᵢ` with a timestamp
- Each version stores: `value`, `read_TS` (latest transaction that read it), `write_TS` (transaction that wrote it)
- When transaction T reads X: system provides the **most recent version** of X whose `write_TS ≤ TS(T)`
- When transaction T writes X: creates new version with `write_TS = TS(T)`; if `TS(T) < read_TS(X)` → abort T

**Advantages:**

- Read operations are **never blocked** — reads always find an appropriate version
- Higher concurrency than locking — reads don't conflict with writes
- No read locks needed

**Disadvantages:**

- **Storage overhead** — multiple versions must be stored
- **Garbage collection** required — old versions must be periodically cleaned up
- Write-write conflicts still require conflict resolution

**Used in:** PostgreSQL, Oracle, MySQL InnoDB, MongoDB

---

### Selectivity + Cost Estimates in Query Optimization

**Selectivity (sl):**

- Fraction of tuples that **satisfy a selection condition**
- `sl = (tuples satisfying condition) / (total tuples in relation)`
- Range: 0 to 1 — **lower = more selective** = fewer tuples returned

**Key catalog statistics used:**

- `n(R)` — number of tuples in relation R
- `B(R)` — number of disk blocks
- `V(A, R)` — number of distinct values of attribute A in R
- `sl(A = v)` — estimated as `1 / V(A, R)` for equality condition

**Cost formulas:**

|Method|Cost|
|---|---|
|Linear scan|B(R) block reads|
|Binary search (ordered)|log₂(B(R))|
|Primary index + equality|height(index) + 1|
|Secondary index + equality|height(index) + sl × n(R)|

**Purpose:** The query optimizer uses selectivity estimates to:

- Choose **which index** to use
- Decide **join order** (most selective first)
- Pick the **cheapest execution plan** without actually executing the query

---

## ★ Appeared Once — From 2024-25

### Data Fragmentation

**Definition:** In distributed databases, dividing a global relation into **fragments** stored at different geographic sites.

**Types:**

**1. Horizontal Fragmentation:**

- Divides by **rows** — each fragment is a subset of tuples satisfying a condition
- Example: `EMP_INDIA = σ(Country='India')(EMPLOYEE)`, `EMP_USA = σ(Country='USA')(EMPLOYEE)`
- Reconstruction: `UNION` of all horizontal fragments

**2. Vertical Fragmentation:**

- Divides by **columns** — each fragment has a subset of attributes + PK
- Example: `EMP1(SSN, Name, Address)` and `EMP2(SSN, Salary, Dnum)`
- Reconstruction: `NATURAL JOIN` of all vertical fragments

**3. Mixed (Hybrid) Fragmentation:**

- Combination of horizontal and vertical on the same relation

**Properties a good fragmentation must satisfy:**

1. **Completeness** — Every data item in R is in at least one fragment
2. **Reconstruction** — R can be fully reconstructed from its fragments (using UNION or JOIN)
3. **Disjointness** — _(For horizontal)_ No tuple appears in more than one fragment

---
## Thomas's Write Rule

**Context:** A modification to the Basic Timestamp Ordering (BTO) protocol that reduces unnecessary transaction aborts.

**Basic Timestamp Ordering — the problem it fixes:**

In BTO, if transaction T tries to write item X and TS(T) < write_TS(X), T is **aborted** — because a newer transaction already wrote X, making T's write obsolete.

Thomas's Write Rule says: **don't abort T — just ignore (skip) the write.**

The value T wants to write is already outdated. A newer transaction has overwritten it. So T's write has zero effect on the final database state — silently skipping it is safe.

**Full Timestamp Ordering Protocol with Thomas's Rule:**

When T issues write(X):

|Condition|Action|
|---|---|
|TS(T) < read_TS(X)|**Abort T** — a newer transaction already read X; T's write would corrupt that read retroactively|
|TS(T) < write_TS(X)|**Ignore the write** _(Thomas's Rule)_ — a newer transaction already wrote X; T's write is obsolete|
|TS(T) ≥ both|**Execute write**, set write_TS(X) = TS(T)|

Read operations are handled the same as BTO (abort if TS(T) < write_TS(X)).

**Example:**

Transactions T1 (TS=1), T2 (TS=2). Suppose T2 already wrote X → write_TS(X) = 2.

Now T1 tries to write X:

- TS(T1) = 1 < write_TS(X) = 2
- **BTO:** Abort T1
- **Thomas's Rule:** Skip T1's write silently. T1 continues execution.

T1's write would have been immediately overwritten by T2's write anyway — aborting it was wasteful.

**Advantage:**

- Fewer unnecessary transaction aborts → higher throughput
- Transactions complete more often without restarting

**Trade-off:**

- Produces schedules that are **view serializable** but **not necessarily conflict serializable**
- Allows some non-conflict-serializable schedules that are still correct
- Basic BTO guarantees conflict serializability; Thomas's Rule sacrifices that for performance

**One-line summary:**

> Thomas's Write Rule skips an obsolete write instead of aborting the transaction — reducing rollbacks at the cost of giving up conflict serializability.

---

### Data Marts

**Definition:** A **data mart** is a focused subset of a data warehouse containing data relevant to a **specific department, subject area, or business function**.

**Types:**

- **Dependent data mart** — Created directly from the central enterprise data warehouse (top-down approach)
- **Independent data mart** — Created separately directly from operational sources, without a central warehouse
- **Hybrid data mart** — Combines data from both central warehouse and operational sources

**Characteristics:**

- Smaller scope than a data warehouse (department-level vs enterprise-level)
- Optimized for **specific analytical needs** (e.g., Sales mart, HR mart, Finance mart)
- Faster query response due to smaller size
- Easier and cheaper to design and implement
- Serves a specific group of users (e.g., Marketing team uses Marketing data mart)

**Comparison:**

|Data Warehouse|Data Mart|
|---|---|
|Enterprise-wide scope|Department-specific scope|
|Terabytes of data|Gigabytes of data|
|Top-down design approach|Bottom-up design approach|
|Months/years to build|Weeks to build|
|Single centralized system|Can be distributed|
|Used by analysts across org|Used by specific team/dept|

---
# References 

- [[Database Management System (DBMS) - CSE 14th.pdf]]
- [[DBMS 4th Sem.pdf]]