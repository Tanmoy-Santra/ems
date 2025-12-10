import axios from "axios";
import { toast } from "react-toastify";

const UpdateEmployeeModal = ({ employee, onClose, onUpdated }) => {
  if (!employee) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    onUpdated({
      ...employee,
      [name]: value
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/update/${employee.id}`,
        {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          department: employee.department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
       toast.success(res.data.message,{
            position: 'top-right',
            duration:2000
          });
      
      onClose();
    } catch (err) {
      console.log(err);
       toast.error(err,{
      position: 'top-right',
      duration:2000
    });

    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[400px] relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">Update Employee</h2>

        <div className="space-y-3">

          {/* Readonly fields */}
          <input
            value={employee.id}
            disabled
            className="w-full p-2 bg-gray-100 border rounded"
          />

          <input
            value={employee.userId}
            disabled
            className="w-full p-2 bg-gray-100 border rounded"
          />

          {/* Editable fields */}
          <input
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />

          <input
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />

          <input
            name="address"
            value={employee.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />

          <input
            name="department"
            value={employee.department}
            onChange={handleChange}
            placeholder="Department"
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
