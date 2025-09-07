// BookmarkProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("http://localhost:5000/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setBookmarks(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  const addBookmark = async (repo) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.post(
      "http://localhost:5000/api/bookmarks",
      repo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setBookmarks((prev) => [...prev, res.data]);
  };

  const removeBookmark = async (id) => {
    const token = localStorage.getItem("jwt");
    await axios.delete(`http://localhost:5000/api/bookmarks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookmarks((prev) => prev.filter((b) => b._id !== id));
  };

  const clearAllBookmarks = async () => {
    const token = localStorage.getItem("jwt");
    await axios.delete("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookmarks([]);
  };

  // ✅ extra: updateBookmark (used only by RecentBookmarks)
  const updateBookmark = async (id, updates) => {
    const token = localStorage.getItem("jwt");
    const res = await axios.patch(
      `http://localhost:5000/api/bookmarks/${id}`,
      updates,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setBookmarks((prev) =>
      prev.map((b) => (b._id === id ? res.data : b))
    );
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        clearAllBookmarks,
        updateBookmark, // safe to expose, not required by RepoCard/Top10
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}
