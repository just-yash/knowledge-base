
Type : #Research    
Date : 2026-05-11          
Status : #draft           
~ ***Yash Agrawall*** ~  

---
# Multi-Camera Surveillance — Literature Review

**Project:** Multi-Camera Threat Detection and Person Identification  
**Stage:** Literature Review

---
## Core Problem Areas

1. **Person Detection** — detecting and localising persons in video frames
2. **Single-Camera Tracking** — maintaining identity across frames within one feed
3. **Person Re-Identification** — matching persons across different cameras
4. **Multi-Camera Tracking** — coordinating identities across multiple feeds

---
## Key Papers

### Detection
| Paper | Year | Key Contribution |
|---|---|---|
| YOLOv8 (Ultralytics) | 2023 | Real-time detection with anchor-free architecture |
| YOLOv11 | 2024 | Improved efficiency and accuracy over v8 |

### Tracking
| Paper | Year | Key Contribution |
|---|---|---|
| DeepSORT (Wojke et al.) | 2017 | Adds appearance features to SORT for better occlusion handling |
| SORT (Bewley et al.) | 2016 | Simple online real-time tracking with Kalman filter + Hungarian algorithm |
| ByteTrack | 2022 | Uses low-confidence detections to reduce ID switches |

### Re-Identification
| Paper | Year | Key Contribution |
|---|---|---|
| OSNet (Zhou et al.) | 2019 | Omni-scale feature learning for re-ID, state-of-art on Market-1501 |
| BoT-ReID | 2019 | Bag of Tricks — strong baseline with training tricks |
| TransReID | 2021 | Transformer-based re-ID architecture |

### Multi-Camera Systems
| Paper | Year | Key Contribution |
|---|---|---|
| MTMCT Survey | 2021 | Survey of multi-target multi-camera tracking approaches |

---
## Identified Gaps in Literature

- Most re-ID methods assume controlled lighting; performance degrades in outdoor variable-light conditions
- Cross-camera temporal alignment is rarely addressed explicitly
- Few end-to-end systems cover detection → tracking → re-ID with real deployment benchmarks

---
## Open Questions

- What is the current SOTA method for cross-camera re-ID with non-overlapping FOVs?
- How does transformer-based re-ID (TransReID) compare to CNN-based (OSNet) at inference time?
- What datasets exist for Indian surveillance contexts (indoor markets, campus settings)?

---
## Papers to Read Next

- [ ] TransReID full paper
- [ ] ByteTrack full paper
- [ ] MTMCT survey 2021
- [ ] Recent CVPR/ICCV papers on multi-camera person tracking (2023–2025)

---
## References

-
