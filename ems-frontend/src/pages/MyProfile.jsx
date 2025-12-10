import Navbar from "../components/Navbar";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar user={user} logout={() => {}} />
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
