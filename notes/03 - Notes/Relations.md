
Type : #Note    
Date :  2026-03-20   
Tags :  [[Maths]] ; [[Set]]  
Status : #complete     
~ ***Yash Agrawall*** ~   

---
# Cartesian Product

---
### Definition

- The Cartesian product of two sets $A$ and $B$, denoted $A \times B$, is the set of all ordered pairs $(a, b)$ where $a \in A$ and $b \in B$. $$A \times B = \\\{(a, b) \mid a \in A \text{ and } b \in B\\\}$$
### Properties

- If $|A| = m$ and $|B| = n$
	- $|A \times B| = m \times n$
	- $|B \times A| = n \times m$
- $A \times B \neq B \times A$ (not commutative).
- $A \times (B \cap C) = (A \times B) \cap (A \times C)$.

###### Example
- Let $A = \\\{1, 2\\\}$, $B = \\\{a, b, c\\\}$.
- $A \times B = {(1, a), (1, b), (1, c), (2, a), (2, b), (2, c)}$
- $|A \times B| = 2 \times 3 = 6$

---
# Relation

---
### Definition

- A relation $R$ from set $A$ to set $B$ is a subset of the Cartesian product $A \times B$.
- Denoted by $R : A → B$ 
- $R \subseteq A \times B$.
- If $(a, b) \in R$, we say $a$ is related to $b$, denoted $aRb$.

### Number of Relations

- Largest possible relation between $A$ and $B$ will be $A \times B$ 
- Smallest possible relation between $A$ and $B$ will be $\phi$ 
- If $|A| = m$ and $|B| = n$, total possible relations from $A$ to $B$ is $2^{mn}$.

###### Example
- Let $A = {1, 2}$. $A \times A = {(1, 1), (1, 2), (2, 1), (2, 2)}$.
- Total relations on $A = 2^{2^2} = 2^4 = 16$.

---
# Operations on Relations

---
## 1. Complement of a Relation

- Let $R$ be a relation from $A$ to $B$, then complement of relation will be denoted by $R'\text{ , } R^c \text{ or } \overline{R}$
$$R^c = \\\{(a,b) | (a,b) \in A \times B,(a,b) \notin R\\\}$$
$$\overline{R} = (A \times B) - R$$
- $R ∪  R' = A \times B$
- $R ∩ R' = \phi$ 
 
###### Example 
- $A \times B = {(1, a), (1, b), (1, c), (2, a), (2, b), (2, c)}$
- $R = \\\{(a,1), (a, 3), (b, 2)\\\}$
- $\overline{R} = \\\{(a,2), (b,1), (b, 3)\\\}$

---
## 2. Inverse Relation

- If $R$ is a relation from $A$ to $B$, $R^{-1}$ is a relation from $B$ to $A$: $$R^{-1} = \\\{(b, a) \mid (a, b) \in R\\\}$$
- $R : A → B$
- $R^{-1}: B → A$ 
### [[Set Theory#Cardinality and Laws|Cardinality]]
- $|R| = |R^{-1}|$

###### Example : 
- $A \times B = \\\{(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)\\\}$
- $R = \\\{(a, 1), (a, 3), (b, 2)\\\}$
- $R^{-1}= \\\{(1,a),(3,a),(2,b)\\\}$

---
## 3. Composition of Relations

- If $R$ is a relation from $A$ to $B$, and $S$ is a relation from $B$ to $C$, the composite relation $S \circ R$ from $A$ to $C$ is: $$S \circ R = {(a, c) \mid a \in A, c \in C, \exists \text{ b} \in B \text{ such that } (a, b) \in R \text{ and } (b, c) \in S}$$
---
## Representation of Relations

---
### 1. Set Representation

- Listing ordered pairs.

### 2. Matrix Representation

- A binary matrix $M_R$ where $M_{ij} = 1$ if $(a_i, b_j) \in R$, and $0$ otherwise.
$$
M_{ij} =
\begin{cases}
1 & (a_i, b_j) \in R \\
0 & \text{otherwise}
\end{cases}
$$

### 3. Directed Graph (Digraph)

- Nodes represent elements of set $A$.
- A directed edge exists from $a$ to $b$ if $(a, b) \in R$.

---
# Relation on a Set

- A relation $R$ on a set $A$ is a subset of $A \times A$.
- $R \subseteq A \times A$
- If $R$ is a relation on a set $A$ with $|A| = n$, total possible relations on $A$ is $2^{n^2}$.

---
## Diagonal Relation

