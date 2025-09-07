import React, { useContext, useEffect, useRef, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { MdAutoGraph } from "react-icons/md";
import { BsBookmarks } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { BookmarkContext } from "../Context/BookmarkProvider";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { bookmarks } = useContext(BookmarkContext);
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    
    // Redirect to home page
    navigate("/");
    
    // Close mobile menu if open
    setOpen(false);
  };

  return (
    <div className="">
      <div className="py-4 shadow px-5 flex items-center justify-between w-full transition-all duration-700 fixed top-0 bg-white/90 z-50">
        {/* overlay */}
        {open && (
          <div
            className="inset-0 bg-black/60 fixed z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* left */}
        <div className="flex gap-3 items bg-gradient-to-l from-blue-500 to-purple-600 bg-clip-text text-transparent ">
          <div
            className="py-3.5 px-3.5 flex items-center bg-gradient-to-br from-blue-500 to-purple-600 
            rounded-xl  text-2xl
            transition-opacity duration-200"
          >
            <FiGithub className="text-white " />
          </div>
          <div>
            <h1 className="text-2xl font-bold">GitExplorer</h1>
            <h1 className="text-sm text-gray-700/60 text-nowrap">
              Discover GitHub repositories
            </h1>
          </div>
        </div>

        {/* middle - Show on lg screens and above */}
        <div className="hidden lg:flex lg:gap-4 gap-1.5 transition-all duration-300">
          <Link
            to="/app/home"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/app/home"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <FiGithub />
            <span>Explorer</span>
          </Link>

          <Link
            to="/app/analytics"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/app/analytics"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <MdAutoGraph />
            <span>Analytics</span>
          </Link>

          <Link
            to="/app/bookmarks"
            className={`transition-all duration-300 flex gap-2 px-5 py-2 rounded-3xl font-medium items-center ${
              location.pathname === "/app/bookmarks"
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <BsBookmarks />
            <span>Bookmarks</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-semibold">
              {bookmarks.length}
            </span>
          </Link>
        </div>

        {/* right - Show on lg screens and above */}
        <div className="hidden lg:flex flex-row items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          )}
          
        </div>

        {/* Hamburger menu - Show on screens smaller than lg */}
        <GiHamburgerMenu
          className="text-2xl lg:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Mobile menu - Show on screens smaller than lg */}
      {open && (
        <div className="flex flex-col fixed top-0 right-0 pt-5 z-50 items-center justify-start bg-white w-64 min-h-screen shadow transition-all duration-700 lg:hidden">
          <RxCross2
            className="absolute right-5 top-5 text-xl rounded-full border cursor-pointer"
            onClick={() => setOpen(false)}
          />
          {/* left */}
          <div className="flex gap-3 items-center my-5">
            <div className=" flex items-center  shrink-0">
              <FiGithub className="text-white text-4xl shrink-0  bg-blue-700 rounded-full p-2" />
            </div>
            <div>
              <h1 className="text-xl font-bold ">GitExplorer</h1>
              <h1 className="text-[0.7rem] text-gray-700/60 text-nowrap">
                Discover GitHub repositories
              </h1>
            </div>
          </div>

          {/* User info in mobile menu */}
          {user && (
            <div className="w-full px-5 py-3 border-b border-gray-200">
              <p className="text-sm text-gray-700">Welcome, {user.name}</p>
            </div>
          )}

          {/* middle */}
          <div className="flex flex-col gap-1.5 transition-all duration-300 my-5 w-full">
            <Link
              to="/app/home"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/app/home"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
              onClick={() => setOpen(false)}
            >
              <FiGithub />
              <span>Explorer</span>
            </Link>

            <Link
              to="/app/analytics"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/app/analytics"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
              onClick={() => setOpen(false)}
            >
              <MdAutoGraph />
              <span>Analytics</span>
            </Link>

            <Link
              to="/app/bookmarks"
              className={`transition-all duration-300 flex gap-2 px-5 py-2 font-medium items-center ${
                location.pathname === "/app/bookmarks"
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-white hover:bg-neutral-200"
              }`}
              onClick={() => setOpen(false)}
            >
              <BsBookmarks />
              <span>Bookmarks</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-semibold">
                {bookmarks.length}
              </span>
            </Link>
          </div>

          {/* Logout button in mobile menu */}
          {user && (
            <div className="w-full px-5 mt-auto mb-5">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          )}

          {/* right */}
          <div className="flex flex-col mx-3 rounded-2xl justify-center items-center py-4 px-2 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 ">
            <button
              className={`transition-all duration-300 flex gap-1 px-3 py-1.5  font-medium items-center text-15803D 
            w-full
             shrink-0`}
            >
              <div className="p-1.5 rounded-full animate-pulse bg-green-200">
                <IoMdTrendingUp className=" " />
              </div>
              <span className="text-nowrap">Live Data</span>
            </button>
            <p className="text-center text-sm pb-3">
              Explore real-time trending repositories from GitHub's API
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;