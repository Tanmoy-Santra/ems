const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register employee

exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, phone, address, department, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // STEP 1: Insert employee WITHOUT userId
    const [result] = await db.query(
      `INSERT INTO employee 
        (name, email, phone, address, department, password) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, address, department, hashedPassword]
    );

    // ❗ FIX HERE — use insertId
    const id = result.insertId;

    // STEP 3: Generate userId
    const userId = "EMP" + String(id).padStart(3, "0");

    // STEP 4: Update employee with userId
    await db.query(
      "UPDATE employee SET userId = ? WHERE id = ?",
      [userId, id]
    );

    res.json({
      message: "Employee registered successfully",
      userId,
      email,
      name
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//login employee

exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch employee by email
    const [rows] = await db.query(
      "SELECT * FROM employee WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Employee not found" });
    }

    const employee = rows[0];

    // Compare passwords
    const valid = await bcrypt.compare(password, employee.password);
    if (!valid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: employee.id,
        userId: employee.userId,
        role: "employee",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Employee login successful",
      token,
      employee,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};



// ======================================
// ADMIN LOGIN
// ======================================
exports.loginAdmin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Fetch admin by userId
    const [rows] = await db.query(
      "SELECT * FROM admin WHERE userId = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const admin = rows[0];

    // Compare passwords (stored hashed)
   // bcrypt.hash("123456", 10).then(console.log);
    //const valid = await bcrypt.compare(password, admin.password);
    if (password!==admin.password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create token
    const token = jwt.sign(
      {
        id: admin.id,
        userId: admin.userId,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Employee Logout
exports.logoutEmployee = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Employee logged out successfully",
  });
};

// Admin Logout
exports.logoutAdmin = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
};
