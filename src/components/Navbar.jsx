import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const navItem = ["Home", "Category", "Product", "Salesdatails"];

const Navbar = () => {
  const { handleLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full flex items-center justify-around">
      <ul className="flex gap-5 my-4">
        {user.isAdmin ? (
          navItem?.map((ele) => (
            <li key={ele} className="text-2xl">
              <NavLink to={`/${ele.toLowerCase()}`}>{ele}</NavLink>
            </li>
          ))
        ) : (
          <li className="text-2xl">
            <NavLink to={`/${navItem[0].toLowerCase()}`}>{navItem[0]}</NavLink>
          </li>
        )}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
