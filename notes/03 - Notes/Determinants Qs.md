Type : #Note    
Date :  2026-01-18    
Tags :   [[Maths]] ; [[Questions]]    
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# Determinants Qs

###### Q1)
$$\begin{bmatrix}
x & 2 & 4 \\
4 & 8 & 0 \\
1 & 1 & 1
\end{bmatrix} = 0
$$

###### (i) The above determinant represents which curve?
###### (ii) Straight line passes through?

A1)  3
![[Pasted image 20260118222704.png]]
(i) straight line parallel to y axis. 
(ii) straight line passes through x = 3 in the x axis. 

---
###### Q2) Find the Δ of this 4 X 4 matrix
$$\begin{bmatrix}
1 & -1 & 0 & 1 \\
1 & 2 & 3 & 4 \\
2 & 3 & 4 & 9 \\
0 & 1 & 0 & 2
\end{bmatrix}_{4*4}$$
A2)  3
Step 1 :
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - 2R_{1}$

$$\begin{bmatrix}
1 & -1 & 0 & 1 \\
0 & 3 & 3 & 3 \\
0 & 5 & 4 & 7 \\
0 & 1 & 0 & 2
\end{bmatrix}$$

Step 2 :  

$$(-1)^{1+1}\begin{bmatrix}
3 & 3 & 3 \\
5 & 4 & 7 \\
1 & 0 & 2
\end{bmatrix}$$

Step 3 : 
Using Sarrus;
$$
\begin{bmatrix}
3 & 3 & 3 & 3 & 3 \\
5 & 4 & 7 & 5 & 4 \\
1 & 0 & 2 & 1 & 0
\end{bmatrix}
$$
(3 * 4 * 2 + 3 * 7 * 1) - (1 * 4 * 3 + 2 * 5 * 3) = (24 + 21) - (12 + 30) = (45) - (42) = 3

Hence the Δ of the given 4 X 4 matrix is 3.

---
###### Q3) Find the Δ of the given 3 X 3 Matrix. 
$$
A = \begin{bmatrix}
a  & b & c \\
a + 2x & b + 2y & c + 2z \\
x & y & z
\end{bmatrix}
$$
A3) If we break the above matrix into 2. 
$$
A = \begin{bmatrix}
a  & b & c \\
a & b & c \\
x & y & z
\end{bmatrix} + \begin{bmatrix}
a & b & c \\
2x & 2y & 2z \\
x & y & z
\end{bmatrix}
$$
We can see that Δ of the 1st matrix is 0 as row 1 and row 2 are same. Also the Δ of 2nd matrix is 0 as row 2 and row 3 are proportional. 
⇒ Δ A = 0 
⇒ A is a singular matrix

---
###### Q4) Calculate the Δ of the given Matrices
$$i) \begin{bmatrix}
1 & 1 & 1 \\
1 & 1+a & 1 \\
1 & 1 & 1+b
\end{bmatrix}
$$
$$ii) \begin{bmatrix}
1 & 1 & 1 & 1 \\
1 & 1+a & 1 & 1 \\
1 & 1 & 1+b & 1 \\
1 & 1 & 1 & 1+c
\end{bmatrix}$$
A4.i)  ab
Step 1 :
Using Gauss-Jordan Elimination;
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - R_{1}$
$$
\begin{bmatrix}
1 & 1 & 1 \\
0 & a & 0 \\
0 & 0 & b
\end{bmatrix}
$$
Step 2 :
As we can see this gives us a Upper Triangular Matrix ⇒ Δ = $1 * a * b = ab$

A4.ii)  abc
Step 1:
Using Gauss-Jordan Elimination;
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - R_{1}$
$R_{4} → R_{4} - R_{1}$
$$\begin{bmatrix}
1 & 1 & 1 & 1 \\
0 & a & 0 & 0 \\
0 & 0 & b & 0 \\
0 & 0 & 0 & c
\end{bmatrix}$$
Step 2 :
As we can see this gives us a Upper Triangular Matrix ⇒ Δ = $1 * a * b * c = abc$

