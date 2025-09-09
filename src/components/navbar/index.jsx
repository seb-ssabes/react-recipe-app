import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";


export default function Navbar() {

  const {searchParam, setSearchParam} = useContext(GlobalContext)


  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col   lg:flex">
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>
          Food Recipe
        </NavLink>
      </h2>
      <form>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
          placeholder="Enter items"
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-gray-100 focus:shadow-gray-200"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-gray-800 hover:text-gray-300 duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to={"/favorites"}
            className="text-gray-800 hover:text-gray-300 duration-300 pl-5"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
