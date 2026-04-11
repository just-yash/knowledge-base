
Date :  2026-03-15  
Tags :  [[DLD]]  
~ ***Yash Agrawall*** ~  

---
# Adder

- An Adder is a Digital Combinational Circuit that performs addition of numbers. 
- Used in the Arithmetic Logic Unit (ALU)
- Used to calculate address, table indices, increment and decrement operators, and similar operations 
- Most Common Adders operate on Binary numbers
- Other type of Adders : decimal, excess-3, etc 
- Where -ve numbers represented by 2's Complement or 1's Complement → adder-subtractor 
	- 1's Complement and 2's Complement is used to perform subtraction from addition 

#### Fundamental Logic Behind Addition 
![[Pasted image 20260407211842.png]]
```
111
 789
+857
-----
1646 
----- 
```

9 + 7 = 16  
for carry we subtract the result with the base and the no. of times we had to subtract to fit the result in the range of the base (for decimal : base 10 ; range 0-9)      
here, 16 - 10 = 6   
⇒ write 6, and take 1 as carry (the no. of times we subtracted the result with the base)    
We continue this till we reach the end.  

for base 8 : 
```
11
 526
+471
-----
1217
-----
```
6 + 1 = 7 (result 7 ; carry 0)    
2 + 7 = 9    
	9 - 8 = 1  (result 1 ; carry 1)   
5 + 4 + 1 = 10   
	10 - 8 = 2 (result 2 ; carry 1)   

- or divide the result with the base : Quotient = result , Remainder = Carry

---
# Half Adder

- The simplest form of addition : addition of two binary digits (1 bit each)
- 4 possible elementary operations 
```
 1          1          0          0
+1         +0         +1         +0
---        ---        ---        ---  
10          1          1          0
---        ---        ---        ---
```

<table>
  <tr>
    <td colspan="2">INPUTS</td>
    <td colspan="2">OUTPUTS</td>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
    <td>Carry </td>
    <td>Sum</td>
  </tr>
  <tr>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
  </tr>
</table>

Observation : Sum is XOR and Carry is AND . 
![[Pasted image 20260407211608.png]]

- Cost of Implementation of a Half-Adder is one EX-OR gate and one AND gate. 
- 2 inputs(2 Operands) and 2 outputs (1 carry and 1 result)
- A half adder has only two inputs and there is no provision to add a carry coming from the lower order bits when multi bit number addition is performed. 
- For this reason, we have designed a full adder.

---
# Full Adder 

- Takes 3 inputs : 2 bits(2 Operands) and 1 carry from the previous output 
- 2 Outputs : 1 result and 1 carry for the next full adder 
- A full adder is a combinational logic circuit that performs the arithmetic sum of three input bits
- where $A_{n}$ , $B_{n}$ are the $n^{th}$ order bits of the number $A$ and $B$ respectively and $C_{n}$ is the carry generated from the addition of $(n-1)^{th}$ order bits 
- 8 possible elementary operations 
```
 1          1          1          1          0          0          0          0
 1          1          0          0          1          1          0          0
+1         +0         +1         +0         +1         +0         +1         +0
---        ---        ---        ---        ---        ---        ---        ---  
11         10         10          1         10          1          1          0
---        ---        ---        ---        ---        ---        ---        ---
```
- When the augend and addend number contain more significant digits, the carry obtained from the addition of two bits is added to the next higher order pair of significant bits 

<table>
  <tr>
    <td colspan="3">INPUTS</td>
    <td colspan="2">OUTPUTS</td>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
    <td>C<sub>in</sub></td>
    <td>C<sub>out</sub></td>
    <td>Sum</td>
  </tr>
  <tr>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  <tr>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
  </tr>
  <tr>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
  </tr>
</table>

![[Pasted image 20260408014635.png]]

![[Pasted image 20260408014646.png]]

#### K-Maps 

| $SUM$     | ab  |  a'b' |   a'b |    ab |   ab' |
| --------- | --- | ----: | ----: | ----: | ----: |
| $c_{in}$  |     |    00 |    01 |    11 |    10 |
| $c_{in}'$ | 0   |  $_0$ | 1$_2$ |  $_6$ | 1$_4$ |
| $c_{in}$  | 1   | 1$_1$ |  $_3$ | 1$_7$ |  $_5$ |

$Sum =  a'bc_{in}' + ab'c_{in} + a'b'c_{in} + abc_{in}$    
⇒ $Sum = a'(b ⊕ c_{in}) + a(\overline{b ⊕ c_{in}})$     
⇒ $Sum = a ⊕ (b ⊕ c_{in})$    
⇒ $Sum = a ⊕ b ⊕ c_{in}$

| $C_{out}$ | ab  | a'b' |   a'b |    ab |   ab' |
| --------- | --- | ---: | ----: | ----: | ----: |
| $c_{in}$  |     |   00 |    01 |    11 |    10 |
| $c_{in}'$ | 0   | $_0$ |  $_2$ | 1$_6$ |  $_4$ |
| $c_{in}$  | 1   | $_1$ | 1$_3$ | 1$_7$ | 1$_5$ |

$C_{out} = ab + ac_{in} + bc_{in}$

---
# 4-bit Parallel Binary Adder / Ripple Adder 

- Full adders : 2 single bit numbers + 1 previous carry 
- 4-bit Parallel Binary Adder : 4 Full adders in sequence 
![[Pasted image 20260408020741.png]]
- for the 1st one we can take half adder also as there is no $C_{in}$
- but generally, for symmetry we use 4 full adders only 

> if we want to calculate the sum of 2 16 bit binary numbers 
> total no. of bits : 32
> So we can implement 32 full adders or 31 full adders and 1 half adder 

- Limitations : 
	- Carry propagation delay → Very Slow → the next full adder will work only after the previous full adder has completed its work 
	- Can only perform addition 

---
# Look Ahead Carry Generator 







---
# Questions 
###### Q1) A half adder is implemented with XOR and AND gates. A full Combinational Circuit is implemented with two half Combinational Circuits and one OR gate. The propagation delay of an XOR gate is twice that of an AND/OR gate. The propagation delay of an AND/OR gate is 1.2 microseconds. A 4-bit ripple-carry binary Combinational Circuit is implemented by using four full Combinational Circuits. The total propagation time of this 4-bit binary Combinational Circuit in microseconds is___. (GATE 2015) (2 Marks)

A1) 12   
Carry equation:    
Cout = AB + (A XOR B)Cin   

Since A and B are available at t = 0, the term (A XOR B) is computed **in parallel in all full adders**.  

So:  

- **First full adder**:    
    XOR → AND → OR    
    = 2.4 + 1.2 + 1.2 = **4.8 µs **   
- **Remaining 3 full adders**:    
    XOR already ready    
    Only AND → OR    
    = 1.2 + 1.2 = **2.4 µs per stage**    

Total delay =    
4.8 + (3 × 2.4) = **12 µs**    

---







---
# References 

1. [[Combinational Circuits]]
2. [YouTube Lecture](https://youtu.be/lH0sYax5Yg0?si=-fAYq4iPoFZ7KGrO)