const db = require("../config/db");
exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employee");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM employee WHERE id = ?", [id]);

    res.json({ message: "Employee permanently deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

exports.toggleBlockEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [[emp]] = await db.query(
      "SELECT isBlocked FROM employee WHERE id = ?",
      [id]
    );

    const newStatus = emp.isBlocked === 1 ? 0 : 1;

    await db.query(
      "UPDATE employee SET isBlocked = ? WHERE id = ?",
      [newStatus, id]
    );

    res.json({
      message: newStatus ? "Employee blocked" : "Employee unblocked",
      isBlocked: newStatus,
    });
  } catch (err) {
    res.status(500).json({ message: "Block/Unblock failed" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department,  address } = req.body;

    await db.query(
      `UPDATE employee 
       SET name=?, email=?, phone=?, department=?,  address=? 
       WHERE id=?`,
      [name, email, phone, department,address, id]
    );

    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
