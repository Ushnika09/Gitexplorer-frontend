// netlify/functions/github.js

export async function handler(event) {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
      throw new Error("Missing GITHUB_TOKEN environment variable");
    }

    const endpoint = event.queryStringParameters.endpoint;
    if (!endpoint) throw new Error("Missing 'endpoint' query parameter");

    // Copy all query params except 'endpoint'
    const params = { ...event.queryStringParameters };
    delete params.endpoint;

    // Build query string
    const queryString = new URLSearchParams(params).toString();
    const url = endpoint.startsWith("/")
      ? `https://api.github.com${endpoint}?${queryString}`
      : `https://api.github.com/${endpoint}?${queryString}`;

    // Fetch from GitHub API
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Function error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
