import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-5 bg-white shadow-md items-center z-10">
        <h2 className="cursor-pointer font-medium text-xl font-semibold">
          <Link to="/" className="text-gray-800 hover:text-blue-500 transition">
            TaskFlow
          </Link>
        </h2>
        <ul className="hidden md:flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md transition">
                <Link
                  to="/tasks/add"
                  className="block w-full h-full px-4 py-2 flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Add task
                </Link>
              </li>
              <li
                className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-md text-gray-800 hover:text-blue-500"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-md text-gray-800 hover:text-blue-500">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <span
          className="md:hidden cursor-pointer text-gray-800 hover:text-blue-500"
          onClick={toggleNavbar}
        >
          <i className="fa-solid fa-bars"></i>
        </span>
        <div
          className={`fixed md:hidden right-0 top-0 bottom-0 transition-transform duration-300 ease-in-out ${
            isNavbarOpen ? "translate-x-0" : "translate-x-full"
          } bg-white shadow-md w-screen sm:w-9/12 h-screen z-20`}
        >
          <div className="flex justify-end">
            <span
              className="m-4 cursor-pointer text-gray-800 hover:text-blue-500"
              onClick={toggleNavbar}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center mt-8">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium transition py-2 px-3 rounded-md">
                  <Link
                    to="/tasks/add"
                    className="block w-full h-full flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-plus"></i> Add task
                  </Link>
                </li>
                <li
                  className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-md text-gray-800 hover:text-blue-500"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition rounded-md text-gray-800 hover:text-blue-500">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
