import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userId: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-login`, { ...form });

    // Save token and admin info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.admin));

    navigate("/admin-dashboard");
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input type="text" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
