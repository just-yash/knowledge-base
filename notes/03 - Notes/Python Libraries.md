
Type : #Note    
Date : 2026-05-19    
Tags :  [[Python]] ; [[Language]] ; [[AI]]      
Status : #incomplete     
~ ***Yash Agrawall*** ~     

---
## MENTAL MODEL

```
Raw Data → pandas
API Calls → requests / openai
Date Logic → datetime
Text Matching → re
Config/Keys → python-dotenv
File/Env Ops → os
AI Pipelines → langchain
Embeddings → sentence-transformers
Vector Search → chromadb / faiss
```

---

## 1. `re` — Regex (Pattern Matching)

_Built-in. No install._

**What it is:** Scans strings for patterns. Not searching for exact words — searching for _shapes_ of text.

**When you'll use it at internship:**

- Validate email formats, phone numbers, employee IDs
- Extract dates or codes from messy text fields
- Check if a benefits config follows a naming pattern

**Core functions — only 3 matter:**

python

```python
import re

# re.search() → finds pattern ANYWHERE in string → returns match or None
result = re.search(r"\d+", "EMP-2045-HR")
print(result.group())   # "2045"

# re.match() → only checks from the START of string
result = re.match(r"EMP", "EMP-2045")   # match
result = re.match(r"EMP", "HR-EMP-2045")  # None — EMP not at start

# re.findall() → returns ALL matches as a list
re.findall(r"\d+", "Plan: 90 days, Cost: 500")  # ['90', '500']
```

**Common patterns:**

python

```python
r"\d"        # any digit 0-9
r"\d+"       # one or more digits
r"[A-Z]"     # any uppercase letter
r"[a-zA-Z]+" # one or more letters
r"\w+"       # word characters (letters + digits + underscore)
r"\s"        # whitespace (space, tab, newline)
r"^"         # start of string
r"$"         # end of string

# Real example — email validation
def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w{2,}$"
    return bool(re.match(pattern, email))

is_valid_email("yash@mercer.com")   # True
is_valid_email("yash@.com")         # False
```

**If someone says:** _"Can you write a regex to extract X"_ → they want `re.findall()` or `re.search()`.

---

## 2. `json` — JSON Parser

_Built-in. No install._

**What it is:** Converts between Python dicts/lists and JSON strings. Every API response is JSON. Every config file is JSON.

**Two directions:**

python

```python
import json

# JSON string → Python dict  (parsing API response)
raw = '{"employee_id": "E101", "plan": "health", "active": true}'
data = json.loads(raw)          # .loads() = load from String
print(data["employee_id"])      # "E101"
print(type(data))               # <class 'dict'>

# Python dict → JSON string  (sending data to API)
payload = {"name": "Yash", "age": 22, "enrolled": True}
json_str = json.dumps(payload)  # .dumps() = dump to String
print(json_str)
# '{"name": "Yash", "age": 22, "enrolled": true}'

# Read JSON file from disk
with open("config.json", "r") as f:
    config = json.load(f)       # .load() = load from File (no 's')

# Write JSON file to disk
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)  # indent=2 makes it readable
```

**Memory trick:**

- `loads` / `dumps` → String (s = string)
- `load` / `dump` → File

**If someone says:** _"Parse the API response"_ → `json.loads()`. _"Serialize this to JSON"_ → `json.dumps()`.

---

## 3. `os` — Operating System Interface

_Built-in. No install._

**What it is:** Talk to the file system and environment. Paths, folders, env variables.

**Most used in internship:**

python

```python
import os

# Read environment variables (API keys, DB credentials)
api_key = os.environ.get("OPENAI_API_KEY")   # returns None if not set
api_key = os.environ["OPENAI_API_KEY"]       # raises error if not set → use .get() in prod

# Check if file exists before reading it
if os.path.exists("data/employees.csv"):
    # read it
    pass

# Build file paths safely (works on Windows + Linux both)
path = os.path.join("data", "2026", "april", "report.csv")
# → "data/2026/april/report.csv"  (not hardcoded slashes)

# List all files in a folder
files = os.listdir("data/")
# → ['employees.csv', 'benefits.json', 'report.pdf']

# Get current working directory
print(os.getcwd())   # /home/yash/mercer-project

# Create a folder if it doesn't exist
os.makedirs("output/reports", exist_ok=True)  # exist_ok=True → no error if already exists
```

**If someone says:** _"Pull the API key from the environment"_ → `os.environ.get("KEY_NAME")`.

---

## 4. `datetime` — Date and Time

_Built-in. No install._

**What it is:** Create, compare, and do math on dates and times. Critical for benefits logic — every rule has a date dependency.

python

```python
from datetime import date, datetime, timedelta

# Today's date
today = date.today()              # date(2026, 5, 19)
now = datetime.now()              # datetime(2026, 5, 19, 14, 35, 22)

# Create a specific date
hire_date = date(2026, 1, 1)

# Date arithmetic — this is the coverage rule from yesterday
coverage_start = hire_date + timedelta(days=90)
print(coverage_start)             # 2026-04-01

# Compare dates
if date.today() >= coverage_start:
    print("Employee is eligible")

# Convert string → date (common with CSV/API data)
raw = "2026-01-15"
d = datetime.strptime(raw, "%Y-%m-%d").date()
print(d)         # 2026-01-15
print(type(d))   # <class 'datetime.date'>

# Convert date → string
formatted = hire_date.strftime("%d %B %Y")
print(formatted)  # "01 January 2026"

# Difference between two dates
diff = date(2026, 5, 19) - date(2026, 1, 1)
print(diff.days)  # 138
```

**Format codes:**

```
%Y → 4-digit year     (2026)
%m → 2-digit month    (05)
%d → 2-digit day      (19)
%B → full month name  (May)
%H → hour 24hr        (14)
%M → minutes          (35)
```

**If someone says:** _"Parse this date string"_ → `strptime`. _"Format this date"_ → `strftime`.

---

## 5. `python-dotenv` — Environment Variable Loader

_External. `pip install python-dotenv`_

**What it is:** Loads variables from a `.env` file into `os.environ`. Keeps secrets (API keys, DB passwords) out of your code.

**Why it exists:** You never hardcode API keys in code — if you push to GitHub, the key is exposed.

**Setup:**

```
# .env file (lives in project root, NEVER commit this to git)
OPENAI_API_KEY=sk-abc123xyz
ANTHROPIC_API_KEY=sk-ant-xyz789
DATABASE_URL=postgresql://user:pass@localhost/db
ENV=production
```

python

```python
# your_script.py
from dotenv import load_dotenv
import os

load_dotenv()   # reads .env file and loads vars into os.environ

api_key = os.environ.get("OPENAI_API_KEY")
print(api_key)   # sk-abc123xyz
```

**Also add `.env` to `.gitignore`:**

```
# .gitignore
.env
```

**That's the entire library.** One import, one function call. Everything else is just `os.environ.get()`.

---

## 6. `requests` — HTTP Calls

_External. `pip install requests`_

**What it is:** Make HTTP requests from Python. Call any REST API — OpenAI, internal tools, third-party services.

**The 4 methods you'll use:**

python

```python
import requests

# GET — fetch data
response = requests.get("https://api.example.com/employees")
print(response.status_code)    # 200 = success, 404 = not found, 500 = server error
print(response.json())         # parse JSON response → dict

# POST — send data
payload = {"employee_id": "E101", "plan": "health_basic"}
response = requests.post(
    "https://api.example.com/enroll",
    json=payload,                            # auto-converts dict to JSON + sets Content-Type
    headers={"Authorization": "Bearer sk-abc123"}  # API key in header
)

# PUT — update existing resource
response = requests.put("https://api.example.com/employees/E101", json={"plan": "health_plus"})

# DELETE — remove resource
response = requests.delete("https://api.example.com/employees/E101")
```

**Always check status:**

python

```python
response = requests.get("https://api.example.com/data")

if response.status_code == 200:
    data = response.json()
elif response.status_code == 401:
    print("Auth failed — check API key")
elif response.status_code == 404:
    print("Resource not found")
else:
    print(f"Error: {response.status_code}")
    print(response.text)   # raw error message
```

**With timeout (always use in production):**

python

```python
response = requests.get("https://api.example.com/data", timeout=10)  # crash if no reply in 10s
```

**If someone says:** _"Hit this endpoint"_ or _"Call this API"_ → `requests.get()` or `requests.post()`.

---

## 7. `pandas` — Data Manipulation

_External. `pip install pandas`_

**What it is:** Excel for Python. Load CSV/Excel files into a table-like structure called a DataFrame, then filter, transform, and export it.

**Core object — DataFrame:**

