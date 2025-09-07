import React, { useContext, useState } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { BiStar, BiBookmark, BiEdit, BiX } from "react-icons/bi";
import { FaCodeFork, FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";

function RecentBookmarks() {
  const { bookmarks, removeBookmark, setBookmarks } = useContext(BookmarkContext);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (bookmarks.length === 0)
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-purple-100">
        <BiBookmark className="text-4xl text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Start bookmarking repositories to see them here</p>
      </div>
    );

  // Sort by most recent (assuming bookmarkedAt or created_at for sorting)
  const recent = [...bookmarks]
    .sort((a, b) => new Date(b.bookmarkedAt || b.created_at) - new Date(a.bookmarkedAt || a.created_at))
    .slice(0, 5);

  // Open modal for editing note
  const handleEditClick = (repo, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRepo(repo);
    setNote(repo.note || "");
    setIsEditing(true);
    setShowModal(true);
  };

  // Remove bookmark
  const handleRemoveBookmark = (repoId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeBookmark(repoId);
  };

  // Save note
  const handleSaveNote = () => {
    if (selectedRepo) {
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === selectedRepo.id
            ? { ...bookmark, note: note.trim(), bookmarkedAt: bookmark.bookmarkedAt || new Date().toISOString() }
            : bookmark
        )
      );
      setShowModal(false);
      setSelectedRepo(null);
      setNote("");
      setIsEditing(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRepo(null);
    setNote("");
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 border border-purple-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-purple-100">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
            <BiBookmark className="text-xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Recent Bookmarks</h2>
            <p className="text-sm text-gray-500">Your most recently saved repositories</p>
          </div>
          <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            {bookmarks.length} total
          </span>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-3">
          {recent.map((repo) => (
            <div
              key={repo.id}
              className="flex justify-between items-center p-4 rounded-xl border border-purple-50 
                       hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-purple-100/30 
                       transition-all duration-300 group relative"
            >
              {/* Action Buttons - Always visible but more prominent on hover */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={(e) => handleEditClick(repo, e)}
                  className="p-1.5 bg-purple-100 text-purple-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-200"
                  title="Edit note"
                >
                  <BiEdit className="text-lg" />
                </button>
                <button
                  onClick={(e) => handleRemoveBookmark(repo.id, e)}
                  className="p-1.5 bg-red-100 text-red-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-200"
                  title="Remove bookmark"
                >
                  <BiX className="text-lg" />
                </button>
              </div>

              <div className="flex justify-between items-center flex-1 min-w-0 pr-10">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={repo.avatar}
                    alt={repo.owner}
                    className="h-12 w-12 rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-800 truncate group-hover:text-purple-700 transition-colors"
                    >
                      {repo.name}
                    </a>
                    <span className="text-gray-500 text-sm">
                      by <span className="font-medium text-purple-600">{repo.owner}</span>
                    </span>
                    {repo.note && (
                      <span className="text-xs text-purple-600 mt-1 italic truncate" title={repo.note}>
                        "{repo.note}"
                      </span>
                    )}
                    <span className="text-xs text-gray-400 mt-1">
                      Added {moment(repo.bookmarkedAt || repo.created_at).fromNow()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-center text-gray-600 ml-4">
                  <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg">
                    <BiStar className="text-yellow-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.stargazers_count || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-lg">
                    <FaCodeFork className="text-gray-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">
                      {repo.forks_count || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {bookmarks.length > 5 && (
          <div className="pt-4 mt-2 border-t border-purple-100">
            <Link
              to="/app/bookmarks"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 justify-center group"
            >
              View all bookmarks
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Note Modal */}
      {showModal && selectedRepo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {isEditing ? "Edit Note" : "Add Note"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={selectedRepo.avatar}
                  alt={selectedRepo.owner}
                  className="rounded-full h-10 w-10"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{selectedRepo.name}</h4>
                  <p className="text-sm text-gray-600">by {selectedRepo.owner}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
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
                onClick={handleSaveNote}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors flex items-center gap-2"
              >
                <FaBookmark className="text-lg" />
                {isEditing ? "Update Note" : "Save Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecentBookmarks;