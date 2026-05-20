
Type : #Note    
Date :  2026-04-14  
Tags :  [[probability]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Conditional Probability

Let $A$ and $B$ are 2 events associated with same sample space. The conditional probability of an event $A$ given that event $B$ has already occurred is : $P( \frac{A}{B})$ 

### Formulas 

$$P\left( \frac{A}{B} \right) = \frac{P(A \cap B)}{P(B)} ; P(B) \neq 0$$
$$P\left( \frac{B}{A} \right) = \frac{P(B \cap A)}{P(A)} ; P(A) \neq 0$$
$$P(A \cap B) = P(A)P\left( \frac{B}{A}\right) = P(B)P\left( \frac{A}{B} \right)$$
- $P(A ∩ B') = P(A) - P(A ∩ B)$
- $P(B ∩ A') = P(B) - P(A ∩ B)$
- $P(A - B) = P(A) - P(A ∩ B)$
- $P(B - A) = P(B) - P(A ∩ B)$
- $P(A' ∩ B') = P(A ∪ B)' = 1 - P(A ∪ B)$

- For [[Event Operations#Mutually Exclusive Events / Disjoint Events|mutually exclusive events]] 
	- P(A ∩ B) = 0 ⇒ P(A/B) = 0
	- P(A ∪ B) = P(A) + P(B)

- $$P(A) + P(\overline{A}) = 1$$
$$P\left( \frac{A}{B} \right) + P\left( \frac{\overline{A}}{B} \right) = 1$$

---
###### Example : A and B are events such that P(A ∪ B) = 3/4 ; P(A ∩ B) = 1/4 ; P(A') = 2/3. Find the value of P(A' ∩ B)

Solution : 5/12     
P(A' ∩ B) = P(B - A) = P(B) - P(B ∩ A) = 2/3 - 1/4 = 5/12    

> Best way to solve is by Venn Diagrams 

---
# Questions

---
###### Q1) It is given that the events A and B are such that P(A) = 1/4, P(A|B) = 1/2 and P(B|A) = 2/3, then P(B) is ? 
###### a) 1/6
###### b) 1/3
###### c) 2/3
###### d) 1/2 

A1) b) 1/3         
P(A ∩ B) = 1/2 × P(B) = 2/3 × P(A)         
P(B) × 1/2 = 2/3 × 1/4              
P(B) = 1/6 × 2 = 1/3            

---
###### Q2) Let X and Y be two events such that P(X) = 1/3, P(X/Y) =1/2 and P(Y/X) = 2/5, Then : 
###### a) P(Y) = 4/15 
###### b) P(X'/Y) = 1/2
###### c) P(X ∩ Y) = 1/5 
###### d) P(X ∪ Y) = 2/5 

A2) a & b       
P(X ∩ Y) = 2/5 × 1/3 = 2/15          
P(Y) = 2/15 / 1/2 = 2/15 × 2 = 4/15     

P(X/Y) = 1/2   
P(X'/Y) = 1 - 1/2 = 1/2        

P(X ∪ Y) = P(X) + P(Y) - P(X ∩ Y)      
P(X ∪ Y) = 1/3 + 4/15 - 2/15     
P(X ∪ Y) = 7/15    

---
###### Q3) A coin is tossed twice and the four possible outcomes are assumed to be equally likely. If A is the event 'both head and tail have appeared', and B be the event, 'at most one tail is observed', find P(A), P(B), P(A/B) and P(B/A)

A3) 
P(A) = 1/2    
P(B) = 3/4         
P(A/B) = 1/2 / 3/4 = 2/3     
P(B/A) = 1/2 / 1/2 = 1       

---
###### Q4) Let 0<P(A)<1,0<P(B)<1 and P(AUB)=P(A)+P(B) - P(A) P(B) then
###### a) P(B/A) = P(B) -P(A)
###### b) P(A'-B')=P(A') -P(B')
###### c) P(AUB)'= P(A') P(B')
###### d) P(A/B) = P(A)

A4) c & d      

---
###### Q5) Let E' denote the complement of an event E. Let E, F, G be pairwise independent events with P(G) > 0 and P(E ∩ F ∩ G) = 0 then P(E' ∩ F' / G) will be 
###### a) P(E') + P(F')
###### b) P(E') - P(F')
###### c) P(E') - P(F)
###### d) P(E) - P(F')

A5)  c       
$P(E' ∩ F' / G) = \frac{P(E' ∩ F' ∩ G)}{P(G)} = \frac{{P(G) - P\left( E \cap G\right) - P(F \cap G) + P(E \cap F \cap G)}}{P(G)}$           
$\frac{{P(G) - P(E)P(G) - P(F)P(G) + 0}}{P(G)}$        
$1 - P(E) - P(F)$           
$P(E') - P(F) = P(F') - P(E)$          

---
###### Q6) 40% of the population of a town are voters. 50% are educated and 20% are educated voters. A person is chosen at random
###### a) If he is educated what is probability that he is a voters.
###### b) If he is a voter what is the probability that he is not educated
###### c) What is the probability that he is neither voter nor educated.

A6)  
a) 2/5 = 0.4         
b) 1/2 = 0.5    
c) 3/10 = 0.3       

