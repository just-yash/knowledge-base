# Contributing Guidelines

Thank you for your interest in contributing to **Yash's Knowledge Base & Interactive Vault**! We welcome bug reports, feature suggestions, documentation improvements, and pull requests.

---

## 🛠️ Getting Started

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/yashagrawall/knowledge-base.git
   cd knowledge-base
   ```

2. **Local Preview**:
   - Rebuild data file: `node build-vault.js`
   - Watch mode for live editing: `node watch-vault.js`
   - Serve locally: `npx serve .` and open `http://localhost:3000`

---

## 🚀 How to Contribute

### 1. Reporting Bugs
- Open an Issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md).
- Include details about your operating system, browser, steps to reproduce, and any console error tracebacks.

### 2. Suggesting Features
- Open an Issue using the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md).
- Explain the motivation and expected user experience.

### 3. Submitting Pull Requests
- Create a new topic branch (`git checkout -b feature/amazing-idea`).
- Ensure your changes follow the zero-runtime-dependency philosophy (no external bundler requirements).
- Run `node build-vault.js` to ensure the vault data file compiles cleanly.
- Commit your changes with descriptive messages and submit a Pull Request.

---

## 📜 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.
