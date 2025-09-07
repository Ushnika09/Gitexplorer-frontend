import React, { useContext, useMemo } from "react";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { BookmarkContext } from "../Context/BookmarkProvider";

function BookmarkAnalytics() {
  const { bookmarks } = useContext(BookmarkContext);

  // Compute analytics using useMemo for efficiency
  const analytics = useMemo(() => {
    let totalStars = 0;
    let totalForks = 0;
    let mostStarred = { name: "", stars: 0 };

    bookmarks.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;

      if ((repo.stargazers_count || 0) > mostStarred.stars) {
        mostStarred = { name: repo.name, stars: repo.stargazers_count };
      }
    });

    const avgStars = bookmarks.length ? Math.round(totalStars / bookmarks.length) : 0;

    return { totalStars, totalForks, mostStarred, avgStars };
  }, [bookmarks]);

  return (
    <div className="grid-cols-1 grid items-center md:grid-cols-2 lg:grid-cols-4 justify-between py-5 gap-10 flex-wrap mx-5">
      {/* Total Bookmarks */}
      <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
        <div className="flex items-center gap-10 justify-between">
          <h1 className="font-medium text-nowrap">Total Bookmarks</h1>
          <PiBookmarkSimpleBold />
        </div>
        <h1 className="text-4xl font-bold">{bookmarks.length}</h1>
        <h1 className="text-gray-600/90 text-sm text-nowrap">Personal collection</h1>
      </div>

      {/* Total Stars */}
      <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
        <div className="flex items-center gap-15 justify-between">
          <h1 className="font-medium text-nowrap">Total Stars</h1>
          <FaRegStar />
        </div>
        <h1 className="text-4xl font-bold">{analytics.totalStars}</h1>
        <h1 className="text-gray-600/90 text-sm text-nowrap">
          Avg {analytics.avgStars} per repo
        </h1>
      </div>

      {/* Total Forks */}
      <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
        <div className="flex items-center gap-15 justify-between">
          <h1 className="font-medium text-nowrap">Total Forks</h1>
          <FaCodeFork />
        </div>
        <h1 className="text-4xl font-bold">{analytics.totalForks}</h1>
        <h1 className="text-gray-600/90 text-sm text-nowrap">Community engagement</h1>
      </div>

      {/* Most Starred */}
      <div className="flex flex-col gap-1.5 shadow rounded-2xl flex-1 bg-white px-7.5 py-5.5">
        <div className="flex items-center gap-15 justify-between">
          <h1 className="font-medium text-nowrap">Most Starred</h1>
          <MdAutoGraph />
        </div>
        <h1 className="text-2xl font-bold">
          {analytics.mostStarred.name || "N/A"}
        </h1>
        <h1 className="text-gray-600/90 text-sm text-nowrap">
          {analytics.mostStarred.stars || 0} stars
        </h1>
      </div>
    </div>
  );
}

export default BookmarkAnalytics;
