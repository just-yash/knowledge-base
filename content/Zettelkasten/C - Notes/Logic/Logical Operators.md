
Date :  2026-02-20  
Tags :   [[Maths]] ; [[Operators]] ; [[DLD]] ; [[Language]]
~ ***Yash Agrawall*** ~  

---
# Logical Operators / Connectives

## Proposition Variables
- Variables that are used to Represent a Proposition.
###### Example : 
- `P: I have time.`
- `Q: I will go to market.`
- `P ∧ Q : I have time & I will go to market.`
- Here `∧` is the [[Operators#3. Logical Operators|Logical Operator]], used to connect Proposition $P$ & $Q$.

---
## Types of Logical Operators
### Primary 

- [[Primary Logical Operators Across Different Domains]]

#### Properties
- An expression that evaluates to `1` **for all possible truth assignments** is a tautology.

---
### Secondary

| Operator          | Operation                                                                                    | Representation | Critical Row Definition                                                    |
| ----------------- | -------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| $↑$               | NAND<br><br>$(PQ)' = P' + Q'$                                                                | $P ↑ Q$        | False when both $P$ and $Q$ are True                                       |
| $↓$               | NOR<br><br>$(P + Q)' = P'Q'$                                                                 | $P ↓ Q$        | True when both $P$ and $Q$ are False                                       |
| $⊕$               | XOR<br><br>$P'Q + PQ'$                                                                       | $P ⊕ Q$        | - True when $P$ and $Q$ are different<br>- False when $P$ and $Q$ are same |
| $→$               | Implication<br><br>$P' +Q$                                                                   | $P → Q$        | False when $P$ is True but $Q$ is False                                    |
| $↔$ or $⇔$ or $≡$ | Double Implication or Equivalence<br><br>It functions like $⊙$ (xnor)<br><br>$P'Q' + PQ$<br> | $P ↔ Q$        | - True when $P$ and $Q$ are same<br>- False when $P$ and $Q$ are different |

---
#### Precedence Order 
```
()
NOT
AND 
OR 
Implication 
Equivalence
```

---
#### Truth Table

| $P$ | $Q$ | $P ↑ Q$ | $P ↓ Q$ | $P ⊕ Q$ | $P → Q$ | $P ↔ Q$ |
| --- | --- | ------- | ------- | ------- | ------- | ------- |
| F   | F   | T       | T       | F       | T       | T       |
| F   | T   | T       | F       | T       | T       | F       |
| T   | F   | T       | F       | T       | F       | F       |
| T   | T   | F       | F       | F       | T       | T       |

---
#### Implication

- $P → Q$  
	- $P$ is called the **Antecedent**  
	- $Q$ is called the **Consequent**
- Verbal meanings of $P → Q$ (all equivalent):
	- “If $P$, then $Q$”
	- “$P$ implies $Q$”
	- “$Q$ follows from $P$”
	- “$P$ only if $Q$”
	- “$Q$ whenever $P$”
	- “$Q$ unless $¬P$”
	- “$P$ is sufficient for $Q$”
	- “$Q$ is necessary for $P$”
- Implication is used for **one-way theorems**
- Related forms:
	- $P → Q$  ⇒ **Direct**
	- $Q → P$  ⇒ **Converse**
	- $P' → Q'$ ⇒ **Inverse**
	- $Q' → P'$ ⇒ **Contrapositive**
- Equivalences:
	- $P → Q ≡ Q' → P'$  (Contrapositive)
	- $Q → P ≡ P' → Q'$  (Converse ≡ Inverse)
- Important properties:
	- An implication is **always equivalent** to its contrapositive
	- An implication is **not necessarily equivalent** to its converse or inverse
	- Converse and inverse are **equivalent to each other**, but not to the original implication

---
#### Biconditional / Double Implication / Equivalence 
- $P ↔ Q$  
	- Means **$P$ and $Q$ have the same truth value**
	- True when both are True or both are False
	- False when one is True and the other is False
- Logical definition:
	- $P ↔ Q ≡ (P → Q) ∧ (Q → P)$
	- Equivalence means implication in **both directions**
- Boolean Algebra form:
	- $P ↔ Q ≡ P'Q' + PQ$
	- This is **XNOR**

- Truth interpretation:
	- $P = Q$ ⇒ True
	- $P ≠ Q$ ⇒ False

- Verbal meanings of $P ↔ Q$ (all equivalent):
	- “$P$ if and only if $Q$”
	- "$P$ iff $Q$"
	- “$P$ is equivalent to $Q$”
	- “$P$ exactly when $Q$”
	- “$P$ whenever $Q$ and $Q$ whenever $P$”
	- “$P$ is necessary and sufficient for $Q$”
	- “$P$ and $Q$ have the same truth value”

> In case of Double Implication, All are equal and hence they don't have names like we have for implications   
> $P ↔ Q ≡ Q ↔ P ≡ P' ↔ Q' ≡ Q' ↔ P'$

- Relation with implication:
	- $P ↔ Q ≡ (P → Q) ∧ (Q → P)$
	- Breaking equivalence:
		- Forward direction: $P → Q$
		- Backward direction: $Q → P$
	- If **either implication fails**, equivalence fails

- Relation with XOR / XNOR:
	- $P ⊕ Q$ → True when $P ≠ Q$
	- $P ↔ Q$ → True when $P = Q$
	- Hence:
		- $P ↔ Q ≡ (P ⊕ Q)'$
		- $P ⊕ Q ≡ (P ↔ Q)'$

- Associativity and commutativity:
	- Commutative:
		- $P ↔ Q ≡ Q ↔ P$
	- Associative:
		- $P ↔ (Q ↔ R) ≡ (P ↔ Q) ↔ R$

- Important exam facts:
	- Equivalence is **stronger** than implication
	- Every equivalence gives **two implications**
	- Used in:
		- Definitions
		- Biconditional theorems
		- Logical equivalence proofs
	- In exams:
		- Check both directions
		- Or convert to Boolean form and simplify

- Common mistakes to avoid:
	- “$P$ if $Q$” ≠ $P ↔ Q$
	- “$P$ only if $Q$” ≠ $P ↔ Q$
	- One implication alone is **not equivalence**
	- Do not confuse XOR with equivalence

---
#### Properties :
- $⊕$ : shows differences 
- $⊙$ : shows similarities 
1. 
- $P' ⊕ Q = P ⊙ Q$
- $P ⊕ Q' = P ⊙ Q$
- $P' ⊕ Q' = P ⊙ Q$
Similarly,
- $P' ⊙ Q = P ⊕ Q$
- $P ⊙ Q' = P ⊕ Q$
- $P' ⊙ Q' = P ⊙ Q$

---
2. All are Commutative except Implication ( $→$ )
- $P ↑ Q = Q ↑ P$                         True
- $P ↓ Q = Q ↓ P$                          True
- $P → Q = Q → P$                      False
- $(P ↔ Q) = (Q ↔ P)$                 True
    $(P ⊙ Q = Q ⊙ P)$                       True

---
3. Among Secondary Operators, only XOR ($⊕$) and XNOR ($⊙$) are Associative 
- $P ↑ (Q ↑ R) = (P ↑ Q) ↑ R$                 False
- $P ↓ (Q ↓ R) = (P ↓ Q) ↓ R$                 False
- $P ⊕ (Q ⊕ R) = (P ⊕ Q) ⊕ R$               True
- $P → (Q → R) = (P → Q) → R$          False
- $P ↔ (Q ↔ R) = (P ↔ Q) ↔ R$          True
     $(P ⊙ (Q ⊙ R) = (P ⊙ Q) ⊙ R)$            True  

> For the Operators that are not Associative, We have to specify the order of its execution using brackets to avoid ambiguity. 
> Eg : P → Q → R   This is invalid as "→" is not Associative.  

---
# Translation Keywords

- but ≡ ∧ 
- Nevertheless ≡ ∧ 
- Unless ≡ ∨ 
- Either or ≡ ∨ 
	- It can also mean ⊕ 
	- Either the Pen is Red or Blue
- Neither nor ≡ ↓ 

---
# Questions

###### Q1) Check the following 
###### i) Is $→$ distributive over $∧$ ?
###### ii) Is $∧$ distributive over $→$ ?
###### iii) Is $→$ distributive over $⊕$ ?
###### iv) Is $⊕$ distributive over $→$ ?

A1)   
i) True  
⇒ $P → (Q ∧ R) = (P → Q) ∧ (P → R)$    
⇒ $P' + (QR) = (P' + Q)(P' + R)$    
⇒ $P' + QR = P' + QR$  
Yes, $→$ is Distributive over $∧$   

ii) True  
⇒ $P ∧ (Q → R) = (P ∧ Q) → (P ∧ R)$  
⇒ $P(Q' + R) = (PQ)' + (PR)$  
⇒ $P(Q' + R) = P(Q' + R)$  
Yes, $∧$ is distributive over $→$   

iii) False  
⇒ $P → (Q ⊕ R) = (P → Q) ⊕ (P → R)$  
⇒ $P' + (Q'R + QR') = (P' + Q)'(P' + R) + (P' + Q)(P'+R)'$  
⇒ $P' + Q'R + QR' = (PQ')(P'+R')+(P'+Q)(PR')$  
⇒ $P' + Q'R + QR' = (PQ'P' + PQ'R') + (PR'P' + PQR')$  
⇒ $P' + Q'R + QR' = PQ'R' + PQR'$  
⇒ $P' + Q'R + QR' = PR'$  
No, $→$ is not distributive over $⊕$     

