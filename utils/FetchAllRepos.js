import { useState, useEffect, useRef } from "react";
import githubGet from "./Githubapi";
import { useData } from "../src/Context/DataContext";

function useFetchAllRepos(max = 1000, initialSample = 125) {
  const { val } = useData();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Stats
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [mostUsedLanguage, setMostUsedLanguage] = useState("");
  const [topLanguages, setTopLanguages] = useState([]); // New: top 10 languages distribution

  // Cache previous values to avoid unnecessary recalculation
  const prevValRef = useRef({ time: null, lang: null });

  useEffect(() => {
    if (!val?.time) return;
    if (val.time === prevValRef.current.time && val.lang === prevValRef.current.lang) {
      return; // reuse previous stats
    }

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const perPage = 100;
        const maxResults = Math.min(max, 1000);
        const sampleSize = Math.min(initialSample, maxResults);
        const pages = Math.ceil(sampleSize / perPage);
        let allRepos = [];

        const langQuery =
          val.lang && val.lang !== "All languages" ? ` language:${val.lang}` : "";

        for (let page = 1; page <= pages; page++) {
          const res = await githubGet(`/search/repositories`, {
            q: `created:>${val.time}${langQuery}`,
            sort: "stars",
            order: "desc",
            per_page: perPage,
            page,
          });

          if (res.items) allRepos = [...allRepos, ...res.items];
          if (res.items?.length < perPage) break;
        }

        setRepos(allRepos);

        // Compute stats from sample
        const stars = allRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const forks = allRepos.reduce((acc, repo) => acc + repo.forks_count, 0);
        const issues = allRepos.reduce((acc, repo) => acc + repo.open_issues_count, 0);

        // Language count
        const languageCount = {};
        allRepos.forEach((repo) => {
          if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
          }
        });

        // Most used language
        const sortedLanguages = Object.entries(languageCount)
          .sort((a, b) => b[1] - a[1]);
        const mostUsedLang = sortedLanguages[0]?.[0] || "N/A";

        // Top 10 languages distribution
        const top10Languages = sortedLanguages.slice(0, 10).map(([lang, count]) => ({
          language: lang,
          count,
        }));

        setTotalStars(stars);
        setTotalForks(forks);
        setTotalIssues(issues);
        setMostUsedLanguage(mostUsedLang);
        setTopLanguages(top10Languages);

        prevValRef.current = { time: val.time, lang: val.lang };
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [val, max, initialSample]);

  return {
    repos,
    loading,
    error,
    totalStars,
    totalForks,
    totalIssues,
    mostUsedLanguage,
    topLanguages, // <-- added
  };
}

export default useFetchAllRepos;
