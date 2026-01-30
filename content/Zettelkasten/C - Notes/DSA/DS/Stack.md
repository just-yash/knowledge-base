
Date :  27-11-2025  
Tags :   [[DSA]]   

---
# Stack
- Non-primitive linear data structure 
- Ordered list in which addition of new item(push) and deletion of already existing data(pop) item is done from only one end know as the top of stack (TOS).
![[Pasted image 20251127195805.png]]
> Think of a magazine of bullets.
> > You can add bullets from one end, bullets come out of the same end
> > The bullet to go in is the last one to come out of the magazine.
> > ![[Pasted image 20251221141606.png]]

- Element which is added last will be the first to be removed and the element which was inserted first will be removed in last.
- This is called **LIFO (Last In First Out) or FILO (First In Last Out)**
- In stack **insertion(PUSH)** and **deletion(POP)** of elements are performed from the same end, called the **Top Of Stack(TOS)**.
- Most frequently accessible element is the stack is the top most element
- Least accessible element is the bottom most element of the stack.
- Used widely for tasks like function call management, expression evaluation and undo operations in software. 

---
## Application of Stack
- **Expression Parsing**: Stack helps evaluate and check programming expressions, ensuring balanced parentheses.
- **Back tracing**: Used in algorithms like maze-solving and the "Eight Queens" puzzle. 
- **Function Calls**: Manage function details during in programming languages.
- **Undo feature**: Implement undo in text editors and browsers
- **Syntax Checking**: Compliers use stacks to match syntax elements like 'if' with 'else'.
- **Postfix Evaluation**:
- **Reversing Strings**: POP Operation reverses the string.

---
# Stack Implementation
- Can be Implemented in two ways
	- Static Implementation
	- Dynamic Implementation

---
## Static(Array) Implementation of Stack
- Here Array is used to create stack.
- Simple technique but not flexible as size has to be declared during program design
- Size implementation is not efficient with respect to memory utilization.
![[Pasted image 20251128120208.png]]

---
## Dynamic(Linked List) Implementation of Stack
- Here linked list is used to create stack
- uses pointer to implement the stack type of data structure
- more flexible and efficient with respect to memory utilization
![[Pasted image 20251128120331.png]]

---
# PUSH Operation
- The process of adding new element to the top of stack
- After every push operation the top is incremented by one. 
- **Stack Overflow Condition**: in case the array is full and no new element can be accommodated.
- Time Complexity : O(1)
```c
// using array(static implementation)
void push(int stack[], int *top, int size, int value) {
    if (*top == size - 1) {
        printf("Stack Overflow\n");
        return;
    }
    (*top)++; // first we increment the pointer than we insert the element
    stack[*top] = value;
}
```

```c
// using linkedlist (dynamic implementation)
void push(struct Node **top, int value) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = *top;
    *top = newNode;
}
```

# POP Operation
- The process of deleting elements from the top of stack.
- After every POP operation the stack is decremented by one
- **Stack Underflow Condition**: if there is no element in the stack and POP operation is requested 
- Time Complexity: O(1)

```c
// using array (static implementation)
int pop(int stack[], int *top) {
    if (*top == -1) {
        printf("Stack Underflow\n");
        return -1;   // indicates failure
    }
    int poppedValue = stack[*top];
    (*top)--;       // first we access the element, then decrement top
    return poppedValue;
}
```

```c
// using linked list (dynamic implementation)
int pop(struct Node **top) {
    if (*top == NULL) {
        printf("Stack Underflow\n");
        return -1;   // indicates failure
    }
    struct Node *temp = *top;
    int poppedValue = temp->data;
    *top = temp->next;
    free(temp);
    return poppedValue;
}
```

