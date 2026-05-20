
Type : #Research    
Date : 2026-05-11          
Status : #active           
~ ***Yash Agrawall*** ~  

---
# Multi-Camera Surveillance — Implementation Log

**Project:** Multi-Camera Threat Detection and Person Identification  
**Stack:** Python, OpenCV, YOLOv8, DeepSORT, OSNet (torchreid)

---
## Log Format

Each entry: `[DATE] — What was done / What was found / What broke / What's next`

---
## Log Entries

### 2026-05-11 — Project Initialised
- Vault restructured; research folder created
- Literature review begun
- Architecture document drafted
- Next: Set up Python environment and clone required repos

---
## Environment Setup

```
Python: 3.10+
Dependencies:
  - ultralytics (YOLOv8)
  - deep-sort-realtime
  - torchreid (OSNet)
  - opencv-python
  - torch (CUDA 11.8+)
```

---
## Milestones

| Milestone | Status | Date |
|---|---|---|
| Folder + research scaffold | ✅ Done | 2026-05-11 |
| Environment setup | ⬜ Pending | — |
| Single-camera detection working | ⬜ Pending | — |
| Single-camera tracking working | ⬜ Pending | — |
| Re-ID feature extraction working | ⬜ Pending | — |
| Cross-camera matching prototype | ⬜ Pending | — |
| Demo video recorded | ⬜ Pending | — |
| Paper draft complete | ⬜ Pending | — |

---
## Known Issues

-

---
## Decisions Made

-

---
## Open Questions

- What is the correct way to synchronise timestamps across two cameras with different FPS?
- Should the gallery for re-ID be built dynamically (first appearance) or from a pre-enrolled set?
