
Date :  2026-04-16  
Tags :  [[probability]]     
~ ***Yash Agrawall*** ~  

---
# Box Urn Bag type problems

- default : without replacement

---
## Concept : "drawn one by one without replacement" , "drawn simultaneously"

- Both mean the same 

###### Example : Calculate the Probability such that 3 balls are drawn from a box (3 Black, 3 White, 4 Red), are of 3 different colors 
###### 1. Drawn one by one without replacement 
###### 2. Drawn simultaneously 

Solution : 
1. the no. of balls are decreasing after each ball drawn 
	1. Method 1 : 3/10 × 3/9 × 4/8 × 3! 
	2. Method 2 : $\frac{{^3C_{1} \times {}^3C_{1} \times {} ^4C_{1}}}{^{10}C_{3}}$
2. it means the same 
	1. Method 1 : $\frac{{^3C_{1} \times {}^3C_{1} \times {} ^4C_{1}}}{^{10}C_{3}}$

---
## Concept : "drawn and put back" , "drawn one by one with replacement" 

###### Example : A bag contains 10 blue marbles, 20 black marbles and 30 red marbles. A marble is drawn from the bag, its color recorded and it is but back in bag. This process is repeated. The probability that no two of the marbles drawn have the same color is ? 
###### a) 1/36 
###### b) 1/6 
###### c) 1/4 
###### d) 1/3 

Solution :   b) 1/6     
Blue → 10  ; Black → 20 ; Red → 30       
$\frac{10}{60}\times \frac{20}{60} \times \frac{30}{60} \times 3!$ = 1/6         



---
# Questions

---
###### Q1) A box contains 10 screws, 3 of which are defective. Two screws are drawn at random with replacement. The probability that non of the two screws will be defective. 
###### a) 100% 
###### b) 50% 
###### c) 49% 
###### d) NOTA 

A1)  c) 49%     
$\frac{7}{10} \times \frac{7}{10} \times \frac{2!}{2!} = \frac{49}{100} = 49\%$    

---
###### Q2) A box contains 5 black and 5 red balls. Two balls are randomly picked one after another from the box, without replacement. The probability for both balls being red is
###### a) 1/90 
###### b) 1/2 
###### c) 19/90
###### d) 2/9 

A2) d) 2/9      
$\frac{5}{10} \times \frac{4}{9} \times \frac{2!}{2!} = \frac{20}{90} = \frac{2}{9}$    

---
###### Q3) A box contains 2 washers, 3 nuts and 4 bolts items are drawn from the box at random one at a time without replacement. The probability of drawing 2 washers first followed by 3 nuts and subsequently the 4 bolts is
###### a) 2/315
###### b) 1/630 
###### c) 1/1260
###### d) 1/2520

A3) c) 1/1260   
$\frac{2}{9} \times \frac{1}{8} \times \frac{3}{7} \times \frac{2}{6} \times \frac{1}{5} \times \frac{4}{4} \times \frac{3}{3} \times \frac{2}{2} \times \frac{1}{1} = \frac{1}{1260}$    
or     
$\frac{{2! \times 3! \times 4!}}{9!} = \frac{1}{1260}$   

---
###### Q4) There are 25 calculators in a box. Two of them are. defective. Suppose 5 calculators are randomly picked for inspection (i.e. each has the same chance of being selected), what is the probability that only one of the defective calculators will be include in the inspection?
###### a) 1/2 
###### b) 1/3 
###### c) 1/4 
###### d) 1/5 

A4)  b) 1/3    
$\frac{{^2C_{1} \times ^{23}C_{4} }}{^{25}C_{5}}= \frac{1}{3}$    

---
###### Q5) Two white and two black balls, kept in two bins, are arranged in four ways as shown below. In each arrangement, a bin has to be chosen randomly and only one ball needs to be picked randomly from the chosen bin. Which one of the following arrangements has the highest probability for getting a white ball picked?
![[Pasted image 20260417000758.png]]

A5)  D     
A) $\frac{1}{2} \times \frac{1}{2} + \frac{1}{2} \times \frac{1}{2} =\frac{1}{2}$      
B) $\frac{1}{2} \times 1 = \frac{1}{2}$     
C) $\frac{1}{2} \times \frac{2}{3} = \frac{1}{3}$      
D) $\frac{1}{2} + \frac{1}{2} \times \frac{1}{3} = \frac{2}{3}$     

---
###### Q6) An urn contains 5 red and 7 green balls. A ball is drawn at random and its colour is noted. The ball is placed back into the urn along with another ball of the same colour. The probability of getting a red ball in the next draw is
###### a) 65/156
###### b) 67/156
###### c) 79/156
###### d) 89/156

A6) a) 65/156     
$\frac{5}{12}\times \frac{6}{13} + \frac{7}{12} \times \frac{5}{13}=\frac{65}{156}$     


---
# References 

1. [YouTube One Shot](https://www.youtube.com/live/MOYnKrMYScg?si=6qeh96teXiJFAUhS)
2. [[Probability Introduction]]
