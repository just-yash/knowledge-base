
Date :  25-11-2025
Tags :   [[DSA]] 
~ ***Yash Agrawall*** ~

---
# Linked List
>Its like a train
>>the engine is the main node and the coaches are the subsequent nodes

- Consists of *elements* called *nodes*
- nodes are connected in a *linear sequence* 
- Each node consists of two parts
	- data
	- reference to the next node
- *first part* contains the *information part* of the node, which can store *any type of data*.
- *second part* is called the *linked field* or *next pointer field*, it contains the *address of the next node of the list*
![[Pasted image 20251127103227.png]]
- excellent way to use *non contiguous storage space*.
- the *pointer of the last node* contains a *null pointer*, which is an *invalid address(0 or -ve value)*
- the linked also consists a list pointer variable called *start/first/head* which contains the *address of the first node* in the list
- *special case*: list that has *no nodes*, its called a *null list* or *empty list* and is denoted by a *null pointer in the variable start/first/head*.

### Implementation of Linked List
```cpp
struct node
{
	int data;
	struct node *next;
};
```

### Advantages of a Linked List
- **Dynamic size and efficient memory usage**: 
	- Can easily grow or shrink
	- allowing for efficient memory allocation and *reduced waste as elements* are added or removed.
- **Fast insertion and deletion**:
	- Operations like *inserting or removing elements* can be *performed in constant time (O(n))*.
	- If the position is knows, it *offers better performance* compared to array-based structures.
- **Versatility**: 
	- Can be adapted to *various types ( singly , double , circular )*
	- Can *store elements of different data types* or objects, providing a flexible data structure for a wide range of applications
### Disadvantages of a Linked List
- **Slower Access Times**: 
	- Linked List have a *higher time complexity for element access (O(n))* compared to arrays
	- elements must be *accessed sequentially from the head of the list*.
	- no way to traverse to the required element directly
- **Memory Overhead**:
	- Each node *requires additional memory* to *store the reference(or pointer) to the next node*, increasing the overall memory usage 
- **Pointer Manipulation**:
	- Implementing linked list *involves managing pointers*
	- This *increases code complexity* and leads to potential issues such as *memory leaks* or *segmentation faults*, if not handled carefully.

| Aspects            | Array                                          | Linked List                                                            |
| ------------------ | ---------------------------------------------- | ---------------------------------------------------------------------- |
| Memory Allocation  | Contiguous memory locations                    | Non-contiguous memory locations                                        |
| Size Flexibility   | Fixed Size                                     | Dynamic Size                                                           |
| Access Time        | O(1) for direct access due to indexing         | O(n) for assessing an element as it requires traversal                 |
| Insertion/Deletion | O(n) in worst case as shifting may be required | O(1) if the pointer to the node is known                               |
| Memory Efficiency  | More memory efficient for a known size of data | Extra memory for pointers, which can be overhead for small data sizes. |
| Versatility        | Can only store a single type of data           | Can store different types of data                                      |
```c
#include <stdio.h>
#include <stdlib.h>
//define the node structure
typedef struct Node
{
	int data;
	struct Node* next;
}Node;

Node* createNode(int data)
{
	Node* newNode = (Node*) malloc(sizeof(Node));
	if (!newNode)
	{
		printf("Memory error\n");
		exit(1);
	}
	newNode->data = data;
	newNode->next = NULL;
	return newNode;
}
```

```c
int main ()
{
	Node* head = createNode(10);
	head->next = createNode(20);
	head->next->next = createNode(30);
	printf("Linked List: ");
	traverseList(head);
	return 0;
}
```

##### Q) Write a C-style pseudocode for traversing a link list iteratively, where pointer head have the address of the first node of the list?
iteratively -> You take a pointer, move it along one node at a time until you fall off the list.
```c
void traverseList(Node* head)
{
	Node*current = head;
	while (current != NULL)
	{
		printf("%d->", current -> data);
		current = current -> next;
	}
	print("NULL\n");
}
```
Traits of iterative traversal
- Uses a **single pointer variable**.
- **No function call overhead**.
- **No risk of stack overflow** (unless the list is absurdly huge).
- Very **efficient** in memory.
- Easy to debug mentally.
##### Q) Write a C-style pseudocode for traversing a link list recursively, where pointer head have the address of the first node of the list?
Each function call handles one node, then calls the next one.
```c
void traverseListRecursive(Node* current)
{
	if (current == NULL)
	{
		printf("NULL\n");
		return;
	}
	printf("%d->", current->data);
	traverseListRecursive(current->next);
}
```
Traits of recursive traversal
- Cleaner, shorter code.
- Closer to the _mathematical_ definition of a linked list.
- But each call uses **stack memory**.
- Risk of **stack overflow** if the list is very long (say 10⁵+ nodes).
- Harder to debug if recursion scares you.

