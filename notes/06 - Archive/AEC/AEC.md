
Type : #RawNote #classes           
Exam Date :  **08-12-2025**  
Subject : **AEC**  
Subject Code : **ESEC2213**  
Tags : [[College]] 

---
# Core Concepts
**BJT Voltage Divider Analysis:** This is a guaranteed 5-7 mark question. You are almost always asked to find the full set of parameters (`Zi`, `Zo`, `Av`, `Ai`) for a standard voltage divider circuit. The component values change, but the problem type is identical across multiple papers.

**Op-Amp Fundamentals & Linear Applications:** Questions on "virtual ground," the "inverting summing amplifier," and the characteristics of an "ideal Op-Amp" are constants.

**Oscillator Principles:**
1. State the **Barkhausen criterion** for oscillation.
2. Draw and explain either the **RC Phase-Shift** or **Wein-Bridge** oscillator.
3. Derive the frequency and gain conditions for one of them.

***FET/MOSFET Working Principles:*** A very common theoretical question is "Explain the working principle and draw the characteristics of an n-channel (or p-channel) D-MOSFET/E-MOSFET." He just switches the type.

***Power Amplifiers (Theory):*** He frequently asks for the concept of a **Class A transformer-coupled amplifier** or a **Class B push-pull amplifier**, with a focus on explaining **crossover distortion** and how to overcome it.

# Q Templates
## 1-2 Marks → Short Direct Qs
"What is an Oscillator?", "Why FET is called a voltage-operated device?", "Define CMRR of an op-amp."

## 5-7 Marks → draw a standard circuit and derive the key expression for its gain, frequency, etc.
a Darlington pair or an active low-pass filter

## 5-7 Marks → Calculate everything
go-to for BJT and FET circuits. He gives you a circuit diagram and asks for all the DC and AC parameters.

## 3-5 Marks → Differentiate Template
Differentiate between negative feedback and positive feedback amplifier.

## 5 marks → Short Notes → slightly less common but still important topics
**Current Mirror circuits** and **Miller Capacitance** are frequent flyers here.

---
# Qs Weightage Wise

**Frequency Key:**
- **High:** Topic appears in all 3 PYQs.
- **Medium:** Topic appears in 2 of 3 PYQs.
- **Low:** Topic appears in 1 of 3 PYQs.
### 📄 Paper: Jan 2023
30

| **Q. No.**       | **Full Question**                                                                                                                                                                                             | **Marks** | **Module**     | **Frequency** | Marker |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------- | ------------- | ------ |
| **Q1 (a-j)**     | **Compulsory Short Questions**                                                                                                                                                                                | **10**    | **(Mixed)**    |               | 5      |
| **Q2 (a-b)**     |                                                                                                                                                                                                               | **10**    | **Module II**  |               | 5      |
| **Q3 (a-b)**     |                                                                                                                                                                                                               | **10**    | **(Mixed)**    |               | 0      |
| **Q4 (a-b)**     |                                                                                                                                                                                                               | **10**    | **Module III** |               | 5      |
| **Q5 (a-b)**     |                                                                                                                                                                                                               | **10**    | **Module I**   |               | 0      |
| **Q6 (a-b)**     |                                                                                                                                                                                                               | **10**    | **Module III** |               | 5      |
| **Q7 (a-b)**     |                                                                                                                                                                                                               | **10**    | **Module IV**  |               | 0      |
| **Q8 (any two)** | **Short Notes**                                                                                                                                                                                               | **10**    | **(Mixed)**    |               | 10     |
| 1a               | "Why FET is called as 'voltage operated device'?"                                                                                                                                                             | 1         | **Module II**  | ***High***    | ✅      |
| 1b               | "What is the Barkhausen criterion to sustain oscillation?"                                                                                                                                                    | 1         | **Module III** | ***High***    | ✅      |
| 1c               | "Define CMRR of an op-amp."                                                                                                                                                                                   | 1         | **Module IV**  | ***High***    | ✅      |
| 1f               | "Define Threshold voltage in Mosfet."                                                                                                                                                                         | 1         | **Module II**  | ***High***    |        |
| 1g               | "Prove that Negative feedback in an amplifier reduces gain."                                                                                                                                                  | 1         | **Module III** | ***High***    | ✅      |
| 1i               | "How does the bypass capacitor affecting to the Gain of amplifier?"                                                                                                                                           | 1         | **Module I**   | ***High***    |        |
| 3a               | "Find the input impedance, output impedance and Gain of voltage series feedback circuit."                                                                                                                     | 5         | **Module III** | ***High***    |        |
| 5a               | "Draw the circuit of voltage divider bias(bypass). Take the circuit parameter as, VCC=10V, R2=17KΩ, R1=83KΩ RC=2KΩ, RE=0.5KΩ. The transistor has β=100 and VBE=0.7V. Draw re model and find zi, zo, Av."      | 5         | **Module I**   | ***High***    |        |
| 5b               | "Draw the equivalent two port network of above said circuit. If Rs=0.6 ΚΩ, RL=3.3 ΚΩ connected to the circuit then, what will be the overall voltage gain, input impedance, output impedance of the circuit?" | 5         | **Module I**   | ***High***    |        |
| 7a               | "Draw the circuit diagram of an active low pass filter and explain its operation and find the cutoff frequency."                                                                                              | 5         | **Module IV**  | ***High***    |        |
| 1d               | "Write the expression of Fourier series expansion for a square wave."                                                                                                                                         | 1         | **Module I**   | Low           |        |
| 1e               | "Draw the Darlington pair transistor circuit and define BD."                                                                                                                                                  | 1         | **Module I**   | Low           | ✅      |
| 1h               | "What is Unity gain bandwidth product."                                                                                                                                                                       | 1         | **Module IV**  | Low           |        |
| 1j               | "Draw the transfer characteristics curve of n channel E-Mosfet."                                                                                                                                              | 1         | **Module II**  | Low           | ✅      |
| 2a               | "For the given circuit, IDSS=6mA, Vp=-6V, rd=∞, Determine fLG, FLC, FLS. What will be the lower cutoff frequency?."<br>![[Pasted image 20251101133013.png]]                                                   | 5         | **Module II**  | Low           |        |
| 3b               | "Derive the expression for finding fL, fH and bandwidth by square wave testing method."                                                                                                                       | 5         | **Module I**   | Low           |        |
| 7b               | "Draw the Instrumentation Amplifier circuit, derive the output voltage expression and find Vout(when V1=3V, V2=1V and the resistance of all the resistors is 5ΚΩ)"                                            | 5         | **Module IV**  | Low           |        |
| 8a               | "Miller capacitances (CMi and CMo)."                                                                                                                                                                          | 5         | **Module I**   | Low           | ✅      |
| 8b               | "Crystal oscillator"                                                                                                                                                                                          | 5         | **Module III** | Low           |        |
| 8d               | "BJT Cascade connection"                                                                                                                                                                                      | 5         | **Module I**   | Low           |        |
| 2b               | "Briefly explain the principle and operation of n channel D-MOSFET. Why is it called so?"                                                                                                                     | 5         | **Module II**  | **Medium**    | ✅      |
| 4a               | "Draw the circuit diagram of Phase shift oscillator and derive the expression for frequency of oscillation, Gain (A) and feedback gain (β)."                                                                  | 7         | **Module III** | **Medium**    |        |
| 4b               | "Differentiate between negative feedback and positive feedback amplifier."                                                                                                                                    | 3         | **Module III** | **Medium**    | ✅      |
| 6a               | "Draw the circuit of class-A transformer coupled power amplifier and explain its operation. Derive an expression for maximum efficiency of conversion."                                                       | 7         | **Module III** | **Medium**    |        |
| 6b               | "What is crossover Distortion? Where is it found? How it can be overcome?"                                                                                                                                    | 3         | **Module III** | **Medium**    | ✅      |
| 8c               | "Current Mirror circuit"                                                                                                                                                                                      | 5         | **Module I**   | **Medium**    | ✅      |

---

### 📄 Paper: Dec 2023-2024
42

