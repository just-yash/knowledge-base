
Type : #Note    
Date : 2026-05-13    
Tags :  [[DBMS]] ; [[College]]        
Status : #incomplete     
~ ***Yash Agrawall*** ~     

---
# DBMS Numericals — Complete Problem-Solving Guide

Every numerical in your PYQs falls into one of ten problem types. This note explains each type from first principles, shows you exactly how to approach it, and walks through worked examples drawn directly from your exam papers. The topics are arranged in the order you should learn them — each one builds on the previous.

---
## 1. Attribute Closure (X⁺)

This is the single most important mechanical skill in DBMS. Everything else — finding keys, checking normal forms, testing decompositions — reduces to running this algorithm. If you can compute attribute closures quickly and correctly, half the numericals solve themselves.

**What it means.** Given a set of attributes X and a set of functional dependencies F, the closure X⁺ is the complete set of all attributes that X can functionally determine — not just directly, but through any chain of FDs. Think of it as asking: "Starting from what I know (X), what else can I figure out by applying these rules (F) repeatedly?"

**The Algorithm.**

Start by setting X⁺ = X. Then scan your entire FD set repeatedly. Every time you find an FD whose left-hand side is fully contained within X⁺, add its right-hand side into X⁺. Keep scanning until you go through the entire FD set and nothing new gets added. That stable point is X⁺.

The critical mistake students make is scanning the FD list only once. You must keep looping because adding a new attribute in one pass may enable a different FD to fire in the next pass.

**Worked Example.**

Take R(A, B, C, D, E) with FDs G = {AB→C, CD→E, DE→B}. Compute {A, B, D}⁺.

Start: {A, B, D}⁺ = {A, B, D}

Scan the FDs:

- AB→C: Is A ∈ {A,B,D}? Yes. Is B ∈ {A,B,D}? Yes. Both on LHS are present. Add C. Now {A,B,D}⁺ = {A,B,C,D}.
- CD→E: Is C ∈ {A,B,C,D}? Yes. Is D ∈ {A,B,C,D}? Yes. Add E. Now {A,B,D}⁺ = {A,B,C,D,E}.
- DE→B: Is D ∈ {A,B,C,D,E}? Yes. Is E ∈ {A,B,C,D,E}? Yes. Add B. B is already there, no change.

Scan again — nothing new fires. Final answer: {A,B,D}⁺ = {A,B,C,D,E} = all attributes.

This means {A,B,D} is a superkey of R.

---

## 2. Finding Candidate Keys

A candidate key is a minimal superkey — it uniquely identifies every tuple and no proper subset of it can do the same. Finding all candidate keys is always the first step in any normalization problem.

**The Strategy.**

