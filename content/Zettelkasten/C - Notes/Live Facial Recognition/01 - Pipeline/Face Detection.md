
Date : 2026-03-29
Tags : [[Research]] ; [[Computer Vision]]
~***Yash Agrawall***~

---
# Face Detection

## 🧠 In One Sentence
- Find all face locations in an image so further processing can happen.

---
## 🎯 What Problem Does This Solve?
- finds where to process identity check

---
## 📍 Where Does It Fit in the System?

- Stage : Detection 
- Comes after : [[Camera Input]]
- Feeds into : [[Face Alignment]]

---
## 🔄 Input → Output

- Input : Image / Video frame
- Output : Bounding boxes of faces + Confidence score + (optional)Facial Landmark

---
## 🧩 Intuition (Explain Like I’m 12)
- Its like drawing rectangles around every face in a picture or a video frame

---
## ⚙️ How It Works (Simple → Detailed)
### Sliding Window (Old Approach) (Pre 2014)
- scan image using fixed-size windows 
- classify each region as face/not face

> its like dividing the whole image into boxes and classifying each as face and not face

- Limitations : very slow and inaccurate under real conditions

---
### Modern Deep Learning Approach
#### Anchor-Based Detectors 
- use predefined boxes (anchors)
- Model adjust them to fit faces 

> Similar idea to sliding window, but instead of scanning blindly, predefined boxes (anchors) are used and refined

#### Anchor-Free Detectors 
- Directly predict face location and size
- no-predefined boxes 

---
### CNN-Based Detectors 
- Convolutional Neural Network
#### [[MTCNN]] 
- 2016 - present 
- cascaded three-stage CNN : 
	1. Proposal Net 
	2. Refine Net 
	3. Output Net 
- Each stage progressively refines bounding boxes and detects 5 facial landmarks 
- Still widely used due to speed 

#### [[RetinaFace]] 
- 2020 - present 
- single stage ↔ multiple task 
- simultaneously performs bounding box regression, facial landmark localization (5 Facial Landmarks) and 3D face mesh prediction 
- achieves state-of-the-art on [[#WIDER FACE Benchmark]]

#### [[SCRFD]]
- 2021 - present 
- Sample and Computation Redistribution for Face Detection 
- Extremely efficient : 1000 fps on mobile hardware for small-face detection in dense crowds 

#### [[YOLO Face Detectors]] 
- 2 models : **YOLOv8-Face** and **YOLO-FaceV2** 
- uses repulsion loss for dense-crowd face suppression

---
## Key metrics
- **Precision** → how many faces detected correctly 
- **Recall** → how many actual faces detected 

---
## WIDER FACE Benchmark 
- Easy → clear faces 
- Medium → moderate difficulty 
- Hard → small / occluded faces (real-world scenario)

---
## ⚠️ Limitations (Why This Alone Is Not Enough)
- Model struggle with : 
	- Occlusion (hidden faces)
	- low resolution (far faces)
	- extreme angles 
	- illumination variation (different lighting)
- does not identify who the person is
- performance depends heavily on training data distribution

---
## 🧠 Key Terms

| Term             | Meaning (Simple)                        |
| ---------------- | --------------------------------------- |
| Bounding Box     | Rectangle around detected face          |
| Landmark         | Key facial point (eyes, nose, mouth)    |
| Confidence Score | Probability that region contains a face |
| Anchor           | Predefined box used in detection        |

---

## 🔗 Connections

- Builds on → [[Computer Vision Pipeline]]
- Used by → [[Face Alignment]]
- Related to → [[Object Detection]]

---

## 📚 Related Papers

- [[Viola Jones(2001) - Object Detection.pdf]]

---
## ❓ Questions

###### Q1)  Why is detecting small faces difficult?

###### A1) 
Features are too small to extract reliable patterns

---
## 📝 Summary

- First step in facial recognition pipeline  
- Detects where faces are in image  
- Uses deep learning models  
- Outputs bounding boxes and confidence score
- Enables further processing like alignment

---
## 📌 References

- [[Claude Research]]