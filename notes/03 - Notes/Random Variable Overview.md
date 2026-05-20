
Type : #Note    
Date :  2026-04-19  
Tags :  [[probability]] ; [[statistics]]      
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Random Variable

---

## Function Concept (Foundation)

### Definition

- A function performs **mapping between two [[Set|sets]]*×
- [[Set]] 1 : [[Probability Introduction#Sample Space|sample space]]
- [[Set]] 2 : [[Number System#Real Numbers (R)|real numbers]]

#### Structure

- Mapping:
$$f: A \rightarrow B$$

- Based on a **predefined rule**

###### Example

- $f(x) = x^2$
    - $1 \to 1$
    - $2 \to 4$
    - $3 \to 9$

---

## Random Variable (RV)

### Definition

- A **function** that maps:
    - Sample Space $\rightarrow$ Real Line

#### Mathematical Form

- $X(\lambda)$

#### Components

- Domain → Sample Space ($S$)
- Range → Real numbers ($\mathbb{R}$)

#### Key Idea

- Converts outcomes into **numerical values**

---

### Example: Two Coins (Number of Heads)

#### Sample Space

- $S = {TT, TH, HT, HH}$

#### Define RV

- $X =$ number of heads

#### Mapping

|Outcome ($\lambda$)|$X(\lambda)$|
|---|---|
|TT|0|
|TH|1|
|HT|1|
|HH|2|

###### Example

- $X(TH) = 1$
- $X(HH) = 2$

---

## Simplified Representation

- Instead of $X(\lambda)$ → write $X$

#### Values Taken by RV

- ${0,1,2}$

---

## Type of Mapping

### Allowed

- One-to-One
- Many-to-One

### Not Allowed

- One-to-Many
- Many-to-Many

###### Example

- TH and HT → both map to 1 (Many-to-One ✔)

---

## Discrete Random Variable

### Definition

- RV whose values are **countable**

#### Important Note

- Countable ≠ Finite
- Can be:
    - Finite
    - Infinite but countable

---

### Example: Dice rolled until 3 appears

#### Sample Space

- ${3, \bar{3}3, \bar{3}\bar{3}3, ...}$
- infinite elements
- [[Set Theory#Countable & Uncountable Sets|Countable]]

#### Define RV

- $X =$ number of trials until first 3

#### Values

- $X = 1,2,3,4,...$

###### Example

- First time 3 → $X=1$
- Third attempt → $X=3$

---

## Key Insight: Countability

- Even if infinite:
    - If elements can be **counted sequentially → Discrete**

---

## Multiple Random Variables

### Concept

- Same sample space → Different RVs possible

###### Example

- $X =$ number of heads
- $Y = X^2 + 7$

|Outcome|$X$|$Y$|
|---|---|---|
|TT|0|7|
|TH|1|8|
|HT|1|8|
|HH|2|11|

---
## Function of Random Variable

### Property

- If $X$ is RV, then:

Y=g(X)Y = g(X)Y=g(X)

- is also a Random Variable

---

## Domain & Range

### Domain

- Sample Space ($S$)

### Range

- Values taken by $X$

---

## Probability at a Point

### Concept

- $P(X = x)$

---

### Example

- From coin example:

###### Example

- $P(X=1) = \frac{2}{4} = \frac{1}{2}$

---

## Probability in a Range

### Concept

- $P(a \leq X \leq b)$

---

### Example

- $P(X < 1)$

#### Solution

- Values: $X=0$

###### Example

- $P(X=0) = \frac{1}{4}$

---

### Example: Inequality

- $P(-1 \leq X \leq 1)$

#### Values Included

- $X=0,1$

###### Example

- $P = \frac{3}{4}$

---

## Converting Inequalities

### Process

1. Solve inequality
2. Identify valid $X$ values
3. Map to sample points
4. Compute probability

---

### Example

- $X^2 \leq \frac{1}{4}$

#### Solve

- $-\frac{1}{2} \leq X \leq \frac{1}{2}$

#### Valid Values

- $X = 0$

###### Example

- $P = \frac{1}{4}$

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---

# Summary

- Random Variable = function from sample space to real numbers
- Mapping is core concept
- Discrete RV → countable values
- Multiple RVs possible on same sample space
- Probability questions:
    - At a point → $P(X=x)$
    - Range → inequality solving
- Key skill:
    - Convert conditions → identify valid values → compute probability

---
# References 

1. [YouTube Lecture](https://www.youtube.com/live/lLHhl747gkk?si=pLt2uoqZlNvZiJE5)
2. [[Probability Introduction]]
---
# Questions 



