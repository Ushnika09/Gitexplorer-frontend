import React, { useEffect, useState } from "react";
import RepoAnalytics from "./RepoAnalytics";
import BookmarkAnalytics from "./BookmarkAnalytics";
import Languageanaysis from "./Languageanaysis";
import Top10 from "./Top10";
import LanguageDistribution from "./LanguageDistribution";
import RecentBookmarks from "./RecentBookmarks";

function AnalyticsSection() {
  const [active, setActive] = useState("repo");


  

  return (
    <div className="flex flex-col justify-center my-12 mb-22 gap-5">
        <div className="flex  gap-4 items-center ">
      <button
        className={`flex gap-1 text-sm md:text-xl font-medium md:font-bold py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center repo ${
          active == "repo"
            ? "bg-purple-500 text-white hover:bg-purple-500/70"
            : "bg-purple-200/60 hover:bg-purple-200"
        }`}
        onClick={() => setActive("repo")}
      >
        <span className="text-nowrap">Repository Analytics</span>
      </button>

      <button
        className={`flex gap-1 text-sm md:text-xl font-medium md:font-bold py-1.5 px-5 md:px-10 rounded-2xl justify-center items-center bookmarks ${
          active == "bookmarks"
            ? "bg-purple-500 text-white hover:bg-purple-500/70"
            : "bg-purple-200/60 hover:bg-purple-200"
        }`}
        onClick={() => setActive("bookmarks")}
      >
        <span className="text-nowrap">Bookmark Analytics</span>
      </button>
    </div>
    {
        (active=="repo" ? (<>
        <RepoAnalytics/>
          <Languageanaysis/>
          <Top10/>
        </>
        )
         : <>
         <BookmarkAnalytics/>
         <LanguageDistribution/>
         <RecentBookmarks/>
         </>)
    }
    </div>
  );
}

export default AnalyticsSection;
