
Type : #Note    
Date :  2026-03-23  
Tags :  [[Maths]] ; [[DSA]] ; [[Graph]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Graph Theory Fundamentals

## Graph Components

A graph $G = (V, E)$ consists of a non-empty set of vertices $V$ and a set of edges $E$ that connect pairs of vertices.
- **Vertex (Node):** An individual point in the graph.
- **Edge (Link):** A line connecting two vertices $(u, v)$.
###### Example 
![[Pasted image 20260323164032.png]]

- **Self-Loop:** An edge that connects a vertex to itself.
###### Example
![[Pasted image 20260323164453.png]]

- **Parallel Edges:** Two or more edges connecting the same pair of vertices.
###### Example 
![[Pasted image 20260323164511.png]]

- **Simple Graph:** A graph with no self-loops or parallel edges.


- **Undirected Edge:** When an edge has no direction i.e. $E_1 = (V_1,V_2) = (V_2, V_1)$ 
- **Directed Edge:** When an edge has a direction i.e. $(V_1,V_2) \neq (V_2, V_1)$ 
###### Example 
![[Pasted image 20260323165142.png]]

- **Adjacent Vertices:** If two vertices are joined by the same edge
- **Adjacent Edges:** If two edges are incident on same vertex
###### Example 
![[Pasted image 20260323165853.png]]

---
## Special Graph Types

- **Finite Graph:** A graph where the number of vertices and edges are finite.
###### Example 
![[Pasted image 20260323170331.png]]
    
- **Null Graph:** A graph with $n$ vertices but zero edges. ^17b5fe
###### Example 
![[Pasted image 20260323170140.png]]

- **Trivial Graph:** A graph consisting of only one vertex and no edges. ^e04fc8
###### Example 
![[Pasted image 20260323170439.png]]

---
## Complete Graphs and Degrees

---
### Complete Graph ($K_n$)

A simple graph in which every pair of distinct vertices is connected by a unique edge.

- For $n$ vertices, the maximum number of edges is given by:
    $$\text{Max Edges} = K_n = \frac{n(n-1)}{2}$$
###### Example 
![[Pasted image 20260323170902.png]]

- No. of simple graphs possible with $n$ vertices = $$2^{\frac{n(n-1)}{2}}$$
- No. of simple graphs possible with $n$ vertices and $e$ edges = $$^{\frac{n(n-1)}{2}}C_{e}$$
---
### Vertex Degree
- The degree of a vertex $v$ in an undirected graph, is the **number of edges** associated with it.
- denoted by $deg(v)$
- **Isolated Vertex:** A vertex with degree zero ^51f4e2
- **Pendant Vertex:** A vertex with degree one
###### Example 
![[Pasted image 20260323172848.png]]

| vertex | degree |                 |
| ------ | ------ | --------------- |
| a      | 1      | pendant vertex  |
| b      | 2      |                 |
| c      | 3      |                 |
| d      | 2      |                 |
| e      | 2      |                 |
| f      | 2      |                 |
| g      | 0      | isolated vertex |

####  Hand-shaking Theorem 
- The sum of degrees of all vertices is twice the number of edges.
        $$\sum_{v \in V} deg(v) = 2|E|$$
- ∑ deg(v) is always even

#### Corollary 
- In any graph, the number of vertices with odd degrees must be even.
$$∑ ^n_{i=1} d(v_i) = ∑ _{even}d(v_i) + ∑ _{odd} d(v_i)$$

---
### Degree Bounds

- **$\Delta(G)$**: The maximum degree among all vertices in graph $G$.
     ^df209a
- **$\delta(G)$**: The minimum degree among all vertices in graph $G$.
     ^812351
- **Relation**: $$\delta(G) \le \frac{2|E|}{|V(G)|} \le \Delta(G)$$
- $\Delta(G)$ : Maximum Degree 
- $\delta(G)$ : Minimum Degree  ^8fe17a
- $2|E|$ : Sum of degrees 
- $|V(G)|$ : Total no. of vertices 

###### Example  
![[Pasted image 20260323172848.png]]

| vertex | degree |                 |
| ------ | ------ | --------------- |
| a      | 1      | pendant vertex  |
| b      | 2      |                 |
| c      | 3      |                 |
| d      | 2      |                 |
| e      | 2      |                 |
| f      | 2      |                 |
| g      | 0      | isolated vertex |

$\Delta(G)$ = 3  
$\delta(G)$ = 0  

---
## Degree Sequence

- A list of the degrees of vertices in a graph.
###### Example 
![[Pasted image 20260323172848.png]]
{0, 1, 2, 2, 2, 2, 3}  

---
## Checking the validity of a Degree Sequence 
- To check if we can draw a valid simple graph from a given sequence 
### Simple Conditions to check 
1. Check if the no. of odd degrees are even or not 
	- Key idea : Sum of all degrees must be even → [[Graph Theory#Hand-shaking Theorem|Hand-Shake theorem]]
2. The highest degree must be less than the total no. of degrees
3. if the sequence has only a single no. , even no. of times then its valid

To check further : use **Havel-Hakimi Theorem** 

---
## Havel-Hakimi Theorem

1. Sort the sequence in descending order.
2. Remove the first element $d_1$.
3. Subtract 1 from the next $d_1$ elements in the sequence.
4. If any element becomes negative, the sequence is not graphic.
5. Repeat until the sequence consists only of zeros or is clearly non-graphic.
    
###### Example 
{4, 2, 3, 2, 3}  
1. Sorting the elements in decreasing order : {4, 3, 3, 2, 2}
2. Removing 4 and subtracting 1 from the next 4 elements : {3 - 1, 3 - 1, 2 - 1, 2 - 1} = {2, 2, 1, 1}
3. Removing 2 and subtracting 3 from the next 2 elements & sorting the final result : {2 - 1,1 - 1, 1} = {1, 0, 1} = {1, 1, 0}
4. Removing 1 and subtracting 1 from the next 1 element : {1 - 1, 0} = {0, 0}
5. It all zero in the end → it is a valid graph sequence 
 
---
## Advanced Graph Classifications

---
### Bipartite Graphs (2 partition graphs)

- A graph where the vertex set $V$ can be partitioned into two disjoint sets $V_1$ and $V_2$ such that every edge connects a vertex in $V_1$ to a vertex in $V_2$ but the edges don't connect vertices of the same set.
- Two vertices of the same set cannot be adjacent to each other
- **Complete Bipartite Graph ($K_{m,n}$)**: Every vertex in $V_1$ (size $m$) is connected to every vertex in $V_2$ (size $n$).
- **Edge Count in $K_{m,n}$**: $m \times n$.
###### Example : Bipartite Graph 
![bipartite graph partition, AI generated](https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTDA9ulaUbxQfpgHOhmOy_uyMBPj1yBxLPNUAov1mjzYatC3QYUFZvz6R7ugi9ZckDUI7L3ffAqf1lsQ1tfz5VvsN15A-Il2d8H8jp5cssgNTrmdGo)
![[Pasted image 20260325235711.png]]
- At first glace it might not look bipartite, but if you look closely, the encircled vertices form a set and the other vertices form a set, making this graph Bipartite
###### Example : Complete Bipartite Graph : $K_{3, 3}$
![[Pasted image 20260326000319.png]]
- These three are the same graph([[Planer, Non-Planer Graphs#Isomorphic graphs|Isomorphic Graphs]]) : Sets : 
	- {{1, 2, 3} , {4, 5, 6}}
	- {{p, t, r} , {u, q, s}}
	- {{b, f, e} , {d, a, c}}

---
### Cycle Graphs

- ($C_n$)
- A graph forming a single closed loop ($n \ge 3$). 
- Every vertex has degree 2.
- No. of vertices = No. of edges
###### Example 
![[Pasted image 20260326005712.png]]

---
### Regular Graphs 

- **k-Regular Graph**: A graph where every vertex has the same degree $k$.
- Every Cycle Graph is a 2-Regular Graph.
- Every Regular Graph is a Cycle Graph : False
###### Example  
![[Pasted image 20260326033139.png]]

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
## Complement of a Graph ($\bar{G}$)

The complement $\bar{G}$ of a simple graph $G$ has the same vertices as $G$, but an edge exists in $\bar{G}$ if and only if it does **not** exist in $G$.
- $(G(V, E))^C  = G^C(V, E^C)$
- Two vertices of $G^C$ are adjacent iff they are not adjacent in $G$
- **Edge Relation**: $|E(G)| + |E(\bar{G})| = \text{Total edges in } K_n = E(K_{n}) = \frac{n(n-1)}{2}$
- $G \cup G^C = K_n$ 
- $G \cap G^C = \text{null graph}$ 
###### Example 
![[Pasted image 20260326033715.png]]


---
# Questions
###### Q1) A simple graph G contains 21 edges, 3 vertices of degree 4 and all remaining vertices are of degree 2. Then number of vertices |v| is?

A1) 18  
∑ deg(v) = 2 × 21 = 42  
⇒ 3 × 4 + (x - 3) × 2 = 42  
⇒ 12 + 2x - 6 = 42  
⇒ x = 18  

---
###### Q2) A simple non-directed graph G has 24 edges and degree of each vertex is 4, then find the value of |v|? 

A2) 12  
4x = 2 × 24  
x = 12  

---
###### Q3) Consider a simple graph with 35 edges such that 4 vertex of ° 5, 5 vertex of ° 4 and 4 vertex of ° 3, find the no. of vertices of ° 2.

A3) 9  
4 × 5 + 5 × 4 + 4 × 3 + 2x = 35 × 2    
⇒ 20 + 20 + 12 + 2x = 70    
⇒ x = 9    

---
###### Q4) Simple non-directed graph G has 24 edges and ° of each vertex is K, then which of the following is possible no. of vertices?
###### a) 20  
###### b) 15
###### c) 10 
###### d) 8

A4) d  
Kx = 48  
x = 48/K  
8 is a possible ans.  

---
###### Q5) G is undirected graph with n vertices and 25 edges such that each vertex has ° at least 3. Then the maximum possible value of n is ?
###### a) 16
###### b) 17
###### c) 16.66
###### d) 16.67

A5) a) 16  
3n ≤ 50    
n ≤ 50/3 = 16.67  
- vertex cannot be in decimal 

