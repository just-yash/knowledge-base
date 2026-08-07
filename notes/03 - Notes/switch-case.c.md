
Type : #Note    
Date :  2026-02-13  
Tags :   [[C]]  ; [[conditional]]  
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# SwitchCase.c
A `switch` statement is a multi-way selection control structure that transfers control to a matching `case` label based on the value of a single expression.

- Unlike [[else-if ladder.c|else if ladder]] :
	- `switch` performs value matching 
	- not general condition checking
	- `switch` is often faster than `else-if` because compilers may use jump tables.

```c
// syntax

switch (expression)
{
    case constant1:
        statement(s);
        break;

    case constant2:
        statement(s);
        break;

    default:
        statement(s);
}

```
- Its not necessary to write `default` at the end. If `default` is not last, it must end with `break` to avoid fall-through.
# Rules : 
- `expression` must be:
	- [[Primary DataTypes.c#`int`|int]], [[Primary DataTypes.c#`char`|char]] , `enum`
	- not [[Primary DataTypes.c#`float`|float]] , [[Primary DataTypes.c#`double`|double]] , [[Strings.c|strings]]
- `case` labels must be: 
	- [[Primary DataTypes.c#`int`|int]] or [[Primary DataTypes.c#`char`|char]] [[Tokens.c#3. Constants / Literals|constants]].
	- unique within the `switch` 
- `default` is optional
- `break` is optional but usually required
- you can replace `break` with `return 0`

---
# Conceptual Flow
1. `expression` evaluated once
2. control jumps to matching `case`
3. execution continues until a `break` or end of switch
- unlike [[else-if ladder.c|else if ladder]] this is not "choose one and stop" by default 

###### Examples : 
```c
int day = 2;

switch (day)
{
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    case 3: printf("Wednesday"); break;
    default: printf("Invalid");
}

// Tuesday
```

```c
int x = 1;

switch (x)
{
    case 1: printf("One ");
    case 2: printf("Two ");
    default: printf("End");
}

// One Two End
```
- No `break`
- Control through sequentially
- Without `break`, control falls through sequentially and executes all following statements until a `break` or end of code block.

```c
int x = 2;
switch (x)
{
	case 1: 
	printf("Jan");
	break;
	
	case 2:
	printf("Feb");
	break;
	
	printf("abc");
	
	case 3:
	printf("March");
	break;
	
	default:
	printf("invalid");	
}

// Feb
```
- control goes directly to `case`
- it will ignore any statement if it doesn't belong to any `case`.

```c
int main(){
	printf("HI");
	int x = 1;
	switch (x)
	printf("abc");
	printf("def");
}

// HIdef
```
- Every control structure has by default scope of 1 statement. → statement ends with `;`.
- and `switch` looks for `case`. if there are none, it will simply ignore the statements.

```c
int main(){
	printf("HI");
	int x = 1;
	switch (x);
	printf("abc");
	printf("def");
}

// HIabcdef
```
- `;` is there after `switch (x)`. Ending its scope then and there.

```c
int day = 2;

switch (day);
{
    case 1: printf("Monday"); break;
    case 2: printf("Tuesday"); break;
    case 3: printf("Wednesday"); break;
    default: printf("Invalid");
}
```
- [[Errors#1. Compile-Time Errors|Compile-Time Error]] → `misplaced case Error`
- The scope of switch ended, hence the compiler couldn't identify to which `switch` does the given cases belong to.

```c
int x = 3, y = 3;

switch (x){
	case 1: 
	printf("Jan");
	break;
	
	case 2:
	printf("Feb");
	break;
	
	case y:
	printf("March");
	break;
}
```
- [[Errors|Error]] → `case` can only have [[Primary DataTypes.c#`int`|int]] or [[Primary DataTypes.c#`char`|char]] [[Tokens.c#3. Constants / Literals|constants]].

```c
int x = 2;

switch (x)
{
	case 2.0:
	printf("abc");
	break;
	default:
	printf("def");
}
```
- [[Errors|Error]] → `case` can only have [[Primary DataTypes.c#`int`|int]] or [[Primary DataTypes.c#`char`|char]] [[Tokens.c#3. Constants / Literals|constants]].

```c
float x = 2.0;

switch (x)
{
	case 2:
	printf("abc");
	break;
	default:
	printf("def");
}
```
- [[Errors|Error]] → `switch` expression must evaluate to an integral type (`int`, `char`, `enum`).

```c
int x = 2.0;

switch (x)
{
	case 2:
	printf("abc");
	break;
	default:
	printf("def");
}

// abc
```
- [[Type Conversion.c#1. Implicit Type Conversion (Automatic)|Implicit Type Conversion]]

```c
switch (x)
{
	case 2:
	printf("abc");
	break;
	default:
	printf("def");
}
```
- [[Errors|Error]] → Undeclared [[Tokens.c#2.1 Variables|variable]]

```c
char x = 'a';

switch (x)
{
	case 'a' || 'e' || 'i' || 'o' || 'u':
	printf("vowel");
	break;
	
	default:
	printf("Not vowel");
}

// Not vowel
```
- [[Operators.c#4. Logical Operators|Logical Operators]] return `1` or `0`
- Here we are comparing `97` ([[Primary DataTypes.c#ASCII Codes|ASCII code]] for `a`) with `1`. 
- Hence it will print the `default`

we can write the above program as : 
```c
char x = 'a';

switch (x)
{
	case 'a':
	case 'e':
	case 'i':
	case 'o':
	case 'u':
	printf("vowel");
	break;
	
	default:
	printf("Not vowel");
}
```
- As `case` `'a'`, `'e'`, `'i'`, `'o'`, `'u'` have the same statements. we can write it like this.
- As any of the 5 cases is satisfied, we can see there is no `break`. Hence it will blindly satisfy the cases below it until a `break` is reached or all cases are over.

```c
char x = 'a';
switch(x)
{
	case 'a': 
	printf("vowel");
	break;
	
	case 97:
	printf("vowel");
	break;
}
```
- [[Errors#1. Compile-Time Errors|Compile Time Error]] → `Dublicate Case Error`
- Each `case` should have unique value.

```c
// to check greatest of two distinct numbers

int x,y;
scanf("%d %d", &x, &y);
switch (x > y)
{
	case 1: 
	printf("x is greater");
	break;
	
	default:
	printf("y is greater");
	break;
}
```

> Nesting of `switch-case` is also possible. There are no restrictions. 

```c
// greatest of three distinct numbers

int x,y,z;
scanf("%d %d %d", &x, &y, &z);
switch (x > y)
{
	case 1: 
	switch (x > z)
	{
		case 1:
		printf("x is the greatest.");
		break;
		
		case 0:
		printf("z is the greatest.");
	}
	break;
	
	default:
	if (y > z)
	printf("y is the greatest.");
	
	else
	printf("z is the greatest");
}
```

> switch cannot handle ranges (e.g., 60 - 69).
> for ranges, `else-if` is more suitable

---
# Difference between [[else-if ladder.c|else-if ladder]] & `switch-case`

| [[else-if ladder.c\|else-if ladder]]                  | `switch-case`                                                                     |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1. no need of `break;` or `return 0;`                 | 1. `break;` or `return 0;`                                                        |
| 2. any condition                                      | 2. only equality condition                                                        |
| 3. any [[DataTypes.c\|datatype]]                      | 3. only [[Primary DataTypes.c#`int`\|int]] & [[Primary DataTypes.c#`char`\|char]] |
| 4. not well structured → uses a lot of curly brackets | 4. well structured → use curly brackets only once                                 |
| 5. more powerfull                                     | 5. less powerfull                                                                 |
| 6. Slower compared to `switch-case`                   | 6. Faster compared to `else-if ladder`                                            |

---
# Summary 

- `switch` is a value-based multi-way selection structure
    
- Expression is evaluated once
    
- `case` labels must be unique integral constants
    
- `break` prevents fall-through
    
- Without `break`, execution continues sequentially
    
- `default` handles unmatched cases
    
- `switch` cannot handle ranges or conditions
    
- Logical operators cannot be used inside `case`
    
- Nested `switch` statements are allowed

---
# References 

1. [YouTube Lectrue](https://youtu.be/A0FPetS_FZo?si=lcbQK2GxJq1sWWqH)