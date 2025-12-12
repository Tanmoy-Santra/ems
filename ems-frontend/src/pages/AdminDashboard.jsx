import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";
import { toast } from "react-toastify";
import AddNotice from "../components/AddNotice";
import ShowNoticeModal from "../components/ShowNoticeModal";
import TrackApplicationsModal from "../components/TrackApplicationsModal";
import TodayAttendanceModal from "../components/TodayAttendanceModal";
import EmployeeAttendanceModal from "../components/EmployeeAttendanceModal";
const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [NoticeModal, setNoticeModal] = useState(false);
   const [showTrackModal, setShowTrackModal] = useState(false);
const [showTodayModal, setShowTodayModal] = useState(false);
const [showByIdModal, setShowByIdModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");


  const extractFullDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

  // Fetch employees

   const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout-admin`,
      {},
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

  useEffect(() => { 
  fetchEmployees();
  }, []);

   const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/employee/all-employees`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  // Delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/employee/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // Block / Unblock
  const handleBlockToggle = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/employee/block-toggle/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedStatus = res.data.isBlocked;

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === id ? { ...emp, isBlocked: updatedStatus } : emp
        )
      );

      toast.success(res.data.message);
    } catch {
      toast.error("Action failed");
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} logout={logout}/>

      <div className="flex">
        {/* Mobile overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static top-0 left-0 z-50  bg-gray-900 text-white w-64 h-screen transform
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300`}
        >
          <h2 className="text-xl font-bold p-5 border-b border-gray-700">
            Admin Panel
          </h2>
          <div className="flex flex-col gap-3 p-4">
            <button className="bg-blue-600 py-2 rounded" onClick={() => setShowNoticeModal(true)}>Add Notice</button>
            <button className="bg-green-600 py-2 rounded"onClick={() => setNoticeModal(true)}>Show Notice</button>
            <button className="bg-purple-600 py-2 rounded">Send Email</button>
            <button className="bg-yellow-500 text-black py-2 rounded"  onClick={() => setShowTrackModal(true)}>            
              Track Applications
            </button>
            <button className="bg-blue-600 py-2 rounded" onClick={() => setShowTodayModal(true)}>
              Check Today Attendance
            </button>
            <button className="bg-green-600 py-2 rounded"  onClick={() => setShowByIdModal(true)}
                >
                  Check Employee Attendance
                </button>
              </div>                        
         </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:ml-0">
          {/* Mobile menu button */}
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setShowSidebar(true)}
              className="text-3xl"
            >
              ⋮
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search employee by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-3 border rounded shadow"
            />
          </div>

          {/* Employee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-yellow-200 p-4 rounded shadow relative"
              >
                {/* 3 dot menu */}
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === emp.id ? null : emp.id)
                  }
                  className="absolute top-2 right-2 text-2xl font-bold"
                >
                  ⋮
                </button>

                {/* Dropdown */}
                {openMenuId === emp.id && (
                  <div className="absolute right-2 top-10 bg-white rounded shadow w-32 z-10">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleBlockToggle(emp.id)}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-100 text-orange-600"
                    >
                      {emp.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setShowModal(true);
                        setOpenMenuId(null);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600"
                    >
                      Update
                    </button>
                  </div>
                )}

                {/* Employee Info */}
                <p><b>UserID:</b> {emp.userId}</p>
                <p><b>Name:</b> {emp.name}</p>
                <p><b>Email:</b> {emp.email}</p>
                <p><b>Phone:</b> {emp.phone}</p>
                <p><b>Address:</b> {emp.address}</p>
                <p><b>Department:</b> {emp.department}</p>
                <p><b>Joining Date:</b> {extractFullDate(emp.joining_date)}</p>
                <p>
                  <b>
                    {emp.isBlocked ? (
                      <span className="text-red-500">Blocked</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </b>
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Update Modal */}
      {showModal && (
        <UpdateEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}         
          onUpdated={setSelectedEmployee}
        />
      )}
      {showNoticeModal && (
        <AddNotice
          onClose={() => setShowNoticeModal(false)}
          onSuccess={() => console.log("Refresh notice list")}
        />
      )}
      {NoticeModal && (
      <ShowNoticeModal onClose={() => setNoticeModal(false)} />
      )}
      {showTrackModal && (
      <TrackApplicationsModal
        onClose={() => setShowTrackModal(false)}
      />
    )}
   {showTodayModal && (
     <TodayAttendanceModal onClose={() => setShowTodayModal(false)} />
    )}
    {showByIdModal && (
     <EmployeeAttendanceModal onClose={() => setShowByIdModal(false)} />
    )}
    </div>
  );
};

export default AdminDashboard;
