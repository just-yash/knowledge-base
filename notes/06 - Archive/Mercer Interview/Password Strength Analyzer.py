import re

class Password:
    def __init__(self, password):
        self.password = password
        self.score = 0
        self.suggestions = []
        self.analyze()
        self.display()

    def analyze(self):
        if len(self.password) >= 8:
            self.score += 1
        else:
            self.suggestions.append("Use at least 8 characters")

        if re.search(r"[A-Z]", self.password):
            self.score += 1
        else:
            self.suggestions.append("Add an uppercase letter")

        if re.search(r"[a-z]", self.password):
            self.score += 1
        else:
            self.suggestions.append("Add a lowercase letter")

        if re.search(r"\d", self.password):
            self.score += 1
        else:
            self.suggestions.append("Add a number")

        if re.search(r"[!@#$%^&*]", self.password):
            self.score += 1
        else:
            self.suggestions.append("Add a special character")

    def display(self):
        labels = {
            0: "Very Weak", 1: "Weak", 2: "Weak",
            3: "Moderate", 4: "Strong", 5: "Very Strong"
        }
        print(f"\nScore    : {self.score} / 5")
        print(f"Strength : {labels[self.score]}")
        if self.suggestions:
            print("Suggestions:")
            for s in self.suggestions:
                print(f"  → {s}")
        else:
            print("Perfect password!")


while True:
    pwd = input("\nEnter password (or 'quit'): ").strip()
    if pwd.lower() == "quit":
        break
    if not pwd:
        print("Empty input. Try again.")
        continue
    Password(pwd)