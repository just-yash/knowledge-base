
Date :  04-11-2025
Tags :   [[Linux]] ; [[CyberSec]]

---
# Linux Foundation
## Chapter Objectives:
- Discuss the role of the Linux Foundation.
- Appreciate the learning opportunities provided by the Linux Foundation's training program.
- Describe the software environment required for this course.
- Describe the three major Linux distribution families.


## 3 Major Linux Distribution Families 
Linux continues to evolve as developers and contributors identify new needs and create solutions to address them. In some cases, this innovation leads to the creation of an entirely new distribution. In others, it results in extensions or variations built on top of existing distributions, further expanding the families that already exist.
![[Pasted image 20251104151012.png]]
[Major Distributions from DistroWatch](https://distrowatch.com/dwres.php?resource=major)

# The Red Hat Family
- Red Hat Enterprise Linux (RHEL) heads the family that includes **CentOS**, **CentOS Stream**, **Fedora**, **Oracle Linux**. 
- It supports multiple hardware platforms.
- It uses dnf, the RPM-based package manager to install, update, and remove packages in the system.
- RHEL is widely used by enterprises that host their own systems. 
### Fedora
- It is used as a testing platform for future RHEL releases. 
- It has significantly more software than Red Hat's Enterprise version. 
- A diverse community is involved in building Fedora with many contributors who do not work for RHEL. 
- Releases new version every 6 months or so.
### CentOS and CentOS Stream
- CentOS is a close clone of RHEL; in fact, CentOS has been part of Red Hat since 2014.
- CentOS 8 has no scheduled updates after 2021. The replacement is CentOS 8 Stream. 
- CentOS Stream receives updates before RHEL. CentOS receives them after.

*For this Course CentOS and CentOS Stream is used as they are free.*

# The SUSE Family
- **SUSE Linux Enterprise Server (SLES)** and **openSUSE**
- the two products are extremely similar, the material that covers openSUSE can typically be applied to SLES with few problems
- SLES is upstream for openSUSE.
- it uses RPM-based zypper package manager to install, update, remove packages in the system.
- It includes the YaST(Yet Another Setup Tool) application for system administration purposes. 
- SLES is widely used in retail and many other sectors.

*For this Course openSUSE is uses as it is free. 

# The Debian Family
- **Debian** is upstream for **Ubuntu** which is upstream for **Linux Mint**.
- It uses the DPKG-based APT package manager (using apt, apt-get, apt-cache, etc.,) to install, update, and remove packages in the system.
- Ubuntu has been widely used for cloud deployments.
- While Ubuntu is built on top of Debian and is GNOME-based under the hood, it differs visually from the interface on standard Debian, as well as other distributions

---
# Questions




---
# Summary 





---
# References 

1. [Introduction to Linux - Linux Course](https://training.linuxfoundation.org/training/introduction-to-linux/)