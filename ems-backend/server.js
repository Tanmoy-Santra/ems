// 1. Import modules
const express = require("express");
const db = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const employeeRoutes = require("./src/routes/employee.routes");

const noticeRoutes = require("./src/routes/notice.routes");
const applicationRoutes = require("./src/routes/application.routes")
require("dotenv").config();


const app = express();

const cors = require("cors");



// Middleware
app.use(express.json());
app.use(cors());

// Test
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// DB Test
app.get("/test", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1");
    res.send("DB Connected ✔");
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error ❌");
  }
});

// ⭐️ Correct Route Mounting
app.use("/api/auth", authRoutes);        // register/login
app.use("/api/employee",employeeRoutes);

app.use("/api/notices", noticeRoutes);
app.use("/api/applications",applicationRoutes);
// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
