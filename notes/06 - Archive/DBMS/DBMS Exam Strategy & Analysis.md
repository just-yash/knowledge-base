
Type : #RawNote       
Date : 2026-05-13        
Tags :  [[DBMS]] ; [[College]]  
~ ***Yash Agrawall*** ~     

---
# DBMS Exam Strategy & Analysis

---
### Phase 1 — Guaranteed Marks

**1. Normalization**

- FD definition + functional dependency intro → **Pg 42**
- Armstrong's Inference Rules (Reflexive, Augmentation, Transitive, Decomposition, Union, Pseudo-Transitive) → **Pg 43**
- Attribute Closure (X⁺) + examples → **Pg 44–45**
- Equivalence of FD sets + Minimal Cover → **Pg 45–46**
- Normal Forms intro + 1NF → **Pg 46**
- 2NF — Full FD, Partial FD, examples → **Pg 47–48**
- Transitive Dependency → **Pg 48**
- 3NF → **Pg 49**
- BCNF + SUPPL example → **Pg 49–50**
- Dependency Preservation + Lossless Join → **Pg 50**
- MVD + Trivial MVD → **Pg 51–52**
- 4NF → **Pg 52–53**
- 5NF + Join Dependency → **Pg 53–54**

---

**2. Relational Algebra**

- SELECT (σ) — syntax, cascade, commutativity → **Pg 26**
- PROJECT (π) → **Pg 27**
- RENAME (ρ) → **Pg 27**
- Sequence of operations → **Pg 27**
- Binary ops — UNION, INTERSECTION, MINUS, Cartesian Product → **Pg 28**
- JOIN (×|×) — general join → **Pg 29**
- θ-JOIN, EQUI-JOIN, NATURAL JOIN, INNER JOIN → **Pg 30**
- Division → **Pg 31**
- Query Tree → **Pg 31–32**
- Aggregate Functions + Grouping → **Pg 32**
- Outer Join (Left, Right, Full) → **Pg 33**
- Example RA queries (female employees, department managers) → **Pg 29, 33–34**

---

**3. TRC**

- TRC syntax `{t | COND(t)}` + examples → **Pg 34**
- More TRC examples (John B Smith, research dept) → **Pg 34–35**

---

**4. BCNF**

- Definition + diff from 3NF + SUPPL example → **Pg 49**
- _(Read alongside FD section on Pg 42–43 for theory)_

---

### Phase 2 — Q1 Short Answers

|Topic|Page|
|---|---|
|Schema vs State (DB state/snapshot)|**Pg 5**|
|NULL values (entering nulls, 3 cases)|**Pg 15**|
|NULL — Values and Null section|**Pg 22**|
|Informal guidelines for schema design|**Pg 41**|
|Stored vs Derived attributes|**Pg 13**|
|Entity integrity + Referential integrity|**Pg 25**|
|JOIN types (inner, outer, θ, natural)|**Pg 29–30, 33**|
|Recursive relationship types + role names|**Pg 14–15**|
|Relationally complete / Safe Expression|**Pg 36**|
|Dangling tuple|⚠️ **Not in notes**|
|Attribute closure|**Pg 44**|
|Serializability for concurrency|**Pg 68–69**|

---

### Phase 3 — 5-Mark Questions

|Topic|Page|
|---|---|
|Schedule types — serial, serializable, recoverable, cascadeless, strict|**Pg 66–67**|
|Conflict serializable + Precedence Graph|**Pg 69–70**|
|View equivalent + view serializable|**Pg 70–71**|
|3-level architecture (External, Conceptual, Internal)|**Pg 5**|
|Data independence (Logical + Physical)|**Pg 5–6**|
|Centralised architecture diagram|**Pg 10**|
|Basic client/server architecture|**Pg 10–11**|
|Three-tier client/server architecture|**Pg 12**|
|Specialization hierarchy vs lattice|**Pg 19**|
|Constraints of EER (Disjoint/Overlapping, Total/Partial)|**Pg 19**|
|Aggregation|**Pg 19–20**|
|ER diagram notation (symbols, cardinality, weak entity)|**Pg 16**|
|ER diagram examples|**Pg 17–18**|
|Data Warehousing (OLAP, Data Warehouse mention)|**Pg 2**|
|Data mining|⚠️ **Not in notes**|

---

### Phase 4 — If Time Left

