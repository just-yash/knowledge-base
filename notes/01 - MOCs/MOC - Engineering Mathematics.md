
Type : #MOC    
Date : 2026-05-11          
Status : #incomplete           
~ ***Yash Agrawall*** ~  

---
# Purpose 

> Why does this MOC exist? 
This MOC maps all engineering mathematics — from number theory and calculus to linear algebra, probability, discrete mathematics, and graph theory — as the mathematical foundation for GATE and AI research.

> What problem does it solve? 
Mathematical notes were scattered across five subfolders with no unified path from foundational to advanced. This MOC builds the complete learning sequence.

> What does mastering this domain enable?
Mastering engineering maths enables GATE cracking, provides the mathematical grounding for understanding ML models, and makes the research work on face embeddings and tracking formally rigorous.

---
# Main Areas 

- Overview and Arithmetic
- Algebra and Geometry
- Linear Algebra
- Probability and Random Variables
- Discrete Mathematics and Sets
- Graph Theory

---
# Study Flow 

### Overview
- [[Number System]] — number systems: binary, octal, decimal, hexadecimal

### Arithmetic and Formulas
- [[Simple Interest Compound Interest]] — interest calculations and financial mathematics
- [[Permutation Combination Formulas]] — counting principles and combinatorics
- [[Sequence and Series]] — arithmetic and geometric progressions
- [[Exponential and Logarithm Formulas]] — exponential functions and logarithm rules
- [[Calculus Formulas]] — derivatives, integrals, and key calculus results
- [[Trigonometric Formulas]] — trigonometric identities and formulas
- [[Geometric Formulas and Theorem]] — geometric results and key theorems
- [[Complex Numbers]] — complex number algebra and representation
- [[Coordinate Geometry]] — coordinate geometry in 2D and 3D

### Linear Algebra
- [[03 - Notes/Matrix|Matrix]] — matrix definitions, operations, and types
- [[Matrix Qs]] — practice questions on matrix operations
- [[Determinants]] — determinant calculation and properties
- [[Determinants Qs]] — practice questions on determinants
- [[Rank of a Matrix]] — rank of a matrix and its significance
- [[Rank of a Matrix Qs]] — practice questions on matrix rank

### Probability
- [[Probability Introduction]] — sample space, events, and basic probability axioms
- [[Probability Keywords]] — key terms and definitions in probability
- [[Event Operations]] — union, intersection, and complement of events
- [[Conditional Probability]] — conditional probability and independence
- [[Baye's Theorem]] — Bayes' theorem and its applications
- [[Coin]] — probability problems involving coin tosses
- [[Dice]] — probability problems involving dice
- [[Cards]] — probability problems involving playing cards
- [[Box Urn Bag type problems]] — classical urn model probability problems

### Random Variables
- [[Random Variable Overview]] — definition and types of random variables
- [[PMF]] — probability mass function for discrete random variables
- [[Distributions]] — probability distributions (Binomial, Poisson, Normal)

### Discrete Mathematics
- [[Discrete Mathematics Introduction]] — introduction to discrete mathematics and its scope
- [[Set Theory]] — sets, subsets, power sets, and set operations
- [[Relations]] — relations on sets, properties, and types
- [[03 - Notes/Functions|Functions]] — functions as special relations, types and properties
- [[POSET]] — partially ordered sets and lattice theory
- [[Group Theory]] — algebraic structures, groups, and their properties

### Graph Theory
- [[Graph Theory]] — graphs, vertices, edges, and fundamental graph definitions
- [[Graph Traversal]] — BFS and DFS traversal algorithms on graphs
- [[Matching]] — matching in bipartite and general graphs
- [[Line Covering]] — line covering and vertex covering in graph theory
- [[Network Reliability]] — reliability and connectivity in network graphs
- [[Planer, Non-Planer Graphs]] — planarity, Euler's formula, and Kuratowski's theorem
- [[Tree_DM]] — trees in the context of discrete mathematics and graph theory

### Simple & Compound Interest
```dataview 
LIST
FROM ([[Maths]] AND [[Finance]]) 
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

### Probability
```dataview 
LIST
FROM [[probability]]
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

### Statistics
```dataview 
LIST
FROM [[statistics]] 
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

### Graph Theory
```dataview 
LIST
FROM [[Graph]] AND [[Maths]]
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

### Set Theory 

```dataview 
LIST
FROM [[Set]]
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

### Linear Algebra

```dataview 
LIST
FROM [[Maths]] and -([[probability]] or [[statistics]] or [[Set]] or [[Graph]] or [[DLD]])
WHERE contains(file.folder, "03 - Notes")
SORT file.mtime DESC
```

---
# Related Tags 

[[Maths]] ; [[GATE]] ; [[probability]] ; [[statistics]] ; [[Set]] ; [[Graph]] ; [[DSA]] ; [[Finance]]

---
# Related Research 

-

---
# Related Projects 

-

---
# Open Questions
> What do you still not understand in this domain? What would the next paper or project need to address?

- How does eigenvalue decomposition in linear algebra directly connect to PCA in machine learning?
- What is the complete probability model underlying a neural network's loss function?
- How does graph theory connect to the tracking algorithms used in multi-camera surveillance?

---
# References 

-
