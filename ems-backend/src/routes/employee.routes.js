const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const {getAllEmployees} = require("../controllers/employee.controller");
const {deleteEmployee} = require("../controllers/employee.controller");
const {toggleBlockEmployee} = require("../controllers/employee.controller");
const {updateEmployee} = require("../controllers/employee.controller")


router.get("/all-employees", verifyToken, isAdmin, getAllEmployees);
router.delete("/delete/:id", verifyToken, isAdmin, deleteEmployee);
router.put("/block-toggle/:id", verifyToken, isAdmin, toggleBlockEmployee);
router.put("/update/:id",verifyToken,isAdmin,updateEmployee);
module.exports = router; 

