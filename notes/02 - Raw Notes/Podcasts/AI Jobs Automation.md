
Type : #RawNote       
Date : 27-05-2026        
Tags : [[AI]] ;  [[job]]     
Source : [Raj Shamani : Vaibhav Sinsity](https://youtu.be/kKNoBH0iE1k?si=HxT_VeGDbJd7AqF0)        
~ ***Yash Agrawall*** ~     

---
## Key Ideas 

- 80% of white-collar jobs have high AI automation potential (Anthropic's "Observed Exposure" index)
- Jobs are being replaced at the **task** level, not the **purpose** level — purpose is irreplaceable
- Original thinkers with *taste* are safer; tool-like workers who follow step 1–2–3 are not
- Big companies (Meta, Oracle, Block) are laying off not because business is bad — but because AI + smaller teams do more
- You can build a full autonomous **job-hunting agent** with Hermes + Hostinger VPS for ~₹800/month
- Personal software is the new competitive edge — building apps for yourself > using generic tools
- The AI opportunity window is bigger than Reels 2020 — and it's open to **everyone** regardless of background

---
## Note

### The Macro Picture — Job Risk

- **US workforce**: 70% white-collar, 30% blue-collar
- White-collar **potential AI exposure**: ~80% of jobs can be end-to-end automated
- Blue-collar exposure: near zero (plumbers, carpenters — physical work)
- **Observed Exposure** (Anthropic's term) = how much AI is *actually* being used vs. potential
  - Gap is massive → current usage is low, potential is huge
  - As gap closes, jobs vanish
- **Higher education = higher risk**: more degrees → more exposed jobs (counterintuitive but data-backed)
- Karpathy's US Job Market Visualizer maps this for all US roles
- They built an **India version**: 127 occupation groups, ~66M workers exposed, 42.6M in high-exposure bracket
  - India's 2 crore white-collar taxpayers generate ₹16–17 lakh crore in income tax — these are the at-risk people

### Task vs. Purpose Framework

- **Task** = sending an email
- **Purpose** = *why* you're sending that email
- AI replaces tasks. Purpose is human.
- People doing step-by-step jobs like tools → replaceable
- People with *taste*, original thinking, experimentation → irreplaceable + will thrive

### Why Companies Are Laying Off (Despite Record Profits)

- **Block (Jack Dorsey)**: "Business is strong. But AI tools + smaller, flatter teams enable a fundamentally new way of building."
  - Fired 4000 / 10000 people. Retained those using AI to multiply output.
- **Meta**: ~8000 layoffs. Oracle: 30% workforce including India teams
- Pattern: save salary money → reinvest in AI infra → buy more GPUs → need fewer people → loop
- Market rewards this: stock goes up 10% on layoff announcements

### Who Survives (and Thrives)

- Not the people doing tasks mechanically
- The people who **use AI to multiply themselves**
- Freshers with 6–12 months of AI-first learning > 3–5 year experience people who haven't unlearned
  - Experienced people resist unlearning; freshers flow like water
- Vaibhav's hiring model: zero-to-junior or senior 6–10 yr managers — no middle layer

### The AGI → ASI Curve

- AGI = AI smarter than every human combined, can do anything better
- Once AGI hits → **singularity**: AI improves itself → exponential self-evolution → ASI
- ~1000–1500 AI researchers globally are driving the entire wave
- That's why Zuckerberg was paying $1B per AI researcher
- Race: whoever hits AGI first → unfair advantage forever (Ferrari vs bicycles)
- Sam Altman, Dario Amodei etc. believe rapid acceleration post-AGI is real

### India's Strategic Play

- India pushed OIDAR tax (18% GST on digital imports) → forced foreign companies to set up local entities
- Visakhapatnam: being called AI capital of India
  - Google, Meta, Oracle all building data centers there
  - Chandrabau Naidu played the same playbook he used for Hyderabad IT boom
- Hyderabad = 2nd highest AI talent density globally, highest AI hiring globally right now
- India's angle: become part of the value chain via data centers + talent pool even without indigenous AI

### Energy as the Real Bottleneck

- Everything runs on energy. If energy cost → 0, everything becomes free/cheap
- **Dyson Sphere** concept: satellites around the sun capturing solar energy
- **Nuclear fusion** investments: Sam Altman (not OpenAI equity, but heavy personal bets in fusion)
- Bezos, Google, Musk → all talking about space-based data centers
- If energy becomes abundant → deflation not inflation → robots do physical work → AI does cognitive work

### Building the Job Hunter Agent (Live Demo Breakdown)

#### Step 1 — Find Jobs via Claude + Indeed MCP
- Connect Indeed connector to Claude
- Drop resume into Claude
- Prompt: expert career counselor, find AI-first remote roles $100K+, no coding required, resilient to AI change
- Claude uses Indeed in background, runs parallel keyword searches, returns 10 matched roles

#### Step 2 — Parallel Apply via Codex + Computer Use
- Give Codex access to folder with resumes/cover letters
- Enable Computer Use plugin
- Codex opens browser, goes to Indeed, fills forms using resume data autonomously
- Has its own cursor — doesn't conflict with your mouse

#### Step 3 — Tailor Resumes for ATS
- ATS (Applicant Tracking System) auto-rejects 99% resumes before human sees them
- Fix: personalize resume per role using job description keywords
- Prompt: rewrite 5 resumes + 5 cover letters + 5 cold emails for top 5 matched roles

#### Step 4 — Build Hermes Autonomous Agent (The "Employee")

**What is Hermes?**
- Open-source self-learning agent
- Has persistent memory
- More reliable than OpenClaw (which was acquired by OpenAI for ~$1B)
- Can be hosted on cloud (VPS) so it runs 24/7 without your computer

**Setup:**
1. Hostinger VPS → ~₹800/month (KVM2 plan)
2. Docker Manager → One-click deploy → search "Hermes" → deploy
3. Connect to **OpenRouter** (unified API for 370+ models — switch Claude/GPT/Gemini anytime)
   - Add API key from OpenRouter
   - Select model (e.g., Claude Sonnet 4.6 or Gemini 2.5 for cheap long tasks)
4. Connect Telegram/Slack/WhatsApp as the chat interface

**What you tell Hermes:**
- Your full resume → persistent memory
- Task: Every day at 7 AM, scout internet for 10 AI-first remote jobs ($100K+) from last 24 hours
- Spin up 3 sub-agents: (1) Resume rewriter, (2) Cover letter writer, (3) Research-to-audio podcast
- Have everything ready by 10 AM
- Read my dedicated job-application email → if interview call arrives → trigger interview prep protocol

**Why it works:**
- Cron jobs = scheduled tasks (it wakes itself up at set time)
- Self-learning over time → gets sharper about your preferences
- Uses local models (Ollama) for long overnight tasks = zero API cost

#### Step 5 — Interview Prep App (Perplexity Computer)
- Dump job description + resume into Perplexity Computer
- Prompt: research Anthropic interview questions specific to this role + my profile, build an MCQ quiz app with answers + coaching
- App built in ~5 min with 80 questions, model answers, live coaching
- Also: use ChatGPT voice mode as mock interviewer → real-time feedback

### Vaibhav's Mental Model on Hiring

- Old: 1000 people needed → didn't attempt the big thing
- Now: same work doable with 50 → ambition unlocked
- 250-person team today doing work of 2000
- New jobs being manufactured that didn't exist before — each person doing work of 5–10 previous employees

---
# Questions 

- How do you prevent Hermes agent from hallucinating job applications (filling wrong info, lying on forms)?
- What's the actual legal/ethical line between AI-assisted job applications and misrepresentation?
- Karpathy's India visualizer — is it publicly available? Was it actually built or just demoed?
- At what point does the "observed exposure gap closing" trigger mass displacement — is there a timeline estimate?
- For Zaffee / AI agency: which specific job categories in this data have the *highest leverage* for building service businesses around?

---
# Summary

White-collar jobs face ~80% AI automation potential; the gap between potential and actual exposure is rapidly closing. The core survival framework is **task vs. purpose** — AI replaces step-by-step task execution, not the original thinking behind why you're doing something. Big companies are already acting on this (Meta, Oracle, Block), laying off not because of losses but to reinvest salary budgets into AI infra. The practical upside: anyone can now build autonomous AI "employees" using open-source agents (Hermes), cheap VPS hosting (~₹800/mo), and OpenRouter — enabling one person to run job hunting, resume tailoring, interview prep, and application filing fully on autopilot. The 2026 AI window is the same arbitrage opportunity as Reels in 2020, but 100x bigger and open to everyone regardless of background.

---
# References 

- Video: https://youtu.be/kKNoBH0iE1k?si=HxT_VeGDbJd7AqF0
- Channel: Figuring Out AI (Vaibhav Sisinty + Raj)
- Anthropic Economic Index / Observed Exposure Report
- Andrej Karpathy's US Job Market Visualizer (GitHub)
- Block/Square layoff tweet — Jack Dorsey (64M views)
- Tools mentioned: Hermes Agent (open-source), Hostinger VPS, OpenRouter, Codex, Perplexity Computer, Zapier Agents, Cowork (Claude), Om Desktop, Ollama, Feedly, comT browser
- Concepts: AGI, ASI, Singularity, Dyson Sphere, Universal Basic Income, OIDAR tax
- Visakhapatnam AI capital / Chandrabau Naidu IT playbook
