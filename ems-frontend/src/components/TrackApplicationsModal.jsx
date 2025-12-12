import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TrackApplicationsModal = ({ onClose }) => {
  const [apps, setApps] = useState([]);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Approved"); // default status
  const [selectedId, setSelectedId] = useState(null);
  const token = localStorage.getItem("token");

  // fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications/show-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApps(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  },[reply]);

  // send reply + status
const sendReply = async (id) => {
  if (!reply) {
    return toast.error("Reply cannot be empty", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  console.log("Sending →", { reply, status });

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/applications/reply/${id}`,
      { reply, status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Server Response →", res.data);
    alert(res.data.message);
    toast.success("Reply sent successfully", {
      position: "top-right",
      autoClose: 1200,

      // CLOSE MODAL ONLY AFTER TOAST IS SHOWN
      onClose: () => {
        if (typeof onClose === "function") onClose();
      },
    });

    // clear inputs
    setReply("");
    setStatus("Approved");

    // refresh list
    fetchApplications();

  } catch (err) {
    console.log("Reply Error →", err?.response?.data || err);

    toast.error("Failed to send reply", {
      position: "top-center",
      autoClose: 2000,
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


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-5xl p-6 rounded-lg relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Track Applications
        </h2>

        {apps.length === 0 && (
          <p className="text-center text-gray-500">No applications found</p>
        )}

        {apps.map((app) => (
          <div
            key={app.id}
            className="border p-4 rounded mb-3 shadow-sm"
          >
            <p><b>Name:</b> {app.name}</p>
            <p><b>Email:</b> {app.email}</p>
            <p><b>Subject:</b> {app.subject}</p>
            <p><b>Description:</b> {app.description}</p>
            <p><b>Date:</b> {extractFullDate(app.created_at)} , {extractTime12(app.created_at)}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={`font-semibold ${
                app.status === "Approved"
                  ? "text-green-600"
                  : app.status === "Rejected"
                  ? "text-red-600"
                  : "text-orange-500"
              }`}>
                {app.status}
              </span>
            </p>

            {app.reply && (
              <div className="mt-2 bg-green-50 p-2 rounded">
                <b>Previous Reply:</b> {app.reply}
              </div>
            )}

            {/* Reply Section */}
            <div className="mt-3">
              {selectedId === app.id ? (
                <>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full border p-2 rounded mb-2"
                    rows="3"
                  />

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border p-2 rounded mb-2"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button
                    onClick={()=>sendReply(app.id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Send Reply
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setSelectedId(app.id)}
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TrackApplicationsModal;
