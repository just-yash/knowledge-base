
Type : #Note    
Date :  2026-01-19    
Tags :   [[Maths]]    
Status : #complete     
~ ***Yash Agrawall*** ~     

---
# Determinants

- **Determinant** can be calculated only for **square matrices**
- For $n$ x $n$ determinant the *maximum no. of terms* after expansion = $n!$
- Determinant is represented using | A | <sub>3 x 3</sub> 
	- This doesn't mean that determinant is always positive. Determinant can be anything.

| Δ = \| $A$ \| = \| $a$<sub> i j </sub>\| <sub>n x n</sub> <br> | i → row ; 1 ≤ i ≤ n<br>j → column ; 1 ≤ j ≤ n |
| -------------------------------------------------------------- | --------------------------------------------- |
- Singular Matrix → Matrix whose determinant is 0

---
## Methods of Calculating Determinant (works for square matrix of any order)

### Trick 1 : Diagonal Matrix Determinant
- if the non-diagonal elements of the matrix are zero, then the determinant is the multiplication of each of the diagonal element.
![[Pasted image 20260109182127.png]]
- If a diagonal element in a diagonal matrix is 0, then the determinant of the matrix is 0.

---
### Trick 2 : Upper Triangular and Lower Triangular Matrix Determinant
- If the Elements below the diagonal are all zero, then the determinant of that matrix is the multiplication if each of the diagonal elements. 
**Upper Triangular:**
![[Pasted image 20260109183208.png]]
**Lower Triangular:**
![[Pasted image 20260109192929.png]]

---
### Trick 3 : Shortcut of Calculation of any 3 x 3 matrix determinant(Rule of Sarrus):

- Only valid for a 3 x 3 matrix ; do not apply it in any other matrix.

Consider a 3 × 3 matrix:

![[Pasted image 20260109194756.png]]

#### Step 1: Extend the matrix

Rewrite the **first two columns** to the **right** of the matrix.

![[Pasted image 20260109194917.png]]
#### Step 2: Add the downward diagonal products

Multiply the elements along the three diagonals going **top-left to bottom-right**, and **add** them:
![[Pasted image 20260109195646.png]]
                         $(aei)+(bfg)+(cdh)$

#### Step 3: Add the upward diagonal products

Multiply the elements along the three diagonals going **bottom-left to top-right**, and **add** them:
![[Pasted image 20260109195751.png]]
                         $(gec)+(hfa)+(idb)$
#### Step 4: Subtract

Subtract the second sum from the first:

- Determinant= $(aei+bfg+cdh)−(gec+hfa+idb)$

---
## Rotation of Element:
![[Pasted image 20260109204303.png]]

---
# Minor
Ignore all the element in row i and column j. Find the determinant of the remaining sub-matrix. 
Representation:   $M$ <sub>i j </sub> 

in other words : Calculating the determinant of a square sub-matrix
Total No. of possible Square Sub Matrix of order $r =$  $^mC_r$ $×$ $^nC_r$

---
# Co-Factor
Co-Factor of  $a$<sub> i j </sub> = $A$ <sub>i j </sub> = (-1) <sup>i + j</sup> x $M$ <sub>i j </sub>  

---
# Adjoint of a Matrix
- $adj(A) =$ transpose of the co-factor matrix

### Properties of Adjoint of a Matrix 
- $adj(A) = |A|[A]^{-1}$
- $[A]adj(A) = |A|[I]$
- $adj(adj(A))= |A|^{n-2}[A]$

- $|adj(A)|=|A|^{n-1}$
- $|adj(adj(A))|=|A|^{(n-1)^{2}}$
- $|adj(adj(adj(A)))|= |A|^{(n-1)^{3}}$

---
### Shortcut to calculate adj of a 2X2 matrix
$adj(A)_{2*2}$ → interchange diagonal elements and reverse the sign of non-diagonal elements

$$A=\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}$$
$$adj(A) = \begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}$$
---
### Shortcut to Calculate adj of a 3X3 matrix
$$A = \begin{bmatrix}
a & b & c \\
d & e & f \\
g & h & i
\end{bmatrix}$$

**Step 1** : Rewrite the 1st and the 2nd column as it is at the end turning the matrix into to a 3X5 matrix. $$\begin{bmatrix}
a & b & c & a & b \\
d & e & f & d & e \\
g & h & i & g & h
\end{bmatrix}$$
**Step 2** : Rewrite the 1st and the 2nd row of this matrix as it is at the end turning the matrix into a 5X5 matrix. 
$$\begin{bmatrix}
a & b & c & a & b \\
d & e & f & d & e \\
g & h & i & g & h \\
a & b & c & a & b \\
d & e & f & d & e
\end{bmatrix}$$
**Step 3** : Eliminate the 1st row and column of this new formed matrix turning it into a 4X4 matrix.$$\begin{bmatrix}
e & f & d & e \\
h & i & g & h \\
b & c & a & b \\
e & f & d & e
\end{bmatrix}$$
**Step 4** : Calculate the determinant of each possible 2X2 submatrix row-wise, but write the results column-wise (as in adj we take transpose of co-factors)
$$adj(A)=\begin{bmatrix}
(ei - fh) & (fg - id) & (dh-ge) \\
(hc-ib) & (ia-cg) & (gb-ah) \\
(bf-ec) & (cd-fa) & (ae-bd)
\end{bmatrix}$$
**Step 5** : This new formed matrix is the adjoint of the initial matrix.

