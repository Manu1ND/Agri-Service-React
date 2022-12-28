import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import SignupPage from "./pages/authentication/Signup";
import LoginPage from "./pages/authentication/Login";
import LogoutPage from "./pages/authentication/Logout";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// supplier pages - products
import AddProduct from "./pages/supplier/AddProduct";
import UpdateProduct from "./pages/supplier/UpdateProduct";
import SupplierProducts from "./pages/supplier/Products";
import SupplierOrders from "./pages/supplier/Orders";

// farmer pages - products
import FarmerProducts from "./pages/farmer/Products";
import FarmerOrders from "./pages/farmer/Orders";

// farmer pages - jobs
import AddJob from "./pages/farmer/AddJob";
import UpdateJob from "./pages/farmer/UpdateJob";
import FarmerJobs from "./pages/farmer/Jobs";
import FarmerApplications from "./pages/farmer/Applications";

// worker pages - jobs
import WorkerJobs from "./pages/worker/Jobs";
import WorkerApplications from "./pages/worker/Applications";

import UpdateUser from "./pages/UpdateUser";

import ErrorPage from "./pages/error-page";

import { Outlet } from "react-router-dom";

function RequireAuth({ children }) {
  //let userID = localStorage.getItem("userID");
  let location = useLocation();
  
  // state to sync with localstorage
  const [userID, setUserID] = useState(localStorage.getItem("userID"));

  const onStorageUpdate = (e) => {
    if (e.key === "userID") {
      setUserID(e.newValue);
      if (e.newValue == null) {
        // TODO - remove this
        window.location.reload();
      }
    }
  }

  // listen to localstorage changes
  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    }
  }, []);

  if (!userID) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


function App() {
  // state to sync with localstorage
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const onStorageUpdate = (e) => {
    if (e.key === "userType") {
      setUserType(e.newValue);
    }
  }

  // listen to localstorage changes
  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    }
  }, []);
  
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
  if (userType === "supplier") {
    children.push({
      path: "/products/add",
      element: <AddProduct />
    }, {
      path: "/products/edit/:productID",
      element: <UpdateProduct />
    }, {
      path: "/products",
      element: <SupplierProducts />
    }, {
      path: "/orders",
      element: <SupplierOrders />
    }, {
      path: "/orders/:productID",
      element: <SupplierOrders />
    });
  }
  
  //if user is a farmer
  if (userType === "farmer") {
    children.push({
      path: "/products",
      element: <FarmerProducts />
    }, {
      path: "/products/productCategory/:productCategoryID",
      element: <FarmerProducts />
    }, {
      path: "/orders",
      element: <FarmerOrders />
    }, {
      path: "/orders/:productID",
      element: <FarmerOrders />
    }, {
      path: "/jobs/add",
      element: <AddJob />
    }, {
      path: "/jobs/edit/:jobID",
      element: <UpdateJob />
    }, {
      path: "/jobs",
      element: <FarmerJobs />
    }, {
      path: "/applications",
      element: <FarmerApplications />
    }, {
      path: "/applications/:jobID",
      element: <FarmerApplications />
    }
    );
  }
  
  // if user is worker
  if (userType === "worker") {
    children.push({
      path: "/jobs",
      element: <WorkerJobs />
    }, {
      path: "/jobs/jobCategory/:jobCategoryID",
      element: <WorkerJobs />
    }, {
      path: "/applications",
      element: <WorkerApplications />
    }, {
      path: "/applications/:jobID",
      element: <WorkerApplications />
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

  return <RouterProvider router={router} />;
}

export default App;
