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

import AddProduct from "./pages/supplier/AddProduct";
import UpdateProduct from "./pages/supplier/UpdateProduct";
import Products from "./pages/supplier/Products";
import Orders from "./pages/supplier/Orders";

import Jobs from "./pages/worker/Jobs";
import Applications from "./pages/worker/Applications";

import UpdateUser from "./pages/UpdateUser";

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

// children routes based on user role
var children = [];
children.push({
  path: "/*", // page not found
  element: <ErrorPage />
}, {
  path: "/", // yes, again
  element: <Home />
}, {
  path: "/about",
  element: <About />
}, {
  path: "contact/:contactId",
  element: <Contact />
}, {
  path: "/settings",
  element: <UpdateUser />
});

// if user is supplier
if (localStorage.getItem("userType") === "supplier") {
  children.push({
    path: "/products/add",
    element: <AddProduct />
  }, {
    path: "/products/edit/:productID",
    element: <UpdateProduct />
  }, {
    path: "/products",
    element: <Products />
  }, {
    path: "/orders",
    element: <Orders />
  }, {
    path: "/orders/:productID",
    element: <Orders />
  });
}

// if user is worker
if (localStorage.getItem("userType") === "worker") {
  children.push({
    path: "/jobs",
    element: <Jobs />
  }, {
    path: "/jobs/jobCategory/:jobCategoryID",
    element: <Jobs />
  }, {
    path: "/applications",
    element: <Applications />
  }, {
    path: "/applications/:jobID",
    element: <Applications />
  });
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
    children: children
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
