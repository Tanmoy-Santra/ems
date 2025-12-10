import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const NoticeBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notices/get-notices`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotices(res.data);
      } catch (err) {
        console.log(err);
        toast.error('Failed to load notices !', {
          position: "top-right",
          duration: 2000
        });
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <Navbar user={user} />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-5 text-center">📢 Notice Board</h2>

        {notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices available</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white shadow p-4 mb-4 rounded border-l-4 border-blue-500"
            >
              <h3 className="text-lg font-bold">{notice.title}</h3>
              <p className="text-gray-600">{notice.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                Posted on: {new Date(notice.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
