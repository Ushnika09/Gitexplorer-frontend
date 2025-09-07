import React, { useContext } from "react";
import { GoDotFill } from "react-icons/go";
import { AiFillGithub } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { BookmarkContext } from "../Context/BookmarkProvider";

function Hero() {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <div className="mx-3.5 my-5 px-2 py-12 flex justify-center items-center flex-col shadow-2xl border-8 rounded-3xl border-white bg-purple-100">
      <div className="flex gap-3 items shrink-0 py-5">
        {/* logo */}
        <div
          className="md:px-5 px-1.5 flex items-center bg-gradient-to-br from-blue-500 to-purple-600 
                  rounded-xl text-xl
                  transition-opacity duration-200
                  animate-bounce shrink-0"
        >
          <FiGithub className="text-white shrink-0 text-3xl" />
        </div>
        <h1
          className="text-4xl md:text-7xl font-black 
          bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500
          bg-clip-text text-transparent duration-100 transition-colors"
        >
          GitExplorer
        </h1>
      </div>
      <h1 className="md:text-2xl text-xl px-7 md:px-24 text-center py-5 font-semibold">
        Discover trending repositories, explore the GitHub ecosystem, and bookmark your favorites with{" "}
        <span className="bg-gradient-to-l from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
          detailed analytics
        </span>{" "}
        and insights.
      </h1>

      <div className="py-5 flex flex-wrap justify-center items-center gap-x-7 gap-y-2.5">
        <button className="flex gap-1 items-center justify-center px-4.5 py-3 rounded-xl bg-white hover:scale-105 transition-all duration-300 shadow">
          <GoDotFill className="text-green-600 animate-pulse text:2xl md:text-3xl" />
          <span className="font-semibold text-[0.8rem] md:text-xl text-nowrap">Real-time GitHub API</span>
        </button>
        <button className="flex gap-1 items-center justify-center px-4.5 py-3 rounded-xl bg-white hover:scale-105 transition-all duration-300 shadow">
          <AiFillGithub className="text-purple-600 text:2xl md:text-3xl" />
          <span className="font-semibold text-[0.8rem] md:text-xl text-nowrap">
            {bookmarks.length} bookmarked repos
          </span>
        </button>
      </div>
    </div>
  );
}

export default Hero;