---
###### Q6) Minimum no. of vertices possible in a simple graph if 41 edges and ° of each vertex is at most 5?

A6) 17  
5x ≥ 82  
x ≥ 16.4  

---
###### Q7) Which of the following ° sequence represent a simple directed graph? 
###### a) {2, 3, 3, 4, 4, 5} 
###### b) {2, 3, 4, 4, 5}
###### c) {3, 3, 3, 1}
###### d) {1, 3, 3, 4, 5, 6, 6}
###### e) {2, 3, 3, 3, 3}
###### f) {6, 6, 6, 6, 4, 3, 3, 0}
###### g) {6, 5, 5, 4, 3, 3, 2, 2, 2}

A7) 
a) invalid
- the no. of odd degrees is odd. (the ∑ deg(v) is odd)
b) invalid 
- there are 5 vertices, $\Delta (G)$ can be $n-1 = 4$ , but here it is 5
c) invalid 
- if there are 4 vertices and 3 of them have ° 3, then the last one ought to have ° 3 as well
d) invalid 
- there are 7 vertices and two of them have the ° 6 ⇒ $\delta (G)$ should be 2, but here it is 1
e) valid
1. {3, 3, 3, 3, 2}
2. {2, 2, 2, 2}
3. {1, 1, 2} → {2, 1, 1}
4. {0, 0}
f) invalid
- {5, 5, 5, 3, 2, 2}
- {4, 4, 2, 1, 1}
- 5 vertices and two of them have ° 4 ⇒ lowest can be 2, but here it is 1 ⇒ not possible 
g) valid
- {4, 4, 3, 2, 2, 1, 2, 2} → {4, 4, 3, 2, 2, 2, 2, 1}
- {3, 2, 1, 1, 2, 2, 1} → {3, 2, 2, 2, 1, 1, 1}
- {1, 1, 1, 1, 1, 1}
- even no. of 1(s) in the sequence

