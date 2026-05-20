
Type : #Note    
Date :  2026-03-31  
Tags :  [[Maths]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Group Theory

- used in research and application 
- estimate the strength of a set with respect to an operator 
- helps identify the correct mathematical system to work in a particular research area
###### Example 
- Can we use Natural Numbers in Complex problem area like soft computing or studying black holes 

---
## Fundamental Properties and Hierarchy of Algebraic Systems

### Closure Property & Algebraic Structure

- A non-empty set $A$ combined with a binary operator $*$ is said to satisfy the closure property if operating any two elements from the set yields a result that also belongs to the same set.
    
- $\forall a, b \in A \implies (a * b) \in A$
    
- Any set that satisfies the closure property with respect to an operator is called an **Algebraic Structure**.
    
###### Example

- Natural Numbers ($\mathbb{N}$) under Addition ($+$) and Multiplication ($\times$) are closed.
    
- Natural Numbers ($\mathbb{N}$) under Subtraction ($-$) are NOT closed ($2 - 3 = -1 \notin \mathbb{N}$).
    
- Natural Numbers ($\mathbb{N}$) under Division ($\div$) are NOT closed ($3 \div 2 = 1.5 \notin \mathbb{N}$).
    
- Odd Numbers under Addition ($+$) are NOT closed ($3 + 3 = 6$, which is Even).
    
- Odd Numbers under Multiplication ($\times$) are closed ($3 \times 5 = 15$, which is Odd).
    
---

### Concept: Associative Property (Semi-Group)

#### Detailed explanation

- An algebraic structure is associative if the grouping of operands does not change the result.
    
- $\forall a, b, c \in A \implies (a * b) * c = a * (b * c)$
    
- An algebraic structure that satisfies the associative property is called a **Semi-Group**.
    

###### Example

- Addition and Multiplication are universally associative.
    
- Subtraction is NOT associative: $(1 - 2) - 3 = -4$, whereas $1 - (2 - 3) = 2$.
    
- Division is NOT associative: $(\frac{1}{2}) \div 3 = \frac{1}{6}$, whereas $1 \div (\frac{2}{3}) = \frac{3}{2}$.
    

###### Q1) For the set of Natural Numbers ($\mathbb{N}$), an operator is defined as $a * b = a^b$. What is the highest algebraic system it forms?

A1) It forms an **Algebraic Structure** only.

- **Closure:** $a^b$ for any natural numbers is always a natural number.

- **Associative:** $(a^b)^c = a^{bc}$, whereas $a^{(b^c)}$ is different. Thus, it fails associativity and is not a Semi-Group.

---

### Concept: Identity Element (Monoid)

#### Detailed explanation

- An element $e \in A$ is an identity element if operating it with any element $a$ returns $a$.
    
- $\forall a \in A, \exists e \in A \implies a * e = e * a = a$
    
- A Semi-Group that contains a valid identity element is called a **Monoid**.
    
    - For Addition ($+$), the identity is $0$.
        
    - For Multiplication ($\times$), the identity is $1$.
        

###### Example

- $(\mathbb{N}, +)$ is NOT a Monoid because $0 \notin \mathbb{N}$.
    
- $(\mathbb{Z}, +)$ is a Monoid because $0 \in \mathbb{Z}$.
    
- Set of Even numbers under Multiplication ($\times$) is NOT a Monoid because the identity $1$ is an odd number.
    

###### Q2) For the set of Integers ($\mathbb{Z}$), an operator is defined as $a * b = \max(a, b)$. What structure does it form?

A2) It forms a **Semi-Group**.

- **Closure:** Maximum of two integers is an integer.

- **Associative:** $\max(\max(a, b), c) = \max(a, \max(b, c))$ holds true.

- **Identity:** We need $\max(a, e) = a$. For this to be true for all integers (even negative ones), $e$ must be $-\infty$. Since $-\infty$ is an assumption and not a valid integer, no identity element exists. Thus, it cannot be a Monoid.

---

