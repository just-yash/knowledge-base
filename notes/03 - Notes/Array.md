
Type : #Note    
Date :  25-11-2025    
Tags :   [[DSA]]  ; [[C]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Array
- data structure that stores collection of homogeneous elements(same datatype) stored at contiguous memory locations and can be accessed using an index.  
- `int num[5];` → `num[0]`  `num [1]`  `num[2]`  `num[3]`  `num[4]`  
			    	     2              8              7             6             0
	- `int` → [[datatypes|datatype]] of each element in the Array 
	- `num` → [[Tokens.c#2.1 Variables|variable name]] for the `array` 
	- `[5]` → `5` is the no. of elements 
- Address of each of the elements is given by `nameOfTheVariable[n]`. `[n]` is called subscript. 
- All these variables are independent of each other, changing one doesn't change the other.
- `n >= 0` ; `n = totalElements - 1`
- Address starts with `0`. Because it basically means `num + 0`. `num` → base address
- Array stores value in a contiguous memory location making any random value accessible at anytime. 
- Array is a Static Data Structure i.e. 1st we have to define its size & then only we can use it. 
- `int x[];` → invalid : size not specified
- `int x[y];` → invalid : no. of elements cant be depicted by a variable

---
### Declaring an array in [[C]]
general format : `datatype arrayName[array size];`
```c
char letters[3] = {'a', 'b', 'c'};
float marks[4];
string names[10];  // Needs #include <string.h>
```
- In [[C]] the **default value** of the element is an array is **undefined or garbage**.   
- In some programming languages like Java, if no initial value is specified, the default value of elements of an array are set as: 0 for integers, false for booleans, null for objects   
- In cpp and c, you **cannot change the size of the array** once it has been declared.   

### How to initialize an array in C
```c
// dataType arrayName[arraySize] = {value1, value2, value3,...,valueN}
int myarray[5] = {1,2,3,4,5};
int myarray[] = {1,2,3,4,5};
```
Here we haven't specified the size, but the compiler can see that 5 elements have been initialized hence it takes 5 as the size.  

#### If not initialised? 
- it will give 0, not garbage value
```c
int x[5] = {1, 2, 5, 8};
printf("%d", x[4]);

// 0
```

```c
int x[100] = {5};
printf("%d , %d", x[0] , x[5]);

// 5 , 0
```

```c
int x[3] = {1, 2, 5, 8};
```
- [[Errors|Error]] : Too many initializers

```c
int x[4] = {1, 2, 5, 8};
printf("%d", x[4]);
```
- In [[C]] it will give Unpredictable value. Its outside of the bound of the Array. 
- In Java it will give [[Errors|Error]] : Array index out of bound exception

#### How to Initialize every element of array by 5 if array size is 100?
- using [[loop]]
```c
for (i = 0; i <= 99; i++)
x[i] = 5;
```

#### How to Input Array? 
Simplest way :
```c
int x[3];
scanf("%d %d %d", &x[0], &x[1], &x[2]);
```

Or use [[loop]] :  
```c
for (i = 0; i <= 99; i++)
scanf("%d", &x[i]);
```

#### How to Print Array?
Using [[loop]]
```c
for (i = 0; i <= 99; i++)
printf("%d", x[i]);
```

### Change value of array elements
```c
int myarray[5] = {1,2,3,4,5};
// changing value of the 3rd element:
myarray[2] = -1;
```
**Values of array elements can be changed.**  

### Advantages of Arrays  
- **Efficient storage and retrieval**:  
	- Stores in contiguous memory locations.  
	- easy to perform actions using their index, doesn't require pointers.  
	- Allows fast retrieval using indices.  
	- Suitable for handling large amounts of data.
- **Random Access(fast access):**
	- Accessing any element takes the same amount of time
	- Elements are indexed/sorted and hence can be accessed easily.
	- Operations like reading or updating an element is extremely efficient. 
- **Easy to sort and search**:
	- Easily sorted and searched using algorithms like binary search, which can be more efficient than searching through unsorted data.
- **Flexibility**:
	- can be used to represent a wide variety of data structures including stacks, queues, etc.
- **Easy to use**:
	- simple and can be understand by programmers of any skill level.
- **Values of Array Elements are changeable/alterable**:
	- Values can be changed easily by using their index
	
### Disadvantages of Arrays
- **Fixed size**: 
	- Cannot be changed once created. 
	- difficult to work with dynamic data(grow or shirk due to internal fragmentation or external fragmentation)
- **No Built-in support for insertion or deletion**
	- inserting or deleting an element → time consuming process and requires shifting all the elements after the insertion or deletion point.
- **Homogeneous elements only**
	- they can store only same type of elements
- **Poor performance for some Operations**
	- Some operations such as searching or inserting elements in a sorted array, can have poor performance as compared to other data structures like hash tables or binary search trees.

### Applications of Arrays
- **Memory Management** 
	- Efficient storage of multiple items of the same type when the size is known beforehand.
- **Data Representation** 
	- Used for vectors and matrices in mathematical operations like matrix multiplication
- **Database Management**
	- Store and manage datasets in relational databases, allowing efficient querying and updates.
- **Implementing Data structures**
	- Foundation for structures like heaps, hash tables and strings
- **Caching & Buffering** 
	- act as buffers in systems , storing data temporarily before writing to slower mediums or transmitting over networks.

### Types of Indexing in Arrays
- **0 (zero-based indexing)**: The first element of the array is indexed by subscript of 0. *Default case*
- **1 (one-based indexing)**: The first element of the array is indexed by subscript of 1. 
- **n (n-based indexing)**: the base index of an array can be freely chosen. Usually programming languages allowing n-based indexing also allow negative index values and other scalar data types like enumerations or characters may be used as an array index.

### Size of an array
- **Number of elements = (Upper bound - Lower Bound) + 1**
	- Lower bound index → index of the first element of the array 
	- Upper bound index → index of the last element of the array

- **Size = Number of elements * Size of each element in bytes**
---
# One Dimensional Array
- Address of the element at k<sup>th</sup> index
	- **a[k] = B + W * (k - Lower bound)**
		- B → Base address
		- W → size of each element
		- K → Index of the element

# Two Dimensional Array
- Array of Arrays
- 2D arrays are organized as matrices which can be represented as the collection of rows and columns.
	- Rows - Horizontal 
	- Columns - Vertical 
- ideal for representing data in a tabular format
- they allow efficient storage and retrieval of large amounts of data
- created to implement a relational database lookalike data structure. 

### How to declare and initialize 2D array?
```c
// data_type array_name[rows][columns];

int disp[2][4]={
				{10,11,12,13,},
				{14,15,16,17}
				};

// or

int disp[2][4]={10,11,12,13,14,15,16,17};
```

- even though we think the computer is storing data in 2D, but actually the computer memory is 1D. 

### Row Major Implementation of 2D array
- Default case
- In row major implementation, elements are arranged sequentially row by row. 
- Thus, elements of the first row occupies first set of memory locations reserved for the array, elements of the 2nd row occupies the next set of memory and so on.
- left to right ; top to bottom
- **Address of a [i]  [j]  = B + W * [(U<sub>2</sub> - L<sub>2</sub> + 1)(i - L<sub>1</sub> ) +(j - L<sub>2</sub>)]** 
	- B = Base address
	- W = Size of each element
	- L<sub>1</sub> = Lower bound of rows
	- U<sub>1</sub> = Upper bound of rows
	- L<sub>2</sub> = Lower bound of columns
	- U<sub>2</sub> = Upper bound of columns
	- (U<sub>2</sub> - L<sub>2</sub> + 1) = number of columns
	- (i - L<sub>1</sub>) = number of rows before us
	- (j - L<sub>2</sub>) = number of elements before us in current row
![[Pasted image 20251220231515.png]]

### Column Major Implementation of 2D array
- Elements are arranged sequentially column by column. 
- Elements of the first column occupies first set of memory locations reserved for the array, elements of the 2nd column occupies the next set of memory and so on. 
- Top to bottom ; left to right
-  **Address of a [i]  [j]  = B + W * [(U<sub>1</sub> - L<sub>1</sub> + 1)(j - L<sub>2</sub>) +(i - L<sub>1</sub> )]
	- B = Base address
	- W = Size of each element
	- L<sub>1</sub> = Lower bound of rows
	- U<sub>1</sub> = Upper bound of rows
	- L<sub>2</sub> = Lower bound of columns
	- U<sub>2</sub> = Upper bound of columns
	- (U<sub>1</sub> - L<sub>1</sub> + 1) = number of rows
	- (i - L<sub>2</sub>) = number of columns before us
	- (j - L<sub>1</sub>) = number of elements before us in current column
![[Pasted image 20251220231554.png]]
# Three Dimensional Array
- $A([L_1]...[U_1]), ([L_2]...[U_2]),([L_3]...[U_3])$
- **Location of $A[i , j , k] = B + W * [(i-L_1) (U_2-L_2+1) (U_3-L_3+1)$ 
					 $+ (j-L_2)(U_3-L_3+1)$ 
					 $+ (k-L_3]$**
![[Pasted image 20251221131206.png]]
![[Pasted image 20251221130951.png]]
# N Dimensional Array
- $A([L_1]...[U_1]), ([L_2]...[U_2]),([L_3]...[U_3]), ..... ([L_N]...[U_N])$

- **Location of $A [I, j, k, ... , x] = B + W * (i-L_1) (U_2-L_2+1) (U_3-L_3+1) (U_4-L_4+1) ... (U_n,-L_n+1)$
                                   $+ (j-L_2)(U_3-L_3+1) (U_4-L_4+1) ... (U_n-L_n+1)$
                           $+ (k-L_3)(U_4-L_4+1) ... (U_n-L_n+1)$**
                           $+$
                           $+$
                           $+$
                           $+ (x-L_n)$

# Sparse and Dense Matrix
- A matrix is considered *Sparse* if a large number of its *elements are zero*.
- A matrix is considered *Dense* if most its *elements are non-zero*.
- Advantages of using a Sparse Matrix over a regular matrix.
	- *Storage Efficiency*: As most of the elements are zero, it allows for memory conservation by only storing the non-zero elements.
	- *Computational Speed*: Operations become faster as they skip over the zero values.
![[Pasted image 20251125105504.png]]
##### Sparse Matrix Representation

### Array Representation 
- 2D array is used to represent a sparse matrix in which there are three rows names as:
	- *Row*: Index of row, where non-zero elements are located
	- *Column*: Index of Column, where non-zero element is located
	- *Value*: Value of the non-zero element located at the index(Row, Column).
![[Pasted image 20251125110245.png]]

### Linked List Representation
- In a linked list, each node has four fields. These four fields are defined as:   
	- *Row*: Index of row, where non-zero element is located
	- *Column*: Index of column, where non-zero element is located
	- *Value*: Value of the non-zero element located at index(Row, Column)
	- *Next Node*: Address of the next node
![[Pasted image 20251125110913.png]]

# Time and Space Complexity of Arrays
> (Assume static array of size n)

| Operation                               | Time Complexity        | Why / Reasoning                     |
| --------------------------------------- | ---------------------- | ----------------------------------- |
| Access (a[i])                           | O(1)                   | Direct indexing using address calc. |
| Search (Linear Search)                  | O(n)                   | Must check each element one-by-one. |
| Search (Binary Search — only if sorted) | O(log n)               | Array can be halved repeatedly.     |
| Insertion at Beginning                  | O(n)                   | Need to shift all elements right.   |
| Insertion at End                        | O(1) (if space exists) | No shifting required.               |
| Insertion at Arbitrary Position         | O(n)                   | Shift elements after the position.  |
| Deletion at Beginning                   | O(n)                   | Remaining elements must shift left. |
| Deletion at End                         | O(1)                   | No shifting required.               |
| Deletion at Arbitrary Position          | O(n)                   | All elements after must shift.      |

# Space Complexity
- Array storage → **O(n)**
- No extra pointer fields → **more space efficient than linked list.**

---
# Summary 

| **Array**                                                             | **Formulas**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Number of elements**                                                | (Upper bound - Lower Bound) + 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Size**                                                              | Number of elements * Size of each element in bytes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **1D array - address of kth element**                                 | a[k] = B + W * (k - Lower bound)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **2D Array - Address of a [i]  [j]<br>(Row Major Implementation)**    | a [i]  [j] = B + W * [(U<sub>2</sub> - L<sub>2</sub> + 1)(i - L<sub>1</sub> ) +(j - L<sub>2</sub>)] <br>- B = Base address<br>- W = Size of each element<br>- L<sub>1</sub> = Lower bound of rows<br>- U<sub>1</sub> = Upper bound of rows<br>- L<sub>2</sub> = Lower bound of columns<br>- U<sub>2</sub> = Upper bound of columns<br>- (U<sub>2</sub> - L<sub>2</sub> + 1) = number of columns<br>- (i - L<sub>1</sub>) = number of rows before us<br>- (j - L<sub>2</sub>) = number of elements before us in current row   |
| **2D Array - Address of a [i]  [j]<br>(Column Major Implementation)** | a [i]  [j] = B + W * [(U<sub>1</sub> - L<sub>1</sub> + 1)(j - L<sub>2</sub>) +(i - L<sub>1</sub> )]<br>- B = Base address<br>- W = Size of each element<br>- L<sub>1</sub> = Lower bound of rows<br>- U<sub>1</sub> = Upper bound of rows<br>- L<sub>2</sub> = Lower bound of columns<br>- U<sub>2</sub> = Upper bound of columns<br>- (U<sub>1</sub> - L<sub>1</sub> + 1) = number of rows<br>- (i - L<sub>2</sub>) = number of columns before us<br>- (j - L<sub>1</sub>) = number of elements before us in current column |
| **3D Array - Location of A[i , j , k]**                               | B + W * [(i-L<sub>1</sub>) (U<sub>2</sub>-L<sub>2</sub>+1) (U<sub>3</sub>-L<sub>3</sub>+1) <br>		  + (j-L<sub>2</sub>)(U<sub>3</sub>-L<sub>3</sub>+1) <br>		  + (k-L<sub>3</sub>)]                                                                                                                                                                                                                                                                                                                                           |
| **ND Array - Location of A [I, j, k, ---- , x]**                      | B + W * (i-L<sub>1</sub>) (U<sub>2</sub>-L<sub>2</sub>+1) (U<sub>3</sub>-L<sub>3</sub>+1) (U<sub>4</sub>-L<sub>4</sub>+1) ---- (U<sub>n</sub>,-L<sub>n</sub>+1)<br>          + (j-L<sub>2</sub>)(U<sub>3</sub>-L<sub>3</sub>+1) (U<sub>4</sub>-L<sub>4</sub>+1) ---- (U<sub>n</sub>-L<sub>n</sub>+1)<br>          + (k-L<sub>3</sub>)(U<sub>4</sub>-L<sub>4</sub>+1) ---- (U<sub>n</sub>-L<sub>n</sub>+1)<br>          +<br>          +<br>          + <br>          + (x-L<sub>n</sub>)                                     |
| **Access (a[i])**                                                     | O(1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Search (Linear Search)**                                            | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Search (Binary Search — only if sorted)**                           | O(log n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Insertion at Beginning**                                            | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Insertion at End**                                                  | O(1) (if space exists)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Insertion at Arbitrary Position**                                   | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Deletion at Beginning**                                             | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Deletion at End**                                                   | O(1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Deletion at Arbitrary Position**                                    | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Space Complexity**                                                  | O(n)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |




---
# Questions

###### <span style="color:rgb(0, 176, 240)">Q1)</span> Let the base address of the first element of the array is 250 and each element of the array occupies 3 bytes in the memory, then address of the fifth element of a one- dimensional array a[10] ?
<span style="color:rgb(0, 176, 240)">A1)</span>  
B = 250  
W = 3 Bytes  
k = 4  
<mark>a[k] = B + W * (k - Lower bound)</mark>  <br>a[4] = 250 + 3 * (4 - 0)  <br>a[4] = 250 + 3 * (4 - 0)  
<span style="color:rgb(146, 208, 80)">a[4] = 262</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q2)</span> An array has been declared as follows A: array [-6 --- 6] of elements where every element takes 4 bytes, if the base address of the array is 3500 find the address of array[0]?
<span style="color:rgb(0, 176, 240)">A2)</span> 
B = 3500  
Lower Bound = -6 ; Upper Bound = 6  
W = 4 Bytes  
k = 0  
<mark>a[k] = B + W * (k - Lower bound)</mark>  <br>a[0] = 3500 + 4 * (0 - (-6))<br>a[0] = 3500 + 4 * (0 + 6)  <br>a[0] = 3500 + 24
<span style="color:rgb(146, 208, 80)">a[0] = 3524</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q3)</span> A program P reads in 500 integers in the range [0 ... 100] experimenting the scores of 500 students. It then prints the frequency of each score above 50. What would be the best way for P to store the frequencies? <span style="color:rgb(255, 192, 0)">(GATE - 2005 - 2 Marks)[Asked in Cognizant 2016]</span>
###### (A) An array of 50 numbers

###### (B) An array of 100 numbers

###### (C) An array of 500 numbers

###### (D) A dynamically allocated array of 550 numbers

<span style="color:rgb(0, 176, 240)">A3)</span>  <span style="color:rgb(146, 208, 80)">(A) An array of 50 numbers</span>   
Its storing the frequencies of students marks wise, and above 50 there are only 50 marks possible.   

---
###### <span style="color:rgb(0, 176, 240)">Q4)</span> Let A be a two dimensional array declared as follows: A: array [1 ... 10]  [1 ... 15] of integer; Assuming that each integer takes one memory location, the array is stored in row-major order and the first element of the array is stored at location 100, what is the address of the element a  [i]  [j] ? <span style="color:rgb(255, 192, 0)">(Gate-1998) (2 Marks)</span>

###### (A) 15i + j + 84

###### (B) 15j + i + 84

###### (C) 10i + j  +89

###### (D) 10j + i + 89

<span style="color:rgb(0, 176, 240)">A4)</span>  <span style="color:rgb(146, 208, 80)">(A) 15i + j + 84</span>  
W = 1  
L<sub>1</sub> = 1 ; U<sub>1</sub> = 10  
L<sub>2</sub> = 1 ; U<sub>2</sub> = 15  
B = 100  
<mark>a[i]  [j] = B + W * [(U<sub>2</sub> - L<sub>2</sub> + 1)(i - L<sub>1</sub> ) +(j - L<sub>2</sub>)] </mark>  
a[i]  [j] = 100 + 1 * [(15 - 1 + 1)(i - 1 ) +(j - 1)]   
a[i]  [j] = 100 + 1 * [15i - 16 +j]   
a[i]  [j] = 100 + 15i - 16 +j  
a[i]  [j] = 15i + j + 84  

---
###### <span style="color:rgb(0, 176, 240)">Q5)</span> An array VAL[1 ... 15]  [1 ... 10] is stored in the memory with each element requiring 4 bytes of storage. If the base address of the array VAL is 1500, determine the location of VAL [12]  [9] when the array VAL is stored  (i) Row wise   (ii) Column wise.
<span style="color:rgb(0, 176, 240)">A5)</span>
W = 4 Bytes  
L<sub>1</sub> = 1 ; U<sub>1</sub> = 15  
L<sub>2</sub> = 1 ; U<sub>2</sub> = 10  
B = 1500  
i = 12 ; j = 9  
(i) Row wise: <mark>a [i]  [j] = B + W * [(U<sub>2</sub> - L<sub>2</sub> + 1)(i - L<sub>1</sub> ) +(j - L<sub>2</sub>)]</mark>  
a [12]  [9] = 1500 + 4 * [(10 - 1 + 1)(12 - 1 ) +(9 - 1)]  
a [12]  [9] = 1500 + 4 * 118  
a [12]  [9] = 1500 + 472   
<span style="color:rgb(146, 208, 80)">a [12]  [9] = 1972</span>  
(ii) Column wise: <mark>a [i]  [j] = B + W * [(U<sub>1</sub> - L<sub>1</sub> + 1)(j - L<sub>2</sub>) +(i - L<sub>1</sub> )]</mark>  
a [12]  [9] = 1500 + 4 * [(9 - 1)(15 - 1 +1) +(12 - 1)]  
a [12]  [9] = 1500 + 4 * 131  
a [12]  [9] = 1500 + 524  
<span style="color:rgb(146, 208, 80)">a [12]  [9] = 2024</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q6</span><span style="color:rgb(0, 176, 240)">)</span>  Two matrices M1 and M2 are to be stored in arrays A and B respectively. Each array can be stored either in row-major or column-major order in contiguous memory locations. The time complexity of an algorithm to compute M1 × M2 will be ? <span style="color:rgb(255, 192, 0)">(Gate-2004) (2 Marks)</span>

