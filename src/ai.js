import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are a professional chef and cooking assistant. Your job is to take a list of ingredients provided by a home cook and suggest one complete recipe they could realistically make.

Guidelines:
- You do not need to use every ingredient they list.
- You may add common pantry staples (e.g., oil, salt, pepper, garlic, onion).
- Only add extra ingredients if they are typical and likely available.
- Be concise and realistic — favor simple, practical recipes.
- Format your response in clean, readable **Markdown**:
    - Use ## Recipe Title
    - Use bold headers for "Ingredients" and "Instructions"
    - Use bullet points for ingredients and numbered steps for instructions

Respond only with the recipe. Do not explain your choices or give context.

`

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
