import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Employee Management System</h1>
      <div className="flex flex-col gap-4">
        <Link to="/admin-login" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Admin Login</Link>
        <Link to="/employee-login" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">Employee Login</Link>
        <Link to="/employee-register" className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">Employee Registration</Link>
      </div>
    </div>
  );
};

export default Home;
