
Date :  2025-12-23
Tags :   [[DSA]] ; [[Sort]]
~ ***Yash Agrawall*** ~

---
# Bubble / Shell / Sinking Sort
- Compares adjacent elements and swaps them through the list.
- Pass through the list is repeated until the list is sorted
- Bubble sort sorts from the end.
- Exchange Sort
	- We compare two adjacent elements and swap them
	- these two elements are relatively sorted.
##### Using nested for loop:
```python
l = list(map(int, input("Enter the list: ").split()))

def bubbleSortFor(a):
     for i in range(len(a)):
          for j in range(len(a) -i -1):
               if a[j] > a[j + 1]:
                    a[j],a[j+1] = a[j+1],a[j]

bubblesort(l)
print(l)
```

##### Using while loop:
```python
# Using while loop:
k = list(map(int, input("Enter the list: ").split()))

def bubbleSortWhile(a):
    n = len(a)
    swapped = True

    while swapped:
        swapped = False
        for i in range(n - 1):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True

bubbleSortWhile(k)
print(k)
```

**Worst Case Time Complexity** : O(n<sup>2</sup>)
> Time Complexity : O(n<sup>2</sup>)
> >internal for loop: O(n)
> >external for loop: O(n)
> >nested loops: O((n<sup>2</sup>)

**Best Case Time Complexity** : O(n)

- Depends on both Structure and Content
- Internal Sort Algorithm
- Stable Sort Algorithm 
- Algorithmic Approach : Subtract and Conquer

## Conclusion
- **Efficiency**: Bubble Sort performs poorly in real-world scenarios
	- Insertion Sort and Selection Sort have the same complexity but are faster.
- **Practical Use**: Used mostly for Educational Purposes.
- **Comparison with Efficient Algorithms**: Heap Sort and Merge Sort are preferred in real-world applications and are used in sorting libraries of languages like Python and Java.
- **Best Case**: Best case scenario → list is already sorted; Bubble sort has a time complexity of O(n) ↔ Benefit over algorithms that continue their full sorting process even in best cases.



---
# Questions




---
# Summary 





---
# References 

1. [[Sorting]]
2. [Bubble Sort YouTube Lecture](https://youtu.be/aaHL0KygWqE?si=Korr85Hp2mf11jQf&t=3270)
3. [Algorithm Book](3%20-%20Zettelkasten/D%20-%20Annexure/PDFs/cormen-introduction-to-algorithms.pdf)
4. [Algorithm Notes PDF - knowledgeGATE](3%20-%20Zettelkasten/D%20-%20Annexure/PDFs/Algorithm.pdf)
