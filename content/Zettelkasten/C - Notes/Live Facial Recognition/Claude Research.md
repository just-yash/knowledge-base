
Date :  2026-03-28  
Tags :  [[AI]] ; [[security]] ; [[Research]]  
~ ***Yash Agrawall*** ~  

---
# Claude Research
# Advanced Facial Recognition in Crowds Using Coordinated Multi-Camera Systems with Real-Time Threat Detection

### A Research-Grade Technical Survey

---

## 1. FOUNDATIONAL UNDERSTANDING

### 1.1 The Core Face Recognition Pipeline

A modern facial recognition system operates as a sequential pipeline of tightly coupled subsystems. Each stage transforms raw visual data into increasingly abstract, identity-discriminative representations.

---
#### Stage 1: Face Detection

Face detection is the entry point of the pipeline — the task of localizing all face regions within an image or video frame. Modern detectors are almost universally anchor-based or anchor-free deep networks.

**Sliding Window Era (Pre-2014):** Viola-Jones (2001) used Haar features and AdaBoost cascades. Fast but brittle under occlusion, pose, and illumination variation.

**CNN-Based Detectors:**

- **MTCNN (2016):** A cascaded three-stage CNN — Proposal Net → Refine Net → Output Net. Each stage progressively refines bounding boxes and detects 5 facial landmarks. Still widely used due to speed.
- **RetinaFace (2020):** A single-stage detector with multi-task learning — simultaneously performs bounding box regression, facial landmark localization (5-point), and 3D face mesh prediction. Achieves state-of-the-art on WIDER FACE.
- **SCRFD (2021):** Sample and Computation Redistribution for Face Detection. Extremely efficient — runs at 1000 fps on mobile hardware for small-face detection in dense crowds.
- **YOLOv8-Face / YOLO-FaceV2:** Adapts the YOLO architecture for faces; uses repulsion loss for dense-crowd face suppression.

**Key Metrics:** Precision-Recall on WIDER FACE (Easy/Medium/Hard splits). Hard split specifically tests occlusion and small scale — closest to real surveillance conditions.

---
#### Stage 2: Face Alignment

Raw detected face crops are geometrically normalized before embedding. Misalignment significantly degrades recognition accuracy.

**Process:**

1. Predict N facial landmarks (5-point: eye centers, nose tip, mouth corners; or 68-point for fine alignment)
2. Estimate affine/similarity transform mapping detected landmarks to a canonical template
3. Apply warp to produce a normalized 112×112 (standard) crop

**Landmark Predictors:**

- **Deep Alignment Network (DAN):** Multi-stage CNN predicting 68 landmarks.
- **PFLD (Practical Facial Landmark Detector):** Lightweight, real-time, geometric-constraint loss.
- **3DDFA (3D Dense Face Alignment):** Fits a 3D Morphable Model (3DMM) — critical for extreme pose (>60° yaw) in crowd scenarios.

**Why It Matters for Crowds:** Crowd surveillance involves severe pose variation. Faces at >45° yaw lose significant discriminative information. 3D-alignment-aware normalization partially recovers this.

---

#### Stage 3: Feature Extraction (Embeddings)

The core recognition step: mapping an aligned face image to a compact, identity-discriminative feature vector (embedding) in a metric space where same-identity faces cluster tightly (intra-class compactness) and different-identity faces separate (inter-class separability).

**Architecture Evolution:**

|Model|Backbone|Loss|Embedding Dim|Year|
|---|---|---|---|---|
|DeepFace|Custom 9-layer CNN|Softmax|4096|2014|
|FaceNet|Inception-v1/v3|Triplet Loss|128|2015|
|VGGFace|VGG-16|Softmax|4096|2015|
|SphereFace|ResNet-64|A-Softmax|512|2017|
|CosFace|ResNet-50|LMCL|512|2018|
|ArcFace|ResNet-50/100|ArcFace Loss|512|2019|
|MagFace|ResNet-100|MagFace Loss|512|2021|
|AdaFace|ResNet-101|AdaFace Loss|512|2022|

**Loss Function Taxonomy:**

_Metric Learning Losses:_

- **Contrastive Loss:** Minimizes distance for same-class pairs, maximizes for different.
- **Triplet Loss (FaceNet):** For anchor _a_, positive _p_, negative _n_: `||f(a)-f(p)||² - ||f(a)-f(n)||² + α < 0`. Mining hard triplets is critical.

_Margin-Based Softmax Losses (dominant paradigm):_

- **A-Softmax (SphereFace):** Multiplicative angular margin in hyperspherical space.
- **CosFace (LMCL):** Additive cosine margin: `cos(θ) - m` where _m_ is the margin.
- **ArcFace:** Additive angular margin: `cos(θ + m)`. Geometrically cleaner than CosFace; superior separation.
- **MagFace:** Magnitude-aware ArcFace — low-quality faces (occluded, blurry) get smaller magnitudes, enabling quality-aware matching.
- **AdaFace:** Adapts margin based on image quality estimated from feature norm. Critical for surveillance — naturally handles low-quality crops.

**Transformer-Based Models:**

- **FaceTransformer (2021):** ViT backbone for face recognition. With sufficient training data, matches ResNet-100 performance.
- **TransFace (2023):** Patch-based ViT with face-specific augmentation; achieves SotA on IJB-C.
- **UniFormer:** Combines local CNN-style convolutions with global self-attention; computationally efficient.

---

#### Stage 4: Matching / Identification

Given a probe embedding _q_ and a gallery of enrolled embeddings _{g₁, g₂, ..., gₙ}_, identification is:

`identity = argmax_i [cos_sim(q, gᵢ)]` subject to `cos_sim > τ` (threshold)

**Verification vs. Identification:**

- **1:1 Verification:** Is probe _q_ the same person as claimed identity _g_? Binary decision.
- **1:N Identification:** Who is probe _q_ among _N_ enrolled identities?
- **Open-Set Identification:** As 1:N but with a reject option if _q_ matches no enrolled identity above _τ_.

**Scalable Search:** For city-scale systems with millions of enrolled identities, exhaustive cosine search is infeasible at sub-second latency.

- **FAISS (Facebook AI Similarity Search):** GPU-accelerated approximate nearest neighbor (ANN) search. Supports IVF (Inverted File Index), HNSW (Hierarchical Navigable Small World), and PQ (Product Quantization). Can search 1M 512-dim vectors in <1ms on GPU.
- **ScaNN (Google):** Anisotropic vector quantization for ANN search.
- **Milvus:** Distributed vector database with FAISS/HNSW backends; suited for production deployment.

---

### 1.2 Extension to Multi-Camera Systems

#### Camera Calibration

**Intrinsic Calibration:** Estimates the camera's internal parameters — focal length (_f_), principal point (_cx_, _cy_), and lens distortion coefficients (_k₁, k₂, p₁, p₂_). Modeled by the pinhole camera model:

```
[u]   [fx  0  cx] [X/Z]
[v] = [0  fy  cy] [Y/Z]
[1]   [0   0   1] [1  ]
```

Done via Zhang's checkerboard method (OpenCV `calibrateCamera`).

**Extrinsic Calibration:** Estimates the rigid body transformation (rotation _R_, translation _t_) between each camera and a world coordinate frame. For a network of _N_ cameras, this establishes a common 3D coordinate system.

**Homography-Based Ground Plane Calibration:** For surveillance (cameras looking down at a ground plane), a homography _H_ maps image coordinates to ground-plane world coordinates. Used for person localization and trajectory analysis across cameras.

---

#### Overlapping vs. Non-Overlapping Camera Networks

**Overlapping Fields of View (FOV):**

- The same person can be simultaneously visible in multiple cameras.
- Enables stereo/multi-view 3D reconstruction.
- Direct appearance transfer is possible — the same face at the same moment.
- Identity matching is simpler (temporal overlap as a constraint).

**Non-Overlapping FOV (the hard problem):**

- A person disappears from camera A and reappears in camera B.
- No shared observation moment.
- Requires appearance-based Re-Identification (ReID) across a temporal gap.
- Must account for appearance change (lighting, pose, clothing visibility).
- Topology constraints: the camera network graph (which cameras are reachable from which) prunes impossible transitions.

**Topology Learning:** Estimate transition time distribution _P(Δt | A→B)_ from historical tracking data. A person leaving camera A at time _t_ should appear in camera B within _[t + Δt_min, t + Δt_max]_. This is a powerful soft constraint for identity association.

---

#### Cross-Camera Identity Matching

The goal: given tracklet _T_A_ (a tracked sequence of a person in camera A) and tracklet _T_B_ (in camera B), decide if they are the same identity.

**Feature Aggregation:** Extract multiple face crops and body crops from each tracklet, pool into a representative feature vector:

- Temporal max-pooling over frame-level features.
- Quality-weighted pooling (MagFace/AdaFace quality scores as weights).
- Attention-based aggregation (Transformer pooling over frame sequence).

**Matching Score Fusion:**

- Face embedding similarity + Body/Clothing ReID similarity + Spatiotemporal plausibility → Fused score

**Graph-Based Association:** Model tracklets as nodes; compute pairwise similarity edges; solve global identity assignment as a minimum-cost flow problem or graph partitioning.

---

### 1.3 Challenges in Crowd Multi-Camera Systems

#### Occlusion

In crowds, faces are partially occluded by other people, objects, or camera angles. Partial face recognition is an active research area.

- **Pairwise Occlusion Handling:** ArcFace-OCC augments training with synthesized occlusions. Attention masks suppress occluded patch contributions to the embedding.
- **Part-Based Models:** Split the face into patches; match only visible patches (e.g., eyes+nose even if mouth occluded). Transformers naturally handle missing patches via masking.
- **3D Reasoning:** 3DMM-based models can hallucinate the full 3D face from a partial 2D view.

#### Identity Switching

Multi-object trackers can confuse identities when people cross, occlude each other, or move in/out of frame. This leads to ID fragmentation (one person tracked as multiple IDs) or ID merging (multiple people assigned one ID).

Solutions:

- **Appearance Re-embedding:** Periodically re-identify tracklets using face/ReID features.
- **Long-Term Re-Identification:** Maintain a memory bank of lost tracklets; attempt re-association when a new detection appears.

#### Lighting Differences Across Cameras

Different cameras have different exposures, white balances, and illumination conditions. This creates a domain gap for appearance-based matching.

- **Domain Adaptation:** Train camera-specific normalization layers or use domain-adversarial training.
- **Illumination-Invariant Features:** DFT/DCT-based normalization; Retinex preprocessing; reflectance-based feature extraction.
- **Cross-Camera Style Transfer:** CycleGAN or UNIT to translate face/body appearance from camera A's domain to camera B's domain before matching.

#### Time Synchronization

Frame-level temporal alignment across cameras is critical for multi-view fusion and spatiotemporal reasoning.

- **NTP/PTP Hardware Sync:** Network Time Protocol or Precision Time Protocol synchronizes camera clocks to sub-millisecond precision.
- **Software Synchronization:** Cross-correlation of motion signals (e.g., background subtraction outputs) to estimate inter-camera time offsets.
- **Asynchronous Handling:** Most ReID systems operate on the tracklet level and are inherently tolerant of asynchrony.

#### Scale and Resolution Mismatch

Cameras at different distances and heights capture faces at vastly different resolutions — from 200×200 pixels near the camera to 10×10 pixels far away.

- **Super-Resolution Pre-processing:** GFPGAN, ESRGAN, or CodeFormer to upscale low-resolution face crops before recognition.
- **Quality-Aware Matching:** Only attempt recognition when estimated face quality (FaceQnet, SER-FIQ) exceeds a threshold.
- **Resolution-Adaptive Training:** Mix low and high resolution samples during training with resolution-specific augmentations.

---

## 2. STATE-OF-THE-ART METHODS

### 2.1 CNN-Based Models

**ResNet Backbone (He et al., 2016)** The 50-layer and 100-layer ResNet variants remain the dominant backbone for production face recognition. Residual connections enable very deep networks without vanishing gradients. IR-50 and IR-100 (Identity Residual) are the standard backbones in InsightFace.

**ArcFace (Deng et al., 2019)** Additive Angular Margin loss on the normalized hypersphere. Training pipeline: IR-100 backbone + ArcFace loss on MS1MV2 (5.8M images, 85K identities). Achieves 99.83% on LFW, 96.98% on IJB-C (TAR@FAR=1e-4). The gold standard for production systems.

**InsightFace (Guo et al.)** Open-source face analysis library implementing ArcFace, RetinaFace, and associated tools. The most widely used production face recognition framework. Provides ONNX-exported models for deployment.

**MagFace (Meng et al., 2021)** Introduces a magnitude-aware loss where the angular margin is a function of feature magnitude. High-quality faces → large magnitude → large margin (strict). Low-quality faces → small magnitude → small margin (lenient). Enables joint recognition and quality assessment from a single model.

**AdaFace (Kim et al., 2022)** Adapts the margin based on estimated image quality (proxied by feature norm). Outperforms ArcFace significantly on low-quality benchmarks (IJB-S, TinyFace). Critical for surveillance where face quality is unpredictable.

### 2.2 Transformer-Based Models

**Vision Transformer (ViT, Dosovitskiy et al., 2020)** Treats an image as a sequence of non-overlapping 16×16 patches, each embedded as a token. Self-attention operates globally over all patches. With large training datasets, ViT-Large/Huge surpasses CNN baselines.

For face recognition:

- ViT requires face-specific augmentation strategies (random masking of facial regions).
- Global self-attention captures long-range facial part relationships (e.g., symmetry, holistic face structure).
- Patch-dropping during training improves occlusion robustness.

**Swin Transformer (Liu et al., 2021)** Introduces hierarchical feature maps and shifted window attention. More computationally efficient than ViT. Swin-B/L as backbones achieve SotA on several face recognition benchmarks while being feasible for real-time inference.

**TransFace (Dan et al., 2023)** ViT backbone with patch-based augmentation strategy that handles partial face visibility. Achieves SotA on IJB-C with 97.87% TAR@FAR=1e-4.

**ElasticFace (Boutros et al., 2022)** Random elastic margins in ArcFace — samples margin _m_ from a distribution rather than fixing it. Works with both CNN and Transformer backbones; improves generalization.

### 2.3 Person Re-Identification (ReID)

ReID addresses the problem of associating a person's identity across non-overlapping cameras based on their full-body appearance (clothing, gait, build).

**Key Architectures:**

**PCB (Part-based Convolutional Baseline, Sun et al., 2018):** Horizontally partitions the body feature map into _P_ stripes (e.g., 6), each producing a local feature. Final descriptor is the concatenation of stripe features. Implicitly handles pose by part-based matching.

**OSNet (Omni-Scale Network, Zhou et al., 2019):** A lightweight architecture with omni-scale feature learning — aggregates features at multiple spatial scales within each layer. Achieves strong ReID performance with low computational cost. Widely used in production.

**TransReID (He et al., 2021):** ViT backbone for ReID. Introduces Side Information Embeddings (SIE) — camera ID and viewpoint as learnable tokens injected into the Transformer encoder. Jigsaw Patch Module (JPM) rearranges patches to improve robustness to misalignment. SotA on Market-1501 and DukeMTMC.

**CLIP-ReID (Li et al., 2023):** Leverages CLIP's vision-language pretraining for ReID. Text descriptions of appearance ("a person wearing a red jacket") as auxiliary supervision. Strong cross-dataset generalization.

**Challenges specific to crowd ReID:**

- Clothing similarity (uniforms, crowd fashion homogeneity)
- Distractors (same clothing, different people)
- Temporal appearance change (person changes clothes between cameras)

### 2.4 Multi-Object Tracking

**SORT (Simple Online and Realtime Tracking, Bewley et al., 2016):** Combines IoU-based association with Kalman filter state prediction. Fast (260 Hz), but relies purely on bounding box overlap — fails under occlusion or when detections are missed.

**DeepSORT (Wojke et al., 2017):** Extends SORT with a deep appearance descriptor (cosine metric) for re-association. Maintains a tracklet gallery; uses Hungarian algorithm for global assignment combining motion (Mahalanobis distance) and appearance (cosine distance). The standard baseline for surveillance tracking.

**ByteTrack (Zhang et al., 2022):** Key insight: associate every detection (including low-confidence detections in `[0.1, 0.5]`) rather than discarding them. Low-confidence detections are often occluded objects. Two-stage association: first match high-confidence detections, then use low-confidence detections to re-link lost tracklets. SOTA on MOT17/MOT20.

**StrongSORT (Du et al., 2023):** Improves DeepSORT with: ECC (Enhanced Correlation Coefficient) camera motion compensation, AFLink (Appearance-Free Link) post-processing, and GSI (Gaussian-smoothed Interpolation). Strong baseline across benchmarks.

**OC-SORT (Cao et al., 2022):** Observation-Centric SORT. Addresses Kalman filter state corruption during occlusion by using observation-centric re-update. Robust under non-linear motion (crowds, turning people).

**BoT-SORT (Aharon et al., 2022):** Combines camera motion compensation, improved Kalman filter, and IoU + Re-ID fusion. Achieves SOTA on MOT17.

**Tracking Metrics:**

- **MOTA (Multi-Object Tracking Accuracy):** Combines false positives, missed detections, ID switches.
- **IDF1:** Identity F1 — fraction of ground truth detections correctly identified. More sensitive to ID consistency than MOTA.
- **HOTA (Higher Order Tracking Accuracy):** Balances detection and association accuracy at multiple localization thresholds.

### 2.5 Video-Based Face Recognition

Single-frame recognition degrades on surveillance video (motion blur, compression artifacts, low frame rate). Video-face recognition aggregates information across the temporal dimension.

**Quality-Aware Aggregation:**

- Select the highest-quality frame and use it as the representative.
- Alternatively, weighted average of frame embeddings where weights are quality scores (SER-FIQ, FaceQnet, or MagFace magnitude).

**Recurrent Models:**

- LSTM over a sequence of frame embeddings to produce a video-level embedding. Captures temporal dynamics (expression changes, pose variation over time).

**Set-Based Methods:**

- Represent each video as a _set_ of embeddings. Compute set-to-set distance using metrics like Gaussian-of-Gaussians or Neural Network Set Distance.
- **NAN (Neural Aggregation Network):** Attention-based pooling over frame embeddings — attends more to high-quality, front-facing frames.

**3D CNNs:**

- Process short video clips (16–32 frames) as 3D spatiotemporal volumes.
- C3D, I3D, SlowFast — extract joint spatial-temporal features.
- Useful when face dynamics (lip movement, blinking patterns) are available as biometric signals.

### 2.6 Graph-Based Identity Association

In a multi-camera system, tracklets from all cameras form a graph. The identity association problem is to partition this graph into clusters, each cluster corresponding to one person.

**Formulation:**

- Nodes: tracklets (from any camera)
- Edges: pairwise affinity scores (face similarity, ReID similarity, spatiotemporal plausibility)
- Task: Cluster nodes into identities

**Methods:**

**Hierarchical Clustering:** Agglomerative clustering with complete/average linkage. Simple but requires threshold tuning.

**Spectral Clustering:** Eigen-decomposition of affinity matrix. Handles non-convex clusters but doesn't scale to millions of tracklets.

**Minimum Cost Flow (MCF):** Model global data association as a network flow optimization. Exact polynomial-time solution. Used in MOT and multi-camera tracking.

**Graph Neural Networks (GNNs):**

- **GNN-based ReID:** Model the tracklet graph with a GNN; message passing propagates identity information. Node features updated by neighbor affinity.
- **GCRA (Graph Convolutional Re-Aggregation):** GCN refines ReID features by aggregating contextually similar tracklets.

**Spatio-Temporal Graphs:**

- Include temporal edges between successive tracklets of the same person.
- Pose estimation graphs (body joint graphs) for action recognition.
- Scene-level graphs modeling spatial relationships between people.

### 2.7 Spatio-Temporal Modeling

