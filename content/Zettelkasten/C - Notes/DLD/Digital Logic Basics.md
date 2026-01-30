
Date :  2025-12-28
Tags :   [[3 - Zettelkasten/B - Tags/GATE]] ; [[3 - Zettelkasten/B - Tags/DLD]]
~ ***Yash Agrawall*** ~

---
# Basics
##### Electrical Engineering:
- Deals with the study and application of electricity, electronics and electromagnetism and heavy voltage devices like transformers, motors, etc.
- Parent Branch of Electronic Engineering
##### Electronic Engineering:
- Low voltage devices(semiconductors, transistors, diodes, ICs, etc) 
- VLSI Devices and systems

Electronic Systems are generally of two types:
- #### Analog System:
	- Continuous value is used to denote information
	- Any physical quantity which varies continuously w.r.t time. 
	- Eg: amplifier, CRO, ECG
	- In real life everything is Analog
	 ![[Pasted image 20251228162023.png]]
- #### Digital System:
	- Information denoted by a finite sequence of discrete values or digits.
	- any physical quantity having discrete values
	- Eg: Digital Watch, Calculator, BP Machine, Thermometer, Etc.
	- Early Numeric Digital Computers were used for Numeric Computation. 

#### Advantages of Digital Systems
- Easy to Design
	- Do not require sound engineering and mathematical knowledge 
	- uses only switching circuits
- Storage for long time and processing of information is easy
	- Pendrives and Memory cards are small as they are Digital Systems
- Provide better accuracy and precision compared to analog devices
	- less affected by noise, sound, electric or magnetic field, etc.
- Better modularity and easy fabrication
	- Small compared to analog devices
	- Eg: ICs
- Less Cost


- Used in Communication, business, transactions, traffic control. space guidance, medical treatment, weather forecasting, the internet and many other commercial, industrial and scientific enterprises.



#### Disadvantages of Digital System
- Only Analog Signal is available in the real world
- Extra hardware is required to convert this analog signal to digital signal by using Analog to Digital Converter (ADC)
- Our body can interpret Analog values so we need to convert back signals to analog form using Digital to Analog Converter (DAC)

# Boolean Algebra
- Introduced by George Boole
	- The Mathematical Analysis of Logic (1847)
	- An investigation of the Laws of Thought (1854)
- George Boole introduced the concept of Binary number system in the studies of mathematical theory of logic and developed its algebra knows as Boolean Algebra.
- Signals use just two discrete values and are therefore called Binary.

- Instead of elementary algebra where the values of the variables are numbers, and the prime operations are addition and multiplication. The main operations of Boolean Algebra are: 
	- Conjugation (∧)
	- Disjunction (∨)
	- Negation (¬ or ~)

# Turing Machine
- Church-Turing thesis states that any algorithmic procedure that can be carried out by human beings/Computer can be carried out by a Turing Machine (1936).
- Universally accepted by Computer Scientists that Turing Machine provides an ideal Theoretical Model of a Computer

# Digital System
- Claude Shannon observed that the rules of Boole's Algebra also apply to Switching Circuits
- Introduced Switching Algebra as a way to analyze and design circuits by algebraic mean in terms of Logic Gates (1938)
- Claude Shannon - Father of Information Theory - Organised and Systematized Boole's Work. 

# von Neumann Architecture
- Its a computer architecture based on a 1945 description by John von Neumann.
- It describes a design architecture for an electronic digital computer with these components:
	- A processing unit
		- Arithmetic Logic Unit
		- Processor Registers
	- Control Unit
		- Instruction register and Program Counter
	- Memory 
		- Stores Data and Instructions
	- External Mass Storage
	- Input and Output Mechanisms
	![[Pasted image 20251228173226.png]]
# Digital System Logics
- It has two logic levels
	- lower voltage level - logic low or logic 0 (0-1 V), Which represent digit 0.
	- Higher voltage level - logic high or logic 1 (3.5 - 5 V), Which represent 1.

---
###### Q) Design a digital system for a car manufacturing company, where we want to design a warning signal for a car, there are three inputs, lights of the car(L), day or night(D), ignition (on/off) .?
A) 
1) Understand the problem- here we will Understand the definition of the problem. 
   Design the truth table -

