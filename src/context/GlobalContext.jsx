import { useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export default function GlobalState({children}) {
  const [searchParam, setSearchParam] = useState('')
  const [loading, setLoading] = useState(false)
  const [recipeList, setRecipeList] = useState([])
  const [recipeDetailsData, setRecipeDetailsData] = useState(null)
  const [favoritesList, setFavoritesList] = useState([])

  const navigate = useNavigate()


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
        navigate('/')
      }

    }catch(error){
      console.log(error)
      setLoading(false)
      setSearchParam('')
    }
  }

  function handleAddToFavorites(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id)

    if (index === -1) {
      cpyFavoritesList.push(getCurrentItem)
    } else {
      cpyFavoritesList.splice(index)
    }

    setFavoritesList(cpyFavoritesList)
  }

  console.log(favoritesList, 'favoritesList')


  return (
    <GlobalContext.Provider value={{ searchParam, loading, recipeList, recipeDetailsData, favoritesList, handleAddToFavorites, setSearchParam, handleSubmit, setRecipeDetailsData }}>
      {children}
    </GlobalContext.Provider>
  )
}
