
~ ***Yash Agrawall*** ~  

# 🗺️ Yash's Knowledge Garden — Study Roadmap

> A living index of all notes, ordered by how they should be studied. Follow the flow within each domain. Cross-domain links are noted where relevant.

---

## 0. Start Here

- [[About Me]]
- [[index|Knowledge Index]]

---

## 1. 💻 Programming Foundations

### 1.1 Languages & Theory

> Understand what languages are before writing a single line of code.

- [[Languages]] — Types of languages: machine, assembly, high-level, paradigms
- [[Language Translators]] — Compiler vs Interpreter vs Assembler; bytecode & JVMs
- [[Errors]] — Compile-time, runtime, logical, linker errors
- [[Operators]] — General operator theory across all languages

---

### 1.2 C Programming

> Study in this exact order. Each note builds on the previous.

#### Basics

- [[Basics.c]] — History, middle-level nature, compilation pipeline, files
- [[Tokens.c]] — Keywords, identifiers, variables, constants, lvalues vs rvalues
- [[DataTypes.c]] — Classification: primary, derived, user-defined
- [[Primary DataTypes.c]] — `int`, `float`, `double`, `char`, `_Bool`; modifiers; ASCII
- [[Type Conversion.c]] — Implicit promotion, explicit casting, truncation
- [[Escape Sequences.c]] — `\n`, `\t`, `\0`, octal/hex sequences
- [[Input Output(Console).c]] — `printf`, `scanf`, format specifiers
- [[1st C Program]] — First real program; `main()`, preprocessor directives

#### Operators in C

- [[Operators.c]] — Arithmetic, relational, logical, increment, ternary, sizeof, comma; full precedence table

#### Control Structures

- [[Control Structures.c]] — Overview: sequence, conditional, loop, jump
- [[Simple if.c]] → [[if-else.c]] → [[Nested if.c]] → [[else-if ladder.c]]
- [[switch-case.c]] — Value-based selection; fall-through; comparison with else-if

#### Loops

- [[while.c]] → [[do-while.c]] → [[for.c]]
- [[nested_loop.c]] — Inner/outer loop mechanics; digit operations

#### Jump Statements

- [[break.c]] — Exits nearest loop or switch
- [[continue.c]] — Skips current iteration; break vs continue table

#### Characters & Strings

- [[char functions.c]] — `<ctype.h>`: `isalpha`, `isupper`, `tolower`, etc.
- [[Strings.c]] — char arrays, `\0`, `scanf`/`fgets`/`puts`, string functions

#### Pattern Problems

- [[Pattern Questions.c]] — Mathematical approach: count rows → derive formulas → write loops

#### Data Structures in C

- [[Array]] — 1D/2D/ND arrays; row/column major; sparse matrices; complexity table
- [[Linked List]] — Singly, circular, doubly, header variants; all pseudocode operations
- [[Stack]] — LIFO; push/pop; arithmetic expression evaluation; recursion; Tower of Hanoi
- [[pointers.c]] — Pointer declaration, dereferencing, arithmetic, arrays, void/null/wild/dangling pointers

---

### 1.3 Python

- [[Python Basics]] — Syntax, indentation, REPL, running scripts
- [[Print_py]] — `print()` parameters: `sep`, `end`, `flush`, `file`

---

### 1.4 Markdown

- [[Markdown Basic]] — Full Markdown syntax reference

---

## 2. 🧮 Data Structures & Algorithms

> Study theory first, then implementations in C.

### 2.1 Foundations

- [[Data Structures Basics]] — Linear vs non-linear; primitive vs non-primitive; efficiency equation

### 2.2 Data Structures

- [[Array]] ← already covered in C section
- [[Linked List]] ← already covered in C section
- [[Stack]] ← already covered in C section
- [[Tree]] _(stub — expand later)_

### 2.3 Algorithms

- [[Algorithm Basics]] — Definition, problem-solving cycle, experimental vs asymptotic analysis
- [[Sorting]] — Space complexity (internal/external), stability overview
- [[Bubble Sort]] → [[Selection Sort]] → [[Insertion Sort]] → [[Merge Sort]]

### 2.4 Full Index

- [[Data Structures & Algorithms]] — Master index for this domain

---

## 3. 🔢 Digital Logic Design (DLD)

