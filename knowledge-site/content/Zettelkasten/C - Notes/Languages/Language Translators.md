
Date :  2026-01-28  
Tags :   [[Language]]  
~ ***Yash Agrawall*** ~  

---
# Language Translators
A **language translator** converts a program written in one language into another language (usually machine code).

---
# Types of Language Translators

## 1. Assembler 
- Translates [[Languages#II. Assembly Language|Assembly Language]] into [[Languages#I. Machine Language|Machine code]].
- Assembly Language → Assembler → [[Languages#I. Machine Language|Machine code]]
- One-to-One translation
- Hardware dependent
- Produces object code

---
## 2. Compiler 
- Translates the entire program at once into [[Languages#I. Machine Language|Machine code]]
- Source Code → Compiler → [[Languages#I. Machine Language|Machine code]] → Executable File`
- Translates whole program before execution 
- [[Errors]] shown after compilation
- Faster Execution (Once Compiled)

Examples : 
- [[C]]
- C++
- Rust
- Go

Compilation can be done via 2 pipelines 
### Pipeline A (Most common)
- Source Code → Compiler → [[Languages#II. Assembly Language|Assembly Code]] → Assembler → [[Languages#I. Machine Language|Machine code]]
- Compiler translates high level code to Assembly 
- Assembler translates assembly to machine code
- Common because → Simplifies debugging and tooling

### Pipeline B
- Source Code → Compiler → [[Languages#I. Machine Language|Machine code]]
- Compiler directly emits [[Languages#I. Machine Language|Machine code]]
- No visible assembly stage 

---
## 3. Interpreter
- Translates and executed line by line.
- Source Code → Interpreter → Output
- No separate executable file
- Stops at first error
- Slower Execution 
- Easier debugging 

Examples : 
- [[Python]]
- JavaScript
- Ruby
- PHP

---
# Comparison Table
| Feature         | Assembler                                              | Compiler                                        | Interpreter         |
| --------------- | ------------------------------------------------------ | ----------------------------------------------- | ------------------- |
| Input Language  | [[Languages#II. Assembly Language\|Assembly Language]] | High-level                                      | High-level          |
| Output          | [[Languages#I. Machine Language\|Machine code]]        | [[Languages#I. Machine Language\|Machine code]] | Immediate execution |
| Translation     | Whole program                                          | Whole program                                   | Line by line        |
| Speed           | Fast                                                   | Fast execution                                  | Slower execution    |
| Executable File | Yes                                                    | Yes                                             | No                  |

---
# Practical Reality (Modern Program Execution)
- In modern systems, program execution is **not purely compiled or purely interpreted**.
- Most popular languages follow a **hybrid execution model** that combines compilation and interpretation.
---
### Step 1 : Compilation to Bytecode
- Source Code is first translated to intermediate form called bytecode
- Source Code → Bytecode → [[Languages#I. Machine Language|Machine code]]
- Bytecode is neither [[Languages#I. Machine Language|Machine code]] nor [[Languages#II. Assembly Language|Assembly Language]]
- Bytecode is designed to be executed by a Language Virtual Machine. This is different from [[Setting Up Virtual Machine or Lab|System Virtual Machine]].

- Each language has its own Bytecode format or dialects. 
- Each Language VM understands only its own bytecode. 

Eg :
- Java Source (.java) → Java Compiler → Bytecode(.class)
- Python Source (.py) → Python Compiler → Bytecode (.pyc)

---
### Step 2 : Execution by Virtual Machine
- The language Virtual Machine reads bytecode. 
- The VM may : 
	- Interpret bytecode line by line 
	- Convert bytecode into Machine Code at runtime using (JIT) (Just-In-Time) compilation.

Eg : 
- Bytecode(.class) → JVM(Java Virtual Machine) → Interpreter / JIT → Machine Code → CPU
- Bytecode(.pyc) → Python VM → Execution

---
### Bytecode v/s Assembly Language
| Feature            | Bytecode           | Assembly Language |
| ------------------ | ------------------ | ----------------- |
| Designed for       | VM                 | Physical CPU      |
| Hardware dependent | No                 | Yes               |
| Portability        | High               | Low               |
| Readability        | Not human-friendly | Human-readable    |
| Translator         | VM                 | Assembler         |
- Bytecode → virtual assembly 
- Assembly language is tied to a specific processor architecture.
	- x86 Assembly → x86 CPU
	- ARM Assembly → ARM CPU

---
# Language Virtual Machine v/s System Virtual Machine

**Language Virtual Machine**
- Executes bytecode of a programming language.
- Examples: JVM, Python VM, .NET CLR.
- Virtualizes program execution.

**[[Setting Up Virtual Machine or Lab|System Virtual Machine]]**
- Runs an entire operating system inside another OS.
- Examples: [[Setting Up Virtual Machine or Lab#**VirtualBox**|VirtualBox]], [[Setting Up Virtual Machine or Lab#**VMware**|VMware]], [[Setting Up Virtual Machine or Lab#🪟 **Hyper-V** (Microsoft)|Hyper-V]].
- Virtualizes hardware.

---
## VM inside VM (Nested Virtualization)
- A system VM can run a guest OS, and inside that OS a language VM can run. 
- This creates a VM inside another VM.
- Ultimately all machine code is executed by the physical CPU.

---

































---
# Questions




---
# Summary 





---
# References 