iv) False  
⇒ $P ⊕ (Q → R) = (P ⊕ Q) → (P ⊕ R)$  
⇒ $P'(Q'+R) + P(Q'+R)' = (P'Q + PQ')' + (P'R + PR')$  
⇒ $P'(Q'+R)+P(QR')=(P'Q' + PQ) + (P'R + PR')$  
⇒ $P'Q' + P'R + PQR' = P'Q' + P'R + PQ + PR'$  
⇒ $P'Q' + P'R + PQR' = P'(Q'+R') + P(Q + R')$  
No, $⊕$ is not distributive over $→$   

> For certainty we can use [[K-Map]]

---
> Qs can also come like this: A new operator might be given with its Truth Table and we have to check for its Commutativity and Associativity.

###### Q2) Consider | as a new Operator. Its Truth Table is given below. 

| P   | Q   | P \| Q |
| --- | --- | ------ |
| 0   | 0   | 1      |
| 0   | 1   | 1      |
| 1   | 0   | 0      |
| 1   | 1   | 0      |

###### Check:
###### a) Is | commutative?
###### b) Is | associative?
###### c) Does | hold Idempotent law?

A2)  
Eq : P | Q = P'Q'+P'Q  
⇒ P | Q = P'  
⇒ Q | P = Q'  