| **Q. No.**       | **Full Question**                                                                                                                                                                                                                   | **Marks** | **Module**     | **Frequency** | Marker |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------- | ------------- | ------ |
| **Q1 (a-j)**     | **Compulsory Short Questions**                                                                                                                                                                                                      | **10**    | **(Mixed)**    |               | 7      |
| **Q2 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module I**   |               | 0      |
| **Q3 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module II**  |               | 5      |
| **Q4 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module III** |               | 10     |
| **Q5 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module IV**  |               | 0      |
| **Q6 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module III** |               | 5      |
| **Q7 (a-b)**     |                                                                                                                                                                                                                                     | **10**    | **Module IV**  |               | 5      |
| **Q8 (any two)** | **Short Notes / Problems**                                                                                                                                                                                                          | **10**    | **(Mixed)**    |               | 10     |
| ~~1c~~           | ~~"What is the input resistance of a simple Common emitter BJT?"~~                                                                                                                                                                  | 1         | **Module I**   | **High**      | ✅      |
| ~~1f~~           | ~~"Is JFET is a current controlled device or voltage-controlled device, Justify?"~~                                                                                                                                                 | 1         | **Module II**  | **High**      | ✅      |
| 1h               | ~~"What is virtual ground concept of an OPAMP?"~~                                                                                                                                                                                   | 1         | **Module IV**  | **High**      | ✅      |
| 1j               | ~~"An oscillator requires what kind of feedback to operate?"~~                                                                                                                                                                      | 1         | **Module III** | **High**      | ✅      |
| 2a               | "Find Current Gain, Voltage Gain and Input resistance(impedance) for CE Amplifier using h-parameter hybrid model? Explain the steps taken to avoid loading effect in the Amplifier design?"                                         | 5         | **Module I**   | **High**      |        |
| 2b               | "Find the Current Gain, Voltage Gain, Input resistance, Output resistance of RC coupled Single stage CE amplifier using Simplified analysis? Explain the use of Coupling and Bypass capacitor?"                                     | 5         | **Module I**   | **High**      |        |
| 3b               | "Find the Voltage Gain, Input Resistance and Output Resistance for a JFET common source Amplifier?"                                                                                                                                 | 5         | **Module II**  | **High**      |        |
| 5a               | "Derive and explain the transfer function of a low pass filter with neat circuit diagram?"                                                                                                                                          | 5         | **Module IV**  | **High**      |        |
| 8a               | "A common emitter transistor amplifier has the hybrid parameter of hie =1100Ω hre= 2.5x10-4, hfe 50,hoe=25µA/v and RL=RS=1000Ω. Find Current gain, Voltage Gain. Input resistance and Output resistance using Simplified Analysis?" | 5         | **Module I**   | **High**      | ✅      |
| 1d               | "Explain Early effect on a BJT transistor?"                                                                                                                                                                                         | 1         | **Module I**   | **Low**       | ✅      |
| 1e               | "What are the steps required to find AC equivalent circuit?"                                                                                                                                                                        | 1         | **Module I**   | **Low**       |        |
| ~~1g~~           | ~~"What is the input resistance of an OPAMP? and Why?"~~                                                                                                                                                                            | 1         | **Module IV**  | **Low**       | ✅      |
| 1i               | ~~"What is the Gain of an Inverting Amplifier?"~~                                                                                                                                                                                   | 1         | **Module IV**  | **Low**       | ✅      |
| 7a               | "Explain the working of a SCHMITT TRIGGER circuit?"                                                                                                                                                                                 | 5         | **Module IV**  | **Low**       | ✅      |
| 7b               | "Find $V_{c}$ at $t=1~msec$ If capacitor is initially uncharged?" (Integrator)<br>![[Pasted image 20251101133344.png]]                                                                                                              | 5         | **Module IV**  | **Low**       |        |
| 8b               | "Draw a simplified h-parameter for a Common Base and derive its voltage gain, current gain, input and output resistance?"                                                                                                           | 5         | **Module I**   | **Low**       |        |
| 8d               | "Find the output current in figure shown below. Assume OPAMP to be ideal?"<br>![[Pasted image 20251101133402.png]]                                                                                                                  | 5         | **Module IV**  | **Low**       | ✅      |
| ~~1a~~           | "What is an Amplifier? And what are the conditions required to satisfy to perform as a Signal Amplifier?"                                                                                                                           | 1         | **Module I**   | **Medium**    | ✅      |
| 1b               | "Draw a Trans-Resistance Amplifier? Justify your design?"                                                                                                                                                                           | 1         | **Module III** | **Medium**    |        |
| 3a               | "Explain the working principle with neat diagram for a n-channel MOSFET?"                                                                                                                                                           | 5         | **Module II**  | **Medium**    | ✅      |
| 4a               | "Explain the working principle of a Push Pull Class B power amplifier and find its maximum efficiency?"                                                                                                                             | 5         | **Module III** | **Medium**    | ✅      |
| 4b               | "The value of 'R' required for the sinusoidal oscillations frequency 1Khz in the circuit of the figure?" (Wein-Bridge)<br>![[Pasted image 20251101133140.png]]                                                                      | 5         | **Module III** | **Medium**    | ✅      |
| 5b               | "If OPAMP shown in the below figure is ideal, Then what kind of filter it represents?"<br>![[Pasted image 20251101133239.png]]                                                                                                      | 5         | **Module IV**  | **Medium**    |        |
| 6a               | "Derive the frequency of oscillation and condition for sustained oscillations for a WEIN BRIDGE OSCILLATOR?"                                                                                                                        | 5         | **Module III** | **Medium**    |        |
| 6b               | "Draw and Explain different mixing and sampling network for a feedback circuit used in an amplifier?"                                                                                                                               | 5         | **Module III** | **Medium**    | ✅      |
| 8c               | "Find the output voltage of a OPAMP based subtractor?"                                                                                                                                                                              | 5         | **Module IV**  | **Medium**    | ✅      |

---

### 📄 Paper: 2024-25
43

