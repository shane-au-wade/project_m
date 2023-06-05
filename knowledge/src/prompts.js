export function writeQuestionsPrompt(text) {
  return `write 3 questions that could be asked about the following text

---
TEXT:
The quick brown fox jumped over the lazy dog.

QUESTIONS:
["how fast was the fox going?", What shade of brown was the fox?", "Why was the dog so lazy?"]
---
    
TEXT:
${text}

QUESTIONS:`
}