**In terms of performance**
- Both visit every node once.
- **Time complexity:** O(n) for both  
- **Memory complexity:**
	- Iterative → O(1) extra space
	- Recursive → O(n) extra space (because n function calls)

##### Q) Write a C-style pseudocode for searching a key in a link list iteratively where pointer head have the address of the first node of the list?
```c
Node* searchKeylterative(Node* head, int key)
{
	Node* current = head;
	while (current != NULL)
	{
		if (current->data == key)
		{
			return current;
		}
		current = current->next;
	}
	return NULL;
} 
```

##### Q) Write a C-style pseudocode for searching a key in a list recursively, where pointer head have the address of the first node of the list?
```c
Node* searchKeyRecursive(Node* current, int key)
{
	if(current == NULL)
	{
		return NULL;
	}
	if (current->data == key)
	{
		return current;
	}
	return searchKeyRecursive(current->next, key);
}
```

##### Q) Write a C-style pseudocode for inserting a node with a key on the starting of linked list?
```c
void insertAtBeginning(Node**head, int key)
{
	Node* newNode = createNode(key);
	newNode->data = key;
	newNode->next = *head;
	*head = newNode;
}
```

##### Q) Write a C-style pseudocode for inserting a node with a key after a location in a link-list?
```c
void insertAfter(Node* prevNode, int key)
{
	if (prevNode == NULL)
	{
		printf("The given previous node cannot be NULL.\n");
		return;
	}
	Node* newNode = createNode(key);
	newNode->data = data;
	newNode->next = prevNode->next;
	prevNode->next = newNode;
}
```

##### Q) Write a C-style pseudocode for deleting a node from the starting of the link-list?
```c
void deleteAtBeginning(Node ** head)
{
	if (*head == NULL)
	{
		printf("List is already empty.\n");
		return;
	}
	Node* temp = *head;
	*head =(*head)->next;
	free(temp);
}
```

##### Q) Write a C-Style pseudocode for deleting a node after a given location from the starting of the link-list?
```c
void deleteAfter(Node* prevNode)
{
	if (prevNode == NULL | | prevNode->next == NULL)
	{
		printf("The given node is NULL or there's no node after it to delete.\n");
		return;
	}
	Node* temp = prevNode->next;
	prevNode->next = temp->next;
	free(temp);
}
```

##### Q) Write a C-style pseudocode for the reversal of a linked list iteratively?
```c
void reverseListIterative(Node ** head)
{
	Node* prev = NULL;
	Node* current = *head;
	Node* next = NULL;
	while (current != NULL)
	{
		next = current->next;
		current->next = prev;
		prev = current;
		current = next;
	}
	*head = prev;
}
```

##### Q) Write a C-style pseudocode for the reversal of a linked list recursively?
```c
Node* reverseListRecursive(Node* head)
{
	if (head == NULL || head->next == NULL)
	{
		return head;
	}
	Node* rest = reverseListRecursive(head->next);
	head->next->next = head;
	head->next = NULL;
	return rest;
}
```

##### Q) The following C function takes a single-linked list of integers as a parameter and rearranges the elements of the list. The function is called with the list containing the integers 1, 2, 3, 4, 5, 6, 7 in the given order. What will be the contents of the list after the function completes execution?
```c
struct node
{
	int value;
	struct node *next;
};
void rearrange(struct node *list)
{
	struct node *p, * q;
		int temp;
	if ((!list) || !list->next)
		return;
	p = list;
	q = list->next;
	while(q)
	{
		temp = p->value;
		p->value = q->value;
		q->value = temp;
		p = q->next;
		q = p ? p->next:0;
	}
}
```
> Solution : 2 1 4 3 6 5 7