---
###### Q5) Solve this 3X3 Matrix.
$$\begin{bmatrix}
1+a & 1 & 1 \\
1 & 1+b & 1 \\
1 & 1 & 1+c
\end{bmatrix}$$
A5)  ab + bc + ca + abc

> If you are unable to think of any method, then directly solve the matrix without wasting time. For matrices of higher order you may invent time in looking for shortcuts.

$Δ = ( 1 + a ) { ( 1 + b ) ( 1 + c ) - 1 } - 1 ( 1 + c - 1 ) + 1 ( 1 - ( 1 + b ) )$
$Δ = ab + bc + ca + abc$

---
###### Q6)  Solve the following matrix
$$\begin{bmatrix}
1+b & 1 & 1 \\
1 & 1+b & 1 \\
1 & ab & 1
\end{bmatrix}$$
A6)  b(1+b-ab)
Step 1: 
Applying Gauss-Jordan Elimination:
$R_{1} → R_{1} - R_{3}$
$R_{2} → R_{2} - R_{3}$
$$\begin{bmatrix}
b & 1-ab & 0 \\
0 & 1+b-ab & 0 \\
1 & ab & 1
\end{bmatrix}$$

Step 2:
$Δ = (b(1+b-ab))$
$Δ = (b + b^{2} - a*b^{2})$

---
###### Q7) Solve this determinant
$$Δ = \begin{vmatrix}
\frac{1}{a} & a & bc \\
\frac{1}{b} & b & ca \\
\frac{1}{c} & c & ab
\end{vmatrix}$$

A7)  Δ = 0
Multiplying Δ with $abc$

$$⇒ abc(Δ) = \begin{vmatrix}
abc(\frac{1}{a}) & a & bc \\
abc(\frac{1}{b}) & b & ca \\
abc(\frac{1}{c}) & c & ab
\end{vmatrix}$$
$$⇒ abc(Δ) =  \begin{vmatrix}
bc & a & bc \\
ca & b & ca \\
ab & c & ab
\end{vmatrix}$$

We can see that on multiplying Δ with abc C1 = C3
⇒ Δ * abc = 0

---
###### Q8) Find the Solution of this determinant:
$$i) Δ = \begin{vmatrix}
x & a & a & a \\
a & x & a & a \\
a & a & x & a \\
a & a & a & x
\end{vmatrix}$$
A8.i)   ( x + 3a ) ( x - a )<sup>3</sup> 
Step 1: 
Gauss-Jordan Elimination: 
$C_{1}→C_{1} + C_{2} + C_{3} + C_{4}$ 

$$⇒ Δ =\begin{vmatrix}
x+3a & a & a & a \\
x+3a & x & a & a \\
x+3a & a & x & a \\
x+3a & a & a & x
\end{vmatrix} $$
$$⇒ Δ = (x+3a)\begin{vmatrix}
1 & a & a & a \\
1 & x & a & a \\
1 & a & x & a \\
1 & a & a & x
\end{vmatrix}$$
Step 2: 
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - R_{1}$
$R_{4} → R_{4} - R_{1}$

$$⇒ Δ = (x+3a)\begin{vmatrix}
1 & a & a & a \\
0 & x-a & 0 & 0 \\
0 & 0 & x-a & 0 \\
0 & 0 & 0 & x-a
\end{vmatrix}$$
Step 3:
We can see that now the determinant is a Upper Triangular Matrix 
$⇒ Δ = (x+3a)*(1* (x-a) * (x-a) * (x-a)$
$⇒ Δ = (x+3a) * (x-a)^{3}$

$$ii) Δ=\begin{vmatrix}
4 & 3 & 3 & 3 \\
3 & 4 & 3 & 3 \\
3 & 3 & 4 & 3 \\
3 & 3 & 3 & 4
\end{vmatrix} $$
A8.ii)  13
Step 1: Gauss-Jordan Elimination:
$C_{1}→C_{1} + C_{2} + C_{3} + C_{4}$ 
$$⇒  Δ = \begin{vmatrix}
13 & 3 & 3 & 3 \\
13 & 4 & 3 & 3 \\
13 & 3 & 4 & 3 \\
13 & 3 & 3 & 4
\end{vmatrix}$$
$$⇒ Δ =13*\begin{vmatrix}
1 & 3 & 3 & 3 \\
1 & 4 & 3 & 3 \\
1 & 3 & 4 & 3 \\
1 & 3 & 3 & 4
\end{vmatrix}$$ Step 2: 
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - R_{1}$
$R_{4} → R_{4} - R_{1}$

