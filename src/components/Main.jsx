import React from "react"
import { getRecipeFromMistral } from "../ai"
import Recipe from "./Recipe"


export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeMarkdown, setRecipeMarkdown] = React.useState("")
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    

    const recipeRef = React.useRef(null)


    async function toggleRecipeShown() {
            setLoading(true)
            try {
                const recipe = await getRecipeFromMistral(ingredients)
                setRecipeMarkdown(recipe)
                setRecipeShown(true)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
            if (recipeRef.current) {
                recipeRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <li key={ingredient}>
            {ingredient}
            <button
                className="remove-btn"
                onClick={() =>
                    setIngredients(prev => prev.filter((_, i) => i !== index))
                }
            >
                ✕
            </button>
        </li>
    ))

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">
                        {ingredientsListItems}
                    </ul>
                    {ingredients.length > 3 && (
                        <div className="get-recipe-container">
                            <div>
                                <h3>Ready for a recipe?</h3>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <button onClick={toggleRecipeShown} disabled={loading}>
                                {loading ? "Loading..." : "Get a recipe"}
                            </button>
                        </div>
                    )}
                </section>
            )}

            {recipeShown && <Recipe markdown={recipeMarkdown} />}
        </main>
    )
}