- A relation $R$ on a set $A$ is said to be diagonal relation if $R$ is a set of all ordered pair $(x,x)$, $∀ x \in A$ 
- denoted as $\triangle_A$
- $R = \\\{(x,x) |\text{ } \forall x \in A\\\}$

###### Example 
- $A = \\\{1,2,3\\\}$
- $\triangle_A = \\\{(1,1),(2,2),(3,3)\\\}$

<table>
  <tr>
    <td>1,1</td>
    <td>1,2</td>
    <td>1,3</td>
  </tr>
  <tr>
    <td>2,1</td>
    <td>2,2</td>
    <td>2,3</td>
  </tr>
  <tr>
    <td>3,1</td>
    <td>3,2</td>
    <td>3,3</td>
  </tr>
</table>

---
# Properties of Relations

---
### Reflexive Relation

- $$\forall a \in A, (a, a) \in R$$
- it must have Diagonal Elements, no restrictions in having other elements
- Number of reflexive relations on set $A$ ($|A|=n$): $$2^{n^2-n} = 2^{n(n-1)}$$
- Smallest reflexive relation is $\triangle_A$ 
- Largest reflexive relation is $A\times A$ 
- If two relations $R_1$ and $R_2$ are reflexive
	- $R_1 ∪ R_2$ is reflexive 
	- $R_1 ∩ R_2$ is reflexive 
- Any superset of reflexive relation will also be reflexive
- Any subset of reflexive relation can be anything, reflexive, irreflexive or neither 
- If a relation $R$ is reflexive
	- $R^{-1}$ is also reflexive
	- $R'$ is irreflexive

### Irreflexive Relations

- $$\forall a \in A, (a, a) \notin R$$
- It should not have any of the diagonal elements, no restrictions in having other elements
- Number of irreflexive relations on set $A$ ($|A|=n$): $$2^{n^2-n} = 2^{n(n-1)}$$
- Smallest irreflexive relation is $\phi$
- Largest irreflexive relation is $(A\times A) - \triangle _A$ 
- If two relations $R_1$ and $R_2$ are irreflexive
	- $R_1 ∪ R_2$ is irreflexive 
	- $R_1 ∩ R_2$ is irreflexive 
- Any superset of irreflexive relation can be anything, reflexive, irreflexive or neither 
- Any subset of irreflexive relation is also irreflexive
- If a relation $R$ is irreflexive
	- $R^{-1}$ is also irreflexive
	- $R'$ is reflexive

###### Example 
- $A = \\\{1, 2, 3\\\}$
	- $A \times A$ : Reflexive
	- $\phi$ : Irreflexive
	- {(1,1), (2,2), (3,3)} : Reflexive
	- {(1,2), (2,3), (1,3)} : Irreflexive
	- {(1,1), (1,2), (2,1), (2,2)} : Neither Reflexive not Irreflexive
	- {(1,1), (2,2), (3,3), (1,3), (2,1)} : Reflexive
	- {(1,3), (2,1), (2,3), (3,2)} : Irreflexive


---
### Symmetric Relation

- A relation $R$ on set $A$ is symmetric if $$(a, b) \in R \implies (b, a) \in R$$ for all $a, b \in A$
- Matrix: $M_R = M_R^T$ (Matrix equals its transpose).
- Number of symmetric relations on set $A$ ($|A|=n$): $$2^\frac{n(n+1)}{2}= 2^\frac{n^2 + n}{2}$$ 
- Smallest symmetric relation is $\phi$
- Largest symmetric relation is $A\times A$ 
- if a relation on a set $A$ is symmetric then $R = R^{-1}$
- if two relations $R_1$ and $R_2$ are symmetric 
	- $R_1 ∪ R_2$ is symmetric 
	- $R_1 ∩ R_2$ is symmetric 
- If a relation is symmetric, we cannot make a comment on it subset or superset
- If a relation is symmetric, then its complement $R^c$ will also be symmetric 

### Antisymmetric Relation

- A relation $R$ on set $A$ is antisymmetric if $$(a, b) \in R \text{ and } (b, a) \in R \implies a = b$$ for all $a, b \in A$.
- It allows diagonal elements, but for other symmetric pairs, we can only take 1 or neither
- Matrix: $M_{ij} = 1 \text{ and } M_{ji} = 1 \implies i = j$.
- Number of antisymmetric relations on set $A$ ($|A|=n$): $$2^n \cdot 3^\frac{n(n-1)}{2}$$
- Smallest anti-symmetric relation is $\phi$ 
- Largest anti-symmetric relation will contain $\frac{n(n+1)}{2}$ elements
- A relation $R$ on a set $A$ is anti-symmetric if $R ∩ R^{-1} ⊆ \triangle_A$ 
- subset of a anti-symmetric will also be anti-symmetric 
- we cannot comment on the symmetry of the superset of an anti-symmetric relation
- if two relations $R_1$ and $R_2$ are anti-symmetric 
	- $R_1 ∪ R_2$ → we cannot comment 
	- $R_1 ∩ R_2$ is anti-symmetric 