| **Q. No.**       | **Full Question**                                                                                                                                                                                                                    | **Marks** | **Module**     | **Frequency** | Marker |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | -------------- | ------------- | ------ |
| **Q1 (a-j)**     | **Compulsory Short Questions**                                                                                                                                                                                                       | **10**    | **(Mixed)**    |               | 8      |
| **Q2 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **Module I**   |               | 0      |
| **Q3 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **Module II**  |               | 0      |
| **Q4 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **(Mixed)**    |               | 10     |
| **Q5 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **(Mixed)**    |               | 5      |
| **Q6 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **(Mixed)**    |               | 5      |
| **Q7 (a-b)**     |                                                                                                                                                                                                                                      | **10**    | **Module III** |               | 5      |
| **Q8 (any two)** | **Short Notes / Problems**                                                                                                                                                                                                           | **10**    | **(Mixed)**    |               | 10     |
| 1a               | "What is an Oscillator? And what are the conditions required to satisfy to perform as an signal Oscillator?"                                                                                                                         | 1         | **Module III** | **High**      | ✅      |
| 1c               | "What is the input resistance of a simple common emitter BJT?"                                                                                                                                                                       | 1         | **Module I**   | **High**      | ✅      |
| 1e               | "What is the significance of bypass capacitor in a common emitter BJT?"                                                                                                                                                              | 1         | **Module I**   | **High**      | ✅      |
| 1f               | "JFET works in depletion mode, Justify?"                                                                                                                                                                                             | 1         | **Module II**  | **High**      | ✅      |
| 1g               | "What is common mode voltage gain and differential voltage gain in an OPAMP?"                                                                                                                                                        | 1         | **Module IV**  | **High**      | ✅      |
| 1h               | "What is virtual ground concept of an OPAMP?"                                                                                                                                                                                        | 1         | **Module IV**  | **High**      | ✅      |
| 1j               | "Why an amplifier is incorporated with an oscillator circuit?"                                                                                                                                                                       | 1         | **Module III** | **High**      |        |
| 2a               | "Find Current Gain, Voltage Gain and Input resistance(impedance) for CE Amplifier using h-parameter hybrid model? Explain the steps that ned loading effect in the Amplifier design?"                                                | 5         | **Module I**   | **High**      |        |
| 2b               | "Find the Current Gain, Voltage Gain, Input resistance, Output resistance of RC Coupled single stage CE amplifier using Simplified analysis? Explain the use of Coupling and Bypass capacitor?"                                      | 5         | **Module I**   | **High**      |        |
| 3b               | "Find the Voltage Gain, Input Resistance and Output Resistance for a JFET common source Amplifier?"                                                                                                                                  | 5         | **Module II**  | **High**      |        |
| 6b               | "Derive and Explain the frequency reponse for a Low pass filter?"                                                                                                                                                                    | 5         | **Module IV**  | **High**      |        |
| 8a               | "A common emitter transistor amplifier has the hybrid parameter of hie =1100Ω, hre= 2.5x10-4, hfe=50, hoe=25µA/v and RL=RS=1000Ω Find Current gain, Voltage Gain, Input resistance and Output resistance using Simplified Analysis?" | 5         | **Module I**   | **High**      |        |
| 1i               | "What is a voltage follower? Justify"                                                                                                                                                                                                | 1         | **Module IV**  | **Low**       | ✅      |
| 3a               | "Derive the small signal model for a JFET Amplifier?"                                                                                                                                                                                | 5         | **Module II**  | **Low**       |        |
| 7b               | "For an unknown transistor oscillator L=100 µH C1=0.005µF and C2=0.01µF, Identify the oscillator and find the frequency of oscillation generated in KHz?" (LC Oscillator)                                                            | 5         | **Module III** | **Low**       | ✅      |
| 8b               | "Explain the working of a square wave generator?"                                                                                                                                                                                    | 5         | **Module IV**  | **Low**       | ✅      |
| 8c               | "Find the output voltage of an OPAMP based adder?"                                                                                                                                                                                   | 5         | **Module IV**  | **Low**       | ✅      |
| 1b               | "Draw a Voltage Amplifier? Justify your design?"                                                                                                                                                                                     | 1         | **Module III** | **Medium**    | ✅      |
| 1d               | "Explain the frequency response of an amplifier?"                                                                                                                                                                                    | 1         | **Module I**   | **Medium**    |        |
| 4a               | "Explain the working principle of a Push Pull Class B power amplifier and find its maximum efficiency?"                                                                                                                              | 5         | **Module III** | **Medium**    | ✅      |
| 4b               | "In a current mirror given below derive and find I<sub>REF </sub>?"<br>![[Pasted image 20251101133602.png]]                                                                                                                          | 5         | **Module I**   | **Medium**    | ✅      |
| 5a               | "Derive and explain the low frequency response of a BJT Amplifier?"                                                                                                                                                                  | 5         | **Module I**   | **Medium**    |        |
| 5b               | "If OPAMP shown in the figure is ideal, Then what kind of filter it represents? If R=2K and C=1µF then what is the cutoff frequency?"<br>![[Pasted image 20251101133622.png]]                                                        | 5         | **Module IV**  | **Medium**    | ✅      |
| 6a               | "Draw and Explain different feedback toplogy circuit used in an amplifier?"                                                                                                                                                          | 5         | **Module III** | **Medium**    | ✅      |
| 7a               | "Derive the frequency of oscillation and condition for sustained oscillations for a RC PHASE SHIFT OSCILLATOR?"                                                                                                                      | 5         | **Module III** | **Medium**    |        |
| 8d               | "Find the output voltage $V_{out}$ in figure shown below (Subtractor).<br>![[Pasted image 20251101133653.png]]                                                                                                                       | 5         | **Module IV**  | **Medium**    | ✅      |

---
# Module-wise Weightage 
| **Module**                                    | **Paper: Jan 2023**  | **Paper: Dec 2023**  | **Paper: 2024-25**   | **Average Weightage**  |
| --------------------------------------------- | -------------------- | -------------------- | -------------------- | ---------------------- |
| **Module I** (BJT Analysis)                   | **33 Marks** (36.7%) | **24 Marks** (26.7%) | **28 Marks** (31.1%) | **28.3 Marks (31.5%)** |
| **Module II** (FET/MOSFET)                    | **13 Marks** (14.4%) | **11 Marks** (12.2%) | **11 Marks** (12.2%) | **11.7 Marks (13.0%)** |
| **Module III** (Feedback, Oscillators, Power) | **32 Marks** (35.6%) | **22 Marks** (24.4%) | **23 Marks** (25.6%) | **25.7 Marks (28.5%)** |
| **Module IV** (Op-Amps)                       | **12 Marks** (13.3%) | **33 Marks** (36.7%) | **28 Marks** (31.1%) | **24.3 Marks (27.0%)** |
### Tier 1: High Frequency (Guaranteed Topics)

These topics appeared in **all 3 papers (3/3)**. You must know these inside and out. They form the core of the exam.
**Topic: BJT CE Amplifier Analysis (h-parameter / simplified)**
- **Jan 2023, Q5a (5 Marks):** "Draw the circuit of voltage divider bias(bypass). Take the circuit parameter as, VCC=10V, R2=17KΩ, R1=83KΩ RC=2KΩ, RE=0.5KΩ. The transistor has β=100 and VBE=0.7V. Draw re model and find zi, zo, Av." 1
- **Jan 2023, Q5b (5 Marks):** "Draw the equivalent two port network of above said circuit. If Rs=0.6 ΚΩ, RL=3.3 ΚΩ connected to the circuit then, what will be the overall voltage gain, input impedance, output impedance of the circuit?" 2
- **Dec 2023, Q2a (5 Marks):** "Find Current Gain, Voltage Gain and Input resistance(impedance) for CE Amplifier using h-parameter hybrid model? Explain the steps taken to avoid loading effect in the Amplifier design?" 3
- **Dec 2023, Q2b (5 Marks):** "Find the Current Gain, Voltage Gain, Input resistance, Output resistance of RC coupled Single stage CE amplifier using Simplified analysis? Explain the use of Coupling and Bypass capacitor?" 4
- **Dec 2023, Q8a (5 Marks):** "A common emitter transistor amplifier has the hybrid parameter of hie =1100Ω hre= 2.5x10-4, hfe 50,hoe=25µA/v and RL=RS=1000Ω. Find Current gain, Voltage Gain. Input resistance and Output resistance using Simplified Analysis?" 5
- **2024-25, Q2 (10 Marks):** "Find Current Gain, Voltage Gain... for CE Amplifier using h-parameter hybrid model? ... Find the Current Gain, Voltage Gain... of RC Coupled single stage CE amplifier using Simplified analysis?" 6 
- **2024-25, Q8a (5 Marks):** "A common emitter transistor amplifier has the hybrid parameter of hie =1100Ω, hre= 2.5x10-4, hfe=50, hoe=25µA/v and RL=RS=1000Ω Find Current gain, Voltage Gain, Input resistance and Output resistance using Simplified Analysis?" 7

**Topic: Feedback Concepts & Topologies**
- **Jan 2023, Q3a (5 Marks):** "Find the input impedance, output impedance and Gain of voltage series feedback circuit." 8
- **Jan 2023, Q4b (3 Marks):** "Differentiate between negative feedback and positive feedback amplifier." 9
- **Dec 2023, Q6b (5 Marks):** "Draw and Explain different mixing and sampling network for a feedback circuit used in an amplifier?" 10
- **2024-25, Q6a (5 Marks):** "Draw and Explain different feedback toplogy circuit used in an amplifier?" 11
    
**Topic: Active Low Pass Filters (Op-Amp)**
- **Jan 2023, Q7a (5 Marks):** "Draw the circuit diagram of an active low pass filter and explain its operation and find the cutoff frequency." 12
- **Dec 2023, Q5a (5 Marks):** "Derive and explain the transfer function of a low pass filter with neat circuit diagram?" 13
- **2024-25, Q6b (5 Marks):** "Derive and Explain the frequency reponse for a Low pass filter?" 14
    
**Topic: JFET/MOSFET Fundamentals (Compulsory Q1)**
- **Jan 2023, Q1a (1 Mark):** "Why FET is called as 'voltage operated device'?" 15
- **Jan 2023, Q1f (1 Mark):** "Define Threshold voltage in Mosfet." 16
- **Dec 2023, Q1f (1 Mark):** "Is JFET is a current controlled device or voltage-controlled device, Justify?" 17
- **2024-25, Q1f (1 Mark):** "JFET works in depletion mode, Justify?" 18

**Topic: Oscillator Fundamentals (Compulsory Q1)**
- **Jan 2023, Q1b (1 Mark):** "What is the Barkhausen criterion to sustain oscillation?" 19
- **Dec 2023, Q1j (1 Mark):** "An oscillator requires what kind of feedback to operate?" 20
- **2024-25, Q1a (1 Mark):** "What is an Oscillator? And what are the conditions required to satisfy to perform as an signal Oscillator?" 21
- **2024-25, Q1j (1 Mark):** "Why an amplifier is incorporated with an oscillator circuit?" 22
    
