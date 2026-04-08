
Date :  2026-02-22  
Tags :   [[Maths]]  
~ ***Yash Agrawall*** ~  

---
# well formed formula (wff)
- Any propositional variable is a wff  
- If P is a wff, then ¬P is also a wff  
- If P and Q are wffs, then (P ∧ Q), (P ∨ Q), (P → Q), (P ↔ Q) are wffs  
- Parentheses must be used to remove ambiguity, especially with non-associative operators (→)  
- If a formula has more than one possible interpretation, it is not a wff  
- Being a tautology or contradiction is unrelated to being a wff
- A wff is **satisfiable** if there exists at least one truth assignment for which the wff is True.  
-  A wff is **unsatisfiable** if it is False for all possible truth assignments. (Also called a contradiction.)  
- A wff is a **tautology** if it is True for all possible truth assignments.  
- A wff that is **neither a tautology nor a contradiction** is called a **contingency**. 
	- It is True for some truth assignments and False for some truth assignments.
	- A wff that is **satisfiable but not valid**, is called **contingency**.
---
# Tautology, Contradiction & Contingency

- **Tautology**: A wff that is True for all possible truth assignments.
- **Contradiction**: A wff that is False for all possible truth assignments.
- **Contingency**: A wff that is True for some truth assignments and False for others.
- **Satisfiable**: A wff for which at least one truth assignment makes it True.
- **Unsatisfiable**: A wff for which no truth assignment makes it True.

![[Pasted image 20260223015645.png]]

- Tautology ∨ Contingency ↔ Satisfiable 
- Tautology → Satisfiable
- Contingency → Satisfiable
- Contradiction ↔ Unsatisfiable
-  ¬ Tautology → Contingency ∨ Contradiction
- ¬ Contradiction → Contingency ∨ Tautology
- ¬ Contradiction ↔ Tautology
- ¬ Contingency ↔ Contingency 
- ¬ Satisfiable ↔ Unsatisfiable

- p & ~p both Satisfiable ≡ p is Contingency 
- p is Satisfiable & ¬ p is Unsatisfiable ≡ p is Tautology 
- ¬ p is Satisfiable & p is Unsatisfiable ≡ p is Contradiction


> Questions related to tautology, contradiction, and contingency can be solved  
    accurately using truth tables.
    
- For n variables, there are 2<sup>2<sup>n</sup></sup> possible boolean functions / expressions / discrete truth tables
- For n variables, 
	- no. of Tautologies = 1
	- no. of Contradictions = 1
	- no. of Contingencies = 2<sup>2<sup>n</sup></sup> - 2
- Probability that an expression selected at random is a Tautology = 1 / 2<sup>2<sup>n</sup></sup>
- Probability that an expression selected at random is a Contradiction = 1 / 2<sup>2<sup>n</sup></sup>
- Probability that an expression selected at random is a Contingency = (2<sup>2<sup>n</sup></sup> - 2) / 2<sup>2<sup>n</sup></sup> = 1 - 2<sup>(1 - 2<sup>n</sup>)</sup>
- Probability that an expression selected at random is Satisfiable = (2<sup>2<sup>n</sup></sup> - 1) / 2<sup>2<sup>n</sup></sup>
- Probability that an expression selected at random is Unsatisfiable = 1 / 2<sup>2<sup>n</sup></sup>

---
# Questions
###### Q1) Which of the following is a wff?
###### a) $((P → Q) ∧ (Q → R)) → (P → R)$
###### b) $(P → Q) → ( ¬ P → ¬ Q)$
###### c) $(P ∧ ( ¬ P ∨ ¬ Q)) → Q$
###### d) $(P → R) ∨ (Q → R) → ((P ∨ Q) → R)$
###### e) $¬ P ∧ Q$
###### f) $P → Q → R$

A1) 
a) **wff**  
= $(P → Q)$ is a wff  
= $(Q → R)$ is a wff  
= $((P → Q) ∧ (Q → R))$ is a wff  
= $(P → R)$ is a wff  
= Entire implication is fully parenthesized

