Type : #Note    
Date :  2026-04-17  
Tags :  [[probability]]    
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# Dice

| no. of rolls / dice | n(S) |
| ------------------- | ---- |
| 1                   | 6    |
| 2                   | 6²   |
| 3                   | 6³   |
| .                   | .    |
| .                   | .    |
| .                   | .    |
| n                   | 6ⁿ   |

## 2 Dice Rolled Sum Condition 

```
   1 2 3 4 5 6
1
2
3
4
5
6
```

- n(S) = 36 
- {(1,1), (1,2), … (6,6)}
- P(sum = T) = P(sum = 14 - T)

| sum        | equivalent sum | Probability |
| ---------- | -------------- | ----------- |
| P(sum = 2) | P(sum = 12)    | 1/36        |
| P(sum = 3) | P(sum = 11)    | 2/36        |
| P(sum = 4) | P(sum = 10)    | 3/36        |
| P(sum = 5) | P(sum = 9)     | 4/36        |
| P(sum = 6) | P(sum = 8)     | 5/36        |
| P(sum = 7) | P(sum = 7)     | 6/36        |

###### Example : 2 dice rolled

1. P(sum is 8) = 
S = {(2, 6) , (3, 5) , (4, 4), (5, 3), (6, 2)}     
P(sum is 8) = 5/36    

2. P(sum is 9) = 
S = {(3, 6) , (4, 5) , (5, 4), (6, 3)}     
P(sum is 9) = 4/36    

3. P(sum is both 8 and 9) = 
S = ϕ      
P(8 ∩ 9) = 0     

4. P(sum is either 8 or 9) = 
P(8 ∪ 9) = P(8) + P(9) - P(8 ∩ 9)       
P(8 ∩ 9) = 5/36 + 4/36 - 0 = 9/36    

5. P(sum is neither 8 nor 9) = 
1 - P(8 ∪ 9) = 1 - 9/36      
P(8 ∪ 9)' = 27/36      

###### Example : 4 dice rolled 
- S = {(1, 1, 1, 1), (1, 1, 1, 2), …. , (6, 6, 6, 6)} 
- n(S) = 6⁴ = 1296   

1. P(sum is 22) =
S = {(6, 6, 6, 4), (6, 6, 5, 5), ... }           
n(S) = $\frac{4!}{3!} + \frac{4!}{2!\times 2!}= 4 + 6 = {10}$            
P(22) = 10/1296            

2. P(sum of upper faces = 6) = 
S = {(1, 1, 1, 3) , (1, 1, 2, 2) , …. }          
n(S) = $\frac{4!}{3!}+\frac{4!}{2!\times 2!}=4 + 6 = 10$       
P(6) = 10/1296    

---
# Questions

---
###### Q1) Four fair six-sided dice are rolled. The probability that the sum of the results being 22 is x/1296. The value of x is ?  (GATE-2014) (CS-Set 1)

A1) 10   

---
###### Q2) Three person A, B, C throw a dice in succession till one gets 3 and wins the game. Find the probability of C winning. If C gets the chance followed by B followed by A. 

A2) 36/91    
$\frac{1}{6} + \frac{5}{6}^3\times \frac{1}{6} + \frac{5}{6}^6\times \frac{1}{6} + \dots$      
= $\frac{{\frac{1}{6}}}{1-\frac{5}{6}^3}=\frac{36}{91}$

---
###### Q3) A fair dice is rolled twice. The probability that an odd number will follow an even number 
###### a) 1/2 
###### b) 1/6 
###### c) 1/3 
###### d) 1/4 

A3)  d) 1/4    
$\frac{1}{2}\times \frac{1}{2} = \frac{1}{4}$    

---
###### Q4) Two fair dice are rolled and the sum r of the numbers turned up is considered 
###### a) $P_{r}(r > 6) = \frac{1}{6}$
###### b) $P_{r}\left( \frac{r}{3} \text{ is an integer} \right) = \frac{5}{6}$
###### c) $P_{r}\left( r = 8 | \frac{r}{4} \text{{ is an integer}} \right) = \frac{5}{9}$
###### d) $P_{r}\left( r = 6 | \frac{r}{5} \text{{ is an integer}} \right) = \frac{1}{18}$

A4) c) $P_{r}\left( r = 8 | \frac{r}{4} \text{{ is an integer}} \right) = \frac{5}{9}$                  
a) $P_{r}(r > 6) = \frac{1}{6}$             
= $\frac{{6 + 5 + 4 + 3 + 2 + 1}}{36} = \frac{21}{36} \neq \frac{1}{6}$         
b) $P_{r}\left( \frac{r}{3} \text{ is an integer} \right) = \frac{5}{6}$          
= $\frac{{5+4 + 2 + 1}}{36} =\frac{12}{36}=\frac{1}{3} \neq \frac{5}{6}$           
c) $P_{r}\left( r = 8 | \frac{r}{4} \text{{ is an integer}} \right) = \frac{5}{9}$                                 
= $\frac{P(r = 8)\cap P\left( \frac{r}{4} \in I \right)}{P\left( \frac{r}{4} \in I \right)} = \frac{P(r = 8)}{P(r = 4)+P(r=8)+P(r=12)}=\frac{\frac{5}{36}}{\frac{9}{36}}=\frac{5}{9}$                             
d) $P_{r}\left( r = 6 | \frac{r}{5} \text{{ is an integer}} \right) = \frac{1}{18}$                        
= $\frac{P(r = 6)\cap P\left( \frac{r}{5} \in I \right)}{P\left( \frac{r}{5} \in I \right)} = 0 \neq \frac{1}{18}$                    

---
###### Q5) A loaded dice has following probability distribution of occurrences

| Dice Value  | 1   | 2   | 3   | 4   | 5   | 6   |
| ----------- | --- | --- | --- | --- | --- | --- |
| Probability | 1/4 | 1/8 | 1/8 | 1/8 | 1/8 | 1/4 |
###### If three identical dice as the above are thrown, the probability of occurrence of value 1, 5 and 6 on the three dice is
###### a) same as the probability of occurrence of 3, 4, 5   
###### b) same as the probability of occurrence of 1, 2, 5
###### c) 1/128
###### d) 5/8

A5)   c) 1/128               
P(1, 5, 6) = $\frac{1}{4} \times \frac{1}{8} \times \frac{1}{4} = \frac{1}{128}$          

---
###### Q6) A fair dice is tossed two times. The probability that the second toss results in a value that is higher than the first toss is 
###### a) 2/36
###### b) 2/6 
###### c) 5/12
###### d) 1/2 

A6)   c) 5/12        
$\frac{1}{6}\times \frac{5}{6} + \frac{1}{6} \times \frac{4}{6} + \frac{1}{6} \times \frac{3}{6} + \frac{1}{6} \times \frac{2}{6} + \frac{1}{6} \times \frac{1}{6} + \frac{1}{6} \times \frac{0}{6} = \frac{{5 + 4 + 3 + 2 + 1 + 0}}{36} =\frac{15}{36} = \frac{5}{12}$            

---
###### Q7) When six unbiased dice are rolled simultaneously, the probability of getting all distinct numbers (i.e. 1,2, 3,4, 5 and 6) is  (GATE 2024) (1 M)
###### a) 5/324
###### b) 11/324 
###### c) 1/324
###### d) 7/324

A7)  a) 5/324       
$\frac{1}{6^6} \times 6! = \frac{10}{648} = \frac{5}{324}$         

---
# References 

1. [YouTube One Shot](https://www.youtube.com/live/MOYnKrMYScg?si=6qeh96teXiJFAUhS)