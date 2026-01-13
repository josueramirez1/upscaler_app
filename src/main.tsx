import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { ThemeProvider } from "./ThemeProvider";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import DashboardLayout from "./pages/DashboardLayout.tsx";
import InboxPage from "./pages/InboxPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import BoardPage from "./pages/BoardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "board", element: <BoardPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
