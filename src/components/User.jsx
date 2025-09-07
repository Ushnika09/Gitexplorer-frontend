import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import UserAction from "./UserAction";
import UserList from "./UserList";
import githubGet from "../../utils/Githubapi";
import { VscLoading } from "react-icons/vsc";

function User() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await githubGet("search/users", {
        q: `${query} in:login`,
        per_page: 20,
      });

      const filtered = data.items.filter((user) =>
        user.login.toLowerCase().startsWith(query.toLowerCase())
      );

      setResults(filtered);
      setQuery("")
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-6 justify-center max-w-6xl mx-auto w-full py-6">
      {/* Search Section */}
      <div className="w-full rounded-2xl bg-white shadow-lg px-8 py-8 transition-all duration-300 flex flex-col items-start justify-center border border-purple-100">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-800">Search GitHub Users</h1>
        </div>

        {/* Search Box */}
        <div className="relative w-full">
          <div className="relative flex items-center">
            <BiSearch className="text-2xl absolute left-4 text-purple-500 z-10" />
            <input
              type="text"
              placeholder="Enter username to search..."
              className="px-4 pl-12 py-4 w-full border-2 border-purple-200 rounded-2xl 
                         bg-purple-50 focus:bg-white focus:ring-3 focus:ring-purple-400 
                         focus:outline-none transition-all duration-300 text-gray-800
                         placeholder-purple-300"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick();
                }
              }}
            />
            <button
              className={`absolute right-2 rounded-xl py-3 px-6 font-semibold transition-all duration-300
                        ${query.trim()
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              onClick={handleClick}
              disabled={!query.trim() || loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          
          {/* Help Text */}
          <p className="text-sm text-purple-600 mt-3 ml-1">
            Search for GitHub users by their username
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-lg">
          <VscLoading className="text-4xl animate-spin text-purple-500 mb-3" />
          <p className="text-gray-600 font-medium">Searching users...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={handleClick}
            className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Before search / Empty results */}
      {!loading && results.length === 0 && !error && (
        <div className="w-full">
          <UserAction />
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && !loading && (
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {results.length} {results.length === 1 ? 'user' : 'users'} found
            </span>
          </div>
          <UserList users={results} />
        </div>
      )}
    </div>
  );
}

export default User;