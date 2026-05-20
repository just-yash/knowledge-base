
Type : #Note    
Date :  2026-01-23    
Tags :   [[Maths]]    
Status : #complete     
~ ***Yash Agrawall*** ~    
  
---
# Order of the greatest sub-matrix
- the order of the greatest sub matrix in a matrix of order $m × n$ will be $min(m,n)$

---
# Rank of a Matrix → $ρ(A)$
- If all the minors of order $(r+1)$ are 0 and at least one minor of order $r$ is non-zero then rank of the matrix is denoted by $r$.
- If there is a matrix $[A]_{m × n }$ whose rank is $ρ (A) = r$ ⇒ there are $r$ linearly independent rows and columns.
- eg: ![[Pasted image 20260123194908.png]]

- Rank is intrinsic property of a matrix → it will never change for a matrix no matter how many Elementary Transformations are performed. 
- If a Matrix $B$ is obtained by one or more Elementary Transformations in matrix $A$ then $B$ is said to be __Equivalent Matrix__ of $A$. 
- $B ≠ A$ 
- $B$ ~ $A$ or $A$ ~ $B$ →  $A$ is equivalent to $B$ → $ρ (A) = ρ (B)$

###### Eg 1 : $$\begin{bmatrix}
1 & 2 & 3 \\
2 & 1 & 1
\end{bmatrix}$$
###### i) Highest order minor = 
###### ii) No. of minors of order 2 × 2 = 
###### iii) No. of minors of order 1 × 1 = 

A1. 
i) 2 × 2
ii) Total No. of possible Square Sub Matrix of order $r =$  $^mC_r$ $×$ $^nC_r$
⇒ no. of minors of order 2 × 2 = $^2C_2×^3C_2=\frac{2!}{(2!)(0!)}×\frac{3!}{(2!)(1!)}=3$
iii) no. of minors of order 1 × 1 ⇒ m = 2 ; n = 3 ; r = 1
⇒ $^2C_1 × ^3C_1 = \frac{2!}{(1!)(1!)} × \frac{3!}{(1!)(2!)}=2 × 3 = 6$

---
### Properties of Rank
- if $A = [a_{ij}]m × n$  then  $ρ (A) ≤ min (m,n)$
- Rank of $n × n$ non singular matrix $= n$
- Rank of NULL Matrix = 0
- The Rank of a row matrix or column matrix can be either 1 or 0(not defined.
- When a Row Matrix is multiplied with a Column Matrix provided multiplication exists : $ρ (AB)$ is either 1 or 0.
- Rank of Identity Matrix of order $n × n = n$ → $ρ(I_{n})=n$
- Rank of Scaler Matrix of order $n × n = n$
- If all Rows and Columns of a matrix are proportional or same then $ρ(A)=1$ 
- $ρ (A) = ρ (A^T) = ρ (AA^T) = ρ (A^θ) = ρ (AA^ θ )$
- if inverse of $A$ exists , then $ρ(A) = ρ (A^{-1}) = n$ 
	- cause if inverse exists ⇒ A is non-singular
- for adjoint : 
	- Case 1 : if $ρ(A)=n : ρ(adj(A)) = n$
		- $adj(A)=|A|A^{-1}$
	- Case 2 : if $ρ(A) = n -1 : ρ (adj(A)) = n - 1$
		- All $(n-1)×(n-1)$ minors are not all zero 
		- But all higher minors are 0
		- So adjoint is of rank 1
	- Case 3 : if $ρ(A) ≤ n - 2 : ρ (adj(A)) = 0$
		- All co-factors are determinants of size $(n-1)$
		- If $ρ (A) ≤ n - 2$ → all those determinants are 0. 

| $ρ (A)$ | $ρ (adj(A))$ |
| ------- | ------------ |
| $n$     | $n$          |
| $n-1$   | $1$          |
| $≤ n-2$ | $0$          |
- $ρ (A+B) ≤ ρ (A) + ρ (B)$
- $ρ (A - B) ≥ ρ (A) - ρ (B)$
- $ρ (AB) ≤ min ( ρ (A) , ρ (B))$
- $ρ(AB) ≥ ρ (A) + ρ (B) - n$   ;    $A$ & $B$ are square matrices having $n$ rows. 

---
# Elementary Transformations
1. $R_i ↔ R_j$ or $C_i↔C_j$  :  Swapping any two rows or columns
	- Δ will change : multiplication of $-1$
	- Matrix will change
2. $R_i→KR_i$ or $C_i→KC_i$  :  Multiplying a particular or column with constant $K$
	- Δ will change : multiplication of $K$
	- Matrix will change
3. $R_i→R_i+KR_j$  or $C_i→C_i+KC_j$  :  Replacing a row or column with an equation involving the row or column and other rows or columns.  
	- Δ will remain the same
	- Matrix will change

- While doing Elementary Transformation, one must be careful if various operations are being performed in a single step as in case of determinant.
- Do not use Row & Column Operations Simultaneously.

---
### Not Elementary Transformation but ρ will not change

- $R_1→KR_1+MR_2$  

Above Transformation is not Elementary but we can break it into 2 Elementary Transformations : 
1. $R_1→KR_1$
2. $R_1 → R_1+MR_2$

---
# Rank by **Row Echelon** Form

1. If there is any zero row, it must be the last row. If not, then shift the zero row to last row by elementary transformations.
2. The no. of  zero before a non-zero element of each row is less than the no. of such zeros before a non-zero element in the next row. 
3. Always make $a_{11}=1$ if possible
4. Row echelon form only Elementary Row operations has to be used(Elementary Column Operations are prohibited)
5. $ρ (A)=$ No. of non-zero rows in row Echelon Form

###### Eg 2: $$A=\begin{bmatrix}
1 & 2 & 3 \\
0 & 1 & 1 \\
0 & 0 & 1
\end{bmatrix}$$

A2) 
step 1 : Check if its in valid RE form : yes it is

step 2 : $ρ(A)=2$ 

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---





---
# Questions

[[Rank of a Matrix Qs]]


---
# Summary 





---
# References