- if a relation is anti-symmetric, we cannot comment on the symmetry of its complement

### Asymmetric Relation 
- A relation $R$ on set $A$ is asymmetric if $$(a, b) \in R \text{ and } (b, a) \notin R$$ for all $a, b \in A$.
- it doesn't allow diagonal elements either 
- Smallest asymmetric relation is $\phi$
- Largest asymmetric relation will contain $\frac{n(n-1)}{2}$ elements.
- Number of asymmetric relations on set $A$ ($|A|=n$): $$3^\frac{n(n-1)}{2}$$
- Every asymmetric relation is also anti-symmetric. the vice-versa is false
- subset of asymmetric will also be asymmetric 
- superset of asymmetric may or may not be asymmetric 
- if two relations $R_1$ and $R_2$ are asymmetric 
	- $R_1 ∪ R_2$ → we cannot comment 
	- $R_1 ∩ R_2$ is asymmetric 
- if a relation is asymmetric, we cannot comment on the symmetry of its complement

###### Example 

| Relation                                | Symmetric | anti-symmetric | asymmetric |
| --------------------------------------- | --------- | -------------- | ---------- |
| $A\times A$                             | T         | F              | F          |
| $\phi$                                  | T         | T              | T          |
| $\\\{(1,1),(2,2),(3,3)\\\}$             | T         | T              | F          |
| $\\\{(1,2), (2,3), (1,3)\\\}$           | F         | T              | T          |
| $\\\{(1,1),(1,2),(2,1),(2,2)\\\}$       | T         | F              | F          |
| $\\\{(1,1),(2,2),(3,3),(1,3),(2,1)\\\}$ | F         | T              | F          |
| $\\\{(1,3),(2,1),(2,3),(3,2)\\\}$       | F         | F              | F          |

---
### Transitive Relation

- A relation $R$ on set $A$ is transitive if $$(a, b) \in R \text{ and } (b, c) \in R \implies (a, c) \in R$$ for all $a, b, c \in A$.
- Matrix: If $M_R^2 \subseteq M_R$ (using boolean multiplication).
- Smallest transitive relation is $\phi$
- Largest Transitive relation is $A \times A$
- If two relations$R_{1}$ and $R_2$ are transitive
	- $R_{1} \cup R_{2}$ may or may not be transitive 
	- $R_{1} \cap R_{2}$ is Transitive 
###### Example 
- Relation:
	- $A\times A$ : Transitive
	- $\phi$ : Transitive
	- {(1,1), (2,2), (3,3)} : Transitive
	- {(1,2), (2,3), (1,3)} : Transitive
	- {(1,1), (1,2), (2,1), (2,2)} : Transitive 
	- {(1,1), (2,2), (3,3), (1,3), (2,1)} : Not transitive 
	- {(1,3), (2,1), (2,3), (3,2)} : Not Transitive 
	- {(1,2)} : Transitive
	- {(1,3), (2,3)} : Transitive 
	- {(1,2), (1,3)} : Transitive 
	- {(2,3), (1,2)} : Not Transitive

> Tip : draw like this and check : 1 → 2

### Warshall's Algorithm (used to find Transitive [[Relations#Closures of Relations|Closures]])
- Represent the relation in a form of a table
- write 1 for the elements that exist in the relation
- write 0 for the elements that don't exist in the relation 
- create a table and write the row/column number as the columns and rows and columns as rows 
- then write all the places where you got 1
- then take cartesian product of rows and columns 
- match it with the elements you have, the ones you don't have are the closure elements
- if closure = $\phi$ then relation is transitive

###### Example 
$A = \\\{a, b, c\\\}$  
$R = \\\{(a,a),(a,c),(b,b),(c,a),(c,b)\\\}$  
<table>
  <tr>
    <td></td>
    <td>a</td>
    <td>b</td>
    <td>c</td>
  </tr>
  <tr>
    <td>a</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>b</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td>c</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
  </tr>
</table>

<table>
  <tr>
    <td></td>
    <td>a</td>
    <td>b</td>
    <td>c</td>
  </tr>
  <tr>
    <td>column</td>
    <td>a, c</td>
    <td>b, c</td>
    <td>a</td>
  </tr>
  <tr>
    <td>rows</td>
    <td>a, c</td>
    <td>b</td>
    <td>a, b</td>
  </tr>
  <tr>
    <td>cartesian product </td>
    <td>(a, a), (a, c), (c, a), (c, c)</td>
    <td>(b, b), (c, b)</td>
    <td>(a, a), (a, b)</td>
  </tr>
