import React from "react";
import useFetchAllRepos from "../../utils/FetchAllRepos";
import { IoMdCode } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LanguageAnalysis() {
  const { topLanguages, loading } = useFetchAllRepos();

  // Total repos for percentage calculation
  const totalRepos = topLanguages.reduce((acc, lang) => acc + lang.count, 0);

  if (loading) {
    return (
      <div className="flex items-center h-[10rem] gap-3.5 justify-center my-7 rounded-xl bg-white shadow px-5 py-5 transition-all duration-300">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl text-purple-500" />
        <h1 className="text-3xl text-purple-500">Loading</h1>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <IoMdCode className="text-4xl font-bold text-purple-600" />
          Language Distribution
        </h2>

        {/* Info Tooltip */}
        <div className="relative group">
          <FaCircleInfo className="cursor-pointer text-xl text-gray-600 hover:text-gray-800" />
          <span
            className="absolute left-1/12 -translate-x-1/2 top-full mt-2
                       whitespace-nowrap text-xs bg-gray-800 text-white 
                       px-2 py-1 rounded opacity-0 group-hover:opacity-100
                       transition-opacity duration-200"
          >
            Based on sample of 125 repos
          </span>
        </div>
      </div>

      {/* Language Bars */}
      <div className="flex flex-col gap-5">
        {topLanguages.map((lang) => {
          const percentage = totalRepos ? (lang.count / totalRepos) * 100 : 0;
          return (
            <div key={lang.language} className="flex flex-col gap-2">
              {/* Language label and count */}
              <div className="flex justify-between text-sm font-medium">
                <span>{lang.language}</span>
                <span>
                  {lang.count} repos • {Math.round(percentage)}%
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden ">
                {/* Animated bar */}
                <div
                  className="h-5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-700"
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

export default LanguageAnalysis;
