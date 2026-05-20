
Type : #Note    
Date :  2026-03-27   
Tags :  [[Maths]]  ; [[DSA]]  ; [[Graph]]  
Status : #complete     
~ ***Yash Agrawall*** ~   

---
# Tree
- connected [[Graph]] without any [[Graph Traversal#Closed Trail / Circuit|circuit]]
- There is one and only one [[Graph Traversal#Path|path]] between every pair of vertices in a tree
- $|v| = n ⇒ |E| = n - 1 = (∑ deg(G)) / 2$
- Any [[Graph Traversal#Connected Graph|connected graph]] with $n$ vertices and $n-1$ edges is a tree
- A [[Graph]] is a tree iff it is minimally connected 
###### Example 
![[Pasted image 20260327003621.png]]

---
## Tree Parameters
#### Eccentricity $e(v)$
- The maximum distance from vertex $v$ to any other vertex.
- Eccentricity is calculated for a vertex not a tree

#### Radius $r(G)$
- The minimum eccentricity among all vertices

#### Diameter $d(G)$
- The maximum eccentricity among all vertices.
    
#### Center
- The [[Set|set]] of vertices whose eccentricity equals the radius.
- Every tree has either one or two centers

###### Example 
![[Pasted image 20260327043713.png]]

| Vertex | Eccentricity $e(v)$ |
| ------ | ------------------- |
| a      | 5                   |
| b      | 4                   |
| c      | 3                   |
| d      | 3                   |
| e      | 4                   |
| f      | 5                   |
| g      | 5                   |
| h      | 4                   |
| i      | 4                   |
| j      | 5                   |
| k      | 5                   |
| l      | 5                   |
| m      | 5                   |

- radius : $r(G)$ = 3
- Diameter : $d(G)$ = 5
- Center = {c, d}

---
## Spanning Trees

- A subgraph that contains all vertices of the original [[Graph]] and is a tree.
- For any graph there can be multiple spanning trees
- **Branch** : An edge that is part of a Spanning Tree 
- **Chord** : An edge that is not the part of a Spanning Tree
- With change in Spanning tree, chords and branches will also change
- A [[Graph Traversal#Connected Graph|connected graph]] of $n$ vertices and $e$ edges :
	- $n - 1$ branches 
	- $e - n + 1$ chords
- A [[Graph Traversal#Connected Graph|connected graph]] is tree iff adding an edge between any two vertices of the graph creates exactly one [[Graph Theory#Cycle Graphs|cycle]] 
- **Rank($r$)** : total no. of branches : $n-1$ 
- **Nullity**($\mu$) : total no. of chords : $e-n+1$ 
- $r + \mu = e$ (total no. of edges)

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
## Spanning Forest 
- **Spanning Forest**: A collection of spanning trees for each connected component of a disconnected graph.
- For a disconnected graph of total $n$ vertices and $k$ [[Graph Theory#Graph Components|components]] : 
	- **Rank**($r$): $n - k$
	- **Nullity**($\mu$) : $e - n + k$ 
	- $r + \mu = e$ (total no. of e)

---
# Questions

###### Q1) Let T be a tree with 10 vertices. The sum of the degrees of all vertices in T is? 

A1) 18  
$|v| = 10$    
⇒ $|E| = 10 - 1 = 9$   
⇒ $∑ deg(G) = 2 \times  9 = 18$    



---
# Summary 





---
# References