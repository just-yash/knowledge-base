
Type : #Note    
Date :  2026-03-13  
Tags :  [[Maths]] ; [[DLD]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# K-Map

- Karnaugh Map
- Maurice Karnaugh (DOB : 1924-10-04)
	- American Physicist, Mathematician 
#### Problem with other methods of Minimization :

- Applying Boolean laws repeatedly becomes tedious.
- Hard to recognize **where further simplification is possible**.
- Difficult to determine when the expression has reached the **minimum form**.

---
## Karnaugh Map 

- most extensively used tool
- graphical representation of truth table by pictorial form
- provides a systematic method for simplifying or minimizing a boolean expression.
### Structure of a K-Map
- For a $n$ variable K-Map, there will be $2^n$ cells addressed by a gray code. 
- Each cell corresponds to one [[Normal Form, SOP and POS#Minterms or Boolean Terms (m)|minterm]] or [[Normal Form, SOP and POS#Maxterms (M)|maxterm]]. 
	- in [[Normal Form, SOP and POS#SOP / DNF (General Form)|SOP]] → [[Normal Form, SOP and POS#Minterms or Boolean Terms (m)|minterm]] ; in [[Normal Form, SOP and POS#POS / CNF (General Form)|POS]] → [[Normal Form, SOP and POS#Maxterms (M)|maxterm]]
- Cells are arranged using **Gray Code** so that only **one variable changes between adjacent cells**.
- K-Maps are **circular**.
- Edges are adjacent. 
- Gray Code :
	- `00 01 11 10` : follow this sequence to fill the gray code
	- 0000 = 0 ; 0100 = 4 … follow in this order
	- you can choose any combination of literals but fill the gray code according to a single order.
	- Mathematically all are same but practice one order and solve according to that to save time and mental strain

###### Example : for 4 literals : abcd ([[Normal Form, SOP and POS#SOP / DNF (General Form)|SOP]])
(Most Common Method)

|      | ab  | a'b' |  a'b |      ab |     ab' |
| ---- | --- | ----:| ----:| -------:| -------:|
| cd   |     |   00 |   01 |      11 |      10 |
| c'd' | 00  | $_0$ | $_4$ | $_{12}$ |    $_8$ |
| c'd  | 01  | $_1$ | $_5$ | $_{13}$ |    $_9$ |
| cd   | 11  | $_3$ | $_7$ | $_{15}$ | $_{11}$ |
| cd'  | 10  | $_2$ | $_6$ | $_{14}$ | $_{10}$ |

|      | cd  |    c'd' |     c'd |      cd |     cd' |
| ---- | --- | -------:| -------:| -------:| -------:|
| ab   |     |      00 |      01 |      11 |      10 |
| a'b' | 00  |    $_0$ |    $_1$ |    $_3$ |    $_2$ |
| a'b  | 01  |    $_4$ |    $_5$ |    $_7$ |    $_6$ |
| ab   | 11  | $_{12}$ | $_{13}$ | $_{15}$ | $_{14}$ |
| ab'  | 10  |    $_8$ |    $_9$ | $_{11}$ | $_{10}$ |

|      | ad  |   a'd' |    a'd |      ad |     ad' |
| ---- | --- | -----: | -----: | ------: | ------: |
| bc   |     |     00 |     01 |      11 |      10 |
| b'c' | 00  |   $_0$ |   $_1$ |    $_9$ |    $_8$ |
| b'c  | 01  |   $_2$ |   $_3$ | $_{11}$ | $_{10}$ |
| bc   | 11  | $_{6}$ | $_{7}$ | $_{15}$ | $_{14}$ |
| bc'  | 10  |   $_4$ |   $_5$ | $_{13}$ | $_{12}$ |

|      | db  |    d'b' |     d'b |      db |     db' |
| ---- | --- | ------: | ------: | ------: | ------: |
| ca   |     |      00 |      01 |      11 |      10 |
| c'a' | 00  |    $_0$ |    $_4$ |    $_5$ |    $_1$ |
| c'a  | 01  |    $_8$ | $_{12}$ | $_{13}$ |    $_9$ |
| ca   | 11  | $_{10}$ | $_{14}$ | $_{15}$ | $_{11}$ |
| ca'  | 10  |    $_2$ |    $_6$ |  $_{7}$ |  $_{3}$ |

###### Example : for 3 literals : abc ([[Normal Form, SOP and POS#SOP / DNF (General Form)|SOP]])
(Most Common Method)

|     | ab  | a'b' |  a'b |   ab |  ab' |
| --- | --- | ----:| ----:| ----:| ----:|
| c   |     |   00 |   01 |   11 |   10 |
| c'  | 0   | $_0$ | $_2$ | $_6$ | $_4$ |
| c   | 1   | $_1$ | $_3$ | $_7$ | $_5$ |

|      | c   | c'   | c    |
| ---- | --- | ---- | ---- |
| ab   |     | 0    | 1    |
| a'b' | 00  | $_0$ | $_1$ |
| a'b  | 01  | $_2$ | $_3$ |
| ab   | 11  | $_6$ | $_7$ |
| ab'  | 10  | $_4$ | $_5$ |

### For n > 4 no. of variables (never asked in [[GATE]] yet)
- we can handle at max 16  terms. In case of 5 variables draw 2 K-Maps. 
	- a bcde and a' bcde
- similarly for 6 variables : 4 K-Maps 
	- a'b' cdef ; a'b cdef ; ab' cdef ; ab cdef

---
## K-Map for [[Normal Form, SOP and POS#POS / CNF (General Form)|POS]]
- rarely asked in [[GATE]]

|       | a+b |  a+b | a+b' |   a'+b' |    a'+b |
| ----- | --- | ----:| ----:| -------:| -------:|
| c+d   |     |  0+0 |  0+1 |     1+1 |     1+0 |
| c+d   | 0+0 | $_0$ | $_4$ | $_{12}$ |    $_8$ |
| c+d'  | 0+1 | $_1$ | $_5$ | $_{13}$ |    $_9$ |
| c'+d' | 1+1 | $_3$ | $_7$ | $_{15}$ | $_{11}$ |
| c'+d  | 1+0 | $_2$ | $_6$ | $_{14}$ | $_{10}$ |

---
### Minimal Function 

- A Boolean function is said to be minimal if it represents the given function using the minimum number of literals and product terms.
- literal count : total no. of variables or literals (count literals and their complements separately) 
- there can be more than one function which use the minimum no. of literals but are different → its not necessary to have a unique minimal function

---
### Rules of Grouping 

1. Every minterm must be covered 
2. Group must have contiguous cells (circular)
3. Group must be Horizontal or Vertical. Diagonal is not allowed
4. No. of cells in a group must be in the power of 2 (1, 2, 4, 8, 16...)
5. Always try to make the largest group possible, so that the no. of literals in the expression can be reduced.
6. First group the minterms that cannot be grouped in larger groups (isolated or limited options).
7. Can also take 'Dont Care Conditions' if it helps in creating the larger groups, otherwise don't consider.
8. Will consider new implicant(group) if it is covering some new minterm. 
9. Take the common literals in the group and write the expression

#### Don't Care Condition 
- Dont care cases are those cases which can never occur logically in that function
- it is not essential to cover don't care conditions, but if don't care are helping generate bigger prime implicants (groups), then we can use them.
- Dont care is same for both [[Normal Form, SOP and POS#POS / CNF (General Form)|POS]] K-Map and [[Normal Form, SOP and POS#SOP / DNF (General Form)|SOP]] K-Map
![[Pasted image 20260313223143.png]]

---
###### Examples 

|      | ab  | a'b' | a'b | ab  | ab' |
| ---- | --- | ---- | --- | --- | --- |
| cd   |     | 00   | 01  | 11  | 10  |
| c'd' | 00  |      |     | 1   |     |
| c'd  | 01  | D    | D   | 1   | D   |
| cd   | 11  |      | 1   | 1   |     |
| cd'  | 10  |      | 1   | 1   |     |

- ab + bc

|      | ab  | a'b' | a'b | ab  | ab' |
| ---- | --- | ---- | --- | --- | --- |
| cd   |     | 00   | 01  | 11  | 10  |
| c'd' | 00  |      | 1   |     |     |
| c'd  | 01  |      | 1   | 1   | 1   |
| cd   | 11  | 1    | 1   | 1   |     |
| cd'  | 10  |      |     | 1   |     |

- Here instead of taking the center 4 cells, consider 4 × 2 cells
- a'bc' + ac'd + abc + a'cd

|      | ab  | a'b' | a'b | ab  | ab' |
| ---- | --- | ---- | --- | --- | --- |
| cd   |     | 00   | 01  | 11  | 10  |
| c'd' | 00  |      | D   |     | D   |
| c'd  | 01  | 1    | 1   | D   |     |
| cd   | 11  |      | D   | 1   | 1   |
| cd'  | 10  |      | 1   | D   |     |

- a'c'd + acd + bc 
- a'c'd + acd + a'b
- both are correct : both are minimal functions

---
# Implicants
- An **implicant** is a Boolean term whose value **covers one or more cells of the K-Map where the function has the desired value**.

---
# Prime Implicant (PI)
- Implicant which is not subset of any other implicant(group). 
- A Prime Implicant is an implicant that cannot be combined with any other adjacent implicant to eliminate additional variables.
- Overlapping between PIs is allowed 
- we will always try to find Prime Implicant

---
# Essential Prime Implicant (EPI)
- A Prime Implicant (PI) which has some unique minterm which no other PI covers 
- EPI must always be present in the Minimal Boolean Expression
- A Prime Implicant is Essential if it contains at least one minterm that is not covered by any other PI.

---
###### Example : f(a,b,c) : ∑ m{1, 2, 3, 4, 5}. Find the no. of PI and EPI. Also find the no. of unique minimal expressions possible and the literal count of the minimal expression. 

|     | ab  |  a'b' |   a'b |   ab |   ab' |
| --- | --- | ----: | ----: | ---: | ----: |
| c   |     |    00 |    01 |   11 |    10 |
| c'  | 0   |  $_0$ | 1$_2$ | $_6$ | 1$_4$ |
| c   | 1   | 1$_1$ | 1$_3$ | $_7$ | 1$_5$ |

Pairs possible : {2, 3} , {4, 5} , {1, 3} , {1 ,5} 
No. of PI : 4
No. of EPI : 2
No. of unique minimal expressions possible : 2
Minimal Expression : {a'b + ab' + a'c} , {a'b + ab' + b'c} 
Literal Count of minimal Expression : 6

---
###### Q1) Consider the minterm list form of a Boolean function F given below. 
###### F(P, Q, R, S) = ∑ m(0, 2, 5, 7, 9, 11) + d(3, 8, 10, 12, 14)
###### Here, m denotes a minterm and d denotes a don't care term. The no. of EPI of the function F is — . (GATE 2018) (2 Marks)

A1) 3  

|      | pq  |  p'q' |   p'q |       pq |      pq' |
| ---- | --- | ----: | ----: | -------: | -------: |
| rs   |     |    00 |    01 |       11 |       10 |
| r's' | 00  | 1$_0$ |  $_4$ | d$_{12}$ |    d$_8$ |
| r's  | 01  |  $_1$ | 1$_5$ |  $_{13}$ |    1$_9$ |
| rs   | 11  | d$_3$ | 1$_7$ |  $_{15}$ | 1$_{11}$ |
| rs'  | 10  | 1$_2$ |  $_6$ | d$_{14}$ | d$_{10}$ |

pairs : {0, 2, 8, 10}, {5, 7} , {8, 9, 10, 11}  
q's' + p'qs + pq'   
3 PI and they are EPI as well.   

---
###### Q2) The total no. of PI of the function f(w, x, y, z) = ∑ m(0, 2, 4, 5, 6, 10) is — . (GATE 2015) (1 Marks)

A2) 3  

|      | wx  |  w'x' |   w'x |      wx |      wx' |
| ---- | --- | ----: | ----: | ------: | -------: |
| yz   |     |    00 |    01 |      11 |       10 |
| y'z' | 00  | 1$_0$ | 1$_4$ | $_{12}$ |     $_8$ |
| y'z  | 01  |  $_1$ | 1$_5$ | $_{13}$ |     $_9$ |
| yz   | 11  |  $_3$ |  $_7$ | $_{15}$ |  $_{11}$ |
| yz'  | 10  | 1$_2$ | 1$_6$ | $_{14}$ | 1$_{10}$ |

pairs : {2, 10} ,  {0, 4, 2, 6}, {4, 5}  

---
###### Q3) Which are the essential PI of the following boolean expression (GATE 2004) (1 Marks) 
###### f(a, b, c) = a'c + ac' + b'c

A3) a'c and ac'

|     | ab  |  a'b' |   a'b |    ab |   ab' |
| --- | --- | ----: | ----: | ----: | ----: |
| c   |     |    00 |    01 |    11 |    10 |
| c'  | 0   |  $_0$ |  $_2$ | 1$_6$ | 1$_4$ |
| c   | 1   | 1$_1$ | 1$_3$ |  $_7$ | 1$_5$ |

---
###### Q4) Consider the function given below 

|      | ab  |  a'b' |   a'b |       ab |      ab' |
| ---- | --- | ----: | ----: | -------: | -------: |
| cd   |     |    00 |    01 |       11 |       10 |
| c'd' | 00  | 1$_0$ |  $_4$ |  $_{12}$ |    1$_8$ |
| c'd  | 01  | 1$_1$ | 1$_5$ |  $_{13}$ |     $_9$ |
| cd   | 11  |  $_3$ | 1$_7$ | 1$_{15}$ |  $_{11}$ |
| cd'  | 10  |  $_2$ |  $_6$ | 1$_{14}$ | 1$_{10}$ |

###### Find the no. of PI, EPI, unique minimal expressions possible, literal count of the minimal expression. 

A4) 
No. of PI : 8  (4 horizontals, 4 verticals)  
No. of EPI : 0  (all are shared, hence 0 EPI)  
No. of unique minimal expressions possible : 2  (either horizontal or vertical, hybrid is either not minimal or misses something)
Literal Count : 3 × 4 = 12  (literal count of implicant of 2 cells is 3 → 4 implicants of 2 cells = 12 literals)

---
###### Q5) Given f(a, b, c, d) = ∑ m (0, 1, 2, 3, 7, 8, 10) + ∑ d(5, 6, 11, 15), where d represents don't care condition in Karnaugh Maps. Which of the following is a minimum POS form of f(a, b, c, d)? (GATE 2017) (2 Marks)
###### a) f = (a' +d') (b' + d) 
###### b) f = (a' + d) (b + d) 
###### c) f = (a + d) (b' + d)
###### d) f = (a + d') (b' + d)

A5) a) f = (a' +d') (b' + d)   
∑ m (0, 1, 2, 3, 7, 8, 10) = ∏ M(4, 9, 12, 13, 14)   

|       | a+b |  a+b |  a+b' |    a'+b' |     a'+b |
| ----- | --- | ---: | ----: | -------: | -------: |
| c+d   |     |  0+0 |   0+1 |      1+1 |      1+0 |
| c+d   | 0+0 | $_0$ | 1$_4$ | 1$_{12}$ |     $_8$ |
| c+d'  | 0+1 | $_1$ | d$_5$ | 1$_{13}$ |    1$_9$ |
| c'+d' | 1+1 | $_3$ |  $_7$ | d$_{15}$ | d$_{11}$ |
| c'+d  | 1+0 | $_2$ | d$_6$ | 1$_{14}$ |  $_{10}$ |

pairs : {13, 9, 15, 11} , {4, 12, 6, 14}   
(a' + d') (b' + d)   

---
###### Q6) Consider the following minterm expression for F : 
###### F(P, Q, R, S) = ∑ (0, 2, 5, 7, 8,10, 13, 15). 
###### The minterm 2, 7, 8, 13 are do no care terms. The minimum SOP form of F is ? (GATE 2014) (2 Marks)
###### a) QS' + Q'S
###### b) Q'S' + QS
###### c) Q'R'S' + Q'RS' + QR'S + QRS
###### d) P'Q'S' + P'QS + PQS + PQ'S'

A6) b) Q'S' + QS  

|      | pq  |  p'q' |   p'q |       pq |      pq' |
| ---- | --- | ----: | ----: | -------: | -------: |
| rs   |     |    00 |    01 |       11 |       10 |
| r's' | 00  | 1$_0$ |  $_4$ |  $_{12}$ |    d$_8$ |
| r's  | 01  |  $_1$ | 1$_5$ | d$_{13}$ |     $_9$ |
| rs   | 11  |  $_3$ | d$_7$ | 1$_{15}$ |  $_{11}$ |
| rs'  | 10  | d$_2$ |  $_6$ |  $_{14}$ | 1$_{10}$ |

pairs : {0, 8, 2, 10} , {5, 13, 7, 15}    
SOP : Q'S' + QS    

---
###### Q7) What is the minimal form of Karnaugh Map shown below? Assume that D are don't care terms. (GATE 2012) (2 Marks)

|      | ab  |  a'b' |   a'b |       ab |      ab' |
| ---- | --- | ----: | ----: | -------: | -------: |
| cd   |     |    00 |    01 |       11 |       10 |
| c'd' | 00  | 1$_0$ | D$_4$ | D$_{12}$ |    1$_8$ |
| c'd  | 01  | D$_1$ |  $_5$ |  $_{13}$ |    1$_9$ |
| cd   | 11  |  $_3$ |  $_7$ |  $_{15}$ |  $_{11}$ |
| cd'  | 10  | 1$_2$ |  $_6$ |  $_{14}$ | D$_{10}$ |

###### (A) b'd
###### (B) bʼdʼ + bʼcʼ
###### (C) bʼdʼ + aʼbʼcʼdʼ
###### (D) bʼdʼ + bʼcʼ + cʼdʼ

A7) (B) bʼdʼ + bʼcʼ
Solving my checking for each option : 
- a is not correct
- b is correct
- c is not correct
- d is not correct 

