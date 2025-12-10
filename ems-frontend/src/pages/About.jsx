import Navbar from "../components/Navbar";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar user={user} logout={() => {}} />
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">About Company</h2>

        <p>🏢 We are a growing technology-driven company.</p>
        <p>📜 Employees must follow company rules and regulations.</p>
        <p>✅ Work hours: 9 AM - 6 PM</p>
        <p>✅ Maintain professional behaviour at workplace.</p>
      </div>
    </div>
  );
};

export default About;
