Type : #RawNote       
Date :  2026-05-08  
Tags :  [[College]]        
Source :    
~ ***Yash Agrawall*** ~  

---
# FLAT Notes

### Computation 

- Finding a Solution to a Problem from the given Inputs by means of an Algorithm 
- IPO - Input Process Output  

---
### FSM : Finite State Machine 

- NFA : Non Deterministic Finite Automata 
- DFA : Deterministic Finite Automata 

- Model of Computation Consisting of set of states
	- start state
	- input alphabet 
	- transition function : maps input symbols and current states to a next state 

- Start State 
	- Computation begins here with an input string 
	- Changes to next state depending upon the transition function 
- Transition Function 
	- suggests how one state is converted to next state 
- Automaton : self operational machine 
	- system that obtains, transforms, transits and uses information to perform its function without direct human participation 

---
### Components of FSA (Finite State Automata)

- Control Unit (Transition Diagram for Logic)
- Read Unit (Read one character at a time)
- Input Tape (long tape, input alphabets and characters are stored in it)

---
### Elements of FSN 

4 Main Elements : 
1. State which defines the behaviour and may produce action
2. State transition which are movements from one state to another 
3. Rules or Conditions which must be met to allow a state transition 
4. Input Events which are either internally or externally generated 
	- These may trigger these rules & lead to state transitions 
![[Pasted image 20260508181410.png]]

---
### Representation of FSA 

3 Ways : 
1. State Diagram 
2. State Transition Table 
3. Transition Function 

![[Pasted image 20260508182015.png]]

#### State 
- complete set of properties, transited by an object to an observer through one or more channel 
##### Types : 
1. Start State 
	- Initial State / Condition of FSM 
2. Accepting State 
	- FSM finishes an input string and is in accepting state
	- the string is accepted and is considered to be valid 
	- State immediately following the current state 
3. Universal State 
	- Accepts all possible moves leading to acceptance 
4. Existential State 
	- Accept any moves that leads to acceptance 
5. Dead and Trap State 
	- Non-Final state whose transition on every input symbols terminate on itself 

#### Transition 
- It is the art of passing from one state to the next state then the FSM(Finite State Machine)

##### State Diagram 

![[Pasted image 20260508182815.png]]

- Final State is mentioned with `*`
- Transition must contain at lease one final state 
- For start state (→) small arrow is used to represent 

##### Transition Table

<table>
  <tr>
    <td rowspan="2">  
    S\I</td>
    <td colspan="2">Inputs</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
  </tr>
  <tr>
    <td>SI → (Final)</td>
    <td>S2</td>
    <td>S1</td>
  </tr>
  <tr>
    <td>(State) S2</td>
    <td>S1</td>
    <td>S2</td>
  </tr>
</table>

---
### Finite Automaton 

- Finite Automata : Finite set of state, one of which is designated as initial state or start state and some or may be more of which are designated as final states 
- An alphabet signal ( ∑ ) of possible input symbols 
- A finite set of transitions that informs each state and each symbol of the input alphabet of the next state 
- FSM has 5 Characteristics 
- A = {$Q$ , $∑$ , $\delta$ , $q_{0}$ , $F$}
- $Q$ : Finite non-empty set of labels identifying the states of the machine 
- $\sum$ : Finite vocabulary of input or data symbols 
- $\delta$ : Transition function of a machine
- ${Q \times \sum \text{ into } Q}$
$$\delta : Q \times \sum \to Q$$
- $q_{0}$ must be present in $Q$
$$q_{0} \in Q$$
- $F$ (Final State) is subset of $Q$ or must be within $Q$
$$F \subseteq Q$$

---
### Language of Automaton 

- A FSM accepts a string $n = w_{1}, w_{2}, \dots , w_{i}$
- if there is a path in the transition diagram such that 
	- it begins at a start state 
	- ends at a accepting state 
	- and has labels $w_{1}, w_{2}, \dots w_{i}$

![[Pasted image 20260508185202.png]]