python

```python
import pandas as pd

# Load data
df = pd.read_csv("employees.csv")         # from CSV
df = pd.read_excel("benefits.xlsx")       # from Excel
df = pd.DataFrame([                        # from Python list
    {"id": "E101", "name": "Yash", "plan": "health"},
    {"id": "E102", "name": "Arjun", "plan": "dental"},
])

# Inspect
print(df.head())          # first 5 rows
print(df.shape)           # (rows, columns) → (200, 8)
print(df.columns)         # column names
print(df.dtypes)          # data type of each column
print(df.isnull().sum())  # count nulls per column
```

**Select and filter:**

python

```python
# Select one column → Series (like a list)
names = df["name"]

# Select multiple columns → DataFrame
subset = df[["name", "plan", "hire_date"]]

# Filter rows by condition
active = df[df["status"] == "active"]
high_risk = df[df["age"] > 50]
health_only = df[df["plan"].str.contains("health")]

# Multiple conditions
filtered = df[(df["status"] == "active") & (df["plan"] == "health")]
#              AND = &,  OR = |
```

**Modify data:**

python

```python
# Add a new column
df["coverage_start"] = pd.to_datetime(df["hire_date"]) + pd.Timedelta(days=90)

# Rename columns
df = df.rename(columns={"emp_id": "employee_id", "dept": "department"})

# Drop a column
df = df.drop(columns=["internal_notes"])

# Fill nulls
df["plan"] = df["plan"].fillna("unassigned")

# Apply a function to a column
df["name_upper"] = df["name"].apply(lambda x: x.upper())
```

**Aggregate:**

python

```python
# Count, sum, mean
print(df["plan"].value_counts())     # how many employees per plan type
print(df["salary"].mean())           # average salary
print(df.groupby("department")["salary"].mean())  # avg salary per dept
```

**Export:**

python

```python
df.to_csv("output.csv", index=False)     # index=False → don't write row numbers
df.to_excel("output.xlsx", index=False)
```

**If someone says:** _"Load this CSV"_ → `pd.read_csv()`. _"Filter rows where X"_ → boolean indexing. _"Group by department"_ → `groupby()`.

---

## 8. `openai` — OpenAI API Client

_External. `pip install openai`_

**What it is:** Official Python client to call GPT models. Wraps `requests` calls to OpenAI's API in clean Python syntax.

python

```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Basic completion
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a benefits assistant. Answer only HR-related questions."},
        {"role": "user",   "content": "What is the coverage start date for someone hired January 1?"}
    ],
    temperature=0,       # 0 = deterministic output (use for data tasks)
    max_tokens=500
)

# Extract the text
answer = response.choices[0].message.content
print(answer)
```

**Message roles:**

- `system` → sets behavior/persona of the model — who it is, what it does
- `user` → the input/question
- `assistant` → model's previous response (for multi-turn conversations)

**Multi-turn conversation:**

python

```python
messages = [
    {"role": "system", "content": "You are a benefits assistant."},
    {"role": "user", "content": "What plans are available?"},
    {"role": "assistant", "content": "We offer health, dental, and vision."},
    {"role": "user", "content": "What's the cost for dental?"},  # follow-up
]

response = client.chat.completions.create(model="gpt-4", messages=messages)
```

**If someone says:** _"Call GPT"_ or _"Query the model"_ → this is what they mean. Anthropic's library (`anthropic`) works the same way, different syntax.

---

## 9. `langchain` — LLM App Framework

_External. `pip install langchain`_

**What it is:** A framework that chains together LLM calls, tools, data sources, and memory into pipelines. Instead of writing 200 lines of glue code to connect GPT + a CSV + a validator — langchain gives you building blocks.

**You won't write langchain from scratch.** You need to understand what it does when you see it in code.

**Core concepts:**

python

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

# 1. LLM — the model
llm = ChatOpenAI(model="gpt-4", temperature=0)

# 2. Prompt Template — reusable prompt with variables
prompt = ChatPromptTemplate.from_messages([
    ("system", "You validate employee benefits data. Be precise."),
    ("user", "Validate this record: {record}")
])

# 3. Chain — connect them with | (pipe operator)
chain = prompt | llm