---
# Arithmetic Expression
![[Pasted image 20251223133057.png]]
There are three common Notations: 
1. **Infix Notation** : most familiar form, used in everyday maths. : A + B
2. **Prefix Notation** : introduced by Polish logician Jan Lukasiewicz in 1924 : + A B
3. **Postfix Notation** : Reverse Polish Notation : A B +
	- Widely used in Computer Systems
	- Well-suited for Computational Processes
	- Design of Arithmetic Logic Units (ALUs) within CPUs
	- Expressions entered into a computer are usually converted to postfix notation, stored in a stack and then evaluated

## Postfix Notation using Stack

### Infix to Postfix:
1. Scan Left to Right
2. Push operands into the stack as they are
3. Pop the no. of operands depending on the type of operator you encounter
	- if you encounter a binary operator, say '+' then pop two elements from the stack.
	- if you encounter a unary operator, say 'factorial' then pop one element from the stack.
4. In case of a binary operator, the 1st element popped from the stack will be the 2nd operand and the 2nd element will be the 1st operand.
	- eg: stack: a b ; operator: +     then it will be 'b + a' and not 'a + b'
5. after popping out the necessary elements, push the value after evaluating the formed expression back into the stack. 

### Prefix to Postfix:
1. Scan Right to Left
2. Push operands into the stack as they are
3. Pop the no. of operands depending on the type of operator you encounter
	- if you encounter a binary operator, say '+' then pop two elements from the stack.
	- if you encounter a unary operator, say 'factorial' then pop one element from the stack
4. In case of a binary operator, the 1st element popped from the stack will be the 1st operand and the 2nd element will be the 2nd operand.
	- eg: stack: a b ; operator: +       then it will be 'a + b' and not 'b + a'
5. After popping out the necessary elements, push the value after evaluating the formed expression back into the stack.

---
# Recursion

> The theory is less, but this Topic is very Important. Practice as many Qs as you can.

- Where a function calls itself to solve a problem. 
- It requires two essential elements:
	- A base condition to stop the recursion.
	- Logic to solve the problem step-by-step.
- A function is recursive if it invokes itself within its own definition. 
- It is particularly useful for solving problems involving repetitive tasks or iterations in reverse order. 
- Types of Recursion:
	- **Direct Recursion**: When a function calls itself directly. It can be:
		- **Tail Recursion**: The recursive call is the last statement in the function.
		- **Head Recursion**: The recursive call occurs before other operations.
	- **Indirect Recursion**: When two or more functions call each other in a cycle.
- Recursion is an alternative to iteration, and both techniques are used to repeatedly execute a function.
- Its better to solve recursion using [[3 - Zettelkasten/C - Notes/DSA/DS/Tree|Tree]] 

## Fibonacci Series
- Each number is the sum of the two preceding ones, starting from 0 & 1. 
- commonly denoted by $F_{n}$ or `f(n)`
- $F_{0} = 0$
- $F_{1} = 1$
- $F_{n} = F_{n-1} + F_{n-2}$ $for$ $n > 1$

The trouble begins when you compute it _recursively_ without remembering anything. If you compute `f(100)` using the plain recursive definition, the computer doesn’t “know” it has already computed `f(98)` somewhere else. It recomputes the same values again and again. This creates an enormous recursion tree.

**Dynamic Programming** : Never compute the same subproblem twice.
This can be implemented in two ways:
1. **Memorization** (*top-down*) : Store `f(n)` the first time you compute it. Future calls just look it up
2. **Tabulation**(*bottom-up*) : Compute `f(0)` , `f(1)` , `f(2)`  , … , `f(n)` iteratively. 

- with Dynamic programming:
	- Time complexity becomes O(n)
	- No. of additions becomes O(n-1)
	- No. of function calls becomes O(n) (or zero recursion at all)


| n                         | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  |
| ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| f(n)                      | 0   | 1   | 1   | 2   | 3   | 5   | 8   | 13  | 21  | 34  | 55  |
| no. of invocation<br>i(n) | 1   | 1   | 3   | 5   | 9   | 15  | 25  | 41  | 67  | 109 |     |
| no. of addition<br>a(n)   | 0   | 0   | 1   | 2   | 4   | 7   | 12  | 20  | 33  | 54  | 88  |

