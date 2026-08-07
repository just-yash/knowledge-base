
Type : #Note    
Date :  2026-04-19  
Tags :   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
## Discrete Distributions

## Bernoulli Distribution

### PMF

- $P(X = x) = p^x (1-p)^{1-x}, ; x \in {0,1}$
    

### Mean & Variance

- $\mu = p$
    
- $\sigma^2 = p(1-p)$
    

### Identification

- Single trial
    
- Two outcomes
    

---

## Binomial Distribution

### PMF

- $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$
    

### Mean & Variance

- $\mu = np$
    
- $\sigma^2 = np(1-p)$
    

### Identification

- Fixed $n$ trials
    
- Independent
    
- Same $p$
    

---

## Poisson Distribution

### PMF

- $P(X = k) = \frac{e^{-\lambda} \lambda^k}{k!}$
    

### Mean & Variance

- $\mu = \lambda$
    
- $\sigma^2 = \lambda$
    

### Identification

- Rare events
    
- $n$ large, $p$ small
    

---

## Geometric Distribution

### PMF

- $P(X = k) = (1-p)^{k-1} p$
    

### Mean & Variance

- $\mu = \frac{1}{p}$
    
- $\sigma^2 = \frac{1-p}{p^2}$
    

### Identification

- First success
    
- Memoryless
    

---

## Continuous Distributions

## Uniform Distribution

### PDF

- $f(x) = \frac{1}{b-a}, ; a \le x \le b$
    

### Mean & Variance

- $\mu = \frac{a+b}{2}$
    
- $\sigma^2 = \frac{(b-a)^2}{12}$
    

### Identification

- Constant PDF
    

---

## Exponential Distribution

### PDF

- $f(x) = \lambda e^{-\lambda x}, ; x \ge 0$
    

### Mean & Variance

- $\mu = \frac{1}{\lambda}$
    
- $\sigma^2 = \frac{1}{\lambda^2}$
    

### Key Property

- $P(X > s+t \mid X > s) = P(X > t)$
    

---

## Normal Distribution

### PDF

- $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
    

### Mean & Variance

- $\mu = \text{mean}$
    
- $\sigma^2 = \text{variance}$
    

---

## Standard Normal Transformation

### Formula

- $Z = \frac{X - \mu}{\sigma}$
    

---

## Key Approximations

### Binomial → Poisson

- $\lambda = np$
    

---

## Quick Identification Clues

- Bernoulli → single trial
    
- Binomial → fixed $n$ trials
    
- Poisson → rare events
    
- Geometric → first success
    
- Uniform → constant density
    
- Exponential → waiting time
    
- Normal → symmetric bell curve
---