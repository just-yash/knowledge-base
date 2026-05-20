
Type : #Note    
Date :  2026-02-20  
Tags :   [[Maths]] ; [[Operators]] ; [[Set]] ; [[DLD]]
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Primary Logical Operators Across Different Domains

Boolean Algebra is primarily used in Digital Design and Digital Logic, while Propositional Logic is a part of Discrete Mathematics. Set Theory is a more general mathematical framework.

Although these belong to different domains, they follow the same algebraic structure and laws. Logical operators, Boolean operators, and set operations are structurally equivalent and obey identical properties such as commutativity, associativity, distributivity, and De Morgan’s laws.

Thus, they are not the same subject, but they are algebraically isomorphic.

# [[Operators.c#Precedence of Logical Operators|Precedence of Logical Operator]]

Highest → Lowest   
NOT → AND → OR   

| Operation | [[Digital Logic Basics#Boolean Algebra\|Boolean Algebra]] | [[Logical Operators\|Logic]] | Set Theory                      | Critical Row Definition or Truth Condition |
| --------- | --------------------------------------------------------- | ---------------------------------- | ------------------------------- | ------------------------------------------ |
| NOT       | $\overline{P}$ or $P'$                                    | $¬P$ or ~$P$                       | $\overline{P}$ or $P'$ or $P^C$ | Its False when $P$ is True                 |
| AND       | $P.Q$                                                     | $P∧Q$                              | $P∩Q$                           | Its True when both $P$ and $Q$ are True    |
| OR        | $P+Q$                                                     | $P∨Q$                              | $P∪Q$                           | Its False when both $P$ and $Q$ are False  |

## Truth Value Representation

| Truth Value | [[Digital Logic Basics#Boolean Algebra\|Boolean Algebra]] | [[Logical Operators\|Logic]] | Set Theory          |
| ----------- | --------------------------------------------------------- | ---------------------------------- | ------------------- |
| False       | $0$                                                       | $F$                                | $ϕ$  : Null Set     |
| True        | $1$                                                       | $T$                                | $U$ : Universal Set |

## Truth Table

| $P$ | $Q$ | $¬ P$ | $P ∧ Q$ | $P ∨ Q$ |
| --- | --- | ----- | ------- | ------- |
| F   | F   | T     | F       | F       |
| F   | T   | T     | F       | T       |
| T   | F   | F     | F       | T       |
| T   | T   | F     | T       | T       |

---
# Properties of Logical Operators
> Their Properties are Same Across ALL the Domains

### Basic Properties : 
#### 1. Commutative Law
##### Logic 
- $P ∨ Q = Q ∨ P$
- $P ∧ Q = Q ∧ P$

##### Boolean Algebra
- $A+B = B+A$
- $A . B = B.A$

##### Set Theory
- $A ∪ B = B ∪ A$
- $A ∩ B = B ∩ A$

---
#### 2. Associative Law
- Left Associativity = Right Associativity
##### Logic
- $P ∨ (Q ∨ R) = (P ∨ Q) ∨ R$
- $P ∧ (Q ∧ R) = (P ∧ Q) ∧ R$

##### Boolean Algebra
- $P+(Q+R) = (P+Q)+R$
- $P.(Q.R) = (P.Q).R$

##### Set Theory
- $P ∪ (Q ∪ R) = (P ∪ Q) ∪ R$
- $P ∩ (Q ∩ R) = (P ∩ Q) ∩ R$

---
#### 3. Distributive Law
##### Logic
- $P ∨ (Q ∧ R) = (P ∨ Q) ∧ (P ∨ R)$ 
- $P ∧ (Q ∨ R) = (P ∧ Q) ∨ (P ∧ R)$

##### Boolean Algebra
- $P.(Q+R)=(P.Q)+(P.R)$
- $P+(Q.R) = (P+Q).(P+R)$

##### Set Theory
- $P ∪ (Q ∩ R) = (P ∪ Q) ∩ (P ∪ R)$
- $P ∩ (Q ∪ R) = (P ∩ Q) ∪ (P ∩ R)$

---
#### 4. Identity Law
##### Logic
- P ∨ F = P
- P ∧ T = P

##### Boolean Algebra
- $P+0=P$
- $P.1=P$

##### Set Theory
- $P ∪ ϕ = P$
- $P ∩ U = P$

---
#### 5. Complement
##### Logic
- $P ∨ P' = T$
- $P ∧ P' = F$

##### Boolean Algebra
- $P+P' = 1$
- $P.P' = 0$

##### Set Theory
- $P ∪ P' = U$
- $P ∩ P' = ϕ$ 

---
### Derived Properties

#### 1. Idempotent Law
##### Logic
- $A ∨ A = A$
- $A ∧ A = A$

##### Boolean Algebra
- $A + A = A$
- $A.A=A$

##### Set Theory
- $A ∪ A = A$
- $A ∩ A = A$

---
#### 2. Absorption Law
##### Logic
- $A ∨ (A' ∧ B) = A ∨ B$
- $A ∨ (A ∧ B) = A$
- $A ∧ (A ∨ B) = A$

##### Boolean Algebra
- $A + A'B = A + B$
- $A + A.B = A$
- $A.(A+B) = A$

##### Set Theory
- $A ∪ (A^C ∩ B) = A ∪ B$
- $A ∪ (A ∩ B) = A$ 
- $A ∩ (A ∪ B) = A$

###### Proof in Boolean Algebra
1. $A + A'B = A + B$
Solving for LHS
	= $(A + A') . (A + B)$                                
	= $(1) . (A + B)$                                         
	= $A+B$       
Hence Proved.

2. $A + AB = A$
Solving for LHS
	= $A.(1 + B)$                                            
	= $A$                                                           
Hence Proved

3. $A.(A+B) = A$
Solving for LHS
	= $(A . A) + (A . B)$                                                   
	= $A+A . B$                                                     
	= $A(1 + B)$
	= $A$
Hence Proved

---
#### 3. Law of double Complement or Involution

##### Logic
- $(A')' = A$ 

##### Boolean Algebra
- $(A')' = A$ 

##### Set Theory
- $(A')' = A$ 

---
#### 4. De-Morgan's Law
- Change the sign
- Break the line
##### Logic
- $\overline{P ∨ Q ∨ R ∨ …} = \overline{P} ∧ \overline{Q} ∧ \overline{R}....$
- $\overline{P ∧ Q ∧  R ∧  …} = \overline{P} ∨  \overline{Q} ∨  \overline{R}....$

##### Boolean Algebra
- $\overline{A+B+C+D+...} = \overline{A} .\overline{B} . \overline{C}.\overline{D}....$ 
- $\overline{A.B.C.D....} = \overline{A} +\overline{B} + \overline{C}+\overline{D}+...$ 

##### Set Theory
- $\overline{A ∪ B ∪ C ∪ ...} = \overline{A} ∩ \overline{B} ∩ \overline{C} ∩ ...$
- $\overline{A ∩ B ∩ C ∩ ...} = \overline{A} ∪ \overline{B} ∪ \overline{C} ∪ ...$

---
#### 5. Domination Law

##### Logic
- $A ∨ T = T$
- $A ∧ F = F$

##### Boolean Algebra
- $A + 1 = 1$
- $A . 0 = 0$

##### Set Theory
- $A ∪ U = U$
- $A ∩ ϕ = ϕ$ 

---
# Minimization
- For minimization use these properties 
- Use [[K-Map]] for bigger expressions


---
# References 

1. [YouTube Lecture](https://youtu.be/MqydM3pJ93w?si=UNOTeQC_hJT2LTIL)
2. [[Logical Operators]]

---
# Questions 