|Topic|Page|
|---|---|
|Transaction basics + read/write operations|**Pg 62**|
|Problems of concurrent transactions (Lost Update, Dirty Read, Unrepeatable Read)|**Pg 63–64**|
|Transaction rollback + why recovery needed|**Pg 64**|
|Cascading rollback|**Pg 67**|
|Strict schedule|**Pg 67**|
|2PL — Expanding + Shrinking phase|**Pg 74**|
|Binary lock + Shared/Exclusive lock|**Pg 72–73**|
|Conservative, Strict, Rigorous 2PL|**Pg 75**|
|Deadlock + Wait-Die + Wound-Wait|**Pg 75–77**|
|Granularity of data items|⚠️ **Not in notes**|
|Multiversion concurrency control|⚠️ **Not in notes**|
|Shadow paging|⚠️ **Not in notes**|
|Timestamp ordering|⚠️ **Not in notes**|

---

### ⚠️ Gaps — Read from Navathe (Ch. 20–21)

These 5 topics have **zero coverage** in your notes:

- Dangling tuple
- Data mining goals
- Granularity of data items
- Multiversion concurrency control
- Shadow paging + Timestamp ordering

For tomorrow, the first two (dangling tuple, data mining) are the easiest to pick up in 10 minutes — worth it. The last three are Phase 4 only — skip if pressed for time.

---
## Q1 — Short Answers (1 mark each)

|Topic|21-22|22-23|23-24|24-25|Count|
|---|---|---|---|---|---|
|NULL values (handling difficulty)|a|c|b|—|**3**|
|DB Schema vs State (incl. intention/extension)|e|b|a|—|**3**|
|JOIN operations (outer/inner/implementing)|—|e|c|h|**3**|
|Entity + Referential Integrity|—|d|—|c|**2**|
|Informal guidelines for relational schema|—|h|e|—|**2**|
|Dangling tuple|—|i|—|g|**2**|
|3-tier architecture of DBMS|a|—|—|—|1|
|DBMS vs file system|c|—|—|—|1|
|Relationship types in DBMS|d|—|—|—|1|
|Data abstraction levels|f|—|—|—|1|
|TRC and DRC (short)|g|—|—|—|1|
|Aggregation and atomicity|h|—|—|—|1|
|FD vs Multivalued Dependency|i|—|—|—|1|
|Integrity rules (general)|j|—|—|—|1|
|Defining/manipulating/sharing DB|—|a|—|—|1|
|Relationship instance vs type vs set|—|f|—|—|1|
|Attribute closure|—|g|—|—|1|
|Serializability for concurrency|—|j|—|—|1|
|Stored vs derived attributes|—|—|d|—|1|
|Lossless join property|—|—|f|—|1|
|Search algorithms for SELECT|—|—|g|—|1|
|View equivalent schedules|—|—|h|—|1|
|Read-item / Write-item operations|—|—|i|—|1|
|Distributed DB transparency|—|—|j|—|1|
|DBMS capabilities|—|—|—|a|1|
|Database utilities|—|—|—|b|1|
|Relationally complete|—|—|—|d|1|
|Recursive relationship type|—|—|—|e|1|
|Join dependency + 5NF|—|—|—|f|1|
|Constrained vs unconstrained write|—|—|—|i|1|
|Shadow paging recovery|—|—|—|j|1|

---

## Q2–Q7 — 5-mark Questions

|Topic|21-22|22-23|23-24 B|23-24 R|24-25|Count|
|---|---|---|---|---|---|---|
|RA queries (schema-based)|Q5a|Q3a|—|Q3a|Q3a|**4**|
|BCNF|Q7a|Q4b|—|Q4a|Q4a|**4**|
|Normalization problem (FD → decompose)|Q7b|Q5*|—|Q4b|Q4b|**4**|
|TRC queries|—|Q3a|—|Q3b|Q3b|**3**|
|⚠️ Exact same Doctor schema (2NF→3NF)|—|—|—|Q4b|Q4b|—|
|⚠️ Exact same S3/S4/S5 schedules|—|—|Q7b|Q5a|Q5a|—|
|⚠️ Exact same R(A,B,C,D,E) BCNF problem|—|—|—|Q4a|Q4a|—|
|Schedules (strict/cascadeless/recoverable)|—|—|Q7b|Q5a|Q5a|**3**|
|Serial + Serializable schedule|—|—|—|Q5b|Q5b|**2**|
|Specialization hierarchy vs lattice|Q3a|—|—|—|Q2b|**2**|
|ER/EER diagram design|Q3b|—|—|—|Q2a|**2**|
|Granularity of data items (concurrency)|—|—|—|Q6a|Q6a|**2**|
|Transaction rollback + cascading rollback|—|—|—|Q6b|Q6b|**2**|
|Security measures for database|—|—|—|Q7a|Q7a|**2**|
|Data mining goals|—|—|—|Q7b|Q7b|**2**|
|Binary operators in RA|Q5b|—|—|—|—|1|
|ER → Relational model mapping|Q6a|—|—|—|—|1|
|EER → Relational mapping|Q6b|—|—|—|—|1|
|Participation role + role names|Q2a|—|—|—|—|1|
|Recursive relationship types (5 marks)|Q2b|—|—|—|—|1|
|Keys identification (FK/CK/PK)|Q4a|—|—|—|—|1|
|Union compatibility|Q4b|—|—|—|—|1|
|Database utilities (5 marks)|—|Q2a|—|—|—|1|
|Two-tier vs three-tier client-server|—|Q2b|—|—|—|1|
|Relationally complete (5 marks)|—|Q3b|—|—|—|1|
|User-defined vs predicate-defined subclasses|—|Q4a|—|—|—|1|
|Lossless join property (5 marks)|—|—|Q6a|—|—|1|
|Join dependency + 5NF (5 marks)|—|—|Q6b|—|—|1|
|Search algorithms for SELECT (5 marks)|—|—|Q7a|—|—|1|
|Characteristics of relations vs ordinary tables|—|—|—|Q2a|—|1|
|TRC vs DRC (difference)|—|—|—|Q2b|—|1|

