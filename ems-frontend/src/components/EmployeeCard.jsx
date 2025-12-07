const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <p><b>UserID:</b> {employee.userId}</p>
      <p><b>Name:</b> {employee.name}</p>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Phone:</b> {employee.phone}</p>
      <p><b>Department:</b> {employee.department}</p>
      <p><b>Joining Date:</b> {employee.joining_date}</p>
    </div>
  );
};

export default EmployeeCard;
