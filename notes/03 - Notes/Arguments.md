
Type : #Note    
Date :  2026-02-25  
Tags :   [[Maths]]  
Status : #incomplete     
~ ***Yash Agrawall*** ~  

---
# Arguments
- An **argument** is a collection of propositions where:  
	- Some propositions are called **premises**  
	- One proposition is called the **conclusion**  
- Structure:  
	- Premise 1  
	- Premise 2  
	- ...  
	- $∴$ Conclusion  
- The symbol “$∴$” means **therefore**
- {P1, P2, P3, P4, …. Pn} $\vdash$ C

---
## Validity of an Argument    

- An argument is **valid** if:  
	- Whenever **all premises are True**, the conclusion is also **True**  
- An argument is **invalid** if:  
	- There exists at least one truth assignment where:  
		- All premises are True  
		- Conclusion is False  
- Validity depends only on **logical structure**, not on truth of statements

---
### Soundness    
- An argument is **sound** if:  
	- It is **valid**  
	- All its premises are **actually True**  
- Every sound argument is valid  
- A valid argument need not be sound

---
### Method to Check Validity 
- Convert the argument into a single implication:  
	- (Premise₁ ∧ Premise₂ ∧ ... ∧ Premiseₙ) → Conclusion  
- If the resulting expression is:  
	- A **tautology** → argument is valid  
	- Not a tautology → argument is invalid

---
### Rules of Inference (Valid Argument Forms)  
  
- These are standard patterns that always produce valid arguments
- The names of these rules are not important, form and logic is important
#### 1. Modus Ponens (Rule of Detachment)  
  
- Form:  
	- P → Q  
	- P  
	- $∴$ Q  
- Logic:  
	- (P ∧ (P → Q)) → Q is a tautology  
  
---  
#### 2. Modus Tollens (Rule of Contrapositive)  
  
- Form:  
	- P → Q  
	- ¬Q  
	- ∴ ¬P  
- Logic:  
	- (¬Q ∧ (P → Q)) → ¬P is a tautology  
  
---  
#### 3. Hypothetical Syllogism (Transitive Rule of Inference)  
  
- Form:  
	- P → Q  
	- Q → R  
	- ∴ P → R  
- Logic:  
	- ((P → Q) ∧ (Q → R)) → (P → R)  
  
---  
#### 4. Disjunctive Syllogism (Proof by Elimination)  
  
- Form:  
	- P ∨ Q  
	- ¬P  
	- ∴ Q  
- Logic:  
	- ((P ∨ Q) ∧ ¬P) → Q  
  
---  
#### 5. Addition (OR Introduction)  
  
- Form:  
	- P  
	- ∴ P ∨ Q  
  
---  
#### 6. Simplification (AND Elimination)  
  
- Form:  
	- P ∧ Q  
	- ∴ P  
  
---  
#### 7. Conjunction (AND Introduction)  
  
- Form:  
	- P  
	- Q  
	- ∴ P ∧ Q  
  
---  
#### 8. Resolution  
  
- Form 1:  
	- P ∨ Q  
	- ¬P ∨ R  
	- $∴$ Q ∨ R
- Form 2 : (Constructive Dilemma)
	- P → Q
	- R → S
	- P ∨ R
	- $∴$ Q ∨ S
- Form 3 : (Destructive Dilemma)
	- P → Q
	- R → S
	- ¬Q ∨ ¬S
	- $∴$ ¬P ∨ ¬R

---  
### Invalid Argument Forms (Fallacies)  
    
#### 1. Affirming the Consequent  / Fallacy of Converse
  
- Form:  
	- P → Q  
	- Q  
	- ∴ P  
- This is **invalid**  
  
---  
#### 2. Denying the Antecedent  / Fallacy of Inverse
  
- Form:  
	- P → Q  
	- ¬P  
	- ∴ ¬Q  
- This is **invalid**  

---
#### 3. Fallacy of Non-sequester 

- Form : 
	- P
	- $∴$ Q
- This is **invalid**

---
#### 4. Fallacy of begging the Q

- Form : 
	- P → Q
	- $∴$ Q
- This is **invalid**

---  
### Truth Table Method for Validity  
  
- Construct a truth table for all premises and the conclusion  
- Look for a row where:  
- All premises = True  
- Conclusion = False  
- If such a row exists → argument is invalid  
- If no such row exists → argument is valid  