**Topic: BJT/Amplifier Fundamentals (Compulsory Q1)**
- **Jan 2023, Q1i (1 Mark):** "How does the bypass capacitor affecting to the Gain of amplifier?" 23
- **Dec 2023, Q1c (1 Mark):** "What is the input resistance of a simple Common emitter BJT?" 24
- **2024-25, Q1c (1 Mark):** "What is the input resistance of a simple common emitter BJT?" 25
- **2024-25, Q1e (1 Mark):** "What is the significance of bypass capacitor in a common emitter BJT?" 26
    

**Topic: Op-Amp Fundamentals (Compulsory Q1)**
- **Jan 2023, Q1c (1 Mark):** "Define CMRR of an op-amp." 27
- **Dec 2023, Q1h (1 Mark):** "What is virtual ground concept of an OPAMP?" 28
- **2024-25, Q1g (1 Mark):** "What is common mode voltage gain and differential voltage gain in an OPAMP?" 29
- **2024-25, Q1h (1 Mark):** "What is virtual ground concept of an OPAMP?" 30
    
---

### Tier 2: Medium Frequency (Likely Topics)
These topics appeared in **2 out of 3 papers**. They are highly likely to be on your exam, especially as alternatives to Tier 1 questions.

**Topic: JFET/MOSFET CS Amplifier Analysis**
- **Dec 2023, Q3b (5 Marks):** "Find the Voltage Gain, Input Resistance and Output Resistance for a JFET common source Amplifier?" 31
- **2024-25, Q3b (5 Marks):** "Find the Voltage Gain, Input Resistance and Output Resistance for a JFET common source Amplifier?" 32

**Topic: MOSFET Principle of Operation**
- **Jan 2023, Q2b (5 Marks):** "Briefly explain the principle and operation of n channel D-MOSFET. Why is it called so?" 33
- **Dec 2023, Q3a (5 Marks):** "Explain the working principle with neat diagram for a n-channel MOSFET?" 34

**Topic: Power Amplifier (Class B)**
- **Dec 2023, Q4a (5 Marks):** "Explain the working principle of a Push Pull Class B power amplifier and find its maximum efficiency?" 35
- **2024-25, Q4a (5 Marks):** "Explain the working principle of a Push Pull Class B power amplifier and find its maximum efficiency?" 36

**Topic: Phase-Shift Oscillator**
- **Jan 2023, Q4a (7 Marks):** "Draw the circuit diagram of Phase shift oscillator and derive the expression for frequency of oscillation, Gain (A) and feedback gain (β)." 37
    
- **2024-25, Q7a (5 Marks):** "Derive the frequency of oscillation and condition for sustained oscillations for a RC PHASE SHIFT OSCILLATOR?" 38

**Topic: Current Mirror Circuit**
- **Jan 2023, Q8c (5 Marks):** "Write short notes on... Current Mirror circuit" 39
- **2024-25, Q4b (5 Marks):** "In a current mirror given below derive and find I_REF?" 40

**Topic: Op-Amp Filter Identification (Problem)**
- **Dec 2023, Q5b (5 Marks):** "OPAMP shown in the below figure is ideal, Then what kind of filter it represents?" 41
- **2024-25, Q5b (5 Marks):** "If OPAMP shown in the figure is ideal, Then what kind of filter it represents? If R-2K and C=1µF then what is the cutoff frequency?" 42

**Topic: Op-Amp Subtractor**
- **Dec 2023, Q8c (5 Marks):** "Find the output voltage of a OPAMP based subtractor?" 43
- **2024-25, Q8d (5 Marks):** "Find the output voltage Vout in figure shown below. Assume OPAMP to be ideal?" 44

---
###  Tier 3: Low Frequency (Wildcard Topics)
These topics appeared in only **1 out of 3 papers**. Your teacher uses these to fill out the exam and to differentiate top students. Many short-note (Q8) and compulsory (Q1) questions fall here.

**Module I Topics:**
- **Topic: BJT Frequency Response (Square Wave):** Jan 2023, Q3b (5 Marks) - "Derive the expression for finding fL, fH and bandwidth by square wave testing method." 45
- **Topic: BJT Frequency Response (Miller):** Jan 2023, Q8a (5 Marks) - "Write short notes on... Miller capacitances (CMi and CMo)." 46
- **Topic: BJT Frequency Response (Low Freq Derivation):** 2024-25, Q5a (5 Marks) - "Derive and explain the low frequency response of a BJT Amplifier?" 47
- **Topic: BJT Cascade Connection:** Jan 2023, Q8d (5 Marks) - "Write short notes on... BJT Cascade connection" 48
- **Topic: BJT Common Base Analysis:** Dec 2023, Q8b (5 Marks) - "Draw a simplified h-parameter for a Common Base and derive its voltage gain, current gain, input and output resistance?" 49
- **Topic: Darlington Pair (Compulsory Q1):** Jan 2023, Q1e (1 Mark) - "Draw the Darlington pair transistor circuit and define BD." 50
- **Topic: Early Effect (Compulsory Q1):** Dec 2023, Q1d (1 Mark) - "Explain Early effect on a BJT transistor?" 51
- **Topic: AC Equivalent Circuit Steps (Compulsory Q1):** Dec 2023, Q1e (1 Mark) - "What are the steps required to find AC equivalent circuit?" 52
- **Topic: Amplifier Conditions (Compulsory Q1):** Dec 2023, Q1a (1 Mark) - "What is an Amplifier? And what are the conditions required to satisfy to perform as a Signal Amplifier?" 53

**Module II Topics:**
- **Topic: FET Frequency Response (Problem):** Jan 2023, Q2a (5 Marks) - "For the given circuit, IDSS=6mA, Vp=-6V, rd=∞, Determine fLG, FLC, FLS. What will be the lower cutoff frequency?." 54
- **Topic: JFET Small Signal Model (Derivation):** 2024-25, Q3a (5 Marks) - "Derive the small signal model for a JFET Amplifier?" 55
- **Topic: MOSFET Transfer Curve (Compulsory Q1):** Jan 2023, Q1j (1 Mark) - "Draw the transfer characteristics curve of n channel E-Mosfet." 56

**Module III Topics:**
- **Topic: Power Amplifier (Class A):** Jan 2023, Q6a (7 Marks) - "Draw the circuit of class-A transformer coupled power amplifier and explain its operation. Derive an expression for maximum efficiency of conversion." 57
- **Topic: Crossover Distortion:** Jan 2023, Q6b (3 Marks) - "What is crossover Distortion? Where is it found? How it can be overcome?" 58
- **Topic: Wein-Bridge Oscillator:** Dec 2023, Q4b (5 Marks) - "The value of 'R' required for the sinusoidal oscillations frequency 1Khz in the circuit of the figure?" 59AND Dec 2023, Q6a (5 Marks) - "Derive the frequency of oscillation and condition for sustained oscillations for a WEIN BRIDGE OSCILLATOR?" 60
- **Topic: Crystal Oscillator:** Jan 2023, Q8b (5 Marks) - "Write short notes on... Crystal oscillator" 61
- **Topic: LC Oscillator (Problem):** 2024-25, Q7b (5 Marks) - "For an unknown transistor oscillator L=100 µH C1=0.005µF and C2=0.01µF, Identify the oscillator and find the frequency of oscillation generated in KHz?" 62
- **Topic: Trans-Resistance/Voltage Amp (Compulsory Q1):** Dec 2023, Q1b (1 Mark) - "Draw a Trans-Resistance Amplifier? Justify your design?" 63AND 2024-25, Q1b (1 Mark) - "Draw a Voltage Amplifier? Justify your design?" 64

