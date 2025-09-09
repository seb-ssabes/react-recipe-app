import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

export default function GlobalState({children}) {
  const [searchParam, setSearchParam] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipeList, setRecipeList] = useState([])

  async function handleSubmit(event) {
    event.preventDefault()


    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
      const data = await response.json()
      console.log(data)

      if(data.data?.recipes) {
        setRecipeList(data?.data?.recipes)
        setLoading(false)
        setSearchParam('')
      }

    }catch(error){
      console.log(error)
      setLoading(false)
      setSearchParam('')
    }
  }

  console.log(loading, recipeList)

  return (
    <GlobalContext.Provider value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit }}>
      {children}
    </GlobalContext.Provider>
  )
}
