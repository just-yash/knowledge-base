
Type : #Note    
Date : 2026-05-13    
Tags :  [[DBMS]] ; [[College]]     
Status : #complete     
~ ***Yash Agrawall*** ~     

---
## 1. Attribute Closure (X⁺)

**Algorithm:**

- Start: X⁺ = X
- For each FD Y→Z in F: if Y ⊆ X⁺, add Z to X⁺
- Repeat until no change

**Use for:**

- If X⁺ = all attributes → X is a superkey
- If X⁺ = all attributes AND no proper subset gives all → X is a candidate key
- Check if FD X→Y holds → check if Y ⊆ X⁺

**Example:** R(A,B,C,D,E), G = {AB→C, CD→E, DE→B}. Find {A,B,D}⁺

- Start: {A,B,D}
- AB→C fires (A,B ∈ set) → add C: {A,B,C,D}
- CD→E fires (C,D ∈ set) → add E: {A,B,C,D,E}
- DE→B fires (already there)
- **{A,B,D}⁺ = {A,B,C,D,E} = all → candidate key**

---

## 2. Finding Candidate Keys

**Step 1 — Classify attributes:**

- Appears **only on LHS** → must be in EVERY candidate key
- Appears **only on RHS** → cannot be part of any candidate key alone
- Appears on both or neither → test combinations

**Step 2 — Start with forced attributes, compute closures**

**Example:** R(A,B,C,D,E), G = {AB→C, CD→E, DE→B}

- A → only LHS. D → only LHS. Both must be in every key.
- {A,D}⁺ = {A,D} — not all. Add more.
- {A,B,D}⁺ = {A,B,C,D,E} = all. Check subsets: {A,D}, {A,B}, {B,D} — none give all. ✓ **{A,B,D} is CK**
- {A,D,E}⁺: DE→B adds B → {A,B,D,E} → AB→C adds C = all. Subsets fail. ✓ **{A,D,E} is CK**
- Prime attributes: A, B, D, E. Non-prime: C only.

---
## 3. Minimal Cover

**Three steps — always in order:**

**Step 1:** Split RHS into single attributes

- A→BC becomes A→B and A→C

**Step 2:** Remove redundant LHS attributes

- For each FD XY→A: check if Y is removable
- Compute X⁺ (without Y in LHS): if A ∈ X⁺ → Y is redundant, replace XY→A with X→A

**Step 3:** Remove redundant FDs

- For each FD X→A: remove it, compute X⁺ using remaining FDs
- If A ∈ X⁺ → FD is redundant, drop it

**Example:** F = {B→A, D→A, AB→D}

- Step 1: Already single RHS.
- Step 2: Check AB→D. Try removing A: compute B⁺ with {B→A, D→A, B→D} → B⁺ = {A,B,D}. D ∈ B⁺ → A is redundant. AB→D becomes B→D.
- F = {B→A, D→A, B→D}
- Step 3: Check B→A: compute B⁺ using {D→A, B→D} → {A,B,D}. A ∈ B⁺ → B→A is redundant. Remove.
- **Minimal Cover: {B→D, D→A}**

---
## 4. Normalization

### 2NF

- **Rule:** No partial dependency — every non-prime attribute must depend on the FULL primary key (only matters when PK is composite)
- **Fix:** For each partial dep (part-of-key → non-prime), create new relation with that key-part. Remove that attribute from original.

### 3NF

**Rule:** For every non-trivial FD X→A, either:

- X is a superkey, OR
- A is a prime attribute

**3NF Synthesis Algorithm:**

1. Find minimal cover F_c
2. For each FD X→A in F_c → create relation R_i(X ∪ A)
3. If no relation contains a candidate key → add one relation with just the candidate key
4. Remove any relation whose schema is a subset of another

### BCNF

- **Rule:** For every non-trivial FD X→A → X MUST be a superkey. No exceptions.

**BCNF Decomposition Algorithm:**

1. Find a FD X→Y where X is NOT a superkey
2. Decompose R into:
    - R1 = X ∪ Y
    - R2 = R - Y (keep X in R2 as link)
3. Compute projected FDs for R1 and R2. Repeat if still violating.
4. ⚠️ BCNF may NOT preserve dependencies

---

### The Doctor Problem (exact PYQ — 23-24, 24-25)

