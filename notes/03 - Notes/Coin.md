
Type : #Note    
Date :  2026-04-14  
Tags :   [[probability]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Coin

- Fair / unbiased coin → $P(H) = P(T) = \frac{1}{2}$
- Unfair / biased coin → $P(H) \neq P(T)$

- Default assumption: coin is fair

---
# n Coins Tossed vs A Coin Tossed n Times

## n Coins Tossed

- 1 coin → $S = \{H, T\}$ → $n(S) = 2$  
- 2 coins → $S = \{HH, HT, TH, TT\}$ → $n(S) = 2^2$  
- General: $n(S) = 2^n$  

---

## A Coin Tossed n Times

### Example: A coin is tossed 10 times

- Total outcomes: $n(S) = 2^{10} = 1024$  

---

### 1. P(first 3 tosses are Head)

Method 1 (Direct fixing):
  $\frac{2^7}{2^{10}} = \frac{1}{8}$  

Method 2 (Multiplication):
  $\left(\frac{1}{2}\right)^3 = \frac{1}{8}$  

Method 3 (PnC view):
  $\frac{\text{favorable outcomes} = 2^7}{\text{total} = 2^{10}} = \frac{1}{8}$  

---

### 2. P(only first 3 tosses are Head)

Method 1 (Direct):
  $\frac{1}{2^{10}} = \frac{1}{1024}$  

Method 2 (Multiplication):
  $\left(\frac{1}{2}\right)^{10} = \frac{1}{1024}$  

Method 3 (PnC):
  $\frac{1}{2^{10}} = \frac{1}{1024}$  

---

### 3. P(exactly 3 Heads)

Method 1 (PnC):
  $\frac{^{10}C_3}{2^{10}} = \frac{120}{1024}$  

Method 2 (Probability model):
  $^{10}C_3 \cdot \left(\frac{1}{2}\right)^3 \cdot \left(\frac{1}{2}\right)^7 = \frac{120}{1024}$  

---

### 4. P(equal Heads and Tails)

Method 1 (PnC):
  $\frac{^{10}C_5}{2^{10}} = \frac{252}{1024}$  

Method 2:
  $^{10}C_5 \cdot \left(\frac{1}{2}\right)^{10} = \frac{252}{1024}$  

---

### 5. P(4th Head appears on 9th throw)

Method 1 (Sequential):
  $\left(\frac{^{8}C_3}{2^8}\right) \cdot \frac{1}{2}$  

Method 2 (PnC structure):
  $\frac{^{8}C_3}{2^9}$  

---

### 6. P(all outcomes are same)

Method 1 (Direct):
  $\frac{2}{2^{10}} = \frac{2}{1024}$  

Method 2 (PnC):
  $\frac{^{2}C_1}{2^{10}} = \frac{2}{1024}$  

---
### 7. P(at least 1 Head and 1 Tail)

Method 1 (Complement):
  $1 - \frac{2}{1024} = \frac{1022}{1024}$  

Method 2 (PnC):
  $\frac{2^{10} - 2}{2^{10}} = \frac{1022}{1024}$  

---
### 8. Given first 4 outcomes are HHHH  
P(next toss is Tail)

Method 1 (Independence):
  $\frac{1}{2}$  

---
### 9. Given first 4 are Heads  
P(all remaining tosses are Tail)

Method 1 (Multiplication):
  $\left(\frac{1}{2}\right)^6 = \frac{1}{64}$  

Method 2 (PnC):
  $\frac{1}{2^6} = \frac{1}{64}$  

---
# Questions

---
###### Q1) A fair coin is tossed N times. The probability that Head does not turn up in any of the tosses is 
###### a) $\frac{1}{2}^{N-1}$
###### b)  $-\frac{1}{2}^{N-1}$
###### c)  $\frac{1}{2}^{N}$
###### d)  $1 - \frac{1}{2}^{N-1}$

A1)  c)  $\frac{1}{2}^{N}$   

---
###### Q2) A fair coin is tossed independently 4 times. The probability of the event "the no. of time H shows up is more than the no. of times T shows up" is ? 
###### a) 1/16 
###### b) 1/8 
###### c) 1/4 
###### d) 5/16  

A2)  d  
$\frac{{^4C_{3} + {}^4C_{4}}}{2^4} = \frac{{4 + 1}}{16} = \frac{5}{16}$ 

