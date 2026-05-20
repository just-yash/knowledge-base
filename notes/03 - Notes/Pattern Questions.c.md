
Type : #Note    
Date :  2026-02-18  
Tags :   [[C]] ; [[loop]] ; [[jump statements]] ; [[conditional]]
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# Pattern Questions.c

1. Count the number of lines (rows) and use one outer loop for them.
2. Find the relation between the line number and the number of characters in that line.
3. Find the relation between the line number and the number of spaces in that line.
4. Apply separate loops to print characters and spaces.
   (Steps 2 and 3 may be interchanged depending on the pattern.)


---
**Every pattern problem is just this:**

1. One loop decides the row
2. For each row, decide:
    - how many spaces
    - how many symbols / numbers
3. Print each part separately

> Each row must be solvable independently. If a row depends on previous rows → you’re doing it wrong (for patterns). 
> Try solving mathematically.
---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# How to think?
1. **Count rows**
2. **Pick one row in the middle**
3. Ask:
    - “How many things are in this row?”
4. Express that as a formula
5. Then write loops

Loops come **last**, not first.

---
# Questions

###### Q1) 
```c
|
||
|||
||||
|||||
```

A1) 
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 5; i++){
		for (j = 1; j <= i; j++){
			printf("|");
		}
		printf("\n");
	}
}
```

---
###### Q2) 
```c
1
12
123
1234
12345
```

A2)
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 5; i++){
		for (j = 1; j <= i; j++){
			printf("%d", j);
		}
		printf("\n");
	}
}
```

---
###### Q3)
```c
1
22
333
4444
55555
```

A3)
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 5; i++){
		for (j = 1; j <= i; j++){
			printf("%d", i);
		}
		printf("\n");
	}
}
```

---
###### Q4) 
```c
1
2 3
4 5 6
7 8 9 10
```

A4)
```c
#include <stdio.h>

int main(){
    int i, j, x = 1;
    for (i = 1; i <= 4; i++){
        for (j = 1; j <= i; j++){
            printf("%d ", x);
            x++;            
        }
        printf("\n");
    }
}
```

---
###### Q5) 
```c
|||||
||||
|||
||
|
```

A5)
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 5; i++){
		for (j = 5; j >= i; j--){
			printf("|");
		}
		printf("\n");
	}
}
```

---
###### Q6) 
```c
|
||
|||
||||
|||
||
|
```

A6)
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 4; i++){
		for (j = 1; j <= i; j++){
			printf("|");
		}
		printf("\n");
	}
	for (i = 1; i <= 3; i++){
		for (j = 3; j >= i; j--){
			printf("|");
		}
		printf("\n");
	}
}
```
or
```c
#include <stdio.h>

int main(){
	int i, j;
	for (i = 1; i <= 7; i++){
		if (i <= 4){
			for (j = 1; j <= i; j++){
				printf("|");
			}
		}
		else{
			for (j = 7; j >= i; j--){
				printf("|");
			}
		}
		printf("\n");
	}
}
```

---
###### Q7
```c
4321
432
43
4
43
432
4321
```

A7)
```c
#include <stdio.h>

int main(){
    int i, j, k;
    for (i = 1; i <= 7; i++){
        if(i <= 4){
            for (j = 4; j >= i; j--){
                printf("%d", j);
            }
        }
        else {
            for (j = 2, k = 4; j < i - 1; j++){
                printf("%d", k);
                k--;
            }
        }
        printf("\n");
    }
}
```
a better way to do this would be : 
```c
#include <stdio.h>

int main(void)
{
    int i, j, limit;
    for (i = 1; i <= 7; i++) {
        if (i <= 4)
            limit = i;
        else
            limit = 8 - i;
        for (j = 4; j >= limit; j--) {
            printf("%d", j);
        }
        printf("\n");
    }
    return 0;
}
```

---
###### Q8) 
```c
1234
123
12
1
12
123
1234
```

A8)
```c
#include <stdio.h>

int main(){
	int i, j, k;
	for (i = 1; i <= 7; i++){
		if (i <= 4){
			for (j = 4, k = 1; j >= i; j--){
				printf("%d", k++);
			}
		}else{
			for (j = 2, k = 1; j <= i - 2; j++ ){
				printf("%d", k++);
			}
		}
		printf("\n");
	}
}

```
better way to do it: 
```c
#include <stdio.h>

int main(){
    int i, j, k;
    for (i = 1; i <= 7; i++){
        k = i <= 4? 5 - i : i - 3;
        for (j = 1; j <= k; j++){
            printf("%d", j);
        }
        printf("\n");
    }
}
```

---
###### Q9) 
```c
1234
 123
  12
   1
  12
 123
1234
```

A9)
```c
#include <stdio.h>

