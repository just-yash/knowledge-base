
Type : #Research    
Date : 2026-05-11          
Status : #draft           
~ ***Yash Agrawall*** ~  

---
# Multi-Camera Surveillance — Benchmarks

**Project:** Multi-Camera Threat Detection and Person Identification  
**Stage:** Benchmarking

---
## Benchmark Datasets

| Dataset | Type | Cameras | Notes |
|---|---|---|---|
| Market-1501 | Re-ID | 6 | Standard single-dataset re-ID benchmark |
| DukeMTMC-reID | Re-ID | 8 | Multi-camera, indoor university campus |
| CUHK03 | Re-ID | 2 | Detected vs hand-cropped versions |
| MARS | Video Re-ID | 6 | Sequence-based re-ID |
| MOT17 | Tracking | Varies | Multi-object tracking benchmark |

---
## Evaluation Metrics

### Re-Identification
- **Rank-1 Accuracy**: Percentage of queries where correct match is rank 1
- **mAP (mean Average Precision)**: Area under precision-recall curve across all queries

### Tracking
- **MOTA** (Multi-Object Tracking Accuracy): Combines FP, FN, ID switches
- **IDF1**: ID F1 score — identity preservation metric
- **ID Switch rate**: How often tracks are incorrectly re-assigned

---
## Baseline Results (Literature)

| Method | Dataset | Rank-1 | mAP |
|---|---|---|---|
| OSNet | Market-1501 | 94.8% | 84.9% |
| OSNet | DukeMTMC | 88.6% | 73.5% |
| DeepSORT | MOT17 | — | MOTA: 61.4 |

---
## Our Results

| Date | Config | Dataset | Rank-1 | mAP | Notes |
|---|---|---|---|---|---|
| — | — | — | — | — | Not yet run |

---
## Open Questions

- What is the correct evaluation protocol for cross-camera (non-overlapping) scenarios vs same-camera?
- How do we benchmark the full pipeline (detection → tracking → re-ID) end-to-end?
- What FPS benchmarks are required for the system to be considered real-time?

---
## References

-