> Follow this order strictly — each topic is a prerequisite for the next.

- [[Digital Logic Design]] — Master index
- [[Digital Logic Basics]] — Analog vs digital, Boolean algebra history, von Neumann architecture, design example
- [[Logic Gates]] — NOT, AND, OR, NAND, NOR, XOR, XNOR; all Boolean laws; universal gates; functionally complete sets
- [[Primary Logical Operators Across Different Domains]] — Boolean Algebra ↔ Logic ↔ Set Theory; all shared laws
- [[Duality]] — Duality, self-dual, orthogonal, neutral functions
- [[Complementation]] — Methods to complement a Boolean function
- [[Normal Form, SOP and POS]] — SOP/DNF, POS/CNF, minterms, maxterms, PDNF, PCNF, conversions
- [[K-Map]] — Structure, gray code, grouping rules, prime implicants, EPIs, don't-care conditions
- [[Combinational Circuits]] — Design procedure; applications (ALU, adders, MUX)
- [[Adder]] _(stub — expand later)_

---

## 4. 📐 Mathematics

### 4.1 Engineering Maths Overview

- [[Engineering Maths]] — Study phases: Linear Algebra → Probability → Calculus
- [[Mathematics]] — Master index

### 4.2 Linear Algebra

- [[Matrix]] — Types (null, diagonal, triangular, identity, symmetric, skew-symmetric, orthogonal), operations
    - [[Matrix Qs]] — Practice problems
- [[Determinants]] — Methods (Sarrus, cofactor, row ops), adjoint, inverse, Gauss-Jordan
    - [[Determinants Qs]] — Practice problems
- [[Rank of a Matrix]] — Definition, echelon form, elementary transformations, properties
    - [[Rank of a Matrix Qs]] — Practice problems

### 4.3 Discrete Mathematics

- [[Discrete Mathematics Introduction]] — GATE weightage, best study approach

#### Logic

- [[Logic Introduction]] — Overview of all logic topics
- [[Propositions]] — Declarative sentences, truth value, Liar's Paradox
- [[well formed formula]] — wff rules, tautology, contradiction, contingency, satisfiability; counting formulas
- [[Logical Operators]] — NAND, NOR, XOR, implication (→), biconditional (↔); precedence; properties table
- [[Questions on Minimization]] — Boolean minimization practice (convert to algebra, then simplify)
- [[Arguments]] — Premises, conclusions, validity, soundness; rules of inference (Modus Ponens, Modus Tollens, etc.); fallacies
- [[Predicate Logic]] — Quantifiers (∀, ∃), predicates, scope, free/bound variables, negation rules, nested quantifiers

#### Set Theory

- [[Number System]] — Natural, whole, integers, rational, irrational, real, complex
- [[Set Theory]] — Definitions, operations (union, intersection, complement, difference, XOR), power sets, cardinality laws
- [[Relations]] — Cartesian product, relation types (reflexive, symmetric, antisymmetric, transitive, equivalence, partial order), closures, Warshall's algorithm
- [[2 - Zettelkasten/C - Notes/Eng. Maths/Discrete Mathematics/Sets/Functions]] — Injection, surjection, bijection, composition, inverse; counting formulas
- [[POSET]] — Partial order, Hasse diagrams, lattice theory, complement, distributive, Boolean lattices

#### Graph Theory

- [[Graph Theory]] — Vertices, edges, degree sequences, Havel-Hakimi, bipartite graphs, complement

---

## 5. 🗄️ Database Management System (DBMS)

- [[Database Management System]] — Master index
- [[DBMS Basics]] — Data vs information, problems with file systems, instance vs schema
- [[Transactions and Concurrency Control]] — ACID properties, transaction states, concurrent execution problems (dirty read, lost update, phantom read), schedules, serializability

---

## 6. 🔐 Cybersecurity

- [[Cybersecurity]] — Master index

### 6.1 Linux

- [[Linux Foundation]] — 3 major Linux families (Red Hat, SUSE, Debian)
- [[Kali Linux Overview]] — Why Linux for security; CLI vs GUI; essential commands

### 6.2 Ethical Hacking

