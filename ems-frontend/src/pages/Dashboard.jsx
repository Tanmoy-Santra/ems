import Navbar from "../components/Navbar";
import axios from "axios";
const Dashboard = () => {
  const storedUser = localStorage.getItem("user");
  // console.log(storedUser)
  const user = storedUser ? JSON.parse(storedUser) : null;

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

    alert(res.data.message);

    // Remove saved user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect user to login page
    window.location.href = "/";
  } catch (err) {
    console.log(err);
    alert("Logout failed");
  }
};


  return (
    <div>
      <Navbar user={user} logout={logout} />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">My Profile</h2>
        <div className="bg-white shadow p-4 rounded">
          <p>USERID : {user.userId}</p>
          <p>NAME : {user.name}</p>
          <p>EMAIL : {user.email}</p>
          <p>PHONE : {user.phone}</p>
          <p>ADDRESS : {user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
