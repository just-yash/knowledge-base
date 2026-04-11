
Date :  2026-03-27  
Tags :  [[Maths]] ; [[Graph]]   
~ ***Yash Agrawall*** ~  

---
# Matching 
- Subgraphs of a graph where every vertex of the graph is incident with at most one edge. 
- $deg(v) ≤ 1, \forall{\space} V \in V(G)$
- No two edges are adjacent
###### Example 
![[Pasted image 20260328004331.png]]
- $M_1$ is not a valid matching (° more than 1)
- Rest are valid matching 

---
## Maximal Matching 
- if inclusion of a single edge can disrupt the matching ability of the subgraph, that subgraph is the Maximal Matching 
- no other edge can be added without violating the ° condition 

###### Example 
- in the above example, $M_2 \space , M_3$ are both maximal 
	- in $M_3$ we cannot add (a, c) as its not there in the main graph 

---
## Maximum Matching 
- The Maximal Matching having the maximum no. of edges is called the Maximum Matching
- The no. of edges in the Maximum Matching of a graph is called the **Maximum Number** of the graph.

###### Example
- in the above example, $M_2$ is the Maximum matching
- Matching number of Graph $G$ is 2

---
## Perfect Matching 
- when every vertex of the subgraph is matched 
- it happens only when the main graph's $|v|$ (vertex count) is even 
	- its a necessary condition, but not sufficient 
- A [[tree]] doesn't have a perfect match 
- for a [[Graph Theory#Complete Graph ($K_n$)|Complete Graph]] $K_n$ :
	- no. of perfect matchings are : $$\frac{[(2n)!]}{n! \times 2^n}$$
---
![[Pasted image 20260328015452.png]]



---
# Questions




---
# Summary 





---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=TqywZGuw7AFl3Ts9)