<table>
  <tr>
    <td rowspan="2">
States \ Inputs </td>
    <td>Present</td>
    <td>Inputs</td>
  </tr>
  <tr>
    <td>a</td>
    <td>b</td>
  </tr>
  <tr>
    <td>→*q₀</td>
    <td>q₀</td>
    <td>q₁</td>
  </tr>
  <tr>
    <td>* q₁</td>
    <td>q₀</td>
    <td>q₂</td>
  </tr>
  <tr>
    <td>* q₂</td>
    <td>q₀</td>
    <td>q₂</td>
  </tr>
  <tr>
    <td>* q₃</td>
    <td>q₃</td>
    <td>q₃</td>
  </tr>
</table>

w = $q_{0}abba$           
	= $(q_{0}b)ba$          
	= $(q_{1}b)a$        
	= $(q_{2}a)$       
	= $q_{0}$     

> If we reach final state after reading each character individually then the string is acceptable 

---
### Formal Language Theory 

- Computer is a symbol manipulator
- language is a system of signs used to communicate information to others 
- Language of computation is a combination of both English and mathematics 
- Symbol is a single object and is an abstract entity that has no meaning by itself 
- it is often called uninterpreted 

| Symbol     | Name            |
| ---------- | --------------- |
| $\alpha$   | alpha           |
| $\beta$    | beta            |
| $\gamma$   | gamma           |
| $\delta$   | delta           |
| $\zeta$    | zeta            |
| $\eta$     | eta             |
| $\theta$   | theta           |
| $\kappa$   | kappa           |
| $\lambda$  | lambda          |
| $\mu$      | mu              |
| $\vdash$   | vdash           |
| $\omicron$ | omicron         |
| $\pi$      | pi              |
| $\sum$     | sigma           |
| $\psi$     | psi             |
| $\omega$   | omega           |
| $\forall$  | for all         |
| $\in$      | element of      |
| $\not\in$  | not element of  |
| $\exists$  | there exists    |
| $\propto$  | proportional to |
| $\subset$  | subset of       |
| $::$       | as              |
| $\epsilon$ | epsilon         |

---
## Key Ideas 




---
## Note




---
### Strings 

- A finite sequence of symbols chosen from some alphabets 
###### Example : 
- WS denotes by alphabets 
- UVWxy are strings
- ijklmn are natural numbers 

#### Length of the String

- No. of symbols in the string 
- denoted by $|x|$ 
- Null String : string with no symbols : Length = 0
	- denoted by $\epsilon$
	- $x^0 = \epsilon$

#### Operations on String 

##### 1. Concatenation 
- joining strings and placing them adjacent to each other in order to form a new string 
- denoted by $\omicron$
	- $S_{1} \omicron S_{2}$
- $S_{1} \omicron S_{2} = \\\{x \in S_{1} \text{ , }y \in S_{2}\\\}$
- $x^{i+1} = x^i\omicron x$

##### 2. Kleen Closure 
- Kleen Star ($*$) or Kleen closure is unary operation either on sets of strings or on sets of symbols 
- $a^*$ means $\epsilon,a,aa,aaa, \dots$
- $s^*$ is used in regular expression 

##### 3. Positive Closure 
- represented by $S^+$
- Any set excluding $\epsilon$ is positive closure 
###### Example :
- Alphabets $\\\{a\\\}$
- $a^* = \epsilon , a, aa, \dots$
- $a^+ = a* - \epsilon$

1. $S^* = S^+$
- $S = \\\{\epsilon , a\\\}$
- $S^*= \\\{\epsilon, a, aa, aaa, \dots\\\}$
- $S^+=\\\{\epsilon, a, aa, aaa, \dots\\\}$

2. $S^* \neq S^+$
- $S = \\\{a\\\}$
- $S^*= \\\{\epsilon, a, aa, aaa, \dots\\\}$
- $S^+=\\\{ a, aa, aaa, \dots\\\}$

1. $S = S^*$



---
# Questions





---
# References
----
# Summary



