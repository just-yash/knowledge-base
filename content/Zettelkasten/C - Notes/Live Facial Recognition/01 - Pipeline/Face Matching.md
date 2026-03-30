
Date : 2026-03-30  
Tags : [[Research]] ; [[Computer Vision]]  
~***Yash Agrawall***~

---
# Face Matching

## 🧠 In One Sentence
- Compare face embeddings to determine identity by measuring similarity in embedding space.

---
## 🎯 What Problem Does This Solve?
- Determines whether two faces belong to the same person or identifies a person from a database.

---
## 📍 Where Does It Fit in the System?

- Stage : Matching
- Comes after : [[Face Embedding]]
- Feeds into : [[Tracking-by-Detection]] / [[ReID]]

---
## 🔄 Input → Output

- Input : Probe embedding ($q$) + Gallery embeddings ($g_{1}, g_{2}, \dots, g_{n}$)
- Output : Identity or similarity score

---
## 🧩 Intuition (Explain Like I’m 12)
Compare two “face fingerprints” and see how similar they are—closer means same person.

---
## ⚙️ How It Works (Simple → Detailed)
- Compute similarity between embeddings  
- Common metric: **cosine similarity**

### Identification
$$i^* = \arg\max_i \; \cos_{\text{sim}}(q, g_i)$$
accept if 
$$\cos_{\text{sim}}(q, g_{i^*}) > \tau$$
- $\arg\max_{i}$ : return the index `i` for which the value is maximum
- $\cos_{sim}(q, g_i)$ : cosine similarity between $q$ (probe : query face) and $g_{i}$ ($i^{th}$ gallery face)
- Pick the identity with highest similarity to the probe

### Matching Types 
#### 1 : 1 Verification
- Compare probe with claimed identity 
- Output : same / different (binary)

#### 1 : N Identification 
- Compare probe with all gallery embeddings 
- Output : best match 

#### Open-Set Identification 
- Same as 1 : N
- But rejects if similarity < threshold ($\tau$)

### Key Concepts 

- **Threshold** ($\uptau$) controls  :
	- false positives (wrong matches)
	- false negatives (missed matches)

- Similarity v/s Distance 
	- similarity (cosine) → higher = more similar 
	- distance (Euclidean) → lower = more similar

### Scalability Problem 
- Large systems → millions of embeddings 
- Brute-force comparison = slow

### Approximate Nearest Neighbor (ANN)
- used for fast search in large databases: 

- **FAISS** 
	- Facebook AI Similarity Search 
	- GPU accelerated ANN
	- supports : 
		- IVF (Inverted File Index)
		- HNSW (Hierarchical Navigable Small World)
		- PQ (Product Quantization)

- **ScaNN** 
	- Scalable Nearest Neighbours - Google 
	- optimized vector search 

- **Milvus** 
	- distributed vector database
	- production-ready 

---
## ⚠️ Limitations (Why This Alone Is Not Enough)

- Depends heavily on embedding quality  
- Threshold selection is difficult  
- Can produce false matches in large-scale systems

---
## 🧠 Key Terms

| Term              | Meaning (Simple)                   |
| ----------------- | ---------------------------------- |
| Probe             | Query face embedding               |
| Gallery           | Stored embeddings database         |
| Cosine Similarity | Measure of angle between vectors   |
| Threshold (τ)     | Minimum similarity for valid match |
| ANN | Fast approximate search in large datasets |
| argmax | index of maximum similarity |

---
## 🔗 Connections

- Builds on → [[Face Embedding]]
- Used by → [[Tracking-by-Detection]] ; [[ReID]]
- Related to → [[Similarity Metrics]] ; [[Embedding Space]]

---
## 📄 Related Models / Methods

- [[FAISS]] 
- [[ScaNN]]
- [[Milvus]]

---

## 📚 Related Papers

- 

---
## ❓ Questions

###### Q1) Why not compare all embeddings directly?  
###### A1) 
Because it becomes too slow for large-scale systems.

---
## 📝 Summary

- Compares embeddings to identify faces  
- Uses similarity metrics (cosine)  
- Supports verification and identification  
- Requires efficient search methods at scale

---
## 📌 References

- [[Claude Research]]