a) Not Commutative  
P | Q ≠ Q | P  
Hence, Not Commutative  

b) Not Associative  
Checking : P | (Q | R) = (P | Q) | R  
⇒ P | Q' = P' | R  
⇒ P ≠ P'  
Hence,Not Associative  

c) Does not hold Idempotent law  
⇒ P | P = P  
⇒ P' ≠ P  
Does not hold Idempotent law  

---
###### Q3) Check : 
###### a) P → Q ≡ Q' → P' 
###### b) Q → P ≡ P' → Q'
###### c) P ↔ Q ≡ P' ↔ Q'
###### d) P' ↔ Q ≡ P ↔ Q'
###### e) (P → Q) ∧ (Q → R) → (P → R)
###### f) P → (Q ∧ R) ≡ (P → Q) ∧ (P → R)

A3)   
a) True  
⇒ P' + Q ≡ Q + P'  
- Contrapositive of an expression is equal to the expression  
Hence its true  

b) True  
⇒ Q' + P ≡ P + Q'  
- Inverse and Converse of an expression are equal  
Hence its true  

c) True  
⇒ P'Q' + PQ ≡ PQ + P'Q'  
Hence its true  

d) True  
⇒ PQ' + P'Q ≡ P'Q + PQ'  
Hence its true  

e) 1  (Tautology)  
⇒ ((P'+Q)(Q'+R))' + (P' + R)  
⇒ (P'+Q)' + (Q' + R)' + (P' + R)  
⇒ PQ' + QR' + P' + R  
⇒ P' + Q' + Q + R           ([[Primary Logical Operators Across Different Domains#2. Absorption Law|Absorption Law]])  
⇒ 1 + P' + R = 1  

f) True  
⇒ P' + (QR) ≡ (P' + Q)(P' + R)  
⇒ P' + QR ≡ P' + QR  
Hence its true  

---
###### Q4) Translate the following English sentences into Logic form
###### a) a = 0 is necessary for ab = 0  
###### b) For a = 0, ab = 0 is necessary   
###### c) For a = 0, ab = 0 is sufficient  
###### d) Only if you have a degree, you get Job  
###### e) If you have degree, you get job  
###### f) If it rains, then I don't carry umbrella  
###### g) If a matrix is invertible, then its determinant is non-zero.
###### h) A number is divisible by 4 only if it is even.
###### i) Being a citizen is necessary for voting.
###### j) For a function to be continuous, differentiability is sufficient.
###### k) If a graph is bipartite, then it has no odd cycle.
###### l) A password is valid only if it has at least 8 characters.
###### m) For the system to be stable, bounded input is necessary.
###### n) If the server crashes, the service is unavailable.
###### o) A student passes the exam only if they clear the cutoff.
###### p) For encryption to be secure, randomness is sufficient.
###### q) If the switch is on, then the light glows.
###### r) A process is deadlocked only if all four Coffman conditions hold.
###### s) For a number to be prime, being greater than 1 is necessary.
###### t) If the cache is full, then eviction occurs.
###### u) A graph is connected only if there exists a path between every pair of vertices.
###### v) For authentication, possession of a token is sufficient.
###### w) If the program has a syntax error, it fails to compile.
###### x) Access is granted only if the credentials are valid.
###### y) For data transmission, error correction is necessary.
###### z) If the temperature drops below zero, water freezes.

A4)
a) ab = 0 → a = 0  
b) a = 0 → ab = 0  
c) ab = 0 → a = 0  
d) Job → Degree  
e) Degree → Job  
f) rain → no umbrella  
g) matrix invertible → determinant ≠ 0  
h) divisible by 4 → even  
i) voting → citizen  
j) differentiability → continuous  
k) bipartite graph → no odd cycle  
l) valid password → 8 characters  
m) stable system → bounded input  
n) crashed server → unavailable service  
o) pass exam → clear cutoff  
p) randomness → secure encryption  
q) switch on → light glows  
r) deadlocked process → Coffman conditions  
s) prime number → greater than 1  
t) full cache → eviction  
u) connected graph → path exists between every pair  
v) token possession → authentication  
w) syntax error → no compilation  
x) granted access → valid credentials  
y) data transmission → error correction  
z) temperature < 0 → water freezes  

