Date : 2026-03-29  
Tags : [[Research]] [[Security]]  
~ ***Yash Agrawall*** ~

---
# 🔹 PHASE 1 — Core Pipeline (Days 1–4)

> Goal: Identity extraction (FOUNDATION)

---

## Day 1 → Face Detection (Concept + Models)

From Claude:
→ 1.1 Stage 1

### Study:

#### Concept
- What is face detection
- Pipeline role

#### Methods & Models (MANDATORY)
- Sliding Window (Viola-Jones)
- Anchor-based vs Anchor-free
- MTCNN
- RetinaFace
- SCRFD
- YOLO-Face variants

#### Metrics
- Precision / Recall
- WIDER FACE (Easy / Medium / Hard)

Create:
[[Face Detection]]

---
## Day 2 → Face Alignment (Concept + Models)

→ 1.1 Stage 2

### Study:

#### Concept
- Why alignment is required
- Landmark normalization

#### Methods & Models
- 5-point vs 68-point landmarks
- DAN (Deep Alignment Network)
- PFLD
- 3DDFA (3D alignment)

#### Concepts
- Yaw / Pitch / Roll

Create:
[[Face Alignment]]

---
## Day 3 → Face Embedding (Concept + Models)

→ 1.1 Stage 3  
→ 2.1 CNN Models  
→ 2.2 Transformer Models  

### Study:

#### Concept
- Embedding space
- Intra-class vs inter-class

#### Models (MANDATORY)
- DeepFace
- FaceNet (Triplet Loss)
- VGGFace
- SphereFace
- CosFace (LMCL)
- ArcFace
- MagFace
- AdaFace

#### Loss Functions
- Contrastive Loss
- Triplet Loss
- Margin-based Softmax

#### Transformer Models
- ViT (Vision Transformer)
- FaceTransformer
- TransFace
- UniFormer

Create:
[[Face Embedding]]

---
## Day 4 → Face Matching (Concept + Systems)

→ 1.1 Stage 4

### Study:

#### Concept
- Similarity search
- Verification vs Identification

#### Math
- Cosine similarity
- Threshold (τ)

#### Systems (MANDATORY)
- FAISS
  - IVF
  - HNSW
  - PQ
- ScaNN
- Milvus

Create:
[[Face Matching]]

---
## 🎯 End of Phase 1

Image → Face → Vector → Identity

---
# 🔹 PHASE 2 — Time + Motion (Days 5–6)

> Goal: Identity over time (CONTINUITY)

---

## Day 5 → Multi-Object Tracking (Concept + Models)

→ 2.4 Multi-Object Tracking

### Study:

#### Concept
- Tracking = short-term identity
- Tracklet ≠ Identity

#### Core Components
- IoU
- Kalman Filter
- Hungarian Algorithm

#### Models (MANDATORY)
- SORT
- DeepSORT
- ByteTrack
- OC-SORT
- BoT-SORT
- StrongSORT

#### Metrics
- MOTA
- IDF1
- HOTA

Create:
[[Multi-Object Tracking]]

---

## Day 6 → Tracking Deep Dive (Failure + Internals)

→ 1.3 Challenges

### Study:

#### Failure Modes
- Occlusion
- ID Switch
- Track Fragmentation
- Drift
- Lighting variation
- Scale mismatch

#### Deep Concepts
- Motion vs Appearance vs Spatial signals
- Cost function importance

---

## 🎯 End of Phase 2

Tracking = identity under continuity assumptions

---

# 🔹 PHASE 3 — Identity Beyond Continuity (Days 7–9)

> Goal: Identity when tracking fails

---

## Day 7 → ReID (Concept + Models)

→ 2.3 Person Re-Identification

### Study:

#### Concept
- ReID = identity across discontinuity
- Relation to tracking failure

#### Models (MANDATORY)
- OSNet
- FastReID

#### Concepts
- Appearance embeddings
- Feature invariance

Create:
[[ReID]]

---

## Day 8 → Cross-Camera Matching

→ 1.2

### Study:

- Cross-camera identity matching
- Overlapping vs non-overlapping cameras
- Spatio-temporal constraints

Create:
[[Cross-Camera Matching]]

---

## Day 9 → Camera Calibration

→ 1.2

### Study:

- Camera calibration
- Time synchronization
- Multi-camera alignment

Create:
[[Camera Calibration]]

---

## 🎯 End of Phase 3

Tracking fails → ReID recovers identity

---

# 🔹 PHASE 4 — System Thinking (Days 10–12)

> Goal: Full system design

---

## Day 10 → System Architecture

→ 4.1

### Study:

- Camera network topology
- Data flow

Create:
[[System Architecture]]

---

## Day 11 → Edge vs Cloud Systems

→ 4.1

### Study:

- Edge vs Cloud vs Hybrid
- Latency vs compute trade-offs

Create:
[[Edge vs Cloud Systems]]

---

## Day 12 → Identity Association (Fusion)

→ 2.6  
→ 4.1  

### Study:

#### Signals
- IoU (spatial)
- Motion (Kalman)
- ReID (appearance)

#### Concepts
- Graph-based matching
- Global identity assignment

Create:
[[Identity Association]]

---

## 🎯 End of Phase 4

System = multi-signal identity engine

---

# 🔹 PHASE 5 — Threat Detection (Days 13–15)

---

## Day 13 → Behavioral Analysis

→ 5.1

- Loitering detection
- Suspicious movement
- Abandoned object detection

---

## Day 14 → Action Recognition

→ 5.3

- Violence detection
- Weapon detection

---

## Day 15 → Anomaly Detection

→ 5.4

- Unusual crowd behavior

---

# 🔹 PHASE 6 — Data + Deployment (Days 16–17)

---

## Day 16 → Datasets & Benchmarks

→ 6

- Face datasets
- ReID datasets
- MOT datasets
- Anomaly datasets

---

## Day 17 → Real-World Systems

→ 7

- Distributed systems
- Latency optimization
- Storage & retrieval
- API design

---

# 🔹 PHASE 7 — Risks + Security (Days 18–19)

---

## Day 18 → Challenges & Limitations

→ 8

- Bias
- Scalability
- Cross-camera errors

---

## Day 19 → Security Risks

→ 9

- Spoofing
- Deepfakes
- Adversarial attacks

---

# 🔹 PHASE 8 — Research Mode (Day 20+)

---

## Read Papers

→ 3

- ArcFace
- ByteTrack
- OSNet / FastReID

---

# 🧠 DAILY ROUTINE (STRICT)

1. Read (20–30 min)
2. Write note
3. Add models INSIDE the note
4. Write 3 bullet summary
5. Draw 1 diagram
6. Answer:
   - What problem does this solve?
   - Where does it fit?

---

# ⚠️ RULES

- One concept per day + ALL its models
- Never postpone models
- Skip details, NOT concepts
- Don’t read linearly

---

# 🧠 FINAL SYSTEM

Detection → Alignment → Embedding → Matching  
→ Tracking → ReID → Identity Association  
→ System → Application → Deployment

---

# 🧠 Folder Logic

01 - Pipeline  
02 - Models  
03 - Multi-Camera  
04 - Threat Detection  
05 - Papers  
06 - Concepts  