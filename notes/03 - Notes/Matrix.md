
Type : #Note    
Date :  2026-01-09    
Tags :   [[Maths]]    
Status : #complete     
~ ***Yash Agrawall***~     

---
# Matrix

- **Square Matrix**: no. of rows = no. of columns
- **Rectangular Matrix**: no. of rows ≠ no. of columns

- Multiplication of a constant K with a matrix → multiply K to each and every element of the matrix
## Important Types

- ### Row & Column Matrix
	- **Row Matrix** : 1 Row ; Multiple Columns 
$$
\begin{bmatrix}
1 & -3 & 4
\end{bmatrix}
$$
	-  **Column Matrix** : 1 Column ; Multiple Rows
$$
\begin{bmatrix}
1 \\
-3 \\
4
\end{bmatrix}
$$
---
- ### Null Matrix or Zero Matrix
	- It should be square matrix
	- All the elements must be 0
$$
\begin{bmatrix}
0 & 0 & 0 \\
0 & 0 & 0 \\
0 & 0 & 0
\end{bmatrix}_{3*3}
$$$$
\begin{bmatrix}
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}_{4*4}
$$
---
- ### Diagonal Matrix
	- Non-diagonal elements are zero. 
	- Principle Diagonal Elements can be 0, but not all 0.
	- $a_{ij}= 0$   for   $i ≠ j$
$$diag(1 , -3, 4)=\begin{bmatrix}
1 & 0 & 0 \\
0 & -3 & 0 \\
0 & 0 & 4
\end{bmatrix}$$
---
- ### Upper Triangular & Lower Triangular Matrix
	- **Upper Triangular** : ^5cfafd
		- it must be a square matrix
		- Elements below the diagonal are all 0
		- Rest → not all 0
		- $a_{ij}= 0$   for   $i > j$
	$$\begin{bmatrix}
1 & -3 & 4 \\
0 & 7 & 0 \\
0 & 0 & 8
\end{bmatrix}$$

	- **Lower Triangular** :
		- it must be a square matrix
		- Elements above the diagonal are all 0
		- Rest → not all 0
		- $a_{ij}= 0$   for   $i < j$
$$\begin{bmatrix}
1 & 0 & 0 \\
-3 & 7 & 0 \\
4 & 0 & 8
\end{bmatrix}$$
---
- ### Identity Matrix
	- It must be a square matrix
	- Diagonal matrix with diagonal elements = 1
	- $[ I ] =[a_{ij}]_{m*n}=$
		- $1$ ; $i = j$
		- $0$ ; $i ≠ j$
	- Symbol → $I=[I]_{n*n}$
	- Properties
		- $[I_{n}][I_{n}][I_{n}][I_{n}]...[I_{n}]=[I_{n}]$
		- $[I_{n}]^{-1}=[I_{n}]$
		- $[A][I_{n}]=[A]$
$$\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}$$
---
- ### Scaler Matrix
	- It's a square matrix
	- Diagonal Matrix with Diagonal Element = K
	- $[A]=[a_{ij}]_{m*n}=$
		- $K$  ;  $i=j$
		- $0$   ;  $i ≠ j$
	- $[A]=K[I]=[KI]$ 
	- $|A|=K^{n}|I|=K^{n}$ 
$$2[I]=\begin{bmatrix}
2 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 2
\end{bmatrix}$$
---
- ### Sub Matrix
	- Creating smaller matrices out of a bigger matrix
![[Pasted image 20260120004114.png]]
Total No. of possible Square Sub Matrix of order $r =$  $^mC_r$ $×$ $^nC_r$

---
- ### Equal Matrix
	- $[a_{ij}]_{m*n}=[b_{ij}]_{m*n}$ → Respective Elements must be equal.

---
# Addition of Two Matrices
- Order should be same
- Simply Add respective elements
#### Case 1 : $[A]_{m*n}+[B]_{m*n}$ : RECTANGULAR
#### Case 2 : $[A]_{n*n}+[B]_{n*n}$ : SQUARE

