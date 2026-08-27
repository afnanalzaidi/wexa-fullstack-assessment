const express = require("express");
const { getSkills } = require("../controllers/candidateController");

const router = express.Router();

router.get("/:candidateId/skills", getSkills);

module.exports = router;