---  
# Argument vs Proposition  
  
- A **proposition** has a truth value  
- An **argument** is judged by validity, not truth  
- Arguments themselves are neither true nor false  
  
---
###### Q1) Check if the Conclusion is a valid conclusion or not.
###### P1 : If it rains, children will not play.
###### P2 : It rains.
###### $∴$ C : Children will not play.

A1) Valid  
Let p : it rains ; q : children will not play.   
P1 ≡ p → q    
If p is true, then q has to be true.    
$∴$ C is valid    

or 

P1 ≡ p → q  
validity condition : P1 ∧ P2 → C  ≡ 1  
⇒ ((p → q) ∧ p) → q ≡ 1  
⇒ (p'p + pq) → q  ≡ 1  
⇒ p' + q' + q  ≡ 1   
⇒ 1 + p' ≡ 1  
⇒ 1 ≡ 1  
$∴$ C is valid  

---
###### Q2) Check if the Conclusion is a valid conclusion or not.
###### P1 : If it rains, children will not play.
###### P2 : Children are not playing.
###### $∴$ C : It rains.

A2) Invalid  
p : it rains  
q : children are not playing  
P1 : p → q  
P2 : q  
C : p  
Validity condition : P1 ∧ P2 → C  ≡ 1  
⇒ (p → q) ∧ q → p ≡ 1  
⇒ (p'q + qq) → p ≡ 1  
⇒ (p'q + q)' + p ≡ 1  
⇒ (p + q')q' + p ≡ 1  
⇒ pq' + q' + p ≡ 1  
⇒ q' + p + p ≡ 1  
⇒ p + q' ≡ 1   
which is wrong, hence its not valid  

---
###### Q3) Check if the Conclusion is a valid conclusion or not.
###### P1 : 2 + 2 = 4 → 3 + 2 = 100
###### P2 : 2 + 2 = 4
###### $∴$ C : 3 + 2 = 100

A3) Invalid  
p : 2 + 2 = 4    
q : 3 + 2 = 100    
P1 : p → q    
P2 : p    
C : q  
P1 ∧ P2 → C ≡ 1  
⇒ (p'q + q)' + q ≡ 1   
⇒ pq' + q' + q ≡ 1  
⇒ p + q' + p ≡ 1  
⇒ p + q' ≡ 1  
This is false, hence its not valid.   

> Statement correctness has nothing to do with its validity. 
> Here the statement is not invalid because q is false. Its invalid because the validity condition is not a tautology.
> Correctness of a statement along with its validity gives the soundness of the argument. 

---
###### Q4) Which option is correct. there are two type of people.
###### Type 1 : Always tell truth
###### Type 2 : Always tell lie
###### The result of a fair coin toss is head if and only if I'm telling the truth. 
###### a) Result is head
###### b) Result is tail 
###### c) If person is Type 2 result is tail
###### d) If person is Type 1 result is tail

A4) a
head ↔ telling truth (biconditional follows, XNOR if the statement is true, follows XOR if the statement is false)     
- For a type 1 person(XNOR):    
	- either the person is telling the truth and the result is heads    
	- or the person is lying and the result is tails     
		- This is not possible
- For a type 2 person(XOR): 
	- either the person is telling the truth, and its not heads
		- This is not possible
	- or the person is lying and the coin is heads
Either way, we are getting only one conclusion, that the coin is heads. 

---
###### Q5) Check validity 

| Q. No. | P1          | P2    | P3  | C     |
| ------ | ----------- | ----- | --- | ----- |
| 1.     | ¬ P         |       |     | P → Q |
| 2.     | Q           |       |     | P → Q |
| 3.     | ¬ (P → Q)   |       |     | P     |
| 4.     | P → Q       |       |     | Q     |
| 5.     | P → Q       | Q → R | ¬ R | ¬ P   |
| 6.     | ¬ P         | P ∨ Q |     | P → Q |
| 7.     | P → (Q → R) | P ∧ Q |     | R     |
| 8.     | P → Q       | Q → R |     | ¬ R   |

A5) 
1. Valid  
2. Valid  
3. Valid  
4. Invalid  
5. Valid  
6. Valid  
7. Valid  
8. Invalid  

---
###### Q6) Which of the following arguments are valid
###### a) (A ∨ B, B → C, A → D, ¬ D) → C
###### b) (¬ A → ¬ C) ∧ ¬ D ∧ (A → E ∧ (C ∨ D)) → E
###### c) (A, A → ( B ∨ C), B → ¬ A) → C
###### d) (A ∨ B, B → C, ¬ C) → ¬ A

A6) 
a) Valid  
A ∨ B = A + B      
B → C = B' + C      
A → D = A' + D    
¬ D    
((A + B)(B' + C)(A' + D)(¬ D))' + C    
⇒ A'B' + BC' + AD' + D + C   
= A'B' + BC' + A + C     
⇒ A + B' + C + B      
⇒ A + C + 1 = 1    

