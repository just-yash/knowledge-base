
Type : #Note    
Date : 2026-05-27    
Tags : [[AI]]    
Status : #incomplete     
~ ***Yash Agrawall*** ~     

---
# Agentic AI

---
## Core Idea 

An **agentic AI system** is an LLM-powered agent that can perceive its environment, plan multi-step actions, use tools, and execute tasks autonomously — without requiring a human to issue every instruction.

Key shift: LLM as a **brain** (reasoning + decision-making), not just a text generator.

**Three pillars:**
- **Perception** — reads context (text, files, APIs, memory)
- **Planning** — decomposes goals into sub-tasks (ReAct, CoT, ToT)
- **Action** — executes via tools (web search, code runner, APIs, file I/O)

---
## Explanation 

**Core Architecture:**
```
Goal → Planner → Sub-tasks → Tool Use → Observation → Replan → Output
```

**Key Components:**

- **LLM Core** — reasoning engine; decides what to do next
- **Memory**
  - Short-term: in-context window (conversation history)
  - Long-term: vector DB (embeddings + retrieval)
- **Tools** — functions the agent can call (search, run code, read/write files, call APIs)
- **Action Loop (ReAct Pattern)**
  - `Thought → Action → Observation → Thought → ...` until task complete
- **Orchestrator** — manages multi-agent pipelines; routes tasks to specialized sub-agents

**Agent Types:*×

| Type | Behavior |
|---|---|
| Single-agent | One LLM + tools, handles full task |
| Multi-agent | Orchestrator + specialized sub-agents |
| Autonomous | Self-directed, minimal human input |
| Human-in-loop | Pauses for approval at critical steps |

**Planning Strategies:**
- **ReAct** — interleaves reasoning + acting
- **Chain-of-Thought (CoT)** — explicit reasoning steps before action
- **Tree-of-Thoughts (ToT)** — explores multiple reasoning paths, picks best
- **Plan-and-Execute** — full plan upfront, then execute step-by-step

**Popular Frameworks:**
- LangChain / LangGraph — graph-based agent flows
- AutoGen (Microsoft) — multi-agent conversation framework
- CrewAI — role-based agent teams
- OpenAI Assistants API — managed agent with persistent threads + tools

**Failure Modes:**
- Hallucinated tool calls
- Infinite loops (no exit condition)
- Context blowup (long tasks exhaust context window)
- Compounding errors (bad step 1 → worse step 2)

---
## Why It Matters 

**For research (threat detection pipeline):**
- Agentic loop = detection → tracking → alerting → logging, all autonomous
- Multi-agent: one agent per camera, orchestrator merges cross-camera data

**For AI Agency business:**
- Agents are the product — automate client workflows (lead gen, outreach, data pipelines)
- Highest-leverage skill to monetize right now
- Build once, sell as service or SaaS

**For Exam Integrity MVP:**
- Agentic pipeline: detect → re-identify → flag → alert → log evidence
- Human-in-loop at flagging step = defensible + accurate

**Market signal:**
- Every serious AI product in 2025–26 is agent-based
- Knowing architecture = can build, debug, and sell these systems

---
# Questions 

- How do you prevent infinite loops in production agents?
- When is multi-agent overkill vs. necessary?
- How does memory retrieval affect latency in real-time systems?
- What's the right granularity for sub-tasks in a planning agent?
- How to evaluate agent reliability before deploying to clients?

---
# References 

- ReAct paper — Yao et al., 2022 (arxiv.org/abs/2210.03629)
- LangGraph docs — langchain-ai.github.io/langgraph
- AutoGen — microsoft.github.io/autogen
- OpenAI Assistants API — platform.openai.com/docs/assistants
- Lilian Weng, "LLM Powered Autonomous Agents" — lilianweng.github.io/posts/2023-06-23-agent
- [[Prompts]]  

