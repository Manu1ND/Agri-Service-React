import { Navigate } from "react-router-dom";

export default function LogoutPage() {
  localStorage.removeItem("userType");
  localStorage.removeItem("userID");
  return <Navigate to="/login" replace />;
}