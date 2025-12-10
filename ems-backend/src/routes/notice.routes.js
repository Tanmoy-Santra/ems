
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const {getAllNotice} = require("../controllers/notice.controller");
const {addNotice}= require("../controllers/notice.controller");
// Get all notices (Employee side)
router.get("/get-notices", verifyToken,getAllNotice);
router.post("/add-notice", verifyToken, addNotice);

module.exports = router;
