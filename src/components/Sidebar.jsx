import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userType = localStorage.getItem("userType");
  var navigation = [
    {
      name: "Home",
      href: "/",
      svgd:
        "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    }
  ];

  if (userType == "supplier") {
    navigation.push(
      {
        name: "Add Product",
        href: "/products/add",
        svgd:
          "M12 6v6m0 0v6m0-6h6m-6 0H6"
      }
    );
  }

  if (userType == "supplier" || userType == "farmer") {
    navigation.push(
      {
        name: "Products",
        href: "/products",
        svgd:
          "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      },
      {
        name: "Orders",
        href: "/orders",
        svgd: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      });
  }

  if (userType == "farmer") {
    navigation.push(
      {
        name: "Add Job",
        href: "/jobs/add",
        svgd:
          "M12 6v6m0 0v6m0-6h6m-6 0H6"
      }
    )
  }

  if (userType == "farmer" || userType == "worker") {
    navigation.push(
      {
        name: "Jobs",
        href: "/jobs",
        svgd:
          "M5 13l4 4L19 7m-2-3a2 2 0 11-4 0 2 2 0 014 0z"
      },
      {
        name: "Job Applications",
        href: "/applications",
        svgd:
          "M19 13l-7 7-7-7"
      }
    );
  }

  navigation.push(
    {
      name: "Settings",
      href: "/settings",
      svgd:
        "M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317A1.724 1.724 0 0016.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753A1.724 1.724 0 0019.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675A1.724 1.724 0 0018.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618A1.724 1.724 0 0013.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683A1.724 1.724 0 007.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247A1.724 1.724 0 004.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325A1.724 1.724 0 005.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382 8.749 5.99 10.049 5.452 10.325 4.317ZM15 12A3 3 0 119 12 3 3 0 0115 12Z"
    },
    {
      name: "Logout",
      href: "/logout",
      svgd:
        "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    }
  );

  KoreSDK.chatConfig.botOptions.userIdentity = localStorage.getItem("userID");
  KoreSDK.widgetsConfig.botOptions.userIdentity = localStorage.getItem("userID");
  KoreSDK.chatConfig.botOptions.loadHistory = true;
  KoreSDK.chatConfig.loadHistory = true;
  KoreSDK.chatConfig.botOptions.botInfo.customData = {
    user: {
      type: localStorage.getItem("userType"),
      id: localStorage.getItem("userID")
    },
    client: {
      type: "react",
      url: window.location.origin + "/"
    }
  }

  // .kore-chat-window is hidden then show it
  if (document.querySelector(".kore-chat-window") && document.querySelector(".kore-chat-window").style.display == "none") {
    document.querySelector(".kore-chat-window").style.display = "";
  }

  return (
    <div className="flex">
      <div
        className={`${sidebarOpen ? "w-40" : "w-60 "
          } flex flex-col h-screen p-3 bg-gray-800 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {navigation.map((item) => (
                <li key={item.name} as="a" className="rounded-sm hover:bg-violet-600 ">
                  <Link
                    to={item.href}
                    className="rounded-sm hover:bg-violet-600 flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.svgd}
                      />
                    </svg>
                    <span className="text-gray-100">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12">
        <div>{children}</div>
      </div>
    </div>
  );
}
