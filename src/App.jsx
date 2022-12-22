import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import SignupPage from "./pages/authentication/Signup";
import LoginPage from "./pages/authentication/Login";
import LogoutPage from "./pages/authentication/Logout";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Products from "./pages/supplier/Products";
import Orders from "./pages/supplier/Orders";

import ErrorPage from "./pages/error-page";

import { Outlet } from "react-router-dom";

function RequireAuth({ children }) {
  let userID = localStorage.getItem("userID");
  let location = useLocation();

  if (!userID) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Navbar />
        <Sidebar>
          <Outlet />
        </Sidebar>
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/", // yes, again
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "contact/:contactId",
        element: <Contact />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/orders/:productID",
        element: <Orders />
      }
    ]
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/logout",
    element: <LogoutPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