*22-23 Q5 is 10 marks (BOOK normalization), all others are 5 marks. 23-24 B = Back Paper | 23-24 R = Regular Paper

---

## Q8 — Short Notes (any two, 5 marks each)

|Topic|21-22|23-24 B|23-24 R|24-25|Count|
|---|---|---|---|---|---|
|Constraints on specialization/generalization|—|—|c|d|**2**|
|Anomalies in DBMS|a|—|—|—|1|
|Physical + Logical Data Independence|b|—|—|—|1|
|Transitive Dependency|c|—|—|—|1|
|De-normalization|d|—|—|—|1|
|Deadlock prevention protocols|—|a|—|—|1|
|System Lock Tables|—|b|—|—|1|
|Query graph|—|c|—|—|1|
|Dirty Read problem|—|d|—|—|1|
|Data warehousing characteristics|—|—|a|—|1|
|Multiversion concurrency control|—|—|b|—|1|
|Selectivity + cost estimates (query optimization)|—|—|d|—|1|
|Data Fragmentation|—|—|—|a|1|
|Thomas's write rule|—|—|—|b|1|
|Data marts|—|—|—|c|1|

---

## ⚠️ Three Repeated Problems (exact same)

- **Doctor normalization** — R(Doctor#, patient#, Date, Diagnosis, Treat-code, Charge) → check 2NF, normalize to 3NF → appeared in **both 23-24 and 24-25 Q4b**
- **S3/S4/S5 schedules** → classify as strict/cascadeless/recoverable/nonrecoverable → appeared in **23-24 Back Q7b and 23-24 Regular Q5a and 24-25 Q5a**
- **R(A,B,C,D,E) with G={AB→C, CD→E, DE→B}** → find key, BCNF, dependency preservation, 3NF → appeared in **both 23-24 and 24-25 Q4a**

These three are essentially guaranteed tomorrow. Solve them tonight.

---
## DBMS PYQ Analysis (2021-22 to 2024-25)

---

## Appeared 4 Times — Non-Negotiable

|Topic|Papers|Q#|
|---|---|---|
|Relational Algebra (queries + operators)|All 4|21-22 Q5, 22-23 Q3, 23-24 Q3, 24-25 Q3|
|Tuple Relational Calculus|All 4|21-22 Q1g, 22-23 Q3, 23-24 Q3b, 24-25 Q3b|
|BCNF|All 4|21-22 Q7a, 22-23 Q4b, 23-24 Q4a, 24-25 Q4a|
|Normalization problems (2NF→3NF→BCNF decomposition)|All 4|21-22 Q7b, 22-23 Q5, 23-24 Q4b, 24-25 Q4b|

---

## Appeared 3 Times

|Topic|Papers|Q#|
|---|---|---|
|NULL values (why difficult to handle)|21-22, 22-23, 23-24|Q1b/Q1c|
|DB Schema vs State (incl. intention/extension)|21-22, 22-23, 23-24|Q1e/Q1b/Q1a|
|Schedule types (serial, serializable, strict, cascadeless, recoverable)|22-23, 23-24, 24-25|Q1j, Q5a+Q5b, Q5a+Q5b|

---

## Appeared 2 Times

|Topic|Papers|Q#|
|---|---|---|
|3-level architecture / 2-tier vs 3-tier client-server|21-22, 22-23|Q1a, Q2b|
|Entity integrity + Referential integrity|22-23, 24-25|Q1d, Q1c|
|JOIN operations (inner/outer/implementing)|22-23, 23-24, 24-25|Q1e, Q1c, Q1h|
|Database utilities and functions|22-23, 24-25|Q2a, Q1b|
|Recursive relationship types|21-22, 24-25|Q2b, Q1e|
|Specialization hierarchy vs lattice|21-22, 24-25|Q3a, Q2b|
|Informal guidelines for relational schema design|22-23, 23-24|Q1h, Q1e|
|Dangling tuple|22-23, 24-25|Q1i, Q1g|
|Relationally complete query language|22-23, 24-25|Q3b, Q1d|
|Granularity of data items (concurrency)|23-24, 24-25|Q6a, Q6a|
|Transaction rollback + cascading rollback|23-24, 24-25|Q6b, Q6b|
|Data warehousing characteristics|23-24, 24-25|Q8a, Q8a|
|Data mining goals|23-24, 24-25|Q7b, Q7b|
|Security measures for database data|23-24, 24-25|Q7a, Q7a|
|Timestamp ordering for concurrency control|23-24, 24-25|Q7b, Q7b|
|Multiversion concurrency control|23-24, 24-25|Q8b, Q8b|
|Constraints on specialization/generalization|23-24, 24-25|Q8c, Q8d|
|ER/EER diagram design|21-22, 24-25|Q3b, Q2a|

---

## Appeared Once

- DBMS vs traditional file system
- Data abstraction levels
- Aggregation and atomicity
- FD vs Multivalued Dependency
- Participation role and role names
- User-defined vs predicate-defined subclasses
- Attribute closure
- Lossless join property
- Join dependency + 5NF
- Union compatibility
- ER → Relational model mapping (EER also)
- Stored vs derived attributes
- Anomalies in DBMS
- Physical/Logical Data Independence
- Transitive dependency
- De-normalization
- Search algorithms for SELECT
- View equivalent schedules
- Read-item / Write-item operations
- Constrained vs unconstrained write
- Shadow paging recovery
- Thomas's write rule
- Data Fragmentation
- Data marts
- Selectivity and cost estimates in query optimization

---

## Never Asked (skip entirely)

- Storage strategies — Magnetic disk, RAID, Magnetic tape, file organization
- B+ Tree Index Files
- Hashing
- Data Dictionary
- QBE (Query by Example)
- DDLC
- Object-Oriented / Object-Relational Database
- Parallel Database
- Big Data + NoSQL

---

## Notes Coverage Gap

Your notes cover everything asked in PYQs **except**:

- Recovery techniques detail (write-ahead logging, shadow paging, undo/redo) — appeared in 24-25 Q1j, Q6b. 15-minute read from Navathe needed.
- Module II storage topics — irrelevant, never asked.

---

## Study Flow for Today/Tonight

**Phase 1 — Guaranteed marks (do these first):**

1. Normalization — FDs → find key → 2NF → 3NF → BCNF decomposition with examples. Practice the R(A,B,C,D,E) type problems from 23-24 and 24-25 — exact same problem appeared twice.
2. RA — all 6 unary + binary ops, then practice MAILORDER and Passenger/Classes schema queries
3. TRC — syntax `{t | COND(t)}`, convert at least 3 RA queries to TRC
4. BCNF — definition, difference from 3NF, why it's stronger, example

**Phase 2 — Q1 short answers (10 marks, all 1-mark each):** 5. Schema vs state, NULL values, dangling tuple, informal guidelines, stored vs derived, entity/referential integrity, join types, recursive relationships, relationally complete — write 2-line definitions for each

**Phase 3 — 5-mark questions:** 6. Schedule types — definitions + example for each (strict ⊂ cascadeless ⊂ recoverable) 7. 3-level architecture + client-server 8. Specialization hierarchy vs lattice 9. ER diagram — know the notation cold (cardinality, weak entity, aggregation) 10. Data warehousing + data mining — easy 5 markers, 5 minutes

**Phase 4 — If time left:** 11. Shadow paging, transaction rollback — from Navathe, 15 min 12. Granularity of data items, multiversion concurrency, timestamp ordering

---

**What's the exam format?** Q1 compulsory (1×10) + any 5 from Q2-Q8 (5+5 each). So you're choosing 5 from 7. Pick the ones from Phase 1-3 above and you're covered.

---
# Reference 

- [[Database Management System (DBMS) - CSE 14th.pdf]]
- [[DBMS 4th Sem.pdf]]