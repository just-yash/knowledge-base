
Type : #Note    
Date :  2026-03-21  
Tags :  [[Set]] ; [[Maths]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Partially Ordered Set (POSET)

### Definition of POSET

- A **Partially Ordered Set (POSET)** is a pair $(P, \leq)$ where:
    - $P$ is a set
    - $\leq$ is a binary relation satisfying:

#### Properties of Partial Order

- **Reflexive**
    - $\forall a \in P: a \leq a$
- **Antisymmetric**
    - If $a \leq b$ and $b \leq a$ → $a = b$
- **Transitive**
    - If $a \leq b$ and $b \leq c$ → $a \leq c$

###### Example

- Set: ${1,2,3}$ with usual $\leq$
- Set: ${1,2,3,6}$ under divisibility

---
## Comparability in POSET

### Comparable Elements

- Elements $a, b$ are comparable if:
    - $a \leq b$ or $b \leq a$

### Incomparable Elements

- Elements are incomparable if neither relation holds

###### Example

- In divisibility on ${2,3}$:
    - $2 \nmid 3$ and $3 \nmid 2$ → incomparable

---
## Hasse Diagram

### Definition

- Graphical representation of a POSET
- Simplifies relations by:
    - Removing reflexive edges
    - Removing transitive edges
    - Drawing upward direction
- Hasse diagram for a POSET can never have Horizontal line, if it does, then we cannot comment on it being a POSET
### Construction Rules

- Draw elements as nodes
- Connect $a \rightarrow b$ if:
    - $a < b$ and no intermediate element exists

###### Example

- Divisibility on ${1,2,4,8}$
    - $R = \\\{(1, 1), (1,2),(1,4), (1,8), (2,2),(2,4),(2,8),(4,4),(4,8),(8,8)\\\}$
- Graphical representation of the above $R$
![[Pasted image 20260321165530.png]]
- Removing reflexive edges
![[Pasted image 20260321165557.png]]
- Removing transitive edges
![[Pasted image 20260321165757.png]]
- Drawing in upwards direction 
![[Pasted image 20260321170004.png]]

---
## Lattice Theory

### Definition of Lattice

- A POSET $(L, \leq)$ where:
    - Every pair has:
        - **Meet ($\wedge$)** = GLB
        - **Join ($\vee$)** = LUB

---
## Types of Lattice 
### Bounded Unbounded Lattices
#### Least Upper Bound / Supremum / LUB / Join / ∨ 

- Smallest element that joins the pair in the upward direction
- if there are two elements that can be Join for a pair → join doesn't exist for that pair 
- Its not necessary that Join will exist for every pair
- If LUB exists for all the pairs → Join Semi Lattice

#### Greatest Lower Bound / Infimum / GLB / Meet / ∧ 

- Largest element where the elements of the pair meet
- if there are two elements that can be Meet for a pair → meet doesn't exist for that pair
- it is not necessary that Meet will exist for every pair
- If GLB exists for all the pairs → Meet Semi Lattice

###### Example

 ![[Pasted image 20260321225527.png]]
- LUB(a, b) = d  
- c ∨ d = e
- e ∨ f = doesn't exist 
- LUB(d, f) = f
- e ∧ f = d
- c ∧ d = d
- GLB(a, b) = doesn't exist

#### Lattice
- it is a POSET
- If their exists a Join and Meet for every pair of elements
- Both Join Semi and Meet Semi lattice
###### Example
![[Pasted image 20260321230352.png]]

#### Upper Bound
- the top most element in the POSET
- $u$ is an upper bound of subset $A$ if:
    - $\forall a \in A: a \leq u$

#### Lower Bound
- the bottom most element in the POSET 
- $l$ is a lower bound if:
    - $\forall a \in A: l \leq a$

#### Unbounded Lattice 
- infinite elements

###### Example 
![[Pasted image 20260321231317.png]]

#### Bounded Lattice
- finite no. of elements

---
### Complement and Distributive Lattices

#### Complemented Lattice
- there exists at least one complement(one or more) for every element
- A complemented lattice is a bounded lattice (having a least element $0$ and a greatest element $1$) in which every element has a complement.
- $0$ → lower bound of the lattice / Least element
- $1$ → upper bound of the lattice / Greatest element 
##### Complement of an Element
Let $(L, \leq)$ be a bounded lattice with $0$ and $1$. An element $b \in L$ is called a **complement** of an element $a \in L$ if:
- $a \lor b = 1$ (their join is the greatest element)
- $a \land b = 0$ (their meet is the least element) 
It is denoted as $b = a'$ or $b = \bar{a}$.
###### Key Properties:
- In any bounded lattice, the complement of $0$ is $1$ ($0' = 1$), and the complement of $1$ is $0$ ($1' = 0$).
- Complements are not necessarily unique. An element can have zero, one, or multiple complements.
###### Example
Consider the lattice represented by the following Hasse diagram (often called the "Diamond" lattice $M_3$):
In this lattice:
- $a \lor b = 1$ and $a \land b = 0$, so $b$ is a complement of $a$.
- $a \lor c = 1$ and $a \land c = 0$, so $c$ is also a complement of $a$.
- Thus, the complement of $a$ is not unique. The same applies to $b$ and $c$. Since every element has at least one complement, this is a complemented lattice. 
![[Pasted image 20260322181630.png|435]]
![[Pasted image 20260322181553.png]]

#### Distributive Lattice
- there exists at most one complement (zero or one) for every element
A lattice $(L, \leq)$ is called a **distributive lattice** if the join ($\lor$) and meet ($\land$) operations distribute over each other for all elements $a, b, c \in L$.
##### Distributive Laws
A lattice is distributive if both of the following equivalent conditions hold:
1. **Distributivity of $\land$ over $\lor$**: $a \land (b \lor c) = (a \land b) \lor (a \land c)$
2. **Distributivity of $\lor$ over $\land$**: $a \lor (b \land c) = (a \lor b) \land (a \lor c)$
- Lattice may satisfy : every element has at most one complement
- but it doesn't satisfy the distributive laws
- or has a pentagon / diamond structure / substructure then its not distributive(**non-distributive lattice**)
###### Key Properties and Theorems:
- **Uniqueness of Complements**: In a distributive lattice, if an element has a complement, that complement must be unique. 
- **Fundamental Theorem**: A lattice is distributive iff it does not contain a sublattice isomorphic to the "Diamond" lattice ($M_3$) or the "Pentagon" lattice ($N_5$).
- **Example of Non-Distributive Lattices**: The Diamond lattice ($M_3$) and the Pentagon lattice ($N_5$) shown above are the simplest examples of non-distributive lattices.
###### Example : Distributive Lattice 
![[Pasted image 20260322181020.png]]
```
    d
    |
    c
    |
    b
    |
    a
```
![[Pasted image 20260322181553.png]]
###### Example : Non-distributive Lattice 
![[Pasted image 20260322181151.png]]

#### Boolean Lattice (Boolean Algebra)
- both **complemented** and **distributive**.
- there exists exactly one complement for every element
###### Properties of Boolean Lattices:
In a Boolean lattice $(B, \land, \lor, ', 0, 1)$, the following laws always hold:
1. **Boundedness Laws**:
       - $a \lor 1 = 1, a \land 0 = 0$
    - $a \lor 0 = a, a \land 1 = a$
2. **Complement Laws**:
    - $a \lor a' = 1, a \land a' = 0$
    - $0' = 1, 1' = 0$
3. **Idempotent Laws**: $a \lor a = a, a \land a = a$
4. **Commutative Laws**: $a \lor b = b \lor a, a \land b = b \land a$
5. **Associative Laws**: $(a \lor b) \lor c = a \lor (b \lor c), (a \land b) \land c = a \land (b \land c)$
6. **Distributive Laws**:
    - $a \land (b \lor c) = (a \land b) \lor (a \land c)$
    - $a \lor (b \land c) = (a \lor b) \land (a \lor c)$
7. **De Morgan's Laws**:
    - $(a \lor b)' = a' \land b'$
    - $(a \land b)' = a' \lor b'$
8. **Involution Law (Double Complement)**: $(a')' = a$
A prime example of a Boolean lattice is the power set of any set $S$, ordered by inclusion $(P(S), \subseteq)$, where join is union ($\cup$), meet is intersection ($\cap$), and complement is the set-theoretic complement ($S - A$).
###### Example 
![[Pasted image 20260322181553.png]]

---
###### Q1) Consider a Partial order relation and convert into Hasse Diagram. $R$ = {(1, 1), (1, 2), (1, 3), (1, 6), (2, 2), (2, 6), (3, 3), (3, 6), (6, 6)}

A1) 
![[Pasted image 20260321170906.png]]
![[Pasted image 20260321171007.png]]

---
###### Q2) Study the following hasse diagrams and find which of the following are valid?
###### a) ![[Pasted image 20260321171117.png]]
###### b) ![[Pasted image 20260321171140.png]]
###### c) ![[Pasted image 20260321171450.png]]
###### d) ![[Pasted image 20260321171459.png]]
###### e) ![[Pasted image 20260321171510.png]]
###### f) ![[Pasted image 20260321171706.png]]
###### g) ![[Pasted image 20260321171719.png]]
###### i) ![[Pasted image 20260321171737.png]]
###### j) ![[Pasted image 20260321171944.png]]
###### k) ![[Pasted image 20260321171954.png]]
###### l) ![[Pasted image 20260321172005.png]]

A3) 
a : valid  
b : valid  
c : invalid (has horizontal lines)  
d : invalid (reflexive edge has not been removed)   
e : invalid (transitive edge has not been removed)  
f : invalid (transitive edge has not been removed)  
h : invalid (transitive edge has not been removed)  
i : invalid (transitive edge has not been removed)  
j : invalid (transitive edge has not been removed)  
k : valid  
l : valid  

---
###### Q4) Let X = {2,3,6,12,24}, Let ≤ be the partial order defined by x ≤ y, if x divides y. Number of edges as in the Hasse diagram of (X, ≤) is.
###### a) 3
###### (b) 4
###### (c) 9
###### (d) None of the above

A4) (b) 4
![[Pasted image 20260321224549.png]]

