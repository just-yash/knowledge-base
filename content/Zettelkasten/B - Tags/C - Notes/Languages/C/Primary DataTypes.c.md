
Date :  2026-01-29  
Tags :   [[C]]  ; [[datatypes]]  ; [[Questions]]
~ ***Yash Agrawall*** ~  

---
# Primary DataTypes.c

## `int`
- used to define variable that can store integer numbers
For Turbo C Compiler → memory allocation of 2 bytes 
1 byte = 8 bits ⇒ 2 bytes = 16 bits
- specifier = `%d` or `%i`
	- `%d` always expects decimal input, whereas `%i` detects base from prefix (`0` → octal, `0x` → hexadecimal).

|       1       |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  | 13  | 14  | 15  | 16  |
|:-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| MSB(Sign Bit) |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |

- the 1st bit is called MSB (Most Significant Bit) → Sign Bit (0 → +ve ; 1 → -ve)
- the other 15 bits store the value.
- largest No. = 2<sup>15</sup> - 1 = 32767
- smallest No.  = -32768 
so for $n$ $bits$ range is $-2^{n-1}$ to $2^{n-1}-1$

> -ve No. are stored in 2's Compliment Notation
### What if any no. outside this range is given?
It will store the no. but not as what you entered 
- Bound checking is not present in C Language. 
	- Making it efficient but error prone.  
  
No. are stored in this format → (This diagram illustrates **2’s complement representation**, not guaranteed C behavior.)
![[Pasted image 20260129211512.png]] 
**Conceptual Note (Implementation-Specific):**
- Many older compilers (e.g., Turbo C) and most modern systems internally represent signed integers using **2’s complement**.
- On such implementations, values may appear to wrap around modulo $2^n$ producing results like:
	- `32767 + 1 → -32768`
	- `-32768 - 1 → 32767`
- **However, in standard C, signed integer overflow is _undefined behavior_**.  
- This wraparound behavior **must not be relied upon** in portable or standards-compliant code.  
- Only unsigned integers guarantee modulo wraparound behavior in C.
### Modifiers for `int`
- in order to surpass this limit, we use modifiers
- by default `int` is `signed`
#### 1. `unsigned`
```c
unsigned int x;
unsigned x;
```
- memory is 2 byte only 
- no sign bit / MSB → all 16 bit used to store value (but only +ve values)
- range : 0 to (2<sup>16</sup> - 1) → 0 to 65535
- specifier = `%u`

#### 2. `long`
```c
long int x;
long x;
```
- memory allocated is 4 byte → 32 bits
- it does have sign bit / MSB → useable storage = 31 bits
- range : -2<sup>32-1</sup> to 2<sup>32-1</sup> - 1 = -2<sup>31</sup> to 2<sup>31</sup>  
- specifier = `%ld`

#### 3. `unsigned long` 
```c
unsigned long int x; 
unsigned long x;
```
- memory → 4 bytes = 32 bits
- no sign bit / MSB → all 32 bits can store value (but only +ve values)
- range : 0 to (2<sup>32</sup> - 1)
- specifier = `%lu`

#### 4. `short`
```c
short int x;
short x;
```
- used to store small integer values
- For Turbo C Compiler → memory allocation of 2 bytes = 16 bits
- 1 MSB + 15 Storage bits
- range : $−2^{15}$ to $2^{15}−1$ = $−32768$ to $32767$
- format specifier = `%hd`

#### 5. `unsigned short`
```c
unsigned short int x;
unsigned short x;
```
- stores only non-negative integer 
- memory : 2 bytes
- no sign bit
- all 16 bits store value
- range : $0$ to $2^{16}−1$ = $0$ to $65535$
- specifier = `%hu`

#### 6. There are more like : `long long int` and its unsigned. 
- introduced in [[C]]99.
- minimum width : 64 bits

---
## `float`
- used to define variables that can store real numbers
For Turbo C Compiler → memory allocation of 4 bytes 
- float name came from floating point notation → 32 bit IEEE 754 or IEEE single precision 
	- range of floating point notation is more than fixed point notation
- specifier = `%f` or `%F`

- $-3.4 × 10^{38}$ to $3.4 × 10^{38}$ → $-3.4e38$ to $3.4e38$
- if you give any no. outside this range it will show `+inf` or `-inf` 
	- `inf` → ∞ 
```c
float a = 3.2e12;
float b = 3.4e39;   //+inf
float c = -3.4e40;  //-inf
```

### No modifiers for `float`
- `float` cannot be `unsigned`, they are always `signed`