Before you compute anything, do a quick visual scan of your FDs and classify each attribute into one of three groups. The first group contains attributes that appear **only on the left-hand side** of FDs and never on the right — these attributes are never determined by anything else, so they **must appear in every candidate key**. The second group contains attributes that appear **only on the right-hand side** — these are always determined by others, so they **cannot be part of any candidate key on their own** (they'll be in the closure of the key, not the key itself). The third group contains attributes that appear on both sides or on neither side — these may or may not be in a candidate key, and you need to test.

Once you have your forced-in attributes from group one, try combining them with attributes from group three and compute closures until you find minimal superkeys.

**Worked Example — the exact PYQ problem (23-24 and 24-25).**

R(A, B, C, D, E) with G = {AB→C, CD→E, DE→B}.

Step 1 — classify attributes:

- Left-hand side only: A (appears in AB→C, never on RHS), D (appears in CD→E and DE→B, never on RHS). So A and D must be in every candidate key.
- Right-hand side only: none.
- Both sides: B (LHS of DE→B... wait, DE→B has B on RHS. Is B on LHS? Yes, AB→C. So B is on both sides), C (RHS of AB→C, LHS of CD→E — both sides), E (RHS of CD→E, LHS of DE→B — both sides).

Step 2 — start with forced attributes {A, D} and try combinations:

Try {A, D}⁺: Nothing fires (AB→C needs B, CD→E needs C, DE→B needs E). {A,D}⁺ = {A,D}. Not all. Not a superkey.

Try {A, D, B}⁺:

- AB→C: A and B present → add C. {A,B,C,D}
- CD→E: C and D present → add E. {A,B,C,D,E}
- DE→B: B already present.
- Result: all attributes. {A,B,D} is a superkey.
- Is it minimal? Remove A: {B,D}⁺ = {B,D} (nothing fires, no FD has just B or D as full LHS). Not all. Remove B: {A,D}⁺ = {A,D}. Not all. Remove D: {A,B}⁺ = {A,B,C} (only AB→C fires). Not all. So no proper subset works. **{A,B,D} is a candidate key.**

Try {A, D, E}⁺:

- DE→B: D and E present → add B. {A,B,D,E}
- AB→C: A and B present → add C. {A,B,C,D,E}
- All attributes reached. {A,D,E} is a superkey.
- Is it minimal? Remove A: {D,E}⁺ → DE→B adds B: {B,D,E}. AB→C needs A. Not all. Remove D: {A,E}⁺ = {A,E}. Nothing fires. Not all. Remove E: {A,D}⁺ = {A,D}. Not all. So **{A,D,E} is another candidate key.**

Are there more? You could try {A,D,C} but C is in the RHS-only-ish category and tends not to be in keys. Verify: {A,D,C}⁺: CD→E: C and D → add E: {A,C,D,E}. DE→B: D and E → add B: {A,B,C,D,E}. All attributes! Superkey. But is it minimal? Remove A: {C,D}⁺ → CD→E → {C,D,E} → DE→B → {B,C,D,E}. AB→C needs A. Not all. Remove C: {A,D}⁺ = {A,D}. Not all. Remove D: {A,C}⁺ = {A,C}. Nothing. Not all. So {A,C,D} is actually a third candidate key!

The prime attributes (attributes appearing in any candidate key) are: A, B, C, D, E. The only non-prime attribute is... none, actually. All attributes are prime. This will matter when you check normal forms.

---
## 3. Minimal Cover (Canonical Cover)

The minimal cover F_c of a set of FDs is the simplest, most stripped-down equivalent set — no redundant FDs, no redundant attributes in any LHS, and every FD has exactly one attribute on the RHS. You need this to perform the 3NF synthesis algorithm.

**Three-Step Algorithm.**

**Step 1 — Decompose all RHS.** If any FD has multiple attributes on the right side, split it into separate FDs with one attribute each. So A→BC becomes A→B and A→C. This step never loses information because of the union rule.

**Step 2 — Remove redundant LHS attributes.** For each FD with a composite left-hand side (like AB→C), check whether any attribute in the LHS is actually unnecessary. To test whether attribute Y is redundant in X→A, compute the closure of (X - Y) using the **current version of F** and check if A ends up in that closure. If it does, Y was superfluous — replace X→A with (X-Y)→A in F.

**Step 3 — Remove redundant FDs.** For each FD X→A, temporarily remove it from F and compute X⁺ using the remaining FDs. If A is still in X⁺, then X→A was derivable from the others and can be permanently removed.

**Worked Example.**

F = {B→A, D→A, AB→D}.

Step 1: All RHS are already single attributes. No changes.

Step 2: Check AB→D for redundant LHS attributes.

- Can we remove A? Compute B⁺ using F with AB→D replaced by B→D: {B→A, D→A, B→D}. B→D fires immediately: B⁺ = {A,B,D}. D is in B⁺. So A is redundant. Replace AB→D with B→D.
- F is now {B→A, D→A, B→D}. Check B→D for redundancy in its own LHS — it's a single attribute, nothing to remove.

Step 3: Check each FD for redundancy.

- Check B→A: Remove it. Compute B⁺ using {D→A, B→D}. B→D fires: {B,D}. D→A fires: {A,B,D}. A is in B⁺. So B→A is derivable — remove it.
- F is now {D→A, B→D}.
- Check D→A: Remove it. Compute D⁺ using {B→D}. D alone — nothing fires. D⁺ = {D}. A is not in D⁺. D→A is not redundant. Keep it.
- Check B→D: Remove it. Compute B⁺ using {D→A}. Nothing fires from B. B⁺ = {B}. D is not in B⁺. Keep it.

**Minimal cover: F_c = {B→D, D→A}.**

---
## 4. Normalization — 2NF, 3NF, BCNF

Normalization is the process of decomposing a relation into better-designed relations that avoid anomalies. Each normal form is progressively stricter.

### Understanding 1NF

A relation is in 1NF if every attribute contains atomic (indivisible) values — no multi-valued attributes, no repeating groups. In practice, if you're working with a given relation schema in an exam, assume it's already in 1NF unless explicitly told otherwise.

### Understanding 2NF

**The rule:** Every non-prime attribute must be **fully functionally dependent** on the **entire** primary key — not just part of it. This rule only matters when the primary key is composite; a relation with a single-attribute key is automatically in 2NF.

A **partial dependency** is when a non-prime attribute depends on only part of the key. If you find one, you need to decompose.

**How to normalize to 2NF:** For each partial dependency (part-of-key → non-prime-attribute), create a new relation containing that key-part and the dependent attributes. Remove those dependent attributes from the original relation. Keep the original relation intact with its full primary key.

### Understanding 3NF

**The rule:** For every non-trivial FD X→A in F⁺, either X is a superkey OR A is a prime attribute (part of some candidate key). The second condition is what separates 3NF from BCNF — 3NF allows some violations as long as the determined attribute (A) is part of a key.

A **transitive dependency** is when a non-prime attribute Y determines another non-prime attribute Z (and Y itself is determined by the key). This violates 3NF.

**3NF Synthesis Algorithm (dependency-preserving and lossless):**

1. Compute the minimal cover F_c.
2. For each FD X→A in F_c, create a relation R_i with attributes X∪{A} and primary key X.
3. If no relation created so far contains a candidate key of the original R, add one more relation containing just the attributes of any candidate key.
4. Remove any relation whose attribute set is a subset of another relation's attribute set.

### Understanding BCNF

**The rule:** For every non-trivial FD X→A in F⁺, X must be a superkey. No exceptions. BCNF is stricter than 3NF because it removes the second condition — even if A is prime, X must still be a superkey.

**BCNF Decomposition Algorithm (lossless but may not preserve dependencies):**

1. Find any FD X→Y that violates BCNF (X is not a superkey of the current relation).
2. Decompose R into R1 = XY (the attributes of both X and Y together) and R2 = R - Y + X (everything else, keeping X as a connection).
3. For each resulting relation, compute the projected FDs and check if it's in BCNF. Repeat if not.

**The Doctor Normalization Problem (exact PYQ — appeared in both 23-24 and 24-25).**

R(Doctor#, Patient#, Date, Diagnosis, Treat-code, Charge)

The problem states: diagnosis is determined uniquely for each patient by a doctor (on a given date), and each treatment code has a fixed charge.

So the FDs are:

- {Doctor#, Patient#, Date} → Diagnosis
- {Doctor#, Patient#, Date} → Treat-code
- Treat-code → Charge

The primary key is {Doctor#, Patient#, Date}.

**Is it in 2NF?** Non-prime attributes are Diagnosis, Treat-code, and Charge. Do Diagnosis or Treat-code depend on only part of the key? No — they both need all three of Doctor#, Patient#, and Date. What about Charge? Charge depends on Treat-code, which is a non-prime attribute — this isn't a partial dependency, it's something different. So there are no partial dependencies, and the relation **is in 2NF**.

**Is it in 3NF?** Check Treat-code→Charge. Is Treat-code a superkey? No — {Treat-code}⁺ = {Treat-code, Charge}, which is not all attributes. Is Charge a prime attribute? No. So this FD violates 3NF — Charge is **transitively dependent** on the primary key via Treat-code. The relation **is NOT in 3NF**.

**Normalize to 3NF:** Decompose by removing the transitive dependency:

- R1(Doctor#, Patient#, Date, Diagnosis, Treat-code) — PK: {Doctor#, Patient#, Date}
- R2(Treat-code, Charge) — PK: Treat-code

Check R1: All non-prime attributes (Diagnosis, Treat-code) depend on the full key. No partial or transitive dependency. In 3NF. Check R2: Charge depends on the single-attribute key Treat-code. Trivially in 3NF.

**The R(A,B,C,D,E) BCNF Problem (appeared in both 23-24 and 24-25 Q4a).**

G = {AB→C, CD→E, DE→B}

From the key-finding section above, we found candidate keys {A,B,D} and {A,D,E}. Prime attributes are A, B, D, E. Non-prime: C only.

**BCNF check:** For each FD, is the LHS a superkey?

- AB→C: {A,B}⁺ = {A,B,C}. Not all attributes. **AB is not a superkey. Violates BCNF.**
- CD→E: {C,D}⁺ = {C,D,E,B} (CD→E adds E, DE→B adds B). Not all (missing A). **Violates BCNF.**
- DE→B: {D,E}⁺ = {D,E,B}. Not all. **Violates BCNF.**

**BCNF Decomposition:** Take the first violating FD: AB→C.

- R1 = AB ∪ C = (A, B, C). Key: {A,B}, FD: AB→C. Check: {A,B}⁺ = {A,B,C} = all of R1. So AB is a superkey of R1. R1 is in BCNF. ✓
- R2 = original R minus C, keep A and B = (A, B, D, E). Now project the original FDs onto R2 (only keep FDs whose attributes are all in {A,B,D,E}): AB→C drops out (C not in R2). CD→E drops out (C not in R2). DE→B stays. So F_R2 = {DE→B}.

Check R2 for BCNF: {D,E}⁺ in R2 = {B,D,E}. Not all of R2 (missing A). DE is not a superkey of R2. **R2 violates BCNF.** Decompose again using DE→B:

- R21 = DE ∪ B = (B, D, E). Key: {D,E}, FD: DE→B. {D,E}⁺ in R21 = {B,D,E} = all. In BCNF. ✓
- R22 = R2 minus B, keep D and E = (A, D, E). Project FDs: none of the original FDs project onto {A,D,E} alone. F_R22 = {}. Key is {A,D,E} (all attributes, trivially). In BCNF. ✓

**Final BCNF decomposition: {R1(A,B,C), R21(B,D,E), R22(A,D,E)}.**

**Is the BCNF decomposition dependency-preserving?** Check whether FD AB→C is preserved. It's entirely within R1 — yes. Check CD→E: C is in R1 and D, E are in R21 and R22. C is only in R1; D and E are not in R1. This FD spans multiple relations and cannot be checked within any single relation. So **CD→E is lost — the BCNF decomposition is NOT dependency-preserving.** This is a well-known trade-off with BCNF.

---

## 5. Lossless Join Test

When you decompose a relation, you need to verify that joining the pieces back together gives exactly the original relation — no extra spurious tuples and no missing tuples. A decomposition that fails this test is useless.

**For binary decomposition (R into R1 and R2):** The test is clean and direct. Compute the common attributes between R1 and R2 (call this R1∩R2). Then compute the closure of those common attributes using the original FD set F. If that closure contains all the attributes of either R1 or R2, the decomposition is lossless.

More precisely: the decomposition is lossless if and only if (R1∩R2) → (R1 - R2) ∈ F⁺ OR (R1∩R2) → (R2 - R1) ∈ F⁺.

The practical shortcut is: compute (R1∩R2)⁺ and check if it gives you all attributes of R1 or all attributes of R2. If either holds, it's lossless.

**Worked Example.** R(A,B,C,D,E), G = {AB→C, CD→E, DE→B}. Decomposition: R1(A,B,C) and R2(A,B,D,E).

R1 ∩ R2 = {A, B}. Compute {A,B}⁺ using G:

- AB→C fires: {A,B,C}.
- CD→E: C is present but D is not. Doesn't fire.
- {A,B}⁺ = {A,B,C}.

Does {A,B,C} = R1 = {A,B,C}? Yes! So the common attributes functionally determine all of R1. **The decomposition is lossless.** ✓

**For multi-way decomposition:** Use the Chase (tabular) algorithm. Create a table with a row for each sub-relation and a column for each attribute. Put `aⱼ` (a distinguished symbol) in cell (i,j) if attribute j belongs to relation i; otherwise put `bᵢⱼ` (a non-distinguished symbol with unique subscripts). Then repeatedly apply FDs to equate symbols in rows where the LHS matches. If any row becomes all a-symbols, the decomposition is lossless.

---

## 6. Dependency Preservation Test

A decomposition preserves a FD X→Y if X→Y can be derived purely from FDs that apply within individual sub-relations — without needing to join the sub-relations first. This matters because if a dependency is lost, you cannot enforce it without an expensive join.

**The Method.** For each FD X→A in your original F, check whether it belongs to the closure of the union of projected FDs (F1 ∪ F2 ∪ ... ∪ Fn, where Fᵢ contains only FDs whose attributes are all within Rᵢ).

The efficient way: start with Z = X. Then repeatedly loop through each sub-relation Rᵢ and add to Z any attributes that Z∩Rᵢ can determine within Rᵢ (using the projected FDs of Rᵢ). Keep looping until Z stabilizes. If A ∈ Z at the end, the FD X→A is preserved.

**Worked Example.** R(A,B,C,D,E,F) with F = {AB→C, DC→AE, E→F}. Decomposition: R1(A,B,C,D) and R2(B,C,D,E,F).

Project F onto R1 = {A,B,C,D}: AB→C (all attributes in R1) ✓. DC→AE: D,C ∈ R1, A ∈ R1, E ∉ R1 → project to DC→A. E→F: E,F ∉ R1 → drops out. So F1 = {AB→C, DC→A}.

Project F onto R2 = {B,C,D,E,F}: AB→C: A ∉ R2 → drops out. DC→AE: A ∉ R2, but E ∈ R2 → project to DC→E. E→F: both in R2 → E→F. So F2 = {DC→E, E→F}.

Now check each original FD:

Check AB→C: Start with Z = {A,B}. Within R1, F1 has AB→C. AB ⊆ Z∩R1 = {A,B}. Add C. Z = {A,B,C}. Within R2, Z∩R2 = {B,C}. DC→E needs D — not in {B,C}. E→F needs E — not there. Z doesn't grow from R2. Final Z = {A,B,C}. Is C ∈ Z? **Yes. AB→C is preserved.** ✓

Check DC→AE: Start with Z = {D,C}. Within R1: AB→C: A not in Z. DC→A: D,C ∈ Z. Add A. Z = {A,C,D}. Within R2: DC→E: D,C ∈ Z. Add E. Z = {A,C,D,E}. E→F: Add F. Z = {A,C,D,E,F}. Go back to R1: AB→C: B not in Z. DC→A: A already there. Z stabilizes. Final Z = {A,C,D,E,F}. Is AE ⊆ Z? A ∈ Z, E ∈ Z. **Yes. DC→AE is preserved.** ✓

Check E→F: Start with Z = {E}. Within R2: E→F fires. Z = {E,F}. Is F ∈ Z? **Yes. E→F is preserved.** ✓

**All dependencies are preserved. The decomposition is dependency-preserving.** ✓

---

## 7. Relational Algebra Queries

RA is a procedural query language — you specify both what you want and how to get it, step by step. The examiners always give you a schema with a few tables and ask you to write expressions for several queries. The skill here is knowing which operators to chain, in which order.

**The Six Core Operators.**

**SELECT (σ)** filters rows based on a condition. `σ(condition)(R)` returns all tuples from R satisfying the condition. You can combine conditions with AND (∧), OR (∨), NOT (¬). Cascade of selections: `σ(c1)(σ(c2)(R)) = σ(c1 ∧ c2)(R)`.

**PROJECT (π)** filters columns. `π(A1, A2, ...)(R)` returns only the specified attributes. Duplicates are eliminated automatically (relations are sets).

**RENAME (ρ)** renames a relation or its attributes. Useful when joining a relation with itself. `ρ(S(B1,B2,...))(R)` renames R as S with new attribute names.

**UNION (∪), INTERSECTION (∩), MINUS (-)** work on union-compatible relations (same number of attributes, compatible domains). Union gives all tuples from either; intersection gives only tuples in both; minus gives tuples in the first but not the second. Note: minus is not commutative (R-S ≠ S-R).

**CARTESIAN PRODUCT (×)** combines every tuple of R with every tuple of S. If R has n tuples and S has m tuples, the result has n×m tuples and all attributes from both. Usually followed by a selection to form a join.

**JOIN (⋈)** is the workhorse of multi-table queries. A theta-join `R ⋈(condition) S` is essentially `σ(condition)(R × S)`. An equi-join uses equality as the condition. A natural join automatically matches on attributes with the same name and eliminates the duplicate column.

**OUTER JOINS** preserve dangling tuples. Left outer join `R ⟕ S` keeps all of R; right outer join `R ⟖ S` keeps all of S; full outer join `R ⟗ S` keeps all of both, filling NULLs where there's no match.

**DIVISION (÷)** answers "for all" queries — "find employees who work on ALL projects that John Smith works on." R ÷ S gives all values from R that are paired with every value in S.

**Aggregate functions and grouping** use the notation: `Grouping-attr 𝒰 Function-list (R)`. Example: `DNo 𝒰 COUNT, AVG_Sal (EMPLOYEE)` groups by department and finds count and average salary.

**Working Through the Passenger Schema (23-24 PYQ).**

Schema: Passenger(Pid, Pname, Pgender, Pcity), Agency(Aid, Aname, Acity), Flight(Fid, Fdate, time, src, dest), Booking(Pid, Aid, Fid, Fdate).

Query a — Get complete details of all flights to New Delhi: `σ(dest = 'New Delhi')(Flight)`

Query b — Get details about all flights from Chennai to New Delhi: `σ(src = 'Chennai' AND dest = 'New Delhi')(Flight)`

Query c — Find only the flight numbers for passenger with Pid=124 for flights to Chennai before 06:11:20:

```
Step 1: Filter bookings for Pid=124:
P124 ← σ(Pid = 124)(Booking)

Step 2: Join with flights where dest='Chennai' and time<'06:11:20':
FLIGHTS_CHN ← σ(dest = 'Chennai' AND time < '06:11:20')(Flight)

Step 3: Join:
RESULT ← π(Fid)(P124 ⋈(P124.Fid = FLIGHTS_CHN.Fid AND P124.Fdate = FLIGHTS_CHN.Fdate) FLIGHTS_CHN)
```

Query d — Find agency names for agencies that do not have any bookings for passenger with Pid=123:

```
Step 1: Find agencies that DO have bookings for Pid=123:
WITH_123 ← π(Aid)(σ(Pid = 123)(Booking))

Step 2: All agency IDs:
ALL_AID ← π(Aid)(Agency)

Step 3: Agencies without Pid=123 bookings:
WITHOUT_123 ← ALL_AID - WITH_123

Step 4: Get the names:
RESULT ← π(Aname)(WITHOUT_123 ⋈ Agency)
```

**Working Through the Classes/Ships Schema (24-25 PYQ).**

Schema: Classes(Class, Type, Country, Numgun, Bore, Displacement), Ships(Name, Class, Launched), Battles(Name, Date), Outcomes(Ship, Battle, Result).

Query a — Find class name and country for all classes with at least 10 guns: `π(Class, Country)(σ(Numgun ≥ 10)(Classes))`

Query b — Find names of all ships launched prior to 1918: `π(Name)(σ(Launched < 1918)(Ships))`

Query c — Find names of ships sunk in battle and the battle name: `π(Ship, Battle)(σ(Result = 'sunk')(Outcomes))`

Query d — Find all ships used by country India:

```
INDIA_CLASSES ← π(Class)(σ(Country = 'India')(Classes))
RESULT ← π(Name)(Ships ⋈(Ships.Class = INDIA_CLASSES.Class) INDIA_CLASSES)
```

Query e — Find names of all ships that begin with letter 'R': `π(Name)(σ(Name LIKE 'R%')(Ships))`

---

## 8. Tuple Relational Calculus (TRC)

TRC is a non-procedural language — you describe what you want without saying how to get it. In TRC, a query has the form `{t | COND(t)}` where `t` is a tuple variable that ranges over some relation, and COND(t) is a logical formula that the tuple must satisfy.

**Key building blocks.** `R(t)` means "t is a tuple in relation R." `t.A` accesses attribute A of tuple t. You use ∃ (there exists) to introduce additional tuple variables when you need to reference other relations. You use ∀ (for all) for "for all" queries.

**Converting RA to TRC — the pattern.**

A SELECT `σ(condition)(R)` becomes `{t | R(t) AND condition(t)}`.

A PROJECT `π(A1, A2)(R)` becomes `{t.A1, t.A2 | R(t)}`.

A JOIN `R ⋈(R.A = S.B) S` becomes `{t | ∃r(R(r)) AND ∃s(S(s)) AND r.A = s.B AND ...}`. You list which attributes to project at the front.

**Worked Example — MAILORDER Schema (21-22 PYQ).**

Retrieve names of parts that cost less than $20:

RA: `π(Pname)(σ(Price < 20)(PARTS))`

TRC: `{t.Pname | PARTS(t) AND t.Price < 20}`

Retrieve names and cities of employees who have taken orders for parts costing more than $50:

RA (multi-step):

```
EXPENSIVE_PARTS ← σ(Price > 50)(PARTS)
EXP_ORDERS ← ODETAILS ⋈(Pno) EXPENSIVE_PARTS
RESULT_ORDERS ← ORDERS ⋈(Ono) EXP_ORDERS
RESULT ← π(Ename, City)(RESULT_ORDERS ⋈(Eno) EMPLOYEES ⋈(Zip) ZIP_CODES)
```

TRC:

```
{t.Ename, z.City | EMPLOYEES(t) AND ZIP_CODES(z) AND t.Zip = z.Zip AND 
  ∃o(ORDERS(o) AND o.Eno = t.Eno AND 
    ∃d(ODETAILS(d) AND d.Ono = o.Ono AND 
      ∃p(PARTS(p) AND p.Pno = d.Pno AND p.Price > 50)))}
```

The pattern is clear: you nest ∃ quantifiers to "join" across relations, working outward from the innermost condition.

**Retrieve pairs of customer numbers of customers who live in the same ZIP code:**

This query needs a self-join — comparing customers with each other.

RA: `π(C1.Cno, C2.Cno)(σ(C1.Zip = C2.Zip AND C1.Cno < C2.Cno)(CUSTOMERS × ρ(C2)(CUSTOMERS)))`

TRC: `{t.Cno, u.Cno | CUSTOMERS(t) AND CUSTOMERS(u) AND t.Zip = u.Zip AND t.Cno < u.Cno}`

The `t.Cno < u.Cno` condition avoids listing both (101,102) and (102,101) — you get each pair exactly once.

---

## 9. Schedule Analysis — Recoverable, Cascadeless, Strict

Given a schedule (a sequence of read, write, commit, and abort operations from multiple transactions), you need to classify it. The three properties exist on a hierarchy where strict ⊂ cascadeless ⊂ recoverable. Every strict schedule is cascadeless; every cascadeless schedule is recoverable — but not the other way around.

**Understanding Recoverable.** A schedule is recoverable if no transaction commits before all transactions whose writes it has read have also committed. The concern is: if T2 reads a value written by T1, and T1 later aborts, T2 has built on invalid data. If T2 has already committed, you cannot undo it — the schedule is unrecoverable.

**Rule for recoverable:** For every pair (wᵢ(X), rⱼ(X)) where j ≠ i and rⱼ reads the value written by wᵢ — the commit of Tᵢ must appear before the commit of Tⱼ in the schedule.

**Understanding Cascadeless (ACA — Avoids Cascading Rollback).** The problem with merely recoverable schedules is that if T1 aborts, you must also abort T2 (which read T1's dirty data), and then every transaction that read T2's data must also abort — a cascade. A cascadeless schedule prevents this by requiring that no transaction reads uncommitted data.

**Rule for cascadeless:** For every pair (wᵢ(X), rⱼ(X)) — the commit of Tᵢ must appear before rⱼ(X) in the schedule. Not just before the commit of Tⱼ, but before the actual read operation itself.

**Understanding Strict.** A strict schedule prevents both reading and writing uncommitted data, which makes recovery straightforward — to undo a transaction, you simply restore the before-image of each item it wrote.

**Rule for strict:** For every write wᵢ(X) — no other transaction may read or write X until Tᵢ has committed or aborted. So if wᵢ(X) appears in the schedule, then for any rⱼ(X) or wⱼ(X) that comes after it (j ≠ i), the commit or abort of Tᵢ must appear between wᵢ(X) and rⱼ(X)/wⱼ(X).

**Worked Example — the PYQ Schedules.**

The schedules S3, S4, S5 appeared in both 23-24 and 24-25 papers.

S3: r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); c1; w3(y); c3; r2(y); w2(z); c2

Let's number the operations for clarity:

1. r1(x) 2. r2(z) 3. r1(z) 4. r3(x) 5. r3(y) 6. w1(x) 7. c1 8. w3(y) 9. c3 10. r2(y) 11. w2(z) 12. c2

**Finding write-read pairs:** Look for every (wᵢ(X), rⱼ(X)) pair where j ≠ i and rⱼ(X) reads the value written by wᵢ(X) — meaning wᵢ is the most recent write before rⱼ.

- w1(x) at step 6, then c1 at step 7. Is there any r(x) after step 6? No. So no transaction reads T1's write on x.
- w3(y) at step 8. The next read of y is r2(y) at step 10. T2 reads the value written by T3.
- w2(z) at step 11. No read of z after this. Fine.

The only write-read dependency is: T3 writes y, T2 reads it.

**Recoverable?** T3 must commit before T2 commits. c3 is at step 9, c2 is at step 12. Step 9 < step 12. **YES, recoverable.** ✓

**Cascadeless?** T3 must commit before T2 reads y. c3 at step 9, r2(y) at step 10. Step 9 < step 10. **YES, cascadeless.** ✓

**Strict?** After w3(y) at step 8, does any other transaction read or write y before T3 commits? T3 commits at step 9 (c3). Between step 8 and step 9, there are no r(y) or w(y) operations by other transactions. After c3 at step 9, r2(y) appears at step 10 — T3 has already committed. **YES, strict.** ✓

**S3 is strict** (and therefore also cascadeless and recoverable).

---

S4: r1(x); r2(z); r1(z); r3(x); r3(y); w1(x); c1; w3(y); r2(y); w2(z); w2(y); c2

Note carefully: T3 never commits in this schedule (no c3 appears).

Steps: 1.r1(x) 2.r2(z) 3.r1(z) 4.r3(x) 5.r3(y) 6.w1(x) 7.c1 8.w3(y) 9.r2(y) 10.w2(z) 11.w2(y) 12.c2

Write-read pairs: w3(y) at step 8, r2(y) at step 9. T2 reads y written by uncommitted T3.

**Cascadeless?** T3 must commit before r2(y). But T3 never commits. r2(y) at step 9 reads dirty data from T3. **NOT cascadeless.** ✗

**Recoverable?** T3 must commit before T2 commits. T3 never commits, yet T2 commits at c2 (step 12). T2 has committed after reading from an uncommitted T3 — if T3 later aborts, T2's actions are permanently wrong and cannot be undone. **NOT recoverable.** ✗ (Hence also not cascadeless or strict.)

**S4 is not recoverable** (the worst classification).

---

S5: r1(x); r2(z); r3(x); r1(z); r2(y); r3(y); w1(x); c1; w2(z); w3(y); c3; w2(y); c2

Steps: 1.r1(x) 2.r2(z) 3.r3(x) 4.r1(z) 5.r2(y) 6.r3(y) 7.w1(x) 8.c1 9.w2(z) 10.w3(y) 11.c3 12.w2(y) 13.c2

Write-read pairs: Find reads that occur after a write on the same item by another transaction.

- w1(x) at step 7. Any r(x) after step 7? Steps 8 through 13 — no r(x). Fine.
- w2(z) at step 9. Any r(z) after step 9? No. Fine.
- w3(y) at step 10. Any r(y) after step 10? Looking at remaining steps: w2(y) at step 12, c2 at step 13. No r(y) after step 10. Fine.
- w2(y) at step 12. Any r(y) after step 12? c2 at step 13 — no read. Fine.

Actually, check the earlier reads: r2(y) at step 5. Was there any write to y before step 5? Steps 1-4: no w(y). So r2(y) reads the initial value of y — no dependency on another transaction. r3(y) at step 6 similarly reads the initial value.

So there are **no write-read dependencies** between different transactions in S5. Every read reads either the initial value or a value written by the same transaction.

**Recoverable?** No cross-transaction read dependencies means the condition is trivially satisfied. **YES, recoverable.** ✓

**Cascadeless?** Same reasoning — no transaction reads another's uncommitted write. **YES, cascadeless.** ✓

**Strict?** After w1(x) at step 7, does any other transaction r(x) or w(x) before T1 commits? c1 is at step 8 (right after). No other transaction touches x between steps 7 and 8. After w2(z) at step 9, no other transaction touches z. After w3(y) at step 10, T3 commits at step 11 (c3). Then T2 writes y at step 12 — after T3's commit. Fine. After w2(y) at step 12, T2 commits at step 13. No one else touches y. **YES, strict.** ✓

**S5 is strict.**

---

## 10. Conflict Serializability — Precedence Graph

Two operations **conflict** if they access the same data item, belong to different transactions, and at least one of them is a write. Conflicting pairs are: (rᵢ(X), wⱼ(X)), (wᵢ(X), rⱼ(X)), and (wᵢ(X), wⱼ(X)) for i ≠ j.

A schedule is **conflict serializable** if it is equivalent to some serial schedule when considering only conflicting operations — meaning the relative order of every conflicting pair is the same in the schedule as it would be in some serial execution.

**The Precedence Graph (Serializability Graph).**

Create one node for each transaction. For each conflicting pair of operations (Oᵢ from Tᵢ appears before Oⱼ from Tⱼ in the schedule), draw a directed edge from Tᵢ to Tⱼ. After drawing all edges, check for cycles. If the graph is acyclic, the schedule is conflict serializable, and a topological sort of the graph gives the equivalent serial order. If there is a cycle, it is not conflict serializable.

**Worked Example.**

Schedule S: r1(A); r2(B); r1(B); w1(A); r2(A); w2(B)

Step 1 — Identify all conflicting pairs. Go through every pair of operations on the same data item from different transactions:

On item A:

- r1(A) at step 1 and w2(A) at step 5 (one is a write, different transactions) → conflict. r1(A) comes first → edge T1 → T2.
- w1(A) at step 4 and r2(A) at step 5 → conflict. w1(A) comes first → edge T1 → T2.

On item B:

- r2(B) at step 2 and r1(B) at step 3 → both reads, NOT a conflict.
- r2(B) at step 2 and w2(B) at step 6 → same transaction (T2), not applicable.
- r1(B) at step 3 and w2(B) at step 6 → conflict. r1(B) comes first → edge T1 → T2.

Step 2 — Draw the graph: Two nodes (T1, T2). Three edges, all pointing T1 → T2.

Step 3 — Check for cycles: No cycle (just T1 pointing to T2). **Conflict serializable.** Equivalent serial order: T1 then T2.

**Example with a cycle.**

Schedule S: r1(A); r2(A); r2(B); r1(B); w1(A); w2(B)

On item A:

- r1(A) and w1(A): same transaction, skip.
- r2(A) and w1(A) at step 5: r2(A) comes first → edge T2 → T1.

On item B:

- r2(B) at step 3 and r1(B) at step 4: both reads, not a conflict.
- r2(B) at step 3 and w2(B) at step 6: same transaction, skip.
- r1(B) at step 4 and w2(B) at step 6: r1(B) comes first → edge T1 → T2.

Graph: T2 → T1 and T1 → T2. This is a **cycle.** The schedule is **NOT conflict serializable.**

However, it might still be view serializable — a harder test that allows blind writes to make some non-conflict-serializable schedules valid. In practice, exams at your level ask for conflict serializability only.

---

## Quick Reference — What to Do When You See Each Problem Type

When a problem gives you FDs and asks for keys, start by classifying attributes (LHS-only must be in every key) and then compute closures of candidate combinations. When it asks for minimal cover, run the three-step algorithm carefully in order. When it says "normalize to 3NF," use the synthesis algorithm (minimal cover → create relations → add key relation → remove redundant). When it says "normalize to BCNF," use the decomposition algorithm (find a violating FD → split → recurse). Always check whether your decomposition is lossless (quick binary test) and dependency-preserving (project FDs onto each piece and check if originals are derivable). For RA queries, identify which relations you need, chain select-project-join in logical order, and use division only for "all" queries. For TRC, convert each RA step into a logical formula with ∃ quantifiers for joined relations. For schedule analysis, hunt for write-read pairs between different transactions and apply the three definitions in order of strictness. For conflict serializability, draw the precedence graph and look for cycles.

---
# References 