###### (A) best if A is in row-major, and B is in column- major order

###### (B) best if both are in row-major order

###### (C) best if both are in column-major order

###### (D) independent of the storage scheme

<span style="color:rgb(0, 176, 240)">A6)</span>  <span style="color:rgb(146, 208, 80)">(D) independent of the storage scheme</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q7)</span> An n x n array v is defined as follows: v[i, j] = i-j for all i, j, 1 <= i <= n, 1 <= j <= n. The sum of the elements of the array v is ? <span style="color:rgb(0, 176, 240)"><span style="color:rgb(255, 192, 0)">(Gate-2000) (1 Marks)</span></span>

###### (A) 0

###### (B) n-1

###### (C) n2 -3n + 2

###### (D) n2 (n+1)/2

<span style="color:rgb(0, 176, 240)">A7)</span>  <span style="color:rgb(146, 208, 80)">(A) 0</span>  

---
###### <span style="color:rgb(0, 176, 240)">Q8)</span> A Young tableau is a 2D array of integers increasing from left to right and from top to bottom. Any unfilled entries are marked with ∞, and hence there cannot be any entry to the right of, or below a ∞. The following Young tableau consists of unique entries <span style="color:rgb(255, 192, 0)">(GATE - 2015) (2 Marks)</span>

###### 1       2       5       14
###### 3       4       6       23
###### 10     12      18      25
###### 31      ∞      ∞       ∞

