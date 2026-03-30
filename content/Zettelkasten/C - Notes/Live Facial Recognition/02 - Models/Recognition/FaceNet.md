Date : 2026-03-30  
Tags : [[Research]] [[Security]] [[Computer Vision]]  
~***Yash Agrawall***~

---
# FaceNet

## 🧠 In One Sentence
- Learns face embeddings by directly optimizing distances so same identities are closer than different ones.

---

## 🎯 What Problem Does This Solve?
- Converts faces into embeddings where similarity can be measured using distance  
- Avoids classification-based training → works directly in embedding space  
- Enables flexible identity comparison without fixed classes  

---

## 📍 Where Does It Fit in the System?

- Stage : Embedding
- Comes after : [[Face Alignment]]
- Feeds into : [[Face Matching]] ; [[ReID]]

---

## 🔄 Input → Output

- Input : Face images (anchor, positive, negative)  
- Output : Embedding space where:
  - same identity → close  
  - different identity → far  

---

## 🧩 Intuition (Explain Like I’m 12)

- Pick:
  - one face (anchor)  
  - same person (positive)  
  - different person (negative)  

- Train so:
```text
anchor is closer to positive than to negative
```

---
## ⚙️ How It Works (Simple → Detailed)

### Step 1 — Feature Extraction

- Pass face through CNN (e.g., Inception network)
- Get embedding vector

---

### Step 2 — Triplet Formation

- Select:
    - Anchor (a)
    - Positive (p)
    - Negative (n)

---

### Step 3 — Distance Constraint

Ensure:

$$||f(a) - f(p)||^2 < ||f(a) - f(n)||^2$$

---

### Step 4 — Triplet Loss

$$||f(a)-f(p)||^2 - ||f(a)-f(n)||^2 + \alpha$$

- α = margin
- forces separation between identities

---
### Step 5 — Triplet Mining (Critical)

- Easy triplets → no learning
- Hard triplets → effective learning

Types:

- Hard
- Semi-hard (most commonly used)

---

### Key Insight

- Learns **relative distances**, not class boundaries
- Directly optimizes embedding space

---

## ⚠️ Limitations (Why This Alone Is Not Enough)

- Requires careful triplet selection (hard mining problem)
- Training is slow and unstable
- Needs large datasets
- Less efficient than margin-based methods (e.g., [[ArcFace]])

---
## 🧠 Key Terms

|Term|Meaning (Simple)|
|---|---|
|Anchor|Reference face|
|Positive|Same identity as anchor|
|Negative|Different identity|
|Triplet Loss|Loss enforcing distance constraints|
|Margin (α)|Minimum separation between identities|

---
## 🔗 Connections

- Builds on → [[Face Embedding]]
- Used by → [[Face Matching]]
- Related to → [[ArcFace]] ; [[Similarity Metrics]] ; [[Embedding Space]]

---
## 📄 Related Models / Methods

- [[ArcFace]] → margin-based improvement
- [[CosFace]] → additive cosine margin

---
## 📚 Related Papers

- FaceNet: A Unified Embedding for Face Recognition and Clustering (Schroff et al., 2015)

---
## ❓ Questions

###### Q1) Why is triplet mining important?

###### A1)

- Without hard triplets, model learns nothing useful
- Good triplets drive meaningful separation

---
## 📝 Summary

- Uses triplet loss to learn embedding space
- Optimizes distances directly
- First major metric learning approach
- Foundation for modern face recognition
- Replaced in practice by margin-based methods

---
## 📌 References

- [[Claude Research]]