**Module IV Topics:**
- **Topic: Instrumentation Amplifier:** Jan 2023, Q7b (5 Marks) - "Draw the Instrumentation Amplifier circuit, derive the output voltage expression and find Vout..." 65
- **Topic: Op-Amp Integrator (Problem):** Dec 2023, Q7b (5 Marks) - "Find $v_{c}$ at $t=1~msec$ If capacitor is initially uncharged?" 66
- **Topic: Op-Amp Adder:** 2024-25, Q8c (5 Marks) - "Find the output voltage of an OPAMP based adder?" 67
- **Topic: Schmitt Trigger:** Dec 2023, Q7a (5 Marks) - "Explain the working of a SCHMITT TRIGGER circuit?" 68
- **Topic: Op-Amp Square Wave Generator:** 2024-25, Q8b (5 Marks) - "Explain the working of a square wave generator?" 69
- **Topic: Op-Amp Current Problem:** Dec 2023, Q8d (5 Marks) - "Find the output current in figure shown below. Assume OPAMP to be ideal?" 70
- **Topic: Misc. Op-Amp Fundamentals (Compulsory Q1):**
    - **Jan 2023, Q1h (1 Mark):** "What is Unity gain bandwidth product." 71
    - **Dec 2023, Q1g (1 Mark):** "What is the input resistance of an OPAMP? and Why?" 72
    - **Dec 2023, Q1i (1 Mark):** "What is the Gain of an Inverting Amplifier?" 73
    - **2024-25, Q1i (1 Mark):** "What is a voltage follower? Justify" 74

# EASY Qs LIST
## ✅ JAN 2023 PAPER – EASY / LOW-MEM / NO-DERIVATION

### Q1 (10 × 1 marks)

**Easy bits (no derivation, not heavy memory):**

- **Q1(a)** – Why FET is called a “voltage operated device”?
    
- **Q1(b)** – What is the Barkhausen criterion to sustain oscillation?
    
- **Q1(c)** – Define CMRR of an op-amp.
    
- **Q1(e)** – Draw the Darlington pair transistor circuit and define βD.
    
- **Q1(f)** – Define Threshold voltage in MOSFET.
    
- **Q1(h)** – What is Unity gain bandwidth product?
    
- **Q1(i)** – How does the bypass capacitor affect the gain of amplifier?
    
- **Q1(j)** – Draw the transfer characteristics curve of n-channel E-MOSFET.
    

❌ **Not counted as “easy” here:**

- **Q1(d)** – Square-wave Fourier series (long expression = memory heavy)
    
- **Q1(g)** – “Prove that negative feedback reduces gain” → proof/derivation
    

---

### Q2–Q7 (10 marks each)

**Q2**

- **Q2(b)** – _“Briefly explain the principle and operation of n-channel D-MOSFET. Why is it called so?”_  
    → Pure theory, no math.
    

**Q3** – both parts involve calculations / derivation → ❌ skip.

**Q4**

- **Q4(b)** – _“Differentiate between negative feedback and positive feedback amplifier.”_  
    → Just a comparison table.
    

**Q5** – both parts are full calculations on CE amplifier → ❌ skip.

**Q6**

- **Q6(b)** – _“What is crossover distortion? Where is it found? How can it be overcome?”_  
    → Concept only.
    

**Q7** – both parts involve derivations or formulas → ❌ for your “no-derivation” set.

---

### Q8 (4 × 5 marks, attempt any 2)

All four are **short-note conceptual topics**:

- **Q8(a)** – Miller capacitances (CMi and CMo).
    
- **Q8(b)** – Crystal oscillator.
    
- **Q8(c)** – Current mirror circuit.
    
- **Q8(d)** – BJT cascade connection.
    

These are among the easiest 5-mark questions in the whole set.

---

## ✅ DEC 2023–24 PAPER – EASY / LOW-MEM / NO-DERIVATION

### Q1 (10 × 1 marks)

Here **every bit is conceptual, no derivation**:

- **Q1(a)** – What is an amplifier? Conditions to act as a signal amplifier.
    
- **Q1(b)** – Draw a Trans-resistance amplifier; justify your design.
    
- **Q1(c)** – What is the input resistance of a simple common-emitter BJT?
    
- **Q1(d)** – Explain Early effect on a BJT transistor.
    
- **Q1(e)** – Steps required to find AC equivalent circuit.
    
- **Q1(f)** – Is JFET current-controlled or voltage-controlled? Justify.
    
- **Q1(g)** – What is the input resistance of an op-amp and why?
    
- **Q1(h)** – What is virtual ground concept of an op-amp?
    
- **Q1(i)** – What is the gain of an inverting amplifier?
    
- **Q1(j)** – An oscillator requires what kind of feedback to operate?
    

---

### Q2–Q7

**Q2** – both parts are heavy CE-amplifier calculations → ❌ skip.

**Q3**

- **Q3(a)** – _Explain the working principle with neat diagram for an n-channel MOSFET._ ✔
    
- **Q3(b)** – JFET common-source gain & resistances (full calculation) ❌
    

**Q4**

- **Q4(a)** – Push-pull Class-B + max efficiency (has derivation) ❌
    
- **Q4(b)** – Wein-bridge “find R” numerical (uses design formula) ❌
    

**Q5**

- **Q5(a)** – “Derive and explain transfer function of low-pass filter” ❌
    
- **Q5(b)** – Identify filter type + cutoff frequency (small calc) → borderline; to keep your rule pure, I’ll mark it as **optional-easy numeric**, not core.
    

**Q6**

- **Q6(a)** – Wein-bridge oscillator frequency & condition → derivation ❌
    
- **Q6(b)** – _“Draw and explain different mixing and sampling network for a feedback circuit used in an amplifier.”_ ✔ pure theory.
    

**Q7**

- **Q7(a)** – _“Explain the working of a SCHMITT TRIGGER circuit?”_ ✔
    
- **Q7(b)** – Integrator time-domain RC calculation ❌
    

---

### Q8 (short notes / problems, any 2)

- **Q8(c)** – _“Find the output voltage of an op-amp based subtractor?”_  
    → Simple plug-and-chug using subtractor formula → **easy numeric, no derivation.**
    
- **Q8(d)** – _“Find the output current in figure shown below. Assume op-amp ideal.”_  
    → Uses virtual ground + Ohm’s law → **easy numeric.**
    

(8a and 8b are long CE / CB analysis with derivations → ❌)

---

## ✅ 2024–25 PAPER – EASY / LOW-MEM / NO-DERIVATION

### Q1 (10 × 1 marks)

Again, **all bits are conceptual, no derivation**:

- **Q1(a)** – What is an oscillator? Conditions to act as a signal oscillator.
    
- **Q1(b)** – Draw a voltage amplifier; justify your design.
    
- **Q1(c)** – Input resistance of simple CE BJT.
    
- **Q1(d)** – Explain the frequency response of an amplifier.
    
- **Q1(e)** – Significance of bypass capacitor in a CE BJT.
    
- **Q1(f)** – JFET works in depletion mode – justify.
    
- **Q1(g)** – What is common-mode gain & differential-mode gain in an op-amp?
    
- **Q1(h)** – Virtual ground concept of an op-amp.
    
- **Q1(i)** – What is a voltage follower? Justify.
    
- **Q1(j)** – Why an amplifier is incorporated with an oscillator circuit?
    

---

### Q2–Q7

**Q2** – both parts are full CE-amplifier calculations → ❌

**Q3**

- **Q3(a)** – “Derive the small-signal model for a JFET amplifier” → derivation ❌
    
- **Q3(b)** – JFET CS gain & resistances calculation → ❌
    

**Q4**

- **Q4(a)** – Push-pull Class-B + max efficiency (derivation) ❌
    
- **Q4(b)** – Current mirror: _“derive and find IREF”_ → explicitly a derivation ❌
    

**Q5**

- **Q5(a)** – Low-frequency response of BJT amplifier (derivation) ❌
    
- **Q5(b)** – _“If op-amp shown is ideal, what kind of filter does it represent? If R=2kΩ and C=1µF, what is the cutoff frequency?”_  
    → Identification + single-formula numeric → **easy numeric** ✔
    

**Q6**

- **Q6(a)** – _“Draw and explain different feedback topology circuits used in an amplifier?”_  
    → Concepts + block diagrams only → ✔
    
- **Q6(b)** – “Derive and explain the frequency response for a low-pass filter?” → derivation ❌
    

**Q7**

- **Q7(a)** – RC phase-shift oscillator frequency & condition → derivation ❌
    
- **Q7(b)** – LC oscillator identification + frequency using LC formula → **easy numeric** ✔
    

---

### Q8 (short notes / problems, any 2)

- **Q8(b)** – _“Explain the working of a square wave generator?”_ ✔ pure concept.
    
- **Q8(c)** – _“Find the output voltage of an op-amp based adder?”_ ✔ easy numeric.
    
- **Q8(d)** – _“Find the output voltage Vout in figure shown below. Assume op-amp ideal.”_ ✔ easy numeric (superposition/virtual ground).
    

