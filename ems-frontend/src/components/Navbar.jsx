import { useState } from "react";
import defaultUser from "../assets/user.jpeg"; 
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center relative">

      {/* Left side */}
      <div className="text-lg font-bold cursor-pointer" onClick={()=>navigate("/dashboard")}>
        EMS
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Desktop user info */}
      <div className="hidden md:flex items-center gap-6">
        <div>
          <span className="font-bold">{user.userId}</span> |{" "}
          {user.name || "ADMIN"} |{" "}
          <span >{user.email || "Active"}</span>
        </div>

        {/* Profile icon */}
        <div className="relative">
          <img
            src={defaultUser}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            onClick={() => setProfileOpen(!profileOpen)}
          />

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-64 p-4 z-50">
              <p> {user.userId} </p>
              <p> {user.name || "Admin"} </p>
              <p> {user.email || ""}</p>
              <p>{user.phone || ""}</p>
              <p>{user.address || ""}</p>
              <p className="mt-2">
                {user.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </p>

              <button
                onClick={logout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-700 md:hidden z-40 p-4 space-y-3">

          <div className="border-b pb-2">
            <p><b>{user.userId}</b></p>
            <p>{user.name || "ADMIN"}</p>
            <p className="text-sm">{user.email || "Active"}</p>
          </div>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full bg-gray-600 py-2 rounded"
          >
            View Profile
          </button>

          {profileOpen && (
            <div className="bg-white text-black rounded p-3 space-y-1">
             <p> 👤 {user.userId} </p>
              <p> NAME : {user.name || "Admin"} </p>
              <p> ✉ {user.email || ""}</p> 
              <p> ☏ {user.phone || ""}</p>
              <p> 🏠︎ {user.address || ""}</p>
              <p className="mt-2">
                {user.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </p>

              <button
                onClick={logout}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
