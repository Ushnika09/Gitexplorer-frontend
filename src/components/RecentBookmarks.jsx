import React, { useContext } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { BiStar, BiBookmark, BiX } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import moment from "moment";

function RecentBookmarks() {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);

  if (bookmarks.length === 0)
    return (
      <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
        <BiBookmark className="text-4xl text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Start bookmarking repositories to see them here</p>
      </div>
    );

  // Show 5 most recent bookmarks
  const recent = [...bookmarks]
    .sort((a, b) => new Date(b.bookmarkedAt || b.created_at) - new Date(a.bookmarkedAt || a.created_at))
    .slice(0, 5);

  // Remove bookmark
  const handleRemoveBookmark = (repoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeBookmark(repoId);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
          <BiBookmark className="text-xl text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Recent Bookmarks</h2>
          <p className="text-sm text-gray-500">Your most recently saved repositories</p>
        </div>
        <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {bookmarks.length} total
        </span>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {recent.map((repo) => (
          <div
            key={repo._id}
            className="flex justify-between items-center p-4 rounded-lg border border-gray-200 
                       hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group relative"
          >


            {/* Repo Info */}
            <div className="flex justify-between items-center flex-1 min-w-0 pr-10">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  src={repo.avatar}
                  alt={repo.owner}
                  className="h-10 w-10 rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-800 truncate hover:text-blue-600 transition-colors"
                  >
                    {repo.name}
                  </a>
                  <span className="text-gray-500 text-sm">
                    by <span className="font-medium text-gray-700">{repo.owner}</span>
                  </span>
                  {repo.note && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-600 italic">"{repo.note}"</p>
                    </div>
                  )}
                  <span className="text-xs text-gray-400 mt-2">
                    Added {moment(repo.bookmarkedAt || repo.created_at).fromNow()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-center text-gray-600 ml-4">
                <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-md">
                  <BiStar className="text-yellow-500 text-lg" />
                  <span className="text-sm font-semibold text-gray-700">{repo.stargazers_count || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
                  <FaCodeFork className="text-gray-500 text-lg" />
                  <span className="text-sm font-semibold text-gray-700">{repo.forks_count || 0}</span>
                </div>
                            {/* Remove Button */}
            <div className="">
              <button
                onClick={(e) => handleRemoveBookmark(repo._id, e)}
                className="p-1.5 bg-gray-100 text-gray-600 rounded-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-100 hover:text-red-600"
                title="Remove bookmark"
              >
                <BiX className="text-lg" />
              </button>
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBookmarks;