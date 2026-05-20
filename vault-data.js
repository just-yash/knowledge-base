// vault-data.js — All sample vault data

const VAULT_NOTES = {
  'vault-index': {
    id: 'vault-index',
    title: 'Yash-Zattelkasten — Index',
    folder: 'Home',
    path: ['Home'],
    tags: ['index', 'moc', 'home'],
    created: '2026-01-01',
    modified: '2026-05-20',
    wordCount: 180,
    backlinks: [],
    links: ['system-design-moc', 'python-libraries', 'javascript-fundamentals', 'machine-learning', 'ai-weekly-briefing'],
    outline: [
      { level: 2, text: 'Areas',       id: 'areas' },
      { level: 2, text: 'Recent',      id: 'recent' },
      { level: 2, text: 'Quick Links', id: 'quick-links' },
    ],
    content: `# Yash-Zattelkasten

*Personal knowledge vault — a second brain for deep work, research, and continuous learning.*

## Areas

| Area | Description |
|---|---|
| [[System Design MOC]] | Architecture, scalability, distributed systems |
| [[Python Libraries]] | Backend tooling, data analysis, API clients |
| [[JavaScript Fundamentals]] | Frontend patterns, async, event loop |
| [[Machine Learning Overview]] | ML paradigms, gradient descent, evaluation |
| [[Statistics Basics]] | Probability, distributions, hypothesis testing |

## Recent

- **2026-05-20** — [[AI Weekly Briefing — 2026-05]] — Model releases, edge inference, agent frameworks
- **2026-05-19** — [[Machine Learning Overview]] — Added KaTeX equations for bias-variance decomposition
- **2026-05-18** — [[JavaScript Fundamentals]] — Event loop, closures, destructuring patterns
- **2026-05-14** — [[Selection Sort]] — Algorithm analysis with Python implementations
- **2026-05-10** — [[Python Libraries]] — requests, pandas, json, os, datetime deep-dives

## Quick Links

- Use **⌘K** to search across all notes
- Use **⌘[** / **⌘]** for browser-style back / forward navigation
- Click any wiki-link to follow connections between notes
- The graph at the bottom shows the knowledge network — drag and zoom to explore
- Find me on [GitHub](https://github.com/just-yash) · [LinkedIn](https://www.linkedin.com/in/yash-agrawall/) · [Instagram](https://instagram.com/just._yash/)
`
  },

  'python-libraries': {
    id: 'python-libraries',
    title: 'Python Libraries',
    folder: '03 - Notes',
    path: ['03 - Notes', 'Python Libraries'],
    tags: ['python', 'programming', 'backend'],
    created: '2026-05-10',
    modified: '2026-05-20',
    wordCount: 892,
    backlinks: ['ai-weekly-briefing', 'system-design-moc'],
    links: ['machine-learning', 'javascript-fundamentals', 'selection-sort'],
    outline: [
      { level: 2, text: 'Standard Library', id: 'standard-library' },
      { level: 3, text: 're — Regex (Pattern Matching)', id: 're-regex' },
      { level: 3, text: 'json — JSON Parser', id: 'json-parser' },
      { level: 3, text: 'os — Operating System Interface', id: 'os-interface' },
      { level: 3, text: 'datetime — Date and Time', id: 'datetime' },
      { level: 2, text: 'Third-Party Libraries', id: 'third-party' },
      { level: 3, text: 'requests — HTTP Calls', id: 'requests' },
      { level: 3, text: 'pandas — Data Analysis', id: 'pandas' },
    ],
    content: `# Python Libraries

A curated reference for Python libraries used in backend and data work. Part of the [[System Design MOC]].

## Standard Library

No installation needed — these ship with Python.

### re — Regex (Pattern Matching)

\`\`\`python
import re

# Search for a pattern in a string
match = re.search(r'\\d{4}', 'Year: 2026')
print(match.group())   # '2026'

# Find all matches
emails = re.findall(r'[\\w.-]+@[\\w.-]+\\.\\w+', text)

# Replace with a pattern
clean = re.sub(r'\\s+', ' ', messy_text.strip())

# Compile pattern for reuse (faster in loops)
pattern = re.compile(r'\\b[A-Z][a-z]+\\b')
names = pattern.findall(document)
\`\`\`

> **Mental Model:** Regex is a *description* of a pattern, not a specific string. \`\\d{4}\` means "exactly 4 digits" — any 4-digit sequence matches.

### json — JSON Parser

\`\`\`python
import json

# Parse JSON string → Python dict/list
data = json.loads('{"name": "Alice", "age": 30}')

# Convert Python → JSON string
json_str = json.dumps({"key": "value"}, indent=2)

# Read/write JSON files
with open('config.json') as f:
    config = json.load(f)

with open('output.json', 'w') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
\`\`\`

### os — Operating System Interface

\`\`\`python
import os

# Environment variables (never hardcode secrets)
api_key = os.environ.get('OPENAI_API_KEY', '')
port    = int(os.environ.get('PORT', 8080))

# Directory operations
cwd = os.getcwd()
os.makedirs('output/data', exist_ok=True)

# Path operations
path   = os.path.join('folder', 'subfolder', 'file.txt')
exists = os.path.exists(path)
ext    = os.path.splitext('report.pdf')[1]  # '.pdf'
\`\`\`

### datetime — Date and Time

\`\`\`python
from datetime import datetime, timedelta

now   = datetime.now()
today = datetime.today().strftime('%Y-%m-%d')

# Arithmetic
tomorrow     = now + timedelta(days=1)
two_weeks    = now + timedelta(weeks=2)
diff         = datetime(2027, 1, 1) - now
print(f"{diff.days} days until 2027")

# Parsing from string
dt = datetime.strptime('2026-05-20', '%Y-%m-%d')
iso = dt.isoformat()  # '2026-05-20T00:00:00'
\`\`\`

## Third-Party Libraries

Install via \`pip install <package>\`.

### requests — HTTP Calls

*External. \`pip install requests\`*

**What it is:** Make HTTP requests from Python. Call any REST API — OpenAI, internal tools, third-party services.

**The 4 methods you'll use:**

\`\`\`python
import requests

# GET – fetch data
response = requests.get("https://api.example.com/employees")
print(response.status_code)    # 200 = success, 404 = not found, 500 = server error
print(response.json())         # parse JSON response → dict

# POST – send data
payload  = {"employee_id": "E101", "plan": "health_basic"}
response = requests.post(
    "https://api.example.com/enroll",
    json=payload,                                         # auto-converts dict to JSON
    headers={"Authorization": "Bearer sk-abc123"}        # API key in header
)

# PUT – update existing resource
response = requests.put(
    "https://api.example.com/employees/E101",
    json={"plan": "health_plus"}
)

# DELETE – remove resource
response = requests.delete("https://api.example.com/employees/E101")
\`\`\`

**Error handling pattern:**

\`\`\`python
def safe_get(url, **kwargs):
    try:
        r = requests.get(url, timeout=10, **kwargs)
        r.raise_for_status()           # raises for 4xx / 5xx
        return r.json()
    except requests.exceptions.Timeout:
        raise RuntimeError("Request timed out")
    except requests.exceptions.HTTPError as e:
        raise RuntimeError(f"API error {e.response.status_code}: {e.response.text}")
\`\`\`

> **Mental Model:** \`requests\` is your Python browser — it makes HTTP calls just like visiting a URL, but programmatically with full control over headers, body, and auth.

### pandas — Data Analysis

\`\`\`python
import pandas as pd

# Load data
df = pd.read_csv('employees.csv')
df = pd.read_json('data.json')
df = pd.read_excel('report.xlsx', sheet_name='Sheet1')

# Explore shape
df.shape           # (rows, cols)
df.dtypes          # column types
df.isnull().sum()  # count missing values

# Filter rows
seniors = df[df['age'] > 30]
active  = df[df['status'] == 'active']
both    = df[(df['age'] > 30) & (df['dept'] == 'Eng')]

# Transform
df['salary_k']  = df['salary'] / 1000
df['full_name'] = df['first'] + ' ' + df['last']

# Group + aggregate
dept_stats = df.groupby('dept').agg(
    avg_salary=('salary', 'mean'),
    headcount=('id', 'count')
).reset_index()
\`\`\`

## Related Notes
- [[Machine Learning Overview]] — uses pandas/numpy heavily
- [[JavaScript Fundamentals]] — equivalent patterns in JS
`
  },

  'javascript-fundamentals': {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    folder: '03 - Notes',
    path: ['03 - Notes', 'JavaScript Fundamentals'],
    tags: ['javascript', 'frontend', 'web', 'async'],
    created: '2026-04-20',
    modified: '2026-05-18',
    wordCount: 634,
    backlinks: ['web-dev-moc', 'ai-weekly-briefing'],
    links: ['python-libraries', 'react-patterns'],
    outline: [
      { level: 2, text: 'Core Mental Models', id: 'mental-models' },
      { level: 2, text: 'Closures', id: 'closures' },
      { level: 2, text: 'Promises & Async/Await', id: 'async' },
      { level: 2, text: 'The Event Loop', id: 'event-loop' },
      { level: 2, text: 'Destructuring Patterns', id: 'destructuring' },
    ],
    content: `# JavaScript Fundamentals

Core patterns and mental models for modern JavaScript. See also [[Python Libraries]] for backend equivalents.

## Core Mental Models

JavaScript is **single-threaded** with an **event loop**. Every async operation is scheduled, not parallel. Understanding this shapes everything about how you write JS.

## Closures

\`\`\`javascript
function makeCounter(start = 0) {
  let count = start;

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: ()    => { count = start; },
    value: ()    => count
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
counter.value();     // 11
\`\`\`

> **Mental Model:** A closure "closes over" its lexical scope, keeping variables alive even after the outer function returns. The inner functions all share the *same* \`count\` variable.

## Promises & Async/Await

\`\`\`javascript
// Promise chain (old style)
fetch('/api/users')
  .then(res  => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/await — preferred for readability
async function getUsers() {
  try {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Fetch failed:', err.message);
    throw err;
  }
}

// Parallel fetching
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
\`\`\`

## The Event Loop

\`\`\`javascript
console.log('1');                                   // sync → call stack
setTimeout(() => console.log('2'), 0);             // macrotask queue
Promise.resolve().then(() => console.log('3'));    // microtask queue
console.log('4');                                   // sync → call stack

// Output order: 1, 4, 3, 2
// Microtasks (promises) always drain before macrotasks (setTimeout)
\`\`\`

The execution model:
1. **Call Stack** — synchronous code runs here, one frame at a time
2. **Microtask Queue** — Promises, \`queueMicrotask()\` — runs after each task
3. **Macrotask Queue** — \`setTimeout\`, \`setInterval\`, I/O callbacks

## Destructuring Patterns

\`\`\`javascript
// Array destructuring
const [first, , third, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring with rename + defaults
const { name, age = 0, role: userRole = 'guest' } = user;

// Nested
const { address: { city, zip = 'N/A' } } = profile;

// In function parameters (very common in React)
function Card({ title, body, className = '', onClick }) {
  return <div className={className} onClick={onClick}>{title}</div>;
}
\`\`\`
`
  },

  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning Overview',
    folder: '04 - Research',
    path: ['04 - Research', 'Machine Learning Overview'],
    tags: ['ml', 'ai', 'research', 'statistics'],
    created: '2026-03-15',
    modified: '2026-05-19',
    wordCount: 820,
    backlinks: ['ai-weekly-briefing', 'research-index'],
    links: ['python-libraries', 'statistics-basics', 'neural-networks'],
    outline: [
      { level: 2, text: 'Types of Learning',      id: 'types-of-learning' },
      { level: 2, text: 'Bias-Variance Tradeoff', id: 'bias-variance-tradeoff' },
      { level: 2, text: 'Gradient Descent',       id: 'gradient-descent' },
      { level: 2, text: 'Evaluation Metrics',     id: 'evaluation-metrics' },
    ],
    content: `# Machine Learning Overview

A structured mental model of ML — from learning paradigms to evaluation. Uses [[Python Libraries]] heavily for implementation.

## Types of Learning

### Supervised Learning
- **Input:** Labeled pairs $(X, y)$ — features and ground-truth targets
- **Goal:** Learn a mapping $f: X \\rightarrow y$ that generalises to unseen data
- **Examples:** Classification (spam detection), regression (price prediction)

### Unsupervised Learning
- **Input:** Unlabeled data $X$ only
- **Goal:** Discover latent structure — clusters, low-dimensional representations, anomalies
- **Examples:** K-means, PCA, VAEs, autoencoders

### Reinforcement Learning
- **Input:** Environment, actions $a \\in \\mathcal{A}$, and reward signal $r_{t}$
- **Goal:** Learn policy $\\pi(a \\mid s)$ maximising expected cumulative reward
$$G_{t} = \\sum_{k=0}^{\\infty} \\gamma^{k} r_{t+k}$$
- **Examples:** Game playing (AlphaGo), robotics, recommendation systems

## Bias-Variance Tradeoff

The fundamental decomposition of expected prediction error for any estimator $\\hat{f}$:

$$\\mathbb{E}\\left[(y - \\hat{f}(x))^{2}\\right] = \\underbrace{\\text{Bias}^{2}[\\hat{f}(x)]}_{\\text{systematic}} + \\underbrace{\\text{Var}[\\hat{f}(x)]}_{\\text{sensitivity}} + \\underbrace{\\sigma^{2}_{\\epsilon}}_{\\text{irreducible}}$$

| | High Bias | High Variance |
|---|---|---|
| Also called | Underfitting | Overfitting |
| Train error | High | Low |
| Test error | High | High |
| Fix | More capacity | More data / regularise |

> [!TIP] Regularisation
> L2 (Ridge) adds $\\lambda \\|\\theta\\|^{2}$ to the loss, shrinking weights toward zero. L1 (Lasso) adds $\\lambda \\|\\theta\\|_{1}$, promoting sparsity. Both trade variance for bias.

## Gradient Descent

The core optimisation algorithm. Given cost function $J(\\theta)$, we iteratively update:

$$\\theta \\leftarrow \\theta - \\alpha \\nabla_{\\theta} J(\\theta)$$

where $\\alpha$ is the **learning rate**. For linear regression over $m$ examples:

$$\\nabla_{\\theta} J = \\frac{1}{m} X^{T}(X\\theta - y)$$

\`\`\`python
import numpy as np

def gradient_descent(X, y, lr=0.01, epochs=1000):
    m, n   = X.shape
    theta  = np.zeros(n)
    losses = []

    for _ in range(epochs):
        residual = X @ theta - y           # (m,)
        grad     = (1/m) * X.T @ residual  # (n,)
        theta   -= lr * grad
        losses.append(float(np.mean(residual**2)))

    return theta, losses
\`\`\`

> [!INFO] Learning rate schedules
> Fixed $\\alpha$ is often suboptimal. Common schedules: step decay, cosine annealing, or adaptive methods (Adam, RMSProp) that maintain per-parameter learning rates.

## Evaluation Metrics

For binary classification — given TP, FP, FN:

$$\\text{Precision} = \\frac{TP}{TP + FP} \\qquad \\text{Recall} = \\frac{TP}{TP + FN}$$

$$F_{1} = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$

\`\`\`python
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score

metrics = {
    'precision': precision_score(y_true, y_pred),
    'recall':    recall_score(y_true, y_pred),
    'f1':        f1_score(y_true, y_pred),
    'auc_roc':   roc_auc_score(y_true, y_proba),
}
\`\`\`

**Reading checklist:**
- [x] Read [[Statistics Basics]] — probability foundations
- [x] Skim the original back-propagation paper
- [ ] Implement gradient descent from scratch
- [ ] Compare L1 vs L2 regularisation empirically
- [ ] Study the bias-variance proof in detail
`
  },

  'statistics-basics': {
    id: 'statistics-basics',
    title: 'Statistics Basics',
    folder: '04 - Research',
    path: ['04 - Research', 'Statistics Basics'],
    tags: ['statistics', 'math', 'probability', 'research'],
    created: '2026-02-20',
    modified: '2026-05-01',
    wordCount: 510,
    backlinks: ['machine-learning'],
    links: ['machine-learning'],
    outline: [
      { level: 2, text: 'Probability Fundamentals', id: 'probability-fundamentals' },
      { level: 2, text: 'Key Distributions',        id: 'key-distributions' },
      { level: 2, text: 'Hypothesis Testing',       id: 'hypothesis-testing' },
    ],
    content: `# Statistics Basics

Core probability and statistics needed for [[Machine Learning Overview]].

## Probability Fundamentals

**Bayes' Theorem** — the foundation of probabilistic reasoning:

$$P(A \\mid B) = \\frac{P(B \\mid A)\\, P(A)}{P(B)}$$

where $P(A)$ is the **prior**, $P(B \\mid A)$ is the **likelihood**, and $P(A \\mid B)$ is the **posterior**.

The **Law of Total Expectation:**
$$\\mathbb{E}[X] = \\mathbb{E}\\bigl[\\mathbb{E}[X \\mid Y]\\bigr]$$

**Variance and covariance:**
$$\\text{Var}(X) = \\mathbb{E}[X^{2}] - (\\mathbb{E}[X])^{2}$$
$$\\text{Cov}(X,Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\,\\mathbb{E}[Y]$$

## Key Distributions

### Normal Distribution

$$X \\sim \\mathcal{N}(\\mu, \\sigma^{2}) \\implies f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, \\exp\\!\\left(-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}\\right)$$

The **68-95-99.7 rule**: ~68% of data falls within $\\pm 1\\sigma$, 95% within $\\pm 2\\sigma$, 99.7% within $\\pm 3\\sigma$.

### Binomial Distribution

Counts $k$ successes in $n$ independent Bernoulli($p$) trials:

$$P(X = k) = \\binom{n}{k} p^{k}(1-p)^{n-k}$$

with mean $\\mu = np$ and variance $\\sigma^{2} = np(1-p)$.

## Hypothesis Testing

**Null hypothesis** $H_{0}$: no effect exists. **Alternative** $H_{1}$: an effect exists.

The **p-value** is the probability of data at least as extreme as observed, *given $H_{0}$ is true*:

$$\\text{p-value} = P(\\text{observed or more extreme} \\mid H_{0})$$

> [!WARNING] Common misconception
> The p-value is **not** $P(H_{0} \\mid \\text{data})$. It does not tell you the probability that $H_{0}$ is true. Always report confidence intervals alongside p-values.

\`\`\`python
from scipy import stats

# Two-sample independent t-test
t_stat, p_val = stats.ttest_ind(group_a, group_b, equal_var=False)
print(f"t = {t_stat:.3f},  p = {p_val:.4f}")

if p_val < 0.05:
    print("Reject H₀ at α = 0.05")
else:
    print("Fail to reject H₀")
\`\`\`
`
  },

  'system-design-moc': {
    id: 'system-design-moc',
    title: 'System Design MOC',
    folder: '01 - MOCs',
    path: ['01 - MOCs', 'System Design MOC'],
    tags: ['moc', 'system-design', 'architecture', 'index'],
    created: '2026-02-01',
    modified: '2026-05-17',
    wordCount: 398,
    backlinks: ['research-index'],
    links: ['python-libraries', 'javascript-fundamentals', 'machine-learning'],
    outline: [
      { level: 2, text: 'Core Areas', id: 'core-areas' },
      { level: 2, text: 'Learning Path', id: 'learning-path' },
      { level: 2, text: 'Key Principles', id: 'principles' },
    ],
    content: `# System Design MOC

*Map of Content — a navigable index of the system design knowledge base.*

## Core Areas

### Scalability Patterns
- Horizontal vs vertical scaling tradeoffs
- Load balancing strategies (round-robin, least-conn, IP hash)
- Read replicas and caching layers
- CDN for static asset delivery

### Database Design
- SQL vs NoSQL selection criteria
- Sharding strategies (range, hash, directory)
- ACID vs BASE — when to choose which
- Indexing: B-tree, composite, covering indexes

### API Design
- REST resource modeling and HTTP semantics
- GraphQL for complex, nested data fetching
- gRPC for internal high-throughput services
- Rate limiting, auth (JWT vs session), versioning

### Distributed Systems
- CAP theorem: consistency, availability, partition tolerance
- Consensus algorithms: Raft and Paxos simplified
- Event-driven patterns: Kafka, message queues, CQRS
- Idempotency, at-least-once delivery, deduplication

## Learning Path

1. [[Networking Basics]] — TCP/IP, HTTP/2, DNS, TLS
2. [[Database Fundamentals]] — ACID, isolation levels, indexes
3. [[Python Libraries]] — backend tooling in practice
4. [[Caching Strategies]] — Redis, Memcached, CDN, HTTP caching
5. [[Distributed Patterns]] — eventual consistency, saga pattern

## Key Principles

> **Simple scales.** The most resilient systems are the ones where each component does exactly one thing well.

| Concern | Approach |
|---|---|
| Read-heavy | Cache layer + read replicas |
| Write-heavy | Partition + async queues |
| Full-text search | Elasticsearch / Typesense |
| Binary files | Object storage (S3/GCS) |
| Real-time | WebSockets / SSE |
| Analytics | Column stores (ClickHouse) |
`
  },

  'ai-weekly-briefing': {
    id: 'ai-weekly-briefing',
    title: 'AI Weekly Briefing — 2026-05',
    folder: '02 - Raw Notes',
    path: ['02 - Raw Notes', 'AI Weekly Briefing — 2026-05'],
    tags: ['ai', 'weekly', 'news', 'raw'],
    created: '2026-05-19',
    modified: '2026-05-20',
    wordCount: 289,
    backlinks: [],
    links: ['machine-learning', 'python-libraries'],
    outline: [
      { level: 2, text: 'Key Stories', id: 'stories' },
      { level: 2, text: 'Industry Trends', id: 'trends' },
      { level: 2, text: 'Tools to Explore', id: 'tools' },
    ],
    content: `# AI Weekly Briefing — 2026-05-19

*Raw capture from weekly AI digest. Triage and promote to permanent notes.*

## Key Stories

### Model Releases This Week
- **Claude 4 Sonnet** — significant reasoning improvements, better long-form analysis
- **GPT-5** — multimodal from ground up, 1M token context window
- **Gemini Ultra 2** — native video understanding, 2M token context
- Inference costs dropping ~50% quarter-over-quarter across providers

### Research Papers Worth Reading
- *Chain-of-Thought v3* — structured reasoning boosts math benchmarks further
- *Mixture of Experts at Scale* — sparse routing for trillion-parameter models
- *Constitutional AI v2* — improved alignment methodology from Anthropic

## Industry Trends

1. **Edge inference accelerating** — models running on-device for privacy-sensitive use cases
2. **Agent frameworks maturing** — reliable 10+ step autonomous tasks now common
3. **Multimodal as default** — text + image + audio unified in base models
4. **Cost curves collapsing** — API costs 10× cheaper than this time last year

## Tools to Explore

- [ ] **LangGraph** — stateful agent workflows with cycles and branching
- [ ] **Cursor** — AI-first code editor, context-aware completions
- [ ] **Perplexity** — research assistant with live citations
- [ ] **NotebookLM** — knowledge synthesis from uploaded documents

## Raw Connections

See [[Python Libraries]] for API integration patterns when calling these models.
See [[Machine Learning Overview]] for the foundational concepts behind these releases.
`
  },

  'selection-sort': {
    id: 'selection-sort',
    title: 'Selection Sort',
    folder: '03 - Notes',
    path: ['03 - Notes', 'Selection Sort'],
    tags: ['algorithms', 'cs', 'sorting', 'python'],
    created: '2026-05-12',
    modified: '2026-05-14',
    wordCount: 248,
    backlinks: ['dsa-moc'],
    links: ['python-libraries'],
    outline: [
      { level: 2, text: 'Algorithm', id: 'algorithm' },
      { level: 2, text: 'Complexity Analysis', id: 'complexity' },
      { level: 2, text: 'Variants', id: 'variants' },
    ],
    content: `# Selection Sort

One of the simplest sorting algorithms. Ideal for understanding in-place sorting mechanics.

## Algorithm

The key insight: repeatedly find the minimum in the unsorted portion and place it at the start.

\`\`\`python
def selection_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n):
        # Find minimum in arr[i..n-1]
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum into position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example trace: [64, 25, 12, 22, 11]
# Pass 1: [11, 25, 12, 22, 64]  ← 11 selected
# Pass 2: [11, 12, 25, 22, 64]  ← 12 selected
# Pass 3: [11, 12, 22, 25, 64]  ← 22 selected
# Pass 4: [11, 12, 22, 25, 64]  ← 25 selected (already in place)
\`\`\`

## Complexity Analysis

| Case | Time | Space |
|------|------|-------|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

**Not adaptive** — always O(n²) regardless of how sorted the input already is.
**Not stable** — equal elements may swap relative order.

> **Use when:** Memory is critically constrained (O(1) extra space). In practice, prefer \`sorted()\` which uses Timsort — O(n log n) and stable.

## Variants

\`\`\`python
# Maximum-first variant (sorts descending)
def selection_sort_desc(arr):
    n = len(arr)
    for i in range(n):
        max_idx = max(range(i, n), key=lambda j: arr[j])
        arr[i], arr[max_idx] = arr[max_idx], arr[i]
    return arr
\`\`\`

See [[Python Libraries]] for built-in sorting alternatives.
`
  }
};

const VAULT_FOLDERS = [
  {
    id: 'mocs', name: '01 - MOCs', icon: 'network', expanded: false,
    children: [
      { id: 'system-design-moc', name: 'System Design MOC', type: 'note' },
      { id: 'python-moc', name: 'Python MOC', type: 'stub' }
    ]
  },
  {
    id: 'raw-notes', name: '02 - Raw Notes', icon: 'file-text', expanded: false,
    children: [
      { id: 'ai-weekly-briefing', name: 'AI Weekly Briefing — 2026-05', type: 'note' },
      { id: 'reading-log', name: 'Reading Log', type: 'stub' }
    ]
  },
  {
    id: 'notes', name: '03 - Notes', icon: 'book-open', expanded: true,
    children: [
      { id: 'python-libraries', name: 'Python Libraries', type: 'note' },
      { id: 'javascript-fundamentals', name: 'JavaScript Fundamentals', type: 'note' },
      { id: 'selection-sort', name: 'Selection Sort', type: 'note' }
    ]
  },
  {
    id: 'research', name: '04 - Research', icon: 'flask', expanded: false,
    children: [
      { id: 'machine-learning', name: 'Machine Learning Overview', type: 'note' },
      { id: 'statistics-basics', name: 'Statistics Basics', type: 'note' },
      { id: 'paper-transformers', name: 'Paper: Attention Is All You Need', type: 'stub' }
    ]
  },
  {
    id: 'creativity', name: '05 - Creativity', icon: 'sparkle', expanded: false,
    children: []
  },
  {
    id: 'archive', name: '06 - Archive', icon: 'archive', expanded: false,
    children: []
  },
  {
    id: 'annexure', name: '07 - Annexure', icon: 'paperclip', expanded: false,
    children: []
  },
  {
    id: 'tags-folder', name: '08 - Tags', icon: 'hash', expanded: false,
    children: [
      { id: 'tag-python', name: '#python', type: 'tag' },
      { id: 'tag-ai', name: '#ai', type: 'tag' },
      { id: 'tag-research', name: '#research', type: 'tag' }
    ]
  },
  {
    id: 'templates', name: '09 - Templates', icon: 'layout-template', expanded: false,
    children: []
  },
  {
    id: 'private', name: 'Private', icon: 'lock', expanded: false,
    children: []
  },
  {
    id: 'projects', name: 'Projects', icon: 'kanban', expanded: false,
    children: [
      { id: 'selection-sort', name: 'Selection Sort', type: 'note' }
    ]
  }
];

const GRAPH_NODES = [
  { id: 'python-libraries',       label: 'Python Libraries',        group: 'notes'    },
  { id: 'javascript-fundamentals',label: 'JS Fundamentals',         group: 'notes'    },
  { id: 'machine-learning',       label: 'ML Overview',             group: 'research' },
  { id: 'system-design-moc',      label: 'System Design',           group: 'moc'      },
  { id: 'ai-weekly-briefing',     label: 'AI Weekly',               group: 'raw'      },
  { id: 'selection-sort',         label: 'Selection Sort',          group: 'notes'    },
  { id: 'react-patterns',         label: 'React Patterns',          group: 'notes'    },
  { id: 'database-patterns',      label: 'DB Patterns',             group: 'research' },
  { id: 'async-patterns',         label: 'Async Patterns',          group: 'notes'    },
  { id: 'neural-networks',        label: 'Neural Networks',         group: 'research' },
  { id: 'api-design',             label: 'API Design',              group: 'notes'    },
  { id: 'statistics-basics',      label: 'Statistics',              group: 'research' },
  { id: 'research-index',         label: 'Research Index',          group: 'moc'      },  { id: 'dsa-moc',                label: 'DSA MOC',                 group: 'moc'      },
  { id: 'web-dev-moc',            label: 'Web Dev MOC',             group: 'moc'      },
  { id: 'python-moc',             label: 'Python MOC',              group: 'moc'      },
  { id: 'reading-log',            label: 'Reading Log',             group: 'raw'      },
  { id: 'caching-strategies',     label: 'Caching Strategies',      group: 'notes'    },
];

const GRAPH_EDGES = [
  { source: 'python-libraries',       target: 'system-design-moc'       },
  { source: 'python-libraries',       target: 'ai-weekly-briefing'       },
  { source: 'python-libraries',       target: 'machine-learning'         },
  { source: 'python-libraries',       target: 'python-moc'               },
  { source: 'python-libraries',       target: 'selection-sort'           },
  { source: 'javascript-fundamentals',target: 'react-patterns'           },
  { source: 'javascript-fundamentals',target: 'async-patterns'           },
  { source: 'javascript-fundamentals',target: 'web-dev-moc'              },
  { source: 'javascript-fundamentals',target: 'ai-weekly-briefing'       },
  { source: 'machine-learning',       target: 'statistics-basics'        },
  { source: 'statistics-basics',      target: 'machine-learning'         },
  { source: 'machine-learning',       target: 'neural-networks'          },
  { source: 'machine-learning',       target: 'ai-weekly-briefing'       },
  { source: 'machine-learning',       target: 'research-index'           },
  { source: 'system-design-moc',      target: 'database-patterns'        },
  { source: 'system-design-moc',      target: 'api-design'               },
  { source: 'system-design-moc',      target: 'javascript-fundamentals'  },
  { source: 'system-design-moc',      target: 'caching-strategies'       },
  { source: 'research-index',         target: 'system-design-moc'        },
  { source: 'research-index',         target: 'machine-learning'         },
  { source: 'web-dev-moc',            target: 'react-patterns'           },
  { source: 'web-dev-moc',            target: 'api-design'               },
  { source: 'dsa-moc',                target: 'selection-sort'           },
  { source: 'reading-log',            target: 'machine-learning'         },
  { source: 'python-moc',             target: 'python-libraries'         },
];

// Helper: find note id from a display name (for wiki-link navigation)
function findNoteByName(name) {
  const lower = name.toLowerCase();
  return Object.keys(VAULT_NOTES).find(id => {
    const note = VAULT_NOTES[id];
    return note.title.toLowerCase() === lower || id === lower.replace(/\s+/g, '-');
  }) || null;
}

Object.assign(window, { VAULT_NOTES, VAULT_FOLDERS, GRAPH_NODES, GRAPH_EDGES, findNoteByName });
