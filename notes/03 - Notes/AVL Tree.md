
Type : #Note    
Date :  2026-04-12  
Tags : [[DSA]]     
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# AVL Tree

- Adelson Velsky and Landis → three Mathematicians
- self-balancing [[Binary Search Tree]]
- A BST whose heights of the two child subtree of any node differ by at most 1
- if they differ by more than one → rebalancing is done to restore this property 

---
## Balance Factor 

- In a [[Binary Tree]] the balance factor of a node N is defined to be the height difference of its tro child subtree 
- Balance Factor (N) = Height(LeftSubtree(N)) - Height(RightSubtree(N))
- AVL Tree → Balance Factor (N) ∈ {-1 , 0 , 1} holds for every node N in the tree 
- N > 0 ⇒ left-heavy 
- N < 0 ⇒ right-heavy 
- N = 0 ⇒ balanced 

---
## Insertion in an AVL Tree 

- Insert a node similarly as we do in [[Binary Search Tree]]
- After insertion check the balancing factor of each node in a bottom up fashion 
- Stop on the first node whose balancing factor is violated and go to two steps towards the newly inserted nodes 
- Watch the movement → which is identified as the problem 
- After every insertion at most two rotations are sufficient to balance the AVL tree 

Rotation types : 

| Problem | Solution |
| ------- | -------- |
| LL      | R        |
| RR<br>  | L        |
| LR      | LR       |
| RL      | RL       |

###### Example : 21, 26, 30, 9, 4, 14, 28, 18, 15, 10, 2, 3, 7 

![[Pasted image 20260413021436.png]]

---
## Deletion in an AVL Tree

![[Pasted image 20260413023025.png]]

- Delete a node, if the deletion doesn't cause instability → no issue 
- If the deletion cause an issue → follow the above table 
- If the deleted node is the left child of the node it cause problem → L 
- Check the Balancing factor of the right child if the instable node (sibling of the deleted node) 
	- if its 0 → L<sub>0</sub> → RR rotation 
	- if its 1 → L<sub>1</sub> → RL rotation 
	- if its -1 → L<sub>-1</sub> → RR rotation 
Similarly for R

---
## Advantage of AVL Tree

- Lookup, Insertion and deletion all take $O\log{n}$ time in both average and worst case, where n is the number of nodes in the tree prior to the operation 
- Insertion and deletion may require the tree to be rebalanced by one or more tree rotations 

| Algorithm | Average Case | Worst Case |
| --------- | ------------ | ---------- |
| Space     | $O(n)$       | $O(n)$     |
| Search    | $O\log{n}$   | $O\log{n}$ |
| Insert    | $O\log{n}$   | $O\log{n}$ |
| Delete    | $O\log{n}$   | $O\log{n}$ |

---
###### Q1) What is the maximum height of any AVL tree with 7 nodes? Assume that the height of a tree with a single node is 0. (GATE 2009)(1 Mark)
###### a) 2
###### b) 3
###### c) 4
###### d) 5

A1) b) 3 

---
# References 

1. [YouTube One Shot](https://youtu.be/2o2vX0ZqQ_Y?si=tB6x2S_GXcnKuR5M)