### Properties of Addition of Matrices
1. $[A]_{m*n}-[B]_{m*n}=[A]_{m*n}+[-B]_{m*n}$
2. Commutative : $[A]+[B]=[B]+[A]$
3. Associative : $([A] + [B])+[C]=[A]+([B]+[C])$
4. Cancellation : $[A]+[B]=[A]+[C] ⇒ [B] = [C]$
5. $[A]+[0]=[A]$
6. If $[C] = [A]+[B]$  , this doesn't mean $|C| ≠ |A| + |B|$
	or $\det(A)+\det(B) ≠ \det(A+B)$ 

---
# Multiplication of Matrices 
- $A$<sub>mxn</sub> $B$<sub>nxp</sub> $=C$<sub>mxp</sub> 
- Number of Columns in $A$ = Number of Rows in $B$
- If $AB$ is possible then $BA$ may or may not be possible. For this $A$ & $B$ may or may not be square matrices. 
	- Eg: $AB$ and $BA$ exist for $A_{3*4}$ & $B_{4*3}$
- To multiply two matrices, each element of the product matrix is obtained by **taking the dot product of a row of the first matrix with a column of the second matrix**.
- Specifically, the element in the $i^{th}$ row and $j^{th}$ column of the product matrix is obtained by **multiplying the corresponding elements of row $i$ of the first matrix with column $j$ of the second matrix and then adding the results**.
$$C_{ij} = ∑_{k=1}^{n}a_{ik}b_{kj}$$
### Properties of Multiplication of Matrices
1. Total no. of scalar multiplication required in multiplication of two matrix = m * n * p
2. Total no. of scalar addition required in multiplication of two matrix = m * (n-1) * p
3. Not Commutative in general: $AB ≠BA$  
4. Associative : $A(BC)=(AB)C$
5. Distributive : $A*(B+C)= AB+AC$
6. $[A]*[0]=[0]$
7. $A*I=I*A=A$
8. if $A*B = [0]$
	Case 1: $A=0$ ; $B=0$
	Case 2: $A ≠ 0$ ; $B = 0$ 
	Case 3: $A = 0$ ; $B ≠ 0$
	Case 4: $A ≠ 0$ ; $B ≠ 0$
	- iff $A^{-1}$ and $B^{-1}$ do not exist ⇔ $|A|=|B|=0$ ⇔ $A$ & $B$ are singular matrices
	- This is because if we multiple either with there inverse, the other one is coming out to be NULL. But they are not NULL ⇒ inverse doesn't exit ⇒ Δ = 0 … Hence both are Singular Matrices
---
# Transpose
- Interchanging the elements of rows and columns of a matrix gives the transpose of the matrix.
![[Pasted image 20260109211905.png]]

Representation: $A'$ = $A$<sup>T</sup>

---
# Conjugate

- Each element is replaced by its complex conjugate. Positions do **not** change.
$$
A = \begin{bmatrix}
1+i & 2 \\
3 & 4-i
\end{bmatrix}
$$

$$
\overline{A} = \begin{bmatrix}
1 - i & 2 \\
3 & 4 + i
\end{bmatrix}
$$
---
# Hermitian Transpose / Transpose Conjugate → Transjugate

- Combining Conjugate and Transpose.
Representation = $A$* = $A$<sup>H</sup> =  $\overline{A}$ <sup>T</sup> = $A^ θ$
$$\overline{A} = \begin{bmatrix}
1 - i & 3 \\
2 & 4 + i
\end{bmatrix}$$
---
# Symmetric Matrix  

- Square Matrix  
- $[A]=[A]^T$  
	- ${[A]-[A]^{T} = [0]}$  
- $a_{ij} = a_{ji}$  
- diagonal elements can be anything  

$$\begin{bmatrix}
a & b & c \\
b & e & d \\
c & d & f
\end{bmatrix}$$
- Eg : if all elements are same, identity, scalar matrix  