| Light | Day | Engine | Warning |
| ----- | --- | ------ | ------- |
| 0     | 0   | 0      |         |
| 0     | 0   | 1      |         |
| 0     | 1   | 0      |         |
| 0     | 1   | 1      |         |
| 1     | 0   | 0      |         |
| 1     | 0   | 1      |         |
| 1     | 1   | 0      |         |
| 1     | 1   | 1      |         |
2) Write the Boolean Expression
	- SOP : Remembers 1
		- W (L, D, E) = ∑<sub>m</sub> (1, 4, 6, 7) 
	- POS : Remembers 2
		- W (L, D, E) = ∏<sub>M</sub> (0, 2, 3, 5)

| Light | Day | Engine | Warning |
| ----- | --- | ------ | ------- |
| 0     | 0   | 0      | 0       |
| 0     | 0   | 1      | 1       |
| 0     | 1   | 0      | 0       |
| 0     | 1   | 1      | 0       |
| 1     | 0   | 0      | 1       |
| 1     | 0   | 1      | 0       |
| 1     | 1   | 0      | 1       |
| 1     | 1   | 1      | 1       |
3) Minimize Boolean expression 
	- W = a'b'c + ab'c' + abc' + abc
	K-map :

|     | ab  |              a'b' |          a'b |                ab |               ab' |
| --- | --- | ----------------: | -----------: | ----------------: | ----------------: |
| c   |     |                00 |           01 |                11 |                10 |
| c'  | 0   |      <sub>0</sub> | <sub>2</sub> | 1    <sub>6</sub> | 1    <sub>4</sub> |
| c   |     | 1    <sub>1</sub> | <sub>3</sub> | 1    <sub>7</sub> |      <sub>5</sub> |

W =  a'b'c + ab  + ac'

4) Implement the expression using logic gates, draw the implementation using logic gates
W = ac' + ab + a'b'c

![[Pasted image 20251228182025.png]]


---
# Syllabus
1. [[Logic Gates]]
	1. NOT
	2. AND
	3. OR
	4. <span style="color:rgb(255, 192, 0)">NAND</span>
	5. <span style="color:rgb(255, 192, 0)">NOR</span>
	6. <span style="color:rgb(255, 192, 0)">XOR</span>
	7. <span style="color:rgb(255, 192, 0)">XNOR</span>
	8. Inhibition
2. Minimization
	1. <span style="color:rgb(255, 192, 0)">Boolean Algebra</span>
	2. <span style="color:rgb(255, 192, 0)">K-Map</span>
3. Combinational Circuit
	1. <span style="color:rgb(255, 192, 0)">Comparator </span>
	2. <span style="color:rgb(255, 192, 0)">MUX</span>
	3. DeMUX
	4. Encoder
	5. <span style="color:rgb(255, 192, 0)">Decoder</span>
	6. Half Adder
	7. Full Adder
	8. Half Subtractor
	9. Full Subtractor
	10. Serial Adder
	11. <span style="color:rgb(255, 192, 0)">Parallel Adder</span>
	12. Look Ahead Carry Adder (LACA)
	13. Code Converter
	14. BCD Adder
	15. <span style="color:rgb(255, 192, 0)">Multiplier</span>
	16. <span style="color:rgb(255, 192, 0)">Designing</span>
4. Sequential Circuit
	1. Latches
	2. <span style="color:rgb(255, 192, 0)">Flip-Flopes</span>
	3. Registers
	4. <span style="color:rgb(255, 192, 0)">Counters</span>
5. Number System
	1. <span style="color:rgb(255, 192, 0)">Base Conversion</span>
	2. <span style="color:rgb(255, 192, 0)">Magnitude Representation</span>
		1. Fixed Point Representation
		2. Floating Point Representation
			1. Single Precision
			2. Double Precision



---
# Questions




---
# Summary 





---
# References 

1.  [Digital Logic YouTube Lecture for GATE](https://www.youtube.com/watch?v=lH0sYax5Yg0)