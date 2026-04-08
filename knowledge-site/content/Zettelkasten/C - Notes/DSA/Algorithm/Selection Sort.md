
Date :  2025-12-23  
Tags :   [[Sort]] ; [[DSA]]  
~ ***Yash Agrawall*** ~  

---
# Selection Sort
- Divides the input list into two part
	- a sorted sub-list of items which is built up from left to right at the front(left) of the list.
	- a unsorted sub-list of the remaining items that occupy the rest of the list.
- Selection Sort sorts from the beginning.
- Selection-based sort
	- if there are n elements
		- sub-lists 1 : 1 sorted ; n-1 unsorted 
		- sub-lists 2 : 2 sorted ; n-2 unsorted
		- 
		- 
		- 
		- sub-lists n - 1 : n - 1 sorted ; 1 unsorted == n sorted ; 0 unsorted 
![[Pasted image 20251223155433.png]]
```python
l = list(map(int, input("Enter the list: ").split()))

def selectionSort(a):
    for i in range(len(a)):
        loc = i
        for j in range(i + 1, len(a)):
            if a[loc] > a[j]:  
                loc = j
        a[i], a[loc] = a[loc], a[i]
        
selectionSort(l)
print(l)
```

> Time Complexity : O(n<sup>2</sup>)
> 	internal for loop: O(n)
> 	external for loop: O(n)
> 	nested for loops: O((n<sup>2</sup>)

### Selection Sort(Analysis)
- Depends on Structure 
- Internal sort Algorithm
	- here we declared two other variables, but this doesn't change with the no. of elements. 
- Unstable sort Algorithm
- **Best** and **Worst** case Time Complexity = O(n<sup>2</sup>)
- Algorithmic Approach: Selection-based sort

---
# Questions
###### <span style="color:rgb(0, 176, 240)">Q1)</span> Which one of the following is the tightest upper bound that represents the number of swaps required to sort n numbers using selection sort? <span style="color:rgb(255, 192, 0)">(Gate-2013) (1 Marks)</span>

or 
###### What is the number of swaps required to sort n elements using selection sort, in the worst case? <span style="color:rgb(255, 192, 0)">(Gate-2009) (1 Marks)</span>
###### A) O(log n)

###### B) O(n)

###### C) O(n log n)

###### D) O(n<sup>2</sup>)

<span style="color:rgb(0, 176, 240)">A1)</span>   <span style="color:rgb(146, 208, 80)">B) O(n)</span>
The Q is not asking the time complexity.
Its asking the no. of swaps required. 
In selection sort for each iteration we do 1 swap in the worst case. Hence, in the worst case we will do n no. of swaps. 


---
# Summary 





---
# References 

1. [[Sorting]]
2. [Selection Sort - YouTube Lecture](https://youtu.be/aaHL0KygWqE?si=ha9NIwW-vtT-b37o&t=2154)
3. [Algorithm Book](cormen-introduction-to-algorithms.pdf)
4. [Algorithm Notes PDF - knowledgeGATE](Algorithm.pdf)
