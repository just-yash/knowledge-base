
Date :  2026-03-18  
Tags :   [[Set]] ; [[Maths]]  
~ ***Yash Agrawall*** ~  

---
# Set Theory
## Introduction to Sets

### Definition
- fundamental discrete structures on which all discrete structures are built. 
- sets are used to group, objects together
- unordered, well-defined collection of distinct objects
- Objects are called elements or members of the set.
- Sets are usually denoted by capital letters ($A, B, C, \dots$).
- Elements are denoted by lowercase letters ($a, b, c, \dots$).

---
### Membership

- If $x$ is an element of set $A$, we write $x \in A$.
- If $x$ is not an element of set $A$, we write $x \notin A$.
- ∈ : element of / belongs to

---
### Representation of Sets

#### Roster or Tabular Form

- Elements are listed inside braces and separated by commas.
###### Example
- Set of vowels: V = {a, e, i, o, u}

#### Set-Builder Form

- Elements are defined by a property that must be satisfied.
- Notation: A = {x | P(x)} (read as "set of all x such that $x$ satisfies property P").
![[Pasted image 20260318224239.png]]
###### Example
- Set of even numbers: E = {x | x ∈ even numbers}

---
## Some Common Sets

- Set of all [[Number System#Natural Numbers (N)|Natural Numbers (N)]] : N = {1, 2, 3, 4, … ∞}
- Set of all [[Number System#Whole Numbers (W)|Whole Numbers (W)]] : W = {0, 1, 2, 3, … ∞}
- Set of all [[Number System#Integers (I) or (Z)|Integers (Z) or (I)]] : I / Z = {-∞, … , -3, -2, -1, 0, 1, 2, 3, … , ∞}
- Set of all [[Number System#Rational Numbers (Q)|Rational Numbers (Q)]] 
- Set of all [[Number System#Irrational Numbers (Q' / $I_r$)|Irrational Numbers (Q')]] or $I_r$
- Set of all [[Number System#Real Numbers (R)|Real Numbers (R)]]
- Set of all [[Number System#Complex Numbers (C)|Complex Numbers (C)]]

---
## Types of Sets

### Finite and Infinite Sets

- **Finite Set:** Contains a countable number of elements.
	- ###### Example : $A= \\\{1, 2, 3, 5\\\}$ 
	- **Cardinality of a Set**: The number of elements present in a set 
		- denoted by $|A|$
		- ###### Example : $|A| = 4$
- **Infinite Set:** Contains an uncountable number of elements.

---
### Empty Set / Null Set ($ϕ$) 

- A set containing no elements.
- Notation: $\emptyset$ or $\\\{\\\}$.
- Cardinality: $|\emptyset| = 0$.
- ϕ is a ⊆ of every set
> $\\\{ ϕ \\\}$ is not an empty set. It is a set that contains another set which is empty 
    Cardinality of $\\\{ ϕ \\\}$ = 1 

---
### Universal Set

- Contains all possible elements under consideration.
- Notation: $U$ or $\xi$ (xi).
- in Venn Diagram it is represented by a rectangle
- every set is a ⊆ of $U$

---
### Subsets, Proper Subsets & Supersets

- **Subset ($A \subseteq B$):** Every element of $A$ is also an element of $B$.
	- ∀ x (x ∈ A → x ∈ B) ⇔ A $\subseteq{}$B
	- Every set is a ⊆ of itself
- **Proper Subset ($A \subset B$):** Every element of $A$ is in $B$, and $A \neq B$.
	- ∀ x(x ∈ A → x ∈ B, A ≠ B) ⇔ A ⊂ B
	- B is **superset** of A

---
### Equality of Sets
- If two sets A and B have the same elements and $∴$ every element of A also belong to B and every element of B also belong to A
- A = B
- A ⊆ B and B ⊆ A ⇔ A = B
- ∀ x (x ∈ A ↔ x ∈ B)

---
### Power Set

- The set of all subsets of a set $A$.
- Notation: $P(A)$ or $2^A$.
- If $|A| = n$, then $|P(A)| = 2^n$.
- Every set is a ∈ of its powerset but except ϕ no set is a ⊆ of its powerset
- Remember : 
	- ϕ is a ⊆ of every set
	- Every set is a ⊆ of itself

---
### Countable & Uncountable Sets
![[Pasted image 20260318232341.png]]

- [[Set Theory#Finite and Infinite Sets|Finite Sets]] ≠ Countable Set
- [[Set Theory#Finite and Infinite Sets|Infinite Set]] ≠ Uncountable Set

- **Countable Sets** : A set whose elements can me mapped one to one to the elements of a set of [[Number System#Natural Numbers (N)|Natural Numbers]]
	- ###### Examples : 
		- [[Number System#Integers (I) or (Z)|integers]] and [[Number System#Natural Numbers (N)|natural numbers]] have the same level of infiniteness → simplified infinity
		- [[Number System#Rational Numbers (Q)|Rational Numbers]] also have simplified infinity 
		- Set of stars, planets, etc.
- **Uncountable Sets** :  A set is said to be uncountable if there cannot be a one to one mapping between the elements of the set and [[Number System#Natural Numbers (N)|natural numbers]]. 
	- ###### Example :
		- Set of [[Number System#Real Numbers (R)|Real Numbers]]

---
## Set Operations

![[Pasted image 20260320014321.png]]

### Union ($A \cup B$)

- Collection of elements belonging to $A$, or $B$, or both.
- $A \cup B = \\\{x \mid x \in A \text{ or } x \in B\\\}$.
- $|A ∪ B| = |A| + |B| - |A ∩ B|$
- [[Logic Gates#OR Gate|OR]]

### Intersection ($A \cap B$)

- Collection of elements belonging to both $A$ and $B$.
- $A \cap B = \\\{x \mid x \in A \text{ and } x \in B\\\}$.
- [[Logic Gates#AND Gate|AND]]

### Complement ($A'$ or $A^c$ or $\overline{A}$)

- Elements in the universal set $U$ not in $A$.
- $A^c = \\\{x \mid x \in U \text{ and } x \notin A\\\}$.
- [[Logic Gates#NOT Gate (Inverter)|NOT]]

### Disjoint Sets

- Sets having no common elements
- no element in A is in B and no element in B is in A
- A ∩ B = ϕ 

### Difference ($A - B$)

- Elements in $A$ that are not in $B$.
- $A - B = \\\{x \mid x \in A \text{ and } x \notin B\\\}$.
- $A - B ≠ B - A$
- $A - B = A - A ∩ B = A ∩ \overline{B}$

### Symmetric Difference ($A \oplus B$)

- Elements in $A$ or $B$, but not in their intersection.
- $A \oplus B = (A - B) \cup (B - A) = (A \cup B) - (A \cap B)$.
- [[Logic Gates#XOR / EX-OR|XOR]]

---
## Cardinality and Laws

### Cardinality Principles

- For two finite sets $A$ and $B$: $$|A \cup B| = |A| + |B| - |A \cap B$$
- For three finite sets $A, B,$ and $C$: $$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |B \cap C| - |C \cap A| + |A \cap B \cap C$$
### Important Identities
- [[Primary Logical Operators Across Different Domains]]

---
# Questions

###### Q1) For any set A, which of the following are true?
###### a) ϕ ∈ A
###### b) ϕ ⊆ A
###### c) ϕ ∈ $2^A$
###### d) ϕ ⊆ $2^A$
###### e) A ∈ $2^A$
###### f) A ⊆ $2^A$

A1) 
a) False   
b) True  
c) True  
d) True  
e) True  
f) False   

---
###### Q2) If ϕ is an empty set. Then $|P(P(P(ϕ)))|$ = — ? 

A2)  4  
$|\phi| = 0$  
$|P(\phi)| = 2^0 = 1$  
- P(ϕ) = { ϕ }   
$|P(P(\phi))| = 2^1 = 2$  
- P(P(ϕ )) = { ϕ , { ϕ }}    
$|P(P(P(ϕ )))| = 2^2 = 4$   
- P(P(P(ϕ ))) = { ϕ , { ϕ }, {{ ϕ }}, { ϕ , { ϕ }} }

---
###### Q3) The cardinality of a power set of {0, 1, 2, … , 10} is — . 

A3) $2^{11} = 2048$ 

---
###### Q4) For a set A, the power set of A is denoted by $2^A$. If A = {5, {6}, {7}}, which of the following options are true. 
###### I) ϕ ∈ $2^A$ 
###### II) ϕ ⊆ $2^A$ 
###### III) {5, {6}} ∈ $2^A$ 
###### IV) {5, {6}} ⊆ $2^A$

###### (A) I and III only 
###### (B) II and III only 
###### (C) I, II and III only 
###### (D) I, II and IV only 

A4) C   

---
###### Q5) Let P(S) denotes the power set of set S. Which of the following is always true? 
###### a) P(P(S)) = P(S)
###### b) P(S) ∩ P(P(S)) = { ϕ }
###### (c) P(S) ∩ S = P(S)
###### (d) S ∉ P(S)

A5) b  

---
###### Q6) The number of elements in the powerset P(S) of the set S = {{ ϕ }, 1, {2, 3}} is 

A6) $2^3 = 8$  

---
###### Q7) Consider the following statements?
###### a) Finite union of finite sets(disjoint) is — (finite/infinite)
###### b) Finite union of Infinite sets(disjoint) is — (finite/infinite)
###### c) Infinite union of finite sets(distinct) is — (finite/infinite)
###### d) if after finite number of union result is infinite set, then at least of the input set(disjoint) is infinite (T / F)
###### e) if after finite number of union result is infinite set, then all of the input set is infinite (T / F)
###### f) Finite intersection of finite sets is — (finite/infinite)
###### g) Finite intersection of Infinite sets is — (finite/infinite)
###### h) If after finite number of intersection result is infinite set, then at least one of the input set is infinite (T / F)
###### i) If after finite number of intersection result is infinite set, then all of the input set is infinite (T / F)

A7) 
a) finite   
b) infinite   
c) infinite  
d) True  
e) False  
f) finite  
g) infinite (if joint sets) finite - ϕ (if disjoint sets)  
h) false   
i) true  

---
###### Q8) Which of the following is true?
###### (i) (A - B) - C = A- (C- B)
###### (ii) (A-B) -C=(A-C)-B
###### (ii) (A - B) - C = A - (B n C)
###### (iv) (A ∩ B) - (B ∩ C) = {A - (A ∩ C)} - (A - B)

###### a) i & iii
###### c) i, ii, iv
###### b) ii & iv
###### d) ii & iii

A8) b  
![[Pasted image 20260320133054.png]]
i) 1 ≠ 1, 2, 5   
ii) 1 = 1  
iii) 1 ≠ 1, 4, 5  
iv) 2 = 2  

---
###### Q9) let p, q and r be sets let @ denotes the symmetric difference defined as p @ q = (p ∪ q) - (p ∩ q)?
###### I) p @ (q ∩ r) = (p @ q) n (p @ r)
###### II) p ∩ (q ∩ r) = (p ∩ q) @ (p @ r)

###### a) I only
###### b) II only
###### c) neither I nor II
###### d) both I and II

A9) c) neither I nor II

---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=ynw_xK9hD3_tLFLx)