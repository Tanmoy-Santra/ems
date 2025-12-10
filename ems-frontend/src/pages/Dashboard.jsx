import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noticeImg from "../assets/notice.png"
import letterImg from "../assets/letter.png"
import rulesImg from "../assets/rules.png"
import profileImg from "../assets/profile.png";
import fancyImg from "../assets/fancyImg.png";
import { toast } from "react-toastify";
const Dashboard = () => {
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
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

 return (
    <div>
      <Navbar user={user} logout={logout} />

      <div className="flex flex-col md:flex-row p-6 gap-10">

        {/* LEFT SIDE - CARDS */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">

          {/* Notice Board */}
          <div
            onClick={() => navigate("/notices")}
            className="flex items-center gap-4 bg-yellow-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-yellow-100"
          >
            <img src={noticeImg} className="w-12 h-12" />
            <div>
              <h3 className="font-bold">Notice Board</h3>
              <p className="text-sm text-gray-600">View company updates</p>
            </div>
          </div>

          {/* Apply / Request */}
          <div
            onClick={() => navigate("/apply")}
            className="flex items-center gap-4 bg-blue-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-blue-100"
          >
            <img src={letterImg} className="w-12 h-12" />
            <div>
              <h3 className="font-bold">Request / Apply</h3>
              <p className="text-sm text-gray-600">Leave or official request</p>
            </div>
          </div>

          {/* My Profile */}
          <div
            onClick={() => navigate("/my-profile")}
            className="flex items-center gap-4 bg-green-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-green-100"
          >
            <img src={profileImg} className="w-12 h-12" />
            <div>
              <h3 className="font-bold">My Profile</h3>
              <p className="text-sm text-gray-600">View your information</p>
            </div>
          </div>

          {/* Rules & About */}
          <div
            onClick={() => navigate("/about-company")}
            className="flex items-center gap-4 bg-purple-200 shadow-md rounded-lg p-4 cursor-pointer hover:bg-purple-100"
          >
            <img src={rulesImg} className="w-12 h-12" />
            <div>
              <h3 className="font-bold">Rules & About</h3>
              <p className="text-sm text-gray-600">Company rules & info</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img src={fancyImg} className="max-w-md" />
        </div>

      </div>
    </div>
  );


  
};

export default Dashboard;
