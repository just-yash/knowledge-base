
Type : #Note    
Date :  2026-03-11  
Tags :   [[DLD]] ; [[Maths]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Complementation
- To complement a function we can 
	- take whole complement and solve 
	- change each literal with its complement, change '+'(OR) with '.'(AND) and vice versa, change '0' with '1' and vice versa.
	- if the function is represented as f = ∑ m(1, 2), its complement will be f' = ∑ m(0, 3) or f' = ∏ M(1, 2)
	- if the function is represented as f = ∏ M(1, 2), its complement will be f' = ∏ M(0, 3) or f' = ∑ m(1, 2)
	- f( a , b , c , d , 0 , 1 , + , . ) ⇔ f'( a' , b' , c' , d' , 1 , 0 , . , + )

---
###### Q1) Consider the following Boolean expression F = (X + Y + Z)(X' + Y)(Y' + Z). Which of the following Boolean expression is/are equivalent to F' (complement of F)?
###### a) (X' + Y' + Z')(X + Y')(Y + Z')
###### b) XY' + Z'
###### c) (X + Z')(Y' + Z')
###### d) XY' + YZ' + X'Y'Z'

A1) b, c, d    
F = (X + Y + Z)(X' + Y + Z)(X' + Y + Z')(X + Y' + Z)(X' + Y' + Z)   
   = (0     0    0) (1     0    0) (1      0    1)(0     1     0 )(1      1    0)  
⇒ F = ∏ M(0, 4, 5, 2, 6)   
⇒ F' = ∏ M(1, 3, 7) = ∑ m(0, 2, 4, 5 6)   
a) (X' + Y' + Z')(X + Y')(Y + Z') = (1 1 1)(0 1 0)(0 1 1)(0 0 1)(1 0 1) = ∏ M(7, 2, 3, 1, 5)
b) XY' + Z' = (100)(101)(000)(010)(100)(110) = ∑ m(5, 6, 0, 2, 4) 
c) (X + Z')(Y' + Z') = (0 0 1)(0 1 1)(0 1 1)(1 1 1) = ∏ M(1, 3, 7)
d) XY' + YZ' + X'Y'Z' = (100)(101)(010)(110)(000) = ∑ m(0, 2, 4, 5, 6)

---