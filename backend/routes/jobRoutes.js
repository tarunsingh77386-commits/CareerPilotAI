const express = require("express");
const router = express.Router();

const { recommendJobs } = require("../controllers/jobController");

router.post("/recommend", recommendJobs);

module.exports = router;