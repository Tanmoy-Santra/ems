import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeRegister from "./pages/EmployeeRegister";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NoticeBoard from "./pages/NoticeBoard";
import MyProfile from "./pages/MyProfile";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import ApplyRequest from "./components/ApplyRequest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/employee-register" element={<EmployeeRegister />} />

        {/* ✅ Employee Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="employee">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <ProtectedRoute role="employee">
              <NoticeBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute role="employee">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply"
          element={
            <ProtectedRoute role="employee">
              <ApplyRequest/>
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Shared Route */}
        <Route
          path="/about-company"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
