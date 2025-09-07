import React, { useContext, useState, useMemo } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { BiStar, BiBookmark, BiSearch, BiSort, BiTrash, BiX } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";

function Bookmarks() {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useContext(BookmarkContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Get unique languages from bookmarks
  const languages = useMemo(() => {
    const langSet = new Set();
    bookmarks.forEach(bookmark => {
      if (bookmark.language) {
        langSet.add(bookmark.language);
      }
    });
    return ["all", ...Array.from(langSet).sort()];
  }, [bookmarks]);

  // Filter and sort bookmarks
  const filteredBookmarks = useMemo(() => {
    let filtered = [...bookmarks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(bookmark =>
        bookmark.name.toLowerCase().includes(query) ||
        bookmark.owner.toLowerCase().includes(query) ||
        (bookmark.description && bookmark.description.toLowerCase().includes(query))
      );
    }

    // Language filter
    if (filterLanguage !== "all") {
      filtered = filtered.filter(bookmark => bookmark.language === filterLanguage);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "stars-high":
          return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        case "stars-low":
          return (a.stargazers_count || 0) - (b.stargazers_count || 0);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bookmarks, searchQuery, sortOrder, filterLanguage]);

  const handleRemoveBookmark = (e, repoId) => {
    e.preventDefault();
    e.stopPropagation();
    removeBookmark(repoId);
  };

  const handleClearAll = () => {
    clearAllBookmarks();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-xl rounded-3xl p-8 mb-8 border border-purple-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                <BiBookmark className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Bookmarks</h1>
                <p className="text-gray-600">Your saved repositories in one place</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                {bookmarks.length} {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
              </span>
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
              >
                <BiTrash className="text-lg" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Clear All Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Clear All Bookmarks</h3>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <BiX className="text-2xl" />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all {bookmarks.length} bookmarks? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <BiTrash className="text-lg" />
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 mb-8 border border-purple-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Bookmarks</label>
              <div className="relative">
                <BiSearch className="text-2xl absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  placeholder="Search by name, owner, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-purple-100 rounded-xl bg-purple-50 focus:bg-white focus:ring-3 focus:ring-purple-400 focus:outline-none transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <BiX className="text-xl" />
                  </button>
                )}
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Language</label>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl bg-purple-50 focus:ring-3 focus:ring-purple-400 focus:outline-none appearance-none"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <div className="relative">
                <BiSort className="text-2xl absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-purple-100 rounded-xl bg-purple-50 focus:ring-3 focus:ring-purple-400 focus:outline-none appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="stars-high">Most Stars</option>
                  <option value="stars-low">Fewest Stars</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Counter */}
          {searchQuery || filterLanguage !== "all" ? (
            <div className="mt-6 pt-6 border-t border-purple-100">
              <p className="text-purple-600 font-medium">
                Showing {filteredBookmarks.length} of {bookmarks.length} bookmarks
                {searchQuery && ` matching "${searchQuery}"`}
                {filterLanguage !== "all" && ` in ${filterLanguage}`}
              </p>
            </div>
          ) : null}
        </div>

        {/* Bookmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookmarks.map((repo) => (
            <div
              key={repo.id}
              className="bg-white rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleRemoveBookmark(e, repo.id)}
                className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-200 z-10"
                title="Remove bookmark"
              >
                <BiTrash className="text-lg" />
              </button>

              <Link to={repo.url} target="_blank" className="block h-full">
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={repo.avatar}
                      alt={repo.owner}
                      className="h-14 w-14 rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-colors"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-700 transition-colors truncate">
                      {repo.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      {repo.language && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        Updated {moment(repo.updated_at).fromNow()}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <BiStar className="text-yellow-500" />
                        <span className="text-sm font-medium">{repo.stargazers_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCodeFork className="text-gray-500" />
                        <span className="text-sm font-medium">{repo.forks_count || 0}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      Created {moment(repo.created_at).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty Search Results */}
        {filteredBookmarks.length === 0 && (searchQuery || filterLanguage !== "all") && (
          <div className="bg-white shadow-xl rounded-3xl p-12 text-center border border-purple-200 mt-8">
            <BiSearch className="text-4xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matching bookmarks</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;