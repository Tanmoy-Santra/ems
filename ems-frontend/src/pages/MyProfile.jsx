import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
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

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        <p><b>NAME:</b> {user.name}</p>
        <p><b>EMAIL:</b> {user.email}</p>
        <p><b>PHONE:</b> {user.phone}</p>
        <p><b>ADDRESS:</b> {user.address}</p>
        <p className="mt-2">
          <b>Status:</b>{" "}
          {user.isBlocked
            ? <span className="text-red-500">Blocked</span>
            : <span className="text-green-500">Active</span>}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