---
###### Q8) A simple graph $G$ has 30 edges and $G^c$ has 36 edges, the number of vertices in G will be?

A8) 12  
Total no. of edges in $K_n = 30 + 36 = 66$     
⇒ $n(n-1)/2 = 66$    
⇒ $n^2 - n - 132 = 0$     
⇒ $n = -11, 12$    
⇒ n = 12  

---
###### Q9) A simple graph $G$ has 56 edges and $G^C$ has 80 edges, the number of vertices in G will be?

A9) 17  
⇒ $n^2 - n = 2 \times 136$  
⇒ $n^2 - n - 272 = 0$  
⇒ $n^2 - 17n + 16n - 272 = 0$  
⇒ $n(n - 17) + 16(n - 17) = 0$  
⇒ $(n - 17)(n + 16) = 0$  
⇒ $n = 17, -16$  
⇒ $n = 17$  

---
###### Q10) $G → |v| = 8 ; |E| = 12$
###### $|E(G^C| = ?$

A10) 16  
$|E(G^C| = 8(7)/2 - 12 = 28 - 12 = 16$  

---
## 🔗 Connections

- Graph matching is the core of → [[Multi-Object Tracking]] (tracklets are nodes, associations are edges)
- Graph traversal algorithms connect to → [[Graph Traversal]]
- Bipartite matching is used in data association → [[Algorithm Basics]]

---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=NMsfBJgGErNkSUQy)