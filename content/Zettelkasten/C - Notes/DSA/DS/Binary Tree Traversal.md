
Date :  2026-04-02  
Tags :  [[DSA]]    
~ ***Yash Agrawall*** ~  

---
# Binary Tree Traversal

## Tree Traversal Techniques (Depth-First)

Traversal is the process of visiting every node in the tree **exactly once**.  
[[Linked List]], [[Array]] and other [[Data Structures Basics#^15c09e|linear data structures]] , which are traversed in linear order, trees are traversed in multiple ways. 

### 1. Pre-Order Traversal

- **Logic:** Root $\to$ Left Subtree $\to$ Right Subtree.
    
- **Visual Trick:** Cut the "Left" edge of each node while tracing the perimeter.
    
- **Usage:** Used to create a copy of the tree or for prefix expressions.
- Function call is always preorder 
  
### 2. In-Order Traversal

- **Logic:** Left Subtree $\to$ Root $\to$ Right Subtree.
    
- **Visual Trick:** Cut the "Bottom" edge of each node while tracing the perimeter.
    
- **Usage:** In a Binary Search Tree (BST), this results in a sorted sequence of values.
    
### 3. Post-Order Traversal

- **Logic:** Left Subtree $\to$ Right Subtree $\to$ Root.
    
- **Visual Trick:** Cut the "Right" edge of each node while tracing the perimeter.
    
- **Usage:** Used to delete a tree or for postfix expressions.
- Function operation is always Postorder 
###### Example: Traversal Output
![[Pasted image 20260408194732.png]]

### Unique Tree Criteria 
- Preorder + Inorder 
- Postorder + Inorder 

### Constructing Tree from Postorder and Inorder 
- Traverse the postorder from right to left 
- Check relative positioning of elements from the inorder 
- draw the tree 

###### Example : 
Postorder : 8, 9, 6, 7, 4, 5, 2, 3, 1   
Inorder : 8, 6, 9, 4, 7, 2, 5, 1, 3   

Tree :  
![[Pasted image 20260410070432.png]]
### Constructing Tree from Preorder and Inorder 
- Traverse the preorder from left to right
- Check relative positioning of elements from the inorder 
- draw the tree 

###### Example : 
Preorder : d b e a f c g   
Inorder : a b d e c f g   

Tree :   
![[Pasted image 20260410070833.png]]   
Postorder : d e b f g c a   


---
## Level Order Traversal 
- Left to Right ; Top to Bottom 
- Level-wise traversal
- Can be done by starting from the root and performing BFS (breadth first)

---

## Special Types of Binary Trees

### Complete Binary Tree (CBT)

- All levels are completely filled except possibly the last level.
    
- In the last level, all nodes are as far left as possible.
    
- **Array Representation:** If a node is at index $i$, its Left Child is at $2i$ and Right Child is at $2i+1$ (1-based indexing).
    

### Binary Search Tree (BST)

- **Rule:** For every node, the Left Subtree contains values **smaller** than the node, and the Right Subtree contains values **larger**.
    
- **Efficiency:** Search time is $O(\log n)$ on average, but can become $O(n)$ if the tree is skewed.










---
# Questions

###### Q1) Which of the following binary tree has its order inorder and preorder traversal as BCAD and ABCD, respectively? (GATE 2004) (1 Marks)
![[Pasted image 20260408195452.png]]

A1) d   

---
###### Q2) Which of the following post order traversal of the above tree (GATE 1991) (1 Marks)
![[Pasted image 20260408195652.png]]
###### a) fegcbdba  
###### b) gcbdafe  
###### c) gcdbfea  
###### d) fedgcba

A2) c) gcdbfea   

---





---
# Summary 





---
# References 

