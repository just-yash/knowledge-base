
Type : #Note    
Date :  2025-12-23  
Tags :   [[DSA]] ; [[GATE]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Algorithm Basics
> Q) Find the Largest Number Among Three Numbers?
> 
> Start
> Read the three numbers to be compared, as A, B and C.
> Check if A is greater than B.
> 	If true, then check if A is greater than C.
> 		If true, print 'A' as the greatest number.
		If false, print 'C' as the greatest number.
	If false, then check if B is greater than C.
		If true, print 'B' as the greatest number.
		If false, print 'C' as the greatest number.
    End
>   
> ![[Pasted image 20251223134715.png]]

```c
#include <stdio.h>
int main()
{
	intA, B, C;
	printf("Enter the numbers A, B and C: ");
	scanf("%d %d %d", &A, &B, &C);
	if (A >= B && A >= C)
		printf("%d is the largest number.", A);
	if (B >= A && B >= C)
		printf("%d is the largest number.", B);
	if (C >= A && C >= B)
		printf("%d is the largest number.", c);
	return 0;
```

- In Mathematics & Comp Sci, an Algorithm is a **finite sequence** of **well defined, computer-implementable instructions**, typically to solve a class of problems or to perform a **computation**. A step by step procedure. 
- Algorithms are **unambiguous specifications** for performing **calculations, data processing, automated reasoning** and other tasks. 
- Will accept **Zero or more input**, but generate **at least one output**.
- Every instruction in algo should be effective

# Problem Solving Cycle
- Define Problem : Understand Problem 
- Constraints & Conditions
- **Design Strategies (Algorithmic Strategy)**
- Express & Develop the algo
- Validation (Dry Run)
- **Analysis (Space & Time Analysis)**
- Coding
- Testing & Debugging 
- Installation 
- Maintenance

# Need of Analysis 
- Performance Comparison between different algo to figure out which one is best possible option. 
- Parameters which are considered while analysis of algorithm: 
	- **Time** (Most Important)
	- **Space**
	- Bandwidth
	- Register
	- Battery Power

# Type of Analysis

| Aspect              | Experimental(A Posterior) Analysis                | Apriori (Asymptotic) Anaysis                              |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| Timing              | Performed after code implementation and execution | Done before implementation, purely theoretical            |
| Result Type         | Measures actual time or space usage               | Estimated time or space complexity                        |
| Influencing Factors | Hardware, Software, Environment, etc.             | Independent of hardware or software factors               |
| Accuracy            | Provides exact, real world results                | Provides approximate, theoretical results                 |
| Use Case            | Useful for real-world performance comparision     | Useful for analysis algorithm efficiency for large inputs |

^f7c166

- First we do Theoretical (Asymptotic) Analysis than we do Practical (A Posterior) Analysis

---
## 🔗 Connections

- Hungarian Algorithm (optimal matching) is used in → [[Multi-Object Tracking]]
- argmax and ANN search operations appear in → [[Face Matching]]
- Triplet mining is a combinatorial search problem → [[FaceNet]]
- Algorithmic strategy underlies → [[Sorting]]

---
# References 

1. [Algorithm GATE YouTube Lecture](https://www.youtube.com/watch?v=aaHL0KygWqE)
2. [Algorithm Book](cormen-introduction-to-algorithms.pdf)
3. [Algorithm Notes PDF - knowledgeGATE](Algorithm.pdf)