---
###### Q5) What is the converse of following Assertion? I stay only if you go

###### a) I stay if you go
###### b) If I stay then you go
###### c) if you do not go then I do not stay
###### d) if I do not stay then you go 

A5)  a  
P : I stay     ;    Q : You go     
P → Q  :  I stay only if you go   
Converse ≡ Q → P   
a) Q → P  
b) P → Q  
c) Q' → P'  
d) P' → Q    

---
###### Q6) If X then Y unless Z is represented by which formula in logic? 
###### a) (X ∧ ¬ Z) → Y
###### b) (X ∧ Y) → ¬ Z
###### c) X → (Y ∧ ¬ Z)
###### d) (X → Y) ∧ ¬ Z

A6)  a  
¬ Z → (X → Y) ≡ Z ∨ (X → Y) ≡ Z ∨ ¬ X ∨ Y  
a) ¬ X ∨ Z ∨ Y  
b) ¬ X ∨ ¬ Y ∨ ¬ Z  
c) ¬ X ∨ (Y ∧ ¬ Z)  
d) ¬ X ∨ Y ∧ ¬ Z  

----
###### Q7) Represent : You cannot ride a roller coaster if you are under 4 feet tall unless you are more than 16 years old
###### P : You can ride roller coaster 
###### Q : You are under 4 feet tall 
###### R : You are more than 16 years old