- [[Ethical Hacking]] — Black/grey/white hat definitions; work of an ethical hacker; learning scope
- [[Setting Up Virtual Machine or Lab]] — VMware vs VirtualBox vs Hyper-V vs QEMU; WSL comparison
- [[Stages of Hacking]] — Reconnaissance → Scanning → Gain Access → Maintain Access → Clearing Tracks (tools for each)
- [[Networking Basics]] — TCP/IP, Client-Server, IP addresses, DNS, DHCP, MAC, ports

---

## 7. 🤖 Artificial Intelligence

- [[Artificial Intelligence]] — Master index
- [[Generative AI]] — Gen AI landscape, opportunities, investments, applications
- [[Large Language Model]] — Foundation of text generation tools
- [[AI Tools]] — Categorised list: text, video, image, code, speech, 3D, music tools
- [[Coding Assistant]] — How coding assistants work; tool use system; benefits
- [[Tools With Claude Code]] — Reference table of Claude Code tools
- [[Prompts]] — YouTube notes extraction prompt template

---

## 8. 📈 Finance & Economics

### 8.1 Personal Finance

- [[FPYA]] — Course objectives: tax, retirement, risk planning
- [[Magic of Compounding]] — Snowball effect; compound interest examples
- [[Health Insurances]] — Myths, checklist for health insurance
- [[Rate of Interest]] — Nominal vs effective rate; formulas
- [[Financal Learning]] — 5-phase self-study roadmap (money → investing → stocks → trading → wealth)

### 8.2 Economics

- [[Economics]] — Definition, nature (social science, art, positive/normative), micro vs macroeconomics
- [[Basic Problems of an Economy]] — Scarcity, central problems (what/how/for whom), Production Possibility Curve (PPC)
- [[Demand]] — Definition, desire vs demand, types, determinants (individual & market)
- [[Law Of Demand]] — Inverse relationship, demand schedule/curve, reasons (DMU, substitution, income effects), exceptions (Giffen goods, Veblen goods)
- [[Demand Function]] — Individual vs market demand function; demand schedule & curve
- [[Elasticity of Demand]] — Price/income/cross elasticity; degrees (perfectly elastic → inelastic); factors affecting
- [[Supply]] — Definition, stock vs supply, determinants (individual & market)
- [[Supply Function]] — Individual vs market supply function and schedule

---

## 9. 🎨 Creativity

### Poetry — by theme

#### Dark / Mental Health

- [[A Desolated Guy]] — Mental struggle, pressure, intrusive thoughts
- [[Fragments of a Fading Mind]] — Detachment, grief, quiet hope
- [[The Weight of Yesterday]] — Regret, the past as a ghost
- [[Shadows of Adulthood]] — Adulting fatigue, lost wonder
- [[Strength in Solitude]] — Hard-earned self-reliance
- [[System]] — Student burnout, education system critique

#### Love / Heartbreak

- [[Beyond Now]] — Long-distance longing, fear of drift
- [[Burnt Petals]] — Heartbreak, investments that become debts
- [[That Friend]] — Pain of being the one who still cares

#### Grief & Loss

- [[My Best Friend]] — Grief for a grandmother; quiet devastation
- [[Cancer]] — Regret, addiction, consequences

#### Existential / Philosophy

- [[Human Paradox]] — Human contradiction and hypocrisy
- [[Death]] — Death as erasure, absence, liberation
- [[Matrix]] — Critique of formal education
- [[Modern Madness]] — 21st century contradictions

#### Identity & Social Pressure

- [[His Story]] — Emotional neglect, impossible expectations
- [[The Cursed Child]] — Parental pressure, loss of selfhood

#### Growth & Transition

- [[The Next Chapter]] — Leaving home, owning your life

#### Full Index

- [[Poetry Index]] — Complete categorised list

---

## ⚡ Quick Reference Links

|Topic|Jump To|
|---|---|
|C Operators|[[Operators.c]]|
|Boolean Laws|[[Primary Logical Operators Across Different Domains]]|
|K-Map Rules|[[K-Map]]|
|ACID Properties|[[Transactions and Concurrency Control]]|
|Hacking Stages|[[Stages of Hacking]]|
|Array Formulas|[[Array]]|
|Sorting Comparison|[[Sorting]]|
|Demand Laws|[[Law Of Demand]]|
|Matrix Types|[[Matrix]]|

---

_Last updated: 25th March 2026 · Built for deep, sequential learning._