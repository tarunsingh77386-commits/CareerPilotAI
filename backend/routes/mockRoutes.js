const express = require("express");
const router = express.Router();

const { generateMockInterview } = require("../controllers/mockController");

router.post("/generate", generateMockInterview);

module.exports = router;