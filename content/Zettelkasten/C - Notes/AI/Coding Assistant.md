
Date :  2026-03-11  
Tags :  [[AI]] ; [[Programming]]
~ ***Yash Agrawall*** ~  

---
# Coding Assistant
- its a sophisticated system that uses [[LLM]] to tackle complex programming tasks. 

## How Coding Assistants Work?
- When given a task, the approach of a Coding Assistant is similar to that of a Human Developer
![[Pasted image 20260311095941.png]]
- The LLM uses a set of Tools to perform any action
- In order to execute any task, it needs to :
	1. **Gather Information / Context** : Understanding what the user wants, Reading files, etc. 
	2. **Formulate a plan** : Making a plan with steps to perform in a chronological order, running simulations to verify, etc
	3. **Take Action** : Actually implementing the solution by updating files and running commands, etc
- The first and the last steps require the assistant to interact with the outside world - reading files, fetching documentations, applying changes, running commands, etc.
- [[LLM]] by themselves can only process text and return text.
- They can't actually read files or run commands. 
- To fix this, it uses a system called "**tool use**" (the set of tools, that was initially mentioned in this note.) 

## How Tool Use Works?
- When a request is sent to the coding assistant, it automatically adds instructions to the message that teach the [[LLM]] how to request actions. 
- Eg : "Read the file 'Coding Assistant.md' " → "ReadFile: Coding Assistant.md"
![[Pasted image 20260311140029.png]]
The Complete Flow : 
1. You ask: "What code is written in the main.go file?"
2. The coding assistant adds tool instructions to your request
3. The language model responds: "ReadFile: main.go"
4. The coding assistant reads the actual file and sends its contents back to the model
5. The language model provides a final answer based on the file contents
- This system allows language models to effectively "read files," "write code," and "run commands" even though they're really just generating carefully formatted text responses.
![[Pasted image 20260311140316.png]]

#### Benefits of Strong Tool Use
- Tackles Harder Tasks : Claude can combine different tools to make new tools that it has never used before to handle complex work
- Extensible Platform : You can integrate new tools to Claude Code, and it will adapt to use them as the workflow evolves
- Better Security : Claude Code can navigate codebases without requiring indexing, which often means not sending your entire codebase to external servers










---
# Questions




---
# Summary 





---
# References 

1. [Claude Skilljar](https://anthropic.skilljar.com/claude-code-in-action/303235)
