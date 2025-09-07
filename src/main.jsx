import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Layout/Home.jsx";
import Analytics from "./Layout/Analytics.jsx";
import Bookmarks from "./Layout/Bookmarks.jsx";
import DataProvider from "./Context/DataContext.jsx";
import BookmarkCard from "./components/BookmarkCard.jsx";
import RepoDetails from "./components/RepoDetail.jsx";
import { BookmarkProvider } from "./Context/BookmarkProvider.jsx";
import LandingPage from "./Layout/LandingPage.jsx";
import Signup from "./Layout/Signup.jsx";
import Login from "./Layout/Login.jsx";
import ProtectRoutes from "./components/ProtectRoutes.jsx";

const appRoute = createBrowserRouter([
  {
    element: <LandingPage />,
    path: "/",
  },
  {
    element: <Signup />,
    path: "/register",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <ProtectRoutes />,
    children: [
      {
        element: <App />,
        path: "/app",
        children: [
          {
            element: <Home />,
            path: "home",
          },
          {
            element: <Analytics />,
            path: "analytics",
          },
          {
            element: <Bookmarks />,
            path: "bookmarks",
          },
          {
            element: <BookmarkCard />,
            path: "details/:id",
          },
          {
            element: <RepoDetails />,
            path: "repodetails/:owner/:name",
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <BookmarkProvider>
      <RouterProvider router={appRoute} />
    </BookmarkProvider>
  </DataProvider>
);
