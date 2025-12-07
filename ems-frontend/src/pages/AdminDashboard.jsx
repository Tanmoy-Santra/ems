import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout-admin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

    // Remove saved user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect user to login page
    window.location.href = "/";
  } catch (err) {
    console.log(err);
    alert("Logout failed");
  }
};


 useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employee/all-employees`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // If backend returns { employees: [...] }
      console.log(res.data);      
      console.log(res.data);      
      setEmployees(res.data); 
    } catch (err) {
      console.log(err);
    }
  };
  fetchEmployees();
}, []);


  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.isArray(employees) && employees.map((emp) => (
          <div key={emp.id} className="bg-white p-4 rounded shadow">
            <p><b>UserID:</b> {emp.userId}</p>
            <p><b>Name:</b> {emp.name}</p>
            <p><b>Email:</b> {emp.email}</p>
            <p><b>Phone:</b> {emp.phone}</p>
            <p><b>Department:</b> {emp.department}</p>
            <p><b>Joining Date:</b> {emp.joining_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
