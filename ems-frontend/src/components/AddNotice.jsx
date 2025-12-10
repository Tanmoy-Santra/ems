import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddNotice = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notices/add-notice`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message,{
        position:"top-right",
        duration:2000
      });
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err,{
        position:"top-right",
        duration:2000
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] md:w-[400px] p-6 rounded-lg relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Add New Notice</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Notice title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Notice description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