---
# Inverse of a Matrix
A square matrix $A$ has an **inverse** if there exists a matrix $A$<sup>-1</sup> such that
                                                $AA$<sup>-1</sup>$=A$<sup>-1</sup>$A=I$
$I$ → Identity Matrix

Inverse of a matrix exists iff det(A) ≠ 0
- non-singular or invertible matrix

>Why so?
>>if Δ = 0 ⇒ rows or columns are linearly dependent ⇒ information was squashed and it cant be un-squashed.

Formula: $A^{-1} = \frac{1}{\det(A)}\,\operatorname{adj}(A)$

> For calculating the inverse of a 2 X 2 or 3 X 3 matrix, We can use their respective shortcuts to calculate the adjoint part.

---
## Gauss-Jordan Elimination
You **force** a matrix $A$ to become the identity matrix $I$ using row operations, and whatever happens to $I$ during that process becomes $A^{-1}$.

Allowed row operations:
- Swap two rows
- Multiply a row by a nonzero constant
- Add a multiple of one row to another
 
 Eg:![[Pasted image 20260109225451.png]]

---
## Properties of Inverse Matrix
- $(AB)^{-1}=B^{-1}A^{-1}$
- $(A^{T})^{-1}=((A)^{-1})^{T}$
- $(A^{*})^{-1}=(A^{-1})^{*}$
- $(A^{-1})^{-1}=A$

---
# Properties of Determinant

1. If 2 rows or 2 columns of a matrix are identical / proportional then Δ of the matrix = 0.
2. If 2 rows or 2 columns of a matrix have linear dependency.
	-  One row = sum of two other rows
	- One row = constant × another row
	- Rows differ by a constant vector
3. If a matrix has any row or column with all elements 0, then Δ = 0.
4. If two rows or two columns of a matrix are inter changed, then sign of Δ changes. 
	- So if two rows are interchanged then two columns are interchanged, the sign of the Δ remains unchanged.
	- If an even number of row (or column) interchanges are performed, the determinant remains unchanged; if an odd number of interchanges are performed, the sign of the determinant changes.
5. $|A|=|A^{T}|$
6. $|A^{−1}|=\frac{1}{|A|}$    ​$(if$  $|A| ≠ 0)$
7. Multiplication of a constant K to any 1 row or column → multiply K to its Δ . 
8. $[KA]_{n*n}=K[A]_{n*n}$ → $K^{n}|A|$  
![[Pasted image 20260109232036.png]]
9. If some or all the elements of a row or column of a Δ are expressed as sum of two (or more) terms then the determinant can be expressed as sum of two (or more) Δ.
![[Pasted image 20260109233729.png]]

10. if in a determinant
	- the row or column you are changing, it's term's coefficient should be 1.
	- apply these operations, one by one ; don't apply it in various rows or columns in one go.
	- If doing the operations simultaneously; do not take that changing row or column to change the other rows and columns.
	- Changing a row and a column simultaneously is not valid.

| $R_{i}$ → $R_{i}+KR_{j}$<br><br> $C_{i}$ → $C_{i}+KC_{j}$ | <br>no change in Δ |
| --------------------------------------------------------- | ------------------ |

---

# Determinant of a 4 X 4 matrix

> For any kind of Square Matrix first look if the determinant is zero(proportional rows or columns , one entire row or column is zero). If not then proceed.

### Method 1 : Cofactor (Laplace) Expansion
For a given 4 X 4 matrix A = $[a_{ij}]$

		$det(A) = ∑_{j=1}^{4}a_{ij}C{ij}$
		
where,

	$C_{ij} = (-1)^{i+j}det(M_{ij})$
$M_{ij}$ → minor formed by deleting row $i$ and column $j$.

> Expand along a row or column with maximum zeros. Every zero deleted a whole 3 X 3 determinant from existence.
> You may use Gauss-Jordan Elimination for this. Then you can solve the 3X3 $M_{ij}$ using Sarrus

---
### Method 2 : Row/Column Operations
- Use Gauss-Jordan Elimination to turn the matrix into Upper Triangular or Lower Triangular Matrix.
- Once it is triangular:
	$det(A) = (product$ $of$ $diagonal$ $elements)$

---
# Questions

[[Determinants Qs]]



---
# Summary 
![[Pasted image 20260119194011.png]]




---
# References 

1. [Determinants YouTube Lecture](https://www.youtube.com/live/b-UZJVdLbXc?si=6rdFg1JKYH734WfN)