</table>


---
### Equivalence Relation

- A relation $R$ on set $A$ is an equivalence relation if it is **reflexive**, **symmetric**, and **transitive**.
- If two relations $R_1$ and $R_2$ are Equivalence
	- $R_1 \cap R_2$ will be Equivalence relation 
	- $R_1 \cup R_2$ may or may not be Equivalence relation
- Largest Equivalence Relation has $n^2$ elements
- Smallest Equivalence Relation has $n$ elements
	- it will have all the diagonal elements for sure

### Equivalence Class
- denoted by $[x]$
- $$[x] = \\\{y | (x, y) \in R\\\}$$ 
- we can have $[x] = [y]$, even if $x ≠ y$ 

### Partition of Set
- After calculating the equivalence for each element, we can identify the different partitions.
- Union of all partitions will give us the Relation set 
- Intersection of partitions with each other is always $\phi$
- Union of Cartesian product of partitions with themselves will give the Relation set

###### Example : Consider A = {1, 2, 3, 4, 5} an equivalence relation R on A , R = {(1,1),(2,2),(3,3),(4,4),(5,5),(1,4),(4,1),(2,5),(5,2)} find the partition of a set A, defined by R.
$[1]$= {1, 4}  
$[2]$ = {2, 5}  
$[3]$ = {3}  
$[4]$ = {1, 4}  
$[5]$ = {2, 5}  

$P_1$ = {1, 4}    
$P_2$ = {2, 5}  
$P_3$ = {3}  

---
### [[POSET|Partial Order Relation]] 

- A relation R on a set A with cartesian product A × A is said to be partial order if
	- **reflexive** 
	- **anti-symmetric**
	- **transitive**
- [[POSET]] : Partial Order Set 
	- Denoted by $[A, R]$
- it will form a **partial** [[03 - Notes/Matrix#^5cfafd|Upper Triangular Matrix]]
###### Example
$A = \\\{1, 2, 3, 6\\\}; [A, /] ; / = \\\{(a, b) | (a, b) \in R \text{ and } \frac{b}{a} \in A\\\}$  
⇒ $[A, /]$ = $$\begin{bmatrix}
(1, 1)  & (1, 2) & (1, 3)  & (1, 6)  \\
 & (2, 2) &  & (2, 6) \\
 &  & (3, 3) & (3, 6) \\
 &  &  & (6, 6)
\end{bmatrix}$$

### Total Order Relation 
- A [[POSET]] $[A, R]$ is called total order set, if every pair of elements are comparable i.e. either (a,b) or (b,a) ∈ R, ∀ a, b ∈ A
- it will form a complete [[03 - Notes/Matrix#^5cfafd|Upper Triangular Matrix]]
###### Example 
$A = \\\{1, 2, 4, 8\\\}; [A, /] ; / = \\\{(a, b) | (a, b) \in R \text{ and } \frac{b}{a} \in A\\\}$   
⇒ $[A, /]$ = $$\begin{bmatrix}
(1,1) & (1, 2) & (1, 4) & (1, 8) \\
 & (2,2) & (2,4) & (2, 8) \\
 &  & (4, 4) & (4, 8) \\
 &  &  & (8, 8)
\end{bmatrix}$$


---
## Closures of Relations

### Definition

- The closure of a relation $R$ with respect to a property $P$ is the smallest relation $S$ that contains $R$ and has property $P$.

### Types of Closures

1. **Reflexive Closure**: $R \cup {(a, a) \mid a \in A}$.
2. **Symmetric Closure**: $R \cup R^{-1}$.
3. **Transitive Closure**: $R \cup R^2 \cup R^3 \cup \dots$ (using Warshall's Algorithm for computation).

---

## Questions

###### Q1) Let $R = {(1,1), (1,2), (2,1), (2,2), (3,3)}$ be a relation on $A={1,2,3}$. Is it antisymmetric?

A1) No. Here $(1,2) \in R$ and $(2,1) \in R$, but $1 \neq 2$. It violates the definition of antisymmetry.

---
###### Q2) How many reflexive relations are possible on a set with 3 elements?

A2) $2^{n^2-n} = 2^{3^2-3} = 2^{9-3} = 2^6 = 64$.

---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=FdNTG7mbwI4EOAvS&t=6049)
2. [[Set Theory]]
3. [[03 - Notes/Matrix|Matrix]]