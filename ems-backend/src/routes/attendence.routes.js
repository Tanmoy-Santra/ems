const express = require("express");
const {
  giveAttendance,
  giveTimeOut,
  getMyAttendance,
  getTodayAttendance,
  adminGetAttendanceById
} = require("../controllers/attendence.controller.js");

const { verifyToken } = require("../middleware/auth.middleware.js");
const { isAdmin, isEmployee } = require("../middleware/role.middleware.js");

const router = express.Router();

// Employee routes
router.post("/give-attendance", verifyToken, isEmployee, giveAttendance);
router.post("/give-timeout", verifyToken, isEmployee, giveTimeOut);
router.get("/my-attendance", verifyToken, isEmployee, getMyAttendance);

// Admin routes
router.get("/today-attendance", verifyToken, isAdmin, getTodayAttendance);
router.get("/attendance/:userId", verifyToken, isAdmin, adminGetAttendanceById);

module.exports = router;