- $if$ $(n == 0)$ $;$ $F_{n} = 0$
- $if$ $(n == 1)$ $;$ $F_{n} = 1$
- $if$ $(n > 1)$ $;$ $F_{n} = F_{n-1} + F_{n-2}$

- $if$ $(n == 0)$ $;$ $i(n) = 1$
- $if$ $(n == 1)$ $;$ $i(n) = 1$
- $if$ $(n > 1)$ $;$ $i(n) = i(n-1) + i(n-2) + 1$
  The extra + 1 comes when the function call itself. Every `f(n)` makes two recursive calls except the base cases, plus the call you are currently in. 
- $for$ $all$ $n$ $;$ $i(n) = 2F_{n+1} - 1$

- $if$ $(n == 0)$ $;$ $a(n) = 0$
- $if$ $(n == 1)$ $;$ $a(n) = 0$
- $if$ $(n > 1)$ $;$ $a(n) = a(n-1) + a(n-2) + 1$

## Tower of Hanoi / Brahma
- It is a classic mathematical puzzle consisting of three rods and a set of disks of varying sizes. 
- The puzzle starts with the disks stacked on one rod in ascending order, forming a conical shape.
- Objective : Move the entire stack of disks to another rod while following these rules:
	- Only one disk can be moved at a time
	- A disk can only be placed on an empty rod or a larger disk
	- No larger disk can be placed on top of a smaller disk
- ![[Pasted image 20260113164618.png]]

- In order to shift $n$ no. of disks from Origin to Destination → first shift $n-1$ disks from origin to Mid-Tower. Only then can the $n^{th}$ disk be shifted to the Destination.
- Total no. of disk movements to shift $n$ no. of disks = $2^n-1$
- Total no. of function calls = $2^{n+1}-1$















---




























---
# Questions
###### <span style="color:rgb(0, 176, 240)">Q1)</span> Q Choose the correct alternatives (more than one may be correct) and write the corresponding letters only: The following sequence of operations is performed on a stack:
###### PUSH (10), PUSH (20), POP, PUSH (10), PUSH (20), POP, POP, POP, PUSH (20), POP. 
###### The sequence of values popped out is ? <span style="color:rgb(255, 192, 0)">(GATE - 1991) (2 Marks)</span>

###### a) 20,10,20,10,20
###### b) 20,20,10,10,20
###### c) 10,20,20,10,20
###### d) 20,20,10,20,10

<span style="color:rgb(0, 176, 240)">A1</span><span style="color:rgb(0, 176, 240)">)</span>  <span style="color:rgb(146, 208, 80)">b) 20,20,10,10,20</span>

---
###### <span style="color:rgb(0, 176, 240)">Q2)</span> Which of the following is true about linked list implementation of stack?
###### (A) In push operation, if new nodes are inserted at the beginning of linked list, then in pop operation, nodes must be removed from end.
###### (B) In push operation, if new nodes are inserted at the end, then in pop operation, nodes must be removed from the beginning.
###### (C) Both of the above
###### (D) None of the above

<span style="color:rgb(0, 176, 240)">A2)</span>  <span style="color:rgb(146, 208, 80)">(D) None of the above</span>

---
###### <span style="color:rgb(0, 176, 240)">Q3</span><span style="color:rgb(0, 176, 240)">)</span> A single array A[1 ... MAXSIZE] is used to implement two stacks. The two stacks grow from opposite ends of the array. Variables top<sub>1</sub> and top<sub>2</sub> (top<sub>1</sub>< top<sub>2</sub>) point to the location of the topmost element in each of the stacks. If the space is to be used efficiently, the condition for "stack full" is<span style="color:rgb(255, 192, 0)"> (G</span><span style="color:rgb(255, 192, 0)">ATE - 2004) (2 Marks) [Asked in Goldman Sachs 2018]</span>
###### (A) (top<sub>1</sub> = MAXSIZE/2) and (top<sub>2</sub> = MAXSIZE/2+1)
###### (B) top<sub>1</sub> + top<sub>2</sub> = MAXSIZE
###### (C) (top<sub>1</sub> = MAXSIZE/2) or (top<sub>2</sub> = MAXSIZE)
###### (D) top<sub>1</sub>= top<sub>2</sub>-1