###### When an element is removed from a Young tableau, other elements should be moved into its place so that the resulting table is still a Young tableau (unfilled entries may be filled in with a ∞). The minimum number of entries (other than 1) to be shifted, to remove 1 from the given Young tableau is ___ .

###### (A) 2
###### (B) 5
###### (C) 6
###### (D) 18

<span style="color:rgb(0, 176, 240)">A8)</span> <span style="color:rgb(146, 208, 80)">(B) 5</span>  
2       4       5     14  
3       6      18     23  
10    12     25     ∞  
31    ∞      ∞      ∞  

---
###### <span style="color:rgb(0, 176, 240)">Q9)</span> Let A be a square matrix of size n x n. Consider the following program. What is the expected output? <span style="color:rgb(255, 192, 0)">(GATE - 2014)(1 Marks)  [Asked in Hexaware 2017]    [Asked in Accenture]</span>

```C
C = 100
for i = 1 to n do
{
	for j = 1 to n do
	{
		Temp = A[i]lj] + C
		A[i]lj] = Alj][i]
		A[j][i] = Temp - C
	}
}
for i = 1 to n do
	for j = 1 to n do
		Output(A[i][j]);
```
###### (A) The matrix A itself
###### (B) Transpose of matrix A
###### (C) Adding 100 to the upper diagonal elements and subtracting 100 from diagonal elements of A
###### (D) None of the above

