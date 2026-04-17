
Date :  2026-04-15  
Tags :  [[Maths]]     
~ ***Yash Agrawall*** ~  

---
# Permutation Combination Formulas

---
# FACTORIAL

- Definition:
  $$n! = n \cdot (n-1) \cdot (n-2) \cdots 1$$

- Base case:
  $$0! = 1$$

- Recursive form:
  $$n! = n \cdot (n-1)!$$


# PERMUTATIONS (ORDER MATTERS)

- Basic Permutation:
  $$^nP_r = \frac{n!}{(n-r)!}$$

- All objects used:
  $$n!$$

- With repetition allowed:
  $$n^r$$

- With identical objects:
  $$\frac{n!}{p_1! \cdot p_2! \cdot \dots \cdot p_k!}$$ $$\frac {(\sum _{i = 1} ^{k} p_{i})!}{\prod^{k}_{i = 1} p_{i}!}$$


# COMBINATIONS (ORDER DOES NOT MATTER)

- Basic Combination:
  $$^nC_r = \frac{n!}{r!(n-r)!}$$

- Relation with permutation:
  $$^nP_r = ^nC_r \cdot r!$$

- Symmetry property:
  $$^nC_r = ^nC_{n-r}$$

- Sum identity:
  $$\sum _{r=0} ^{n} {}^nC_r = 2^n$$

- Pascal identity:
  $$^nC_r = ^{n-1}C_r + ^{n-1}C_{r-1}$$


# COMBINATIONS WITH REPETITION

- Formula:
  $$^{n+r-1}C_r$$


# SPECIAL CASES

- Circular permutation (rotation same):
  $$(n-1)!$$

- Circular permutation (rotation + reflection same):
  $$\frac{(n-1)!}{2}$$

- Derangements:
  $$!n = n! \left(1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots \right)$$


# [[PROBABILITY]] CONNECTION

- Basic probability:
  $$P(E) = \frac{\text{favorable outcomes}}{\text{total outcomes}}$$


# IMPORTANT PATTERNS

- Choose then arrange:
  $$^nC_r \cdot r!$$

- Group selection:
  $$^nC_r \cdot ^{n-r}C_k$$

- Distribution (stars and bars):
  $$^{n+r-1}C_r$$


# CORE FORMULAS SUMMARY

- Factorial:
  $$n!$$

- Permutation:
  $$^nP_r = \frac{n!}{(n-r)!}$$

- Combination:
  $$^nC_r = \frac{n!}{r!(n-r)!}$$

- With repetition:
  $$^{n+r-1}C_r$$

- Circular:
  $$(n-1)!$$