Beyond spatial appearance, the _trajectory_ of a person through space and time is a powerful identity cue.

**Trajectory-Based ReID:**

- Estimate ground-plane position of each tracked person in world coordinates (via camera homography).
- Trajectories provide a complementary signal to appearance for cross-camera association.
- Appearance may degrade (low resolution, occlusion) but trajectory continuity is often maintained.

**Spatio-Temporal Attention:**

- Transformers with position encodings augmented by (x, y, t) world coordinates.
- Enables joint reasoning about who, where, and when.

**Motion Prediction:**

- Social Force Model: Models pedestrian motion as particle interactions.
- LSTM/Transformer trajectory predictors (Social-LSTM, Trajectron++): Predict future positions to maintain tracking through occlusion.

---

## 3. KEY RESEARCH PAPERS

### 3.1 Foundational

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|DeepFace: Closing the Gap to Human-Level Performance|Taigman et al.|2014|CVPR|[IEEE](https://ieeexplore.ieee.org/document/6909616)|First deep CNN to approach human-level face verification on LFW. 3D face alignment pipeline.|
|FaceNet: A Unified Embedding for Face Recognition and Clustering|Schroff et al.|2015|CVPR|[arXiv:1503.03832](https://arxiv.org/abs/1503.03832)|Triplet loss; 128-D embedding; 99.63% LFW. Established metric learning paradigm.|
|Deep Learning Face Representation by Joint Identification-Verification|Sun et al.|2014|NeurIPS|[arXiv:1406.4773](https://arxiv.org/abs/1406.4773)|DeepID: joint identification-verification loss. Multi-patch face representation.|
|A Discriminative Feature Learning Approach for Deep Face Recognition (Center Loss)|Wen et al.|2016|ECCV|[arXiv:1707.07391](https://arxiv.org/abs/1707.07391)|Center loss: auxiliary loss minimizing intra-class variation. Still commonly combined with softmax.|

### 3.2 Face Recognition (Margin-Based Losses)

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|SphereFace: Deep Hyperspherical Face Recognition|Liu et al.|2017|CVPR|[arXiv:1704.08063](https://arxiv.org/abs/1704.08063)|Multiplicative angular margin (A-Softmax). First margin-based softmax for FR.|
|CosFace: Large Margin Cosine Loss for Deep Face Recognition|Wang et al.|2018|CVPR|[arXiv:1801.09414](https://arxiv.org/abs/1801.09414)|Additive cosine margin. Cleaner optimization than SphereFace.|
|ArcFace: Additive Angular Margin Loss for Deep Face Recognition|Deng et al.|2019|CVPR|[arXiv:1801.07698](https://arxiv.org/abs/1801.07698)|**The dominant face recognition method.** Additive angular margin on hypersphere. 99.83% LFW.|
|MagFace: A Universal Representation for Face Recognition and Quality Assessment|Meng et al.|2021|CVPR|[arXiv:2103.06627](https://arxiv.org/abs/2103.06627)|Magnitude-aware ArcFace. Joint recognition + quality from one model.|
|AdaFace: Quality Adaptive Margin for Face Recognition|Kim et al.|2022|CVPR|[arXiv:2204.00964](https://arxiv.org/abs/2204.00964)|Adapts margin to image quality. Best on low-quality benchmarks (surveillance-critical).|
|ElasticFace: Elastic Margin Loss for Deep Face Recognition|Boutros et al.|2022|CVPRW|[arXiv:2109.09416](https://arxiv.org/abs/2109.09416)|Random elastic margins during training. Better generalization.|
|TransFace: Calibrating Transformer Training for Face Recognition|Dan et al.|2023|ICCV|[arXiv:2308.10133](https://arxiv.org/abs/2308.10133)|ViT backbone for FR with patch augmentation. SotA on IJB-C.|

### 3.3 Face Detection

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|Joint Face Detection and Alignment Using Multitask Cascaded CNNs (MTCNN)|Zhang et al.|2016|IEEE SPL|[arXiv:1604.02878](https://arxiv.org/abs/1604.02878)|Three-stage cascaded CNN. Simultaneous detection + alignment. Widely deployed.|
|RetinaFace: Single-Shot Multi-Level Face Localisation in the Wild|Deng et al.|2020|CVPR|[arXiv:1905.00641](https://arxiv.org/abs/1905.00641)|Multi-task: bbox + landmark + 3D mesh. Best on WIDER FACE.|
|SCRFD: Sample and Computation Redistribution for Efficient Face Detection|Guo et al.|2021|ICLR|[arXiv:2105.04714](https://arxiv.org/abs/2105.04714)|Extremely efficient face detection for dense crowds. 1000 fps on mobile.|
|YOLO-FaceV2: A Scale and Occlusion Aware Face Detector|Yu et al.|2022|arXiv|[arXiv:2208.02019](https://arxiv.org/abs/2208.02019)|YOLO-based face detector with repulsion loss for dense crowds.|

### 3.4 Multi-Camera Tracking & ReID

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|Simple Online and Realtime Tracking (SORT)|Bewley et al.|2016|ICIP|[arXiv:1602.00763](https://arxiv.org/abs/1602.00763)|IoU + Kalman filter tracking baseline. Fast, simple, influential.|
|Simple Online and Realtime Tracking with a Deep Association Metric (DeepSORT)|Wojke et al.|2017|ICIP|[arXiv:1703.07402](https://arxiv.org/abs/1703.07402)|Adds deep appearance descriptor to SORT. Standard surveillance tracker.|
|ByteTrack: Multi-Object Tracking by Associating Every Detection Box|Zhang et al.|2022|ECCV|[arXiv:2110.06864](https://arxiv.org/abs/2110.06864)|Associates low-confidence detections. SOTA on MOT17/20.|
|BoT-SORT: Robust Associations Multi-Pedestrian Tracking|Aharon et al.|2022|arXiv|[arXiv:2206.14651](https://arxiv.org/abs/2206.14651)|Camera motion compensation + Re-ID fusion. SOTA multi-pedestrian.|
|TransReID: Transformer-based Object Re-Identification|He et al.|2021|ICCV|[arXiv:2102.04378](https://arxiv.org/abs/2102.04378)|ViT for ReID with camera ID embeddings. SOTA Market-1501, DukeMTMC.|
|OSNet: Omni-Scale Feature Learning for Person Re-Identification|Zhou et al.|2019|ICCV|[arXiv:1905.00953](https://arxiv.org/abs/1905.00953)|Lightweight multi-scale ReID backbone. Widely deployed in production.|
|Bag of Tricks and A Strong Baseline for Deep Person Re-identification|Luo et al.|2019|CVPRW|[arXiv:1903.07071](https://arxiv.org/abs/1903.07071)|Engineering tricks: BN neck, random erasing, warm-up LR. Highly practical.|
|CLIP-ReID: Exploiting Vision-Language Model for Image Re-Identification|Li et al.|2023|AAAI|[arXiv:2211.13977](https://arxiv.org/abs/2211.13977)|CLIP for ReID. Strong cross-dataset generalization.|
|City-Scale Multi-Camera Vehicle Tracking Guided by Crossroad Zones|He et al.|2019|CVPRW|[IEEE](https://ieeexplore.ieee.org/document/9025400)|Crossroad zone topology for city-scale vehicle (applicable to person) tracking.|
|Multi-Target Multi-Camera Tracking by Tracklet-to-Target Assignment|Wen et al.|2020|IEEE TIP|[arXiv:2012.02717](https://arxiv.org/abs/2012.02717)|MTMC tracking with zone-based tracklet association.|

### 3.5 Crowd Analysis

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|Crowd Counting and Density Estimation via Layered Local Compound Expression Learning|Chen et al.|2023|ICCV|[arXiv:2309.10100](https://arxiv.org/abs/2309.10100)|Dense crowd counting with density map estimation.|
|CSRNet: Dilated Convolutional Neural Networks for Understanding the Highly Congested Scenes|Li et al.|2018|CVPR|[arXiv:1802.10062](https://arxiv.org/abs/1802.10062)|Dilated CNN for crowd density estimation. Highly influential.|
|Learning to Count Everything|Ranjan et al.|2021|CVPR|[arXiv:2104.08391](https://arxiv.org/abs/2104.08391)|Few-shot counting across crowd and object categories.|
|Surveillance Video Parsing with Single Frame Supervision|Liu et al.|2021|CVPR|[arXiv:2105.02853](https://arxiv.org/abs/2105.02853)|Parsing people's appearance in surveillance scenes.|

### 3.6 Threat Detection / Anomaly Detection

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|Real-World Anomaly Detection in Surveillance Videos|Sultani et al.|2018|CVPR|[arXiv:1801.04264](https://arxiv.org/abs/1801.04264)|UCF-Crime dataset; multiple instance learning for anomaly detection. Foundational.|
|Learning Temporal Regularity in Video Sequences|Hasan et al.|2016|CVPR|[IEEE](https://ieeexplore.ieee.org/document/7780684)|Autoencoder-based regularity learning for anomaly detection.|
|Future Frame Prediction for Anomaly Detection|Liu et al.|2018|CVPR|[arXiv:1712.09867](https://arxiv.org/abs/1712.09867)|Predict future frame; large reconstruction error = anomaly.|
|Localizing Anomalies from Weakly-Labeled Videos|Feng et al.|2021|IEEE TIP|[arXiv:2008.08636](https://arxiv.org/abs/2008.08636)|Weakly supervised anomaly detection and localization.|
|Towards Open Set Video Anomaly Detection|Wu et al.|2022|ECCV|[arXiv:2208.11113](https://arxiv.org/abs/2208.11113)|Open-set formulation: detecting novel anomaly types not seen in training.|
|MGFN: Magnitude-Contrastive Glance-and-Focus Network for Weakly-Supervised Video Anomaly Detection|Chen et al.|2023|AAAI|[arXiv:2211.15098](https://arxiv.org/abs/2211.15098)|Glance-focus mechanism for efficient weakly-supervised anomaly detection.|
|Violence Detection in Videos using Deep Features and Sparse Coding|Mahajan et al.|2022|Appl. Sci|[MDPI](https://www.mdpi.com/2076-3417/12/3/1218)|Violence detection in surveillance with sparse coding.|
|Weapon Detection for Security and Video Surveillance Using CNN and YOLO|Tümen et al.|2019|CEIT|[IEEE](https://ieeexplore.ieee.org/document/8813559)|Real-time weapon detection using YOLOv3 in surveillance contexts.|

### 3.7 Latest Papers (2021–2024)

|Title|Authors|Year|Venue|Link|Contribution|
|---|---|---|---|---|---|
|AdaFace: Quality Adaptive Margin for Face Recognition|Kim et al.|2022|CVPR|[arXiv:2204.00964](https://arxiv.org/abs/2204.00964)|Best for low-quality/surveillance faces.|
|ViT-based Face Recognition with Patch Augmentation|Dan et al.|2023|ICCV|[arXiv:2308.10133](https://arxiv.org/abs/2308.10133)|ViT SotA for face recognition.|
|CLIP-ReID|Li et al.|2023|AAAI|[arXiv:2211.13977](https://arxiv.org/abs/2211.13977)|VLM-based ReID with strong generalization.|
|OC-SORT: Observation-Centric SORT|Cao et al.|2022|CVPR|[arXiv:2203.14360](https://arxiv.org/abs/2203.14360)|Robust tracking under occlusion.|
|StrongSORT: Make DeepSORT Great Again|Du et al.|2023|IEEE TCSVT|[arXiv:2202.13514](https://arxiv.org/abs/2202.13514)|Best practice engineering for DeepSORT-family trackers.|
|UniTrack: A Simple and Unified Infrastructure for Multi-Task Object Tracking|Wang et al.|2021|NeurIPS|[arXiv:2111.14858](https://arxiv.org/abs/2111.14858)|Unified framework for MOT, ReID, pose, segmentation tracking.|
|GHOST: Adapting the Generic Multiple Object Tracking Pipeline|Seidenschwarz et al.|2023|ICCV|[arXiv:2206.13518](https://arxiv.org/abs/2206.13518)|Systematic study of how ReID benefits MOT.|
|Privacy-Preserving Face Recognition Using Random Frequency Components|Mi et al.|2022|ECCV|[arXiv:2208.01910](https://arxiv.org/abs/2208.01910)|FR without exposing raw faces. Federated-friendly.|

---

## 4. MULTI-CAMERA SYSTEM DESIGN

### 4.1 City-Scale Surveillance Architecture

**Scenario:** Tracking and re-identifying a suspect across a city's CCTV network in near-real-time.

#### Camera Network Topology

```
[Fixed CCTV Grid] ─────────────────────────────────┐
  • Street intersections                              │
  • Transit hubs                                      │
  • Building entrances                                │
  • Parking lots                                      │
                                                      ▼
[PTZ Cameras]                               [Edge Processing Layer]
  • Operator-directed or auto-PTZ              (Per-camera or cluster)
  • High-zoom for face capture                ┌─────────────────────┐
  • Auto-tracked follow mode                  │  • Detection         │
                                              │  • Tracking          │
[Drone/UAV Integration]                      │  • Face crop         │
  • Mobile aerial viewpoint                  │  • Feature extract   │
  • Top-down crowd density mapping           │  • Local ID          │
  • Dynamic re-deployment to active area     └──────────┬──────────┘
                                                        │
[Body-Worn Cameras]                                     ▼
  • First responder perspective                [Central Fusion Server]
  • Dynamic position                           ┌─────────────────────┐
                                               │  • Global ID mgmt   │
                                               │  • Cross-cam ReID   │
                                               │  • Trajectory fusion │
                                               │  • Alert generation  │
                                               └──────────┬──────────┘
                                                          │
                                               [Operator Dashboard]
                                               [Watchlist DB / FAISS]
```

---

#### Edge vs. Cloud Processing

**Edge Processing (at camera or nearby edge node):**

_Runs locally:_

- Face/person detection (SCRFD, YOLOv8)
- Multi-object tracking (ByteTrack)
- Face alignment and embedding extraction (InsightFace IR-50 ONNX)
- Quality assessment (MagFace magnitude or FaceQnet)
- Local identity assignment (temporary IDs within camera)

_Hardware:_ NVIDIA Jetson Orin (275 TOPS), Hailo-8 (26 TOPS), Intel Neural Compute Stick 2

_Latency:_ Detection + tracking: 30–60ms per frame at 1080p/25fps

**Advantages of edge processing:**

- Reduces raw video bandwidth (transmit embeddings, not video)
- Privacy: raw video stays on-device
- Continues operating during network disruption

**Cloud/Central Processing:**

- Cross-camera identity fusion
- Global ID assignment and management
- Watchlist matching (FAISS search over enrolled gallery)
- Trajectory reconstruction
- Threat detection (computationally expensive models)
- Video storage and retrieval

---

#### Identity Fusion Architecture

```
Camera A                 Camera B                 Camera C
tracklets: [T_A1, T_A2]  tracklets: [T_B1]       tracklets: [T_C1, T_C2]
           │                        │                         │
           ▼                        ▼                         ▼
    Feature Vectors           Feature Vectors          Feature Vectors
    (face + body)             (face + body)            (face + body)
           │                        │                         │
           └────────────────────────┴─────────────────────────┘
                                    │
                          Identity Association Engine
                          ┌───────────────────────────────────┐
                          │ 1. Pairwise affinity matrix        │
                          │    (face sim + ReID sim + ST prior)│
                          │ 2. Graph partitioning / MCF        │
                          │ 3. Cluster → Global ID assignment  │
                          │ 4. Watchlist matching per cluster  │
                          └───────────────────────────────────┘
                                    │
                           Global Identity Registry
                           [GID_001: T_A1, T_C1]
                           [GID_002: T_A2, T_B1, T_C2]
```

---

#### Global ID Assignment

Each person detected across the camera network is assigned a persistent Global ID (GID).

**Process:**

1. New tracklet _T_new_ arrives from any camera.
2. Extract appearance feature vector _f_new_ (face embedding + body ReID embedding).
3. Compute similarity against all existing GID representative features in FAISS index.
4. If `max_sim > τ_high`: assign _T_new_ to the matching GID. Update GID representative (exponential moving average of features).
5. If `τ_low < max_sim < τ_high`: flag as uncertain; defer decision or trigger manual review.
6. If `max_sim < τ_low`: create new GID; add _T_new_ as its first tracklet.

**GID Representative Update:**

```python
# Exponential moving average update
GID.feature = α * GID.feature + (1 - α) * T_new.feature
# Normalize to unit sphere for cosine search
GID.feature = GID.feature / ||GID.feature||
```

---

#### Re-Identification Pipeline

```python
# Pseudocode: Cross-camera ReID pipeline

def cross_camera_reid(tracklet, global_id_registry, faiss_index):
    # 1. Extract face crops from tracklet
    face_crops = extract_best_quality_faces(tracklet, min_quality=0.5)
    
    # 2. Get face embedding (AdaFace or ArcFace)
    if face_crops:
        face_emb = face_model(face_crops)  # [N_faces, 512]
        face_emb = quality_weighted_pool(face_emb)  # [512]
    else:
        face_emb = None
    
    # 3. Get body ReID embedding (OSNet or TransReID)
    body_crops = extract_body_crops(tracklet)
    body_emb = reid_model(body_crops)  # [N_frames, 512]
    body_emb = temporal_max_pool(body_emb)  # [512]
    
    # 4. Fuse face and body embeddings
    if face_emb is not None:
        fused_emb = concat([face_emb * w_face, body_emb * w_body])
    else:
        fused_emb = body_emb
    
    # 5. Spatiotemporal constraint
    candidate_gids = topology_filter(
        tracklet.camera_id, 
        tracklet.exit_time,
        global_id_registry
    )
    
    # 6. FAISS search within candidates
    D, I = faiss_index.search(fused_emb, k=10)
    
    # 7. Filter by spatiotemporal plausibility
    matches = [(gid, score) for gid, score in zip(I, D) 
               if gid in candidate_gids and score > THRESHOLD]
    
    return matches
```

---

#### Data Synchronization

**Hardware-level:**

- **PTP (IEEE 1588):** Sub-microsecond clock synchronization across cameras via Ethernet. Standard for industrial camera networks.
- **GNSS Timestamping:** GPS-synchronized timestamps for outdoor cameras.

**Software-level:**

- Embed NTP-synchronized timestamp in each frame's metadata.
- Central server corrects for per-camera clock drift using periodic calibration.

**Frame Alignment:**

- For overlapping cameras: use cross-correlation of motion signals or optical flow to find temporal offset.
- For non-overlapping cameras: timestamp-based alignment with clock drift correction.

**Asynchronous Buffer:**

- Central server maintains a circular buffer of incoming tracklets sorted by timestamp.
- Batch processing over a sliding time window (e.g., 5-second windows) for cross-camera association.

---

## 5. THREAT DETECTION MODULE

### 5.1 Behavioral Analysis

#### Loitering Detection

**Definition:** A person remaining in a restricted zone for longer than a threshold time _T_loiter_.

**Implementation:**

1. Estimate person's ground-plane position from tracked bounding box and camera homography.
2. Define zone polygons in world coordinates (restricted areas, sensitive zones).
3. If person's position inside zone for > _T_loiter_ (e.g., 60s): trigger alert.
4. Filter false positives by velocity: slow-moving or stationary persons are flagged; people walking through are ignored.

```python
def loiter_detection(tracklet, zone_polygons, T_loiter=60.0):
    for zone in zone_polygons:
        time_in_zone = compute_time_in_zone(tracklet, zone)
        if time_in_zone > T_loiter:
            return Alert("LOITERING", tracklet.global_id, zone, time_in_zone)
```

#### Suspicious Movement Patterns

**Features:**

- Abrupt direction changes
- Velocity anomalies (sudden acceleration/deceleration)
- Approaching and retreating from a target repeatedly (following behavior)
- Deviating from crowd flow direction (crowd flow estimated from aggregate pedestrian motion)

**Social Force Model Deviation:** Pedestrians normally follow social forces (attraction to destination, repulsion from obstacles/others). Anomalous behavior = large deviation from Social Force Model predictions.

**GAN-based Trajectory Anomaly Detection:**

- Train a trajectory prediction model on normal walking patterns.
- At inference, trajectories with high prediction error are flagged as anomalous.

#### Abandoned Object Detection

1. Background subtraction to detect stationary foreground blobs.
2. Track all persons; when a person leaves a region, check if a foreground blob remains.
3. If blob persists > _T_abandoned_ (e.g., 30s) and no person is nearby: trigger alert.
4. Blob classification: luggage, backpack, suspicious package.

---

### 5.2 Face-Based Alerts

#### Watchlist Matching

```
[Live Camera Feed]
      │
      ▼
[Face Detection + Alignment]
      │
      ▼
[Embedding Extraction (AdaFace/ArcFace)]
      │
      ▼
[FAISS Search against Watchlist DB]
      │
   Top-1 Match
   Similarity > τ?
      │
    YES → Generate ALERT + GID + timestamp + camera_id
    NO  → Continue
```

**Watchlist Management:**

- Enrolled suspects: high-quality enrollment photos → multiple embeddings per identity (different poses, lighting) → cluster center as representative.
- FAISS index updated dynamically as new suspects are added.
- Tiered alerts: high-priority watchlist (imminent threat), medium (persons of interest), low (background check).

#### Criminal Database Matching

- Large-scale: 10M+ enrolled identities. Requires approximate search (FAISS IVF-PQ with 1-2% precision loss for 100x speed gain).
- False accept rate (FAR) must be tightly controlled (e.g., FAR < 0.01%) to avoid overwhelming operators with false alarms.
- Confidence thresholds tuned per database tier.

---

### 5.3 Action Recognition

#### Violence Detection

**Spatial-Temporal 3D CNNs:**

- **I3D (Carreira & Zisserman, 2017):** Two-stream 3D CNN — RGB stream (appearance) + Optical flow stream (motion). Inflated from 2D ImageNet-pretrained InceptionV1.
- **SlowFast (Feichtenhofer et al., 2019):** Dual-pathway — Slow path (low frame rate, high spatial resolution) + Fast path (high frame rate, low spatial resolution). State-of-the-art on Kinetics.
- **Video Swin Transformer (Liu et al., 2022):** Swin Transformer extended to video with spatiotemporal shifted windows. SotA on Kinetics-400.

**Violence-Specific Datasets:**

- Surveillance Fight Dataset (SFD)
- RWF-2000 (Real-World Fights)
- Hockey Fight Dataset

**Features for violence:**

- Rapid limb movement (high optical flow magnitude)
- Inter-person proximity with high velocity
- Unusual body orientation changes (falling, impact)

#### Weapon Detection

**Object Detection Pipeline:**

- YOLOv8/RTMDet fine-tuned on weapon datasets (guns, knives, clubs).
- Input: video frames or cropped body regions.
- Sub-classes: handgun, rifle, blade, explosive.

**Challenges:**

- Weapons often partially occluded or inside bags.
- Requires high resolution — difficult from distant surveillance cameras.

**Complementary signals:**

- Behavioral context: is the person raising their arm in a threatening gesture?
- Pose estimation: raised arm + hand-level small object → elevated suspicion.

---

### 5.4 Anomaly Detection

#### Unusual Crowd Behavior

**Density-Based Anomaly:**

- Crowd density suddenly increases in a region → possible gathering, panic, fight.
- CSRNet density map + temporal derivative for sudden density changes.

**Flow-Based Anomaly:**

- Optical flow field across a scene.
- Normally: smooth laminar flow along pedestrian paths.
- Anomaly: swirling, converging/diverging flows (crowd panic = centrifugal flow away from a point).

**Reconstruction-Based:**

- Autoencoder trained on normal scene clips.
- At inference: high reconstruction error in a spatial-temporal region = anomaly.
- CAVEAT: Autoencoders sometimes generalize too well; future frame prediction (Liu et al., 2018) is more sensitive.

**Video Transformer Anomaly Detection:**

- TimeSformer, VideoSwin as backbone.
- Self-supervised pretraining on normal surveillance video (masked video modeling).
- Anomaly = high self-supervised prediction loss.

---

### 5.5 Models and Real-Time Constraints

|Module|Model|Latency (GPU)|Hardware|
|---|---|---|---|
|Face Detection|RetinaFace (MobileNet)|5–15ms / frame|Edge GPU|
|Face Embedding|ArcFace IR-50 (ONNX INT8)|3–8ms / face|Edge GPU|
|Body Detection|YOLOv8m|8–12ms / frame|Edge GPU|
|ReID|OSNet|5ms / crop|Edge GPU|
|MOT|ByteTrack|2–5ms / frame|CPU/GPU|
|Action Recognition|SlowFast (16 frames)|40–80ms / clip|Server GPU|
|Anomaly Detection|Autoencoder (ConvLSTM)|20–40ms / frame|Server GPU|
|FAISS Search|IVF-PQ (1M gallery)|0.5–2ms|GPU|

**Parallelization Strategy:**

- Face pipeline and body pipeline run in parallel.
- Detection runs on every frame; embedding extraction runs on every N-th frame (or only on tracklet initiation + periodic refresh).
- Threat detection runs asynchronously; does not block tracking pipeline.

---

## 6. DATASETS & BENCHMARKS

### 6.1 Face Recognition Datasets

|Dataset|Size|Identities|Notes|
|---|---|---|---|
|**LFW** (Labeled Faces in the Wild)|13,233 images|5,749|Pairs verification task. Largely saturated (>99%).|
|**MegaFace**|4.7M images|672,057|Large-scale identification challenge.|
|**IJB-A/B/C** (IARPA Janus)|50K/170K images|500/1,845/3,531|Unconstrained; videos + stills; IJB-C is the gold standard.|
|**MS1M (MS-Celeb-1M)**|10M images|100K|Training set; noisy. MS1MV2/V3 are cleaned versions.|
|**VGGFace2**|3.3M images|9,131|Large pose variation; good training set.|
|**QMUL-SurvFace**|463K images|15,573|Specifically surveillance faces — low quality, small size.|
|**TinyFace**|169,403 images|5,139|Low-resolution face recognition benchmark.|
|**SCface**|4,160 images|130|Surveillance cameras at varying distances.|

**Surveillance-Specific Note:** LFW is essentially solved and not representative of real surveillance conditions. IJB-C TAR@FAR=1e-4 and TinyFace are more relevant benchmarks for surveillance system evaluation.

---

### 6.2 Person ReID Datasets

|Dataset|Images|Identities|Cameras|Notes|
|---|---|---|---|---|
|**Market-1501**|32,668|1,501|6|Standard indoor ReID benchmark.|
|**DukeMTMC-ReID**|36,411|1,404|8|Outdoor multi-camera. Derivative of DukeMTMC tracking dataset.|
|**CUHK03**|14,096|1,467|2|Indoor; two detection settings (detected vs. hand-labeled).|
|**MSMT17**|126,441|4,101|15|Large-scale; 12 outdoor + 3 indoor cameras; complex backgrounds.|
|**LaST**|228,000|10,862|—|Long-term ReID with clothing change over days/months.|
|**Occluded-DukeMTMC**|—|1,110|8|Occluded variant of DukeMTMC.|
|**PRCC**|33,698|221|3|Clothing change ReID.|

---

### 6.3 Multi-Camera Tracking Datasets

|Dataset|Cameras|Duration|Notes|
|---|---|---|---|
|**DukeMTMC**|8|85 min|Outdoor campus. Dense crowds. Multi-target multi-camera tracking.|
|**CityFlow (AIC19/20)**|40+|—|City-scale traffic camera network. Vehicle + person tracking.|
|**EPFL-RLC**|3|—|Overlapping cameras. Ground truth 3D trajectories.|
|**CAMPUS**|4|—|Non-overlapping cameras. Multiple outdoor scenes.|
|**MOT Challenge (MOT16/17/20)**|Single|—|Single-camera MOT. MOT20 specifically targets dense crowds.|
|**KITTI**|2|—|Autonomous driving tracking.|
|**HiEve**|—|—|Hierarchical events; complex crowd activities.|

**DukeMTMC Limitation:** The dataset was retracted from public distribution in 2019 due to consent concerns. DukeMTMC-ReID remains available. This raises important ethical considerations (see Section 8).

---

### 6.4 Anomaly Detection Datasets

|Dataset|Size|Categories|Notes|
|---|---|---|---|
|**UCSD Ped1/Ped2**|—|Abnormal objects/motion|Early benchmark; relatively simple.|
|**Avenue**|37 clips|5 anomaly types|Surveillance camera, constrained setting.|
|**ShanghaiTech**|437 videos|13 scene types|Complex scenes; 130 anomalous clips.|
|**UCF-Crime**|1,900 clips|13 crime categories|Real surveillance footage. Weakly labeled. Most realistic.|
|**XD-Violence**|4,754 clips|6 violence types|Multi-scene violence detection; some with audio.|
|**UBnormal**|660 clips|—|Synthetic anomalies in virtual environments; controllable.|
|**CUHK Avenue**|37 clips|—|Campus avenue surveillance.|

---

## 7. REAL-WORLD DEPLOYMENT

### 7.1 City-Scale Surveillance Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CITY SURVEILLANCE SYSTEM                      │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Camera Zone A │  │ Camera Zone B │  │ Camera Zone C │  ...    │
│  │ N=50 cameras  │  │ N=80 cameras  │  │ N=40 cameras  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                     │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐          │
│  │ Zone Edge    │  │ Zone Edge    │  │ Zone Edge    │           │
│  │ Server       │  │ Server       │  │ Server       │           │
│  │ (4× A100)    │  │ (4× A100)    │  │ (4× A100)    │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         └─────────────────┴─────────────────┘                   │
│                            │                                      │
│                   ┌────────▼────────┐                            │
│                   │  Central Fusion  │                            │
│                   │  Cluster         │                            │
│                   │  (16× A100 GPU)  │                            │
│                   └────────┬────────┘                            │
│                            │                                      │
│         ┌──────────────────┼──────────────────────┐              │
│         │                  │                       │              │
│  ┌──────▼───────┐  ┌───────▼──────┐  ┌────────────▼───────┐    │
│  │ Identity DB  │  │ Alert Engine  │  │ Video Archive       │    │
│  │ (Milvus)     │  │ (Kafka)       │  │ (Object Storage)   │    │
│  │ FAISS Index  │  │               │  │ w/ Retrieval Index │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Operator Dashboard                       │   │
│  │  Live alerts | Map view | Tracklet gallery | Search UI    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7.2 Distributed Computing Architecture

**Message Bus:** Apache Kafka as the central message broker.

- Topic per camera: raw frame metadata, tracklet events, embeddings.
- Topic for alerts: consumed by dashboard and response system.
- Topic for global ID updates: consumed by all zone servers for cross-zone awareness.

**Compute Tiers:**

_Tier 1 — Camera Edge (Jetson Orin NX):_

- Detection, tracking, embedding extraction.
- Publishes: `{camera_id, tracklet_id, timestamp, bbox, face_emb, body_emb, quality_score}` per tracklet update.

_Tier 2 — Zone Server (4× NVIDIA A100, 80GB):_

- Cross-camera ReID within zone.
- Zone-level global ID management.
- Local watchlist matching.

_Tier 3 — Central Cluster (16× A100):_

- Cross-zone identity fusion.
- Master global ID registry.
- Long-term trajectory management.
- Threat detection inference.

---

### 7.3 Latency Optimization

**Quantization:**

- INT8 quantization of face/ReID models via TensorRT. 2–4x speedup, <1% accuracy loss.
- FP16 inference for larger models (SlowFast, Video Swin).

**Model Compression:**

- Knowledge Distillation: train a smaller student model (IR-18) to mimic a larger teacher (IR-100). Significant speed gain with modest accuracy loss.
- Pruning: structured pruning of attention heads and convolutional filters.

**Asynchronous Pipeline:**

- Detection and embedding run on GPU asynchronously.
- FAISS search runs on a separate GPU thread.
- Tracking runs on CPU (ByteTrack is CPU-efficient).

**Caching:**

- Cache embeddings of recently matched identities; avoid re-extracting for short tracklets.
- LRU cache for FAISS results of highly active persons.

---

### 7.4 Storage & Retrieval

**Raw Video:**

- H.264/H.265 compressed. Typically 7–30 days retention.
- Object storage (S3-compatible): MinIO, Ceph.
- Indexed by camera ID + timestamp for clip retrieval.

**Embeddings and Metadata:**

- Vector database: Milvus or Weaviate.
- Metadata store: PostgreSQL (tracklet metadata, GID assignments, alert records).
- Time-series database: InfluxDB for trajectory data.

**Forensic Retrieval:**

- "Find all occurrences of GID_X in the last 48 hours": FAISS search + metadata join.
- "Find the trajectory of GID_X through the city": Timeline join of all tracklets assigned to GID_X.

---

### 7.5 API Design

```yaml
# Core API Endpoints

POST   /api/v1/watchlist/enroll        # Add person to watchlist
DELETE /api/v1/watchlist/{id}          # Remove from watchlist
POST   /api/v1/search/face             # Search by face image
POST   /api/v1/search/trajectory       # Search by trajectory pattern
GET    /api/v1/alerts                  # List active alerts
GET    /api/v1/identity/{gid}/track    # Get full trajectory of GID
GET    /api/v1/camera/{id}/live        # Live stream + overlay
POST   /api/v1/zone/define             # Define alert zones
GET    /api/v1/analytics/crowd         # Real-time crowd density map
```

---

## 8. CHALLENGES & LIMITATIONS

### 8.1 Cross-Camera Identity Errors

**ID Fragmentation:** One person is tracked as multiple GIDs across cameras due to appearance change or failed ReID matching. Results in incomplete trajectory reconstruction.

**ID Merging:** Two different people are incorrectly assigned the same GID due to similar appearance. Results in false associations and potential misidentification in watchlist matching — a serious operational risk.

**Cumulative Error:** In a city-scale network with hundreds of cameras, even a 95% per-hop accuracy leads to significant error accumulation. A suspect tracked through 10 camera transitions has only 0.95^10 ≈ 59.9% chance of maintaining correct identity throughout.

**Mitigation:** Human-in-the-loop verification for high-stakes identity associations; confidence-scored alerts; requiring confirmation from multiple independent camera observations.

---

### 8.2 Scalability Issues

- **Pairwise complexity:** Associating _N_ tracklets requires O(N²) pairwise similarity computations. With 10,000 active tracklets, this is 10^8 operations. ANN search reduces this but introduces approximation error.
- **Gallery size:** Matching against 10M enrolled identities requires either powerful ANN indexing or hierarchical pre-filtering (demographics, location constraint).
- **Event storms:** During large public events, tracklet generation rate spikes dramatically. System must handle burst traffic without latency degradation.

---

### 8.3 Bias in Facial Recognition

This is a critical, well-documented issue that directly affects system reliability and equity.

**NIST FRVT Findings (2019):** The NIST Face Recognition Vendor Testing study found that most commercial face recognition systems exhibited significantly higher false positive rates for:

- Black and Asian faces versus white faces (up to 100x higher FAR in some systems)
- Women versus men
- Elderly individuals versus middle-aged adults

**Causes:**

- Training dataset imbalance (overrepresentation of light-skinned males)
- Evaluation dataset imbalance (LFW is ~77% male, ~83% white)
- Loss functions optimizing average accuracy hide per-group disparities

**Consequences in surveillance:** Differential misidentification rates mean minority groups are disproportionately at risk of false watchlist matches. This is not merely a technical problem — it is a civil rights issue.

**Mitigation:**

- Balanced training data collection (FairFace dataset, Diversity in Faces)
- Fairness constraints in loss function (e.g., equalizing FAR across demographic groups)
- Per-group threshold calibration
- Continuous bias auditing in deployment

---

### 8.4 Legal and Ethical Concerns

**Legal Frameworks (as of 2024):**

- **GDPR (EU):** Biometric data is "special category" data requiring explicit consent or specific legal basis. Blanket surveillance would likely violate GDPR.
- **Illinois BIPA:** Requires informed written consent for biometric data collection. Has resulted in billion-dollar lawsuits.
- **AI Act (EU, 2024):** "Real-time" remote biometric identification in public spaces is classified as high-risk; use by law enforcement requires strict conditions.
- **US Federal Law:** No comprehensive federal biometric privacy law as of 2024; patchwork of state laws.
- **China:** Regulated but permissive framework — facial recognition in public spaces is widespread.

**Ethical Concerns:**

- Chilling effect on free assembly and expression when public spaces are under biometric surveillance
- Function creep: systems built for one purpose used for another
- Accountability gap: who is responsible for system errors?
- Transparency: subjects have no knowledge of or recourse against surveillance

---

### 8.5 Privacy Risks

- **Re-identification:** Even anonymized video can be de-anonymized using face recognition.
- **Data breach:** Biometric data is immutable — unlike passwords, you cannot change your face.
- **Scope creep:** Fusion of facial recognition with purchase data, phone location, social media creates comprehensive behavioral profiles.
- **Third-party access:** Cloud-processed biometric data is accessible to cloud providers and vulnerable to state access requests.

---

## 9. SECURITY & ADVERSARIAL RISKS

### 9.1 Spoofing Attacks

**2D Presentation Attack:** Holding a photo of another person in front of the camera.

- Countermeasure: **Liveness Detection (Face Anti-Spoofing)** — CDNet, FAS-SGTD detect texture artifacts of printed photos. Infrared sensing (rPPG signal — live faces show pulse-driven color changes in certain lighting).

**3D Mask Attack:** Wearing a high-quality 3D mask of another person's face.

- Harder to detect. Requires NIR + depth sensing.

**Adversarial Appearance:** Wearing specially designed makeup or patterns that cause face detection to fail or misidentify.

- **Adv-Makeup:** Adversarial makeup that changes identity in face recognition systems while appearing natural to humans.
- **Adversarial hats/glasses:** Printed patterns on eyeglasses that cause recognition failure (Sharif et al., 2016) or cause misidentification.

---

### 9.2 Deepfake Attacks

In scenarios where operators review flagged detections via stored video, injecting synthetic video of a target person into the camera feed (replay attack) could frame an innocent person or exonerate a guilty one.

**Detection:**

- **FaceForensics++ benchmark:** Standard for deepfake detection research.
- Artifact detectors: high-frequency forensic features (GAN upsampling artifacts), face boundary inconsistencies, temporal flickering.
- **CLIP-based detectors:** Zero-shot deepfake detection via semantic inconsistency.

---

### 9.3 Adversarial Patches

Physical adversarial patches (stickers, printed images on clothing) can fool object detectors and face recognizers.

**Attack types:**

- **Disappearance attack:** Makes a person invisible to detectors (e.g., wearing an adversarial pattern t-shirt causes YOLO to miss the detection).
- **Impersonation attack:** An adversarial patch worn near the face fools the recognizer into classifying the wearer as a target identity.
- **Class-specific attack:** Causes the recognizer to output a specific (wrong) identity.

**Countermeasures:**

- Adversarial training: include adversarial examples during training. Reduces patch effectiveness significantly.
- Multi-modal verification: require consistent identification across face + body + gait. Harder to attack all modalities simultaneously.
- Temporal consistency: an adversarial patch must fool the system across multiple frames from multiple angles — physically more difficult.
- Certified defenses: randomized smoothing provides provable robustness guarantees within a perturbation radius.

---

### 9.4 Additional Countermeasures

- **Cryptographic signing of video:** Camera-generated video is signed with a hardware security module (HSM) private key. Tampered/synthetic video can be detected by signature verification.
- **Anomaly detection on recognition scores:** Sudden systematic shifts in matching scores (all faces suddenly matching one identity) indicates an attack.
- **Multi-sensor fusion:** Combine optical camera with radar, LiDAR, or acoustic sensors. Physical attacks on one modality don't affect others.

---

## 10. FUTURE DIRECTIONS

### 10.1 Smart Cities Integration

Future city surveillance systems will integrate facial recognition with:

- **Smart traffic systems:** Correlate pedestrian trajectories with vehicle trajectories.
- **Smart building access control:** Seamless indoor-outdoor tracking continuity.
- **Emergency response:** Automatic re-routing of autonomous vehicles and emergency services based on detected crowd incidents.
- **IoT sensor fusion:** Microphone arrays for acoustic event detection + cameras for visual event verification.

---

### 10.2 Federated Learning Across Cameras

**Problem:** Training a face/ReID model on centralized data from all cameras violates data minimization principles and is logistically difficult.

**Solution:** Federated learning trains models locally on each camera's data, sharing only model gradient updates (not raw data) with a central server.

- **FedAvg:** Average gradient updates from all cameras; update global model.
- **Per-camera personalization:** Fine-tune global model locally for each camera's specific domain (lighting, viewing angle).
- **Federated ReID (FedPAV):** Federated learning for person ReID across cameras with privacy guarantees.

**Challenges:**

- Non-IID data: different cameras see different distributions of identities and conditions.
- Communication efficiency: transmitting full gradients for a ResNet-100 is expensive.
- Secure aggregation: prevent the central server from inferring individual training samples from gradients.

---

### 10.3 Privacy-Preserving Recognition

**Homomorphic Encryption (HE):**

- Encrypt face embeddings; perform matching in the encrypted domain.
- No plaintext biometric data ever leaves the camera.
- Current limitation: HE operations are 10,000× slower than plaintext. Active research area.

**Secure Multi-Party Computation (SMPC):**

- Matching is performed collaboratively between camera and server without either learning the other's data.

**Random Frequency Components (Mi et al., ECCV 2022):**

- Extract face embeddings from random DCT frequency components. Recognition is preserved but face images cannot be reconstructed from embeddings.

**Template Protection:**

- **Fuzzy Commitment Scheme:** Bind a random key to an embedding such that the key is only recoverable if a fresh embedding is within a threshold distance.
- **BioHashing:** Project embeddings onto random subspace seeded by a user-specific token. Without the token, embeddings are unlinkable.

---

### 10.4 Foundation Models for Surveillance

**Vision-Language Models (CLIP, ALIGN, Florence):**

- Text-driven search: "Find persons wearing red jackets" → zero-shot retrieval.
- Zero-shot anomaly detection: "Describe this scene" → detect unusual descriptions.
- Cross-modal retrieval: find a person by textual description across camera gallery.

**Unified Models:**

- Single model for detection, tracking, ReID, action recognition.
- Currently: specialized models for each task. Future: one large model (analogous to GPT for language) handles all surveillance subtasks.

**Embodied AI:**

- PTZ cameras with autonomous control: AI decides where to pan/tilt/zoom based on scene understanding.
- Drone control: autonomous navigation toward detected threat/suspect.

---

### 10.5 Privacy-by-Design Regulation Compliance

Future systems will be architected around data minimization and purpose limitation from the ground up:

- **Selective retention:** Only retain video of detected events; delete normal footage immediately.
- **On-device anonymization:** Blur all faces on-device; only transmit anonymized video for crowd analysis; transmit face embeddings (not images) for identification.
- **Audit trails:** Cryptographically signed audit logs of every query, match, and alert.
- **Access control:** Role-based access with multi-party authorization for sensitive queries.

---

## 11. IMPLEMENTATION ROADMAP

### Phase 1: Single-Camera Face Recognition System (Weeks 1–4)

```python
# Tools: PyTorch, OpenCV, InsightFace, FAISS

# Step 1: Environment setup
pip install insightface onnxruntime-gpu faiss-gpu opencv-python torch torchvision

# Step 2: Face detection + alignment (RetinaFace)
import insightface
from insightface.app import FaceAnalysis

app = FaceAnalysis(providers=['CUDAExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

img = cv2.imread('frame.jpg')
faces = app.get(img)  # Returns list of Face objects with bbox, kps, embedding

# Step 3: Embedding extraction (ArcFace IR-100)
# InsightFace app.get() already runs embedding extraction
embedding = faces[0].embedding  # 512-dim normalized vector

# Step 4: Gallery management + FAISS search
import faiss
import numpy as np

d = 512  # embedding dimension
index = faiss.IndexFlatIP(d)  # Inner product = cosine sim (on normalized vectors)

# Enroll gallery
gallery_embeddings = np.array([f.embedding for f in gallery_faces])
faiss.normalize_L2(gallery_embeddings)
index.add(gallery_embeddings)

# Search
probe = faces[0].embedding.reshape(1, -1)
faiss.normalize_L2(probe)
D, I = index.search(probe, k=5)  # Top-5 matches
```

**Deliverable:** Script that takes a webcam/video input → detects faces → matches against an enrolled gallery → outputs identity + confidence.

---

### Phase 2: Add Single-Camera Multi-Object Tracking (Weeks 5–8)

```python
# Tools: ByteTrack, YOLOv8, InsightFace

# Step 1: Install tracking dependencies
pip install ultralytics  # YOLOv8
# ByteTrack: https://github.com/ifzhang/ByteTrack

from ultralytics import YOLO
from byte_tracker import BYTETracker

# Step 2: Detection
model = YOLO('yolov8m.pt')
tracker = BYTETracker(args)

# Step 3: Per-frame tracking
cap = cv2.VideoCapture('surveillance.mp4')
tracklets = {}  # track_id -> list of face embeddings

while cap.isOpened():
    ret, frame = cap.read()
    
    # Detect persons
    results = model(frame, classes=[0])  # class 0 = person
    
    # Track
    online_targets = tracker.update(results.boxes.xyxy, results.boxes.conf, results.boxes.cls)
    
    for target in online_targets:
        track_id = target.track_id
        bbox = target.tlbr
        
        # Crop and extract face
        crop = frame[int(bbox[1]):int(bbox[3]), int(bbox[0]):int(bbox[2])]
        faces = app.get(crop)
        
        if faces:
            emb = faces[0].embedding
            quality = np.linalg.norm(emb)  # MagFace quality proxy
            
            if track_id not in tracklets:
                tracklets[track_id] = []
            tracklets[track_id].append((emb, quality, frame_count))
    
    frame_count += 1
```

**Deliverable:** Multi-person tracker with per-tracklet face embedding gallery.

---

### Phase 3: Multi-Camera ReID Extension (Weeks 9–14)

```python
# Tools: OSNet (torchreid), InsightFace, NetworkX, FAISS

import torchreid

# Step 1: Load OSNet for body ReID
reid_model = torchreid.models.build_model(
    name='osnet_x1_0',
    num_classes=751,  # Market-1501 pre-trained
    pretrained=True
)

# Step 2: Extract ReID features per tracklet
def get_reid_feature(tracklet_crops):
    with torch.no_grad():
        features = reid_model(tracklet_crops)  # [N, 512]
    return features.mean(0)  # Temporal average pooling

# Step 3: Cross-camera association
import networkx as nx

def build_tracklet_graph(tracklets_all_cameras, face_model, reid_model):
    G = nx.Graph()
    
    for i, t1 in enumerate(tracklets_all_cameras):
        G.add_node(i, tracklet=t1)
        for j, t2 in enumerate(tracklets_all_cameras):
            if i >= j or t1.camera_id == t2.camera_id:
                continue
            
            # Check spatiotemporal plausibility
            if not is_spatiotemporally_plausible(t1, t2, topology):
                continue
            
            # Face similarity
            face_sim = cosine_sim(t1.face_emb, t2.face_emb)
            
            # Body ReID similarity
            reid_sim = cosine_sim(t1.body_emb, t2.body_emb)
            
            # Fused score
            score = 0.6 * face_sim + 0.4 * reid_sim
            
            if score > THRESHOLD_LOW:
                G.add_edge(i, j, weight=score)
    
    return G

# Step 4: Graph clustering → Global IDs
from sklearn.cluster import SpectralClustering

def assign_global_ids(G):
    adjacency = nx.to_numpy_array(G)
    clustering = SpectralClustering(
        n_clusters=estimate_n_persons(G),
        affinity='precomputed'
    ).fit(adjacency)
    return clustering.labels_
```

**Deliverable:** Multi-camera ReID system that assigns consistent Global IDs across cameras.

---

### Phase 4: Threat Detection Module (Weeks 15–20)

```python
# Tools: PyTorchVideo (SlowFast), scikit-learn (anomaly detection)

# Step 1: Watchlist matching (integrated with Phase 1 FAISS index)
def check_watchlist(embedding, watchlist_index, threshold=0.65):
    D, I = watchlist_index.search(embedding.reshape(1,-1), k=1)
    if D[0][0] > threshold:
        return watchlist_ids[I[0][0]], D[0][0]
    return None, None

# Step 2: Loitering detection
class LoiteringDetector:
    def __init__(self, zones, threshold_seconds=60):
        self.zones = zones  # List of polygon zones
        self.time_in_zone = defaultdict(lambda: defaultdict(float))
    
    def update(self, gid, position, timestamp):
        for zone_id, zone_poly in self.zones.items():
            if point_in_polygon(position, zone_poly):
                self.time_in_zone[gid][zone_id] += 1/fps
                if self.time_in_zone[gid][zone_id] > self.threshold:
                    return Alert("LOITERING", gid, zone_id)
            else:
                self.time_in_zone[gid][zone_id] = 0

# Step 3: Action recognition (SlowFast)
from pytorchvideo.models import create_slowfast
from pytorchvideo.transforms import UniformTemporalSubsample

action_model = create_slowfast(model_num_class=400)  # Kinetics-400

def classify_action(video_clip):  # [T, H, W, C]
    # Prepare slow and fast pathways
    slow_frames = UniformTemporalSubsample(8)(video_clip)  # 8 frames
    fast_frames = UniformTemporalSubsample(32)(video_clip)  # 32 frames
    
    with torch.no_grad():
        preds = action_model([slow_frames, fast_frames])
    
    return KINETICS_LABELS[preds.argmax()], preds.max().item()

# Step 4: Anomaly detection (Autoencoder)
class SurveillanceAnomalyDetector(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = ConvLSTM(...)  
        self.decoder = ConvLSTM(...)  
    
    def forward(self, x):
        z = self.encoder(x)
        x_hat = self.decoder(z)
        anomaly_score = F.mse_loss(x_hat, x)
        return anomaly_score
```

**Deliverable:** Integrated threat detection pipeline with watchlist matching, loitering detection, action recognition, and anomaly detection.

---

### Phase 5: System Integration & Production Hardening (Weeks 21–26)

- FastAPI REST API for all modules
- Kafka message bus integration
- Milvus vector database migration from FAISS
- Operator dashboard (React + WebSocket for real-time updates)
- TensorRT model optimization (INT8)
- Load testing, latency profiling, bottleneck resolution
- Security audit, adversarial testing
- Bias audit across demographic groups
- Legal review of deployment scope

---

## 12. CITATIONS

### IEEE Format

[1] Y. Taigman, M. Yang, M. Ranzato, and L. Wolf, "DeepFace: Closing the gap to human-level performance in face verification," in _Proc. IEEE CVPR_, 2014, pp. 1701–1708. doi: 10.1109/CVPR.2014.220.

[2] F. Schroff, D. Kalenichenko, and J. Philbin, "FaceNet: A unified embedding for face recognition and clustering," in _Proc. IEEE CVPR_, 2015, pp. 815–823. [Online]. Available: https://arxiv.org/abs/1503.03832

[3] J. Deng, J. Guo, N. Xue, and S. Zafeiriou, "ArcFace: Additive angular margin loss for deep face recognition," in _Proc. IEEE CVPR_, 2019, pp. 4690–4699. [Online]. Available: https://arxiv.org/abs/1801.07698

[4] H. Wang, Y. Wang, Z. Zhou, X. Ji, D. Gong, J. Zhou, Z. Li, and W. Liu, "CosFace: Large margin cosine loss for deep face recognition," in _Proc. IEEE CVPR_, 2018, pp. 5265–5274. [Online]. Available: https://arxiv.org/abs/1801.09414

[5] W. Liu, Y. Wen, Z. Yu, M. Li, B. Raj, and L. Song, "SphereFace: Deep hyperspherical face recognition," in _Proc. IEEE CVPR_, 2017, pp. 212–220. [Online]. Available: https://arxiv.org/abs/1704.08063

[6] Q. Meng, S. Zhao, Z. Huang, and F. Zhou, "MagFace: A universal representation for face recognition and quality assessment," in _Proc. IEEE CVPR_, 2021, pp. 14225–14234. [Online]. Available: https://arxiv.org/abs/2103.06627

[7] M. Kim, A. K. Jain, and X. Liu, "AdaFace: Quality adaptive margin for face recognition," in _Proc. IEEE CVPR_, 2022, pp. 18750–18759. [Online]. Available: https://arxiv.org/abs/2204.00964

[8] J. Deng, J. Guo, E. Ververas, I. Kotsia, and S. Zafeiriou, "RetinaFace: Single-shot multi-level face localisation in the wild," in _Proc. IEEE CVPR_, 2020, pp. 5203–5212. [Online]. Available: https://arxiv.org/abs/1905.00641

[9] K. Zhang, Z. Zhang, Z. Li, and Y. Qiao, "Joint face detection and alignment using multitask cascaded convolutional networks," _IEEE Signal Process. Lett._, vol. 23, no. 10, pp. 1499–1503, 2016. [Online]. Available: https://arxiv.org/abs/1604.02878

[10] N. Wojke, A. Bewley, and D. Paulus, "Simple online and realtime tracking with a deep association metric," in _Proc. IEEE ICIP_, 2017, pp. 3645–3649. [Online]. Available: https://arxiv.org/abs/1703.07402

[11] Y. Zhang, P. Sun, Y. Jiang, D. Yu, F. Weng, Z. Yuan, P. Luo, W. Liu, and X. Wang, "ByteTrack: Multi-object tracking by associating every detection box," in _Proc. ECCV_, 2022, pp. 1–21. [Online]. Available: https://arxiv.org/abs/2110.06864

[12] S. He, H. Luo, P. Wang, F. Wang, H. Li, and W. Jiang, "TransReID: Transformer-based object re-identification," in _Proc. IEEE ICCV_, 2021, pp. 14993–15002. [Online]. Available: https://arxiv.org/abs/2102.04378

[13] K. Zhou, Y. Yang, A. Cavallaro, and T. Xiang, "Omni-scale feature learning for person re-identification," in _Proc. IEEE ICCV_, 2019, pp. 3702–3712. [Online]. Available: https://arxiv.org/abs/1905.00953

[14] W. Sultani, C. Chen, and M. Shah, "Real-world anomaly detection in surveillance videos," in _Proc. IEEE CVPR_, 2018, pp. 6479–6488. [Online]. Available: https://arxiv.org/abs/1801.04264

[15] J. Carreira and A. Zisserman, "Quo vadis, action recognition? A new model and the kinetics dataset," in _Proc. IEEE CVPR_, 2017, pp. 6299–6308. [Online]. Available: https://arxiv.org/abs/1705.07750

[16] C. Feichtenhofer, H. Fan, J. Malik, and K. He, "SlowFast networks for video recognition," in _Proc. IEEE ICCV_, 2019, pp. 6202–6211. [Online]. Available: https://arxiv.org/abs/1812.03982

[17] A. Dosovitskiy, L. Beyer, A. Kolesnikov, D. Weissenborn, X. Zhai, T. Unterthiner, M. Dehghani, M. Minderer, G. Heigold, S. Gelly, J. Uszkoreit, and N. Houlsby, "An image is worth 16×16 words: Transformers for image recognition at scale," in _Proc. ICLR_, 2021. [Online]. Available: https://arxiv.org/abs/2010.11929

[18] Z. Liu, Y. Lin, Y. Cao, H. Hu, Y. Wei, Z. Zhang, S. Lin, and B. Guo, "Swin Transformer: Hierarchical vision transformer using shifted windows," in _Proc. IEEE ICCV_, 2021, pp. 10012–10022. [Online]. Available: https://arxiv.org/abs/2103.14030

[19] W. Li, R. Zhao, T. Xiao, and X. Wang, "DeepReID: Deep filter pairing neural network for person re-identification," in _Proc. IEEE CVPR_, 2014, pp. 152–159. doi: 10.1109/CVPR.2014.27.

[20] Y. Li, J. Zhu, R. Li, Y. Niu, F. Tian, and L. Yuan, "CLIP-ReID: Exploiting vision-language model for image re-identification without concrete text labels," in _Proc. AAAI_, 2023. [Online]. Available: https://arxiv.org/abs/2211.13977

[21] M. Sharif, S. Bhagavatula, L. Bauer, and M. K. Reiter, "Accessorize to a crime: Real and stealthy attacks on state-of-the-art face recognition," in _Proc. ACM CCS_, 2016, pp. 1528–1540. doi: 10.1145/2976749.2978392.

[22] P. Grother, M. Ngan, and K. Hanaoka, "Face recognition vendor testing (FRVT) part 3: Demographic effects," NIST Interagency Report 8280, 2019. [Online]. Available: https://doi.org/10.6028/NIST.IR.8280

[23] Y. Liu, Z. Liu, and M. Wang, "Future frame prediction for anomaly detection — A new baseline," in _Proc. IEEE CVPR_, 2018, pp. 6536–6545. [Online]. Available: https://arxiv.org/abs/1712.09867

[24] J. Johnson, M. Douze, and H. Jégou, "Billion-scale similarity search with GPUs," _IEEE Trans. Big Data_, vol. 7, no. 3, pp. 535–547, 2021. [Online]. Available: https://arxiv.org/abs/1702.08734

[25] Z. Dan, Y. Deng, H. Chen, B. Deng, H. Shi, and T. Mei, "TransFace: Calibrating transformer training for face recognition from a data-centric perspective," in _Proc. IEEE ICCV_, 2023. [Online]. Available: https://arxiv.org/abs/2308.10133

[26] N. Aharon, R. Orfaig, and B.-Z. Bobrovsky, "BoT-SORT: Robust associations multi-pedestrian tracking," _arXiv preprint_, 2022. [Online]. Available: https://arxiv.org/abs/2206.14651

[27] J. Cao, X. Pang, J. Weng, and R. Khosla, "Observation-centric SORT: Rethinking SORT for robust multi-object tracking," in _Proc. IEEE CVPR_, 2022. [Online]. Available: https://arxiv.org/abs/2203.14360

[28] J. Guo, J. Deng, A. Lattas, and S. Zafeiriou, "Sample and computation redistribution for efficient face detection," in _Proc. ICLR_, 2022. [Online]. Available: https://arxiv.org/abs/2105.04714

[29] L. Mi, C. Peng, Z. Zhang, W. Huang, and X. Cao, "Privacy-preserving face recognition using random frequency components," in _Proc. ECCV_, 2022. [Online]. Available: https://arxiv.org/abs/2208.01910

[30] Y. Li, C. Li, and Q. Wang, "CSRNet: Dilated convolutional neural networks for understanding the highly congested scenes," in _Proc. IEEE CVPR_, 2018, pp. 1091–1100. [Online]. Available: https://arxiv.org/abs/1802.10062

---

> **Research Note on Ethics:** This survey documents technical capabilities for educational, research, and security system design purposes. The deployment of mass biometric surveillance raises profound civil liberties concerns — including disproportionate impacts on marginalized communities, chilling effects on assembly and expression, and the risk of authoritarian misuse. Responsible development requires robust legal frameworks, bias auditing, transparency mechanisms, meaningful consent where feasible, and independent oversight. The academic community, policymakers, and practitioners all share responsibility for ensuring these systems — if deployed — operate within strict legal constraints and are subject to ongoing democratic accountability.



---
# Questions




---
# Summary 





---
# References 

