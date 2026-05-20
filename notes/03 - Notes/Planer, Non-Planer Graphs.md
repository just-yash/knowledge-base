
Type : #Note    
Date :  2026-03-27  
Tags :  [[Maths]] ; [[DSA]]     
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Planer, Non-Planer Graphs
### Planar Graph
- A graph is **Planar** if it can be drawn in a plane(2D) without any edges crossing.
###### Example 
![[Pasted image 20260326235125.png]]

---
### Non-Planar Graph
- **Non-planar Benchmarks**: $K_5$ (complete graph with 5 vertices) and $K_{3,3}$ (complete bipartite graph) are the smallest non-planar graphs.
###### Example 
![[Pasted image 20260326235207.png]]

---
### Kuratowski’s Theorem
- A graph is non-planar if and only if it contains a subgraph that is a homeomorphism of $K_5$ or $K_{3,3}$.
- $K_5$ → Kuratowski's Case I : Simplest non-planer graph with $|v| = 5 , |e|=10$ 
- $K_{3,3}$ → Kuratowski's Case II : Simplest non-planer graph with $|v| = 6, |e| = 9$
- Both are regular graphs 
- Deleting a single edge or vertex can make them Planer

---
### Isomorphic graphs
- Graphs that are the same graphs but drawn differently with different names
- They have the same properties
- they have the same no. of vertices and edges
- If any graph has an isomorphic graph which is planer, then its also planer 
- No. of vertices with a given degree would be same 
- check minimum cycle length, maximum cycle length or no. of cycle with a specific length
- if two graphs are isomorphic, their complements will be isomorphic as well
- check [[Graph Traversal#Chromatic Number $ chi(G)$|chromatic number]] 
- same [[Network Reliability#Edge Connectivity ($ lambda(G)$)|edge connectivity]] and [[Network Reliability#Vertex Connectivity ($ kappa(G)$)|vertex connectivity]]
###### Example : Planer isomorphic graph 
![[Pasted image 20260327000031.png]]

###### Example : Non-Planer isomorphic graph 
![[Pasted image 20260326000319.png]]

###### Example : Isomorphic Graphs 
![[Pasted image 20260327193630.png]]
- these three are isomorphic graphs → studying any one gives the understanding of all
- they are the same graphs, on the names of the vertices have changes
###### Example : non-isomorphic graphs 
![[Pasted image 20260327223710.png]]
- in the first graph there is only one vertex of ° 2, whereas in the 2nd graph there are 2 vertex of ° 2 
- 

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
### Euler’s Formula

#### Connected Planer Graph

$$V - E + R = 2$$

Where $V = \text{Vertices}$, $E = \text{Edges}$, and $R = \text{Regions (including the infinite outer region)}$.

- **Edge Bound**: For a simple planar graph with $V \ge 3$, $E \le 3V - 6$.

###### Example 
![[Pasted image 20260327000834.png]]
- V = 4 ; E = 6 ; R = 4 
- 4 - 6 + 4 = 2
![[Pasted image 20260327001045.png]]
- V = 20 ; E = 30 ; R = 12 
- 20 - 30 + 12 = 2

#### Disconnected Planer Graph
$$V - E + R - K = 1$$
$K$ → No. of connected components
- this is a more general formula 
	- if graph is connected then $K$ = 1
###### Example 
![[Pasted image 20260327001633.png]]
- V = 9 ; E = 9 ; R = 4 ; K = 3
- 9 - 9 + 4 - 3 = 1





---
# Questions

###### Q1) How many simple non-isomorphic graphs are possible with :
###### a) 4 vertices and 2 edges? 
###### b) 4 vertices and 3 edges
###### c) 5 vertices and 3 edges

A1)   
a) 2  
![[Pasted image 20260327194042.png]]    
b) 3  
![[Pasted image 20260327194418.png]]     
c) 4  
![[Pasted image 20260327194813.png]]  

---
###### Q2) How many simple non-isomorphic graphs are possible with 6 vertices and 6 edges such that ° of every vertex must be same?

A2) 2   
![[Pasted image 20260327222055.png]]

---
###### Q3) How many simple non-isomorphic graphs are possible with 8 vertices and 8 edges such that ° of every vertex must be same?

A3)  3   
![[Pasted image 20260327222801.png]]   

---
# Summary 





---
# References