b) **wff**  
= $(P → Q)$ is a wff  
= $¬P$ is a wff  
= $¬Q$ is a wff  
= $(¬P → ¬Q)$ is a wff  
= Entire implication is fully parenthesized

c) **wff**  
= $¬P$, $¬Q$ are wffs  
= $(¬P ∨ ¬Q)$ is a wff  
= $(P ∧ (¬P ∨ ¬Q))$ is a wff  
= $(P ∧ (¬P ∨ ¬Q)) → Q$ is fully parenthesized

d) **not a wff**  
= $→$ is **not associative**  
= Expression contains **multiple implications**  
= No parentheses around entire LHS  
= Structure is ambiguous

e) **wff**  
= $¬P$ is a wff  
= $∧$ is binary  
= $(¬P ∧ Q)$ has unique interpretation

f) **not a wff**  
= $→$ is **not associative**  
= Can mean:
- $(P → Q) → R$
- $P → (Q → R)$  
    = Parentheses not specified

---
###### Q2) Consider 2 wff in propositional logic. Check if they are satisfiable and valid or not.
###### F1 : P → ¬ P
###### F2 : (P → ¬ P) ∨ (¬ P → P)

A2)   
F1 : P → ¬ P  
⇒ P' + P' = P'
- If we take P False, then P' will be True.
- Hence F1 is satisfiable, but not valid

F2 : (P → ¬ P) ∨ ( ¬ P → P)  
⇒ P' + P' + P  
= 1 = True
- Hence F2 is both satisfiable and valid

---
# Summary 
## Well Formed Formula (wff)
- A wff is defined **syntactically**, not semantically
- Truth (tautology / contradiction) is **independent** of being a wff
- Parentheses are mandatory to remove ambiguity
- Non-associative operators (→) must always be explicitly parenthesized
- If a formula has more than one valid interpretation, it is **not a wff**

---
## Truth-Based Classification of wff
- Tautology:
	- True for all truth assignments
	- Always satisfiable
- Contradiction:
	- False for all truth assignments
	- Always unsatisfiable
- Contingency:
	- True for some assignments, False for others
	- Satisfiable but not valid
- Satisfiable:
	- At least one assignment makes it True
- Unsatisfiable:
	- No assignment makes it True

---
## Logical Relationships
- Tautology ⊆ Satisfiable
- Contingency ⊆ Satisfiable
- Contradiction ≡ Unsatisfiable
- Satisfiable = Tautology ∪ Contingency
- ¬(Contingency) ≡ Contingency
- ¬(Satisfiable) ≠ Unsatisfiable (syntactically)

---
## Negation-Based Tests
- p and ¬p both satisfiable ⇒ p is Contingency
- p satisfiable and ¬p unsatisfiable ⇒ p is Tautology
- ¬p satisfiable and p unsatisfiable ⇒ p is Contradiction

---
## Counting Results (for n variables)
- Total Boolean expressions = 2^(2ⁿ)
- Number of tautologies = 1
- Number of contradictions = 1
- Number of contingencies = 2^(2ⁿ) − 2

---
## Probability Results
- P(Tautology) = 1 / 2^(2ⁿ)
- P(Contradiction) = 1 / 2^(2ⁿ)
- P(Contingency) = 1 − 2^(1 − 2ⁿ)
- P(Satisfiable) = (2^(2ⁿ) − 1) / 2^(2ⁿ)
- P(Unsatisfiable) = 1 / 2^(2ⁿ)

---
## Problem-Solving Strategy
- wff checking → structural (syntax + parentheses)
- Validity / satisfiability → semantic (truth table / Boolean reduction)
- Truth table method is always correct and sufficient




---
# References 

1. [YouTube Lecture](https://youtu.be/M8oQ-mddtJc?si=3dAWMukAwCyHe0QQ)
2. [YouTube Lecture 2](https://youtu.be/zfUlmbAYGwU?si=wI0toXgCkOoJf2qH)