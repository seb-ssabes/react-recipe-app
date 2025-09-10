import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"

export default function Details() {

  const {id} = useParams()
  const {recipeDetailsData, setRecipeDetailsData, handleAddToFavorites, favoritesList} = useContext(GlobalContext)

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      const data = await response.json()
      console.log(data)

      if (data?.data) {
        setRecipeDetailsData(data?.data)
      }
    }
    getRecipeDetails()
  }, [])

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

      <div className="h-96 overflow-hidden rounded-xl shadow-lg group">
        <img
          src={recipeDetailsData?.recipe?.image_url}
          alt="recipe item image"
          className="w-full h-full object-cover block group-hover:scale-105 duration-300"
        />
      </div>

      <div className="flex flex-col gap-6">

        <div>
          <span className="text-sm text-cyan-700 font-medium uppercase tracking-wide">
            {recipeDetailsData?.recipe?.publisher}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            {recipeDetailsData?.recipe?.title}
          </h1>
        </div>


        <button
          onClick={() => handleAddToFavorites(recipeDetailsData?.recipe)}
          className="self-start px-6 py-2 rounded-lg text-sm uppercase font-medium tracking-wide shadow-md bg-black text-white hover:bg-gray-800 transition">
          {
            favoritesList && favoritesList.length > 0 &&
            favoritesList.findIndex(item => item.id === recipeDetailsData?.recipe?.id) !== -1
            ? "Remove from favorites"
            : "Save as Favorite"
          }
        </button>


        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ingredients
          </h2>
          <ul className="space-y-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-gray-700"
              >
                <span className="text-cyan-600 font-semibold">
                  {ingredient.quantity || ""} {ingredient.unit || ""}
                </span>
                <span>{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

}
