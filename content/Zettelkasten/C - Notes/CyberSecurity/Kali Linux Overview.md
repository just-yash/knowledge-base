
Date :  13-11-2025
Tags :   [[Linux]] ; [[CyberSec]]

---
# Kali Linux Overview
- Linux is an operating system which works on smartphones, cars, supercomputers, home appliances, home desktops, etc. 
- Linux is the **most popular operating system** in the world
	- Android is based on Linux
- It runs most of the internet, all of the world's top 500 supercomputers and the world stock exchanges. 

## Why Linux?
- Open Source
- Transparent
- Free
- Highly Customizable
- Tool Compatibility 
- Omnipresent
- Highly scalable
- Light Weight

![[Pasted image 20251113182358.png]]


| Command Line Interface (CLI)         | Graphical User Interface (GUI)         |
| ------------------------------------ | -------------------------------------- |
| Uses Text based input                | Uses point and click input             |
| advanced                             | Easier                                 |
| Big learning curve                   | Point and Click is easy to get used to |
| highly Configurable and Customizable | Somewhat customisable but limited      |
| Faster and Quicker                   | Slower and Heavier                     |
## Basic Linux Commands
- `pwd` : Print Working Directory 
	- Opening Windows File Explorer and seeing in the top bar in which directory you are
- `cd` : change directory 
	- Changing into a different folder
	- `cd` alone takes you to your home directory
- `ls` : list/show everything 
	- listing everything present inside the folder
- `cp` : Copy 
	- `cp source destination`
- `mv` : Move
	- `mv source destination`
	- Renaming is just moving the file to the same location but with a different name
		- `mv oldname newname` = rename
- `mkdir` : make directory
	- creating a folder/directory 
- `cat` : concatenate file and print on the standard output
	- `cat file` : prints whatever is written in that file
	- `cat file1 file2 > combined.txt` : concatenate contents of file1 and file2 into a different file. 
- `touch` : change file timestamps
	- also used to create an empty file
- `clear` : clears the terminal
- `man` : man stands for manual 
	- man cp will give the manual of the cp command and likewise
- `echo` : display a line of text
	- `echo hi` : print hi on the terminal emulator → Prints
	- `echo <text> >> <file name>` : adds the text to the given file → appends
	- `echo <text> > file` : overwrites
- `rm` : remove / delete
- `rmdir` : remove empty directory
- `grep` : search text in file
	- shows all lines containing the pattern not just the first match
- `head` : view first line
	- by default it shows first 10 lines
	- `head -n 5 file1` : shows the first 5 lines of file1
- `tail` : view last line
	- by default it shows last 10 lines
	- `tail -n 5 file1` : shows the last 5 lines of file1
- `sudo` : run as admin
	- administrative privileges and permissions
	- it asks for password
- `apt` : update or package manager
	- `apt update` : refreshes the index
	- `apt upgrade` : installs updates
	- `apt install <pkg>` : installs the given package
### Ways to Open a Terminal Emulator
- Clicking on the Black Terminal button
- Opening Apps and clicking on the terminal emulator 
- keyboard shortcut : `Ctrl + Alt + T`
### Increase Decrease Text Size:
`Ctrl + +` or `Ctrl + -`

---
# Questions




---
# Summary 





---
# References 

1. [[Ethical Hacking]]
2. [ETHICAL HACKING course (Tutedude) ](https://upskill.tutedude.com/course/lecture-ethicalhacking)
