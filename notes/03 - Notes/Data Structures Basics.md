
Type : #Note    
Date :  25-11-2025    
Tags :   [[DSA]] ; [[GATE]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
**Computer Science** is all about solving problems by designing **algorithms** what can be converted into efficient programs. The key challenge is optimizing **time** and **space**. (Time being the most important)

**Data Structure**: The way you organize data.
**Algorithms**: The process to solve the problem using organized data.

==Efficient Program = Data Structure + Algorithm==

### Introduction to Data Structures
DSA focuses on designing programs that use *time* and *space* efficiently, especially under real-world constraints such as *memory hierarchy* and *hardware limitations*.

**time** is the most important factor.

Less lines of code doesn't mean it will take lesser time. 

### Data Structure 
- It is a particular way of organizing data in a computer memory(cache, main, secondary) so that memory can be used efficiently both in terms of time and space.
- It is a logical relationship existing between individual elements of data, it considers elements stored and also their relationship to each other.

> in a super market.
> - daily needed items are in the last so that the customer sees other products as well
> - things that kids are attracted to are in the lower shelves so that they can add it to the cart by them self.
> - things are sorted based on their brand and type. 

Data Structure mainly specifies the following four things:
- Organization of data
- Accessing methods
- Degree of association
- Processing methods

The different types of data structures that we are going to study, they are the most common types. They were developed by trial and error and by the necessity.

*"Necessity is the mother of invention"*. 

### Effect of Data Structure
- The type of data structure effects both the **structural** and **functional** aspects of the program. 
- Some are specialized for a specific task: Eg:
	- relation databases commonly use *B-tree indexes for data retrieval*.
	- Complier implementations usually use *hash tables to look up identifiers*.
- The implementation of a data structure usually requires *writing a set of procedures* that create and manipulate instances of that structure. 
###### Data structures can be divided in two parts.
![[Pasted image 20251124133526.png]]
### Primitive Data Structures
- Those which have predefined way of storing data by the system. 
- The set of operations(addition, subtraction, etc.) performed on these data are also predefined. 
- They are directly operated upon by the machine instruction. 
- Eg: char, int, float, double, pointer, str, etc.
### Non Primitive Data Structures
- when primitive data structures are insufficient
- User defined data structures and Derived Data Structures.
- **Derived Data Structure**:
	- built using primitive data types.
	- provided by the system but their structure is complex
	- Operations: Predefined, similar to primitives, available for manipulation
	- Eg: Arrays
- **User-Defined Data Structures**:
	- Definition: Created by user using primitive and derived types, with custom structures and operations
	- Operations: user defined using constructs like structures and classes.
	- Eg: Linked List, Trees, Stacks, Queues

| **Linear Data Structure**                                                                                                 | **Non-Linear Data Structure**                       |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Data elements are arranged in a linear order where each and every elements are attached to its previous and next adjacent | Data elements are attached in a hierarchical manner |
| Single level is involved                                                                                                  | Multiple levels are involved                        |
| Easier Implementation                                                                                                     | Complex implementation in comparison                |
| Data elements can be traversed in a single run                                                                            | Data elements cant be traversed in a single run     |
| array, stack, queue, linked list                                                                                          | Trees, graphs, heaps                                |

^15c09e

#### Homogeneous Data Structures
- contain only similar type of data. 
- simplest Eg: Array containing only integers or array containing only strings, etc.
#### Heterogenous Data Structures
- contains a variety or dissimilar type of data.
- Eg: structures, union

---
# Chapters
1. [[Array]]
2. [[Stack]]
3. [[Queue]]
4. [[Linked List]]
5. [[Tree_DSA]]
6. [[Graph]]
7. [[Hashing]]

---
# References 

1. [Data Structure YouTube Lecture](https://www.youtube.com/watch?v=MdG0Vw9f1A4&list=PLmXKhU9FNesRRy20Hjr2GuQ7Y6wevfsc5&index=2)
2. [Data Structures Notes PDF](ds_gate.pdf)