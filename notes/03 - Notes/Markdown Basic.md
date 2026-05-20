
Type : #Note    
Date :  2025-10-15  
Couse :  [Obsidian Course](https://www.youtube.com/watch?v=eLqQo38wC2Q) ; [Markdown Course](https://www.youtube.com/watch?v=_PPWWRV6gbA)  
Tags :  [[Language]] ; [[Markdown]]  
Status : #complete     
~ ***Yash Agrawall*** ~  
  
---
  
> Markdown has different flavours / versions. Each with some difference. Most common : GitHub Flavour`
# Notes
``` markdown
# header 1
## header 2
### header 3
#### header 4
##### header 5
###### header 6


Total 6 headings available
```
# header 1
## header 2
### header 3
#### header 4
##### header 5
###### header 6


Total 6 headings available  

---
# Lists
## Bulleted Lists
``` markdown
- bulleted 1
	- bulleted 2
		1. bulleted 3
or 
* bulleted 1
	* bulleted 2
		2. bulleted 3
or 
+ bulleted 1
	+ bulleted 2
		4. bulleted 3
```
- bulleted 1  
	- bulleted 2  
		1. bulleted 3  
or   
* bulleted 1  
	* bulleted 2  
		2. bulleted 3  
or   
+ bulleted 1  
	+ bulleted 2  
		4. bulleted 3  

---  
## Numbered Lists
```markdown
1. numbered 1
	1. numbered 2
	2. numbered 3
```
1. numbered 1
	1. numbered 2
	2. numbered 3

---
## Check Box
``` markdown
- [ ] checkbox 1
	- [X] checkbox 2
```
- [ ] checkbox 1
	- [x] checkbox 2
---
# Table
``` markdown

| Col 1 | Col 2   |
| ----- | ------- |
| This  | is      |
| an    | example |
| of    | a       |
| table | with    |
| two   | columns |

or 

/insert table    (for obsidian)
```

| Col 1 | Col 2   |
| ----- | ------- |
| This  | is      |
| an    | example |
| of    | a       |
| table | with    |
| two   | columns |

or 

|     |     |
| --- | --- |
|     |     |

---

| code                                                                                                                                                                                                                                                                                                                                                             | markdown                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This is a paragraph.<br>  <br>Since there is a new line between these two sentences they will be converted to two separate paragraphs.<br><br>This paragraph<br>has new lines in it<br>but<br>it will not show up as a new line in the output.<br><br>This paragraph<br>has two spaces HERE  <br>so it will push this onto a new line within the same paragraph. | This is a paragraph.<br><br>Since there is a new line between these two sentences they will be converted to two separate paragraphs.<br><br>This paragraph has new lines in it but it will not show up as a new line in the output.<br><br>This paragraph has two spaces HERE  <br>so it will push this onto a new line within the same paragraph. |

---
# **Bold** Text

``` markdown
Text is **bold**
Text is __bold__

Text is B__ol__d           
Text is B**ol**d
or 
Ctrl + B on the selected text
```
Text is **Bold**.   
Text is __Bold__  
Text is B__ol__d           (underscore method doesn't work in the middle of words)  
Text is B**ol**d  

---
# *Italics* Text

``` markdown
Text is *italics*
Text is _italics_

Text is i*tal*ics
Text is i_tal_ics 
or 
Ctrl + I on the selected text
```
Text is *italics*  
Text is _italics_  
Text is i*tal*ics  
Text is i_tal_ics    (underscore method doesn't work in the middle of words)  

---
# Both ***Bold and Italics***

``` markdown
text is ***bold and italics***
text is ___bold and italics___
text is __*bold and italics*__
text is **_bold and italics_**
text is **_bold and italics**_

text is b***ol***d an***d italic***s
text is b___ol___d an___d italic___s

or 
Ctrl + B + I on the selected text
Ctrl + I + B on the selected text

```
text is ***bold and italics***  
text is ___bold and italics___  
text is __*bold and italics*__  
text is **_bold and italics_**    
text is **_bold and italics**_    
  
text is b***ol***d an***d italic***s  
text is b___ol___d an___d italic___s      (underscore method doesn't work in the middle of words)  

---
# ~~Strikethrough~~

``` markdown extended
text is ~~strikethrough~~
```
text is ~~strikethrough~~  

---
# Monospace / Inline Codes

```markdown
This is `code`
```
This is `code`  

---
# <mark>High</mark>==light==

```markdown
Text is ==highlight==
Text is <mark>highlight</mark>
```
Text is ==highlight==   
Text is <mark>highlight</mark>   

---
# Superscript & Subscript

``` markdown
This is a super^script^
This is a super^script
This is a super<sup>script</sup>

This is a sub~script~
This is a sub<sub>script</sub>yash
```

This is a super^script^  
This is a super^script  
This is a super<sup>script</sup>  

This is a sub~script~  
This is a sub<sub>script</sub>yash  

---
# Emojis
``` markdown
:FasFaceSmile:
:LiSmile:

or  

type/paste the emoji
😊
```
:FasFaceSmile:  
:LiSmile:  
😊  
`Different markdown flavors support different packs. Some don't even support`  

---
# Code Blocks
```markdown
use triple back ticks " ``` " in line 1 and 3. This will create a code block and you can write the code from line 2.  

(Optional)Write the language of the code block after the first three back ticks.  
```

	or indent the normal text to turn it into a code block  

---
# Embedded Links
```markdown
[This is a link](https://www.google.com)  
```
[This is a link](https://www.google.com)  

---
# Links
```markdown
[https://www.google.com](https://www.google.com)
or 
<https://www.google.com>
or 
https://www.google.com
```
[https://www.google.com](https://www.google.com)  
or   
<https://www.google.com>  
or   
https://www.google.com  

---
# Images
```markdown
![google logo](https://imgs.search.brave.com/wbxK6-fqQGnlW2oV5uKpLYG3e5x1T5pNLVot5EYns_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kZXNp/Z24uZ29vZ2xlL19u/ZXh0L2ltYWdlP3Vy/bD1odHRwczovL3N0/b3JhZ2UuZ29vZ2xl/YXBpcy5jb20vZ2Qt/cHJvZC9pbWFnZXMv/MmQ0YjhmZGUtNWVj/Mi00YzcyLWI4MDQt/MjlkM2NjMTRlM2Q3/Ljc5OWE5OWMxMTk2/YzJmZDQuZ2lmJnc9/Mzg0MCZxPTc1)  
```
![google logo](https://imgs.search.brave.com/wbxK6-fqQGnlW2oV5uKpLYG3e5x1T5pNLVot5EYns_s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kZXNp/Z24uZ29vZ2xlL19u/ZXh0L2ltYWdlP3Vy/bD1odHRwczovL3N0/b3JhZ2UuZ29vZ2xl/YXBpcy5jb20vZ2Qt/cHJvZC9pbWFnZXMv/MmQ0YjhmZGUtNWVj/Mi00YzcyLWI4MDQt/MjlkM2NjMTRlM2Q3/Ljc5OWE5OWMxMTk2/YzJmZDQuZ2lmJnc9/Mzg0MCZxPTc1)

![alt text] (Link or relative address of image)  

---
# Quotes
```markdown
> quote 1
>quote 2
> > quote 2.1 (Nested Quote)
> >> quote 2.1.1 
> > > > quote 2.1.1.1
> >> > > quote 2.1.1.1.1.1
> > > >> >You can go on and on and on....
```
> quote 1  
>quote 2  
> > quote 2.1 (Nested Quote)  
> >> quote 2.1.1 
> > > > quote 2.1.1.1
> >> > > quote 2.1.1.1.1.1
> > > >> >You can go on and on and on....

Use spaces if you want to 👆🏻  

---
# Divider 
```markdown
---
or 
___
or 
***
```
---
or 
___
or 
***
 (Use three in minimum) 


---
---

# Automatic Date and Time Inserter
used in templates  

```markdown
{{Date}} {{Time}}
(its not case sensetive)
```

---
## Core Idea 




---
## Explanation 




---
## Why It Matters 




---
# Tags
used to link and separate notes  
```markdown
[[tags]]
```

---
# References

here:
 [Blog Notes with interactive mode](https://blog.webdevsimplified.com/2023-06/markdown-crash-course/)
---
# Questions 



