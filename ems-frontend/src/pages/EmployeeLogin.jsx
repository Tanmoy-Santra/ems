import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/employee-login`, { ...form});
      // console.log(res);
      // console.log(res.data.token);      
      // console.log(res.data.employee);
      toast.success(res.data.message,{
        position:"top-right",
        duration:2000
      })
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.employee));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message,{
        position:'top-right',
        duration:2000
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Login</h2>

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Login</button>
      </form>
    </div>
  );
};

export default EmployeeLogin;
