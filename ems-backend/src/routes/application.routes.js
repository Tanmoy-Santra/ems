const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const {trackApplication} = require("../controllers/application.controller");
const {showAllApplications} = require("../controllers/application.controller");
const {replyApplication} = require("../controllers/application.controller");
const {getMyApplications} = require("../controllers/application.controller");
const {updateApplication} = require("../controllers/application.controller");
// Get all notices (Employee side)
router.post("/track-applications", verifyToken,trackApplication);
router.get("/show-applications",verifyToken,showAllApplications)
router.get("/reply-applications",verifyToken,replyApplication)
router.get("/my-applications/:userId",verifyToken,getMyApplications)
router.put("/reply/:applicationId",verifyToken,updateApplication)

module.exports = router;