---
## `double`
- used to define variables which can store real numbers
- range is more than float
- specifier = `%lf`, `%f`
- In `printf`, both `float` and `double` are printed using `%f` because `float` is promoted to `double` via [[Type Conversion.c#1. Implicit Type Conversion (Automatic)|Implicit Type Conversion]]
- For Turbo C compiler → 8 bytes of memory allocated
- 64 bit IEEE 754 double precision
- range : $-3.4 × 10^{308}$ to $3.4 × 10^{308}$ → $-3.4e308$ to $3.4e308$

### Modifiers for `double`
- `double` cannot be `unsigned`. They are always `signed`.
#### `long`
```c
long double x;
```
- memory : 10 bytes
- range : $-1.7 ×10^{4932}$  to  $1.7 × 10^{4932}$ → $1.7e4932$  to  $1.7e4932$
- specifier = `%Lf`

### C is an expanding language
- more priority is given to the larger datatype 
- double is preferred over float → 
- precision ∝ range at cost of efficiency ∝ memory

---
## `char`
- used to define variables which can store characters
- memory : 1 byte → 8 bits
- `char` is 1 byte (at least 8 bits). Whether it has a sign bit depends on whether `char` is signed or unsigned on that implementation.
- Signed char range is `-128 to 127`
```c
char x;
```
- range : $-2^7$ to $2^7-1$ → $-128$  to  $127$

```c
char x = 'a';   //'a' is a character constant 
char x = a;     // a is a variable
```

- In expressions, `char` and `short` are promoted to `int` before arithmetic operations via [[Type Conversion.c#1. Implicit Type Conversion (Automatic)|Implicit Type Conversion]]
### Specifiers 
- `%c` → print character
- `%d` → print ASCII value
- `%hhd` → signed char
- `%hhu` → unsigned char

### modifiers for char
- They can be `signed` as well as `unsiged`. No default
#### `unsigned`
```c
unsigned char x; 
```
- memory : 1 byte : 8 bits
- 8 storage bits
- range = $0$  to  $2^8-1$  →  $0$  to  $255$ 

#### `signed`
```c
signed char x;
```
- memory : 1 byte : 1 MSB + 7 storage bits
- range =  $-2^7$  to  $2^7 - 1$  →  $-128$  to  $127$ 

### ASCII Codes

> American Standard Code for Information Interchange

-  Which character encoding a system uses is implementation dependent. Most use ASCII codes.
- ASCII is originally 7 bits : 0 to 127
- Extended ASCII Codes (unsigned ASCII) → 8 bits (8 storage bits) : 0 to 255
- A - Z → 65 to 90
- a - z → 97 to 122
- 0 - 9 → 48 to 57
> 0 ≠ '0'
- Uppercase + 32 = Lowercase

`char x = 97;` == `char x = 'a';`
true

`char x = 1;` == `char x = '1'`
false

```c
char x = '9';   // stores character '9'
char x = 57;    // stores ASCII value of '9'
```
Both are equivalent.

```c
char x = '97';  // multi-character constant → implementation-defined → avoid
```
Multi-character constants like '97' should not be used.
- in Turbo C Implementation → it will store x = '9'.
###### So if we cant store 2 characters than why is extended ASCII of 8 bits? 
because computers standardized on 8-bit bytes. Values 128-255 are used for additional symbols depending on encoding.

`char x = '123';` → error
`char x = 'abc';` → error

---
## `void`
- Represents **no value**
- Used for:
    
```c
void func();
void *ptr;
```

---
## `_Bool`

- Introduced in **C99**
- Used to store boolean values: **`true` (`1`)** or **`false` (`0`)**
- For Turbo C compiler, size = 1 byte

```c
_Bool flag;

or 

#include <stdbool.h>
bool flag;
```
They are both same, but to use `bool` we need to define it using `#include <stdbool.h>`

### Value Rules 
- if a non-zero number is given, it will be automatically converted to `1`
###### Examples : 
```c
_Bool a = 0      // false  a = 0
_Bool b = 5.3    // true   b = 1
_Bool c = -6.7   // true   c = 1
```

```c
_Bool x = 2;
if (x == 2)   // false ; x == 1

```
### Modifiers for `_Bool`
- Its neither `signed` nor `unsigned` → Signedness concept does not apply 
- No Modifiers for `_Bool` or `bool`

### Boolean Expressions produce `int`
- [[Operators.c#3. Relational Operators|Relational]] and [[Operators.c#4. Logical Operators|Logical]] [[Operators.c|operators]] produce `int` values.
###### Example :
```c
int x = (5 > 3);     // x = 1

_Bool x = (5 > 3);   // x = 1
```

### Using `_Bool` in Conditions
- Better practice to use this way
###### Example : 
```c
_Bool ready = 1;

if (ready) {
    // executes
}
```














---
# Questions
###### Q1) What will be the output 
```c
char x = 'A';
char y = 'B';
char z = x + y;
printf("%c",z);
```


A1)  
`'A' = 65`
`'B' = 66`
So, `char z = 65 + 66 = 131`

The result is **implementation-dependent** because:
- `char` may be signed or unsigned
- Signed overflow is undefined
- Printing `%c` may produce a non-ASCII or non-printable character


---
# Summary 
- `int` stores integers; its size and range are **implementation-dependent**.
    
- Signed integers commonly use **2’s complement**, but signed overflow is **undefined behavior** in C.
    
- Unsigned integers use all bits for magnitude and follow **modulo 2ⁿ wraparound**.
    
- Type modifiers (`short`, `long`, `long long`, `signed`, `unsigned`) change range and storage.
    
- `float` uses IEEE-754 single precision (32-bit).
    
- `double` uses IEEE-754 double precision (64-bit).
    
- `long double` provides higher precision (implementation-dependent).
    
- Floating-point types do not have signed/unsigned variants.
    
- `char` occupies 1 byte (at least 8 bits) and may be **signed or unsigned**.
    
- Characters are stored as integer codes (commonly ASCII).
    
- `%c` prints a character, `%d` prints its integer value.
    
- Multi-character constants (e.g., `'ab'`) are **implementation-defined** and should be avoided.
    
- `void` represents absence of value.
    
- `_Bool` stores only `0` or `1`; any non-zero value becomes `1`.
    
- `bool` is provided via `<stdbool.h>`.
    
- Relational and logical operators produce `int`.
    
- C performs **no bounds checking**, making it fast but error-prone.



---
# References 

1. [Primary Data Types YouTube Lecture](https://youtu.be/tclQ3yYH3TU?si=KNPIm2b07h7httd5)