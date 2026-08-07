
Type : #Note    
Date :  2026-03-26  
Tags :  [[DSA]] ; [[Maths]] ; [[Graph]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
### Walk
- A finite alternating sequence of vertices and edges
- beginning and ending with vertices
- each edge is incident with the vertices preceding and following it. 
- Both vertices and edges can be repeated.
- **Length of Walk** : No. of edges covered in the sequence : No. of vertices covered in the sequence - 1
###### Example 
![[Pasted image 20260326174757.png]]
- 1-> 2-> 3-> 4-> 2-> 1-> 3
### Open Walk 
- Walk that starts and ends at different vertices
- length of walk > 0

### Closed Walk 
- Walk that starts and end at the same vertex
- length of walk > 0

---
### Trail 
- A Walk in which no edge is repeated
- vertices can be repeated

### Open Trail
- Trail that starts and ends at different vertices 
- start ≠ end

### Closed Trail / Circuit
- Trail that starts and ends at the same vertex
- start = end
###### Example 
![[Pasted image 20260326174842.png]]
- 1-> 3-> 8-> 6-> 3-> 2 : Open Trail 
- 1-> 3-> 8-> 6-> 3-> 2-> 1 : Closed Trail

---
### Path 
- A open walk / trail where no vertex (and thus no edge) is repeated.
###### Example 
![[Pasted image 20260326175017.png]]
- 6->8->3->1->2->4

---
### Cycle
- A closed walk where no vertices are repeated except the start and end.
###### Example 
![[Pasted image 20260326175108.png]]

---
### Connectedness

#### Connected Graph 
- A graph where there is a [[Graph Traversal#Path|path]] between every pair of vertices.
- A graph with no [[Graph Theory#^51f4e2|isolated vertex]]
- A graph with $n$ vertices can be connected with minimum $n-1$ edges.  
- A graph with $n$ vertices will necessarily be connected if it has more than $\frac{(n-1)(n-2)}{2}$ edges 
	- it doesn't mean that if its less than that then it cant connected

#### Components 
- Maximal connected subgraphs of a disconnected graph.
    
---
### Euler Graphs

A graph that contains an **Euler Circuit** (traverses every edge exactly once and returns to the start).

- **Condition**: A connected graph is Eulerian iff every vertex has an **even degree**.
    
- **Euler Path**: Traverses every edge exactly once but starts and ends at different vertices. Occurs if exactly two vertices have odd degrees.
    
---
### Hamiltonian Graphs

A graph that contains a **Hamiltonian Cycle** (visits every vertex exactly once and returns to the start).
- Finding weather a graph is Hamiltonian or not is an NPC problem
- **Note**: There is no simple necessary and sufficient condition like the Euler graph, though Dirac's and Ore's theorems provide sufficient conditions based on vertex degrees.
#### Dirac’s Theorem
- If $G$ is a simple graph with $n$ vertices ($n \geq 3$) and the degree of every vertex is at least $n/2$, then $G$ is Hamiltonian.
    
---
## Graph Coloring

### Chromatic Number $\chi(G)$

The minimum number of colors required to color the vertices of a graph such that no two adjacent vertices share the same color.
- [[Planer, Non-Planer Graphs#Planar Graph|Planar graph]](4 color theorem) : $\chi(G) ≤ 4$

- [[Graph Theory#Complete Graph ($K_n$)|Complete Graph]] $K_n$**: $\chi(K_n) = n$
    
- [[Graph Theory#Cycle Graphs|Cycle graph]] $C_n$: $\chi(C_n) = 2$ if $n$ is even; $\chi(C_n) = 3$ if $n$ is odd.
    
- [[Graph Theory#Bipartite Graphs (2 partition graphs)|Bipartite Graph]]: $\chi(G) = 2$.

- [[Graph Theory#^e04fc8|Trivial graph]] : $\chi(G) = 1$

- [[Tree_DM]] : $\chi(G) = 2$
  
---
###### Q1) A connected planar graph has 10 vertices and 15 edges. How many regions does it have?

A1) Using Euler's Formula: $V - E + R = 2$.

$10 - 15 + R = 2$

$-5 + R = 2 \implies R = 7$.

The graph has 7 regions.

---
###### Q2) What is the chromatic number of a bipartite graph?

A2) The chromatic number is 2. By definition, vertices can be partitioned into two sets such that edges only exist between sets. Thus, all vertices in set 1 can be color A, and all in set 2 can be color B.

---
###### Q3) Which condition is necessarily for a graph to be connected? 
###### a) A graph with 6 vertices and 10 edges
###### b) A graph with 7 vertices and 14 edges
###### c) A graph with 8 vertices and 22 edges
###### d) A graph with 9 vertices and 28 edges

A3) c) A graph with 8 vertices and 22 edges  
- $\frac{(n-1)(n-2)}{2} = 7 \times 6 / 2 = 21$  

---
###### Q4) Which of the following graphs are planer? 
![[Pasted image 20260327000543.png]]

A4) 
G1 : Non-Planer   
G2 : Planer  
![[Pasted image 20260327000638.png]]

---
# Summary 

|Term|Edge Repeat|Vertex Repeat|Closed|
|---|---|---|---|
|Walk|✅|✅|❌/✅|
|Trail|❌|✅|❌/✅|
|Path|❌|❌|❌|
|Circuit|❌|✅|✅|
|Cycle|❌|❌|✅|

---