
Date :  2026-03-22  
Tags :  [[Set]] ; [[Maths]]  
~ ***Yash Agrawall*** ~  

---
# Functions

## Fundamentals of Functions

### Definition and Mapping
- Functions are [[Relations]]
- A function $f$ is a relation from a set $A$ to a set $B$ that associates every element of $A$ to exactly one element of $B$. 
- $f \subseteq R \subseteq A \times B$
- $f : A \to B$ 
- Each element of $A$ must relate 
- Each element of $A$ can relate to exactly one element of $B$
- no restrictions on $B$ if $A \to B$ 
- **Domain**: The set $A$ (the set of all possible inputs).
- **Codomain**: The set $B$ (the set where the outputs reside).
- **Range**: The actual set of images, i.e., $\{f(a) \mid a \in A\}$. Note that Range $\subseteq$ Codomain.
- **Pre-image**: If $f(a) = b$, then $a$ is the pre-image of $b$.
- if $|A| = m$ and $|B| = n$, total no. of functions possible from $A \to B$ is $n^m$
###### Example 
![[Pasted image 20260323002146.png]]
- Domain = X 
- Co-Domain = Y 
- Range = {1}
- pre-image (1) = {a, b, c}

### Rules for Valid Functions

1. **Total Mapping**: Every element in the domain $A$ must be mapped to an element in $B$.
2. **Unique Mapping**: An element in $A$ cannot be mapped to more than one element in $B$ (no "one-to-many" mapping).
3. **Many-to-One**: Multiple elements in $A$ can map to the same element in $B$; this is still a valid function.

---
## Types of Functions

---
### Injection / One-to-One Function
- A function $f: A \to B$ is injective if distinct elements in $A$ map to distinct elements in $B$.
- **Condition**: $|A| \le |B|$ must hold for an injection to exist.
- if $|A| = m$ and $|B| = n$, total no. of injective functions possible from $A \to B$ is $$^nP_{m} = \frac{n!}{(n-m)!}$$ 
###### Example
![[Pasted image 20260323003904.png]]
- $|A| = 4$ ; $|B| = 5$ 
- Total no. of injective functions possible = $\frac{5!}{(5 - 4)!} = \frac{5!}{1!} = 120$

---
### Surjection / Onto Function

A function $f: A \to B$ is surjective if every element in the codomain $B$ has at least one pre-image in the domain $A$.
- **Formal Definition**: $\forall b \in B, \exists a \in A$ such that $f(a) = b$.
- **Condition**: $|A| \ge |B|$ must hold for a surjection to exist.
- **Key Property**: Range = Codomain.
- if $|A| = m$ and $|B| = n$, total no. of surjective functions possible from $A \to B$ is $$n^m - ^nC_{1}\times(n-1)^{m}+^nC_{2}\times(n-2)^m-^nC_{3}\times(n-3)^m+\dots+(-1)^n\times^nC_{n-1}\times 1^m$$ 
> $^nC_{m} = \frac{n!}{m!(n-m)!}$
###### Example
![[Pasted image 20260323005220.png]]
- $|A| = 4$ ; $|B| = 3$
- Total no. of surjective functions possible = $3^4 - ^3C_{1}(3-1)^4 +^3C_{2}(3-2)^4 = 3^4 - ^3C_{1}(2)^4 +^3C_{2}(1)^4 = 3^4 - \frac{3!}{2!}(2^4)+ \frac{3!}{2!}=81 -16 \times 3+3 =36$
---
### Bijection / One-to-One Correspondence / Invertible Function
- both [[2 - Zettelkasten/C - Notes/Eng. Maths/Discrete Mathematics/Sets/Functions#Injection (One-to-One Function)|injective]] and [[2 - Zettelkasten/C - Notes/Eng. Maths/Discrete Mathematics/Sets/Functions#Surjection (Onto Function)|surjective]]
- **Condition**: $|A| = |B|$.
- **Invertibility**: Only bijective functions have a well-defined inverse $f^{-1}: B \to A$.
- if $|A| = |B| = n$, total no. of bijective functions possible from $A \to B$ is $$n!$$
###### Example 
![[Pasted image 20260323011707.png]]
- $|A| = |B| = 4$
- Total no. of bijective functions possible = $4! = 24$

---
## Special Functions and Operations

---
### Composition of Functions
Given $f: A \to B$ and $g: B \to C$, the composition $(g \circ f)(x)$ is defined as $g(f(x))$.
- **Domain of $g \circ f$**: Set $A$.
- **Codomain of $g \circ f$**: Set $C$.
- **Property**: Generally, $g \circ f \neq f \circ g$ (not commutative).

---
### Inverse Functions

If $f: A \to B$ is a bijection, then $f^{-1}: B \to A$ is defined by:

$$f^{-1}(y) = x \iff f(x) = y$$

---
# Questions
###### Q1) Let $X$ and $Y$ denote two sets containing 2 and 20 distinct objects respectively and $F$ denote the set of all possible functions defined from $X$ and $Y$. Let $f$ be randomly chosen from $F$. The probability of $f$ being one-to-one is ?

A1) $19/20$   
- $|X| = 2$ ; $|Y| = 20$ 
- $|F| = 20^2 = 400$ 
- $P(f) = \frac{\frac{20!}{(20 - 2)!}}{400}= \frac{20 \times 19}{400} = \frac{19}{20}$   

---
###### Q2) How many onto functions are there from an n-element (n ≥ 2) set to a 2-element set?
###### a) $2^n$
###### b) $2^n - 1$
###### c) $2^n - 2$
###### d) $2(2^n - 2)$ 

A2) c) $2^n - 2$  
- $|A| = n$ ; $|B| = 2$
- $2^n - ^2C_1 = 2^n - \frac{2!}{1!}=2^n - 2$ 

---
###### Q4) Let R denote the set of real numbers. Let $f: R \times R \to R \times R$ be a bijective function defined by $f(x,y)= (x + y, x- y)$. The inverse function of f is given by
###### a) $f^{-1}(x, y)=(1/(x+y),1/(x-y))$
###### b) $f^{-1}(x, y)=(x-y, x+y)$
###### c)$f^{-1}(x,y)=((x+y)/2,(x-y)/2)$
###### d) $f^{-1}(x,y)=[2(x-y),2(x+y)]$

A4) c

---
###### Q5) lf g(x) = 1-x and h(x) = x/(x-1), then g(h(x)) / h(g(x)) is:
###### a) h(x) / g(x)
###### b)-1/x
###### c) g(x) / h(x)
###### d) x/(1-x)2

A5) a) h(x) / g(x)  
g(h(x)) = g(x/(x-1)) = 1 - (x/(x-1)) = 1/1-x    
h(g(x)) = h(1-x) = (1-x)/(1-x-1) = (x-1)/x   
g(h(x)) / h(g(x)) = {1/1-x} / {(x-1)/x} = {1/1-x} × {x/x-1} = - x / (1 - x)$^2$     
h(x) / g(x) = - x / (1 - x)$^2$     

---
# Summary 



 

---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=unQgZYa3RhFFDaGU)
2. [[Set Theory]]
3. [[Relations]]