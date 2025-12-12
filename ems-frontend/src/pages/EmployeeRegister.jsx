import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      toast.success(res.data.message,{
        position:"top-right",
        duration:2000
      });
      navigate("/employee-login");
    } catch (err) {
      toast.error(err.response.data.message,{
        position:"top-right",
        duration:2000
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Employee Registration</h2>

        {["name","email","phone","address","department","password"].map((field) => (
          <input 
            key={field}
            type={field==="password"?"password":"text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
            required
          />
        ))}

        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegister;