##### Q) The Following C function takes a simply linked list as input argument. It modifies the list by moving the last element to the front of the list and returns the modified list. Some part of the code is left blank. Choose the correct alternative to replace the blank line. 
```c
{
	int value;
	struct node *next;
}Node;

Node *move_to_front(Node *head)
{
	Node *p, *q;
	if ((head == NULL: || (head->next == NULL))
		return head;
	q = NULL; p = head;
	while (p-> next != NULL)
	{
		q = p;
		p = p->next;
	}
	________________________________
	return head;
}


(A) q =NULL; p->next = head; head = p;
(B) q->next = NULL; head = p; p->next = head;
(C) head =p; p->next = q; q->next = NULL;
(D) q->next = NULL; p->next = head; head = p;
```
> Solution :  D

##### Q) What is the output of the following function for start pointing to first node of following linked list? 1->2->3->4->5->6
```c
void fun(struct node* start)
{
	if(start == NULL)
		return;
	printf("%d ", start->data);
	if(start->next != NULL )
		fun(start->next->next);
	printf("%d ", start->data);
}


(A) 146641
(B) 135135
(C) 1235
(D) 135531
```
> Solution : D

## Header Link List
- A *variation of standard linked* list that includes a *special node called the header node, at the beginning of the list*.
- The *header node does not store any actual data*; instead, it *serves as a fixed reference point* that simplifies some operations on the linked list.
- The *header node is always present* even when the list is empty.
- The *header node's 'next' pointer points to the first actual data node* in the list or 'NULL' if the list is empty.
- The header node *simplifies operations like insertion or deletion* at the beginning middle or end of the list, as well as *traversal*, since the *header node acts as a consistent starting point*.
- The header node *can also store metadata about the list*, such as its length, although this is not a requirement. 
 ![[Pasted image 20251127103042.png]]
```cpp
void traverseHeaderLinkedList(Node* header)
{
	if (header==NULL)
	{
		printf("List is empty.\n");
		return;
	}
	Node* temp = header->next;
	while(temp != NULL)
	{
		printf("%d->", temp->data);
		temp = temp->next;
	}
	printf("NULL\n");
}
```

## Circular Linked List
- Singly Circular linked list is a variation of a singly linked list in which the *last node in the list points back to the first node*, creating a loop or circular structure.
- The *last node's NULL pointer refers to the first node* in the list rather than being NULL.
- Singly Circular linked list can be *used to implement data structures like queues or circular buffers*, where *elements are added to the end and removed from the front*, with *constant-time complexity for both operations*.
- *Traversal of the list requires a stopping condition*, such as iterating until you reach the starting node again or using a counter to limit the number of iterations, to avoid infinite loops.
![[Pasted image 20251127103133.png]]
```cpp
void traverseCircularLinkedList(Node* head)
{
	if (head == NULL)
	{
		printf("List is empty.\n");
		return;
	}
	Node* temp = head;
	do
	{
		printf("%d -> ", temp->data);
		temp = temp->next;
	}
	while (temp != head);
	printf("%d (head)\n", head->data);
}
```

## Header Circular Linked List
- Contains a special node called the *header node at the starting of the linked list*
- The *last node points back to the first node* which is the Header node.
- It has the benefits of both types of linked list.
```cpp
void traverseHeaderCircularLinkedList(Node* header)
{
	if (header->next == header)
	{
		printf("List is empty.\n");
		return;
	}
	Node* temp = header->next;
	while (temp != header)
	{
		printf("%d -> ", temp->data);
		temp = temp->next;
	}
	printf("HEADER\n");
}
```

## Doubly Link List
- Each node contains *a data element and two pointers*
	- One pointing to the *previous node* (the 'previous' pointer)
	- The other pointing to the *next node* (the 'next' pointer)
- This *bidirectional linking* allows for *easier traversal* and *manipulation* of the list in *both forward and backward directions*, as well as *insertion or deletion of nodes at any position in the list*.
- The *first node's previous pointer* and the *last node's next pointer* are set to *NULL*
	- indicating the *beginning and the end of the list*, respectively. 
