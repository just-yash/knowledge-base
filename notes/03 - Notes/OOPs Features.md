
Type : #Note    
Date : 2026-04-03    
Tags : [[Java]] ; [[OOPs]]   
Status : #complete     
~***Yash Agrawall***~   
  
---  
# OOPs Features  
  
## 🧠 In One Sentence

OOP is a programming paradigm that organizes software design around data (objects) rather than functions, using core pillars like [[DB System Concepts#Data Abstraction|Abstraction]], Encapsulation, Inheritance, and Polymorphism to ensure security and reusability.

---
## 🎯 Why This Topic Exists

- **Problem it solves**: Overcomes the drawbacks of Procedural Oriented Programming (POP) where data is global and unprotected.
    
- **Why needed**: To provide better security (Data Hiding), reduce code redundancy (Reusability), and manage complex systems through real-world modeling.
    
---
## 📍 Where Does It Fit in the System?

- **Module**: Basics
    
- **Comes after**: [[Java Overview]] / [[JVM Architecture]]
    
- **Feeds into**: [[Classes & Objects]], [[Inheritance]], [[DB System Concepts#Data Abstraction| Abstraction]]
    
- **Used with**: Java, C++, Python
    

---
## 📍 Where It Is Used

- **Used in**: Building modular and maintainable software applications.
    
- **Common exam usage**: Explaining the 4 pillars of OOP and comparing OOP vs POP.
    
- **Real-world example**: A media player where you interact with the "Play" button without knowing the internal decoding logic.
    

---
## 🔄 Core Idea

- **Data Centric**: Focuses on data and the objects that contain that data.
    
- **Security**: Protects data from accidental modification by outside functions.
    
- **Modular**: Breaks down programs into small, manageable objects.
    

---
## 🧩 Intuition (Simple Explanation)

Think of a **Smartphone**. You know how to use the screen, camera, and buttons ([[DB System Concepts#Data Abstraction|Abstraction]]), but you don't see the internal circuitry (Encapsulation). You can receive a call while playing a game (Polymorphism), and newer phone models use the same basic design as older ones but with added features (Inheritance).

---
## 🔑 Key Points (Exam-Oriented)
### 4 Pillars of OOP (Exam Ready)
#### 1. [[DB System Concepts#Data Abstraction|Abstraction]]
- Hiding internal details and showing only essential features to the user.
- Hides implementation details
- Shows only essential features

#### 2. Encapsulation
- Wrapping data and methods into a single unit (class)
- Wrapping data + methods into a class
- Achieved using private + getters/setters

#### 3. Inheritance
- The mechanism by which one class acquires the properties/methods of another class (code reusability).
- Reusing properties of parent class
- Improves code reusability

#### 4. Polymorphism
- The ability of a single entity (method/object/class) to take multiple forms or behave differently at different times.
- One entity, multiple forms
- Compile-time (Overloading)
- Runtime (Overriding)

---
## ⚖️ Differences / Comparisons (VERY IMPORTANT)

| **Feature**          | **Object-Oriented (OOP)**                                                                                                                                                                                           | **Procedural (POP)**                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Approach**         | Bottom-Up Approach (First define all the functions and classes, then write the main function)                                                                                                                       | Top-Down Approach (First function is main function, then define other functions)                                               |
| **Focus**            | Program is divided into objects                                                                                                                                                                                     | Program is divided into functions                                                                                              |
| **Access Specifier** | It uses access specifier                                                                                                                                                                                            | It doesn't use access specifier                                                                                                |
| **Security**         | - Encapsulation is used for [[DB System Concepts#Data Abstraction\|Data Abstraction]]<br>- Data cannot move from function to function<br>- Data kept public or private, so we can control the access of data | - No data hiding<br>- Most functions use Global data<br>- Data can be accessed freely from function to function in the system  |
| **Overloading**      | Possible (Polymorphism)                                                                                                                                                                                             | Not Possible                                                                                                                   |
| **Reusability**      | Inheritance property is used                                                                                                                                                                                        | Inheritance is not allowed                                                                                                     |
| **Header File**      | Concept of Head File is not required                                                                                                                                                                                | Header File is required                                                                                                        |

---
## 💻 Standard Program Pattern (MOST IMPORTANT)

```java
// Example showing Encapsulation and Abstraction
class Student {
    private String name; // Private data (Encapsulation)

    public void setName(String n) { // Controlled access
        this.name = n;
    }

    public void showIdentity() { // Abstract behavior
        System.out.println("Student Name: " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.setName("Yash");
        s1.showIdentity();
    }
}
```

---
## 🧠 Logic Breakdown

- **Step 1**: Identify the real-world entities (Objects).
    
- **Step 2**: Bundle relevant data and functions together into a Class.
    
- **Step 3**: Use access modifiers (private/public) to protect sensitive data. 

---
## ⚠️ Common Mistakes

- Confusing **[[DB System Concepts#Data Abstraction|Abstraction]]** (hiding complexity) with **Encapsulation** (grouping data/methods).
    
- Using global variables in an OOP language, which defeats the purpose of data security.    

---
## 🧠 Key Terms

| **Term**        | **Meaning**                                                             |
| --------------- | ----------------------------------------------------------------------- |
| **Object**      | A real-world entity with state and behavior.                            |
| **Class**       | A blueprint or template for creating objects.                           |
| **Data Hiding** | Preventing internal data from being accessed directly by external code. |

---
## 🔗 Connections

- **Builds on** → Basic Programming Logic (Variables, Loops).
    
- **Used with** → Java Access Modifiers, Interfaces.
    
- **Related topics** → Design Patterns, Software Engineering.
    
---
## 📄 PYQ Patterns (CRITICAL)

- **Asked as**: "What are the features of OOP?" or "Difference between POP and OOP."
    
- **Variations**: Explain Inheritance with a real-life example.
    
- **Frequency**: Extremely High (Common 5-10 mark question).
    
---
## ❓ Questions (Practice / PYQ)

###### Q1) How does OOP achieve code reusability?

A1) OOP achieves reusability primarily through **Inheritance**, where a new class (child) can inherit features of an existing class (parent) without rewriting the code.

---
## 📝 Summary

- OOP focuses on data security via Encapsulation.
    
- It models the real world using Objects and Classes.
    
- It facilitates code maintenance and reusability through Inheritance and Polymorphism.
    
---
## ⚡ Revision Trigger (1-Liner)

OOP is about **A.E.I.O.** ([[DB System Concepts#Data Abstraction|Abstraction]], Encapsulation, Inheritance, Polymorphism) and keeping data safe in "Objects."

---
## 📌 References

1. Syllabus and PYQs : [[JAVA 4th Sem IGIT.pdf]]
    
2. YouTube Video : [Features of Object Oriented Programming Language](http://www.youtube.com/watch?v=CK6xn21bFFI)
---
## Core Idea 




---
## Explanation 




---
## Why It Matters
---
# Questions
---
# References 