<span style="color:rgb(0, 176, 240)">A3)</span>  <span style="color:rgb(146, 208, 80)"> (D) top<sub>1</sub>= top<sub>2</sub>-1</span>

---
###### <span style="color:rgb(0, 176, 240)">Q4)</span> Let S be a stack of size n >= 1. Starting with the empty stack, suppose we push the first n natural numbers in sequence, and then perform n pop operations. Assume that Push and Pop operation take X seconds each, and Y seconds elapse between the end of one such stack operation and the start of the next operation. For m >= 1, define the stack-life of m as the time elapsed from the end of Push(m) to the start of the pop operation that removes m from S. The average stack-life of an element of this stack is <span style="color:rgb(255, 192, 0)">(GATE - 2003) (2 Marks)</span>

###### (A) n(X+ Y)

###### (B) 3Y + 2X

###### (C) n(X + Y)-X

###### (D) Y + 2X

<span style="color:rgb(0, 176, 240)">A4)</span>   <span style="color:rgb(146, 208, 80)">(C) n(X + Y)-X</span>

---
###### <span style="color:rgb(0, 176, 240)">Q5)</span> Which of the following permutations can be obtained in the output (in the same order) using a stack assuming that the input is the sequence 1, 2, 3, 4, 5 in that order? <span style="color:rgb(255, 192, 0)">(GATE - 1994) (2 Marks)</span>
###### a) 3, 4, 5, 1, 2

###### b) 3, 4, 5, 2, 1

###### c) 1, 5, 2, 3, 4

###### d) 5, 4, 3, 1, 2

<span style="color:rgb(0, 176, 240)">A5)</span>   <span style="color:rgb(146, 208, 80)">b) 3, 4, 5, 2, 1</span>

---
###### <span style="color:rgb(0, 176, 240)">Q6)</span> If the input sequence is 5, 4, 3, 2, 1 then identify the wrong stack permutation (possible pop sequence)? 
###### a) 4, 2, 1, 3, 5 
###### b) 5, 2, 3, 4, 1 
###### c) 4, 5, 1, 2, 3 
###### d) 3, 4, 5, 2, 1

<span style="color:rgb(0, 176, 240)">A6) </span><span style="color:rgb(146, 208, 80)">e) None of the Above</span>
All are possible push pop sequence 

---
###### <span style="color:rgb(0, 176, 240)">Q7)</span> Assume that the operators +, -, x are left associative and ^ is right associative. The order of precedence (from highest to lowest) is ^, x, +, -. The postfix expression corresponding to the infix expression a + b x c -d ^ e ^ f is<span style="color:rgb(255, 192, 0)"> (GATE - 2004) (2 Marks)</span>

###### (A) a b c x + d e f ^ ^ -

###### (B) a b c x + de ^ f ^ -

###### (C) ab + c × d - e ^f ^

###### (D) - + a x b c ^ ^ d e f

<span style="color:rgb(0, 176, 240)">A7) </span>  <span style="color:rgb(146, 208, 80)">(A) a b c x + d e f ^ ^ -</span>
a + b x c - d _^ e f ^_
a + b x c - _d e f ^ ^_
a + _b c x_ - _d e f ^ ^_
_a b c x +_ - _d e f ^ ^_
_a b c x + d e f ^ ^ -_

---
###### <span style="color:rgb(0, 176, 240)">Q8)</span> The postfix expression for the infix expression A + B * ( C + D ) / F + D * E is: <span style="color:rgb(255, 192, 0)">(GATE - 1995) (2 Marks)</span>
###### a) A B + C D + * F / D + E *

###### b) A B C D + * F / D E * + +

###### c) A * B + C D / F * D E + +

