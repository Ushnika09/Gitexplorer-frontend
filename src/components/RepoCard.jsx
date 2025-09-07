import React, { useContext, useState } from "react";
import { BiBookmark, BiStar, BiX } from "react-icons/bi";
import { FaBookmark, FaCodeFork } from "react-icons/fa6";
import { GoShare } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import { BookmarkContext } from "../Context/BookmarkProvider";

export default function RepoCard({ data }) {
  const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarkContext);

  const [selectedRepo, setSelectedRepo] = useState(null);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ Unified bookmark check (Mongo _id + repoId inside doc)
  function isRepoBookmarked(repo) {
    return bookmarks.some(
      (b) => b.repoId === repo.id // always store repoId in DB
    );
  }

  function handleBookmarkClick(repo) {
    const existing = bookmarks.find((b) => b.repoId === repo.id);
    if (existing) {
      removeBookmark(existing._id); // ✅ remove by Mongo _id
    } else {
      setSelectedRepo(repo);
      setNote("");
      setShowModal(true);
    }
  }

  async function handleAddBookmark() {
    if (!selectedRepo) return;
    await addBookmark({
      repoId: selectedRepo.id, // ✅ consistent field name
      name: selectedRepo.name,
      owner: selectedRepo.owner.login,
      url: selectedRepo.html_url,
      language: selectedRepo.language || "Unknown",
      stargazers_count: selectedRepo.stargazers_count || 0,
      forks_count: selectedRepo.forks_count || 0,
      watchers_count: selectedRepo.watchers_count || 0, // ✅ use watchers_count
      created_at: selectedRepo.created_at,
      avatar: selectedRepo.owner.avatar_url,
      note: note.trim(),
      bookmarkedAt: new Date().toISOString(),
    });
    setShowModal(false);
    setSelectedRepo(null);
    setNote("");
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedRepo(null);
    setNote("");
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((repo) => {
          const bookmarked = isRepoBookmarked(repo);

          return (
            <div
              key={repo.id}
              className="flex flex-col justify-between gap-4 bg-white rounded-xl shadow-xl p-5 
                         transition-all duration-300 hover:scale-105 
                         hover:bg-gradient-to-br hover:from-purple-200 hover:via-purple-100 
                         border border-purple-700 hover:to-pink-200
                         min-h-[280px] xl:min-w-[380px]"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="rounded-full h-12 w-12"
                  />
                  <h1 className="text-sm md:text-lg font-medium">{repo.owner.login}</h1>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  {bookmarked ? (
                    <FaBookmark
                      className="cursor-pointer text-xl text-purple-600 fill-purple-600 hover:text-purple-500 transition"
                      onClick={() => handleBookmarkClick(repo)}
                      title="Remove bookmark"
                    />
                  ) : (
                    <BiBookmark
                      className="cursor-pointer text-xl text-gray-600 hover:text-purple-500 transition"
                      onClick={() => handleBookmarkClick(repo)}
                      title="Add bookmark"
                    />
                  )}

                  <a href={repo.clone_url} target="_blank" rel="noopener noreferrer">
                    <GoShare className="cursor-pointer text-xl hover:text-purple-500" title="Share repository" />
                  </a>
                </div>
              </div>

              {/* Repo Info */}
              <div className="flex flex-col gap-2">
                <Link
                  to={`/app/repodetails/${repo.owner.login}/${repo.name}`}
                  className="text-lg font-semibold truncate hover:text-purple-600 hover:underline transition-colors"
                >
                  {repo.name}
                </Link>
                <p className="text-gray-700 text-sm line-clamp-2">
                  {repo.description || "No description available"}
                </p>
                {repo.language && (
                  <span className="w-fit flex bg-purple-100 text-purple-800 text-xs font-medium px-3.5 py-1.5 rounded-full my-1.5">
                    {repo.language}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1.5 text-gray-600" title="Stars">
                  <BiStar className="text-yellow-500" />
                  <span className="text-sm">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600" title="Forks">
                  <FaCodeFork className="text-gray-500" />
                  <span className="text-sm">{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600" title="Watchers">
                  <IoEyeOutline className="text-blue-500" />
                  <span className="text-sm">{repo.watchers_count}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600" title="Created">
                  <CiCalendar className="text-green-500" />
                  <span className="text-xs">{moment(repo.created_at).fromNow()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add to Bookmarks</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <img
                src={selectedRepo.owner.avatar_url}
                alt={selectedRepo.owner.login}
                className="rounded-full h-10 w-10"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{selectedRepo.name}</h4>
                <p className="text-sm text-gray-600">by {selectedRepo.owner.login}</p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Add Note (Optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your note about this repository..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                rows="3"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBookmark}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center gap-2"
              >
                <FaBookmark className="text-lg" />
                Add to Bookmarks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