R(Doctor#, Patient#, Date, Diagnosis, Treat-code, Charge)

FDs:

- {Doctor#, Patient#, Date} → Diagnosis
- {Doctor#, Patient#, Date} → Treat-code
- Treat-code → Charge

PK = {Doctor#, Patient#, Date}

- **2NF?** No partial dependencies (Diagnosis and Treat-code need full key). ✓ YES
- **3NF?** Treat-code → Charge: Treat-code not a superkey, Charge not prime. Transitive dep. ✗ NOT 3NF

**Decompose to 3NF:**

- R1(Doctor#, Patient#, Date, Diagnosis, Treat-code) — PK: {Doctor#, Patient#, Date}
- R2(Treat-code, Charge) — PK: Treat-code

---

### R(A,B,C,D,E) Problem (exact PYQ — 23-24, 24-25)

G = {AB→C, CD→E, DE→B} Candidate keys: {A,B,D} and {A,D,E}

**BCNF check:**

- AB→C: {A,B}⁺ = {A,B,C} ≠ all → ✗ violates BCNF
- CD→E: {C,D}⁺ = {B,C,D,E} ≠ all → ✗ violates BCNF
- DE→B: {D,E}⁺ = {B,D,E} ≠ all → ✗ violates BCNF

**BCNF Decomposition:**

1. Take AB→C: R1(A,B,C), R2(A,B,D,E)
2. Project FDs onto R2: only DE→B survives
3. DE→B violates BCNF in R2 → split again: R21(B,D,E), R22(A,D,E)

**Final: {R1(A,B,C), R21(B,D,E), R22(A,D,E)}**

**Lossless?**

- R1 ∩ R2 = {A,B}. {A,B}⁺ = {A,B,C} = R1 ✓
- R21 ∩ R22 = {D,E}. {D,E}⁺ = {B,D,E} = R21 ✓ Lossless.

**Dependency preserving?** CD→E is lost (C in R1, D,E split across R21/R22). ✗ NOT dependency preserving.

---

## 5. Lossless Join Test

**Binary decomposition (R into R1, R2):**

- Compute R1 ∩ R2
- Compute (R1 ∩ R2)⁺
- If result ⊇ all of R1 OR all of R2 → **Lossless** ✓

**Formal condition:** (R1∩R2) → (R1-R2) ∈ F⁺ OR (R1∩R2) → (R2-R1) ∈ F⁺

---

## 6. Dependency Preservation Test

**Check each FD X→A:**

1. Start with Z = X
2. For each sub-relation Rᵢ: if Z ∩ Rᵢ can determine new attributes within Rᵢ → add them to Z
3. Repeat until Z stabilizes
4. If A ∈ Z → **FD is preserved** ✓

---

## 7. Relational Algebra — Key Patterns

|Operation|Syntax|Use|
|---|---|---|
|Select|σ(condition)(R)|Filter rows|
|Project|π(A1,A2)(R)|Filter columns|
|Rename|ρ(S(B1,B2))(R)|Rename relation/attributes|
|Join|R ⋈(condition) S|Combines matching rows|
|Natural Join|R * S|Joins on same-named columns|
|Union|R ∪ S|All tuples from both|
|Minus|R - S|Tuples in R not in S|
|Division|R ÷ S|"For all" queries|

**Cascade of select:** σ(c1)(σ(c2)(R)) = σ(c1 AND c2)(R) **Division pattern** — "Find employees who work on ALL projects John works on":

```
SMITH ← σ(FName='John' AND LName='Smith')(EMPLOYEE)
SMITH_PNO ← π(Pno)(WORKS_ON ⋈(ESSN=SSN) SMITH)
SSN_PNO ← π(SSN,Pno)(WORKS_ON)
RESULT ← SSN_PNO ÷ SMITH_PNO
```

**Outer Join types:**

- Left ⟕ — All of left + matching right (NULLs if no match)
- Right ⟖ — All of right + matching left
- Full ⟗ — All from both

**Aggregate:** `GroupAttr 𝒰 Function(R)` — e.g., `DNo 𝒰 COUNT, AVG_Sal (EMPLOYEE)`

---

## 8. TRC — Tuple Relational Calculus

**Syntax:** `{t | COND(t)}`

- `R(t)` — t is a tuple in R
- `t.A` — access attribute A of t
- `∃r(R(r) AND ...)` — join with another relation
- `∀` — for all (rarely used, "for all" queries)

**RA → TRC conversions:**

|RA|TRC|
|---|---|
|σ(Salary>30000)(EMP)|{t \| EMP(t) AND t.Salary > 30000}|
|π(FName,LName)(EMP)|{t.FName, t.LName \| EMP(t)}|
|EMP ⋈(DNO=DNum) DEPT|{t.FName, d.DName \| EMP(t) AND DEPT(d) AND t.DNO = d.DNum}|

**Multi-relation example** — "Name and city of employees in Research department":

```
{t.FName, t.LName | EMP(t) AND ∃d(DEPT(d) AND d.DName='Research' AND t.DNo = d.DNum)}
```

**Self-join example** — "Pairs of customers in same ZIP":

```
{t.Cno, u.Cno | CUSTOMER(t) AND CUSTOMER(u) AND t.Zip = u.Zip AND t.Cno < u.Cno}
```

_(t.Cno < u.Cno avoids duplicate pairs)_

---

## 9. Schedule Analysis

**Hierarchy (memorize this):**

```
Strict ⊂ Cascadeless ⊂ Recoverable
```

### Step 1 — Find all write-read pairs

- For every wᵢ(X): find the next rⱼ(X) where j ≠ i → this is a dependency

### Recoverable

- **Rule:** For every dependency (Tᵢ writes X, Tⱼ reads X): commit(Tᵢ) must appear **before commit(Tⱼ)**
- Violated when: Tⱼ commits while Tᵢ is still uncommitted

### Cascadeless (ACA)

- **Rule:** For every dependency: commit(Tᵢ) must appear **before rⱼ(X)** itself
- Stricter than recoverable — no reading of uncommitted data at all

### Strict

- **Rule:** After wᵢ(X), no other transaction may read OR write X until Tᵢ commits or aborts
- Check: between wᵢ(X) and commit(Tᵢ), is there any rⱼ(X) or wⱼ(X)?

---

### PYQ Schedules — S3, S4, S5

**S3:** r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); c1; w3(y); c3; r2(y); w2(z); c2

- Write-read pair: w3(y)[step 8] → r2(y)[step 10]
- Recoverable? c3[step 9] before c2[step 12] ✓
- Cascadeless? c3[step 9] before r2(y)[step 10] ✓
- Strict? No rⱼ(x) or wⱼ(x) between w1(x) and c1. r2(y) after c3. ✓
- **S3 = STRICT** ✓

**S4:** r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); c1; w3(y); **r2(y)**; w2(z); w2(y); c2

- Write-read pair: w3(y)[step 8] → r2(y)[step 9]
- T3 NEVER commits in this schedule
- Cascadeless? c3 doesn't exist before r2(y). ✗
- Recoverable? T2 commits(c2) but T3 never commits. T2 read dirty data. ✗
- **S4 = NOT RECOVERABLE** (worst)

**S5:** r1(x); r2(z); r3(x); r1(z); r2(y); r3(y); w1(x); c1; w2(z); w3(y); c3; w2(y); c2

- All reads (r2(y), r3(y)) happen BEFORE any writes on y
- They read initial values — no cross-transaction write-read dependency
- No dependency → all conditions trivially satisfied
- **S5 = STRICT** ✓

---

## 10. Conflict Serializability — Precedence Graph

**Conflicting operations:** Two operations on same item X from different transactions where at least one is a write:

- rᵢ(X) and wⱼ(X) ← conflict
- wᵢ(X) and rⱼ(X) ← conflict
- wᵢ(X) and wⱼ(X) ← conflict
- rᵢ(X) and rⱼ(X) ← NOT a conflict

**Build precedence graph:**

- One node per transaction
- For each conflict where Tᵢ's operation comes FIRST → draw edge Tᵢ → Tⱼ

**Result:**

- No cycle → **Conflict Serializable** ✓ (topological sort = equivalent serial order)
- Cycle exists → **NOT Conflict Serializable** ✗

**Example:** S: r1(A); r2(A); w1(B); r2(B); w2(A); w1(A)

Conflicts on A:

- r2(A)[2] and w1(A)[6]: r2 first → T2 → T1
- w1(A)[6] and w2(A)[5]: w2 first → T2 → T1 (same direction)
- r1(A)[1] and w2(A)[5]: r1 first → T1 → T2

Conflicts on B:

- w1(B)[3] and r2(B)[4]: w1 first → T1 → T2

Graph: T1 → T2 AND T2 → T1 → **CYCLE → NOT conflict serializable** ✗

---

## Quick Decision Table

|Problem says...|Do this|
|---|---|
|"Find candidate key"|Classify attrs → compute closures|
|"Find minimal cover"|3 steps: decompose RHS → remove redundant LHS attrs → remove redundant FDs|
|"Is R in BCNF?"|For every FD X→A: check if X⁺ = all attributes|
|"Normalize to 3NF"|Synthesis: minimal cover → create relations → add CK relation|
|"Normalize to BCNF"|Decomposition: find violating FD → split → recurse|
|"Lossless?"|(R1∩R2)⁺ ⊇ R1 or R2?|
|"Dependency preserving?"|Project FDs onto each piece → check if all original FDs derivable|
|"Is schedule recoverable?"|All write-read deps: committer commits before reader commits?|
|"Conflict serializable?"|Draw precedence graph → cycle?|
|"RA query with 'all'"|Use Division ÷|
|"TRC query"|{t.attr \| R(t) AND ∃s(S(s) AND join condition AND filter)}|

---
# References 

- [[Database Management System (DBMS) - CSE 14th.pdf]]
- [[DBMS 4th Sem.pdf]] 