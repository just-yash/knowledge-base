
Type : #Note    
Date :  2026-02-21  
Tags :   [[Maths]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Primary Logical Operators Questions

> Convert the Qs to Boolean then solve. Its much easier and faster this way 
###### Q1) $P + Q + P'$

A1)  1  
= $P + P' + Q$  
= $1 + Q$  
= $1$   (Tautology)  

---
###### Q2) $P ∨ (P' ∨ Q)$

A2)   1  
= $(P + P') + Q$   
= $1 + Q$    
= $1$  (Tautology)    

---
###### Q3) $P ∧ (Q ∧ P')$

A3) Q  
= $P . P' . Q$    
= $0 . Q$    
= $0$    

---
###### Q4) $(P ∨ Q) . (P ∨ Q')$

A4) P    
= $(P +Q) . (P + Q')$    
= $P + (Q . Q')$    
= $P . 0$    
= $P$        

---
###### Q5) $(P ∧ Q) ∨ (P ∧ Q')$

A5) $P$  
= $(P . Q) + (P . Q')$  
= $P.(Q + Q')$  
= $P.1$  
= $P$  

---
###### Q6) $P Q R + P' Q' R + P Q R$

A6)   
= $P Q R + P Q R + P' Q' R$  
= $P Q R + P' Q' R$  
= $R (P Q + P' Q')$  
= $R (P ⊙ Q)$  

---
###### Q7) $P ∧ Q ∧ P ∧ R ∧ S'$

A7) $P ∧ Q ∧ R ∧ S'$  
= $PQPRS'$  
= $PQRS'$  
= $P ∧ Q ∧ R ∧ S'$  

---
###### Q8) $P ∧ Q ∨ (P ∧ Q ∧ (R ∧ S ∧ T))$

A8) 
= $PQ + (PQRS)$            (T means True : which is 1 when converted to Boolean Algebra)  
= $PQ (1 + RS)$  
= $PQ$   
= $P ∧ Q$  
 
---
###### Q9) $1 + PQ + P'Q + P' Q' R' + P' Q S'$    

A9)
= $1 + PQ + P'Q + P'Q'R' + P' Q S'$  
= $1$                                                                 (Short circuiting)  
(Tautology)  

---
###### Q10) $A ∪ (B - C) = (A ∪ B) - (A ∪ C)$

