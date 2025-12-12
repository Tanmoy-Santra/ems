import axios from "axios";
import { useState } from "react";

const EmployeeAttendanceModal = ({ onClose }) => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchById = async () => {
    if (!userId) return alert("Enter User ID");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance/attendance/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

   const extractTime12 = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

 const extractFullDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


  return (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
    <div className="bg-white p-5 rounded w-96 relative">

    
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
      >
        ×
      </button>

      <h2 className="text-xl font-bold mb-3 text-center">Employee Attendance</h2>

      <input
        type="text"
        className="border w-full p-2 rounded mb-3"
        placeholder="Enter Employee User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button
        className="bg-blue-600 w-full py-2 rounded mb-3"
        onClick={fetchById}
      >
        Fetch Attendance
      </button>

      {data.length > 0 &&
        data.map((item) => (
          <div key={item.attendanceId} className="border p-2 rounded mb-2">
            <p><b>Date:</b> {extractFullDate(item.date)}</p>
            <p><b>Entry Time:</b> {extractTime12(item.time_in)}</p>
            <p><b>Exit Time:</b> {extractTime12(item.time_out)}</p>
            <p><b>Name:</b> {item.name}</p>
            <p><b>Email:</b> {item.email}</p>
            <p><b>Phone:</b> {item.phone}</p>
          </div>
        ))}
    </div>
  </div>
);

};

export default EmployeeAttendanceModal;
