import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GiveAttendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [status, setStatus] = useState("loading");

  // ------------------------
  // CHECK TODAY ATTENDANCE
  // ------------------------
 const checkTodayStatus = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/attendance/my-attendance`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const today = new Date().toLocaleDateString("en-CA"); // <-- FIXED LOCAL DATE

    const todayRecord = res.data.find((r) => {
      const recordDate = new Date(r.date).toLocaleDateString("en-CA"); // <-- FIXED
      return recordDate === today;
    });

    if (!todayRecord) return setStatus("not_entered");

    if (todayRecord.time_in && !todayRecord.time_out)
      return setStatus("time_in_done");

    if (todayRecord.time_in && todayRecord.time_out)
      return setStatus("completed");

    setStatus("not_entered");
  } catch (error) {
    toast.error("Failed to load attendance");
  }
};


  useEffect(() => {
    checkTodayStatus();
   
  }, []);

  // ------------------------
  // GIVE ATTENDANCE
  // ------------------------
  const handleGiveAttendance = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendance/give-attendance`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      
      toast.success(res.data.message);
      setStatus("time_in_done");
    } catch (error) {
      toast.error("Error in handle attendance");
    }
  };

  // ------------------------
  // GIVE TIME OUT
  // ------------------------
  const handleTimeOut = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendance/give-timeout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      setStatus("completed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-4">Attendance</h2>

        <p className="text-gray-600 mb-6">
          Hello, <strong>{user?.name}</strong>  
          <br />ID: <strong>{user?.userId}</strong>
        </p>

        {status === "loading" && (
          <button className="w-full py-3 rounded bg-gray-400 text-white" disabled>
            Loading...
          </button>
        )}

        {status === "not_entered" && (
          <button
            onClick={handleGiveAttendance}
            className="w-full py-3 rounded bg-green-600 hover:bg-green-700 text-white"
          >
            Give Attendance
          </button>
        )}

        {status === "time_in_done" && (
          <button
            onClick={handleTimeOut}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Give Time-Out
          </button>
        )}

        {status === "completed" && (
          <button className="w-full py-3 rounded bg-gray-500 text-white" disabled>
            Attendance Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default GiveAttendance;


