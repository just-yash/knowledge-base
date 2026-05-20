
Type : #InterviewPrep     
Interview Date : 2026-05-14    
Tags :  [[job]]  
Status : #complete     
~ ***Yash Agrawall*** ~     

---
## FULL INTERVIEW Q&A — FINAL VERSION

---

### GOLDEN RULE FOR ANYTHING YOU DON'T KNOW

> "I haven't worked with that directly yet, but logically I'd approach it by **[think out loud]**. I'm a fast learner — that's how I built my Zettelkasten, independently, without being told to."

**Never:**

- Go silent
- Say "I don't know" and stop
- Bluff a specific wrong answer

**Always:**

- Acknowledge honestly
- Show thinking process
- Tie back to something real you've done

---

### REDIRECT TEMPLATE — away from project, toward knowledge base

> "I've built a Password Strength Analyzer in Python — OOP, rule-based. But honestly the work I'm more proud of is my Zettelkasten, my knowledge base — it better reflects how I actually think and work."

---

## SECTION 1 — ABOUT YOU

---

**Q: Tell me about yourself.**

- 2nd year CSE, IGIT Sarang
- Python is primary language — self-study and CS50P
- Built Password Strength Analyzer — OOP, regex (re) and conditional statements
- Maintain my Zettelkasten — public knowledge base, Obsidian + GitHub Pages
- Covers Python, cybersecurity, AI, data structures
- I learn by building and documenting

---

**Q: What is your favorite subject?**

- Programming — specifically Python
- Theory and application meet directly
- In core CSE - Discrete mathematics
- DM made me realise under every CSE domain, its all mathematics
- I was able to link and form connections between various subjects because of it
- Enjoy breaking a real problem into functions and seeing it work

**Python Qs they may ask:**

- List vs tuple → list mutable, tuple immutable, tuples faster
- Decorator → wraps a function to add behavior without modifying it
- == vs `is` → == checks value, `is` checks same object in memory
- Lambda → anonymous single-expression function: `lambda x: x*2`
- `append` vs `extend` → append adds one item, extend adds all items from iterable

---

**Q: Where do you see yourself in 3–5 years?**

- Working at intersection of AI and real systems
- I'm also interested in research : Computer Vision + Multi Camera setup to detect treat or a person 
- Deep technical skills applied in product or research
- This internship is a step in that direction
- I see my self making real changes and improvement via my research projects and technical interests 

---

## SECTION 2 — COMPANY + ROLE

---

**Q: What do you know about Mercer?**

- Part of Marsh McLennan — 4 arms: Marsh, Mercer, Guy Carpenter, Oliver Wyman
- Mercer = HR and people consulting
- Mercer Marsh Benefits (MMB) = division I'm joining ; handles how organizations design and deliver employee benefits
- Darwin = cloud SaaS platform for employee benefits admin
- System where companies configure health plans/pensions, employees enroll digitally
- My role = Python scripting, data validation, AI workflows on Darwin

---

**Q: What are health benefits?**

- Non-wage compensations employers provide
- Includes health insurance, dental, vision, mental wellness, pensions
- Darwin manages and delivers these digitally at scale
- Tracks utilization, ensures compliance across regions

---

**Q: Why Mercer? Why this internship?**

- Most internships are toy projects — no real consequences
- Darwin configs directly affect employees' health coverage — data accuracy here actually matters
- Mercer is actively integrating AI into enterprise workflows — not just talking about it
- I want to understand how AI works inside real enterprise systems, not just in personal projects
- This internship sits exactly at that intersection — Python, AI workflows, real data, real product
- It gives me what most internships don't — work that matters

---

**Q: Why should we hire you?**

- I learn fast and I take action — my Zettelkasten is proof, built independently, no one told me to
- Not claiming to be an expert — claiming to be someone who is eager, takes real steps, and delivers
- I accept mistakes fast and ask for help early — I don't sit on problems waiting for someone to hand-hold me
- I identify gaps quickly and fill them — that's how I learn, that's how I work
- Write Python, understand AI workflows, comfortable with Git and SQL basics
- You give me a task, I'll figure it out and document it

---

## SECTION 3 — TECHNICAL

---

**Q: Walk me through your Python experience.** 

- Python is my primary language
- Comfortable with core fundamentals — functions, loops, data structures, regex, OOP
- Built a Password Strength Analyzer — rule-based, OOP structure, CLI
- Use it for scripting — automating small repetitive tasks
- Still building — this internship is where I take it to production level

---

**Q: Explain OOP.**

- Structures code around objects — data & behavior bundled together
- 4 pillars:
    - Encapsulation — groups data + methods in a class, hides internals
    - Inheritance — child class reuses parent class logic
    - Polymorphism — same method, different behavior per object
    - Abstraction — hides complexity, exposes only what's needed
