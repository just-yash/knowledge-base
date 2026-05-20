Type : #RawNote       
Date :  2026-05-07  
Tags :  [[College]]     
Source :    
~ ***Yash Agrawall*** ~  

---
# Java Exam

- What is command line argument? Why and where is it used?
   - information that directly follows the program’s name on the command line when it is executed, providing a mechanism to pass data into a program at runtime. 
   - `java Test 1 2`
   - Why? : when we want to pass information or parameters into a program dynamically at runtime 
   - Storage : Stored as String within the `String[] args` array that is passed to the `main()` method 
   - step 1 : append space-separated arguments after the class name 
   - step 2 : JVM intercepts these values, packages them into an array of String objects and passes this array into the `main` method 
   - step 3 : program accesses these arguments sequentially using standard array indexing, evaluating or parsing them as needed for internal logic 

- Method can be overloaded by changing return type only. True or False. Justify 
	- False 
	- method overloading is defined as a class having two or more methods with the exact same name but different parameters 
	- it strictly requires a difference in the method parameters (no. of parameters, datatype of parameters, or the sequence of the data types)
	- return type alone is not sufficient
	- JIT compiler determines which version of the method to execute by matching the method name and the passed arguments against the defined parameter lists 
	- JIT relies on parameters not return type to resolve the method call 
	- declaring two methods with identical names and identical parameters but different return type makes it impossible for the compiler to know which method to execute, causing an error 

- Which concept is used to implement compile time polymorphism and how?
	- Method overloading : a class contains two or more methods with the exact same name but different parameter lists (number, type or sequence of parameters)
	- compiler bind the method call to the method body during compilation based on the supplied arguments 
	- compiler differentiates by considering : no. of parameters and their specific data types 
	- requires difference in the parameter list 
	- changing only the return type causes ambiguity error at compile time 
	- enhances code readability by allowing a single action (like computing a sum) to process multiple distinct data types under one unified method name 
	- compiler identifys difference in parameter list 
	- maps it based on datatypes of the arguments passed by the user at compilation 
	- binds the inputs with the exact corresponding method signature
	- JVM runs the program     
    ```
    public class CompileTimePolymorphism {
    
        // Method overloaded to sum two integers
        public int sum(int a, int b) {
            return a + b;
        }
    
        // Method overloaded to sum (concatenate) two strings
        public String sum(String a, String b) {
            return a + b;
        }
    
        public static void main(String[] args) {
            CompileTimePolymorphism obj = new CompileTimePolymorphism();
    
            // Compiler resolves to the integer method
            System.out.println("Integer Sum: " + obj.sum(10, 20));
    
            // Compiler resolves to the string method
            System.out.println("String Sum: " + obj.sum("Hello ", "World"));
        }
    }
    ```

- Explain dynamic/runtime polymorphism
	- a call to an overridden method is resolved at runtime rather than at compile time 
	- implemented using dynamic method dispatch 
	- superclass reference variable is used to point to a subclass object to invoke an overridden method 
	- superclass → defines a method 
	- subclass → inherits this superclass bu overrides the method with its own specific behavior 
	- in the main program, a reference variable of the superclass is instantiated but is assigned an object of the subclass 
	- JRE checks the actual object type residing in memory, binding and executing the subclass’s overridden method rather than the parent’s method 

- What is inheritance? Name unsupported inheritance in Java 
	- an OOP mechanism in which a new class (subclass) acquires the properties and behaviour of an existing class (superclass) establishing an parent-child relationship 
	- used to achieve code reusability and to facilitate method overriding for runtime polymorphism 
	- `extends` keyword : indicate that a new class is deriving from an existing class 
	- java supports single, multilevel and hierarchical inheritance
	- unsupported inheritance : multiple inheritance through classes to avoid ambiguity 
		- class extends more than one class 
	- multiple inheritance can be achieved using interfaces 
	- parent class is defined using generic fields and methods 
	- child class uses the `extends` keyword to inherit the parent class 
	- java compiler allows the child class to reuse the inherited fields as if they were its own while also allowing the addition to new specific fields 

- Explain multilevel inheritance
	- OOPs mechanism where a new class is derived from an existing subclass, creating a chained hierarchy of parent-child relationships where properties and behaviours are passed down across multiple levels 
	- one of the three primary type of class-based inheritance natively supported by java 
	- establishes a multi-tiered IS-A relationship between instantiated objects 
	- subclass reuses methods and fields not only from its immediate parent child but also from all preceding superclass in the inheritance tree 
	- root superclass is declared containing core properties and methods (`Class A`)
	- intermediate subclass is defined using the `extends` keyword to inherit from the root class, expanding upon its state and behaviour (`Class B extends A`)
	- subsequent subclass extends the intermediate class thereby acquiring the combined members of both the intermediate class and the root superclass (`Class C extends B`)

- Explain method overriding
	- OOP mechanism where a subclass provides a specific, redefined implementation of a method that is already declared in its parent class 
	- there must be inheritance between the classes for overriding to occur 
	- Overriding method must posses the exact same name and the exact same parameters as the parent class method 
	- primary mechanism used to achieve runtime polymorphism and dynamic method dispatch in java 
	- unlike C++, java does not require a virtual keyword 
	- all non-static methods are virtual by default and can be overridden 

- Constructor Overloading 
	- a single class can have any number of constructors that differ in their parameter lists 
	- a class can declare multiple constructors as long as their parameter lists are distinct 
	- JIT differentiates between these overloaded constructors by analyzing the number of parameters and their specific data types on the list 
	- allows object of the same class to be initialized differently depending on the data available at the time of creation 

- Abstract class is better than interface. True or False. Justify. 
	- False 
	- Both serve distinct architectural purposes 
	- Abstract classes allow 0 to 100% abstraction providing shared state, method bodies and constructors
	- interfaces provide a pure blueprint to achieve loose coupling and multiple inheritance 
	- interfaces enable multiple inheritance. not explicitly supported by abstract classes to prevent ambiguity 
	- abstract classes can contain data members, constructors and non-abstract methods 
	- interface fields are implicitly `public`, `static` and `final` and cannot hold instance-specific state 
	- interfaces → 100% abstraction and loose coupling 
	- abstract classes → focusing on partial implementation 
	- interface → `implements` keyword → defining a strict behavioral contract across multiple unrelated classes or when your design requires a class to inherit from multiple sources 
	- abstract class → `extends` keyword → defining a base foundation for closely related subclasses that need to share common internal implementations, mutable states or initialization logic via constructors 

- Exception and Error are same or different?
	- Different 
	- distinct subclasses of the java.lang.throwable class
	- Execptions → recoverable programmatic or envirnmental conditions 
	- Errors → unrecoverable , severe failure generated by the JRE 
	- Both inherit from the top-level Throwable superclass
	- Exceptions are caused by user errors or unforeseen programmatic issues that can be handled 
	- Errors represent conditions beyond the control of the programmer
---
## Key Ideas 




---
## Note
---
# Questions
----
# Summary
---
# References 
