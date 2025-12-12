import axios from "axios";
import { useEffect, useState } from "react";

const TodayAttendanceModal = ({ onClose }) => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance/today-attendance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 const extractFullDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const extractTime12 = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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

      <h2 className="text-xl font-bold mb-3 text-center">Today's Attendance</h2>

      {data.length === 0 ? (
        <p>No attendance today.</p>
      ) : (
        data.map((item) => (
          <div
            key={item.attendanceId}
            className="border p-2 rounded mb-2 shadow-sm"
          >
            <p><b>Name:</b> {item.name}</p>
            <p><b>Email:</b> {item.email}</p>
            <p>
              <b>Entry time:</b> {extractFullDate(item.time_in)} ,{" "}
              {extractTime12(item.time_in)}
            </p>
            <p>
              <b>Exit time:</b>{" "}
              {item.time_out ? extractFullDate(item.time_out) : "Not Exit"} ,{" "}
              {item.time_out ? extractTime12(item.time_out) : ""}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
);

};

export default TodayAttendanceModal;
