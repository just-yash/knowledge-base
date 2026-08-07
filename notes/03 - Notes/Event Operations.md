
Type : #Note    
Date :  2026-04-14  
Tags :  [[probability]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## [[Set Theory#Union ($A cup B$)|Union]] of Events 

- Let $A$ and $B$ are two events from a Sample Space obtained by a Random Experiment, Union of $A$ and $B$ consists of all the elements in $A$ and $B$ 

### Keyword for Union 

- Either $A$ or $B$ or Both 
- At least one of $A$ or $B$ should occur 

### Union Formula 

$$P(A\cup B) = P(A) + P(B) - P(A \cap B)$$
### Venn Diagram (Union)

![[Pasted image 20260414051359.png]]

###### Example : 
Event $A$ = {1, 2, 3}  
Event $B$ = {2, 3, 5, 7}  
- Event $A ∪ B$ = {1, 2, 3, 5, 7}

Event $C$ = {1, 2}
Event $D$ = {3, 5}
- Event $C ∪ D$ = {1, 2, 3, 7}

---
## [[Set Theory#Intersection ($A cap B$)|Intersection]] of Events 

- Let $A$ and $B$ are two events from a Sample Space obtained by a Random Experiment, Intersection of $A$ and $B$ consists of all the common elements in $A$ and $B$ 

### Keyword for Intersection 

- $A$ or $B$ should occur simultaneously 
- Both $A$ and $B$ should occur

### Intersection Formula 

$$P(A \cap B) = P(A) + P(B) - P(A \cup B)$$

### Venn Diagram (Intersection)

![[Pasted image 20260414051522.png]]

###### Example : 
Event $A$ = {1, 2, 3}  
Event $B$ = {2, 3, 5, 7}  
- Event $A \cap B$ = {2, 3}

Event $C$ = {1, 2}
Event $D$ = {3, 5}
- Event $C \cap D$ = $\phi$

---
## [[#Union Formula|Union]] - [[#Intersection Formula|Intersection]]

### Keyword for Union - Intersection

- Exactly one of $A$ or $B$ should occur 

### Venn Diagram (Union - Intersection)

![[Pasted image 20260414051812.png]]

### Formula (Union - Intersection)

$$P(E) = P(A \cup B) - P(A \cap B) = P(A) + P(B) - 2P(A \cap B)$$

---
## [[Set Theory#Complement ($A'$ or $A c$ or $ overline{A}$)|Complement]] 

### Keyword (Complement)

For Both $A$ and $B$
- Neither $A$ nor $B$ should occur 

### Venn Diagram (Complement)

![[Pasted image 20260414052732.png]]

### Formula (Complement)

$$P(\overline{A \cup B}) = 1 - P(A \cup B) = P(\overline{A} \cap \overline{B})$$

---
# Exhaustive Events 

- When the following conditions is satisfied : 
	- A ∪ B = S
	- P(A ∪ B) = 1

![[Pasted image 20260414110447.png]]

For n Events... 
- E1 ∪ E2 ∪ E3 … ∪ En = S
- P(E1 ∪ E2 ∪ E3 … ∪ En) = 1
![[Pasted image 20260414202614.png]]

---
# Mutually Exclusive Events / Disjoint Events

- When there is no common elements in the Sample Space of two events → **Mutually Exclusive Events** or **Disjoint Events**
- When the following conditions is satisfied : 
	- A ∩ B = 0 
	- A ∪ B ≠ S
	- P(A) + P(B) ≠ 1

![[Pasted image 20260414110830.png]]

## Addition Theorem of Probability 

- Let E1, E2, … En are mutually exclusive events 
- Ei ∩ Ej = ϕ ∀ i ≠ j= 1 to n 
- P(Ei ∩ Ej) = 0 ∀ i ≠ j, j = 1 to n 
- P(E1 ∪ E2 ∪ E3 .... ∪ En) = P(E1) + P(E2) + P(E3) + … + P(En)

###### Example : 
Rolling of dice ⇒ S = {1, 2, 3, 4, 5, 6}   
E1 = Outcome should have Even faces = {2, 4, 6}    
E2 = Outcome should have Odd faces = {1, 3, 5}   
- E1 ∩ E2 = 0 
- E1 and E2 are mutually exclusive events

---
# Both [[#Mutually Exclusive Events / Disjoint Events]] and [[#Exhaustive Events]] 

- Ei ∩ Ej = 0 ; ∀ i ≠ j ; i, j = 1 to n
- E1 ∪ E2 ∪ E3 … ∪ En = S
- P(E1 ∪ E2 ∪ E3 … ∪ En) = 1

![[Pasted image 20260414203431.png]]

---
# Equally Likely Events 

- Events whose probability of occurrence are same 

###### Example : 
Rolling of dice ⇒ S = {1, 2, 3, 4, 5, 6}   
E1 = Outcome should have Even faces = {2, 4, 6}    
E2 = Outcome should have Odd faces = {1, 3, 5}   
E3 = Outcome should have Prime faces = {2, 3, 5}   
P(E1) = P(E2) = P(E3) = 1/2   
- E1, E2, E3 are equally likely events 

---
# Independent Events 

- Events A and B are said to be independent if occurrence (or non occurrence) of one doesn't effect the occurrence (or non occurrence) of other event
- [[Conditional Probability]]

### Conditions : 

$$P(A ∩ B) = P(A)P\left( \frac{B}{A} \right) = P(A)P(B)$$
$$P(A \cap B) = P(B)P\left( \frac{A}{B} \right) = P(B)P(A)$$
$$P\left( \frac{A}{B} \right) = P(A)$$
$$P\left( \frac{B}{A} \right) = P(B)$$

### Properties : 

- If $A$ and $B$ are independent Events, these are also independent events : 
	- $A'$ and $B$ 
	- $A$ and $B'$
	- $A'$ and $B'$
- $P(A ∩ B) = P(A)P(B)$
- $P(A' ∩ B) = P(A')P(B)$
- $P(A ∩ B') = P(A)P(B')$
- $P(A' ∩ B') = P(A')P(B')$

- If $A$, $B$, $C$ are 3 events, out of which each 2 are independent ⇒ 
	- $P(A ∩ B) = P(A)P(B)$
	- $P(B ∩ C) = P(B)P(C)$
	- $P(A ∩ C) = P(A)P(C)$
	- But it does not mean that $A$, $B$, $C$ are all independent events 
		- $P(A ∩ B ∩ C)$ may or may not be = $P(A)P(B)P(C)$

- If $A$, $B$, $C$ are 3 independent events ⇒ They are pair wise independent 
	- $P(A ∩ B) = P(A)P(B)$
	- $P(B ∩ C) = P(B)P(C)$
	- $P(A ∩ C) = P(A)P(C)$
	- $P(A ∩ B ∩ C) = P(A)P(B)P(C)$

## Multiplication Theorem 

- E1, E2, E3, …. En are independent events 
- P(E1 ∩ E2 ∩ E3 …. ∩ En) = P(E1)P(E2)P(E3)...P(En)

---
# Event Operations for 3 Events 

- All can be done if Venn Diagram is drawn and each segment is identified 

- At least one of A or B or C should occur 
$$P(A \cup B \cup C) = P(A)+P(B)+P(C)-P(A\cap B) - P(B \cap C) - P(C \cap A) + P(A \cap B \cap C)$$
- Exactly two of A or B or C should occur 
$$P(A \cap B) + P(B \cap C) + P(C \cap A) - 3P(A \cap B \cap C)$$
- Exactly one of A or B or C should occur 
$$P(A) + P(B) + P(C) - 2P(A \cap B) - 2P(B \cap C) - 2P(C \cap A) + 3P(A \cap B \cap C)$$

---
###### Q1) Let S be a sample space of two mutually exclusive events A and B be such that A U B = S. If P(.) denotes the probability of the event, the maximum value of P(A)P(B) is?  (GATE 2014) (2 M)

A1) 0.25    
P(A) + P(B) - P(A ∩ B) = 1   
⇒ P(A) + P(B) = 1  
⇒ P(B) = 1 - P(A) = P(A')   
⇒ $(1 - x) × x = x - x^2$  → function of $x$   
⇒ $f(x) = x - x^2$   
⇒ $f'(x) = 1 - 2x \implies x = \frac{1}{2}$   
⇒ $f''(x) = -2 < 0 \to x = \frac{1}{2} \text{ is Maxima Point}$   
⇒ max value possible = 1/4 = 0.25   

---
###### Q2) For 3 events A, B, C 
###### P (Exactly one of A or B occurs) = 1/4
###### P (Exactly one of B or C occurs) = 1/4
###### P (Exactly one of A or C occurs) = 1/4
###### P (all the events occur simultaneously) = 1/16
###### P (at least one of the events occurs) = ?

A2) 7/16   
P (Exactly one of A or B occurs) = 1/ 4 = P(A) + P(B) - 2P(A ∩ B)    
P (Exactly one of B or C occurs) = 1/ 4 = P(B ∪ C) - P(B ∩ C)     
P (Exactly one of A or C occurs) = 1/4 = P(A) + P(C) - 2P(A ∩ C)     
P (all the events occur simultaneously) = 1/16  = P(A ∩ B ∩ C)      
P (at least one of the events occurs) = P(A ∪ B ∪ C) = ?    

P(A) + P(C) - 2P(A ∩ C) = 1/4 
P(B) + P(C)-  2P(B ∩ C) = 1/4   
P(A) + P(B) - 2P(A ∩ B) = 1/4   
P(A ∩ B ∩ C) = 1/16  
P(A ∪ B ∪ C) = P(A) + P(B) +P(C) - P(A ∩ B) - P(B ∩ C) - P(A ∩ C) +P(A ∩ B ∩ C) = ? 

⇒ {P(A) + P(C) - 2P(A ∩ C)} + {P(B) + P(C)-  2P(B ∩ C)} + {P(A) + P(B) - 2P(A ∩ B)} = 2{P(A) + P(B) +P(C) - P(A ∩ B) - P(B ∩ C) - P(A ∩ C)}   
⇒ P(A ∪ B ∪ C) = 1/2(1/4 + 1/4 + 1/4) + 1/16   
= 3/8 + 1/16 = 7/16  

---
# References 

1. [YouTube Lecture](https://www.youtube.com/live/MOYnKrMYScg?si=YFkJxju_fHWvhSzR)
2. [[Probability Keywords]]