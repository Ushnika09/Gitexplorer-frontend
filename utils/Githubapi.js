import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

// Detect environment
const isServer = typeof window === "undefined";
const isProd = import.meta.env.PROD; // true in Netlify build

// Access token safely
const GITHUB_TOKEN = isServer
  ? process.env.GITHUB_TOKEN // server-side (Netlify)
  : import.meta.env.VITE_PERSONAL_ACCESS_TOKEN; // client-side local dev

// Create reusable axios client (for server-side / local direct calls)
const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  },
});

export default async function githubGet(endpoint, params = {}) {
  try {
    // Browser in production → call Netlify Function
    if (!isServer && isProd) {
      const query = new URLSearchParams({ ...params, endpoint }).toString();
      const res = await fetch(`/.netlify/functions/github?${query}`);
      if (!res.ok) throw new Error(`GitHub Function error: ${res.statusText}`);
      const data = await res.json();
      return data;
    }

    // Local dev or server → call GitHub API directly
    const { data } = await githubApi.get(endpoint, { params });
    return data;
  } catch (error) {
    console.error("GitHub API error:", error.response?.data || error.message);
    throw error;
  }
}
