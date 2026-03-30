
Date : 2026-03-30
Tags : [[Research]] ; [[Computer Vision]]
~***Yash Agrawall***~

---
# Face Embedding

## 🧠 In One Sentence
- Convert a face into a numerical vector such that same identities are close and different identities are far apart.

---
## 🎯 What Problem Does This Solve?
- Transforms a face image into a machine-understandable representation that allows comparison between identities.

---
## 📍 Where Does It Fit in the System?

- Stage : Embedding
- Comes after : [[Face Alignment]]
- Feeds into : [[Face Matching]]

---
## 🔄 Input → Output

- Input : Aligned face image (typically 112 × 112)
- Output : Feature Vector (embedding, typically 128 - 512 dimensions)

---
## 🧩 Intuition (Explain Like I’m 12)
Turn every face into a unique “fingerprint number” so similar faces have similar numbers.

---
## ⚙️ How It Works (Simple → Detailed)
- Pass aligned face through a deep neural network  
- Network extracts important facial features  
- Outputs a vector (embedding)

### Key Idea 

- **Intra-class compactness** → same identity clustered tightly  
	- Same Person → vectors close together
- **Inter-class separability** → different identities far apart
	- Different people → vectors far apart

### Embedding Space  
  
- High-dimensional vector space  
- Distance = similarity  
	- small distance → same person  
	- large distance → different person

### Loss Functions (How model learns this)
#### Metric Learning 
- **Contrastive Loss**  
	- pulls same faces together  
	- pushes different faces apart  
  
- **Triplet Loss (FaceNet)**  
	- anchor($a$), positive($p$), negative($n$) 
	$$||f(a)-f(p)||^2 - ||f(a)-f(n)||^2 + α < 0$$
	- ensures:  $distance(a, p) < distance(a, n)$

#### Margin-Based Softmax (Modern standard)  
  
- **SphereFace(Angular-Softmax)**  
	- Multiplicative angular margin in hyper-spherical space  
  
- **CosFace(LMCL - Large Margin Cosine Loss)**  
	- Additive cosine margin($m$)  
$$\cos(\theta) - m$$
  
- **[[ArcFace]]**  
	- works in angular (hyper-spherical) space
	-  Additive angular margin($m$)  
$$\cos(\theta + m)$$
	- Geometrically cleaner than CosFace → superior separation
  
- **MagFace**  
	- Magnitude Aware ArcFace
	- low-quality faces (occluded, blurry) get smaller magnitudes 
	- enables quality-aware matching
  
- **AdaFace**  
	- adapts margin based on image quality  
	- important for low-quality surveillance data → handles low-quality crops

#### Transformer-Based Models 

- **ViT(Vision Transformer)** 
	- splits image into patches 
	- uses self-attention instead of convolution (CNN)

- **FaceTransformer(2021)** 
	- ViT(Vision Transformer) backbone for face embedding
	- With sufficient training data, matches ResNet-100 performance 

- **TransFace(2023)** 
	- Patch-based ViT + face-specific augmentation 
	- achieves SotA(State-of-the-Art) on IJB-C(IARPA Janus Benchmark-C)
		- IARPA : Intelligence Advanced Research Projects Activity → U.S. govt. research agency
		- Janus → Name of face recognition research program
		- Benchmark → Standard dataset for evaluation
		- C → Version C (third major release)

- **UniFormer** 
	- CNN + ViT 
	- computationally efficient

---
## ⚠️ Limitations (Why This Alone Is Not Enough)

- Sensitive to : 
	- poor alignment
	- low resolution 
	- occlusion 
- Requires large training data
- it does not identify directly → it only represents identity
- embeddings may collapse if training is poor (bad separation)

---
## 🧠 Key Terms

| Term      | Meaning (Simple)                      |
| --------- | ------------------------------------- |
| Embedding | Numeric representation of a face      |
| Vector    | List of numbers representing features |
| Distance  | Measure of similarity                 |
| Margin    | Extra separation between classes      |
| ViT       | Vision Transformer                    |
| LMCL      | Large Margin Cosine Loss              |

---
## 🔗 Connections

- Builds on → [[Face Alignment]]
- Used by → [[Face Matching]]
- Related to → [[Embedding Space]] ; [[Similarity Metrics]]  

---
## 📄 Related Models / Methods

- [[FaceNet]] → uses triplet loss
- [[ArcFace]] → most widely used margin-based method 
- [[AdaFace]] → robust for low-quality images 

---
## 📚 Related Papers

- 

---
## ❓ Questions

###### Q1) Why are embeddings better than raw images?  
###### A1)
Because embeddings compress identity information into a comparable numeric form.

---
## 📝 Summary

- Converts face into a vector  
- Enables comparison between identities  
- Uses deep learning + loss functions  
- Core of recognition system

---
## 📌 References

- [[Claude Research]]