### Concept: Inverse Property (Group)

#### Detailed explanation

- For every element $a \in A$, there must exist a unique inverse $a^{-1} \in A$ such that their operation yields the identity element $e$.
    
- $\forall a \in A, \exists a^{-1} \in A \implies a * a^{-1} = a^{-1} * a = e$
    
- A Monoid where every element possesses an inverse is called a **Group**.
    
- **Important Properties of a Group:**
    
    - The identity element is its own inverse ($e * e = e$).
        
    - Reversal Law: $(a * b)^{-1} = b^{-1} * a^{-1}$.
        
    - Cancellation Law: $a * b = a * c \implies b = c$.
        
    - In any group, the operator 0 with multiplication fails the inverse property, as $0 \times x = 1$ has no solution.
        

###### Example

|**Set**|**Operator**|**Forms a Group?**|**Reason**|
|---|---|---|---|
|Integers ($\mathbb{Z}$)|$+$|**Yes**|Inverse of $x$ is $-x$.|
|Integers ($\mathbb{Z}$)|$\times$|**No**|Inverse of $2$ requires $0.5$, which is not an integer.|
|Real Numbers ($\mathbb{R}$)|$\times$|**No**|Inverse of $0$ does not exist.|
|$\mathbb{R} - \{0\}$|$\times$|**Yes**|Removing $0$ ensures all elements have reciprocal inverses.|
|Matrices|$+$|**Yes**|Inverse is the negated matrix.|
|Matrices|$\times$|**No**|Singular matrices (Determinant = 0) have no inverse.|
|Non-Singular Matrices|$\times$|**Yes**|All have valid inverses.|

###### Q3) An Abelian group is defined with the operator $a * b = \frac{a \times b}{3}$. What is the identity element, and what is the inverse of 6?

A3)

- **Identity:** $a * e = a \implies \frac{a \times e}{3} = a \implies e = 3$.

- **Inverse of 6:** $6 * x = e \implies \frac{6 \times x}{3} = 3 \implies 2x = 3 \implies x = \frac{3}{2}$.

---

### Concept: Commutative Property (Abelian Group)

#### Detailed explanation

- If the operator is independent of the order of operands, the group is Commutative.
    
- $a * b = b * a$
    
- A Group that satisfies the commutative property is called an **Abelian Group**.
    

###### Example

- Matrices under multiplication form a Group (if non-singular) but $A \times B \neq B \times A$. Therefore, it is a Group but NOT an Abelian Group.
    
- $(\mathbb{Z}, +)$ is an Abelian Group.
    

---

## Finite Groups and Modular Arithmetic

### Concept: Order of a Group

#### Detailed explanation

- The **Order of a Group**, denoted as $O(G)$, is the total number of elements in the finite set.
    
- Creating a finite group with standard operators ($+, \times$) is difficult due to closure failure, prompting the use of specialized operators like Modulo.
    

###### Example: Complex Roots of Unity

- Cube roots of unity $\{1, \omega, \omega^2\}$ where $\omega^3 = 1$.
    
    - Multiplicative Identity = $1$.
        
    - $\omega \times \omega^2 = \omega^3 = 1 \implies \omega$ and $\omega^2$ are inverses of each other.
        
    - $O(G) = 3$.
        
- Fourth roots of unity $\{1, -1, i, -i\}$ where $i^2 = -1$.
    
    - Identity = $1$.
        
    - $i \times -i = -i^2 = -(-1) = 1 \implies i$ and $-i$ are inverses.
        
    - $O(G) = 4$.
        

---

### Concept: Addition and Multiplication Modulo

#### Detailed explanation

- **Addition Modulo $m$ ($+_m$):**
    
    - If $a + b < m$, result is $a + b$.
        
    - If $a + b \geq m$, result is $(a + b) - m$.
        
- **Multiplication Modulo $p$ ($\times_p$):**
    
    - Result is $(a \times b) \pmod p$.
        
