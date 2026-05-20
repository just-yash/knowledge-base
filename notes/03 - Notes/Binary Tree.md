
Type : #Note    
Date :  2026-04-02  
Tags :  [[Graph]] ; [[DSA]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Binary Trees

## Definition

A tree where each node can have at most two children (0, 1, or 2 children).

- **Positions:** In a binary [[Tree_DSA|tree]], children are specifically designated as **Left Child** or **Right Child**.

- **Empty Tree** : An empty binary tree. the one with no nodes except the parent node.

- **Root Node** : if not empty, the tree has a unique root node ($R$)

- **Subtrees** : The remaining nodes are partitioned into two disjoint subtrees, $T_{1}$ (left) and $T_{2}$ (right).

---
## Representation of tree in memory : 
- **Sequential Representation** : 
	- using an array info, left child and right child
	- its not used much and nor is it recommended
		 ![[Pasted image 20260402030544.png]]
- **Linked Representation** : 
	- using self-referential structure node
	- recommended 
		 ![[Pasted image 20260402031013.png]]

---
## [[C]] program to implement Binary Tree via Linked Representation

```c
struct node{
	int data;
	struct node* left;
	struct node* right;
}
```

---
## Mathematical Properties of Binary Trees

- **Max Nodes at Height $h$:** $2^h$

![[Pasted image 20260402032705.png]]
    
- **Max Total Nodes in a Tree of Height $H$:**
    $$2^{H+1} - 1$$
    
- **Min Total Nodes in a Tree of Height $H$:**
    $$H + 1$$
    
    (Occurs in a "Skewed Tree").
- Left Skewed tree : if the tree forms a straight line where every node (except the root node) is a left node 
- Right Skewed tree : if the tree forms a straight line where every node (except the root node) is a right node 

###### Example

For a Binary Tree of height $H = 3$:

- **Max Nodes:** $2^{3+1} - 1 = 15$
    
- **Min Nodes:** $3 + 1 = 4$
    
---
# Questions

###### Q1) Let T be a binary search tree with 15 nodes. The minimum and maximum possible heights of T are  ___ (GATE 2017) (1 Marks)
###### (A) 4 and 15 respectively
###### (B) 3 and 14 respectively
###### (C) 4 and 14 respectively
###### (D) 3 and 15 respectively

A1) (B) 3 and 14 respectively  

---
###### Q2) The height of a tree is the length of the longest root-to-leaf path in it. The maximum and minimum number of nodes in a binary tree of height 5 are (GATE - 2015) (1 Marks)
###### (A) 63 and 6, respectively
###### (B) 64 and 5, respectively
###### (C) 32 and 6, respectively
###### (D) 31 and 5, respectively

A2) (A) 63 and 6, respectively  

---
###### Q3) The height of a binary tree is the maximum number of edges in any root to leaf path. The maximum number of nodes in a binary tree of height h is: (GATE-2007) (1 Marks)
###### a) $2^h-1$
###### b) $2^{h-1}- 1$
###### c) $2^{h+1}-1$
###### d) $2^{h+1}$

A3) c) $2^{h+1}-1$  

---
###### Q4) In a binary tree, for every node the difference between the number of nodes in the left and right subtrees is at most 2. If the height of the tree is h>0, then the minimum number of nodes in the tree is (GATE-2005) (2 Marks)
###### a) $2^{h-1}$
###### b) $2^{h-1}+1$
###### c) $2^h- 1$
###### d) $2^h$

A4) b) $2^{h-1}+1$  

> In the exam you will not have time to derive, draw a case that satisfy the conditions of the Q and check with the options. 

---
###### Q5) In a binary tree with $n$ nodes, every node has an odd number of descendants. Every node is considered to be its own descendant. What is the number of nodes in the tree that have exactly one child? (GATE - 2010) (1 Marks)
###### (A) $0$
###### (B) $1$
###### (C) $\frac{n-1}{2}$
###### (D) $n-1$

A5) (A) $0$  
- If every node is a descendant of itself and can have only odd no. of descendants ⇒ apart from the node itself, there shall be 2 or 0 nodes for every node. So no node can have a single child

---



---
# Summary 





---
# References 

1. [[Tree_DSA]]
2. [DS One Shot](https://youtu.be/2o2vX0ZqQ_Y)
3. [[Binary Tree Traversal]]