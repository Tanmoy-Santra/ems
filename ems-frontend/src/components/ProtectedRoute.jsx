import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/" />;
  }

  // Role mismatch
  if (role && user.system_role !== role) {
    // Redirect to correct dashboard
    if (user.system_role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    }
    if (user.system_role === "employee") {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

export default ProtectedRoute;
