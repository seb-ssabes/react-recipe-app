import { useState } from "react";
import { GlobalContext } from "./GlobalContext";

export default function GlobalState({children}) {
  const [searchParam, setSearchParam] = useState('')

  return (
    <GlobalContext.Provider value={{ searchParam, setSearchParam }}>
      {children}
    </GlobalContext.Provider>
  )
}
