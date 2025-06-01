// import { HfInference } from '@huggingface/inference'
import Anthropic from "@anthropic-ai/sdk"

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
const anthropic = new Anthropic({
    // Make sure you set an environment variable in Scrimba 
    // for ANTHROPIC_API_KEY
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromAI(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}




// Hugging Face Free model
// const hf = new HfInference(import.meta.env.VITE_HF_API_KEY)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         })
//         return response.choices[0].message.content
//     } catch (err) {
//         console.error(err.message)
//     }
// }
