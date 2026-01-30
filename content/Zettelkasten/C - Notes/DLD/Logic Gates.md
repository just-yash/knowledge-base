
Date :  2025-12-28  
Couse :  [Logic Gates-DLD-GATE-GFG](https://www.youtube.com/live/t4jKBFuFZGA?si=QEMRw_jiVhhw3DQC&t=1286)  
Tags :   [[DLD]]  
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
- $a'$ = $a^c$  = $X \setminus A$ 
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
- Universal Gate ⇒ can be used to implement any other logic gate
![[Pasted image 20251231215841.png]]
- (a + a)' = a'
- (a + 0)' = a'
- (a + a')' = 0
- (a + 1)' = 0
#### NOR Gate Satisfies only Commutative Law: 
- Idempotent : (a + a)' ≠ a
- Associative : (a + (b + c)')' ≠ ((a + b)' + c)'

- Commutative : (a + b)' = (b + a)'

---
# NAND Gate
- If all the inputs are high → Low Output
- AND gate followed/preceded by an Invertor(NOT Gate)
- Universal Gate ⇒ can be used to implement any other logic gate
![[upscalemedia-transformed.webp]]
- (a . 0)' = 1
- (a . a')' = 1
- (a . a)' = a'
- (a . 1)' = a'
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
# Questions
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


---
# Summary 





---
# References 

1. [Logic Gates - DLD - YouTube Lecture - GATE](https://youtu.be/lH0sYax5Yg0?si=bgXGQYdX6ugDiifs&t=2049)
2. [[Digital Logic Basics]]