<span style="color:rgb(0, 176, 240)">A9)</span>  <span style="color:rgb(146, 208, 80)">(A) The matrix A itself</span>  
its in loop, so we swap twice. once for i then for j.   

---
###### <span style="color:rgb(0, 176, 240)">Q10)</span> Suppose you are given an array s[1 .. n] and a procedure reverse (s, i, j) which reverses the order of elements in a between positions i and j (both inclusive). What does the following sequence do? <span style="color:rgb(255, 192, 0)">(GATE - 2014) (1 Marks)</span>
###### where 1 <= k < n:
###### reverse(s, 1, k) ;
###### reverse(s, k + 1, n);
###### reverse(s, 1, n);

###### (A) Rotates s left by k positions

###### (B) Leaves s unchanged

###### (C) Reverses all elements of s

###### (D) None of the above

<span style="color:rgb(0, 176, 240)">A10)</span> <span style="color:rgb(146, 208, 80)">(A) Rotates s left by k positions</span>  

---
###### Q11) WAP to input array of 10 integers & print it in reverse order: 

A11)
```c
#include <stdio.h>

int main(){
	int x[10], i;
	for (i = 0, i <= 9; i++)
	scanf("%d", &x[i]);
	for (i = 9; i >= 0; i--)
	printf("%d ", x[i]);
	return 0;
}
```

---
###### Q12) WAP to find greatest of 100 numbers

A12)
```c
#include <stdio.h>
 
int main(){
    int x[100], i, n = x[0];
    for (i = 0; i <= 99; i++){
    scanf("%d", &x[i]);
    n = x[i] >= n ? x[i] : n;
    }
    printf("%d", n);
}
```

---
###### Q13) WAP to input +ve integers & convert it into binary using arrays

A13) 
```c
#include <stdio.h>
unsigned int main(){
	int x, y[16], i = 0;
	scanf("%d", &x);
	while (x != 0){
	y[i] = x % 2; x/=2;i++;}
	for (i = 15; i >= 0 ; i--)
	printf("%d", y[i]);
}
```

---









---
# References 
1. [[Data Structures Basics]]
2. [Array YouTube Lecture](https://youtu.be/MdG0Vw9f1A4?si=pI_oCXmICYYePm9n&t=1334)
3. [Data Structures Notes PDF](ds_gate.pdf)