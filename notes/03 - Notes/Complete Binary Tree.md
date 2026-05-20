
Type : #Note    
Date :  2026-04-13  
Tags :  [[DSA]]  
Status : #complete     
~ ***Yash Agrawall*** ~  


---
# Complete Binary Tree 

- The maximum no. of nodes at height h is 2<sup>h</sup> nodes 
- Fill left to right, you cant miss any nodes in between or jump levels
- A [[Binary Tree]] is said to be complete, if all its level except possibly the last have the maximum no. of nodes and if all the nodes at the last level appear as far left as possible
![[Pasted image 20260413035629.png]]
- Indexing in Complete Binary Tree starts from 1 not 0
- Left child of the node K are at 2 × K index 
- Right child of the node K are at 2 × K + 1 index 
- The parent of K is lower bound (K/2)
- Easiest way to implement this is [[Array]]


---
# Questions

---
###### Q1) Let LASTPOST, LASTIN and LASTPRE denote the last vertex visited in a post order, inorder and preorder traversal, respectively of a complete binary tree. Which of the following is always true? (GATE 2000) (1 Mark)
###### a) LASTIN = LASTPOST
###### b) LASTIN = LASTPRE 
###### c) LASTPRE = LASTPOST 
###### d) NOTA

 A1)  d) NOTA  

---
###### Q2) A scheme for storing binary trees in an array $X$ is as follows. Indexing of $X$ starts at 1 instead of 0. the root is stored at $X[1]$. For a node stored at $X[i]$, the left child, if any, is stored in $X[2i]$ and the right child, if any, in $X[2i+1]$. To be able to store any binary tree on n vertices the minimum size of $X$ should be. (GATE - 2006) (2 Marks)(Hexaware 2020)
###### (A) $\log _2 {n}$
###### (B) $n$
###### (C) $2n + 1$
###### (D) $2^n - 1$

A2) (D) $2^n - 1$

---
# References 

1. [YouTube Lecture](https://youtu.be/2o2vX0ZqQ_Y?si=SRtHjAElf4BHFcLH)