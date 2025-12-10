import { useEffect, useState } from "react";
import axios from "axios";

const ShowNoticeModal = ({ onClose }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/notices/get-notices`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotices(res.data);
    } catch (err) {
      console.log("Failed to fetch notices", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] md:w-[600px] max-h-[80vh] overflow-y-auto p-6 rounded-lg relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Notice Board</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices available</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="border p-4 rounded shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold text-lg text-blue-600">
                  {notice.title}
                </h3>
                <p className="text-gray-700 mt-1">
                  {notice.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Posted On: {new Date(notice.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ShowNoticeModal;
