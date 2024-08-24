import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const navItem = ["Home", "Category", "Product", "Salesdatails"];

// navBar component
const Navbar = () => {
  const { handleLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full flex items-center justify-around">
      <ul className="flex gap-5 my-4">
        {user.isAdmin ? (
          navItem?.map((ele) => (
            <li key={ele} className="text-lg">
              <NavLink
                className="text-blue-500 hover:border-b-blue-700 hover:border-b-2"
                to={`/${ele.toLowerCase()}`}
              >
                {ele}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="text-lg">
            <NavLink
              className="text-blue-500 hover:border-b-blue-700 hover:border-b-2"
              to={`/${navItem[0].toLowerCase()}`}
            >
              {navItem[0]}
            </NavLink>
          </li>
        )}
      </ul>
      <button
        className="mt-4 bg-white text-blue-500 px-4 py-2 rounded border-blue-500 border-[1px]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
