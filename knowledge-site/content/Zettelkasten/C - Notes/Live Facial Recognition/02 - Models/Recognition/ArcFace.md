
Date : 2026-03-30  
Tags : [[Research]] ; [[Security]] ; [[Computer Vision]]  
~***Yash Agrawall***~  
  
---  
# ArcFace  
  
## 🧠 In One Sentence  
- Enforces clear identity separation by adding an angular margin between face embeddings on a normalized hypersphere.  
  
---  
## 🎯 What Problem Does This Solve?  
- Improves discrimination between similar faces in embedding space  
- Reduces overlap between identities  
- Makes recognition robust in real-world conditions (low quality, crowd scenarios)  
  
---  
## 📍 Where Does It Fit in the System?  
  
- Stage : Embedding  
- Comes after : [[Face Alignment]]  
- Feeds into : [[Face Matching]] ; [[ReID]]  
  
---  
## 🔄 Input → Output  
  
- Input : Face embeddings + identity labels (during training)  
- Output : Optimized embedding space with strong inter-class separation  
  
---  
## 🧩 Intuition (Explain Like I’m 12)  
  
- Imagine each person is a point on a sphere  
- ArcFace forces different people to stay **far apart by a fixed angle**  
- So even similar-looking faces don’t overlap  
  
---  
## ⚙️ How It Works (Simple → Detailed)

### Step 1 — Normalize
- Normalize feature vectors and class weights  
- Embeddings lie on a **unit hypersphere**

$$||f(x)|| = 1$$

---
### Step 2 — Angular Representation
- Operates in **angular (hyperspherical) space**
- Similarity measured using angle θ between vectors

---
### Step 3 — Add Angular Margin
- Modify decision boundary:

$$\cos(\theta + m)$$

- m = additive angular margin  
- Creates stronger separation between identities  
- Geometrically cleaner than CosFace

---
### Step 4 — Training Setup
- Backbone: **IR-100 (ResNet-100 variant)**
- Loss: ArcFace (Additive Angular Margin Loss)
- Dataset: **MS1MV2**
  - ~5.8M images  
  - ~85K identities  

---
### Step 5 — Performance
- 99.83% on LFW  
- 96.98% on IJB-C (TAR@FAR = $10^{-4}$)  

---
### Key Insight
- Backbone extracts features  
- ArcFace loss shapes embedding space  
- Together → strong identity separation

---  
## ⚠️ Limitations (Why This Alone Is Not Enough)  
  
- Sensitive to noisy labels  
- Requires large-scale, clean training data  
- Depends on good alignment and detection  
- Does not handle identity over time (needs tracking / ReID)  
  
---  
## 🧠 Key Terms  
  
| Term           | Meaning (Simple)                            |
| -------------- | ------------------------------------------- |
| Angular Margin | Extra angle separating different identities |
| Hypersphere    | Unit-normalized embedding space             |
| θ (theta)      | Angle between embedding and class center    |
| Margin (m)     | Added separation between classes            |
| Normalization  | Scaling vectors to unit length              |
  
---  
## 🔗 Connections  
  
- Builds on → [[Face Embedding]]  
- Used by → [[Face Matching]] ; [[ReID]]  
- Related to → [[CosFace]] ; [[SphereFace]] ; [[Embedding Space]]  
  
---  
## 📄 Related Models / Methods  
  
- [[FaceNet]] → metric learning approach  
- [[CosFace]] → additive cosine margin  
- [[SphereFace]] → multiplicative angular margin  
  
---  
## 📚 Related Papers  
  
- ArcFace: Additive Angular Margin Loss for Deep Face Recognition (Deng et al., 2019)  
  
---  
## ❓ Questions  
  
###### Q1) Why is angular margin better than distance-based learning?  
###### A1)  
- Angular separation is more stable in normalized space  
- Provides clearer decision boundaries than Euclidean distance  
  
---  
## 📝 Summary  
  
- Uses angular margin to separate identities  
- Works on normalized hypersphere  
- Improves recognition accuracy significantly  
- Standard method in modern face recognition systems  
- Backbone + loss = strong embedding space  
  
---  
## 📌 References  
  
- [[Claude Research]]