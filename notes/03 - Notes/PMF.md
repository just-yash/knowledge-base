
Type : #Note    
Date :  2026-04-19  
Tags :  [[statistics]] ; [[probability]]     
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Probability Mass Function (PMF)

### Definition

- PMF gives probability of exact value of a discrete random variable

#### Properties

- $P(X = x) \geq 0$
- $\sum P(X = x) = 1$

---

### Example: Tossing Two Coins

#### Experiment

- Toss 2 coins

#### Sample Space

- $S = {HH, HT, TH, TT}$

#### Define Random Variable

- Let $X =$ number of heads

#### Possible Values

- $X = 0, 1, 2$

#### PMF Table

|$X$|Outcomes|$P(X=x)$|
|---|---|---|
|0|TT|$1/4$|
|1|HT, TH|$2/4$|
|2|HH|$1/4$|

###### Example

- $P(X=1) = \frac{2}{4} = \frac{1}{2}$

---

## Probability Distribution

### Definition

- Complete assignment of probabilities to all values of RV

###### Example

- Distribution of $X$:
    - $P(0)=1/4$
    - $P(1)=1/2$
    - $P(2)=1/4$

---

## Distribution Function (CDF)

### Definition

- $F(x) = P(X \leq x)$

---

### Example: CDF for Above Case

|$x$|$F(x)$|
|---|---|
|$x < 0$|0|
|$0 \leq x < 1$|$1/4$|
|$1 \leq x < 2$|$3/4$|
|$x \geq 2$|1|

###### Example

- $F(1) = P(X \leq 1) = P(0) + P(1) = 3/4$

---

## Continuous Random Variable

### Definition

- Takes values in a continuous interval

---

## Probability Density Function (PDF)

### Definition

- Describes probability density over an interval

#### Properties

- $f(x) \geq 0$
- $\int_{-\infty}^{\infty} f(x),dx = 1$

---

### Example: Uniform Distribution

#### Given

$$f(x) = \begin{cases}  
    \frac{1}{2}, & 0 \leq x \leq 2 \\  
    0, & \text{otherwise}  
    \end{cases}$$

#### Verify

- $\int_0^2 \frac{1}{2} dx = 1$

###### Example

- $P(0 \leq X \leq 1) = \int_0^1 \frac{1}{2} dx = \frac{1}{2}$

---

## Learning Flow

- Discrete:
    - RV → PMF → CDF
- Continuous:
    - RV → PDF → CDF

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---

# Summary

- Random variables convert outcomes into numbers
- Discrete RV → PMF
- Continuous RV → PDF
- CDF gives cumulative probability
- Examples:
    - Coin toss (discrete)
    - Uniform distribution (continuous)



---
# Questions




---
# Summary 





---
# References