import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { RiArrowDropDownFill, RiSortAsc, RiSortDesc } from "react-icons/ri";
import FiltersDropdown from "./FiltersDropdown";
import RepoAction from "./RepoAction";
import githubGet from "../../utils/Githubapi";
import { useData } from "../Context/DataContext";
import RepoCard from "./RepoCard";

function Repos() {
  const { val, setVal } = useData();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated"); // default: recent first
  const [order, setOrder] = useState("desc");      // newest first
  const [allRepos, setAllRepos] = useState([]);    // raw fetched repos
  const [repos, setRepos] = useState([]);          // filtered repos
  const [isLoading, setIsLoading] = useState(false);

  // 🔎 Fetch GitHub repos
  const fetchSearchRepo = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await githubGet("/search/repositories", {
        q: `${query} in:name`,
        sort: "updated", // fetch most recent first
        order: "desc",
      });

      let reposFetched = res?.items || res?.data?.items || [];

      // Filter names starting with query
      reposFetched = reposFetched.filter((repo) =>
        repo.name.toLowerCase().startsWith(query.toLowerCase())
      );

      setAllRepos(reposFetched);
      setQuery(""); // Clear search query after successful search
    } catch (error) {
      console.error("Error fetching repos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Apply filters & sorting
  useEffect(() => {
    let filtered = [...allRepos];

    // Language filter
    if (val?.language) {
      filtered = filtered.filter(
        (repo) => repo.language?.toLowerCase() === val.language.toLowerCase()
      );
    }

    // Minimum stars filter
    if (val?.minStars) {
      filtered = filtered.filter(
        (repo) => repo.stargazers_count >= val.minStars
      );
    }

    // Created filter
    if (val?.created && val.created !== "Any time") {
      const now = new Date();
      filtered = filtered.filter((repo) => {
        const createdDate = new Date(repo.created_at);
        if (val.created === "Past week")
          return now - createdDate <= 7 * 24 * 60 * 60 * 1000;
        if (val.created === "Past month")
          return now - createdDate <= 30 * 24 * 60 * 60 * 1000;
        return true;
      });
    }

    // Sort fallback (client-side)
    if (sortBy === "stars") {
      filtered.sort((a, b) =>
        order === "asc"
          ? a.stargazers_count - b.stargazers_count
          : b.stargazers_count - a.stargazers_count
      );
    } else if (sortBy === "forks") {
      filtered.sort((a, b) =>
        order === "asc" ? a.forks_count - b.forks_count : b.forks_count - a.forks_count
      );
    } else if (sortBy === "updated") {
      filtered.sort((a, b) =>
        order === "asc"
          ? new Date(a.updated_at) - new Date(b.updated_at)
          : new Date(b.updated_at) - new Date(a.updated_at)
      );
    }

    setRepos(filtered);
  }, [val, sortBy, order, allRepos]);

  // 🔹 Handle search
  const handleClick = () => fetchSearchRepo();
  const handleKeyDown = (e) => e.key === "Enter" && fetchSearchRepo();

  return (
    <div className="flex flex-col items-start gap-6 justify-center max-w-6xl mx-auto w-full">
      {/* Search Section */}
      <div className="w-full rounded-2xl bg-white shadow-lg px-8 py-8 transition-all duration-300 gap-6 flex flex-col items-start justify-center border border-purple-100">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-800">
            Search Repositories
          </h1>
        </div>

        {/* Search Box */}
        <div className="relative w-full">
          <div className="relative flex items-center">
            <BiSearch className="text-2xl absolute left-4 text-purple-500 z-10" />
            <input
              type="text"
              placeholder="Search Repositories..."
              className="px-4 pl-12 py-4 w-full border-2 border-purple-200 rounded-2xl 
                         bg-purple-50 focus:bg-white focus:ring-3 focus:ring-purple-400 
                         focus:outline-none transition-all duration-300 text-gray-800
                         placeholder-purple-300"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              value={query}
            />
            <button
              className={`absolute right-2 rounded-xl py-3 px-6 font-semibold transition-all duration-300
                        ${query.trim() && !isLoading
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              onClick={handleClick}
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Sorting + Filters */}
        <div className="flex flex-wrap gap-4 items-center my-2 w-full">
          <h2 className="font-bold text-lg text-gray-700 flex items-center gap-2">
            <RiSortAsc className="text-purple-600" />
            Sort By:
          </h2>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-2.5 rounded-xl bg-purple-50 border border-purple-200 
                         appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none
                         hover:bg-purple-100 transition text-gray-800 font-medium
                         cursor-pointer pr-10"
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">Updated</option>
            </select>
            <RiArrowDropDownFill className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-purple-600 pointer-events-none" />
          </div>

          {/* Order Dropdown */}
          <div className="relative">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="px-5 py-2.5 rounded-xl bg-purple-50 border border-purple-200 
                         appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none
                         hover:bg-purple-100 transition text-gray-800 font-medium
                         cursor-pointer pr-10"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <RiArrowDropDownFill className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-purple-600 pointer-events-none" />
          </div>

          {/* Filters */}
          <FiltersDropdown val={val} setVal={setVal} />
        </div>

        {/* Active Filters Display */}
        {Object.values(val).some(v => v && v !== "Any time") && (
          <div className="flex flex-wrap gap-2 mt-2">
            {val.language && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Language: {val.language}
              </span>
            )}
            {val.minStars > 0 && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Min Stars: {val.minStars}+
              </span>
            )}
            {val.created && val.created !== "Any time" && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Created: {val.created}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Section */}
      {isLoading ? (
        <div className="w-full flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : repos.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">
              Repository Results
            </h1>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {repos.length} {repos.length === 1 ? 'repository' : 'repositories'}
            </span>
          </div>
          <RepoCard data={repos} />
        </div>
      ) : (
        allRepos.length === 0 && <RepoAction />
      )}
    </div>
  );
}

export default Repos;