A7) 
Q → P' ∨ R ≡ Q' ∨ P' ∨ R  (Correct)  
Q ∨ R → P ≡ Q' ∧ R' ∨ P (Wrong)  

---
###### Q8) Which option is correct?
###### P : Good Mobile Phones are not cheap 
###### Q : Cheap mobile phone are not good
###### L : P implies Q
###### M : Q implies P 
###### N : P is equivalent to Q
###### a) Only L is true 
###### b) Only M is true
###### c) Only N is true
###### d) L, M & N are true

A8) d
P : G → ¬ C : G' + C'  
Q : C → ¬ G : C' + G'  
P ↔ Q ≡ P → Q ∧ Q → P  
Hence d is the correct option.  

---
###### Q9) The integer x ≥ 2 which satisfies ¬ ((P → Q) ∧ (¬ R ∨ ¬ S)) is — 
###### P : x ∈ {8, 9 10, 11, 12}
###### Q : x is a composite number
###### R : x is a perfect square 
###### S : x is a prime number

A9) 11  
((P' + Q)(R' + S'))' = (P' + Q)'(R' + S')' = PQ' + RS  
PQ' = 11 ; RS = ϕ  

---
###### Q10) It is not raining and it is pleasant and it is not pleasant only if it is raining and it is cold
###### P : It is raining 
###### Q : It is cold
###### R : It is pleasant

A10) 
P'R(R' → PQ) ≡ P'RR + PQ ≡ P'R + PQ

---
###### Q11) P : Every Prime Order Group is Cyclic . Then which of the following is True
###### a) Every cyclic group is of prime order
###### b) if group if not cyclic then its order is not prime
###### c) if group is not of prime order then it is not cyclic 

A11) b
P : POG → CG  
a) CG → POD  (Converse, not true)  
b) ¬ CG → ¬ POG (Contrapositive)  
c) ¬ PG → ¬ CG  

---
###### Q12) P : I Stay ; Q : You Go 
###### a) I stay only if you go
###### b) I stay is necessary for you go
###### c) I don't stay if you don't go
###### d)  You go follow from I stay
###### e) I stay if you go
###### f) I stay iff you go 
###### g) I stay is necessary and sufficient for you go 
###### h) I stay unless you go 
###### i) I stay is sufficient for you go
###### j) I stay when you go 
###### k) I stay but you go
###### l) Either I stay or you go 
###### m) I don't stay implies you go

A12)  
a) P → Q  
b) Q → P  
c) Q' → P'  
d) P → Q  
e) Q → P   
f) P ↔ Q  
g) P ↔ Q  
h) P ∨ Q  
i) P → Q  
j) Q → P  
k) P ∧ Q  
l) P ∨ Q  
m) P' → Q  

---
# Summary 

- Commutativity and Associativity

| Commutative | Associative | Operators         |
| ----------- | ----------- | ----------------- |
| Yes         | Yes         | $∧$ $∨$  $⊕$  $⊙$ |
| Yes         | No          | $↑$  $↓$          |
| No          | Yes         |                   |
| No          | No          | $→$               |


- Formulas

| Operator    | Formula           |
| ----------- | ----------------- |
| NAND        | $(PQ)' = P' + Q'$ |
| NOR         | $(P + Q)' = P'Q'$ |
| XOR         | $P'Q + PQ'$       |
| Implication | $P' +Q$           |
| Equivalence | $P'Q' + PQ$       |



---
# References 

1. [[Operators#3. Logical Operators|Logical Operators]]
2. [YouTube Lecture](https://youtu.be/Pi0fUqO7stI?si=3HHA5KooZ-_TlM1h)
3. [YouTube Lecture on Implication](https://youtu.be/rcIZbUXsTtE?si=aX0j3a58sX7itg4r)
4. [[Logic Gates]]
5. [YouTube Lecture on Translation](https://youtu.be/FiENK-In4Gk?si=E8vV7jB-nVGamj-1)