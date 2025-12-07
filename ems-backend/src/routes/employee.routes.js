const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const {getAllEmployees} = require("../controllers/employee.controller");
router.get("/all-employees", verifyToken, isAdmin, getAllEmployees);


module.exports = router; 

