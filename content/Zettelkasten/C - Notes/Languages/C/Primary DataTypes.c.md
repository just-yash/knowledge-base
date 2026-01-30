
Date :  2026-01-29
Tags :   [[Language]] ; [[C]]
~ ***Yash Agrawall*** ~

---
# Primary DataTypes.c

## Integer → int
For Turbo C Compiler → memory allocation of 2 bytes 
1 byte = 8 bits ⇒ 2 bytes = 16 bits

|       1       |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  | 16  |
|:-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| MSB(Sign Bit) |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |

- the 1st bit is called MSB (Most Significant Bit) → Sign Bit (0 → +ve ; 1 → -ve)
- the other 15 bits store the value.
- largest No. = 2<sup>15</sup> - 1 = 32767
- smallest No.  = -32768 
so for $n$ $bits$ range is $-2^{n-1}$ to $2^{n-1}-1$

> -ve No. are stored in 2's Compliment Notation
### What if any no. outside this range is given?
It will store the no. but not as what you entered 
- Bound checking is not present in C Language. 
	- Making it efficient but error prone.  
  
No. are stored in this format → 
![[Pasted image 20260129211512.png]]
so
if you enter `x = 32768` → it will store `x = -32768`
if you enter `x = 32769` → it will store `x = -32767`
and so on...

Similarly
if you enter `x = -32769` → it will store `x = 32767`
if you enter `x = -32770` → it will store `x = 32766`
and so on...




---
# Questions




---
# Summary 





---
# References 

