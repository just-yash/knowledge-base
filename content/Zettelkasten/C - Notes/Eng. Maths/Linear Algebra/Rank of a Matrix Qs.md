
Date :  2026-01-23  
Tags :   [[Maths]] ; [[Questions]]  
~ ***Yash Agrawall*** ~  

---
# Rank of a Matrix Qs

###### Q1. $$\begin{bmatrix}
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
###### Q2. $$\begin{bmatrix}
1 & -1 & 1 \\
0 & 1 & 2 \\
4 & 5 & 7
\end{bmatrix}$$
###### i) Highest order minor = 
###### ii) No. of minors of order 3 × 3 =
###### iii) No. of minors of order 2 × 2 = 
###### iv) No. of minors of order 1 × 1 = 

A2. 
i) 3 × 3
ii) n = 3 ; m = 3 ; r = 3 ⇒  $^3C_3×^3C_3=\frac{3!}{(3!)(0!)}×\frac{3!}{(3!)(0!)}=1$
iii) n = 3 ; m = 3 ; r = 2 ⇒  $^3C_2×^3C_2=\frac{3!}{(2!)(1!)}×\frac{3!}{(2!)(1!)}=3 × 3=9$
iv) n = 3 ; m = 3 ; r = 1 ⇒  $^3C_1×^3C_1=\frac{3!}{(2!)(1!)}×\frac{3!}{(2!)(1!)}=3 × 3 = 9$

---
###### Q3. $$\begin{bmatrix}
1 & 2 & 4 & 7 \\
1 & -1 & 0 & 1 \\
2 & 3 & 7 & 3
\end{bmatrix}$$
###### i) Highest order minor =
###### ii) No. of minors of 3 × 3 = 
###### iii) No. of minors of 2 × 2 = 
###### iv) No. of minors of 1 × 1 = 

A3)
i) 3 × 3
ii) n = 3 ; m = 4 ; r = 3 ⇒  $^3C_3×^4C_3=\frac{3!}{(3!)(0!)}×\frac{4!}{(3!)(1!)}=1 × 4 = 4$
iii) n = 3 ; m = 4 ; r = 2 ⇒  $^3C_2×^4C_2=\frac{3!}{(2!)(1!)}×\frac{4!}{(2!)(2!)}=3 × 6=18$
iv) n = 3 ; m = 4 ; r = 1 ⇒  $^3C_1×^4C_1=\frac{3!}{(2!)(1!)}×\frac{4!}{(1!)(3!)}=3 × 4 = 9$

---
###### Q4) Calculate $ρ (AB)$ for $$A=\begin{bmatrix}
1 & 0 & 1
\end{bmatrix}$$   $$B=\begin{bmatrix}
1 \\
0 \\
-1
\end{bmatrix}$$
A4)

$$AB= \begin{bmatrix}
1+0-1=0
\end{bmatrix}$$
⇒ $ρ (AB) =0$

---
###### Q5) Calculate the Rank of A $$A=\begin{bmatrix}
1 & 2 & 3 & ... & n \\
2 & 4 & 6 & ... & 2n \\
3 & 6 & 9 & ... & 3n \\
... & ... & ... & ... & ... \\
n & 2n & 3n & ... & n^2
\end{bmatrix}$$
A5) 
We know that if all Rows and Columns of a matrix are proportional then rank of the matrix is 1. Here all rows and columns are proportional, hence $ρ(A)=1$ .

---
###### Q6) Calculate the Rank of A$$A=\begin{bmatrix}
0 & 0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0
\end{bmatrix}_{5×5}$$
A6) 

Step 1 : Checking of A is in a valid RE form : Yes it is, proceed
Step 2 : $ρ(A)=1$ 
 
---
###### Q7) Calculate the Rank of A$$A=\begin{bmatrix}
0 & 0 & 3 & 0 & 5 \\
0 & 0 & 0 & 1 & 0 \\
0 & 0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0 & 0
\end{bmatrix}$$
A7) 
Step 1 : Checking of A is in a valid RE form : Yes it is, proceed
Step 2 : $ρ(A)=3$ 

---
###### Q8) Calculate the Rank of A $$A=\begin{bmatrix}
1 & 1 & 1 \\
1 & -1 & 1 \\
1 & 1 & 1
\end{bmatrix}$$
A8) 
Step 1 : Checking of A is in a valid RE form : No its not.

Step 2 : Converting A to a valid RE form using Elementary Transformations : $R_2→R_2-R_1$ 
$R_3→R_3-R_1$ 
$$A = \begin{bmatrix}
1 & 1 & 1 \\
0 & -2 & 0 \\
0 & 0 & 0
\end{bmatrix}$$
Now it is in a valid RE form.

Step 3 : $ρ(A)=2$ 

---
###### Q9) Calculate the Rank of A $$A=\begin{bmatrix}
1 & 1 & 0 \\
0 & 1 & 0 \\
2 & 2 & 0
\end{bmatrix}$$
A9) 
Step 1 : Checking of A is in a valid RE form : No its not.

Step 2 : Converting A to a valid RE form : 
We know that Transpose doesn't change the rank of a matrix ⇒ $$A^T=\begin{bmatrix}
1 & 0 & 2 \\
1 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}$$
Now using Elementary Transformations : 
$R_2→R_2-R_1$ 
$$\begin{bmatrix}
1 & 0 & 2 \\
0 & -1 & 2 \\
0 & 0 & 0
\end{bmatrix}$$
Now it is in a valid RE form.

Step 3 : $ρ(A)=2$ 

---
###### Q10) Calculate the Rank of a Matrix A$$A=\begin{bmatrix}
1 & 2 & 3 \\
-1 & 2 & 2 \\
0 & 5 & 6
\end{bmatrix}_{3×3}$$
A10) 
Step 1 : Checking of A is in a valid RE form : No its not.

Step 2 : Converting A to a valid RE form using Elementary Transformations : 
$R_2→R_2+R_1$ $$\begin{bmatrix}
1 & 2 & 3 \\
0 & 4 & 5 \\
0 & 5 & 6
\end{bmatrix}$$
$R_3→4R_3-5R_2$ (Not Elementary Transformation but a combination of 2 E-Transformations → Doesn't change the Rank)$$\begin{bmatrix}
1 & 2 & 3 \\
0 & 4 & 5 \\
0 & 0 & -1
\end{bmatrix}$$
Now it is in a valid RE form.

Step 3 : $ρ(A)=3$ 

---
###### Q11) Calculate the $ρ(A) + ρ (adj(B)) + ρ (CC^T)$
###### $[A]_ {4 × 4 }$ → non-singular matrix
###### $[B]_ {4 × 4 }$ → rank = 3
###### $[C]_ {4 × 4 }$ → non-singular matrix

A11) 
$ρ(A) = 4$
$ρ(B) = 3 → n - 1 ⇒ ρ (adj(B)) = 1$
$ρ (C) = 4 ⇒ ρ (CC^T) = 4$
$⇒ ρ(A) + ρ (adj(B)) + ρ (CC^T) = 4 + 1 + 4 = 9$

---












---
# Questions




---
# Summary 





---
# References 

