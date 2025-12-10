import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";


const ApplyRequest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    subject: "",
    description: "",
  });

  const [applications, setApplications] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fetch user applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/applications/my-applications/${user.userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/applications/track-applications`,
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          subject: form.subject,
          description: form.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        );
    fetchApplications();
      toast.success("Application sent successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setForm({ subject: "", description: "" });
      fetchApplications(); // refresh list
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div>
      <Navbar user={user} logout={() => {}} />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ✅ Left Side - Application Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Apply / Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter your request details..."
                rows="5"
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* ✅ Right Side - Show Applications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">
              My Applications
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {applications.length === 0 ? (
                <p className="text-center text-gray-500">
                  No applications found
                </p>
              ) : (
                applications.map((app) => (
                  <div
                    key={app.id}
                    className="border p-4 rounded shadow-sm hover:bg-gray-50"
                  >
                    <p><b>Subject:</b> {app.subject}</p>
                    <p><b>Description:</b> {app.description}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span
                        className={`font-semibold ${
                          app.status === "Approved"
                            ? "text-green-600"
                            : app.status === "Rejected"
                            ? "text-red-600"
                            : "text-orange-500"
                        }`}
                      >
                        {app.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleString()}
                    </p>

                    {/* ✅ Show reply if exists */}
                    {app.reply && (
                      <div className="mt-2 p-2 bg-blue-50 rounded">
                        <p><b>Admin Reply:</b> {app.reply}</p>
                        {app.reply_time && (
                          <p className="text-xs text-gray-500">
                            Replied at:{" "}
                            {new Date(app.reply_time).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ApplyRequest;
