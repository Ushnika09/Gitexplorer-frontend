import React, { useContext } from "react";
import { BsBookmarks } from "react-icons/bs";
import Bookmarkdetails from "../components/Bookmarkdetails";
import { Link } from "react-router-dom";
import { BookmarkContext } from "../Context/BookmarkProvider"; // ✅ import context

function Bookmarks() {
  const { bookmarks } = useContext(BookmarkContext); // ✅ get bookmarks from context

  return (
    <div className="flex flex-col justify-center my-7 mx-5">
      <h1 className="flex gap-2.5 text-4xl font-bold items-center">
        <BsBookmarks className="text-purple-600" />
        <span>Bookmarked Repositories</span>
      </h1>
      <h1 className="text-gray-600/70 py-3.5 pb-12">
        Your saved repositories with personal notes and quick access
      </h1>

      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-2xl p-3.5 py-6 shadow flex flex-col gap-3 justify-center items-center">
          <BsBookmarks className="text-5xl text-gray-500 my-1.5" />
          <h1 className="font-bold text-2xl">No bookmarks yet</h1>
          <h1 className="text-xl text-gray-500 my-1.5">
            Start exploring repositories and bookmark your favorites to see them here.
          </h1>
          <Link
            to={"/app/home"}
            className="flex gap-1 font-bold py-2.5 px-5 md:px-10 rounded-2xl justify-center items-center repo bg-purple-500 text-white hover:bg-purple-500/70"
          >
            Explore Repositories
          </Link>
        </div>
      ) : (
        <Bookmarkdetails /> // ✅ shows analytics or bookmarked repos
      )}
    </div>
  );
}

export default Bookmarks;
