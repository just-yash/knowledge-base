
Type : #Research    
Date : 2026-05-11          
Status : #draft           
~ ***Yash Agrawall*** ~  

---
# Multi-Camera Surveillance — Paper Draft

**Working Title:** Real-Time Multi-Camera Person Re-Identification for Threat Detection in Surveillance Systems

**Target Venue:** TBD (IEEE ICIP / CVPR Workshop / IJCV)

---
## Abstract (Draft)

> [To be written after results are obtained]

We propose a real-time pipeline for multi-camera person re-identification that enables threat detection across non-overlapping camera feeds. Our system integrates YOLOv8 for detection, DeepSORT for single-camera tracking, and OSNet-based appearance features for cross-camera identity matching. We evaluate on [dataset] and demonstrate [metric] performance at [FPS] on consumer GPU hardware, making the system deployable in resource-constrained surveillance environments.

---
## 1. Introduction

**Problem:** Surveillance systems with multiple cameras fail to track individuals across camera boundaries because each camera manages its own identity space. A person flagged in Camera A cannot be automatically recognised in Camera B.

**Gap:** Existing multi-camera tracking systems are either too computationally expensive for real-time use or require overlapping camera FOVs.

**Contribution:**
1. An end-to-end pipeline combining detection, tracking, and cross-camera re-ID
2. A deployment-ready implementation tested on [hardware spec]
3. Evaluation on standard benchmarks with ablation study

---
## 2. Related Work

> [Expand from Literature Review]

---
## 3. Methodology

### 3.1 Detection
### 3.2 Single-Camera Tracking
### 3.3 Appearance Feature Extraction
### 3.4 Cross-Camera Re-Identification
## 4. Experiments

### 4.1 Datasets
### 4.2 Evaluation Metrics
### 4.3 Results
## References

> [Populate from Literature Review]