- **Prime Modulo Rule:**
    
    - The set $\{1, 2, ..., p-1\}$ under multiplication modulo $p$ (where $p$ is a prime number) will always form a Group because multiplying two non-zero numbers will never yield a perfect multiple of a prime, preventing the result from being $0$ (which would break closure).
        

###### Example: $Z_4 = \{0, 1, 2, 3\}$ under $+_4$

|**+4​**|**0**|**1**|**2**|**3**|
|---|---|---|---|---|
|**0**|0|1|2|3|
|**1**|1|2|3|0|
|**2**|2|3|0|1|
|**3**|3|0|1|2|

- Identity = $0$.
    
- Inverses: $1^{-1} = 3$, $2^{-1} = 2$, $3^{-1} = 1$.
    

---

## Subgroups and Lagrange's Theorem

### Concept: Subgroups

#### Detailed explanation

- A subset $H$ of a group $G$ is called a **Subgroup** if $H$ itself forms a group under the same operator.
    
- The identity element of the subgroup is always identical to the identity element of the main group.
    
- The intersection of two subgroups is always a subgroup. The union of two subgroups may or may not be a subgroup.
    

---

### Concept: Lagrange's Theorem

#### Detailed explanation

- For any finite group $G$ and its subgroup $H$, the order of the subgroup must exactly divide the order of the group.
    
- $$O(H) \mid O(G)$$
    
- **Corollary:** A group with a prime order can only have trivial subgroups (size $1$ and size $p$). It cannot have proper subgroups.
    

###### Q4) Let $G$ be a group with 15 elements. Let $L$ be a subgroup of $G$. It is known that $L \neq G$ and $|L| \geq 4$. What is the exact size of $L$?

A4)

- The order of $G$ is 15. The divisors of 15 are 1, 3, 5, 15.

- Since $L \neq G$, the size cannot be 15.

- Since $|L| \geq 4$, the sizes 1 and 3 are eliminated.

- Therefore, the size of $L$ must exactly be 5.

---

## Element Properties and Cyclic Groups

### Concept: Order of an Element

#### Detailed explanation

- The order of an individual element $a$, denoted $O(a)$, is the smallest positive integer $n$ such that operating the element with itself $n$ times yields the identity element $e$.
    
- $$a^n = e$$
    
- The order of the identity element is always 1.
    
- The order of any element always divides the order of the entire group.
    
- An element and its inverse will always share the exact same order.
    

###### Example: In $Z_4$ under $+_4$

- $O(1)$: $1 \rightarrow 2 \rightarrow 3 \rightarrow 0(e)$. Order = 4.
    
- $O(2)$: $2 \rightarrow 0(e)$. Order = 2.
    
- $O(3)$: $3 \rightarrow 2 \rightarrow 1 \rightarrow 0(e)$. Order = 4.
    

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---

### Concept: Generators and Cyclic Groups

#### Detailed explanation

- **Generator Element:** An element $a \in G$ is a generator if every element in the group can be represented as an integral power of $a$ (i.e., $a^1, a^2, a^3, ...$).
    
- **Cyclic Group:** Any group that contains at least one generator is called a Cyclic Group.
    
- **Key Theorems:**
    
    - If $a$ is a generator, its inverse $a^{-1}$ is also guaranteed to be a generator.
        
    - The Order of a generator is always exactly equal to the Order of the Group: $O(\text{Generator}) = O(G)$.
        
    - Every Cyclic Group is inherently an **Abelian Group** (Commutative).
        
    - Every group with a **prime order** is guaranteed to be a Cyclic Group, and every element in it (except the identity) is a generator.
        

###### Example: Generators in $Z_4$

- As seen above, the element $1$ generates the entire group $\{1, 2, 3, 0\}$, so $1$ is a generator.
    
- Its inverse, $3$, also generates the entire group $\{3, 2, 1, 0\}$, so $3$ is also a generator.
    
- Because $Z_4$ has generators, it is a Cyclic Group.




---
# Questions




---
# Summary 





---
# References