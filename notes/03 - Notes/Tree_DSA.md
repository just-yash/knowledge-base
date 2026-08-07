
Type : #Note    
Date :  2026-04-02  
Tags :  [[DSA]] ; [[Graph]] ; [[Maths]]   
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Tree_DSA

- Tree is an acyclic [[Graph]] but connected
- Trees are non-linear, hierarchical data structures used to represent relationships where one element is connected to multiple elements below it.
- Widely used due to its Flexibility and Versatility 
- Application : file systems, database indexing, decision making, and many more
![[Pasted image 20260402033532.png]]

---
## Tree Fundamentals and Terminology

### Basic Definitions

- **Non-Linearity:** Unlike [[Array]] or [[Linked List]], a tree node can have more than one "next" element.
    
- **Root Node:** The top-most node of the tree. It is the starting point for any traversal → the origin of the tree

- **Subtrees:** A tree can be divided into smaller subsets called subtrees, each acting as an independent tree.
    
- **Edges ($E$):** The links connecting nodes. For a tree with $n$ nodes, there are exactly $n - 1$ edges.
    
- **Parent-Child Relationship:** Every node except the root has exactly one parent, but can have multiple children. There exists a single unique root to reach any node. 
    
### Structural Terms

- **Leaf Node (External Node):** A node with zero children / descendants 
    
- **Internal Node:** A node with at least one child.
    
- **Degree / Order of a Node:** The total number of children a node has.
    
- **Degree of a Tree:** The maximum degree among all nodes in the tree.
    
- **Height/Depth/Level:**
    - By default, the **Root is at Height 0** (or Level 0).
    - The height of a node is the number of edges from that node to the root.

---
# References 

1. [DS One Shot](https://youtu.be/2o2vX0ZqQ_Y)