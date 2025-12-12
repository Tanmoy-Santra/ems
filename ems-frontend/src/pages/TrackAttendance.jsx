import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";


const TrackAttendance = () => {
   const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
  const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout-employee`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message,{
      position: "top-right",
      duration:2000
    });

    // Remove saved user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect user to login page
    window.location.href = "/";
  } catch (err) {
    console.log(err);
     toast.error(err,{
      position: "top-right",
      duration:2000
    });

  }
};

const extractTime12 = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const extractFullDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


  const fetchMyAttendance = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance/my-attendance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRecords(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load attendance data");
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  return (
    <>
    <Navbar user={user} logout={logout}></Navbar>
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Attendance History</h2>

      {records.length === 0 ? (
        <p className="text-gray-600">No attendance records found.</p>
      ) : (
        <div className="grid gap-3">
          {records.map((item, index) => {
            const date = extractFullDate(item.date);
            return (
              <div
                key={index}
                className="p-4 shadow-md bg-white rounded-lg border"
              >
                <h3 className="font-semibold text-lg">📅 {date}</h3>

                <p className="text-gray-700">
                  <span className="font-bold">Time In:</span>{" "}
                  {item.time_in ? `${extractFullDate(item.time_in) +" ,"+extractTime12(item.time_in)}` : "Not Marked"}
                </p>

                <p className="text-gray-700">
                  <span className="font-bold">Time Out:</span>{" "}
                  {item.time_out ? `${extractFullDate(item.time_out) +" ,"+extractTime12(item.time_out)}` : "Not Marked"}
                </p>

                <p className="mt-2">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      item.time_out
                        ? "bg-green-200 text-green-700"
                        : item.time_in
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {item.time_out
                      ? "Completed"
                      : item.time_in
                      ? "Time-In Done"
                      : "Not Marked"}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}

export default TrackAttendance


