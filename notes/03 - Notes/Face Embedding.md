
Type : #Note    
Date : 2026-03-30  
Tags : [[Research]] ; [[Computer Vision]]  
Status : #incomplete     
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
- Embedding quality depends on:  
	- backbone (feature extraction)  
	- loss function (space shaping)  
- Backbone learns features  
- Loss function defines separation

### Training Pipeline 

1. Input image → Face Alignment  
2. Pass through backbone (ResNet / ViT)  
3. Get feature vector  
4. Apply loss function (ArcFace / Triplet etc.)  
5. Optimize embedding space

### Embedding Space  
  
- High-dimensional vector space  
- Distance = similarity  
	- small distance → same person  
	- large distance → different person

### Backbone Network 

- Most systems use **ResNet (Residual Network)** 
- dominant architecture for face recognition
- Residual connections enable very deep networks without vanishing gradients
- CNN based model 
- SotA
- Variants : 
	- ResNet-50
	- ResNet-100
	- IR-50 / IR-100 (Identity Residual used in InsightFace)
- Role : 
	- Extract deep facial features before embedding

### Loss Functions and Model Evolution (Very Important)

#### Early Models
- DeepFace 
	- first deep learning approach
	- CNN based Model
- VGGFace 
	- deeper CNN baseline

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
	- cosine margin improvement 
	- SotA
$$\cos(\theta) - m$$
  
- [[ArcFace]]  
	- works in angular (hyper-spherical) space
	- CNN based model
	-  Additive angular margin($m$)  
$$\cos(\theta + m)$$
	- Geometrically cleaner than CosFace → superior separation
	- Additive Angular Margin loss on the normalized hypersphere
	- Training pipeline: IR-100 backbone + ArcFace loss on MS1MV2 (5.8M images, 85K identities)
	- Benchmark scores (SotA) : 
		- 99.83% on LFW
		- 96.98% on IJB-C (TAR@FAR=1e-4)
  
- **MagFace**  
	- Magnitude Aware ArcFace
	- CNN based model
	- low-quality faces (occluded, blurry) get smaller magnitudes 
	- enables quality-aware matching
	- SotA
  
- **AdaFace**
	- adapts margin based on image quality  
	- CNN based model
	- important for low-quality surveillance data → handles low-quality crops
	- SotA

- **InsightFace**
	- Open-source face analysis library
	- CNN based framework/library
	- implements : ArcFace + RetinaFace + associated tools
	- Most widely used face recognition framework
	- Provides ONNX-exported models for deployment.
	- SotA 

#### Transformer-Based Models 

- **ViT(Vision Transformer)** **(2020)** 
	- treats image as a sequence of non-overlapping 16 × 16 patches 
	- each patch is embedded as a token 
	- uses self attention which operates globally over all patches instead of convolution (CNN)
	- with large training datasets, ViT surpasses CNN baselines
	- for face recognition : 
		- ViT requires face specific augmentation strategies → random masking of facial regions 
		- global self attention captures long-range facial part relationships 
			- symmetry, holistic face structure, etc 
		- patch-dropping during training 
			- improves occlusion robustness

- **FaceTransformer(2021)** 
	- ViT(Vision Transformer) backbone for face embedding
	- With sufficient training data, matches ResNet-100 performance 

- **Swim Transformer** **(2021)**
	- hierarchical feature maps 
	- shifted window attention 
	- more computationally efficient than ViT 
	- achieves SotA on several face recognition benchmarks 
	- feasible for real-time inference 

- **ElasticFace(2022)** 
	- Random elastic margins in [[ArcFace]]
	- samples margin $m$ from a distribution rather than fixing it
	- works with both CNN and Transformer backbones 
	- improves generalization (more portable)

- **TransFace(2023)** 
	- Patch-based ViT + face-specific augmentation 
	- handles occlusion via patch augmentation
	- achieves SotA on IJB-C(IARPA Janus Benchmark-C) with 97.87% TAR@FAR=1e-4
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
- Feeds into → [[Multi-Object Tracking]] (ReID component uses embeddings)
- Related to → [[Embedding Space]] ; [[Similarity Metrics]]
- Distance as identity probability → [[Probability Introduction]]
- cos(θ+m) angular margin is trigonometric → [[Trigonometric Formulas]]
- Optimizing separation is constrained optimization → [[Algorithm Basics]]
- ArcFace decision boundary reasoning → [[Baye's Theorem]]

---
## 📄 Related Models / Methods

- [[FaceNet]] → uses triplet loss
- [[ArcFace]] → most widely used margin-based method 
- AdaFace → robust for low-quality images 

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