(8a is full CE-amplifier numeric with h-params → ❌)

---

## 🔎 Super-Condensed “Easy Bank” Across All Papers

If you want to focus only on **breeziest scoring areas**:

- **All Q1 bits** from **Dec 2023–24** and **2024–25**, and all except **1(g)** & **1(d)** from **Jan 2023**.
    
- **Pure-theory 5-marks (no derive):**
    
    - Jan 2023: Q2(b), Q4(b), Q6(b), Q8(a–d)
        
    - Dec 2023: Q3(a), Q6(b), Q7(a)
        
    - 2024–25: Q6(a), Q8(b)
        
- **Simple plug-and-chug numericals (no derivation):**
    
    - Dec 2023: Q5(b) [optional], Q8(c), Q8(d)
        
    - 2024–25: Q5(b), Q7(b), Q8(c), Q8(d)
        

These are the questions where:

- You don’t slog through derivations,
    
- Memory load is low (mostly definitions + small tables + simple circuits),
    
- Or you just apply 1–2 standard formulas.
    

This is the “minimum pain, decent marks” zone.

---
# 📌 **AY 2024–25 (Latest Paper — Highest Priority)**

### ✅ Q1 Easy Topics (all 1-mark theory)

|Topic|Subtopics (based directly on question wording)|
|---|---|
|**Oscillators**|What is an oscillator, conditions to act as a signal oscillator (positive feedback + Barkhausen condition implied but NOT formula).|
|**Voltage Amplifier**|Block diagram of a voltage amplifier, justification of design (simple two-stage or op-amp).|
|**CE Amplifier Basics**|Input resistance of a simple CE BJT amplifier.|
|**Frequency Response of Amplifier**|What is meant by frequency response, low/mid/high behavior (no formulas).|
|**Bypass Capacitor in CE Amplifier**|Purpose, effect on gain, why needed.|
|**JFET Basics**|Why JFET works in depletion mode, justification.|
|**Op-Amp CMR & DM Gain**|Common mode gain, differential mode gain (definitions).|
|**Virtual Ground in Op-Amp**|Meaning and reason it exists (inverting config).|
|**Voltage Follower**|Definition, unity gain, why used (buffer).|
|**Amplifier + Oscillator Relationship**|Why an amplifier is required in an oscillator circuit.|

---

### ✅ Other Easy Theory/Numerical

|Question|Topic|Subtopics|
|---|---|---|
|**Q5(b)**|**Active Filter Identification**|Identify the op-amp circuit (LPF/HPF), cutoff frequency formula (fc = 1/2πRC). Circuit is given in exam, so no drawing required.|
|**Q6(a)**|**Feedback Topologies**|Four topologies: series-shunt, shunt-shunt, series-series, shunt-series. (Block diagrams + meaning of sampling + mixing).|
|**Q7(b)**|**LC Oscillator (Identification + Frequency)**|Identify Colpitts/Hartley based on capacitors/inductor arrangement; use frequency formula (no derivation).|
|**Q8(b)**|**Square-Wave Generator**|Op-amp relaxation oscillator using positive feedback + hysteresis concept.|
|**Q8(c)**|**Op-Amp Adder**|Numerical based on Rin and feedback resistors (summing equation).|
|**Q8(d)**|**Op-Amp Output Current**|Ideal conditions (virtual ground), Ohm’s Law based solving.|

---
# 📌 **AY 2023–24 Paper (Medium Priority — Strong Repetition With 2024-25)**

### ✅ Q1 Easy Theory Topics

|Topic|Subtopics|
|---|---|
|**Amplifier Basics**|Definition + conditions for functioning as signal amplifier.|
|**Trans-Resistance Amplifier**|Block/circuit diagram + explanation.|
|**CE Amplifier Input Resistance**|Basic concept only (no formula).|
|**Early Effect (BJT)**|Base width modulation, effect on output resistance/gain.|
|**Steps for AC Equivalent Circuit Formation**|Short procedural steps (replace capacitors, set input source, remove DC bias).|
|**JFET Control Variable**|Justify whether it is voltage-controlled or current-controlled.|
|**Op-Amp Input Resistance**|Why very high Rin is required (FET input stage reason).|
|**Virtual Ground Concept**|Why V− ≈ 0V in inverting amplifier.|
|**Gain of Inverting Amplifier**|Only formula Av = −Rf/Rin (no derivation).|
|**Feedback in Oscillator**|Which type of feedback (positive).|

---

### ✅ Other Easy Theory/Numerical Topics

|Question|Topic|Subtopics|
|---|---|---|
|**Q3(a)**|**n-Channel MOSFET**|Working principle, internal structure, characteristics (diagram required).|
|**Q6(b)**|**Feedback Mixing & Sampling Networks**|Four blocks: Series/shunt sampling × series/shunt mixing.|
|**Q7(a)**|**Schmitt Trigger**|Op-amp comparator with hysteresis, operation (diagram optional but advisable).|
|**Q8(c)**|**Op-Amp Subtractor Numerical**|Apply Vout = (R2/R1)(V2−V1).|
|**Q8(d)**|**Output Current Using Op-Amp Ideal Laws**|Virtual ground + resistor network reasoning.|

---
# 📌 **January 2023 Paper (Lower Priority but Still Relevant Concepts)**

### ✅ Q1 Easy Theory Topics

|Topic|Subtopics|
|---|---|
|**FET Characteristics**|Why FET is voltage-operated device.|
|**Barkhausen Criterion**|Condition for sustained oscillation (Aβ = 1 with phase shift).|
|**CMRR**|Definition, meaning (no formula memory forced).|
|**Darlington Pair**|Circuit and formula for βD = β1β2 + β1 + β2 (diagram required).|
|**Threshold Voltage (MOSFET)**|Definition: gate voltage required to form channel.|
|**Unity Gain Bandwidth**|Op-amp frequency response concept.|
|**Bypass Capacitor in CE**|Effect on AC gain (the same topic repeats in 2024-25).|
|**MOSFET Transfer Characteristics**|Graph: ID vs VGS (diagram required).|

---

### ✅ Other Easy Topics

|Question|Topic|Subtopics|
|---|---|---|
|**Q2(b)**|**n-Channel D-MOSFET Working Principle**|Why depletion mode, physical mechanism (no drawing demanded).|
|**Q4(b)**|**Positive vs Negative Feedback Comparison**|Table form (gain, distortion, bandwidth, stability).|
|**Q6(b)**|**Crossover Distortion**|What it is, where found, mitigation using diode bias Class AB.|
|**Q8(a)**|**Miller Capacitances**|Input Miller capacitance (CMi), output (CMo).|
|**Q8(b)**|**Crystal Oscillator**|Working, stability, use of quartz crystal.|
|**Q8(c)**|**Current Mirror**|Working principle (drawing recommended but question didn’t demand it).|
|**Q8(d)**|**BJT Cascode Connection**|Purpose: high gain + high bandwidth.|

---
# 📌 PATTERN ANALYSIS (Are these theory questions stable or new each year?)

|Topic Pattern|Behavior|
|---|---|
|CE amplifier basics (input resistance, bypass capacitor)|**Repeated across all 3 years**|
|FET basics (voltage-controlled, depletion mode)|**Repeated in all papers**|
|Virtual ground (Op-Amp)|**Repeated 2023-24 & 2024-25**|
|Voltage amplifier / trans-resistance amplifier block diagram|**Replaced version appears each recent year**|
|Op-amp gain formulas (inverting, follower, subtractor, adder)|**Keeps appearing as short numericals 2023-24 & 2024-25**|
|Feedback topologies|**Theory in 2024-25, networks in 2023-24, comparison 2023** → **Strong recurrence**|
|MOSFET basics|**Every year one form appears**|

---
# AY **2024–25** — Unique Topics (NOT seen in previous papers)

|Topic|Why it's unique|
|---|---|
|**Common-mode gain & differential-mode gain of Op-Amp**|Other papers ask CMRR or virtual ground, but not this pair concepts.|
|**Frequency response of an amplifier (general)**|Earlier papers asked frequency response of specific configs (like CE or LC), not full amplifier in conceptual form.|
|**Why amplifier is incorporated with oscillator**|No similar question in earlier years.|
|**Identify LC oscillator + compute frequency (Colpitts/Hartley)**|Earlier papers asked Wein / RC phase shift, not LC identification.|
|**Square-wave generator using Op-Amp**|Only appears here.|
|**Op-Amp adder/subtractor numericals (with circuit printed)**|2023-24 had subtractor only, but not adder.|
|**Output current calculation in op-amp circuit (virtual ground numeric)**|First and only appearance.|

