
Date :  2026-01-01  
Tags :   [[DSA]] ; [[Sort]]  
~ ***Yash Agrawall*** ~  

---
# Insertion Sort
- **Process**: Removes one element from the input at a time, finds its correct position in the sorted list and inserts it there.
- **Repetition**: Process repeats until no input elements are left

```python
l = list(map(int, input("Enter the list: ").split()))

def insertionSort(a):
    for i in range (1,len(a)):
        key = a[i]
        j = i - 1
        while (j>-1 and a[j]>key):
            a[j+1] = a[j]
            j = j - 1
        a[j + 1] = key
        
insertionSort(l)
print(l)
```

- Depends on both structure and content.
	- even if the list is already sorted, for loop will run and hence it is depended on the structure →  time complexity : O(n)
	- the inside while loop depends on the content
		- if the list is already sorted → time complexity : O(1)
		- if the list is not sorted → time complexity : O(n)
- Time Complexities : 
	- Best Case : O(n)
	- Worst Case : O(n<sup>2</sup>) 
- Internal Sort algorithm 
- Stable Sort Algorithm
- Algorithmic Approach : Subtract and Conquer

# Conclusion
- Less Efficient for Large Lists:
	- Compared to advanced algorithms like [[Heap Sort]], [[Merge Sort]] ; both have a time complexity of O(nlog(n))
- Best quadratic algorithm ([[Selection Sort]] and [[Bubble Sort]]) → Performs well on small data and is more efficient than them.
- Practical Use : Despite its inefficiency on large lists ; It is useful for smaller or nearly sorted datasets.


---
# Questions




---
# Summary 





---
# References 

