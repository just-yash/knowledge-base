
Type : #Note    
Date :  2026-04-16  
Tags :  [[Maths]]     
Status : #complete     
~ ***Yash Agrawall*** ~  

---
# LIMITS (BASICS)

- $$\lim_{x \to 0} \frac{\sin x}{x} = 1$$
- $$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$$
- $$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$
- $$\lim_{x \to 0} \frac{\tan x}{x} = 1$$

---

# STANDARD LIMITS

- $$\lim_{x \to 0} \frac{e^x - 1}{x} = 1$$
- $$\lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1$$
- $$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$$
- $$\lim_{x \to 0} \frac{a^x - 1}{x} = \ln a$$

---

# DERIVATIVES (CORE)

## Basic derivatives

- $$\frac{d}{dx}(x^n) = nx^{n-1}$$
- $$\frac{d}{dx}(e^x) = e^x$$
- $$\frac{d}{dx}(\ln x) = \frac{1}{x}$$

- $\frac{d}{dx}(\sin x) = \cos x$
- $\frac{d}{dx}(\cos x) = -\sin x$
- $\frac{d}{dx}(\tan x) = \sec^2 x$

---
# INVERSE TRIG DERIVATIVES

- $\frac{d}{dx}(\sin^{-1}x) = \frac{1}{\sqrt{1 - x^2}}$
- $\frac{d}{dx}(\tan^{-1}x) = \frac{1}{1 + x^2}$

---

# RULES OF DIFFERENTIATION

## Product rule
- $$\frac{d}{dx}(uv) = u'v + uv'$$

## Quotient rule
- $$\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{u'v - uv'}{v^2}$$

## Chain rule
- $$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

---

# IMPORTANT DERIVATIVES

- $\frac{d}{dx}(a^x) = a^x \ln a$
- $\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a}$

---

# LOG DIFFERENTIATION (TRICK)

- If $y = f(x)^{g(x)}$
  - Take $\ln$ both sides  
  - Differentiate  

---

# MAXIMA AND MINIMA

- $$\frac{dy}{dx} = 0$$

- If $\frac{d^2y}{dx^2} > 0$ → minimum  
- If $\frac{d^2y}{dx^2} < 0$ → maximum  

---

# MONOTONIC FUNCTIONS

- $\frac{dy}{dx} > 0$ → increasing  
- $\frac{dy}{dx} < 0$ → decreasing  

---

# TANGENT & NORMAL

- Slope: $$\frac{dy}{dx}$$  
- Tangent: $y - y_1 = m(x - x_1)$  

---

# INTEGRATION (BASICS)

- $$\int x^n dx = \frac{x^{n+1}}{n+1} + C$$
- $$\int e^x dx = e^x + C$$
- $$\int \frac{1}{x} dx = \ln|x| + C$$

- $\int \sin x dx = -\cos x + C$
- $\int \cos x dx = \sin x + C$

---

# INTEGRATION BY PARTS

- $$\int u \, dv = uv - \int v \, du$$

---

# ILATE RULE (CHOOSING u)

Order of priority:

1. Inverse trig  
2. Logarithmic  
3. Algebraic  
4. Trigonometric  
5. Exponential  

👉 Choose $u$ from highest priority

---

# SUBSTITUTION INSIGHT

- If integrand looks like:
  - $\frac{f'(x)}{f(x)}$

- Then:
  - $\int \frac{f'(x)}{f(x)} dx = \ln|f(x)| + C$

---

# DEFINITE INTEGRALS

- $$\int_a^b f(x)\,dx = -\int_b^a f(x)\,dx$$

- If $f(x)$ even:
  - $$\int_{-a}^a f(x)\,dx = 2\int_0^a f(x)\,dx$$

- If $f(x)$ odd:
  - $$\int_{-a}^a f(x)\,dx = 0$$

---

# AREA UNDER CURVE

- $$\text{Area} = \int_a^b f(x)\,dx$$

---

# APPROXIMATIONS

- $$e^x \approx 1 + x$$
- $$\ln(1+x) \approx x$$
- $\sin x \approx x$
- $\cos x \approx 1 - \frac{x^2}{2}$

---

# L’HÔPITAL’S RULE

- $$\frac{0}{0} \text{ or } \frac{\infty}{\infty} \Rightarrow \frac{f'(x)}{g'(x)}$$

---

# CORE FORMULAS SUMMARY

- $$\lim_{x \to 0} \frac{\sin x}{x} = 1$$
- $$\frac{d}{dx}(x^n) = nx^{n-1}$$
- $$\frac{d}{dx}(e^x) = e^x$$
- $$\int x^n dx = \frac{x^{n+1}}{n+1}$$
- $$\int u\,dv = uv - \int v\,du$$
---