import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut().then().catch();
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 border-b-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu z-50 menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className="block p-2 ">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" className="block p-2">
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookings" className="block p-2">
                My Bookings
              </NavLink>
            </li>
            <li>
            <NavLink to="/about" className="block p-2">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="block p-2">
              contact Us
            </NavLink>
          </li>
          </ul>
        </div>
        <a className="btn hidden md:block  btn-ghost font-sans text-gray-600 text-xl md:text-2xl"><span className="text-yellow-600 font-bold font-sans">Residence</span>Hotel</a>
        <a className="btn flex md:hidden  btn-ghost font-sans text-gray-600 text-xl md:text-2xl"><span className="text-yellow-600 font-bold font-sans">R</span>H</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-sans">
          <li>
            <NavLink to="/" className="block p-2">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className="block p-2">
              Rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookings" className="block p-2">
              My Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="block p-2">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="block p-2">
              contact Us
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {/* Equip Now / Logout Button */}
        {user ? (
          <button
            onClick={handleSignOut}
            className="btn btn-ghost text-base mr-1 bg-yellow-600 text-white font-mono"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 font-semibold py-2 bg-yellow-600 font-sans hover:bg-yellow-700 text-white rounded"
          >
            Login Now
          </Link>
        )}


{user ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-2 md:flex-row-reverse flex-row">
            <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="size-10 mx-auto rounded-full ring ring-yellow-300 text-center"
          />
            <h2 className="text-xs hidden md:block font-serif font-extralight">Welcome {user?.displayName}</h2>
            </div>
          
          </div>
        ) : (
          <div></div>
        )}


        

       
      </div>
    </div>
  );
};

export default Navbar;