- In Python: define class → `__init__` sets attributes via `self` → create instances

---

**Q: Tell me about your project.**

- Password Strength Analyzer — Python, OOP
- Single class — `Password`
- `__init__` sets up password, score, suggestions — then calls analyze and display automatically
- `analyze()` — runs 5 checks: length, uppercase, lowercase, digit, special character
- Each check: pass → score +1, fail → suggestion added
- `display()` — maps score to label, prints suggestions
- Uses `re.search` for pattern matching — not `isupper/islower/isdigit` which check ALL characters
- Loop handles empty input and quit

---

**Q: Why `re.search` and not `isupper()`?**

- `isupper()` returns True only if ALL characters are uppercase — wrong
- `re.search(r"[A-Z]", password)` finds if AT LEAST ONE uppercase exists — correct
- Same logic for lowercase and digits

---

**Q: What is OOP and why did you use it here?**

- OOP bundles data and behavior into one unit — a class
- Used it because all password logic belongs together — score, suggestions, checks, display
- Single class, single responsibility, clean interface
- Creating object automatically runs everything — one line to use it

---

**Q: What's your experience with SQL?**

- Basic but functional
- SELECT, WHERE, JOINs, GROUP BY, aggregates
- For data validation: check nulls, mismatched values, out-of-range entries, rule violations
- Then Surface those results as clean output for review

---

**Q: What does data validation mean practically?**

- Verifying data matches expected schema, range, and business logic
- Not just that it exists — that it's correct
- Example: benefits config says coverage starts after 90 days → validate date field reflects that
- Write Python scripts → pull data → run checks → flag violations with clear messages

---

**Q: What AI tools do you know?**

- LLMs: ChatGPT, Claude, Gemini — reasoning and generation
- GitHub Copilot — code assistance
- RAG — retrieval augmented generation, grounds LLM responses in your own data
- Workflows: prompt chaining, structured output prompting, API integration via Python
- Understand transformer basics — tokenization, attention, context windows

---

**Q: What is prompt engineering?**

- Structuring input to LLM to get consistent, high-quality output
- Techniques:
    - Be explicit about format
    - Few-shot — give examples in prompt
    - Assign a role to the model
    - Chain prompts for multi-step tasks
    - Specify output structure — JSON
- Goal: make model behavior predictable in automated pipelines

---

**Q: What is RAG?**

- Retrieval Augmented Generation
- Problem: LLMs don't know your internal data, context window has limits
- Solution:
    - Chunk your documents → convert to embeddings → store in vector DB
    - User query → embed → find similar chunks → inject into prompt
    - LLM answers using that context
- Solves hallucination and knowledge cutoff
- Relevant to Darwin: benefits policy docs → RAG → accurate employee answers

---

**Q: What is a token?**

- Chunk of text — roughly 0.75 words
- Models have token limits per request
- Prompt + response together = total tokens consumed
- More tokens = higher API cost

---

**Q: What is temperature?**

- Controls randomness of output
- 0 = deterministic, consistent — use for validation tasks
- 1 = creative, varied — use for generation tasks

---

**Q: How would you use AI for data validation?**

- Write Python script
- Pull data → structure it → send to LLM with validation prompt
- Specify JSON output format in prompt
- Parse response → flag errors → generate report

---

**Q: You use AI to write code — isn't that lazy?**

- Using AI to accelerate is a skill, not a shortcut
- I use it to generate base structure, then review, modify, validate
- I understand what the code does and why
- I can read it, debug it, explain it — not copying blindly
- AI speeds up repetitive parts so I focus on logic and edge cases

---

**Q: Tell me about your knowledge base.**

- Called Yash Agrawall’s Zettelkasten
- Zettelkasten-style — structured, interconnected notes
- Built in Obsidian, initially published via Quartz on GitHub Pages
- Later I used codex by OpenAI to improve the front-end of the page 
- Covers Python, C, cybersecurity, AI, discrete math, data structures
- Live — just-yash.github.io/knowledge-base
- Nobody told me to build it — saw a gap, designed system, shipped it
- Continuously updated — it's a habit, not a one-time project

---

**Q: Attention to detail — how do you demonstrate it?**

- my Zettelkasten — every note structured, tagged, interconnected
- Code — variable names matter, edge cases handled, logic commented
- Password analyzer handles empty input, masked display, case-insensitive quit
- Documentation is part of the work, not an afterthought

---

**Q: Good written communication — example?**

- my Zettelkasten is entirely written documentation
- Published publicly — has to be clear enough for anyone to read
- part of multiple anthology over the years. One of them was Be Limitless, presented at New Delhi World Book Fair 2025, organised by National Book Trust under Ministry of Education, Govt of India at Bharat Mandap, New Delhi 
- published book on kindle : Fragments of a Fading Mind