- Doubly linked list *consume more memory* than singly linked lists *due to the additional 'previous' pointer*.
![[Pasted image 20251127104145.png]]
```c
#include <stdio.h>
#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

// Pointer to head of list
struct Node* head = NULL;

// Function to create a new node
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

// Insert at beginning
void insertAtBeginning(int value) {
    struct Node* newNode = createNode(value);

    if (head == NULL) {
        head = newNode;
        return;
    }

    newNode->next = head;
    head->prev = newNode;
    head = newNode;
}

// Insert at end
void insertAtEnd(int value) {
    struct Node* newNode = createNode(value);

    if (head == NULL) {
        head = newNode;
        return;
    }

    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }

    temp->next = newNode;
    newNode->prev = temp;
}

// Delete a node with a given value
void deleteNode(int value) {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }

    struct Node* temp = head;

    // Find the node
    while (temp != NULL && temp->data != value) {
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Value not found.\n");
        return;
    }

    // If deleting head
    if (temp == head) {
        head = temp->next;
        if (head != NULL)
            head->prev = NULL;
    } else {
        temp->prev->next = temp->next;
        if (temp->next != NULL)
            temp->next->prev = temp->prev;
    }

    free(temp);
}

// Traverse forward
void displayForward() {
    struct Node* temp = head;
    printf("Forward: ");
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

// Traverse backward
void displayBackward() {
    if (head == NULL) return;

    struct Node* temp = head;

    // Move to the last node
    while (temp->next != NULL) {
        temp = temp->next;
    }

    printf("Backward: ");
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->prev;
    }
    printf("\n");
}

int main() {
    insertAtBeginning(10);
    insertAtBeginning(20);
    insertAtEnd(30);
    insertAtEnd(40);

    displayForward();
    displayBackward();

    printf("Deleting 30...\n");
    deleteNode(30);

    displayForward();
    displayBackward();

    return 0;
}
```
##### Q Consider the following function that takes reference to head of a Doubly Linked List as parameter. Assume that a node of doubly linked list has previous pointer as previous and next pointer as next.
```c
void fun(struct node **head_ref)
{
    struct node *temp = NULL;
    struct node *current = *head_ref;
    while (current != NULL)
    {
        temp = current->prev;
        current->prev = current->next;
        current->next = temp;
        current = current->prev;
    }
    if(temp != NULL )
        *head_ref = temp->prev;
}
```
##### Assume that reference of head of following doubly linked list is passed to above function 1 <--> 2 <--> 3 <--> 4 <--> 5 <--> 6
##### What should be the modified linked list after the function call?
(A) 2 <--> 1 <--> 4 <--> 3 <--> 6 <--> 5
(B) 5 <--> 4 <--> 3 <--> 2 <--> 1 <--> 6
(C) 6 <--> 5 <--> 4 <--> 3 <--> 2 <--> 1
(D) 6 <--> 5 <--> 4 <--> 3 <--> 1 <--> 2

## Circular Doubly Linked List
![[Pasted image 20251127105002.png]]
- combination of both circular and Doubly type of linked list
```c
#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};

struct Node* head = NULL;

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = newNode->prev = NULL;
    return newNode;
}

// Insert at the end of the circular doubly linked list
void insertEnd(int value) {
    struct Node* newNode = createNode(value);

    if (head == NULL) {
        head = newNode;
        head->next = head;
        head->prev = head;
        return;
    }

    struct Node* last = head->prev;

    last->next = newNode;
    newNode->prev = last;
    newNode->next = head;
    head->prev = newNode;
}

// Display forward
void displayForward() {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }

    struct Node* temp = head;
    printf("Forward: ");

    do {
        printf("%d ", temp->data);
        temp = temp->next;
    } while (temp != head);

    printf("\n");
}

// Display backward
void displayBackward() {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }

    struct Node* temp = head->prev;
    printf("Backward: ");

    do {
        printf("%d ", temp->data);
        temp = temp->prev;
    } while (temp != head->prev);

    printf("\n");
}

// Delete a specific value
void deleteNode(int value) {
    if (head == NULL) return;

    struct Node* temp = head;

    while (temp->data != value) {
        temp = temp->next;
        if (temp == head) {
            printf("Value not found.\n");
            return;
        }
    }

    // Case: Only one node left
    if (temp->next == head && temp->prev == head) {
        head = NULL;
        free(temp);
        return;
    }

    temp->prev->next = temp->next;
    temp->next->prev = temp->prev;

    // Deleting the head node
    if (temp == head)
        head = temp->next;

    free(temp);
}

int main() {
    insertEnd(10);
    insertEnd(20);
    insertEnd(30);
    insertEnd(40);

    displayForward();   // 10 20 30 40
    displayBackward();  // 40 30 20 10

    deleteNode(20);

    displayForward();   // 10 30 40
    displayBackward();  // 40 30 10

    return 0;
}
```

