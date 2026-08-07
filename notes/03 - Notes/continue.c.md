
Type : #Note    
Date :  2026-02-17  
Tags :   [[C]] ; [[jump statements]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# continue.c
- `continue` is a [[jump statements|jump statement]] that causes the current iteration of the nearest enclosing [[loop]] to terminate immediately and transfers control to the next iteration of that [[loop]].
- it does not exit the [[loop]]
- Syntax : `continue;`
- it takes no arguments 
- semicolon `;` mandatory

---
# Rules
- `continue` is valid only inside [[loop|loops]]
- its invalid in [[switch-case.c|switch-case]] unless the `switch` itself is inside a [[loop]]
- `continue` skips the remaining statements in the current iteration of the nearest enclosing loop.
- `continue` jumps to condition check
- Statements below `continue` are skipped

---
###### Examples : 
###### `continue` in [[while.c|while loop]]
```c
int i = 0;

while (i < 5)
{
    i++;
    if (i == 3)
        continue;
    printf("%d ", i);
}

// 1 2 4 5
```

###### `continue` in [[do-while.c|do-while loop]]
```c
int i = 0;

do
{
    i++;
    if (i == 3)
        continue;
    printf("%d ", i);
}
while (i < 5);

// 1 2 4 5 
```

###### `continue` in [[for.c|for]] 
```c
for (int i = 0; i < 5; i++)
{
    if (i == 2)
        continue;
    printf("%d ", i);
}

// 0 1 3 4
```

###### `continue` in [[nested_loop.c|nested loop]]
```c
for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        if (j == 1)
            continue;
        printf("%d %d\t", i, j);
    }
}

// 0 0    0 2    1 0    1 2    2 0    2 2    
```
 
# [[break.c|break]] v/s `continue`

|Aspect|`continue`|`break`|
|---|---|---|
|Exits loop|❌|✅|
|Skips iteration|✅|❌|
|Executes update in `for`|✅|❌|
|Exits switch|❌|✅|
|Control strength|Weak|Strong|

---
###### Q1) Find the output
```c
for (i = 1; i <= 10; i++){
	if (i == 5)
	continue;
	if (i == 5)
	break;
	printf("%d ", i);
}
```

A1) `1 2 3 4 6 7 8 9 10 `
- `continue` executes
- Control jumps immediately to update step (`i++`)
- The next `if (i == 5)` is never reached
- Once `continue` executes, nothing below it in the loop body runs for that iteration.
---
###### Q2) Find the Output
```c
for (i = 1; i <= 10; i++){
	if(i == 5)
	break;
	if(i == 5)
	continue;
	printf("%d ", i);
}
```

A2) `1 2 3 4 `
- At `i == 5`, `break` executes first
- Loop terminates immediately
- `continue` is unreachable

---
# Summary 

- `continue` is a jump statement that skips the **remaining statements of the current iteration** of the nearest enclosing loop.
    
- It does **not terminate the loop**.
    
- Control transfers to:
    
    - the **update expression** in a `for` loop
        
    - the **condition check** in `while` and `do-while`
        
- `continue` is valid only inside loops.
    
- It is invalid in `switch` unless the `switch` is inside a loop.
    
- Statements written after `continue` in the same iteration are **never executed**.
    
- In nested loops, `continue` affects only the **innermost loop**.
    
- Order of `continue` and `break` statements is critical and can completely change output.
    
- `continue` provides fine-grained iteration control, whereas `break` performs immediate loop termination.

---
# References 

1. [YouTube Lecture](https://youtu.be/Tfm_CKYkyq4?si=2Q3Del7QTDiafmKz)