b) Invalid    
((A + C')(D')(A' + E(C + D)))' + E       
⇒ A'C + D + A(E' + C'D') + E    
⇒ A'C + D + AE' + AC'D' + E      
⇒ A'C + D + A + AC'D'    
⇒ A'C + D + A    
⇒ A + C + D    
  
c) Valid  
(A(A' + B + C)(B' + A'))' + C     
⇒ A' + AB'C' + BA + C  
⇒ A' + A(B + C') + C  
⇒ A' + AB + AC' + C  
⇒ A' + B + C + A  
⇒ 1  

d) Invalid  
⇒ ((A + B)(B' + C)(C'))' + A'  
⇒ A'B' + BC' + C + A'  
⇒ C + B + A'B' + A'  
⇒ C + B + A'  

---
###### Q7) 2 set of premises are given. Which is inconsistent?
###### S1 : {A → B, A → C, B → ¬ C, A}
###### S2 : {¬A ∨ B, ¬ B, A}

A7) Both 
S1 : (A' + B)(A' + C)(B' + C')(A)
⇒ BC(AB' + AC')
⇒ 0

S2 : (A' + B)(B')(A)
⇒ AB.B' 
⇒ 0

---
###### Q8) Check Validity:: 
###### { ¬ (P ∧ Q), (Q ∨ R), (R → S)} → (P → S)

A8) invalid
{(PQ)'(Q + R)(R' + S)}' + P' + S
⇒ PQ + Q'R' + RS' + P' + S
⇒ P' + Q + S + R + Q'R'
⇒ P' + Q + R' + S + R
⇒ 1

---
###### Q9) Determine weather these specifications are consistent 
###### a : The diagnostic message is stored in buffer or it is retransmitted
###### b : It is not transmitted
###### c : If the diagnostic message is stored in the buffer then it is retransmitted

A9) not consistent  
p : stored in buffer  
q : retransmitted  
a : p ∨ q  
b : q'  
c : p → q  
(p + q)(q')(p' + q) = (pq')(p' + q) = 0  
$∴$ not consistent  

---
###### Q10) Determine weather these specifications are consistent 
###### a : The diagnostic message is stored in buffer or it is retransmitted
###### b : Diagnostic message is not stored
###### c : If the diagnostic message is stored in the buffer then it is retransmitted

A10) consistent  
p : buffer    
q : retransmitted        
a : p ∨ q    
b : p'    
c : p → q      
(p + q)(p')(p' + q) = qp'(p' + q) = qp' + qp' = qp'  

---
###### Q11) Check validity
###### P : if you work hard and have talent then you become musician 
###### Q : if you become musician you will be happy
###### R : You are working hard
###### S : You don't have talent 
###### $∴$ C : you will not be happy

A11) invalid  
p : work hard  
q : have talent  
r : musician   
s : happy  
P : (p ∧ q) → r  
Q : r → s  
R : p  
S : q'  
C : s'  
((p' + q' + r)(r' + s)(p)(q'))' + s' ⇒ pqr' + rs' + p' + q + s' = q + p' + s'   
> Logic is not solved by intuition  

---
###### Q12) Check validity 
###### P : If you work hard and have talent then you become musician
###### Q : If you become musician, you will be happy
###### S : You are not happy 
###### C : You are not talented

A12) invalid  
P : h ∧ T → M  
Q : M → H  
S : H'  
C : T'  
((h' + T' + M)(M' + H)(H'))' + (T')  
⇒ hTM' + MH' + H + T' = T' + hM + M+ H = T' + M + H  

---
# References 

1. [YouTube Lecture](https://youtu.be/46JCn4rkLDc?si=tpMZhJE5DLDZR6_q)
2. [Practice Qs On Arguments YouTube Video](https://youtu.be/2SfJLyjtlWw?si=MQYEyJ389MN3k8V3)