
Type : #Note    
Date : 2026-04-03    
Tags : [[Java]] ; [[OOPs]]   
Status : #complete     
~***Yash Agrawall***~   
  
---  
# Java Overview

## 🧠 In One Sentence

- Writing and running a Java program involves creating a class, defining a `public static void main` method, compiling the source file into bytecode using `javac`, and executing it via the `java` command with the JVM.
- Java is a platform-independent, object-oriented programming language that follows a write-once-run-anywhere approach using the JVM.

---
## 🎯 Why This Topic Exists

- **Problem it solves**: Computers cannot directly understand Java source code.
    
- **Why needed in programming**: Provides a structured way (OOP) to create, compile (check for syntax errors), and run applications on any machine with a JVM.

---
## 🧠 Key Features of Java

- Platform Independent (WORA – Write Once Run Anywhere)  
	- Java code is compiled into bytecode, which runs on JVM instead of directly on OS.
- Object-Oriented  
- Secure  
- Robust  
- Multithreaded  
- Distributed

---

## 📍 Where Does It Fit in the System?

- **Module**: Basics
    
- **Comes after**: [[Java Installation and Path Setup]]
    
- **Feeds into**: [[DataTypes.java]]
    
- **Used with**: 
    
---

## 📍 Where It Is Used

- **Used in**: Every Java application, from simple CLI tools to complex enterprise systems.
    
- **Common exam usage**: Explaining the "`public static void main`" signature and the compilation/execution process.
    
- **Real-world example**: Creating a "`Hello World`" service as a health check for a cloud application.
    

---

## 🔄 Core Idea

- **Class-Based Structure**: Everything in Java must reside inside a class.
    
- **Two-Step Process**: Source code (`.java`) is compiled into Bytecode (`.class`) before being executed by the JVM.
    
- **Entry Point**: The `main` method is the starting point for program execution.
    

---
## 🧩 Intuition (Simple Explanation)

Imagine writing a recipe in a language (Java) that your chef (Computer) doesn't speak. You first need a translator (Compiler) to turn it into a universal code (Bytecode). The chef then uses a special tool (JVM) to read that code and cook the meal (Execute the program).

---
## ⚙️ Syntax / Structure

### Comments
```java
// Single-line comment
/* Multi-line 
   comment */
```

### Program Basic Syntax
``` java
class ClassName {
    public static void main(String[] args) {
        System.out.println("Message");
    }
}
```

---
## 🔑 Key Points (Exam-Oriented)

- **File Name**: Must match the class name containing the `main` method if the class is public.
    
- **public**: Makes the `main` method visible to the JVM(Java Virtual Machine) (which lives outside the class).
    
- **static**: Allows the JVM to call `main` without creating an object of the class which contains the main method.
	- Before entering `main()` we are creating object, hence it has to be `static`
    
- **void**: The `main` method does not return any value to the JVM.
	- `void` is a [[datatypes|datatype]]
	- JVM calls `main()` to start the execution but didn't expect any value in return. 
	- So void 
    
- **String[] args**: Accepts command-line arguments as an array of strings.
	- Java Command Line Arguments are being stored in the form of String arguments through an array
	- Name of the String array is `args` 
	- This name is not fixed and used can replace with any other name.

- **System.out.println()**
	- It is used to print the values which is given to it
	- **System**: Class name
	- **out**: Instance 
	- **println()**: method

---
## ⚖️ Differences / Comparisons (VERY IMPORTANT)

|**Feature**|**System.out.println()**|**System.out.print()**|
|---|---|---|
|**New Line**|Prints the message and moves the cursor to the next line.|Prints the message and stays on the same line.|
|**Usage**|Used for separate lines of output.|Used for continuous output on one line.|

---
## 💻 Standard Program Pattern (MOST IMPORTANT)

```java
// Save as: Hello.java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello World"); // Output message
    }
}
```

---
## 🧠 Logic Breakdown

- **Step 1**: Write code in a text editor (like Notepad++) and save it with a `.java` extension.
    
- **Step 2 (Compile)**: Run `javac FileName.java` in the command prompt. This generates a `.class` file (Bytecode).
    
- **Step 3 (Execute)**: Run `java ClassName` (without extension). The JVM reads the [[Language Translators#Bytecode v/s Assembly Language|bytecode]] and executes it.

---
## Execution Flow 

- Bytecode(.class) → JVM(Java Virtual Machine) → Interpreter / JIT → Machine Code → CPU

---
## ⚠️ Common Mistakes

- **Case Sensitivity**: Writing `system` or `string` with lowercase (Java is case-sensitive).
    
- **Missing public**: If `main` isn't public, compilation succeeds but execution fails with "Main method not found". JVM throws `NoSuchMethodException.main` as it can't find the main method as its not public using predefined signature in class which is provided to java command
    
- **Extension in Run**: Trying to run `java MyProgram.class` instead of `java MyProgram`.
    
---
## 🧠 Key Terms

|**Term**|**Meaning**|
|---|---|
|**Source Code**|The human-readable Java code (`.java` file).|
|**Bytecode**|Platform-independent code generated by the compiler (`.class` file).|
|**JVM**|Java Virtual Machine; the engine that executes bytecode.|
|**javac**|The Java compiler command.|

---

## 🔗 Connections

- **Builds on** → Installation & Path Setup (Requires working `javac` and `java` commands).
    
- **Used with** → Classes & Objects (Implicitly uses the class concept).
    
- **Related topics** → JVM Architecture (Deeper understanding of bytecode execution).
    

---

## 📄 PYQ Patterns (CRITICAL)

- **Asked as**: "Explain the meaning of 'public static void main(String[] args)'."
    
- **Variations**: "Describe the compilation and execution process in Java."
    
- **Frequency**: Extremely High (Foundation of all exams).
    

---

## ❓ Questions (Practice / PYQ)

###### Q1) Why is the `main` method `static`?

A1) It is `static` so that the JVM can call it without having to instantiate (create an object of) the class first.

###### Q2) What happens if you omit `String[] args`?

A2) The JVM will not recognize the method as the entry point of the program, leading to a "Main method not found" error during execution.

---

## 📝 Summary

- Code → Save as `.java`.
    
- `javac FileName.java` → Generates Bytecode.
    
- `java ClassName` → JVM runs the code.
    
- `public static void main` is the essential entry point.
    

---

## ⚡ Revision Trigger (1-Liner)

Write in `.java`, `javac` to translate, `java` to run.

---

## 📌 References

1. Syllabus and PYQs : [[JAVA 4th Sem IGIT.pdf]]
    
2. YouTube Video : [https://youtu.be/8WHa281XYEg](https://www.google.com/search?q=https://youtu.be/8WHa281XYEg)
---