$$⇒ Δ = 13 *\begin{vmatrix}
1 & 3 & 3 & 3 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{vmatrix}$$
Step 3:
We can see that now the determinant is a Upper Triangular Matrix 
$⇒ Δ = 13 * 1 * 1 * 1 * 1$
$⇒ Δ = 13$

$$iii) Δ = \begin{vmatrix}
1+x & 2 & 3 & 4 \\
1 & 2+x & 3 & 4 \\
1 & 2 & 3+x & 4 \\
1 & 2 & 3 & 4+x
\end{vmatrix}$$
A8.iii)  ( 10 + x ) ( x<sup>3</sup> )
Step 1: 
Gauss-Jordan Elimination: 
$C_{1}→C_{1} + C_{2} + C_{3} + C_{4}$ 
$$⇒ Δ = \begin{vmatrix}
10+x & 2 & 3 & 4 \\
10+x & 2+x & 3 & 4 \\
10+x & 2 & 3+x & 4 \\
10+x & 2 & 3 & 4+x
\end{vmatrix}$$
$$⇒ Δ = (10+x)*\begin{vmatrix}
1 & 2 & 3 & 4 \\
1 & 2+x & 3 & 4\\
1 & 2 & 3+x & 4 \\
1 & 2 & 3 & 4+x
\end{vmatrix}$$Step 2: 
$R_{2} → R_{2} - R_{1}$
$R_{3} → R_{3} - R_{1}$
$R_{4} → R_{4} - R_{1}$
$$⇒ Δ =(10+x)*\begin{vmatrix}
1 & 2 & 3 & 4 \\
0 & x & 0 & 0 \\
0 & 0 & x & 0 \\
0 & 0 & 0 & x
\end{vmatrix} $$
Step 3:
We can see that now the determinant is a Upper Triangular Matrix 
$⇒ Δ = (10+x)*x^{3}$

---
###### Q9) Solve this determinant
$$\begin{vmatrix}
1 & 1 & 1 \\
a & b & c \\
a^{2} & b^{2} & c^{2}
\end{vmatrix}$$
A9)  (a-b)(b-c)(c-a)
Step 1:
$C_{2} → C_{2} - C_{1}$
$C_{3} → C_{3} - C_{1}$
$$⇒ \begin{vmatrix}
1 & 0 & 0 \\
a & b-a & c-a \\
a^{2} & b^{2} - a^{2} & c^{2}-a^{2}
\end{vmatrix}$$
Step 2: 
Expanding along R1:
$⇒ Δ = (b-a)(c^{2}-a^{2}) - (c-a)(b^{2}-a^{2})$
$⇒ Δ = (a-b)(b-c)(c-a)$

---
###### Q10) Calculate the Inverse of these Matrices 
$$a)\begin{bmatrix}
1 & 2 & 2 \\
2 & 1 & 2 \\
2 & 2 & 1
\end{bmatrix}$$$$b)\begin{bmatrix}
1 & 2 & -2 \\
-1 & 3 & 0 \\
0 & -2 & 1
\end{bmatrix}$$

A10.a) 

Step 1 : Determinant = 5 
$$\begin{bmatrix}
1 & 2 & 2 & 1 & 2 \\
2 & 1 & 2 & 2 & 1 \\
2 & 2 & 1 & 2 & 2
\end{bmatrix}$$
(1 + 8 + 8) - (4 + 4 + 4) = 5

