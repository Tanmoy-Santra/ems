const Navbar = ({ user, logout }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <span className="font-bold">{user.userId}</span> | {user.name ? user.name : "ADMIN"} | <span className="font-mono">{user.email ? user.email : "Active"}</span>
      </div>
      <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
    </div>
  );
};

export default Navbar;
