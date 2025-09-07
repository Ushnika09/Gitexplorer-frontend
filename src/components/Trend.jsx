import React, { useContext, useState } from "react";
import DataProvider, { DataContext } from "../Context/DataContext";
import RepoCard from "./RepoCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosTrendingUp } from "react-icons/io";

function Trend() {
  const [active, setActive] = useState("today");
  const Languages = [
    "All languages",
    "JavaScript",
    "Python",
    "Java",
    "TypeScript",
    "C#",
    "C++",
    "PHP",
    "C",
    "React",
    "Ruby",
  ];

  const { data, val, setVal, loading } = useContext(DataContext);
  let repos = data.items || [];

  function getDateRange(type) {
    const now = new Date();
    let daysAgo = 1; // default = Today (yesterday actually)

    if (type === "week") daysAgo = 7;
    if (type === "month") daysAgo = 30;

    const target = new Date(now.setDate(now.getDate() - daysAgo));
    return target.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      {/* Trending Filters Section */}
      <div className="flex flex-col items-start gap-6 justify-center rounded-2xl bg-white shadow-lg px-8 py-8 transition-all duration-300 border border-purple-100">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-800">Trending Repositories</h1>
        </div>

        {/* Time Range Section */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <IoIosTrendingUp className="text-purple-600" />
            Time Range
          </h2>
          <div className="flex gap-3 flex-wrap">
            {[
              { key: "today", label: "Today" },
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" }
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  active === key
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 shadow-md"
                }`}
                onClick={() => {
                  setActive(key);
                  setVal({ ...val, time: getDateRange(key) });
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Filter Section */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Language</h2>
          <div className="flex gap-3 flex-wrap">
            {Languages.map((item) => (
              <button
                key={item}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  val.lang === item
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 shadow-md"
                }`}
                onClick={() => setVal({ ...val, lang: item === "All languages" ? "" : item })}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {(val.time || val.lang) && (
          <div className="w-full pt-4 mt-4 border-t border-purple-100">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Filters:</h3>
            <div className="flex flex-wrap gap-2">
              {val.time && (
                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {active === "today" ? "Today" : active === "week" ? "This Week" : "This Month"}
                </span>
              )}
              {val.lang && (
                <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Language: {val.lang}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white shadow-lg">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading trending repositories...</h2>
          <p className="text-gray-500 mt-2">This may take a moment</p>
        </div>
      )}

      {/* Results Section */}
      {!loading && repos.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Trending Results</h2>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {repos.length} {repos.length === 1 ? 'repository' : 'repositories'}
            </span>
          </div>
          <RepoCard data={repos} val={val} />
        </div>
      )}

      {/* No Results State */}
      {!loading && repos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl bg-white shadow-lg text-center">
          <IoIosTrendingUp className="text-4xl text-purple-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No trending repositories found</h2>
          <p className="text-gray-500">Try adjusting your filters or check back later</p>
        </div>
      )}
    </div>
  );
}

export default Trend;