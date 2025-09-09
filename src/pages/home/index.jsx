import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import RecipeItem from "../../components/recipe-item"


export default function Home() {
  const {recipeList, loading} = useContext(GlobalContext)

  if (loading) return <div>Loading...Please wait.</div>

  return (
    <div className='py8 container mx-auto flex flex-wrap justify-center gap-10'>
      {
        recipeList && recipeList.length > 0
        ?
          recipeList.map((item) => <RecipeItem item={item}/>)
        :
          <div>
            <p className="lg:text-4xl text-xl text-center text-black font-bold">No recipes found. Please try a different ingredient</p>
          </div>
      }
    </div>

  )
}
