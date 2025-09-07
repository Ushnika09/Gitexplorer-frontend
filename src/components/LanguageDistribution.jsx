import React, { useContext, useMemo } from "react";
import { BookmarkContext } from "../Context/BookmarkProvider";
import { IoMdCode } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";

function LanguageDistribution() {
  const { bookmarks } = useContext(BookmarkContext);

  // Count repos per language
  const topLanguages = useMemo(() => {
    const counts = {};
    bookmarks.forEach((repo) => {
      const lang = repo.language || "Not Specified";
      counts[lang] = (counts[lang] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);
  }, [bookmarks]);

  const total = topLanguages.reduce((acc, lang) => acc + lang.count, 0);

  if (bookmarks.length === 0)
    return (
      <div className="bg-white shadow rounded-2xl p-6 text-center text-gray-600">
        No bookmarks to analyze
      </div>
    );

  return (
    <div className="bg-white shadow rounded-3xl p-6 mx-4 border-purple-200 border-0">
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <IoMdCode className="text-4xl text-purple-600" /> Language Distribution
        </h2>
        <div className="relative group">
          <FaCircleInfo className="cursor-pointer text-xl text-gray-600 hover:text-gray-800" />
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Based on bookmarked repos
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4">
        {topLanguages.map((lang) => {
          const percentage = total ? (lang.count / total) * 100 : 0;
          return (
            <div key={lang.language} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm font-medium">
                <span>{lang.language}</span>
                <span>
                  {lang.count} repo{lang.count > 1 ? "s" : ""} •{" "}
                  {Math.round(percentage)}%
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageDistribution;
