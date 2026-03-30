
Date : 2026-03-30
Tags : [[Research]] ; [[Computer Vision]]
~***Yash Agrawall***~

---
# Multi-Object Tracking

## 🧠 In One Sentence
Track multiple people across frames by maintaining consistent identities under temporal continuity

---
## 🎯 What Problem Does This Solve?
Maintains identity across consecutive frames assuming motion continuity and stable detection.  
  
> Tracking works only when continuity assumptions hold (no long occlusion, smooth motion).

---
## 📍 Where Does It Fit in the System?

- Stage : Tracking
- Comes after : [[Face Matching]] / [[Face Detection]]
- Feeds into : [[ReID]] / [[Identity Association]] 

---
## 🔄 Input → Output

- Input : Video frames + detected objects (bounding boxes + embeddings)
- Output : Tracklets (temporary identity assignements over time)

---
## 🧩 Intuition (Explain Like I’m 12)
Follow each person in a video and keep giving them the same ID even as they move around.

---
## ⚙️ How It Works (Simple → Detailed)

1. Detect objects in each frame  
2. Predict next position using motion model  
3. Match detections to existing tracks  
4. Update or create tracklets

### Core Components 

- **Tracklet** 
	- Sequence of detections belonging to the same object across frames  
	- **Tracklet ≠ Identity**  
	- Tracklet = temporary hypothesis of identity
	- Example : 
		Frame 1 → person A  
		Frame 2 → person A  
		Frame 3 → person A  
	- basic unit of tracking 
	- later used for 
		- re-linking identities 
		- [[ReID]]

- **ID Switch** 
	- Same person assigned different IDs  
	- Occurs when association fails
	- Example : 
		Frame 1 → Person A = ID 1  
		Frame 2 → Person A = ID 2 ❌
	- this breaks identity consistency 
	- critical failure in surveillance 

- **IoU** 
	- Intersection over Union 
	- measure how much two bounding boxes overlap 
	- Spatial signal, not identity proof
	- low IoU (near 0) → poor overlap 
	- high IoU (near 1) → good overlap 
![[Pasted image 20260330151428.png]]

- **Motion Model** 
	- predicts position (Kalman Filter) based on past motion
	- assumes : 
		- smooth motion 
		- linear trajectory
	- fails when : 
		- sudden movement
		- crowd interaction 
		- non-linear motion

- **Kalman Filter** 
	- prediction algorithm that estimates the next position of a moving object 
	- predicts where the object will be in the next frame 
	- predicts even if detection is missing or noisy

- **Hungarian Algorithm** 
	- algorithm that finds the best matching between detections and tracks 
	- minimizes total matching cost 
	- without it 
		- ID switches increases 
		- matching is wrong 

- **Data Associations** 
	- matches detections to existing tracks
	- uses :
		- IoU (spatial consistency)
		- appearance similarity 

- **Assignment Algorithm** 
	- Hungarian Algorithm (optimal matching)

### Key Methods 

#### SORT (2016)
- Simple Online and Realtime Tracking
- uses : 
	- Kalman Filter + IoU
- very fast (260 Hz)
- relies purely on bounding box overlap → Fails under occlusion or when detection missed

#### DeepSORT (2017)
- SORT + deep appearance descriptor (cosine metric) for reassociation
- adds appearance features (cosine similarity)
- uses Hungarian algorithm for global assignment combining : 
	- motion (Mahalanobis distance)
	- appearance (cosine distance)
- maintains tracklet gallery 
- strong baseline for surveillance tracking

#### ByteTrack (2022)
- associates low-confidence detections (typically 0.1–0.5 score range)
- low confidence detections : occluded objects
- two-stage matching 
	- high-confidence first 
	- then low confidence 
	- re-link lost tracklets
- handles occlusion better 
- SotA on MOT17/MOT20 benchmarks 

#### OC-SORT (2022)
- Observation-Centric SORT
- fixes Kalman filter state corruption during occlusion 
	- using Observation-Centric re-update
- handles non-linear motion (turning people)
- robust in crowded scenes 

#### BoT-SORT (2022)
- Combines : 
	- camera motion compensation + improved Kalman filter + IoU + ReID fusion 
- high accuracy 
- SotA on MOT17

#### StrongSORT (2023)
- Improves DeepSORT
- Adds : 
	- ECC (Enhanced Correlation Coefficient) camera motion compensation
	- AFLink (Appearance-Free Link) post-processing
	- GSI (Gaussian-Smoothed Interpolation)
- strong baseline across benchmarks

### Tracking Metrics 

#### MOTA
- Multi Object Tracking Accuracy 
- penalizes : 
	- false positives 
	- missed detections 
	- ID switches 

#### IDF1
- IDF1 → measures how consistently identities are tracked across frames
- More sensitive to ID consistency than MOTA
- more important for surveillance

#### HOTA 
- Higher Order Tracking Accuracy 
- balances detection + association accuracy at multiple localization thresholds 
- modern evaluation metric 

### Track Lifecycle

- track initialized → when new detection appears  
- track updated → when matched  
- track lost → when detection missing  
- track terminated → if lost too long  

### System-Level View 

| Component | Role | Signal Type |
|----------|------|------------|
| Tracking | Maintains identity across frames | Motion + Spatial |
| ReID | Recovers identity across gaps/cameras | Appearance |
| Fusion | Combines all signals for assignment | Decision |

---
## ⚠️ Limitations (Why This Alone Is Not Enough)

- Fails under : 
	- heavy occlusion 
	- crowded scenes 
	- fast motion
- identity switches still occur 
- depends on detection quality 
- cannot track across cameras 
- struggles with fast motion and abrupt direction changes

---
## 🧠 Key Terms

| Term                | Meaning (Simple)                      |
| ------------------- | ------------------------------------- |
| Tracklet            | Sequence of detections for one object |
| ID Switch           | When identity changes incorrectly     |
| IoU                 | Overlap between bounding boxes        |
| Kalman Filter       | Predicts next position                |
| Hungarian Algorithm | Optimal matching method               |

---

## 🔗 Connections

- Builds on → [[Face Detection]] ; [[Face Matching]]
- Used by → [[ReID]]
- Related to → [[Object Tracking]] ; [[Similarity Metrics]] ; [[Embedding Space]]  

---
## 📄 Related Models / Methods

- [[DeepSORT]]
- [[ByteTrack]]
- [[BoT-SORT]]

---

## 📚 Related Papers

- 

---
## ❓ Questions

Q1) Why does tracking fail during occlusion?   
A1) Because the object disappears, breaking continuity and causing ID switches.

---
## 📝 Summary

- Maintains identity across frames using motion + association  
- Produces tracklets (not true identity)  
- Works under continuity assumptions  
- Fails when continuity breaks → requires 

---
## 📌 References

- [[Claude Research]]