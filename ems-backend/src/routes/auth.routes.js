const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");

const {
  registerEmployee,
  loginEmployee,
  loginAdmin,
  logoutAdmin,
  logoutEmployee
} = require("../controllers/auth.controller");

// -------------------------
// EMPLOYEE REGISTRATION
// -------------------------
router.post("/register", registerEmployee);

// -------------------------
// EMPLOYEE LOGIN
// -------------------------
router.post("/employee-login", loginEmployee);

// -------------------------
// ADMIN LOGIN ONLY
// -------------------------
router.post("/admin-login", loginAdmin);


// Employee Logout
router.post("/logout-employee",verifyToken,logoutEmployee);

// Admin Logout
router.post("/logout-admin",verifyToken,logoutAdmin);


module.exports = router;

