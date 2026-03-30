
Date : 2026-03-29  
Tags : [[Research]] ; [[Computer Vision]]  
~***Yash Agrawall***~

---
# Face Alignment

## 🧠 In One Sentence

- Normalize a detected face to a standard pose so embeddings are consistent and comparable.

---
## 🎯 What Problem Does This Solve?

- Reduces variations in position, rotation, and scale so embeddings become consistent

---
## 📍 Where Does It Fit in the System?

- Stage : Alignment
- Comes after : [[Face Detection]]
- Feeds into : [[Face Embedding]]

---
## 🔄 Input → Output

- Input : Detected Face Crop + Facial landmarks
- Output : Normalized face image (typically 112×112)

---
## 🧩 Intuition (Explain Like I’m 12)

- Faces are rotated and resized so the eyes, nose, and mouth are always in the same position — like aligning passport photos
- all the faces are normalized to decrease the load in further steps 

---
## ⚙️ How It Works (Simple → Detailed)

1. Detect facial landmarks
	- Common : 5-point (eye centers, nose tip, mouth corners)
	- Detailed : 68-point for finer geometry and accuracy

2. Estimate transformation 
	- Compute affine/similarity transform to map landmarks to a standard template

3. Warp the image
	- Apply transformation → get a standardized face crop (112×112)
		- 112 × 112 : used in [[FaceNet]], [[ArcFace]], etc 

---
## ⚠️ Limitations (Why This Alone Is Not Enough)

- Fails when : 
	- landmarks are inaccurate (blur / occlusion)
	- face is heavily  occluded
- 2D alignment struggles with large pose angles (>45 ° [[Facial Angles#🔹 Yaw (Left ↔ Right)|yaw]])
	- 2D alignment cannot recover missing features (e.g., one eye hidden)
- Adds preprocessing cost 

---
## 🧠 Key Terms

| Term               | Meaning (Simple)                               |
| ------------------ | ---------------------------------------------- |
| Landmark           | Key facial points (eyes, nose, mouth)          |
| Affine Transform   | Rotate/scale/translate image to align features |
| Canonical Template | Standard face layout used for normalization    |

---
## 🔗 Connections

- Builds on → [[Face Detection]]
- Used by → [[Face Embedding]]
- Related to → [[Geometric Transformations]]

---
## 📄 Related Models / Methods

- [[DAN]]
	- Deep Alignment Network
	- multi-stage CNN
	- 68 landmarks
- [[PFLD]]
	- Practical Facial Landmark Detector 
	- Light-weight
	- Real time 
	- geometric-constraint loss
- [[3DDFA]] 
	- 3D Dense Face Alignment 
	- fits a 3D Morphable Model (3DMM)
	- critical for extreme poses (>60 ° [[Facial Angles#🔹 Yaw (Left ↔ Right)|yaw]])

---

## 📚 Related Papers

- 

---
## ❓ Questions

###### Q1)  Why does misalignment hurt recognition accuracy?
###### A1) 
- Embedding depends on consistent feature positions
- misalignment increases intra-class variance

---
## 📝 Summary

- Aligns face to a standard pose  
- Uses landmarks + geometric transform  
- Produces normalized face crop  (112 × 112)
- Critical for stable embeddings

---
## 📌 References

- [[Claude Research]]