import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

export default function GlobalState({children}) {
  const [searchParam, setSearchParam] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
      const data = await response.json()
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit }}>
      {children}
    </GlobalContext.Provider>
  )
}
