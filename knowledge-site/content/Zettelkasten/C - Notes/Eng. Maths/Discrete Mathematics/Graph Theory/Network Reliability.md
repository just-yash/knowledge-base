
Date :  2026-03-27  
Tags : [[Graph]] ; [[Maths]]  
~ ***Yash Agrawall*** ~  

---
# Network Reliability

## Disconnection in Graphs

### Concept of Graph Disconnection
- A graph is considered disconnected if there are at least two vertices between which no path exists.

#### Vertex Removal 
- **Vertex Removal:** Removing a vertex $v$ from a graph $G$ also implies the removal of all edges incident to $v$.

#### Edge Removal
- **Edge Removal:** Removing an edge $e$ does not affect the vertices it connects.
    

---
## Cut-Vertex / Articulation Point

### Connectivity Impact

- A **Cut-Vertex / Articulation Point**  is a vertex whose removal increases the number of connected components in the graph.
- In a connected graph, removing a cut-vertex makes the graph disconnected.
- **Condition:** A vertex $v$ is a cut-vertex if $w(G - v) > w(G)$, where $w(G)$ is the number of components.
- Articulation Point is a single vertex not a set of vertices
###### Examples 
![[Pasted image 20260327173726.png]]
- 2 is an Articulation Point
- {5, 2} is not a valid cut-vertex as its not efficient (2 alone can be a cut-vertex)
- {1, 5, 3} is a valid cut-vertex
 
- In a "Star Graph" ($K_{1,n}$), the central vertex is a cut-vertex because its removal results in $n$ isolated vertices.
![[Pasted image 20260327173906.png]]

---
## Cut-Edge / Bridge

### Single Edge Connectivity

- A **Cut-Edge / Bridge** is an edge whose removal increases the number of connected components.
- its a single edge, not a set of edges 
- **Key Property:** An edge is a bridge if and only if it does not lie on any cycle.
    
###### Example

In a [[Tree_DM|tree]] with $n$ vertices, every edge is a bridge because removing any edge splits the [[Tree_DM]] into two separate components.

---
## Cut-Sets

### Concept of Cut-Set

#### Minimal Disconnection Set

- A **Cut-Set** of a connected graph $G$ is a set of edges whose removal disconnects $G$, provided no proper subset of these edges disconnects $G$.
- It is a **minimal** set of edges that increases the number of components.
- **Properties:**
    - Every cut-set contains at least one edge from every spanning tree.
    - A cut-set partitions the vertex set $V$ into two non-empty, disjoint subsets $V_1$ and $V_2$ such that the cut-set consists of all edges with one endpoint in $V_1$ and the other in $V_2$.
###### Example 
![[Pasted image 20260327173414.png]]
- {a, i} is not a cut-set even though it disconnects the graph because {i} alone can do that 
- {i} is a valid cut-set
- {a, e, h, c} is a valid cut-set 
- {e, h, f, g} is a valid cut-set 
- {d, h, c, g} is not a valid cut- set 
- {d, h, c} is valid cut-set 

---
### Edge Connectivity ($\lambda(G)$)

- The **Edge Connectivity** of a graph $G$ is the minimum number of edges whose removal disconnects $G$.
- It is equal to the size of the smallest cut-set in $G$.    
###### Example

Consider a graph $G$ with edges $E = \{(1,2), (2,3), (3,4), (4,1), (2,4)\}$.
![[Pasted image 20260327191056.png]]

| Edge Set | Disconnects $G$? | Minimal? | Is Cut-Set? |
| :--- | :--- | :--- | :--- |
| $\{(1,2), (1,4)\}$ | Yes | Yes | Yes |
| $\{(1,2), (4,1), (2,4)\}$ | Yes | No | No (Subset $\{(1,2), (4,1)\}$ fails) |
| $\{(2,3), (3,4)\}$ | Yes | Yes | Yes |

---
## Vertex Connectivity ($\kappa(G)$)

### Definition and Bounds

#### Comparison of Connectivity

- **Vertex Connectivity ($\kappa(G)$):** The minimum number of vertices whose removal disconnects $G$ or reduces it to a trivial graph (single vertex).
    
- **Whitney's Inequality:** For any graph $G$:
    $$\kappa(G) \leq \lambda(G) \leq \delta(G)$$
    
    Where $\delta(G)$ is the [[Graph Theory#^8fe17a|minimum degree]] of the graph.
    
---
# Questions

###### Q1) Fill the table 

| [[Graph]] →                                                                                  | ![[Pasted image 20260327191945.png]] | ![[Pasted image 20260327191955.png]] | ![[Pasted image 20260327192006.png]]                                                      | ![[Pasted image 20260327192018.png]]                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| $\kappa(G)$ : [[Network Reliability#Vertex Connectivity ($ kappa(G)$)\|vertex connectivity]] | 2                                    | 3                                    | 1 ([[Network Reliability#Cut-Vertex / Articulation Point\|articulation point]] : b and e) | 1 ([[Network Reliability#Cut-Vertex / Articulation Point\|articulation point]] : b) |
| $\lambda(G)$ : [[Network Reliability#Edge Connectivity ($ lambda(G)$)\|edge connectivity]]   | 2                                    | 3                                    | 1 ([[Network Reliability#Cut-Edge / Bridge\|bridge]] : (b, e))                            | 3                                                                                   |
| $\delta(G)$ : [[Graph Theory#^8fe17a\|minimum degree]]                                       | 2                                    | 3                                    | 3                                                                                         | 3                                                                                   |
| $\Delta(G)$ : [[Graph Theory#^df209a\|maximum degree]]                                       | 3                                    | 4                                    | 4                                                                                         | 6                                                                                   |

---
# Summary 


- **Articulation Point**: A vertex whose removal increases the number of connected components.
    
- **Bridge**: An edge whose removal increases the number of connected components.
    
- **Vertex Connectivity $\kappa(G)$**: Minimum vertices to remove to disconnect the graph.
    
- **Edge Connectivity $\lambda(G)$**: Minimum edges to remove to disconnect the graph.
    
- **Relation**: $\kappa(G) \le \lambda(G) \le \delta(G)$ (minimum degree).
    



---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=TqywZGuw7AFl3Ts9)