---
###### Q8) Consider the following Boolean function of four variables : (GATE 2007)(2 Marks)
###### f (w, x, y, z) = Σ (1,3,4,6,9,11,12,14)
###### The function is:
###### (A) independent of one variable.
###### (B) independent of two variables.
###### (C) independent of three variables.
###### (D) dependent on all the variables.

A8) (B) independent of two variables.  

|      | wx  |  w'x' |   w'x |       wx |      wx' |
| ---- | --- | ----: | ----: | -------: | -------: |
| yz   |     |    00 |    01 |       11 |       10 |
| y'z' | 00  |  $_0$ | 1$_4$ | 1$_{12}$ |     $_8$ |
| y'z  | 01  | 1$_1$ |  $_5$ |  $_{13}$ |    1$_9$ |
| yz   | 11  | 1$_3$ |  $_7$ |  $_{15}$ | 1$_{11}$ |
| yz'  | 10  |  $_2$ | 1$_6$ | 1$_{14}$ |  $_{10}$ |

- x'z + xz'   

---
###### Q9) let f(A,B) = A' + B. Simplified expression for function f(f(x + y), y), z) is ? (GATE 2002) (2 Marks)
###### a) x' + z
###### b) xyz
###### c) xy' + z
###### d) None of these

A9) c) xy' + z   
f(f(x + y), y), z) = ((x + y)' + y)' + z = (x + y)y' + z = xy' + z (c)   

---
###### Q10) Consider a function f(a, b, c) = ∑ m(3, 5, 6) is being minimized to A + BC. Then what are the don't care conditions?
###### a) d(2, 4)
###### b) d(2, 7)
###### c) d(4, 7)
###### d) d(2, 4, 7)

A10) c) d(4, 7)  