A10) 
= $A ∪ (B ∩ C') = (A ∪ B) ∩ (A ∪ C)'$  
= $A + (B . C') = (A + B) . (A + C)'$  
= $A + (B . C') = (A + B). (A' . C')$  
= $A+ BC' = A(A'C') + B(A'C')$  
= $A + BC' = 0 + A'BC'$  
= $A+BC' ≠  A'BC'$  
They are not equal.   
> In Exam, They will ask it as Is Union Distributive over Set Difference?  

---
###### Q11) $(A ∧ B) ∨ (A ∧ B')$

A11)    
= $(A . B) + (A . B')$  
= $A.(B+B')$  
= $A.1$   
= $A$  

---
###### Q12) $(A ∨ B) ∧ (A ∨ B)'$

A12)   
= $(A + B) . (A + B)'$   
= $(A + B)(A'B')$   
= $AA'B' + BA'B'$    
= $0 + 0$    
= $0$   

---
###### Q13) $A ∪ (A' ∩ B) ∪ (A ∩ B')$

A13)   
= $A + (A'B) +(AB')$   
= $A + B + AB'$  
= $A + B + A$  
= $A + B$  
= $A ∪ B$  

- Applied [[Primary Logical Operators Across Different Domains#2. Absorption Law|Absorption Law]]  

---
###### Q14) $\overline{\overline{\overline{A.B}.A}.\overline{\overline{A.B}.B}}$

A14) 
= $\overline{\overline{\overline{A.B}.A}}+\overline{\overline{\overline{A.B}.B}}$  
= $(\overline{A.B}.A) + (\overline{A.B}.B)$  
= $((\overline{A}+\overline{B}).A)+((\overline{A}+\overline{B}).B)$  
= $A.\overline{B} + \overline{A}.B$  
= $A ⊕ B$  

---
###### Q15) $AB + AB' + A'B$

A15) 
= $A(B+B') + A'B$  
= $A + A'B$  
= $A+B$  

---
###### Q16) $(A ∨ C) ∧ (A' ∨ B)$

A16) 
$(A + C) . (A' + B)$  
= $A.(A' + B) + C(A' + B)$  
= $AB + A'C + BC$  
= $AB + A'C + BC(A + A')$  
= $AB + A'C + ABC + A'BC$  
= $AB(1+C) + A'C(1+B)$   
= $AB + A'C$   

> This is also called Consensus Theorem    

---
###### Q17) $A - (A - B)$

A17) 
= $A ∩   (A - B)^C$   
= $A ∩  (A ∩  B^C)^C$  
= $A.(A.B')'$  
= $A . (A' + B)$  
= $(A . A')+ (A.B)$  
= $AB$  

---
###### Q18) $B ∩ (A ∪ B)$

A18)   
= $B(A+B)$  
= $AB + B$  
= $B(A + 1)$  
= $B$  

---
###### Q19) $(P ∩  Q ∩ R) ∪ (P^C ∩ Q ∩ R) ∪ Q^C ∪ R^C$

A19)     
= $(P . Q . R) + (P' . Q.R) + Q' + R'$    
= $PQR + P'QR + Q'+R'$      
= $QR(P + P') + Q' + R'$    
= $QR + Q' + R'$    
= $(Q' + Q) . (Q' + R) + R'$     
= $1.(Q' + R + R')$    
= $1.(Q' + 1)$  
= $1.1$  
= $1$    
= $U$    

---
###### Q20) $x'y' + xy + x'y$

A20) 
= $x'y' + y(x + x')$  
= $x'y' + y$  
= $(y+x') . (y + y')$  
= $x' + y$  

---
###### Q21) $(P + Q')(PQ' + PR)(P'R' + Q')$

A21)    
= $(PPQ'+PPR+Q'PQ'+Q'PR)(P'R' + Q')$  
= $(PQ'+PR+PQ'+PQ'R)(P'R'+Q')$  
= $(PQ' + PR(1+Q'))(P'R' + Q')$  
= $(PQ' + PR)(P'R' + Q')$  
= $(0+PQ'+0+PRQ')$  
= $PQ'(1+R)$  
= $PQ'$  

---
###### Q22) $PQ + P'QR + P'QR'S$

A22)   
= $PQ+ P'Q(R+R'S)$  
= $PQ + P'Q(R+S)$  
= $PQ + P'QR + P'QS$  
= $Q(P + P'R + P'S)$  
= $Q(P+R+P'S)$  
= $Q(P+S+R)$  
= $PQ+QS+QR$  

---
###### Q23) Which of the following is a Tautology?
###### a) (a ∨ b) → (b ∧ c)
###### b) (a ∧ b) → (b ∨ c)
###### c) (a ∨ b) → (b → c)
###### d) (a → b) → (b → c)

A23) b
a) not tautology   
= (a + b)' + (bc)    
= a'b' + bc    

b) Tautology  
= (ab)' + b + c  
= a' + b' + b + c  
= 1  

c) not tautology  
= (a + b)' + (b' + c)  
= (a'b') + (b' + c)  
= a'b' + b' + c'  
= b'(a' + 1) + c'  
= b' + c'  

d) not tautology   
= (a' + b)' + (b' + c)  
= ab' + b' + c  
= b'(a + 1) + c  
= b' + c  

---
###### Q24) Let $(p → q) → r$ be a contradiction then $(r → p) → q$ is ?
###### a) Tautology 
###### b) Contradiction 
###### c) Always True when p is False
###### d) always True when q is True

A24) d) always True when q is True  
$(p → q) → r$ ⇒ $(p' + q)' + r$ = $(pq') + r$    
Given : $(pq') + r$ = False  
For this to be False,   
- $r$ has to False always  
- $pq'$ has to be False always  

| $p$ | $q$ | $r$ | $pq' + r$ |
| --- | --- | --- | --------- |
| F   | F   | F   | F         |
| F   | T   | F   | F         |
| T   | T   | F   | F         |

$(r → p) → q$ ⇒ $(r' + p)' + q$ = $rp' + q$     

| $p$ | $q$ | $r$ | $r'p + q$ |
| --- | --- | --- | --------- |
| F   | F   | F   | F         |
| F   | T   | F   | T         |
| T   | T   | F   | T         |

So, (d) is correct

---
# References 

1. [YouTube Lecture](https://youtu.be/Pt3ZDjmg5P8?si=KuVu40Nzu-P09a9f)
2. [[Primary Logical Operators Across Different Domains]]
3. [[Operators]]
4. [[Operators.c]]
---