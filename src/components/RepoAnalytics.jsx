import { useEffect, useState } from "react";
import { MdAutoGraph } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { useData } from "../Context/DataContext";
import { FaCircleInfo } from "react-icons/fa6";
import useFetchAllRepos from "../../utils/FetchAllRepos";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function RepoAnalytics() {
  const { data } = useData();
  const { totalStars, totalForks, totalIssues, mostUsedLanguage, loading } =
    useFetchAllRepos();

  return (
    <>
      {loading ? (
        <div className=" flex items-center h-[10rem] gap-3.5 justify-center my-7 rounded-xl bg-white shadow px-5 py-5 transition-all duration-300  ">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl text-purple-500" />
          <h1 className="text-3xl text-purple-500">Loading</h1>
        </div>
      ) : (
        <div className="grid-cols-1 grid items-center md:grid-cols-2 lg:grid-cols-4 justify-between py-5 gap-10 flex-wrap ">
          <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
            <div className="flex items-center gap-15 justify-between">
              <h1 className="font-medium text-nowrap">Total Repositories</h1>
              <MdAutoGraph />
            </div>
            <h1 className="text-4xl font-bold">
              {data.total_count ? data.total_count : 0}
            </h1>
            <h1 className="text-gray-600/90 text-sm text-nowrap">
              Most:{mostUsedLanguage}
            </h1>
          </div>

          <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
            <div className="flex items-center gap-7 justify-between">
              <div className="flex items-center gap-3.5">
                <h1 className="font-medium text-nowrap">Total Stars</h1>
                <FaRegStar />
              </div>

              {/* Info Icon with Tooltip */}
              <div className="relative group">
                <FaCircleInfo className="cursor-pointer text-gray-600 hover:text-gray-800" />

                {/* Tooltip */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                         whitespace-nowrap text-xs bg-gray-800 text-white 
                         px-2 py-1 rounded opacity-0 group-hover:opacity-100
                         transition-opacity duration-200"
                >
                  Based on sample of 1000 repos
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold">{totalStars}</h1>
            <h1 className="text-gray-600/90 text-sm text-nowrap">
              Avg {Math.ceil(totalStars / 1000)} per repo
            </h1>
          </div>

          <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
            <div className="flex items-center gap-15 justify-between">
              <div className="flex items-center gap-3.5">
                <h1 className="font-medium text-nowrap">Total Forks</h1>
                <FaCodeFork />
              </div>
              {/* Info Icon with Tooltip */}
              <div className="relative group">
                <FaCircleInfo className="cursor-pointer text-gray-600 hover:text-gray-800" />

                {/* Tooltip */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                         whitespace-nowrap text-xs bg-gray-800 text-white 
                         px-2 py-1 rounded opacity-0 group-hover:opacity-100
                         transition-opacity duration-200"
                >
                  Based on sample of 1000 repos
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold">{totalForks}</h1>
            <h1 className="text-gray-600/90 text-sm text-nowrap">
              Avg {Math.ceil(totalForks / 1000)} per repo
            </h1>
          </div>

          <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
            <div className="flex items-center gap-7 justify-between">
              <div className="flex items-center gap-3.5">
                <h1 className="font-medium text-nowrap">Open Issues</h1>
                <MdOutlineReportProblem />
              </div>
              {/* Info Icon with Tooltip */}
              <div className="relative group">
                <FaCircleInfo className="cursor-pointer text-gray-600 hover:text-gray-800" />

                {/* Tooltip */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                         whitespace-nowrap text-xs bg-gray-800 text-white 
                         px-2 py-1 rounded opacity-0 group-hover:opacity-100
                         transition-opacity duration-200"
                >
                  Based on sample of 1000 repos
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold">{totalIssues}</h1>
            <h1 className="text-gray-600/90 text-sm text-nowrap">
              Active development
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default RepoAnalytics;