###### d) A + * B C D / F * D E + +

<span style="color:rgb(0, 176, 240)">A8)</span> <span style="color:rgb(146, 208, 80)">A B C D + * F / + D E * </span><span style="color:rgb(146, 208, 80)"> +</span>
A + B * _C D +_ / F + D * E
A + _B C D + *_ *F /* + *D E *
A B C D + * F / + D E * +

---
###### <span style="color:rgb(0, 176, 240)">Q9)</span> Consider an expression log(x!) , convert it into both prefix and postfix notation.

<span style="color:rgb(0, 176, 240)">A9)</span> 
prefix: <span style="color:rgb(146, 208, 80)">log ! x</span>
postfix: <span style="color:rgb(146, 208, 80)">x ! log</span>

---
###### <span style="color:rgb(0, 176, 240)">Q10)</span> Compute the postfix equivalent of the following expression. <span style="color:rgb(255, 192, 0)">(GATE - 1998) (2 Marks)</span>
###### 3 * log (x + 1) - a/2

<span style="color:rgb(0, 176, 240)">A10)</span>  
3 * log _(x 1 + )_ - a/2
3 * _x 1 + log_ - a/2
_3 x 1 + log *_ - _a 2 /_
_<span style="color:rgb(146, 208, 80)">3 x 1 + log * a 2 / -</span>_

---
###### <span style="color:rgb(0, 176, 240)">Q11)</span> The result evaluating the postfix expression 10 5 + 60 6 / * 8 - is? <span style="color:rgb(255, 192, 0)">(GATE - 2015) (1 Marks)</span>
###### (A) 284
###### (B) 213
###### (C) 142
###### (D) 71

<span style="color:rgb(0, 176, 240)">A11)</span>   <span style="color:rgb(146, 208, 80)"> (C) 142</span>

| steps | stack             |
| ----- | ----------------- |
| 10    | 10                |
| 5     | 5<br>10           |
| +     | 10 + 5 = 15       |
| 60    | 60<br>15          |
| 6     | 6 <br>60<br>15    |
| /     | 60 / 6 = 10<br>15 |
| *     | 15 * 10 = 150     |
| 8     | 8<br>150          |
| -     | 150 - 8 = 142     |

---
###### <span style="color:rgb(0, 176, 240)">Q12)</span> The following postfix expression with single digit operands is evaluated using a stack 8 2 3 ^ / 2 3 * + 5 1 * - .Note that ^ is the exponentiation operator. The top two elements of the stack after the first * is evaluated are: <span style="color:rgb(255, 192, 0)">(GATE - 2007) (2 Marks) [ Asked in Hexaware 2017 ]</span>
###### (A) 6, 1
###### (B) 5, 7
###### (C) 3, 2
###### (D) 1, 5

<span style="color:rgb(0, 176, 240)">A12)</span>   <span style="color:rgb(146, 208, 80)">(A) 6, 1</span>

| steps | stack          |
| ----- | -------------- |
| 8     | 8              |
| 2     | 2<br>8         |
| 3     | 3<br>2<br>8    |
| ^     | 2^3 = 8<br>8   |
| /     | 8 / 8 = 1      |
| 2     | 2<br>1         |
| 3     | 3<br>2<br>1    |
| *     | 2 * 3 = 6<br>1 |

---
###### <span style="color:rgb(0, 176, 240)">Q13)</span> The result evaluating the postfix expression:   8 2 3 * 1 / + 4 1 * 2 / +

<span style="color:rgb(0, 176, 240)">A13)</span>   <span style="color:rgb(146, 208, 80)">16</span>

| steps | stack           |
| ----- | --------------- |
| 8     | 8               |
| 2     | 2<br>8          |
| 3     | 3<br>2<br>8     |
| *     | 2 * 3 = 6<br>8  |
| 1     | 1<br>6<br>8     |
| /     | 6  / 1 = 6<br>8 |
| +     | 8 + 6 = 14      |
| 4     | 4<br>14         |
| 1     | 1<br>4<br>14    |
| *     | 4 * 1 = 4<br>14 |
| 2     | 2<br>4<br>14    |
| /     | 4 / 2 = 2<br>14 |
| +     | 14 + 2 = 16     |

---
###### <span style="color:rgb(0, 176, 240)">Q14)</span> The result evaluating the prefix expression 
###### + + 8 / * 2 3 1 / * 4 1 2

<span style="color:rgb(0, 176, 240)">A14)</span>    <span style="color:rgb(146, 208, 80)">16</span>

| steps | stack               |
| ----- | ------------------- |
| 2     | 2                   |
| 1     | 1<br>2              |
| 4     | 4<br>1<br>2         |
| *     | 4 * 1 = 4<br>2      |
| /     | 4 / 2 = 2           |
| 1     | 1<br>2              |
| 3     | 3<br>1<br>2         |
| 2     | 2<br>3<br>1<br>2    |
| *     | 2 * 3 = 6<br>1<br>2 |
| /     | 6 / 1 = 6<br>2      |
| 8     | 8<br>6<br>2         |
| +     | 8 + 6 = 14<br>2     |
| +     | 14 + 2 = 16         |

---
###### <span style="color:rgb(0, 176, 240)">Q15)</span> to evaluate an expression without any embedded function calls: <span style="color:rgb(255, 192, 0)">(GATE - 2002) (1 Marks)</span>
###### (A) One Stack is enough
###### (B) Two Stacks are needed
###### (C) As many stacks as the height of the expression tree are needed
###### (D) A Turing machine is needed is the general case

<span style="color:rgb(0, 176, 240)">A15)</span>   <span style="color:rgb(146, 208, 80)">(A) One Stack is enough </span>

---
###### <span style="color:rgb(0, 176, 240)">Q16)</span> Find the output of the following pseudo codes
```pseudo
void main()
{
	fun(4)
}

void fun(int x)
{
	if(x > 0)
	{
		printf("%d", x);
		fun(x - 1);
	}
}
```

<span style="color:rgb(0, 176, 240)">A16)</span>    

<span style="color:rgb(146, 208, 80)">4  3  2  1</span>
![[Pasted image 20260103185330.png]]
```pseudo
void main()
{
	fun(4);
}

void fun(int x)
{
	if(x > 0)
	{
		fun(x -1);
		printf("%d", x);
	}
}
```


<span style="color:rgb(146, 208, 80)">1  2  3  4</span>
![[Pasted image 20260103190053.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q17)</span> Find the output of the following pseudo code:
```pseudo
void main()
{
	fun();
}

void fun(int x)
{
	if (x > 0)
	{
		printf("%d", x);
		fun(x - 1);
		printf("%d", x);
		fun(x - 1);
		printf("%d", x);
	}
}
```

<span style="color:rgb(0, 176, 240)">A17)</span> 
fun(3) = <span style="color:rgb(146, 208, 80)">3 2 1 1 1 2 1 1 1 2 3 2 1 1 1 2 1 1 1 2 3</span>
fun(2) = 2 1 1 1 2 1 1 1 2
fun(1) = 1 1 1



![[Pasted image 20260103192720.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q18)</span> Find the output of the following pseudo code on n = 6?
```pseudo 
int x(int n)
{
	if(n < 3)
		return 1;
	else
		return x(n-1) + x(n-1) + 1;
}
```

<span style="color:rgb(0, 176, 240)">A18)</span>  <span style="color:rgb(146, 208, 80)">  31</span>
n = 6

x(6) = x(5) + x(5) + 1
x(5) = x(4) + x(4) + 1
x(4) = x(3) + x(3) + 1
x(3) = x(2) + x(2) + 1
x(2) = 1

x(3) = 1 + 1 + 1 = 3
x(4) = 3 + 3 + 1 = 7
x(5) = 7 + 7 + 1 = 15 
x(6) = 16 + 16 + 1 = 31

---
###### <span style="color:rgb(0, 176, 240)">Q19)</span> Consider the following recursive C function that takes two arguments
```c
unsigned int foo(unsigned int n, unsigned int r)
{
	if(n > 0)
		return(n%r + foo(n/r, r));
	else
		return 0;
}
```
###### What is the return value of the function foo when it is called as foo (345, 10)? <span style="color:rgb(255, 192, 0)">(GATE - 2011) (2 Marks)</span>

###### (A) 345
###### (B) 12
###### (C) 5
###### (D) 3

<span style="color:rgb(0, 176, 240)">A19)</span>    <span style="color:rgb(146, 208, 80)">(B) 12</span>

3 + 4 + 5 = 12

We can the pattern, Its basically the sum of all the digits of n.

![[Pasted image 20260112200533.png]]
###### What is the return value of the function foo when it is called as foo(513, 2)? <span style="color:rgb(255, 192, 0)">(GATE - 2011) (2 Marks)</span>
###### (A) 9
###### (B) 8
###### (C) 5
###### (D) 2

<span style="color:rgb(0, 176, 240)">A19)</span> <span style="color:rgb(146, 208, 80)"> </span><span style="color:rgb(146, 208, 80)">(D) 2</span>
1 + 1 = 2
![[Pasted image 20260112202252.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q20)</span> Consider the following ANSI C function :int SomeFunction (int x, int y) <span style="color:rgb(255, 192, 0)">(GATE - 2021) (2 Marks)</span>
~~~~c
int SomeFunction (int x, int y)
{
	if ((x == 1) ||(y == 1))
		return 1;
	if (x == y)
		return x;
	if (x>y)
		return SomeFunction(x-y, y);
	if (y > x)
		return SomeFunction (x, y-x);
}
~~~~
###### The value returned by SomeFunction(15, 255) is _ _ _ _ .

<span style="color:rgb(0, 176, 240)"><span style="color:rgb(0, 176, 240)">A20)</span></span>  <span style="color:rgb(146, 208, 80)">15</span>

![[Pasted image 20260112204148.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q21)</span> Consider the following ANSI C program <span style="color:rgb(255, 192, 0)">(GATE - 2021) (2 Marks)</span>
```c
#include <stdio.h>
int foo(int x, int y, int q)
{
	if ((x <= 0) && (y <= 0))
		return q;
	if (x <= 0)
		return foo(x, y-q, q);
	if (y <= 0)
		return foo(x-q, y, q);
	return foo(x, y-q, q) + foo(x-q, y, q);
}
int main()
{
	int r = foo(15, 15, 10);
	printf("%d", r);
	return 0;
}
```

###### The output of the program upon execution is _ _ _ _

<span style="color:rgb(0, 176, 240)">A21)</span>  <span style="color:rgb(146, 208, 80)">60</span>

![[Pasted image 20260113000418.png]]

---
###### <span style="color:rgb(0, 176, 240)">Q22)</span> Consider the following recursive C function. If get (6) function is being called in main() then how many times will the get () function be invoked before returning to the main ()? <span style="color:rgb(255, 192, 0)">GATE - 2015) (2 Marks)</span>
```
void get (int n)
{
	if (n < 1)
		return;
	get(n-1);
	get(n-3);
	printf ("%d", n);
}
```
###### (A) 15
###### (B) 25
###### (C) 35
###### (D) 45

<span style="color:rgb(0, 176, 240)">A22)</span>  <span style="color:rgb(146, 208, 80)">(B) 25</span>
g(-2) , g(-1) , g(-2) → 1
g(1) → 3
g(2) → 5
g(3) → 7
g(4) → 11
g(5) → 17
g(6) → 25
![[Pasted image 20260113001928.png]]

---














---
# Summary 





---
# References 

1. [[Data Structures Basics]]
2. [Stack YouTube Lecture](https://youtu.be/2o2vX0ZqQ_Y?si=UQzdiuEXQyM9s6pH&t=6038)
3. [Data Structures Notes PDF](ds_gate.pdf)