---
###### Q5) Find which of the following is a lattice and Boolean Algebra
###### (1) $[\\\{1,2,3,4,6,9\\\}, /]$
###### (2) $[\\\{2,3,4,6,12\\\}, /]$
###### (3) $[\\\{1,2,3,5,30\\\}, /]$
###### (4) $[\\\{1,2,3,6,9,18\\\}, /]$
###### (5) $[\\\{2,3,4,9,12,18\\\}, /]$
###### (6) $[R, <= ]$
###### (7) $[P(A), ⊆ ], A = \\\{1,2,3\\\}$

A5) 
1) Not a lattice 
![[Pasted image 20260322182701.png]] 
2) Not a lattice 
![[Pasted image 20260322182928.png]]
3) Complemented Lattice only
![[Pasted image 20260322183145.png]]
4) Distributive only 
![[Pasted image 20260322183435.png]]
5) Not a lattice 
![[Pasted image 20260322183643.png]]
6) it is an unbounded lattice
7) Boolean Lattice
![[Pasted image 20260322184913.png]]
---
###### Q6) Consider the following hasse diagram, find which of the following is true?
![[Pasted image 20260322201449.png]]
###### a) subset {a, b, c, g} is a lattice
###### b) subset {a, b, f, g} is a lattice
###### c) subset {a, d, e, g} is a lattice
###### d) subset {a, c, e, g} is a lattice

A6) a, c 

---
# References

- [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=fBrxgcCv1GzDyCzo)