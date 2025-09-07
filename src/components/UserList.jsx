import React, { useState, useEffect } from "react";
import { LuUsers, LuLink } from "react-icons/lu";
import { FiMapPin, FiBriefcase, FiTwitter } from "react-icons/fi";

function UserList({ users }) {
  const [expandedUser, setExpandedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Reset details when users change
    setUserDetails({});
  }, [users]);

  const fetchUserDetails = async (username) => {
    if (userDetails[username]) return; // Already fetched
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserDetails(prev => ({ ...prev, [username]: data }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const toggleExpand = async (user) => {
    if (expandedUser === user.id) {
      setExpandedUser(null);
    } else {
      setExpandedUser(user.id);
      // Fetch additional user details when expanding
      await fetchUserDetails(user.login);
    }
  };

  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {users.map((user) => {
        const details = userDetails[user.login] || {};
        
        return (
          <div
            key={user.id}
            className="flex flex-col p-4 border border-purple-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-50"
          >
            {/* Basic User Info */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-14 h-14 rounded-full border-2 border-purple-200"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800 truncate">{user.login}</h2>
                {details.name && (
                  <p className="text-gray-600 text-sm truncate">{details.name}</p>
                )}
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 text-sm hover:underline flex items-center gap-1 mt-1"
                >
                  <LuUsers className="text-xs" /> View GitHub Profile
                </a>
              </div>
            </div>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => toggleExpand(user)}
              className="mt-3 text-xs text-purple-600 font-medium flex items-center justify-center gap-1 hover:bg-purple-50 py-1 rounded-lg transition-colors"
            >
              {expandedUser === user.id ? "Show less" : "Show more"}
              <svg
                className={`w-3 h-3 transition-transform ${expandedUser === user.id ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded Details */}
            {expandedUser === user.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                {details.message === "Not Found" ? (
                  <p className="text-gray-500 text-sm">User details not available</p>
                ) : (
                  <div className="space-y-3 text-sm">
                    {/* Bio */}
                    {details.bio && (
                      <div>
                        <p className="text-gray-700 line-clamp-3">{details.bio}</p>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex justify-between gap-2">
                      <div className="text-center">
                        <p className="font-bold text-gray-800">{details.public_repos || 0}</p>
                        <p className="text-xs text-gray-600">Repos</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-800">{details.followers || 0}</p>
                        <p className="text-xs text-gray-600">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-gray-800">{details.following || 0}</p>
                        <p className="text-xs text-gray-600">Following</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2">
                      {details.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin className="text-xs" />
                          <span className="text-xs">{details.location}</span>
                        </div>
                      )}
                      
                      {details.company && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiBriefcase className="text-xs" />
                          <span className="text-xs">{details.company}</span>
                        </div>
                      )}
                      
                      {details.twitter_username && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiTwitter className="text-xs" />
                          <a 
                            href={`https://twitter.com/${details.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-600 hover:underline"
                          >
                            @{details.twitter_username}
                          </a>
                        </div>
                      )}
                      
                      {details.blog && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <LuLink className="text-xs" />
                          <a 
                            href={details.blog.startsWith('http') ? details.blog : `https://${details.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-600 hover:underline truncate"
                          >
                            {details.blog.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-purple-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors block"
                      >
                        View GitHub Profile
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UserList;