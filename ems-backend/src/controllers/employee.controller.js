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