- Null Matrix is both Symmetric as well as Skew-Symmetric  
### Properties of Symmetric Matrix  
- If $A$ & $B$ are two Symmetric matrix and $AB=[0]$ then :   
	Case 1: $A=0$ ; $B=0$  
	Case 2: $A ≠ 0$ ; $B = 0$   
	Case 3: $A = 0$ ; $B ≠ 0$  
	Case 4: $A ≠ 0$ ; $B ≠ 0$ → $A$ & $B$ are singular matrices  
	- This is because if we multiple either with there inverse, the other one is coming out to be NULL. But they are not NULL ⇒ inverse doesn't exit ⇒ Δ = 0 … Hence both are Singular Matrices  

---
# Skew-Symmetric Matrix 

-  Square Matrix  
- $[A]=-[A]^{T}$  
	- $[A]+[A]^{T}=[0]$  
- $[A]=[a_{ij}]_{n*n}=$  
	- 0  ;   i = j   ; All diagonal elements are 0.   
	- $a_{ij}=-a_{ji}$  ;  i ≠ j  
$$
\begin{bmatrix}
0 & a & b \\
-a & 0 & -c \\
-b & c & 0
\end{bmatrix}
$$
### Properties of a Skew Symmetric Matrix  
- $∑a_{ij} = 0$  → sum of all elements = 0  
- if n is odd → Δ = 0 → singular matrix  
- if n is even → Δ may or may not be 0  
- if a skew-symmetric matrix is multiplied even no. of times it will become a symmetric matrix  
- if a skew-symmetric matrix is multiplied odd no. of times it will again become a skew-symmetric matrix  

### One of the possible skew-symmetric matrix  

- $a_{ij}=i^m-j^m$ : $1 ≤ m ≤ ∞$   

---
# Every Matrix is a sum of a symmetric and skew-symmetric Matrix  

$$
A=\frac{A+A^T}{2}+\frac{A-A^T}{2}
$$  
$$
Symmetric → \frac{A+A^T}{2}
$$  
$$
Skew-Symmetric →\frac{A-A^T}{2}
$$  
 ---
# Orthogonal Matrix  
- Square Matrix  
- $A^T=A^{-1}$  
- $AA^T=A^TA=I$  
- $|A|= ± 1$  
### Properties of a Orthogonal Matrix
The following conditions should be simultaneously true in a matrix to be Orthogonal.   

1. Sum of squares of elements of each row or each column is 1  
	- Every row/column is a unit vector  
2. Dot product of any two distinct rows or any two distinct columns is 0.  

Eg : $$A=\begin{bmatrix}
a_1 & a_2 & a_3 \\
b_1 & b_2 & b_3 \\
c_1 & c_2 & c_3
\end{bmatrix}$$
If $A$ is Orthogonal then → 

| $a_1^2+a_2^2+a_3^2=1$<br>$b_1^2+b_2^2+b_3^2=1$<br>$c_1^2+c_2^2+c_3^2=1$<br><br>$a_1^2+b_1^2+c_1^2=1$<br>$a_2^2+b_2^2+c_2^2=1$<br>$a_3^2+b_3^2+c_3^2=1$ | $a_1b_1+a_2b_2+a_3b_3=0$<br>$b_1c_1+b_2c_2+b_3c_3=0$<br>$a_1c_1+a_2c_2+a_3c_3=0$<br><br>$a_1a_2+b_1b_2+c_1c_2=0$<br>$a_2a_3+b_2b_3+c_2c_3=0$<br>$a_1a_3+b_1b_3+c_1c_3=0$ |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

---
## 🔗 Connections

- Affine transform in face alignment is matrix multiplication → [[Face Alignment]]
- Hypersphere normalization in ArcFace uses matrix operations → [[ArcFace]]
- Orthogonal matrices appear in image rotation/transformation → [[Coordinate Geometry]]

---
# Questions

[[Matrix Qs]]

---
# References 

1. [Matrix YouTube Lecture](https://www.youtube.com/live/b-UZJVdLbXc?si=3kAntlfVJPuxgaXu&t=426)
