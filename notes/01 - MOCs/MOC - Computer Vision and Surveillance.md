
Type : #MOC    
Date : 2026-05-11          
Status : #incomplete           
~ ***Yash Agrawall*** ~  

---
# Purpose 

> Why does this MOC exist? 
This MOC maps the full knowledge base for the multi-camera face recognition and threat detection research project — from pipeline stages to model choices to open research questions.

> What problem does it solve? 
Research notes on face detection, embedding, tracking, and multi-camera systems were scattered across subfolders. This MOC connects the pipeline end-to-end and links every note to the larger system.

> What does mastering this domain enable?
Mastering this domain produces a working prototype, a publishable research paper, and a portfolio-grade AI security project — all three of which convert directly into positioning and income.

---
# Main Areas 

- Research Planning and Project Overview
- Core Face Recognition Pipeline
- Models (Embedding and Tracking)
- Computer Vision Concepts
- Research Reports and Literature
- Future Directions

---
# Study Flow 

### Research Planning
- [[Research Rating]] — rating and evaluation framework for research progress

### Core Pipeline
- [[Face Detection]] — detecting faces in frames as the first pipeline stage
- [[Face Alignment]] — aligning detected faces to a canonical pose before embedding
- [[Face Embedding]] — converting aligned faces into vector representations
- [[Face Matching]] — matching embeddings against a database for identification

### Models
- [[FaceNet]] — FaceNet architecture for face embedding using triplet loss
- [[ArcFace]] — ArcFace additive angular margin loss for discriminative face embeddings
- [[Multi-Object Tracking]] — multi-object tracking methods for following faces across frames

### Concepts
- [[Facial Angles]] — how facial pose angles affect recognition accuracy

### Future Directions
- [[Future Works (Research)]] — open problems and next steps for the multi-camera surveillance research

---
# Related Tags 

[[Research]] ; [[Computer Vision]] ; [[security]] ; [[AI]]

---
# Related Research 

- [[Architecture]]
- [[Literature-Review]]

---
# Related Projects 

-

---
# Open Questions
> What do you still not understand in this domain? What would the next paper or project need to address?

- How do you maintain consistent person identity across cameras with non-overlapping fields of view without GPS or explicit handoff signals?
- What is the minimum viable hardware setup (camera count, GPU spec) for a real-time system at 25+ fps?
- How do you handle adversarial conditions — occlusion, disguise, lighting changes — without retraining the entire model?

---
# References 

-
