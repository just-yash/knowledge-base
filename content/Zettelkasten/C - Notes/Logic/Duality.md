
Date :  2026-03-11  
Tags : [[Maths]] ; [[DLD]]  
~ ***Yash Agrawall*** ~  

---
# Duality
- In duality, the literals stay the same, but the operators (+ and .) and the constants (0 and 1) are replaced by their complements   
- f( a , b , c , d , 0 , 1 , + , . ) ⇔ f<sup>d</sup>( a , b , c , d , 1 , 0 , . , + )  
- Duality of [[Logic Gates#AND Gate|AND]] is [[Logic Gates#OR Gate|OR]] and vice versa  
- Duality of [[Logic Gates#NAND Gate|NAND]] is [[Logic Gates#NOR Gate|NOR]] and vice versa  
- Duality of [[Logic Gates#XOR / EX-OR|XOR]] is [[Logic Gates#XNOR / EX-NOR|XNOR]] and vice versa  
- If a function holds one property, then its dual will also have that property

---
# Neutral Function
- function having equal no. of minterms and maxterms

---
# Self Dual 
- f = f <sup>d</sup> 
- if the function is same as its dual 
- every self dual function is neutral
	- the vice versa may or may not be true
- for $n$ variable functions total $2^n$ minterms are possible, so we will have $2^{n-1}$ pair of mutually exclusive minterms, in every pair of mutually exclusive minterms we have two choice so, For $n$ variable function total number of $2^{(2^{(n-1)})}$ self-dual functions are possible.
#### How to check weather a function is self-dual or not? 
1. Check weather function is neutral or not i.e. (minterm = maxterm)
2. A self dual function does not have any mutually exclusive terms. So in every pair of mutual exclusion term, we can pick only 1 minterm
	- mutual exclusive pair: the 2nd term consists of literals that are complement to the literals of the 1st term
	- 0 ← → 7   (a'b'c' ← → abc)
	- 1 ← → 6   (abc' ← → a'b'c)
	- 2 ← → 5   (ab'c' ← → a'bc)
	- 3 ← → 4   (ab'c ← → a'bc')

---
# Orthogonal 
- If the compliment and the dual of the function are same
- f <sup>c</sup>  = f <sup>d</sup> 
- every self dual function is neutral
	- the vice versa may or may not be true
- [[Logic Gates#XOR / EX-OR|XOR]] and [[Logic Gates#XNOR / EX-NOR|XNOR]] 
- for $n$ variable functions total $2^n$ minterms are possible, so we will have $2^{n-1}$ pair of mutually exclusive minterms, out of which we have to select exactly half of the pairs so $2^{n-2}$ , then $^{(2^{n-1})}C_{(2^{n-2})}$ different orthogonal functions are possible
#### How to check weather a function is orthogonal or not?
1. Check weather the function is neutral or not i.e. (minterm = maxterm)
2. A orthogonal function has to have pairs of mutually exclusive terms
	- for 3 literals : 
	- if there's 0, there has to be 7 and so on.
	- so naturally there can be only half the total no. of mutually exclusive pairs as it also has to be neutral

---
# Questions
###### Q1) Which of the following functions are self-dual and orthogonal?
###### a) f(a, b, c) = ∑m(0, 3)
###### b) f(a, b, c) = ∑ m(0, 1, 6, 7)
###### c) f(a, b, c) = ∑ m(0, 1, 2, 4)
###### d) f(a, b, c) = ∏ M(3, 5, 6, 7)

A1)  self dual : c, d  ;  orthogonal : b
a) this is not neutral, hence not self dual or orthogonal   
b) neutral but has 0 and 7 & 1 and 6 in the function, they are mutually exclusive pairs, hence not self dual, but it is orthogonal
c) neutral and no multiple terms from the same mutually exclusive pair, hence its self dual   
d) neutral and no multiple terms from the same mutually exclusive pair, hence its self dual   

---
###### Q2) The dual of a Boolean function F(X1, X2, ... , Xn, + , ×, '), written as F <sup>D</sup> , is the same expression as that of F with + and × swapped. F is said to be self dual if F = F <sup>D</sup> . The number of self dual functions with n boolean variables is? (GATE 2014) (1 Marks)
###### a) $2^n$ 
###### b) $2^{n - 1}$
###### c) $2^{(2014)^{(n)}}$
###### d) $2^{2^{(n-1)}}$

A2) d


---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/lH0sYax5Yg0?si=oLDfBYjt54Ddhcxw)
