
Type : #Note    
Date :  2026-04-14  
Tags :  [[probability]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Keyword List

| Operation | Keywords | Formula |
|----------|---------|--------|
| **Union (A ∪ B)** | - at least one <br> - either A or B <br> - A or B or both | P(A ∪ B) = P(A) + P(B) − P(A ∩ B) |
| **Intersection (A ∩ B)** | - both A and B <br> - simultaneously <br> - A and B occur together | P(A ∩ B) |
| **Exactly One (A, B)** | - exactly one of A or B <br> - only one occurs | P(A ∪ B) − P(A ∩ B) |
| **Neither (A nor B)** | - neither A nor B <br> - none occur | 1 − P(A ∪ B) |
| **Complement (A')** | - not A <br> - A does not occur | P(A') = 1 − P(A) |
| **Mutually Exclusive** | - disjoint events <br> - cannot occur together | P(A ∩ B) = 0 ⇒ P(A ∪ B) = P(A)+P(B) |
| **Exhaustive Events** | - covers all outcomes <br> - at least one must occur | P(A ∪ B) = 1 |
| **Union (A ∪ B ∪ C)** | - at least one of A, B, C | P(A)+P(B)+P(C) − P(AB) − P(BC) − P(CA) + P(ABC) |
| **Exactly One (A, B, C)** | - exactly one of A, B, C <br> - only one occurs | P(A)+P(B)+P(C) − 2[P(AB)+P(BC)+P(CA)] + 3P(ABC) |
| **Exactly Two (A, B, C)** | - exactly two occur | P(AB)+P(BC)+P(CA) − 3P(ABC) |

---
###### Q1) Let A and B be two events such that P(A ∪ B)' = 1/6, P(A ∩ B) = 1/6 and P(A') = 1/4. Where A' stands for the complement of the event A. The event A and B are 
###### A) Independent but not equally likely 
###### B) Independent and equally likely 
###### C) Mutually exclusion and independent 
###### D) Equally likely but not independent 

A1) A) Independent but not equally likely

---
###### Q2) Let A and B be two events in a probability space with P(A)=0.3,P(B)=0.5,and P(A ∩ B)=0.1. Which of the following statements is/are TRUE?
###### A) P(A ∩ B') = 0.2, where B' is the complement of the event B
###### B) The two events A and B are independent
###### C) P(AUB) =0.7
###### D) P(A' ∩ B') = 0.4, where A' and B' are the complements of the events A and B, respectively

A2) A and C  

---
###### Q3) Consider two events E1 and E2 such that P(E1) = 1/2 , P(E2) = 1/3 and P(E1 ∩ E2) = 1/5. Which of the following statements is true?
###### a) P(E1 U E2) = 2/3
###### b) E1 and E2 are independent  
###### c) E1 and E2 are not independent 
###### d) P(E1/E2) =4/5 

A3) c

---
###### Q4) E1 and E2 are events in a probability space satisfying the following constraints P(E1) = P(E2); P(E1 U E2) = 1; E1 and E2 are independent then P(E1)=
###### a) 0 
###### b) 1/4
###### c) 1/2 
###### d) 1

A4) d) 1    

P(E1 ∪ E2) = P(E1) + P(E2) - P(E1 ∩ E2)     
⇒ P(E1 ∪ E2) = P(E1) + P(E2) - P(E1)P(E2)     
⇒ 1 = p + p - pp     
⇒ 1 = 2p - p²     
⇒ p² - 2p + 1 = 0     
⇒ (p - 1)² = 0     
⇒ p = 1   

---
###### Q5) Let P(E) denote the probability of an event E. Given P(A) =1,P(B) = 1/2 ; the values of P(A/B) and P(B/A) respectively are 
###### a) 1/4 , 1/2 
###### b) 1/2 , 1/4 
###### c) 1/2 , 1
###### d) 1 , 1/2

A5)  d) 1 , 1/2   

---
###### Q6) If P and Q are two random events, then the following is TRUE
###### a) Independence of P and Q implies that probability (P ∩ Q)=0
###### b) Probability (P U Q) ≥ Probability (P) + Probability (Q)
###### c) If P and Q are mutually exclusive, then they must be independent
###### d) Probability (P ∩ Q) ≤ Probability (P)

A6) d) Probability (P ∩ Q) ≤ Probability (P)

---
###### Q7) Suppose A and B are two independent events with probabilities P(A) ≠ 0 and P(B) ≠ 0. Let A' and B' be their complements. Which one of the following statements is FALSE?
###### a) P(A ∩ B) =P(A)P(B)
###### b) P(A|B) =P(A)
###### c) P(AUB) =P(A)+P(B)
###### d) P(A' ∩ B') = P(A') · P(B')

A7) c) P(AUB) =P(A)+P(B)   

---
###### Q8) X and Y are two random independent events. It known that P(X) = 0.40 and P(X U Y') = 0.7 Which one of the following is the value of P(X U Y)?
###### a) 0.7
###### b) 0.5
###### c) 0.4
###### d) 0.3

A8)  a) 0.7   

---
###### Q9) Let E and F be two independent events the probability that exactly one of them occurs is 11/25 and probability of none of them occurring is 2/25. If P(T) denotes the probability of occurrence of the event T, then? 
###### a) P(E) = 4/5 ; P(F) = 3/5
###### b) P(E) = 1/5 ; P(F) = 2/5
###### c) P(E) = 2/5 ; P(F) = 1/5
###### d) P(E) = 3/5 ; P(F) = 4/5 

A9) a and d   
P(E ∪ F ) - P(E ∩ F) = 11/25   
P(E ∪ F)' = 2/25   
⇒ P(E ∪ F) = 23/25   
⇒ P(E ∩ F) = P(E)P(F) = 12/25    
⇒ P(E) + P(F) - P(E)P(F) = 23/25  
⇒ P(E) + P(F) - 12/25 = 23/25  
⇒ P(E) + P(F) = 35/25 = 7/5     
& P(E)P(F) = 12/25    
Now match from the options   

---
# References 

1. [[Event Operations]]
2. [[Probability Introduction]]
3. [[Conditional Probability]]