---
###### Q3) Four fair coins are tossed simultaneously. The probability that at least one head and atleast one tail turns up is
###### a) 1/16 
###### b) 1/8 
###### c) 7/8 
###### d) 15/16  

A3) c) 7/8    

---
###### Q3) A coin is tossed thrice. Let X be the event that head occurs in each of the first two tosses. Let Y be the event that a tail occurs on the third toss. Let Z be the event that two tails occurs in three tosses. Based on the above information which one of the following statements is TRUE ?
###### a) X and Y are not independent
###### b) Y and Z are dependent
###### c) Y and Z are independent
###### d) X and Z are independent

A3)  b) Y and Z are dependent     
3 tosses → 8      
P(x) = 1/4 ; P(y) =  1/2 ; P(z) =  3/8       
Sx = HHT , HHH      
Sy = HHT , HTT, TTT , THT     
Sz = TTH , HTT, THT     
P(x ∩ y) = 1/8     
P(x ∩ z) = 0     
P(y ∩ z) = 2/8     

---
###### Q4) Consider a random experiment where two fair coins are tossed Let A be the event that denotes HEAD on both the throws, B be the event that denotes HEAD on the first throw, and C be the event that denotes HEAD on the second throw. Which of the following statements is/are TRUE?
###### a) A and B are independent.
###### b) A and C are independent.
###### c) B and C are independent.
###### d) Prob(B | C) = Prob(B)

A4)  c and d       
P(A) = 1/4   → HH      
P(B) = 1/2   → HH , HT      
P(C) = 1/2   → HH , TH      

---
###### Q5) A fair coin is tossed n times. The probability that the difference between the number of heads and tails in (n - 3) is
###### a) $2^{-n}$
###### b) $0$
###### c) $^nC_{n-3}2^{-n}$
###### d) $2^{-n+3}$  

A5)  b) $0$   

---
###### Q6) In a game two players X and Y are tossing a coin alternately. Whoever gets a 'head' first wins the game and the game is terminated. Find the chance that player X will win the game if he starts?
###### a) 1/3 
###### b) 1/4 
###### c) 2/3 
###### d) 3/4 

A6) c) 2/3    
![[Pasted image 20260416065235.png]]    
X = {H, TTH, TTTTH, …. }    
P(X) = $\frac{1}{2} + \frac{1}{2}^3 + \frac{1}{2} ^5 + \dots$     
P(X) = $\frac{{\frac{1}{2}}}{1-\frac{1}{4}} = \frac{2}{3}$   

---
###### Q7) Consider the following experiment:
###### Step-1: Flip a fair coin twice.
###### Step-2: If the outcomes are (Tails, Heads) the output is Y and stop.
###### Step-3: If the outcomes are either (head, heads) or (Heads, Tails), then output is N and stop.
###### Step-4: If the outcomes are (Tails, Tails), then go to step - 1.
###### Probability that above experiment results in Y.

A7) 1/3   
![[Pasted image 20260416070120.png]]
P(Y) = $\frac{1}{4} + \frac{1}{4}\times \frac{1}{4} + \frac{1}{4} \times \frac{1}{4} \times \frac{1}{4} + \dots$    
P(Y) = $\frac{{\frac{1}{4}}}{1-\frac{1}{4}}=\frac{{\frac{1}{4}}}{\frac{3}{4}} =\frac{1}{3}$     

---
###### Q8) Two coins R and S are tossed. The 4 joint events $H_{R}H_{S}$, $T_{R}T_{S}$, $H_{R}T_{S}$, $T_{R}H_{S}$ have probabilities 0.28, 0.18, 0.30, 0.24 respectively, where H represents head and T represents tail. Which one of the following is TRUE?
###### a) The coin tosses are independent 
###### b) R is fair, S is not 
###### c) S is fair, R is not 
###### d) The coin tosses are dependent 

A8) d) The coin tosses are dependent     
P($H_{R} \cap H_{S}$) = 0.28     
P($T_{R} \cap T_{S}$) = 0.18     
P($H_{R} \cap T_{S}$) = 0.30     
P($T_{R} \cap H_{s}$) = 0.24    

---






---
# References 

1. [YouTube Lecture](https://www.youtube.com/live/MOYnKrMYScg?si=qqIElhS8hdFdmaRt)
2. [[Permutation Combination Formulas]]