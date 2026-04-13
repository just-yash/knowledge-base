
Date :  2026-04-13  
Tags :  [[DSA]]   
~ ***Yash Agrawall*** ~  

---
# Heap Tree

- Tree must be [[Complete Binary Tree]] 
- Heap is used for [[sort]] not for searching 
- Two Types : 
	- Max Heap : The value of N is greater than to the value at each of the children of N
	- Min Heap : The value at N is less than the value at any of the children of N 

---
## Insertion in Heap 

- Insert the elements in order as long as the condition for it being a heap is satisfied 
- When the condition breaks, swap the elements 


---
# Questions

---
###### Q1) A max-heap is a heap where the value of each parent is greater than or equal to the value of its children. Which of the following is a max-heap? (GATE 2011) (1 Marks)
![[Pasted image 20260413050401.png]]

A1) B 

---
###### Q2) Consider a binary max-heap implemented using an array. Which one of the following array represents a binary max-heap? (GATE 2009) (2 Marks)
###### (A) 23,17,14,6,13,10,1,12,7,5
###### (B) 23,17,14,6,13,10,1,5,7,12
###### (C) 23,17,14,7,13,10,1,5,6,12
###### (D) 23,17,14,7,13,10,1,12,5,7

A2) (C) 23,17,14,7,13,10,1,5,6,12  

---
###### Q3) Consider any array representation of an n element binary heap where the elements are stored from index 1 to index n of the array. For the element stored at index i of the array (i ≤ n) , the index of the parent is(GATE - 2001) (1 Marks) (Cognizant 2020)
###### (A) i-1
###### (B) $\empheql\lfloor \frac{i}{2} \rfloor$
###### (C) $\empheql\lceil \frac{i}{2} \rceil$
###### (D) (i+1)/2

A3) (B) $\empheql\lfloor \frac{i}{2} \rfloor$

---
###### Q4) The elements 32, 15, 20, 30, 12, 25, 16, are inserted one by one in the given order into a MaxHeap. The resultant MaxHeap is ? (GATE 2004) (1 Marks)
![[Pasted image 20260413051958.png]]

A4) a 

---
###### Q5) Consider the following array of elements.  (89,19,50,17,12,15,2,5,7,11,6,9,100)  The minimum number of interchanges needed to convert it into a max-heap is? (GATE 2015) (1 Marks)
###### (A) 4
###### (B) 5
###### (C) 2
###### (D) 3

A5) (D) 3

---
# References 

1. [YouTube Lecture](https://youtu.be/2o2vX0ZqQ_Y?si=9K-vNazbckM4A38Q)