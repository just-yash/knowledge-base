
Type : #Note    
Date :  2025-12-28  
Tags :   [[DLD]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# $Boolean$ $Algebra$ $Laws$
### $Idempotent$ $Law$
- $a$ $. a = a$
- $a + a = a$
### $Associative$ $Law$
- $a$ $. (b$ $. c) = (a$ $. b)$ $. c$
- $a + (b + c) = (a + b) + c$
### $Commutative$ $Law$
- $a$ $. b = b$ $. a$
- $a + b = b + a$
### $Distributive$ $Law$
- $a$ $. (b + c) = a$ $. b + a$ $. c$
- $a + (b$ $. c) = (a + b)$ $. (a + c)$
### $De-Morgan$ $Law$
- $(a + b)' = a'$ $. b'$
- $(a$ $.b)' = a' + b'$
### $Identity$ $Law$
- $a + 0 = a$
- $a$ $. 0 = 0$
- $a + 1 = 1$
- $a$ $. 1 = a$
### $Complementation$ $Law$
- $0' = 1$
- $1' = 0$
- $a$ $. a' = 0$
- $a + a' = 1$
### $Involution$ $Law$
$(a')' = a$

---
# Logic Gates
- It is a physical device implementing a Boolean function
- Logic Gates perform a logical operation on one or more binary input signals and produce a single binary output signal
- It is the basic building block from which many kinds of logic circuits can be constructed
- They are primarily implemented using
	- diodes or transistors acting as electronic switches
- can also be constructed using 
	- vacuum tubes
	- electromagnetic relays(relay logic)
	- fluidic logic
	- pneumatic logic
	- optics
	- molecules 
	- mechanical elements
- Types:
	1. NOT
	2. AND
	3. OR
	4. <span style="color:rgb(255, 192, 0)">NAND</span>
	5. <span style="color:rgb(255, 192, 0)">NOR</span>
	6. <span style="color:rgb(255, 192, 0)">XOR</span>
	7. <span style="color:rgb(255, 192, 0)">XNOR</span>
	8. Inhibition
![[Pasted image 20251229000415.png]]
![[Pasted image 20251231230604.png]]

---
# NOT Gate (Inverter)
- Represents NOT logic
- Also known as Inverter
- it is a UNARY Operator
- It simply complements the input
- $a'$ = $a^c$  = $\overline{a}$ 
![[Pasted image 20251228155311.png]]

|  A  | A'  |
|:---:|:---:|
|  0  |  1  |
|  1  |  0  |
![[Pasted image 20251228233716.png]]
When the Switch is open the current passes through the bulb
When the Switch is closed, the circuit short circuits and current doesn't pass through the bulb

- Obeys : All core Boolean Laws
- Violates : None

---
# OR Gate
- It implements Logical Disjunction
- atleast one high input → high output

|  A  |  B  | Y = A + B |
| :-: | :-: | :-------: |
|  0  |  0  |     0     |
|  0  |  1  |     1     |
|  1  |  0  |     1     |
|  1  |  1  |     1     |
![[Pasted image 20251231215704.png]]
#### OR Gate Satisfies all three core laws: 
- Idempotent : a + a = a
- Associative : a + (b + c) = (a + b) + c
- Commutative : a + b = b + a

---
# AND Gate
- It implements Logical Conjunction
- If all the inputs are high → high output

| A   | B   | Y = A . B |
| --- | --- | --------- |
| 0   | 0   | 0         |
| 0   | 1   | 0         |
| 1   | 0   | 0         |
| 1   | 1   | 1         |
![[Pasted image 20251231215621.png]]
#### AND Gate Satisfies all three core laws: 
- Idempotent : a . a = a
- Associative : a . (b . c) = (a . b) . c
- Commutative : a . b = b . a
---
# NOR Gate
- If all the inputs are low → High Output
- OR gate followed/preceded by an Invertor(NOT Gate)
![[Pasted image 20251231215841.png]]
- (a + a)' = a'
- (a + 0)' = a'
- (a + a')' = 0
- (a + 1)' = 0

- Universal Gate ⇒ can be used to implement any other logic gate
#### NOR Gate Satisfies only Commutative Law: 
- Idempotent : (a + a)' ≠ a
- Associative : (a + (b + c)')' ≠ ((a + b)' + c)'

- Commutative : (a + b)' = (b + a)'

---
# NAND Gate
- If all the inputs are high → Low Output
- AND gate followed/preceded by an Invertor(NOT Gate)
![[upscalemedia-transformed.webp]]
- (a . 0)' = 1
- (a . a')' = 1
- (a . a)' = a'
- (a . 1)' = a'

- Universal Gate ⇒ can be used to implement any other logic gate

#### NAND Gate Satisfies only Commutative Law: 
- Idempotent : (a . a)' ≠ a
- Associative : (a . (b . c)')' ≠ ((a . b)' . c)'

- Commutative : (a . b)' = (b . a)'
---
# XOR / EX-OR
- Exclusive OR
- For two inputs, If both the inputs values are different → high output
- a ⊕ b = a' . b + a . b'

| A   | B   | Y = A ⊕ B |
| --- | --- | --------- |
| 0   | 0   | 0         |
| 0   | 1   | 1         |
| 1   | 0   | 1         |
| 1   | 1   | 0         |

![[Pasted image 20251231222750.png]]
- a ⊕ 0 = a
- a ⊕ 1 = a'
- a ⊕ a = 0
- a ⊕ a' = 1

- No. of highs are odd → High output
- No. of highs are even → Low Output

| A   | B   | C   | A ⊕ B ⊕ C |
| --- | --- | --- | --------- |
| 0   | 0   | 0   | 0         |
| 0   | 0   | 1   | 1         |
| 0   | 1   | 0   | 1         |
| 0   | 1   | 1   | 0         |
| 1   | 0   | 0   | 1         |
| 1   | 0   | 1   | 0         |
| 1   | 1   | 0   | 0         |
| 1   | 1   | 1   | 1         |

a ⊕ b ⊕ c = (a' . b + a . b')' . c + (a' . b + a . b') . c'
			= ((a' . b)' . (a . b')') . c + (a' . b . c' + a . b' . c')
			= ((a + b') . (a' + b)) . c + (a' . b . c' + a . b' . c')
			= (a . a' + a . b + b' . a' + b' . b) . c + (a' . b . c' + a . b' . c')
			= (a . b . c + a' . b' . c) + (a' . b . c' + a . b' . c')
			= a . b . c + a' . b' . c + a' . b . c' + a . b' . c'

#### XOR Gate Satisfies only Associative and Commutative Law: 
- Idempotent : (a ⊕ a) ≠ a

- Associative : a ⊕ (b ⊕ c) = (a ⊕ b) ⊕ c
- Commutative : a ⊕ b = b ⊕ a

---
# XNOR / EX-NOR
- Exclusive NOR
- For two inputs, If both the inputs values are same → high output
- a ⊙ b = a'b' + ab

| a   | b   | a ⊙ b |
| --- | --- | ----- |
| 0   | 0   | 1     |
| 0   | 1   | 0     |
| 1   | 0   | 0     |
| 1   | 1   | 1     |

![[Pasted image 20260308235559.png]]
- a ⊙ 0 = a'
- a ⊙ 1 = a
- a ⊙ a = 1
- a ⊙ a' = 0

- if no. of inputs (n) is even : $A ⊕ B ⊕ … = \overline{A ⊙ B ⊙ ... }$
- if no. of inputs (n) is odd : $A ⊕ B ⊕… = A ⊙ B ⊙ ...$

| A   | B   | C   | A ⊙ B ⊙ C |
| --- | --- | --- | --------- |
| 0   | 0   | 0   | 0         |
| 0   | 0   | 1   | 1         |
| 0   | 1   | 0   | 1         |
| 0   | 1   | 1   | 0         |
| 1   | 0   | 0   | 1         |
| 1   | 0   | 1   | 0         |
| 1   | 1   | 0   | 0         |
| 1   | 1   | 1   | 1         |

#### XNOR Gate Satisfies only Associative and Commutative Law: 
- Idempotent : (a ⊙ a) ≠ a

- Associative : a ⊙ (b ⊙ c) = (a ⊙ b) ⊙ c
- Commutative : a ⊙ b = b ⊙ a

## Relation between XOR and XNOR 
- a ⊕ B = a' ⊙ b = a ⊙ b' = (a ⊙ b)' = (a' ⊙ b')' = a' ⊕ b' = (a' ⊕ b)' = (a ⊕ b')'
- a ⊙ b = a' ⊕ b = a ⊕ b' = (a ⊕ b)' = (a' ⊕ b')' = a' ⊙ b' = (a' ⊙ b)' = (a ⊙ b')'

- if the no. of complements are odd, then sign changes, if not then they cancel out and sign remains the same.

---
# NAND & NOR : Universal Gates
![[Pasted image 20260315143635.png]]
![[Pasted image 20260315143606.png]]

No. of NOR/NAND Gates required to build other logic gates : 

| Gates | NOT | AND | OR  | NAND | NOR | XOR | XNOR |
| ----- | --- | --- | --- | ---- | --- | --- | ---- |
| NOR   | 1   | 3   | 2   | 4    | 1   | 5   | 4    |
| NAND  | 1   | 2   | 3   | 1    | 4   | 4   | 5    |

---
# Functionally Complete Function 
- 3 fundamental Boolean Operators : NOT , AND and OR .
- NOT along with AND → NAND 
- NOT along with OR → NOR 
- NAND and NOR are universal gates
- If any function can implement NOT along with either AND or OR , then we indirectly prove that the function can also implement any other function → functionally complete function 

---
## Partially Functionally Complete 
- Implement any digital circuit with support of logic 0 or 1 as a input line 
- cant use complemented form

---
###### <span style="color:rgb(0, 176, 240)">Q1)</span> For a Boolean variable x, which of the following statements is/are FALSE? <span style="color:rgb(255, 192, 0)">(Gate 2024 CS) (1 Mark) (MSQ)</span>
###### (a) x . 1 = x
###### (b) x + 1 = x
###### (c) x . x = 0
###### (d) x + x' =1

<span style="color:rgb(0, 176, 240)">A1)</span>   <span style="color:rgb(146, 208, 80)">(b) x + 1 = x</span>   |   <span style="color:rgb(146, 208, 80)">(c) x . x = 0</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q2)</span> Consider the following logic circuit diagram. Which is/are the CORRECT option(s) for the output function F? <span style="color:rgb(255, 192, 0)">(GATE 2025)</span>
###### A) X Y'
###### B) X' + Y' +XY'
###### C) X'Y' + X'+XY'
###### D) X + Y'

![[Pasted image 20251231232203.png]]

<span style="color:rgb(0, 176, 240)">A2)</span>    <span style="color:rgb(146, 208, 80)">B) X' + Y' + X . Y'</span>

---
###### Q3) Consider the Boolean Operator with the following properties. (GATE 2018) (1 Marks)
###### x # 0 = x 
###### x # 1 = x'
###### x # x = 0
###### x # x' = 1
###### Then x # y is equivalent to ? 
###### a) xy' + x'y
###### b) xy' + x'y'
###### c) x'y + xy
###### d) xy + x'y' 

A3)  a) xy' + x'y  
x # x = 0, so # can be ⊕ . Check if it fits :   
x ⊕ 0 = x ; x ⊕ 1 = x' ; x ⊕ x' = 1  
it fits.  
⇒ x # y = x ⊕ y = xy' + x'y  

---
###### Q4) The binary operator # is defined by the following truth table. 

| p   | q   | p # q |
| --- | --- | ----- |
| 0   | 0   | 0     |
| 0   | 1   | 1     |
| 1   | 0   | 1     |
| 1   | 1   | 0     |
###### Which of the following is true about the binary operator # ? (GATE 2015) (1 Marks)
###### a) Both commutative and associative
###### b) Commutative but not associative 
###### c) Not commutative but associative 
###### d) Neither commutative not associative 

A4) a) Both commutative and associative

---
###### Q5) Let ⊕ denote EX-OR operation. Let 1 and 0 denote the binary constants. Consider the following Boolean expression for F over two variables P and Q. 
###### F(P, Q) = ((1 ⊕ P) ⊕ (P ⊕ Q)) ⊕ ((P ⊕ Q) ⊕ (Q ⊕ 0))
###### The equivalent expression for F is ? (GATE 2014) (2 Marks)
###### A) P + Q
###### B) (P + Q)'
###### C) P ⊕ Q
###### D) (P ⊕ Q)'

A5) D  
P ⊕ P ⊕ P ⊕ Q ⊕ Q ⊕ Q ⊕ 1 ⊕ 0  (⊕ is both commutative and associative)  
P ⊕ Q ⊕ 1  
(P ⊕ Q)'  

---
###### Q6) What is the Boolean expression for the output f of the combinational circuit of NOR gates given below? (GATE 2010) (1 Marks)
![[Pasted image 20260315003702.png]]

A6) Q'R'  
NOR-NOR is basically OR-AND implementation ⇒ ((P+Q)(Q+R) +  (P+R)(Q+R))'    
⇒ ((Q+R)(P+Q+P+R))' = ((Q+R)(P+Q+R))' = ((Q+R)(P+1))' = (Q+R)' = Q'R'   

---
###### Q7) What is the minimum no. of NAND gates required to implement a 2 - input Exclusive OR function without any other logic gate? (GATE 2004) (1 Marks)

###### a) 3
###### b) 4
###### c) 5
###### d) 6

A7) b) 4

---
###### Q8) Which of the following is functionally complete? 
###### a) ⊕ , not 
###### b) ⊕ , 1, +
###### c) ⊕ , 1, not 
###### d) ⊙ , 1, not

A8) b) ⊕ , 1, +    
in order for it to be functionally complete → it has to have AND or OR . So b is correct.  

---
###### Q9) f(a, b) = a' + b is functionally complete? 

A9) No     
f(a, b) = a' + b     
f(a, a) = a' + a = 1    
f(b, a) = b' + a    
f(a, 1) = 1    

---
###### Q10) Consider the operations (GATE 2015) (2 Marks)
###### f(X, Y, Z) = X'YZ + X'Y + Y'Z'
###### g(X, Y, Z) = X'YZ + X'YZ' + XY
###### Which of the following is correct? 
###### (A) Both {f} and {g} are functionally complete
###### (B) Only {f} is functionally complete
###### (C) Only {g} is functionally complete
###### (D) Neither {f} nor {g} is functionally complete

A10) (B) Only {f} is functionally complete  
f(x,x,x) = x'xx + x'x + x'x' = x' (NOT)    
f(x, x, z) = x'xz + x'x + x'z' = x'z'  (NOR)    
f is functionally complete.     

{g} is not complete.     

---
# References 

1. [Logic Gates - DLD - YouTube Lecture - GATE](https://youtu.be/lH0sYax5Yg0?si=bgXGQYdX6ugDiifs&t=2049)
2. [[Digital Logic Basics]]
3. [[Logical Operators]]
4. [[Primary Logical Operators Across Different Domains]]