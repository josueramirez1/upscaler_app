import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import DashboardLayout from "./pages/DashboardLayout.tsx"
import DashboardHome from "./pages/DashboardHome.tsx";
import InboxPage from "./pages/InboxPage.tsx";
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {index: true, element: <DashboardHome />},
      {path: "inbox", element: <InboxPage />}
    ]
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