# 4. Run
result = chain.invoke({"record": "Employee E101, plan: health, hire: 2026-01-01"})
print(result.content)
```

**Key components you'll encounter:**

```
LLM / ChatModel     → the AI model (GPT-4, Claude)
PromptTemplate      → structured, reusable prompt with slots
Chain               → sequence of steps connected by |
Retriever           → fetches relevant docs from a vector DB (for RAG)
Agent               → LLM that decides which tools to call
Memory              → stores conversation history
Tool                → a function the LLM can call (search, calculator, DB lookup)
```

**If someone says:** _"We're using LangChain for the pipeline"_ → ask which components (retriever, agent, chain) and you'll understand the structure.

---

## 10. `sentence-transformers` — Text Embeddings

_External. `pip install sentence-transformers`_

**What it is:** Converts text into numbers (vectors/embeddings). Two semantically similar sentences get similar vectors — even if they use different words.

**Why this matters for HR/benefits:**

- "When does coverage start?" and "What's the activation date for insurance?" → should retrieve the same policy doc
- Normal keyword search fails. Embeddings work.

python

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")  # small, fast, good for production

sentences = [
    "When does health coverage begin?",
    "What is the insurance activation date?",
    "How do I reset my password?"
]

embeddings = model.encode(sentences)
print(embeddings.shape)   # (3, 384) → 3 sentences, each a 384-dimensional vector

# Similarity — embeddings 0 and 1 will be much closer than 0 and 2
```

**You don't use this alone** — you use it to _generate_ embeddings, then store them in ChromaDB or FAISS for search.

---

## 11. `chromadb` — Vector Database

_External. `pip install chromadb`_

**What it is:** A database that stores embeddings and lets you search by semantic similarity. The storage layer of a RAG pipeline.

**Flow:**

```
Policy Documents → sentence-transformers → embeddings → chromadb
                                                              ↑
User Question → embedding → similarity search → top 3 relevant chunks
                                                              ↓
                                         inject into GPT prompt → answer
```

python

```python
import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.Client()
collection = client.create_collection("benefits_policies")

# Add documents
model = SentenceTransformer("all-MiniLM-L6-v2")

docs = [
    "Coverage begins 90 days after hire date.",
    "Dental plan requires enrollment within 30 days.",
    "Vision plan covers annual eye exams."
]

embeddings = model.encode(docs).tolist()

collection.add(
    documents=docs,
    embeddings=embeddings,
    ids=["doc1", "doc2", "doc3"]
)

# Query — semantic search
query = "When does insurance start?"
query_embedding = model.encode([query]).tolist()

results = collection.query(query_embeddings=query_embedding, n_results=2)
print(results["documents"])
# [['Coverage begins 90 days after hire date.', 'Dental plan requires enrollment within 30 days.']]
```

**FAISS** = same concept, built by Meta, faster at scale, no persistence by default. ChromaDB is easier to start with.

---

## QUICK REFERENCE

|Library|One-liner|Key function|
|---|---|---|
|`re`|pattern matching|`re.search()`, `re.findall()`|
|`json`|dict ↔ JSON string|`json.loads()`, `json.dumps()`|
|`os`|env vars, file paths|`os.environ.get()`, `os.path.join()`|
|`datetime`|date math|`timedelta()`, `strptime()`, `strftime()`|
|`python-dotenv`|load `.env` file|`load_dotenv()`|
|`requests`|HTTP API calls|`requests.get()`, `requests.post()`|
|`pandas`|tabular data|`pd.read_csv()`, `df[condition]`, `groupby()`|
|`openai`|call GPT|`client.chat.completions.create()`|
|`langchain`|LLM pipelines|`Chain`, `Retriever`, `Agent`|
|`sentence-transformers`|text → vectors|`model.encode()`|
|`chromadb`|vector search|`collection.add()`, `collection.query()`|

---

## PRODUCTION PATTERN — Everything Together

python

```python
# What a real internship script looks like
from dotenv import load_dotenv
from openai import OpenAI
import pandas as pd
import os, json
from datetime import date, timedelta

load_dotenv()  # load .env

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

df = pd.read_csv("employees.csv")
df["hire_date"] = pd.to_datetime(df["hire_date"]).dt.date

for _, row in df.iterrows():
    coverage_start = row["hire_date"] + timedelta(days=90)

    if date.today() < coverage_start:
        continue  # not eligible yet

    prompt = f"Summarize benefits eligibility for employee {row['name']}, plan: {row['plan']}"

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    print(response.choices[0].message.content)
```

This is what production looks like — not one library, all of them working together.
---