> Draw Venn Diagram 

---
###### Q7) A two-faced fair coin has its faces designated as head (H) and tail (T). This coin is tossed three times in succession to record the following outcomes: H. H. H. If the coin is tossed one more time, the probability (up to one decimal place) of obtaining H again given the previous realizations of H, H and H would be ? 

A7) 1/2   

---
###### Q8) You are given three coins: one has heads on both faces, the seconds has tails on both faces, and the third has a head on one face and a tail on the other. You choose a coin at random and toss it, and it comes up heads. The probability that the other face is tails is
###### a) 1/4 
###### b) 1/3 
###### c) 1/2 
###### d) 2/3 

A8) b) 1/3  

---
###### Q9) A box contains 4 white balls and 3 red balls. In succession, two balls are randomly selected and removed from the box. Given that the first removed ball is white, the probability that the second removed ball is red is 
###### a) 1/3
###### b) 3/7 
###### c) 1/2 
###### d) 4/7  

A9)  c) 1/2   

---
###### Q10) A dice is rolled twice and the sum of the numbers appearing on them is observed to be 7. What is the conditional probability that the number 2 has appeared at least once.

A10) 1/3

---
###### Q11) In a town there are equal number of men and women. In which 50% of men and 20% of women are employed. Then find the probability that person is an unemployed person if person is selected randomly.

A11) 0.65  

---
###### Q12) A person has undertaken a construction job and the probability that there is strike is 0.3. The probability that construction job will be completed on time when there is strike is 0.35 and probability that construction job will be completed on time when there is no strike = 0.45. Find the probability that construction job is completed on time.

A12) 0.42   
0.3 × 0.35 + 0.7 × 0.45 = 0.42    

---
###### Q13) There are two bags. The first bag contains 5 white and 3 black balls and the second bag contains 3 white and 5 black balls. Two balls are drawn at random from the first bag and are put into the second bag without noticing their colours. Then two balls are drawn from the second bag. Find the probability that the balls are white and black.

A13) 0.534 

---
###### Q14) An insurance company insured 200 scooter drivers, 4000 car drivers and 6000 truck drivers. The probability of an accident involving a scooter driver, car driver and a truck drivers is 0.01, 0.03 and 0.15 respectively. One of the insured persons meets with an accident. What is the probability that he is a scooter driver?  

A14) 1/511         

$\frac{{0.01\times 200}}{0.01 \times 200+0.03 \times 4000 + 0.15 \times 6000} = \frac{2}{2+120+900}=\frac{2}{1022}=\frac{1}{511}$       

---
# References 

1. [YouTube One Shot](https://www.youtube.com/live/MOYnKrMYScg?si=E5gEYGOk6UGR6yrK)
2. [[Baye's Theorem]]