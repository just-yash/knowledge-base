
Date :  14-11-2025
Tags :   [[Linux]] ; [[CyberSec]]

---
# Stages of Hacking
> To know your enemy, you must become your enemy.
>> ~ Sun Tzu (Great Chinese Warrior)
>>> To be a great White Hat Hacker you must learn how Black Hat Hackers operate. 

- Only attempt any security testing methods on a target with explicit permission
- Don't harm anyone or be on the wrong side of the law.

![[Pasted image 20251114173340.png]]

# Reconnaissance Basic Tools
- Web-App scanners. Eg: Wappalyzer or WhatWeb. (What runs is a browser extension that shows stack info.) The idea is fingerprinting technologies.
	- What backend the system is running on - php, mySQL, wordpress
	- Check the version the software is running on
		- Check if that version has any vulnerabilities 
- whois , reverse dns(rDNS)
	- lets us identify the IP address of any website by looking at its domain
	- reverse dns maps an IP → domain (using PTR records but most DNS nowdays dont have PTR records)
	- PTR record flips the direction by linking IP to domain.
		- tools like nslookup, dig -x
		- Email servers use PTR records to confirm legitimacy.
- Miscellaneous information like information about Users, members, emails, phone numbers, etc.
- Dorking 
	- You can look for hidden files using the search engine. Often called as Google Dorking.

# Scanning 
> Actively scanning and gathering information on target

Tools:
- Port scanners like nmap, rustscan, etc.
	- websites are not the only thing that a system runs, it also has ports like **SSH**, **FTP**, **DNS**
- Directory brute forcing tools like dirbuster, gobuster.
	- Check if certain directories (hidden) exist in a webserver or not.
- Vulnerability scanners like Burpsuite, nessus. 
	- Scan the whole website
	- Perform scripts and attack on it
	- tell us what is the vulnerable part in it.

# Gain Access
>Exploiting the system and getting in it.
### Basic Exploitation & Backdooring Tools
- Metasploit (by Rapid7)
	- Huge collection which has a huge no. of exploits and tools
	- Anything that you want to hack, its module can be found in Metasploit
- Exploits from exploitdb and CVEs
	- Sometimes some newer exploits might not be available in MSF(Metasploit) 
	- CVEs is open platform which is basically a directory of reported vulnerabilities and exploits
	- You may not get the whole code but may get the idea that type of vulnerability exists.
- Aircrack-ng suite, bettercap like tools for network exploitation.
	- used in a network environment - Wi-Fi, Ethernet, etc.
	- Crack Wi-Fi passwords and maintain access inside the network of the target.
- Wireshark
	- monitors **traffic the attacker’s network interface can see**.
	- Look for other exploitation.
	- Sniffing your own network, or Sniffing a victim after you’ve put their wifi card into monitor mode (Aircrack tools do this).

# Maintain Access
>Creating backdoor to maintain access to the system.

Tools:
- Metasploit Modules 
- Reverse Shell Scripts
- BeEF (Browser exploitation Framework)
	- Its not really for maintaining access - it's more for browser exploitation and session control.
- Nexpose (Corporate tool)

# Clearing Tracks
>Cleaning up any traces that can be led back to us.

- Clearing System logs
- Steganography 
	- hiding backdooring systems and viruses inside an image or an .exe file.
	- hiding so that the target doesn't realize that it has been hacked.
- Tunneling 
	- using VPN, tor, relays, proxies.
- Hiding behind system processes.
	- Hiding behind system files that the target wont suspect.
	- Eg: Hiding behind explorer.exe in Windows.
		- DLL injection 
		- Process hollowing 
		- service registration 
		- run keys
		- scheduled tasks
- Modifying timestamps (timestomping)
- remove malware from obvious locations



---
# Questions




---
# Summary 





---
# References 

1. [ETHICAL HACKING course (Tutedude) ](https://upskill.tutedude.com/course/lecture-ethicalhacking)
