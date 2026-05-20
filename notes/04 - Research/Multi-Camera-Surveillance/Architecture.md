
Type : #Research    
Date : 2026-05-11          
Status : #draft           
~ ***Yash Agrawall*** ~  

---
# Multi-Camera Surveillance — System Architecture

**Project:** Multi-Camera Threat Detection and Person Identification  
**Stage:** Architecture Design

---
## System Overview

> One sentence: What does this system do?

A multi-camera surveillance system that detects persons of interest across non-overlapping camera feeds using appearance-based re-identification and trajectory tracking.

---
## Architecture Components

### Input Layer
- Multiple RTSP/video stream inputs
- Frame extraction and synchronisation
- Resolution normalisation pipeline

### Detection Layer
- YOLO (v8/v11) for person detection per frame
- Bounding box extraction and confidence thresholding
- Frame-level person crop extraction

### Tracking Layer
- DeepSORT for single-camera per-person tracking
- Track ID assignment and management
- Re-ID feature extraction per track (OSNet / ResNet backbone)

### Cross-Camera Re-ID Layer
- Feature vector storage per track
- Cosine similarity matching across camera feeds
- Global ID assignment and merging logic

### Output Layer
- Real-time overlay on video feed
- Alert generation for flagged persons
- Logging and playback module

---
## Technology Stack

| Component | Technology |
|---|---|
| Detection | YOLOv8 / YOLOv11 |
| Tracking | DeepSORT |
| Re-ID backbone | OSNet (torchreid) |
| Vision framework | OpenCV |
| Language | Python |
| Hardware target | GPU (CUDA) / CPU fallback |

---
## Key Design Decisions

-

---
## Open Questions

- What is the correct feature normalisation strategy for cross-camera matching under lighting variation?
- Should global ID assignment use a gallery database or real-time pairwise matching?
- What is the minimum hardware requirement for real-time processing of 4 simultaneous feeds?

---
## References

-