Step 2 : $$\begin{bmatrix}
1 & 2 & 2 & 1 & 2 \\
2 & 1 & 2 & 2 & 1 \\
2 & 2 & 1 & 2 & 2 \\
1 & 2 & 2 & 1 & 2 \\
2 & 1 & 2 & 2 & 1
\end{bmatrix}$$
Step 3 : $$\begin{bmatrix}
1 & 2 & 2 & 1 \\
2 & 1 & 2 & 2 \\
2 & 2 & 1 & 2 \\
1 & 2 & 2 & 1
\end{bmatrix}$$
Step 4 : $$\begin{bmatrix}
1-4 & 4-2 & 4-2 \\
4-2 & 1-4 & 4-2 \\
4-2 & 4-2 & 1-4
\end{bmatrix} = \begin{bmatrix}
-3 & 2 & 2 \\
2 & -3 & 2 \\
2 & 2 & -3
\end{bmatrix}$$
Step 5 : $$\frac{1}{5}\begin{bmatrix}
-3 & 2 & 2 \\
2 & -3 & 2 \\
2 & 2 & -3
\end{bmatrix}$$

A10.b) 

Step 1 : Determinant = 1$$\begin{bmatrix}
1 & 2 & -2 & 1 & 2 \\
-1 & 3 & 0 & -1 & 3 \\
0 & -2 & 1 & 0 & -2
\end{bmatrix}$$
(3 +0 - 4) - (0 + 0 - 2) = 1

Step 2 : $$\begin{bmatrix}
1 & 2 & -2 & 1 & 2 \\
-1 & 3 & 0 & -1 & 3 \\
0 & -2 & 1 & 0 & -2 \\
1 & 2 & -2 & 1 & 2 \\
-1 & 3 & 0 & -1 & 3
\end{bmatrix}$$
Step 3 : $$\begin{bmatrix}
3 & 0 & -1 & 3 \\
-2 & 1 & 0 & -2 \\
2 & -2 & 1 & 2 \\
3 & 0 & -1 & 3
\end{bmatrix}$$
Step 4 : $$\begin{bmatrix}
3-0 & 4-2 & 0+6 \\
0+1 & 1+0 & 2-0 \\
2-0 & 0+2 & 3+2
\end{bmatrix}=\begin{bmatrix}
3 & 2 & 6 \\
1 & 1 & 2 \\
2 & 2 & 5
\end{bmatrix}$$

Step 5 : $$\begin{bmatrix}
3 & 2 & 6 \\
1 & 1 & 2 \\
2 & 2 & 5
\end{bmatrix}$$

---
###### Q11) If $[A]$ is a 4X4 matrix with $|A|=5$. Also $[B]=5[A]$. Then find the value of $|adj(adj(B))|$.

A11)  5<sup>45</sup> 

$|B|=5^{4}|A|$
$|B|=5^5$
$|adj(adj(B))| = |B|^{(n-1)^{2}}=|B|^{(4-1)^2}=|B|^{{3}^{2}} = |B|^{9}$
$⇒|adj(adj(B))| =5^{{5}^9} = 5^{45}$

---
###### Q12) If $[A]$ is a 6X6 matrix. Also $[B]=2[A]$ and $|B|=3$. Then find the value of $|adj(adj(adj(A)))|$.

A12)  

$|B|=3$
$[B]=2[A]$
$⇒\frac{[B]}{2}=[A]$
$⇒ \frac{|B|}{2^6}=[A]$
$⇒[A]=\frac{3}{2^6}$

$|adj(adj(adj(A)))|= |A|^{(n-1)^{3}}=|A|^{(6-1)^3}=|A|^{125}$
$⇒ |adj(adj(adj(A)))|= (\frac{3}{2^6})^{125} =(\frac{3}{64})^{125}$ 

---
# References 

1. [[Determinants]]

---