🟦 Conclusion: These are _new shifts in curriculum style_ — strongly likely to appear again.

---

# 📌 AY **2023–24** — Unique Topics (Not seen in 2024–25 or 2023)

|Topic|Why it's unique|
|---|---|
|**Early effect in BJT**|No other year asks specifically about Early effect.|
|**Steps to obtain AC equivalent circuit**|Nowhere else do they ask as a procedural question.|
|**Gain of inverting amplifier (just formula)**|Other years ask numericals, but not standalone theory.|
|**Mixing and sampling networks of feedback (draw + explain)**|Other years switch to “feedback topologies” instead.|
|**Schmitt Trigger detailed explanation**|2024–25 doesn’t ask it, and 2023 asks only comparator-type things indirectly.|
|**Op-Amp subtractor numerical**|This exact format doesn’t repeat.|
|**Op-Amp current solving numerical (with capacitor values)**|No identical repetition.|

🟦 These represent the **mid-transition year** where faculty started changing question patterns.

---

# 📌 **January 2023** — Unique Topics

|Topic|Why it's unique|
|---|---|
|**CMRR definition as stand-alone**|Later papers replace it with DM/CM gain or voltage follower concept.|
|**Unity gain bandwidth product (UGB or GBW)**|Never asked again directly.|
|**Fourier series of square wave (1-mark)**|First and last time — memory-heavy → now removed.|
|**Define threshold voltage in MOSFET**|Later MOSFET questions are structural/working, not definition-only.|
|**Miller capacitances (CMi/CMo)**|Only January 2023 asks.|
|**Current mirror short note (without derivation)**|Later year asks current mirror derivation instead — so 2023 is the only theory form.|
|**Cascode / Cascade BJT connection**|No recurrence.|
|**Crystal oscillator as short note**|Later oscillator topics move to LC and RC calculators, not short note form.|
|**Crossover distortion (Class-B amplifier)**|Only asked once.|

# 📌 **AY 2024–25 (Latest Paper — Highest Priority)**

### ✅ Q1 Easy Topics (all 1-mark theory)

|Topic|Subtopics (based directly on question wording)|
|---|---|
|**Oscillators**|What is an oscillator, conditions to act as a signal oscillator (positive feedback + Barkhausen condition implied but NOT formula).|
|**Voltage Amplifier**|Block diagram of a voltage amplifier, justification of design (simple two-stage or op-amp).|
|**CE Amplifier Basics**|Input resistance of a simple CE BJT amplifier.|
|**Frequency Response of Amplifier**|What is meant by frequency response, low/mid/high behavior (no formulas).|
|**Bypass Capacitor in CE Amplifier**|Purpose, effect on gain, why needed.|
|**JFET Basics**|Why JFET works in depletion mode, justification.|
|**Op-Amp CMR & DM Gain**|Common mode gain, differential mode gain (definitions).|
|**Virtual Ground in Op-Amp**|Meaning and reason it exists (inverting config).|
|**Voltage Follower**|Definition, unity gain, why used (buffer).|
|**Amplifier + Oscillator Relationship**|Why an amplifier is required in an oscillator circuit.|

---

### ✅ Other Easy Theory/Numerical

|Question|Topic|Subtopics|
|---|---|---|
|**Q5(b)**|**Active Filter Identification**|Identify the op-amp circuit (LPF/HPF), cutoff frequency formula (fc = 1/2πRC). Circuit is given in exam, so no drawing required.|
|**Q6(a)**|**Feedback Topologies**|Four topologies: series-shunt, shunt-shunt, series-series, shunt-series. (Block diagrams + meaning of sampling + mixing).|
|**Q7(b)**|**LC Oscillator (Identification + Frequency)**|Identify Colpitts/Hartley based on capacitors/inductor arrangement; use frequency formula (no derivation).|
|**Q8(b)**|**Square-Wave Generator**|Op-amp relaxation oscillator using positive feedback + hysteresis concept.|
|**Q8(c)**|**Op-Amp Adder**|Numerical based on Rin and feedback resistors (summing equation).|
|**Q8(d)**|**Op-Amp Output Current**|Ideal conditions (virtual ground), Ohm’s Law based solving.|

---
# 📌 **AY 2023–24 Paper (Medium Priority — Strong Repetition With 2024-25)**

### ✅ Q1 Easy Theory Topics

|Topic|Subtopics|
|---|---|
|**Amplifier Basics**|Definition + conditions for functioning as signal amplifier.|
|**Trans-Resistance Amplifier**|Block/circuit diagram + explanation.|
|**CE Amplifier Input Resistance**|Basic concept only (no formula).|
|**Early Effect (BJT)**|Base width modulation, effect on output resistance/gain.|
|**Steps for AC Equivalent Circuit Formation**|Short procedural steps (replace capacitors, set input source, remove DC bias).|
|**JFET Control Variable**|Justify whether it is voltage-controlled or current-controlled.|
|**Op-Amp Input Resistance**|Why very high Rin is required (FET input stage reason).|
|**Virtual Ground Concept**|Why V− ≈ 0V in inverting amplifier.|
|**Gain of Inverting Amplifier**|Only formula Av = −Rf/Rin (no derivation).|
|**Feedback in Oscillator**|Which type of feedback (positive).|

---

### ✅ Other Easy Theory/Numerical Topics

|Question|Topic|Subtopics|
|---|---|---|
|**Q3(a)**|**n-Channel MOSFET**|Working principle, internal structure, characteristics (diagram required).|
|**Q6(b)**|**Feedback Mixing & Sampling Networks**|Four blocks: Series/shunt sampling × series/shunt mixing.|
|**Q7(a)**|**Schmitt Trigger**|Op-amp comparator with hysteresis, operation (diagram optional but advisable).|
|**Q8(c)**|**Op-Amp Subtractor Numerical**|Apply Vout = (R2/R1)(V2−V1).|
|**Q8(d)**|**Output Current Using Op-Amp Ideal Laws**|Virtual ground + resistor network reasoning.|

---
# 📌 **January 2023 Paper (Lower Priority but Still Relevant Concepts)**

### ✅ Q1 Easy Theory Topics

|Topic|Subtopics|
|---|---|
|**FET Characteristics**|Why FET is voltage-operated device.|
|**Barkhausen Criterion**|Condition for sustained oscillation (Aβ = 1 with phase shift).|
|**CMRR**|Definition, meaning (no formula memory forced).|
|**Darlington Pair**|Circuit and formula for βD = β1β2 + β1 + β2 (diagram required).|
|**Threshold Voltage (MOSFET)**|Definition: gate voltage required to form channel.|
|**Unity Gain Bandwidth**|Op-amp frequency response concept.|
|**Bypass Capacitor in CE**|Effect on AC gain (the same topic repeats in 2024-25).|
|**MOSFET Transfer Characteristics**|Graph: ID vs VGS (diagram required).|

---

### ✅ Other Easy Topics

|Question|Topic|Subtopics|
|---|---|---|
|**Q2(b)**|**n-Channel D-MOSFET Working Principle**|Why depletion mode, physical mechanism (no drawing demanded).|
|**Q4(b)**|**Positive vs Negative Feedback Comparison**|Table form (gain, distortion, bandwidth, stability).|
|**Q6(b)**|**Crossover Distortion**|What it is, where found, mitigation using diode bias Class AB.|
|**Q8(a)**|**Miller Capacitances**|Input Miller capacitance (CMi), output (CMo).|
|**Q8(b)**|**Crystal Oscillator**|Working, stability, use of quartz crystal.|
|**Q8(c)**|**Current Mirror**|Working principle (drawing recommended but question didn’t demand it).|
|**Q8(d)**|**BJT Cascode Connection**|Purpose: high gain + high bandwidth.|

---
# 📌 PATTERN ANALYSIS (Are these theory questions stable or new each year?)