|     | ab  | a'b' |   a'b |    ab |   ab' |
| --- | --- | ---: | ----: | ----: | ----: |
| c   |     |   00 |    01 |    11 |    10 |
| c'  | 0   | $_0$ |  $_2$ | 1$_6$ | d$_4$ |
| c   | 1   | $_1$ | 1$_3$ | d$_7$ | 1$_5$ |

- for A + BC → 4 and 7 have to be D. 
- 2 cant be D as if 2 would have been D, then the expression would have been A + B and not A + BC
- so correct ans is c

---
###### Q11) Consider three 4-variable functions f1, f2 and f3, which are expressed in ∑ of minterms as :
###### f1 = (0,2, 5,8,14)
###### f2=(2,3,6,8,14,15)
###### f3 =(2,7,11,14)
###### For the following circuit with one AND GATE and one XOR GATE, the output function f can be expressed as: (GATE 2019) (2 Marks)

![[Pasted image 20260314160310.png]]
###### a) Σ(7, 8, 11)
###### b) Σ(2, 7, 8, 11, 14)
###### c) Σ(2, 14)
###### d) Σ(0, 2, 3, 5, 6, 7, 8, 11, 14, 15)

A11) Σ(7, 8, 11)  
AND : consider only common terms : 2, 8, 14    
XOR : consider only the terms which are not common : 7, 8 11  
- instead of solving with big truth tables, try to save time.