int main(){
	int i, j, k;
	for (i = 1; i <= 7; i++){
		if (i <= 4){
			for (j = 1; j < i; j++)
				printf(" ");
			for (j = 4, k = 1; j >= i; j--)
				printf("%d", k++);
		}
		else{
			for (j = 7; j > i; j--)
				printf(" ");
			for (j = 4, k = 1; j <= i; j++)
				printf("%d", k++);
		}
		printf("\n");
	}
}
```
better way to do it:
```c
#include <stdio.h>

int main(){
    int i, j, k, l;
    for (i = 1; i <= 7; i++){
        k = i <= 4? i - 1 : 7 - i ;
        l = i <= 4? 5 - i : i - 3;
        for (j = 0; j < k; j++){
            printf(" ");
        }
        for (j = 1; j <= l; j++){
            printf("%d", j);
        }
        printf("\n");
    }
}
```

---
###### Q10)
```c
|     |
||   ||
||| |||
|||||||
```

A10)

| quantifiers | total rows | total columns | no. of "\|" in left pattern row wise | no. of spaces row wise | no. of "\|" in right pattern row wise |
| ----------- | ---------- | ------------- | ------------------------------------ | ---------------------- | ------------------------------------- |
| values      | 4          | 7             | 1 : 2 : 3 : 4                        | 5 : 3 : 1 : 0          | 1 : 2 : 3 : 3                         |

```c
#include <stdio.h>
  
int main(){
    int i, j, k, l, m, n;
    n = 4; // total no. of rows
    for (i = 1; i <= n; i++){
        k = i;                       // left |
        l = 2*(n - i) - 1;            // spaces
        m = i == n? n - 1 : i;       // right |
        for (j = 1; j <= k; j++)
            printf("|");
        for (j = 1; j <= l; j++)
            printf(" ");
        for (j = 1; j <= m; j++)
            printf("|");
        printf("\n");
    }
}
```

---
###### Q11)
```c
|||||||
||| |||
||   ||
|     |
```

A11) 

| quantifiers | total rows | total columns          | no. of "\|" in left pattern row wise | no. of spaces row wise | no. of "\|" in right pattern row wise |
| ----------- | ---------- | ---------------------- | ------------------------------------ | ---------------------- | ------------------------------------- |
| values      | 4          | 7 (2 × total rows - 1) | 4 : 3 : 2 : 1                        | 0 : 1 : 3 : 5          | 3 : 3 : 2 : 1                         |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, m, n;
    n = 4; // total no. of rows
    for (i = 1; i <= n; i++){
        k = n - i + 1;                  // left |
        l = i == 1? 0 : 2*i - n + 1;    // spaces
        m = i == 1? n - 1: n - i + 1;   // right |
        for (j = 1; j <= k; j++)
	        printf("|");
        for (j = 1; j <= l; j++)
	        printf(" ");
        for (j = 1; j <= m; j++)
	        printf("|");
        printf("\n");

    }
}
```

---
###### Q12)
```c
abcdefgabcdef
abcdef abcdef
abcde   abcde
abcd     abcd
abc       abc
ab         ab
a           a
```

A12)

| quantifiers | total rows | total columns           | no. of  letters in left sub pattern, row wise | no. of spaces row wise     | no. of  letters in right sub pattern, row wise |
| ----------- | ---------- | ----------------------- | --------------------------------------------- | -------------------------- | ---------------------------------------------- |
| values      | 7          | 13 (2 × total rows - 1) | 7 : 6 : 5 : 4 : 3 : 2 : 1                     | 0 : 1 : 3 : 5 : 7 : 9 : 11 | 6 : 6 : 5 : 4 : 3 : 2 : 1                      |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, m, n;
    n = 7; // total no. of rows
    char c = 'a';
    for (i = 1; i <= n; i++){
       k = n - i + 1;
       l = i == 1? 0 : 2*i - 3;
       m = i == 1? n - 1: n - i + 1;
       for (j = 0; j < k; j++)
	       printf("%c", c + j);
       for (j = 1; j <= l; j++)
	       printf(" ");
       for (j = 0; j < m; j++)
	       printf("%c", c + j);
       printf("\n");
    }
}
```

---
###### Q13)
```c
abcdefgfedcba
abcdef fedcba
abcde   edcba
abcd     dcba
abc       cba
ab         ba
a           a
```

A13)
```c
#include <stdio.h>

int main(){
    int i, j, k, l, m, n;
    n = 7; // total no. of rows
    char c = 'a';
    for (i = 1; i <= n; i++){
       k = n - i + 1;                   // left
       l = i == 1? 0 : 2*i - 3;         // spaces
       m = i == 1? n - i - 1: n - i;    // right
       for (j = 0; j < k; j++)
	       printf("%c", c + j);
       for (j = 1; j <= l; j++)
	       printf(" ");
       for (j = m; j >= 0; j--)
	       printf("%c", c + j);
       printf("\n");
    }
}
```

---
###### Q14) 
```c
   *
  * *
 * * *
