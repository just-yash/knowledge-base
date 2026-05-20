
Type : #Note #Research       
Date :  2026-05-06  
Tags :  [[Research]]       
Status : #incomplete     
~ ***Yash Agrawall*** ~  

---
# Research Rating

### 1. Research Topic Rating — 8.5 / 10

**Why it's strong:**

- Multi-camera coordination + facial recognition + real-time threat detection is a genuinely hard problem. Not a toy project.
- The field is active (2022–2025 papers on ReID, ByteTrack, YOLOv8 are recent) — you're not working on a dead topic
- India-specific demand is enormous: Kumbh Mela, UPSC exam halls, airport crowd flow, railway stations — no dominant local player
- It sits at the intersection of CV + security + systems engineering — rare combination that's hard to replicate
- Portfolio value is extremely high: a working demo of this opens incubator doors, security firm conversations, and research collaborations

**Why it's not 10/10:**

- Privacy and legal risk is real — facial recognition in public spaces is facing regulatory pressure globally. India doesn't have a clear law yet but it's coming. You need to frame your research carefully around ethical deployment or controlled environments (exam halls, workplaces with consent) rather than open public surveillance
- Competition at the research level is stiff — Stanford, CMU, and several Chinese labs have published extensively on this. Your contribution needs to be specific, not general

**Verdict:** Extremely well-chosen. The commercial application depth you've listed is exactly what separates a research project from a research _platform_. Most students pick a topic and stop. You've already thought about 10+ verticals. That's the mindset of someone building a product, not just submitting a paper.

---

### 2. Application Ratings + Monetization Potential

|Application|Market Potential|Competition|India Fit|Verdict|
|---|---|---|---|---|
|**Exam Integrity System**|🔴 Very High|Low (no dominant Indian player)|Perfect|**Build this first**|
|**Multi-Camera Surveillance**|🔴 Very High|Medium (global players, weak in India)|Very high|**Core research → B2B**|
|**Crowd Monitoring (Kumbh, airports)**|🔴 Very High|Low in India|Perfect|**Government contract potential**|
|**Restricted Area Access Control**|🟡 High|High (ZKTeco, face-ID hardware exists)|Medium|Viable but crowded|
|**Classroom Monitoring**|🟡 High|Medium|High|Needs EdTech partner|
|**Workplace Attendance**|🟡 Medium|Very High (HRMSs already do this)|High|Crowded, low margin|
|**Retail Analytics**|🟡 Medium|Medium (few Indian players)|Medium|Niche: jewellery, luxury|
|**Home Surveillance**|🟢 Medium|High (consumer hardware)|Medium|Low B2B value|
|**Photo/Video Organization**|🟢 Low|Extremely High (Google Photos)|Low|**Drop this entirely**|
|**Multi-Modal Identity Fusion**|🔴 High|Research-only for now|—|Year 2+ research direction|
|**Behaviour-Aware AI**|🔴 Very High|Research-only|—|Long-term product direction|

**The sequencing that makes sense:**

Start with **Exam Integrity** as your first commercial product. Here's why:

- Every college in India has this problem — it's felt personally by every administrator you'd pitch to
- Consent is built-in (students register, cameras are disclosed) — sidesteps the privacy problem
- Budget exists — CBSE, state boards, private universities all spend on invigilation
- Your research system maps directly: facial verification at entry (identity) + in-exam monitoring (head turns, gaze direction, object detection for phones/chits)
- First customer could be your own college — IGIT Sarang

**Exam Integrity → Multi-Camera Surveillance → Crowd Monitoring** is the 3-product roadmap. Each builds on the same core technology stack. Each is a larger contract than the last.

---

### 3. Using Claude to Generate a Research Report Instead of Reading Papers — No. This is a Bad Idea.

Directly: **don't do this**. Here's exactly why.

**Problem 1 — Hallucination in technical domains is invisible** Claude generates plausible text. In a research context, "plausible" means it will describe benchmark numbers, architecture details, and method comparisons that sound correct but may be wrong or imprecise. If you build your methodology on a Claude-synthesized understanding of OSNet or ByteTrack and something is subtly wrong, your implementation will fail in ways you can't trace back to the source.

**Problem 2 — Knowledge cutoff kills recency** The most important papers for your topic — recent YOLOv8 variants, 2024 ReID improvements, latest ByteTrack extensions — are at or beyond Claude's training cutoff. A generated report will underrepresent the most current work, which is exactly what you need to know to identify the research gap your paper addresses.

**Problem 3 — You cannot cite a Claude-generated report** Your paper needs citations to actual papers. If you read Claude's synthesis and then try to cite the papers it mentions, you risk citing them incorrectly — attributing claims to a paper that doesn't make that claim, or missing the nuance that makes a citation accurate. Reviewers catch this.

**Problem 4 — Research gaps live between papers, not inside them** The reason you read 10–15 papers is not to absorb each one in isolation — it's to find what none of them have solved yet. That gap is your contribution. Claude's synthesis will smooth over contradictions and gaps between papers, because it's designed to produce coherent text. The incoherence between papers is where your research lives.

---

**What to do instead — a system that's actually faster than reading 20 papers raw:**

- **Step 1:** Use Semantic Scholar or Elicit to find the 10–12 most-cited papers in your exact area. Search: "multi-camera person re-identification", "real-time crowd surveillance", "YOLOv8 tracking". Take the top 5 by citation count + top 5 recent (2023–2025).
- **Step 2:** For each paper — read abstract + introduction + conclusion only (15 minutes per paper). This gives you the claim, the method summary, and the result. You now understand 12 papers in 3 hours.
- **Step 3:** Upload the 3–4 most relevant PDFs to NotebookLM. Ask it: "What does this paper claim its limitation is?", "How does this compare to [other paper]?", "What dataset did they use and what was missing?" This is Claude-assisted reading, not Claude-replacing reading.
- **Step 4:** Deep-read only the 3–4 papers that are most directly related to your exact system. Read methodology and experiments sections fully for these. Everything else is citation-level understanding.
- **Step 5:** Use Claude to help you _organize_ your notes and _identify patterns_ — not to replace the reading. "Here are my notes on 8 papers. What gaps do you see? What have none of them addressed?" That's a legitimate and powerful use.

This approach takes 2–3 days total and gives you a genuine, defensible understanding of the literature — not a summarized version you half-understand and can't defend in a viva or peer review.
---
## Core Idea 




---
## Explanation 




---
## Why It Matters
---
# Questions
---
# References 