---
###### Q12) Given f1, f3 and f in canonical SOP form (in decimal) for the circuit given below
![[Pasted image 20260314230121.png]]
###### f1 = ∑ m(4, 5, 6, 7, 8)
###### f3 = ∑ m (1, 6, 15)
###### f = ∑ m(1, 6, 8, 15)
###### then f2 is? (GATE 2008) (1 Mark)
###### Α) Σm (4, 6)
###### Β)Σ (4, 8)
###### C)Σm(6,8)
###### D)Σ(4, 6, 8)

A12)  c  
f1.f2 + f3 = f   
(4, 5, 6, 7, 8).f2 + (1, 6, 15) = (1, 6, 8, 15)   
f2 has to have (8) and it cant have (4).  
⇒ we can eliminate option a, b, d.  

---
###### Q13) Consider the K-Map given below, where x represents "don't care condition", blank represents 0. Assume for all inputs (a, b, c, d) the respective complements (a', b', c', d') are also available. The above logic is implemented 2 input NOR gates only. The minimum no. of gates required is — . (GATE 2017) (1 Mark)
![[Pasted image 20260315150241.png]]

A13) 1  
boolean expression : a'c    
using NOR gate : (a + c')' .
It is given that the complements are already available ⇒ we don't have to make c'.   
Hence only 1 NOR Gate is required  

---
# References 

1. [YouTube Lecture](https://youtu.be/lH0sYax5Yg0?si=NwoePdccj3752Heg)