* * * *
```

A14)

| quantifers | total rows | total columns          | spaces pattern | * pattern     |
| ---------- | ---------- | ---------------------- | -------------- | ------------- |
| value      | 4          | 7 (2 × total rows - 1) | 3 : 2 : 1 : 0  | 1 : 2 : 3 : 4 |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, n;
    n = 4; // total no. of rows
    for (i = 1; i <= n; i++ ){
        k = n - i;    // spaces
        l = i;        // pattern 
        for (j = 1; j <= k; j++)
            printf(" ");
        for (j = 1; j <= l; j++)
            printf("* ");
        printf("\n");
    }
}
```

---
###### Q15) 
```c
* * * *
 * * *
  * *
   *
```

A15)

| quantifers | total rows | total columns          | spaces pattern    | * pattern     |
| ---------- | ---------- | ---------------------- | ----------------- | ------------- |
| value      | 4          | 7 (2 × total rows - 1) | 0 : 1 : 2 : 3 : 4 | 4 : 3 : 2 : 1 |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, n;
    n = 4; // total no. of rows
    for (i = 1; i <= n; i++ ){
        k = i - 1;      // spaces
        l = n - i + 1;  // pattern
        for (j = 1; j <= k; j++)
            printf(" ");
        for (j = 1; j <= l; j++)
            printf("* ");
        printf("\n");
    }

}
```

---
###### Q17)
```c
* * * *
 * * *
  * *
   * 
  * *
 * * *
* * * *
```

A17)

| quantifiers | total rows | total columns | spaces pattern            | pattern decreasing        |
| ----------- | ---------- | ------------- | ------------------------- | ------------------------- |
| value       | 7          | 7             | 0 : 1 : 2 : 3 : 2 : 1 : 0 | 4 : 3 : 2 : 1 : 2 : 3 : 4 |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, n;
    n = 7; // total rows
    for (i = 1; i <= n; i++){
        k = i <= 4 ? i - 1 : n - i;      // spaces
        l = i <= 4 ? 5 - i : i - 3;      // pattern
        for (j = 1; j <= k; j++)
            printf(" ");
        for (j = 1; j <= l; j++)
            printf("* ");
        printf("\n");
    }
}
```

---
###### Q18) 
```c
   *
  * *
 * * *
* * * *
 * * *
  * *
   *
```

A18)

| quantifiers | total rows | total columns | spaces pattern            | pattern decreasing        |
| ----------- | ---------- | ------------- | ------------------------- | ------------------------- |
| value       | 7          | 7             | 3 : 2 : 1 : 0 : 1 : 2 : 3 | 1 : 2 : 3 : 4 : 3 : 2 : 1 |

```c
#include <stdio.h>

int main(){
    int i, j, k, l, n;
    n = 7; // total rows
    for (i = 1; i <= n; i++){
        k = i <= 4 ? 4 - i : i - 4 ;
        l = i <= 4 ? i : n - i + 1 ;
        for (j = 1; j <= k; j++)
            printf(" ");
        for (j = 1; j <= l; j++)
            printf("* ");
        printf("\n");
    }
}
```


---
# Summary 

- Pattern problems are **not about loops first**, they are about **row-wise mathematics**.
    
- Every pattern can be solved by treating **each row independently**.
    
- The general strategy is:
    
    1. Fix the **number of rows** (outer loop).
        
    2. For each row, compute:
        
        - number of **leading spaces**
            
        - number of **symbols / numbers / characters**
            
    3. Use **separate loops** to print each part.
        
- Never let one row depend on the previous row’s output.
    
- Patterns must be solved **mathematically**, not incrementally.
    
- For symmetric patterns:
    
    - Split the pattern into **top half and bottom half**, or
        
    - Use conditional formulas (`i <= mid ? ... : ...`).
        
- Total columns are often:
    
    - `2 × rows - 1` for centered patterns.
        
- Use **ternary operators** to simplify symmetric logic.
    
- Use **independent counters** (`k`, `l`, `m`) to avoid loop coupling.
    
- Characters and numbers follow the same logic as symbols — only the print expression changes.
    
- Complex patterns are combinations of:
    
    - increasing + decreasing sequences
        
    - left + right sub-patterns
        
    - spaces + content blocks
        
- Once the formula is correct, loops become mechanical.
    

> **Golden rule:**  
> If you can describe a row using math, you can print the pattern.



---
# References 

1. [[Control Structures.c]]
2. [YouTube Lecture](https://youtu.be/amQloA2ebuU?si=Pn84ap4P1RSoq7yC)
	1. The Teacher taught in a way that wasn't algorithmically good.
	2. Learnt Mathematical way of pattern printing with the help of ChatGPT