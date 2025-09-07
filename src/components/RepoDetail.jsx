import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack, BiStar, BiCopy, BiGitRepoForked, BiErrorCircle } from "react-icons/bi";
import { FaCodeFork } from "react-icons/fa6";
import { IoEyeOutline, IoCalendarOutline, IoDocumentTextOutline } from "react-icons/io5";
import { PiGitFork, PiStarFill } from "react-icons/pi";
import { TbLicense } from "react-icons/tb";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from "moment";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function RepoDetails() {
  const { owner, name } = useParams();
  const [repo, setRepo] = useState(null);
  const [languages, setLanguages] = useState({});
  const [contributors, setContributors] = useState([]);
  const [pulls, setPulls] = useState([]);
  const [activeCloneMethod, setActiveCloneMethod] = useState("https");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [repoRes, langRes, contrRes, pullsRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${name}`),
          fetch(`https://api.github.com/repos/${owner}/${name}/languages`),
          fetch(`https://api.github.com/repos/${owner}/${name}/contributors`),
          fetch(`https://api.github.com/repos/${owner}/${name}/pulls?state=all`)
        ]);

        if (!repoRes.ok) throw new Error('Repository not found');
        
        setRepo(await repoRes.json());
        setLanguages(await langRes.json());
        setContributors(await contrRes.json());
        setPulls(await pullsRes.json());
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching repository data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, name]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-18 w-18 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Loading repository data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <BiErrorCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Repository Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the repository "{owner}/{name}"</p>
          <Link
            to="/app/home"
            className="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <BiArrowBack className="mr-2" />
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  // Calculate language percentages
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languageData = Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    bytes,
    percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
  })).sort((a, b) => b.bytes - a.bytes);

  // Language colors
  const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    Rust: "#dea584",
    CSS: "#563d7c",
    HTML: "#e34c26",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    Go: "#00ADD8",
    Ruby: "#701516",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    Lua: "#000080",
    Shell: "#89e051",
    Dart: "#00B4AB",
    Scala: "#c22d40",
    Perl: "#0298c3",
    Haskell: "#5e5086",
    Elixir: "#6e4a7e",
    Clojure: "#db5855",
    Default: "#6366f1"
  };

  // Prepare data for the donut chart
  const chartData = {
    labels: languageData.map(lang => lang.language),
    datasets: [
      {
        data: languageData.map(lang => lang.percentage),
        backgroundColor: languageData.map(lang => languageColors[lang.language] || languageColors.Default),
        borderWidth: 0,
        hoverOffset: 12
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            size: 11
          },
          padding: 15
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  // Clone URLs
  const httpsUrl = `https://github.com/${owner}/${name}.git`;
  const sshUrl = `git@github.com:${owner}/${name}.git`;

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/app/home" 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm text-purple-600 font-medium hover:bg-purple-50 transition-colors mb-6"
        >
          <BiArrowBack />
          Back to Explorer
        </Link>

        {/* Repo Header with Owner Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-4">
              <img 
                src={repo.owner?.avatar_url} 
                alt={repo.owner?.login} 
                className="w-16 h-16 rounded-full border-2 border-purple-200 shadow-sm"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{repo.name}</h1>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  by 
                  <a 
                    href={repo.owner?.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline font-medium"
                  >
                    {repo.owner?.login}
                  </a>
                </p>
                {repo.description && (
                  <p className="text-gray-700 mt-3">{repo.description}</p>
                )}
              </div>
            </div>
            
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              <BiGitRepoForked className="text-lg " />
              <span className="text-nowrap">
              View on GitHub
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Repository Statistics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Repository Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Stat 
                  label="Stars" 
                  value={repo.stargazers_count} 
                  icon={<PiStarFill className="text-yellow-500" />} 
                  color="yellow" 
                />
                <Stat 
                  label="Forks" 
                  value={repo.forks_count} 
                  icon={<PiGitFork className="text-gray-600" />} 
                  color="gray" 
                />
                <Stat 
                  label="Watchers" 
                  value={repo.subscribers_count} 
                  icon={<IoEyeOutline className="text-blue-500" />} 
                  color="blue" 
                />
                <Stat 
                  label="Open Issues" 
                  value={repo.open_issues_count} 
                  icon={<BiErrorCircle className="text-red-500" />} 
                  color="red" 
                />
                <Stat 
                  label="Pull Requests" 
                  value={pulls.length} 
                  icon={<IoDocumentTextOutline className="text-purple-500" />} 
                  color="purple" 
                />
                <Stat 
                  label="Size" 
                  value={`${(repo.size / 1024).toFixed(1)} MB`} 
                  icon={<div className="w-5 h-5 bg-indigo-500 rounded-full"></div>} 
                  color="indigo" 
                />
              </div>
            </div>

            {/* Clone Repository Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Clone Repository</h2>
              <div className="mb-4">
                <div className="flex space-x-2 mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg transition-colors ${activeCloneMethod === "https" ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveCloneMethod("https")}
                  >
                    HTTPS
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg transition-colors ${activeCloneMethod === "ssh" ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    onClick={() => setActiveCloneMethod("ssh")}
                  >
                    SSH
                  </button>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={activeCloneMethod === "https" ? httpsUrl : sshUrl}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm bg-gray-50"
                  />
                  <button
                    onClick={() => copyToClipboard(activeCloneMethod === "https" ? httpsUrl : sshUrl)}
                    className="px-4 py-2.5 bg-purple-600 text-white rounded-r-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <BiCopy />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Use Git or checkout with SVN using the web URL.
              </p>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <IoCalendarOutline className="text-lg text-purple-500" />
                  <span className="font-medium">Created:</span> 
                  {moment(repo.created_at).format("MMMM D, YYYY")}
                </li>
                <li className="flex items-center gap-3">
                  <BiGitRepoForked className="text-lg text-purple-500" />
                  <span className="font-medium">Default branch:</span> 
                  <span className="bg-gray-100 px-2.5 py-1 rounded-md ml-2 font-mono text-sm">{repo.default_branch}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full"></div>
                  <span className="font-medium">Repository size:</span> 
                  {(repo.size / 1024).toFixed(1)} MB
                </li>
                <li className="flex items-center gap-3">
                  <TbLicense className="text-lg text-purple-500" />
                  <span className="font-medium">License:</span> 
                  {repo.license ? repo.license.name : "No license"}
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full" style={{backgroundColor: languageColors[repo.language] || languageColors.Default}}></div>
                  <span className="font-medium">Primary Language:</span> 
                  {repo.language || "Not specified"}
                </li>
                <li className="flex items-center gap-3">
                  <IoCalendarOutline className="text-lg text-purple-500" />
                  <span className="font-medium">Last updated:</span> 
                  {moment(repo.updated_at).fromNow()}
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {/* Language Breakdown with Donut Chart */}
            {languageData.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Languages</h2>
                <div className="h-64 mb-4">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className="space-y-2">
                  {languageData.slice(0, 5).map((lang, index) => (
                    <LanguageItem 
                      key={lang.language} 
                      language={lang.language} 
                      percentage={lang.percentage} 
                      color={languageColors[lang.language] || languageColors.Default}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Contributors */}
            {contributors.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Top Contributors</h2>
                <ul className="space-y-3">
                  {contributors.slice(0, 5).map((contrib) => (
                    <li key={contrib.id} className="flex items-center gap-3">
                      <img 
                        src={contrib.avatar_url} 
                        alt={contrib.login}
                        className="w-10 h-10 rounded-full border-2 border-purple-100" 
                      />
                      <div className="flex-1 min-w-0">
                        <a 
                          href={contrib.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-800 hover:text-purple-600 hover:underline truncate block"
                        >
                          {contrib.login}
                        </a>
                        <p className="text-sm text-gray-600">
                          {contrib.contributions} contributions
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Stat = ({ label, value, icon, color }) => (
  <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors">
    <div className="flex justify-center items-center mb-2">
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

const LanguageItem = ({ language, percentage, color }) => {
  const formattedPercentage = percentage.toFixed(1);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-sm font-medium text-gray-700">{language}</span>
      </div>
      <span className="text-sm text-gray-600">
        {formattedPercentage}%
      </span>
    </div>
  );
};

export default RepoDetails;