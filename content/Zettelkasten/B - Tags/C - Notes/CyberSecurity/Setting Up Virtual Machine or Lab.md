
Date :  06-11-2025  
Tags :  [[CyberSec]]  
~ ***Yash Agrawall*** ~  

---
# Virtualization
Virtualization is the process of **running a virtual computer system in a layer abstracted from the actual hardware**. Commonly, it refers to **running multiple OSs on a computer system simultaneously**. 
![[Pasted image 20251106193658.png]]
> Why Virtualization?
- Easier to Set up
- Easy Recovery 
- Save states / Snapshots
- Multitasking
	- Allows us to use both OSs at the same time
- Portable
	- Portable OVA File. Import/ Export 
- Sandboxing 
	- Any file or hack that happens in the VM stays in the VM protecting your host OS and data.
# Hypervisor Applications
###  **VMware**
**Best for:** Professional users, performance, stability.  
**Pros:**
- Excellent graphics and hardware acceleration.
- Very stable and smooth for Windows and Linux VMs.
- Great support for 3D acceleration and USB devices.  
**Cons:**
- Snapshot support only in paid **VMware Workstation Pro**.
- Closed-source and heavy on resources.  
**Verdict:** Best if you’ll use it professionally or for serious cybersecurity/AI labs later.
    
---
###  **VirtualBox**
**Best for:** Beginners, students, and open-source lovers.  
**Pros:**
- 100% free and open-source.
    - Easy to use and supports snapshots in free version.
    - Good for learning or testing OSes.  
**Cons:**
   - Slower performance and weaker GPU acceleration.  
**Verdict:** Best for learning or light virtualization on budget systems.
    
---
### 🪟 **Hyper-V** (Microsoft)

**Best for:** Windows 10/11 Pro and enterprise users.  
**Pros:**
- Built into Windows (no extra install).
- Excellent performance for Windows VMs.
- Integrates with Windows Defender and networking tools.  
**Cons:**
- Only available on Windows Pro/Enterprise.
- Limited Linux compatibility.  
**Verdict:** Great for Windows-only environments; not ideal if you want to run Linux or multi-OS labs.
    
---
### 🦩 **QEMU (with KVM on Linux)**

**Best for:** Advanced users, penetration testers, and researchers.  
**Pros:**
- Very flexible — can emulate _any_ architecture (ARM, x86, MIPS, etc.).
- Used in enterprise servers and research environments.
- Fully open-source and powerful with KVM(Kernel based Virtual Machine) acceleration.  
    **Cons:**
- Not beginner-friendly — requires command-line setup.
- GUI is minimal compared to others.  
    **Verdict:** Excellent for cybersecurity, AI model testing, or cross-platform emulation — but with a steeper learning curve.

- **QEMU without KVM** → slow, but can emulate _any_ architecture (e.g., run ARM on x86).
- **QEMU with KVM** → fast, but limited to your real CPU type (e.g., x86-on-x86).

| Use Case                            | Best Choice    |
| ----------------------------------- | -------------- |
| Beginner / Student                  | **VirtualBox** |
| Professional / Smooth Experience    | **VMware**     |
| Windows-only setup                  | **Hyper-V**    |
| Advanced / Research / Cybersecurity | **QEMU + KVM** |

### Why not WSL instead of Virtual Machine?
WSL - Windows Subsystem for Linux
####  Pros of WSL
- **Fast startup** — runs almost instantly, no need to boot a full OS.
- **Uses less RAM and CPU** than VMware or VirtualBox.
- **Tight Windows integration** — you can access Windows files from Linux and vice versa easily.
- **Perfect for development** — AI, Python, Docker, Node, etc. run beautifully.
    
####  But here’s the catch
- **Limited GUI support** — you _can_ run Linux GUIs now, but it’s not as smooth as a full desktop VM.
- **No full system isolation(No Sandboxing)** — it shares many resources with Windows, so not ideal for testing malware or kernel-level tools.
- **Networking quirks** — some advanced network setups (like custom routing, MITM labs, or virtual networks) don’t behave the same as in a full VM.
- **No snapshots** — you can’t roll back to a clean state easily.

|Task|Best Option|
|---|---|
|Programming, AI/ML, Linux dev|**WSL 2**|
|Full OS testing, cybersecurity labs, malware analysis|**VMware / VirtualBox / QEMU**|
|Lightweight sandbox, scripting|**WSL 2**|
|Complete OS isolation & snapshots|**Virtual Machine**|



`sudo`  == administrative privileges and permissions
`apt` == update or package manager


---
# Questions




---
# Summary 





---
# References 
[[Ethical Hacking]] | [[Setting Up Virtual Machine or Lab]] | [[Kali Linux Overview]] 
1. [[Ethical Hacking|Ethical Hacking]]
2. [ETHICAL HACKING course (Tutedude) ](https://upskill.tutedude.com/course/lecture-ethicalhacking)
3. [How to Install Kali Linux 2025 in VirtualBox | Kali Linux 2025.1](https://www.youtube.com/watch?v=ZJFu0AoAY_g)