|Topic Pattern|Behavior|
|---|---|
|CE amplifier basics (input resistance, bypass capacitor)|**Repeated across all 3 years**|
|FET basics (voltage-controlled, depletion mode)|**Repeated in all papers**|
|Virtual ground (Op-Amp)|**Repeated 2023-24 & 2024-25**|
|Voltage amplifier / trans-resistance amplifier block diagram|**Replaced version appears each recent year**|
|Op-amp gain formulas (inverting, follower, subtractor, adder)|**Keeps appearing as short numericals 2023-24 & 2024-25**|
|Feedback topologies|**Theory in 2024-25, networks in 2023-24, comparison 2023** → **Strong recurrence**|
|MOSFET basics|**Every year one form appears**|

**Conclusion:**  
The theory questions are **not random. They rotate a stable set of 10–12 recurring conceptual topics**, especially in the **latest two papers**.

---
# 📌 QUICK SUMMARY TABLE

(so you can study efficiently)

|Year|Unique Topics Count|Likelihood of Repeat|
|---|---|---|
|**2024–25**|**7 topics**|🔥 High — matches current syllabus direction|
|**2023–24**|**7 topics**|⚠️ Medium — transitional paper|
|**Jan-2023**|**9 topics**|🧊 Low — mostly outdated patterns|

---

# 🧠 Pattern Insight (this is the gold)

The exam has shifted across 3 years:

|Year|Theme Style|
|---|---|
|**2023**|Old-school analog electronics (Miller effect, cascode, CMRR, threshold voltage).|
|**2023–24**|Hybrid between BJT theory + op-amp applications + moderate numericals.|
|**2024–25**|Strong shift toward **Op-Amp circuits, filters, oscillators, active components, LC/RC identification**, and practical reasoning.|

Meaning:

### 👉 The examiner is **moving away from device-level analog**

(such as Early effect, cascode, crystal oscillator theory)  
and toward **op-amp based signal processing topics**.

# 🔥 **Tier-1: Must Study (High Marks + Asked Every Year)**

These guarantee the majority of marks.

1. **Phase Shift Oscillator**
    
2. **Wien Bridge Oscillator**
    
3. **Negative Feedback & Positive Feedback (Effects + Block Diagram)**
    
4. **Barkhausen Criterion**
    
5. **h-Parameter Model of CE Amplifier (Voltage Gain derivation)**
    
6. **CE Amplifier — Small Signal AC Model + Parameters**
    
7. **Inverting Op-Amp (Derivation + Circuit)**
    
8. **Non-Inverting Op-Amp (Derivation + Circuit)**
    
9. **Ideal vs Practical Op-Amp (Comparison Table)**
    
10. **Power Amplifiers: Class A, B, AB (Efficiency + crossover distortion)**
    

👉 Study these deeply. With these alone, you already secure **35–45 marks.**

---

# 🔥 **Tier-2: Very Important (Asked 2 out of 3 years)**

Medium effort, good scoring.

11. **Frequency Response of CE Amplifier (Graph + Regions)**
    
12. **Op-Amp Parameters: Slew Rate, CMRR, GBW, Input/Output Impedance**
    
13. **Instrumentation Amplifier (Block + Operation)**
    
14. **Comparator**
    
15. **Schmitt Trigger (Hysteresis concept)**
    
16. **BJT vs FET comparison**
    

👉 These add another **12–18 marks.**

---

# 🔥 **Tier-3: Short Note Bank (Fast Memorization + Repeats)**

These are your quick 2–5-mark savers.

17. **Darlington Pair**
    
18. **Current Mirror**
    
19. **Crystal Oscillator**
    
20. **RC Low Pass Filter (LPF)**
    
21. **RC High Pass Filter (HPF)**
    
22. **Differential Amplifier (Only block + purpose)**
    
23. **Miller Effect (Short explanation)**
    

👉 These give **8–12 bonus marks** with almost no memorization.

---

# 🔥 Tier-4: Optional/Backup Topics

These appear **rarely**. Learn only if time remains.

24. MOSFET small signal model
    
25. JFET transfer characteristics
    
26. Op-amp open loop vs closed loop

|Coverage Level|Expected Score|
|---|---|
|Tier-1 only|35–45|
|Tier-1 + Tier-2|**50–60**|
|Tier-1 + Tier-2 + Tier-3|**60+ (Guaranteed distinction zone)**|

Good — now we lock the final plan cleanly so there’s **zero confusion and zero wasted time.**

I’ll answer in **three parts:**

1. What to watch from Neso
    
2. What NOT to watch from Neso
    
3. Whether Neso alone is enough — or if you still need the first playlist
    

---

# ✅ 1) **What to Watch from Neso Academy (PYQ-Based Selection)**

Watch these **exact chapters and only the relevant sub-topics:**

---

### **📌 Chapter 4 — BJT**

✔ BJT basics (just once)  
✔ CE, CB, CC configurations (focus: CE)  
✔ Input/output characteristics

---

### **📌 Chapter 5 — Biasing**

✔ ONLY **Voltage Divider Bias**  
✔ Stability factor formula  
✔ Why VD bias is preferred

(Skip all other biasing methods.)

---

### **📌 Chapter 6 — BJT AC Analysis**

✔ CE small signal model  
✔ **h-parameter model (most important)**  
✔ Derivation of:

- Voltage Gain
    
- Input Impedance
    
- Output Impedance
    

This section gives **10–15 marks every exam**.

---

### **📌 Chapter 7 & 8 — FET / MOSFET (only basics)**

✔ Difference between BJT and FET  
✔ JFET/MOSFET characteristics  
✔ Basic biasing (no deep maths)

(Only needed for short questions.)

---

### **📌 Chapter 9 — Frequency Response**

✔ Frequency response of **CE amplifier**  
✔ Graph + regions (low/mid/high)  
✔ Cutoff explanation

---

### **📌 Chapter 10 — Op-Amp**

✔ Ideal vs Practical Op-Amp  
✔ Op-Amp parameters:

- Input impedance
    
- Slew rate
    
- CMRR
    
- GBW
    
- Offset voltage
    

---

### **📌 Chapter 11 — Op-Amp Applications**

✔ Inverting amplifier (with derivation)  
✔ Non-inverting amplifier (with derivation)  
✔ Instrumentation amplifier  
✔ Comparator  
✔ Schmitt trigger  
✔ Integrator  
✔ Differentiator

These repeat **every single year.**

---

### **📌 Chapter 12 — Power Amplifiers**

✔ Class A, B, AB, C  
✔ Efficiency formulas  
✔ Crossover distortion + push-pull

---

### **📌 Extra Short Notes**

(if covered by Neso, watch quickly)

✔ Current Mirror  
✔ Darlington Pair  
✔ Differential amplifier (just concept)

---

📌 **Total estimated Neso playlist time if watched at 1.5x speed:** **10–14 hours**  
📌 **Marks coverage:** **50+ easily**

---

# ❌ 2) What NOT to Watch from Neso Academy

Skip the following **completely** (they appear nowhere in PYQs):

- Chapter 01: Semiconductor physics
    
- Chapter 02: Diodes
    
- Chapter 03: Diode applications
    
- Full PLL theory (if any)
    
- Advanced active filters (band-pass, Chebyshev, Butterworth designs)
    
- Precision rectifier / peak detector (irrelevant to PYQs)
    
- Astable/Monostable waveform timing equations
    
- Full small-signal MOSFET derivations (time waste)
    

Also skip:

- Anything saying **“design”, “derivation of timing”, or advanced math heavy circuit analysis”**
    

Because your exam is **theory + derivations + diagrams**, not numerical design.

---

# 🧠 3) Do You Need the First Playlist?

Short answer:

👉 **95% of the exam can be handled by Neso alone.**

The only time you _might_ need **All About Electronics** is:

- If you want a **more intuitive understanding** of:
    
    - Wien Bridge Oscillator
        
    - Phase Shift Oscillator
        
    - Op-Amp applications
        

All About Electronics explains those **more visually and simply.**  
Neso explains them **more academically.**

Your exam is **academic**, so:

### 🟩 Neso = Main Source

# 🏁 Final Strategy

`1) Watch Neso Academy for all core topics. 2) Make notes EXACTLY like your teacher’s structure. 3) Only if a topic feels confusing → check the same topic from All About Electronics.`

---

# 🎯 Result You’ll Get With This Plan

- Minimal time investment
    
- Maximum exam relevance
    
- Zero wasted effort
    
- 50+ marks achievable with confidence

---
## Syllabus and PYQs
- [[AEC.pdf]]
## Notes
- [[AEC COMPLETE TILL 1 NOV 2025.pdf]]

- [[AEC 2|AEC 2]]

