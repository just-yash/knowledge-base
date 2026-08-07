
Type : #Note    
Date :  2026-03-28  
Tags :  [[Maths]] ; [[Graph]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Line Covering 
- Subgraphs of a graph where every vertex of the graph is incident with atleast one edge. 
- $deg(v) ≥  1, \forall{\space} V \in V(G)$
- [[Graph Theory#^17b5fe|null graphs]] can never be covers
- The graph itself is also a valid Line Cover
- Line Covering of a graph with $n$ vertices contain at least upper bound $n/2$ edges

###### Example 1
![[Pasted image 20260328015151.png]]

###### Example 2
![[Pasted image 20260328021426.png]]

---
## Minimal Line Covering 
- if removal of a single edge can disrupt the covering ability of the subgraph, that subgraph is the Minimal Line Covering
- No other edge can be deleted without violating ° condition 
- No Minimal Line Covering can contain a cycle 

###### Example 1
- in the above example, $C_1, C_{2}$ are Minimal Line Coverings

---
## Minimum Line Covering 
- The Minimal Line Covering having the minimum edges is called Minimum Line Covering 
- The no. of edges in the Minimum Line Covering of a graph is called **Line Covering Number** ($\alpha_{1}$) ^7a0b90

###### Example 1 
- in the above example, $C_1$ is the Minimum Line Covering with Line Covering Number ($\alpha_1$) = 2
###### Example 2 
- {(a, d), (b, c), (e, f)}
- {(d, c), (a, b), (e, f)}

---
## Independent Line Set 
- If the subset has no two edges adjacent 

###### Example 1
- In the above Example, $C_1$ : {(a, b), (c, d)} shows an Independent Line Set

###### Example 2
- L1 = {(b, d)}
- L2 = {(b, d), (e, f)}
- L3 = {(a, d), (b, c), (e, f)}
- L4 = {(a, b), (e, f)}
- L5 = {(a, b), (d, c), (e, f)}

---
### Maximal Independent Line Set
- a Line Set in which no other edges can be added to a line set without disturbing its Independence. 

###### Example 2 
- L2 and L3 are Maximal Independent Line Sets

---
### Maximum Independent Line Set 
- a Maximal Independent Line Set having maximum no. of edges
- The no. of edges in the Maximum Independent Line Set is called **Line Independent Number**($\beta_{1}$) of the graph ^d10cb2
###### Example 2 
- L3 is the Maximum Independent Line Set 
- Line Independent Number($\beta_{1}$) : 3

---
- [[Line Covering#^7a0b90|Line Covering Number]]($\alpha_{1}$) + [[Line Covering#^d10cb2|Line Independent Number]]($\beta_{1}$) = $|v|$ (total no. of vertices)
$$\alpha_{1} + \beta_{1} = |v|$$

---
# References 

1. [YouTube Lecture](https://youtu.be/h4sd7wRcyR0?si=0vVlV_l4Nsn-g6hF)