---

## SECTION 4 — BEHAVIORAL

---

**Q: Tell me about a time you worked in a team.**

- Led small team at EnthuZiastic
- Coordinated task division, kept sessions on track
- Handled communication between team and organization
- Key learning: clear ownership matters more than effort alone

---

**Q: Tell me about a time you faced a challenge and overcame it.**

- Building my Zettelkasten — challenge was consistency, not technical
- Solved by making barrier low — just open Obsidian, write one note
- System compounds over time — still live and updated

---

**Q: Tell me about a time you took initiative.**

- Nobody told me to build my Zettelkasten — saw gap, built it
- Password analyzer — built to have something concrete, not assigned
- Pattern: identify gap → research → ship it

---

**Q: How do you handle pressure or deadlines?**

- Break task down, find minimum viable version first
- Ship that, then improve
- Document as I go — forces clarity, saves time

---

**Q: How do you handle feedback or criticism?**

- Take it as data, not personally
- Would rather know fast than stay wrong longer
- Goal is getting it right

---

**Q: How do you manage learning something new quickly?**

- Find minimum needed to be functional
- Build something with it immediately
- Document what I learn
- Start → hit gaps → fill them → repeat

---

**Q: Are you a self-starter?**

- my Zettelkasten — nobody assigned it, I built it
- Password analyzer — built to have something concrete, not assigned
- Approach: see problem → design fix → execute → document

---

## SECTION 5 — LOGISTICS

---

**Q: Are you comfortable relocating to Delhi NCR?**

- Yes — staying in Ghaziabad, commuting independently

---

**Q: Can your college give an NOC for June–July?**

- Yes, confirmed

---

**Q: Will you need transport from Mercer?**

- No — commuting independently

---

## SECTION 6 — YOUR QUESTIONS FOR THEM

Ask exactly 2. Pick based on conversation:

**If role tasks weren't clear:**

> "What does a typical week look like for an intern on the Darwin team — is it more scripting and automation, or testing and validation?"

**Always ask this:**

> "What would make this internship a success from your perspective — what's the one output you'd want at end of two months?"

**If AI came up heavily:**

> "How is the team currently using AI within Darwin workflows, and where do you see that expanding?"


---

## RULES FOR TOMORROW

- Join Zoom 5 min early — pwd: **077697**
- GitHub open, my Zettelkasten open in another tab
- Unknown question → think out loud, don't go silent
- Redirect project questions → my Zettelkasten
- Keep answers under 90 seconds
- Ask exactly 2 questions at the end

---

## YOUR 5 CORE ASSETS

**1. Zettelkasten**

- Public knowledge base, Obsidian + Quartz + GitHub Pages
- Zettelkasten-style, live, continuously updated
- Covers Python, cybersecurity, AI, discrete math, data structures
- Nobody told me to build it — saw gap, built it, shipped it

**2. Password Strength Analyzer**

- Python, OOP, single class, regex, CLI
- `__init__` → `analyze()` → `display()` — clean flow
- Handles edge cases — empty input, masked display, quit
- Use to redirect: _"more proud of my Zettelkasten actually"_

**3. Python + AI Knowledge**

- Python — functions, OOP, regex, file I/O, API calls
- AI — LLMs, prompt engineering, RAG, tokens, temperature
- Use AI to accelerate, not replace — understand everything I produce

**4. Self-starter + Documentation habit**

- Both projects built independently, unprompted
- Documentation is output, not afterthought
- Written communication — published books, public knowledge base

**5. EnthuZiastic**

- Led small team, coordinated tasks, ran sessions
- Clear ownership matters more than effort alone

---

## QUESTION → ASSET MAP

|They ask|Lead with|
|---|---|
|Tell me about yourself|All 5, briefly|
|Strengths|my Zettelkasten + Self-starter|
|Why hire you|Assets 1, 3, 4|
|Self-starter|my Zettelkasten|
|Initiative|my Zettelkasten|
|Challenge overcome|my Zettelkasten|
|Team experience|EnthuZiastic|
|Python experience|Asset 3 + Password Analyzer|
|Project|Password Analyzer → redirect to my Zettelkasten|
|Documentation|my Zettelkasten + books|
|Written communication|my Zettelkasten + books|
|Attention to detail|my Zettelkasten + edge cases in code|
|Learning quickly|Asset 3 + my Zettelkasten process|
|AI knowledge|Asset 3|
|Weakness|No production experience — this internship fixes it|
|3–5 years|AI + real systems, this internship is step one|

---

## ONE FRAME FITS ALL

> "I build things independently, document everything, and learn by doing — my Zettelkasten and the password analyzer are both examples of that."

That one sentence answers: about me, strengths, self-starter, initiative, why hire you — all of them.

Just frame it per question. Core is always the same.