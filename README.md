# AI Chef – AI Recipe Generator 

AI Chef is a recipe suggestion app powered by Anthropic's Claude 3 Haiku model. You enter ingredients you have on hand, and it generates a practical recipe in clean Markdown format.

Built with:
- 🧠 [Claude 3 Haiku](https://www.anthropic.com/)
- ⚛️ React (Vite)

---

## Features

- Add and remove ingredients
- Generate recipes with Claude 3
- Render markdown-formatted results

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/omarraf/ai-chef.git
cd ai-chef
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env`

Create a `.env` file in the root of the project with this content:

```env
VITE_ANTHROPIC_API_KEY=your-anthropic-api-key-here
```


### 4. Run the app locally

```bash
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---

---

## Future Ideas

- Swap between Claude and other models (Mistral, GPT, etc.)
- Store and favorite past recipes
- Add search filters (e.g., vegetarian, low carb, 15-min meals, different cuisines)
- Upload ingredients via image (OCR AI)

---