## Header Circular Doubly Linked List
![[Pasted image 20251127110128.png]]
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *prev;
    struct Node *next;
} Node;

// Create header node (empty list)
Node* createHeader() {
    Node *header = (Node*)malloc(sizeof(Node));
    if (!header) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    header->next = header;  // circular to itself
    header->prev = header;
    return header;
}

// Create a normal data node
Node* createNode(int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        printf("Memory allocation failed\n");
        exit(1);
    }
    newNode->data = data;
    newNode->next = newNode->prev = NULL;
    return newNode;
}

// Insert at end (before header)
void insertEnd(Node *header, int data) {
    Node *last = header->prev;   // last node (or header if empty)
    Node *newNode = createNode(data);

    newNode->next = header;
    newNode->prev = last;

    last->next = newNode;
    header->prev = newNode;
}

// Insert at beginning (after header)
void insertBeginning(Node *header, int data) {
    Node *first = header->next;  // first node (or header if empty)
    Node *newNode = createNode(data);

    newNode->next = first;
    newNode->prev = header;

    header->next = newNode;
    first->prev = newNode;
}

// Delete first occurrence of key
void deleteNode(Node *header, int key) {
    Node *temp = header->next;

    while (temp != header && temp->data != key) {
        temp = temp->next;
    }

    if (temp == header) {
        printf("Key %d not found\n", key);
        return;
    }

    temp->prev->next = temp->next;
    temp->next->prev = temp->prev;

    free(temp);
}

// Display list forward
void displayForward(Node *header) {
    Node *temp = header->next;
    if (temp == header) {
        printf("List is empty\n");
        return;
    }

    printf("Forward: ");
    while (temp != header) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

// Display list backward
void displayBackward(Node *header) {
    Node *temp = header->prev;
    if (temp == header) {
        printf("List is empty\n");
        return;
    }

    printf("Backward: ");
    while (temp != header) {
        printf("%d ", temp->data);
        temp = temp->prev;
    }
    printf("\n");
}

// Free entire list (including header)
void freeList(Node *header) {
    Node *curr = header->next;
    while (curr != header) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    free(header);
}

int main() {
    Node *header = createHeader();

    insertEnd(header, 10);
    insertEnd(header, 20);
    insertBeginning(header, 5);
    insertEnd(header, 30);

    displayForward(header);
    displayBackward(header);

    deleteNode(header, 20);
    displayForward(header);

    freeList(header);
    return 0;
}
```

## Polynomial Representation Using Linked List
- Each node should consist of 3 elements
	- *coefficient* : value of the coefficient of the term.
	- *exponent* : exponent value of that term
	- *link to the next term* : address to the next term in the polynomial
![[Pasted image 20251127191741.png]]
- In case of multiple variables:
![[Pasted image 20251127192326.png]]

# # Time and Space Complexity of Linked List
> (Assume singly linked list with n nodes)

| Operation                                   | Time Complexity | Why / Reasoning                               |
| ------------------------------------------- | --------------- | --------------------------------------------- |
| Access / Get element                    | O(n)        | No indexing → must traverse from head.        |
| Search                                  | O(n)        | Must compare each node until found.           |
| Insertion at Beginning                  | O(1)        | Just change pointers.                         |
| Insertion at End (without tail pointer) | O(n)        | Must traverse to last node.                   |
| Insertion at End (with tail pointer)    | O(1)        | Tail directly available.                      |
| Insertion after Known Node Pointer      | O(1)        | No traversal needed.                          |
| Deletion at Beginning                   | O(1)        | Move head pointer forward.                    |
| Deletion at End (without prev pointer)  | O(n)        | Must traverse to reach last and its previous. |
| Deletion after Known Node Pointer       | O(1)        | Pointer adjustment only.                      |

# Space Complexity
- Linked list storage → **O(n)**
- Extra memory for pointers → **more overhead than arrays.**
---
# Questions




---
# Summary 





---
# References 

1. [[Data Structures Basics]]
2. [Linked List YouTube Lecture](https://youtu.be/2o2vX0ZqQ_Y?si=o4rZs-HoADxcvmNV&t=20185)
3. [Data Structures Notes PDF](ds_gate.pdf)