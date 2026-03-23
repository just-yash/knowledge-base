
Date :  2026-03-23  
Tags :  [[Maths]]  
~ ***Yash Agrawall*** ~  

---
# Graph Theory Fundamentals

## Definitions and Basic Structures

### Graph Components

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

### Special Graph Types

- **Finite Graph:** A graph where the number of vertices and edges are finite.
###### Example 
![[Pasted image 20260323170331.png]]
    
- **Null Graph:** A graph with $n$ vertices but zero edges.
###### Example 
![[Pasted image 20260323170140.png]]

- **Trivial Graph:** A graph consisting of only one vertex and no edges.
###### Example 
![[Pasted image 20260323170439.png]]

---
## Complete Graphs and Degrees

### Complete Graph ($K_n$)

A simple graph in which every pair of distinct vertices is connected by a unique edge.

- For $n$ vertices, the maximum number of edges is given by:
    $$\text{Max Edges} = K_n = \frac{n(n-1)}{2}$$
###### Example 
![[Pasted image 20260323170902.png]]

- No. of simple graphs possible with $n$ vertices = $$2^{\frac{n(n-1)}{2}}$$
- No. of simple graphs possible with $n$ vertices and $e$ edges = $$^{\frac{n(n-1)}{2}}C_{e}$$

### Vertex Degree
- The degree of a vertex $v$ in an undirected graph, is the **number of edges** associated with it.
- denoted by $deg(v)$
- **Isolated Vertex:** A vertex with degree zero
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

- **Hand-shaking Theorem**: The sum of degrees of all vertices is twice the number of edges.
        $$\sum_{v \in V} deg(v) = 2|E|$$
	- ∑ deg(v) is always even
- **Corollary**: In any graph, the number of vertices with odd degrees must be even.
$$∑ ^n_{i=1} d(v_i) = ∑ _{even}d(v_i) + ∑ _{odd} d(v_i)$$
    

### Degree Bounds

- **$\Delta(G)$**: The maximum degree among all vertices in graph $G$.
    
- **$\delta(G)$**: The minimum degree among all vertices in graph $G$.
    
- **Relation**: $\delta(G) \le \frac{2|E|}{n} \le \Delta(G)$.
    

---
## Degree Sequences and Havel-Hakimi

### Degree Sequence

A list of the degrees of vertices in a graph, usually arranged in non-increasing order (e.g., $d_1 \ge d_2 \ge \dots \ge d_n$).

### Havel-Hakimi Theorem

An algorithm used to determine if a given sequence of non-negative integers is "graphic" (can form a simple graph).

1. Sort the sequence in descending order.
    
2. Remove the first element $d_1$.
    
3. Subtract 1 from the next $d_1$ elements in the sequence.
    
4. If any element becomes negative, the sequence is not graphic.
    
5. Repeat until the sequence consists only of zeros or is clearly non-graphic.
    

---

## Advanced Graph Classifications

### Bipartite Graphs

A graph where the vertex set $V$ can be partitioned into two disjoint sets $V_1$ and $V_2$ such that every edge connects a vertex in $V_1$ to a vertex in $V_2$.

- **Complete Bipartite Graph ($K_{m,n}$)**: Every vertex in $V_1$ (size $m$) is connected to every vertex in $V_2$ (size $n$).
    
- **Edge Count in $K_{m,n}$**: $m \times n$.
    

![bipartite graph partition, AI generated](https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTDA9ulaUbxQfpgHOhmOy_uyMBPj1yBxLPNUAov1mjzYatC3QYUFZvz6R7ugi9ZckDUI7L3ffAqf1lsQ1tfz5VvsN15A-Il2d8H8jp5cssgNTrmdGo)

Shutterstock

Explore

### Regular and Cycle Graphs

- **Cycle Graph ($C_n$)**: A graph forming a single closed loop ($n \ge 3$). Every vertex has degree 2.
    
- **k-Regular Graph**: A graph where every vertex has the same degree $k$.
    

### Complement of a Graph ($\bar{G}$)

The complement $\bar{G}$ of a simple graph $G$ has the same vertices as $G$, but an edge exists in $\bar{G}$ if and only if it does **not** exist in $G$.

- **Edge Relation**: $|E(G)| + |E(\bar{G})| = \text{Total edges in } K_n$.




---
# Questions




---
# Summary 





---
# References 

