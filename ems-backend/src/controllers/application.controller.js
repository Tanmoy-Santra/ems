
const db = require("../config/db");

// Get all notices (Employee side)
exports.trackApplication =async (req, res) => {
  try {
    const { userId, name, email, phone, subject, description } = req.body;
    await db.query(
      `INSERT INTO applications 
      (userId, name, email, phone, subject, description) 
      VALUES (?,?,?,?,?,?)`,
      [userId, name, email, phone, subject, description]
    );

    res.json({ message: "Application submitted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to send application" });
  }
}


// Reply to application
exports.replyApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply, status } = req.body;

    await db.query(
      `UPDATE applications 
       SET reply = ?, status = ?, reply_time = NOW() 
       WHERE id = ?`,
      [reply, status, id]
    );

    res.json({ message: "Reply sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply" });
  }
};

// Get all applications (Admin side)
exports.showAllApplications = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        userId,
        name,
        email,
        phone,
        subject,
        description,
        reply,
        status,
        created_at,
        reply_time
      FROM applications
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};


exports.getMyApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    
    
    const [rows] = await db.query(
      "SELECT * FROM applications WHERE userId = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json(rows);
  } catch {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

exports.updateApplication = (req, res) => {
  const { applicationId } = req.params; // application ID from URL
  const { reply,status } = req.body; // data sent from frontend
 console.log(reply,status);
 

  if (!status || !reply) {
    return res.status(400).json({ message: "Status and admin reply are required" });
  }

  const query = `
    UPDATE applications 
    SET status = ?, reply = ? 
    WHERE id = ?
  `;

  db.query(query, [status, reply, applicationId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application updated successfully" });
  });
};