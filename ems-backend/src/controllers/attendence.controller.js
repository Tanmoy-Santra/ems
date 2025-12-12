const db = require("../config/db");

// -----------------------------------------
// 1️⃣ Give Attendance (QR Scan)
// -----------------------------------------
exports.giveAttendance = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user);    
    console.log(userId);
    
    const today = new Date().toISOString().split("T")[0];
    

    console.log(today);
    
    // Check if attendance exists
    const [existing] = await db.query(
      "SELECT * FROM attendance WHERE userId = ? AND date = ?",
      [userId, today]
    );

    console.log(existing);
    

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Attendance already given today!",
      });
    }

    // Insert record
    await db.query(
      "INSERT INTO attendance (userId, date, time_in, method, location) VALUES (?, ?, NOW(), 'QR', 'Main Gate')",
      [userId, today]
    );

    return res.status(200).json({ message: "Attendance recorded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------
// 2️⃣ Give Time-Out
// -----------------------------------------
exports.giveTimeOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const today = new Date().toISOString().split("T")[0];

    const [attendance] = await db.query(
      "SELECT * FROM attendance WHERE userId = ? AND date = ?",
      [userId, today]
    );

    
    console.log(today);
    
    console.log(attendance);
    
    if (attendance.length === 0) {
      return res.status(400).json({
        message: "No attendance found for today!",
      });
    }

    await db.query(
      "UPDATE attendance SET time_out = NOW() WHERE userId = ? AND date = ?",
      [userId, today]
    );

    return res.status(200).json({ message: "Time-out recorded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------
// 3️⃣ Get My Attendance (Employee)
// -----------------------------------------
exports.getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    
    const [rows] = await db.query(
      "SELECT * FROM attendance WHERE userId = ? ORDER BY date DESC",
      [userId]
    );
    console.log("get my attendance",res);
    
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------
// 4️⃣ Get Today's Attendance (Admin)
// -----------------------------------------
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [rows] = await db.query(
      `SELECT a.*, e.name, e.email 
       FROM attendance a 
       JOIN employee e ON a.userId = e.userId 
       WHERE a.date = ?`,
      [today]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------
// 5️⃣ Admin: Get Attendance by Employee ID
// -----------------------------------------
exports.adminGetAttendanceById = async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `SELECT a.*, e.name, e.email, e.phone 
      FROM attendance a
      JOIN employee e ON a.userId = e.userId
      WHERE a.userId = ?
      ORDER BY a.date DESC`,
      [userId]
    );


    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
