import { Link } from "react-router-dom";
import emsImage from "../assets/EmpImg.png";import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.system_role === "admin") {
      navigate("/admin-dashboard");
    } 
    else if (user?.system_role === "employee") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl flex flex-col md:flex-row w-[90%] max-w-5xl overflow-hidden">

        {/* Left Image Section */}
        <div className="md:w-1/2 w-full h-40 md:h-auto">
          <img
            src={emsImage}
            alt="Employee Management"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content Section */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-10 gap-6 bg-gray-50">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Employee Management System
          </h1>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Link
              to="/admin-login"
              className="bg-blue-500 text-white py-3 text-center rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Admin Login
            </Link>

            <Link
              to="/employee-login"
              className="bg-green-500 text-white py-3 text-center rounded-lg font-medium hover:bg-green-600 transition"
            >
              Employee Login
            </Link>

            <Link
              to="/employee-register"
              className="bg-purple-500 text-white py-3 text-center rounded-lg font-medium hover:bg-purple-600 transition"
            >
              Employee Registration
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
