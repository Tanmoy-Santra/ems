const db = require("../config/db");
exports.getAllNotice = async(req,res) =>{    
  try {
    const [rows] = await db.query("SELECT * FROM notices ORDER BY id DESC");
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Failed to load notices" });
  }    
}

exports.addNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    await db.query(
      "INSERT INTO notices (title, description) VALUES (?,?)",
      [title, description]
    );

    res.json({ message: "Notice added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add notice" });
  }
};
