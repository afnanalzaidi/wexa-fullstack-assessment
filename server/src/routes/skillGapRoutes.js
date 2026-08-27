const express = require("express");
const skillGapController = require("../controllers/skillGapController");

const router = express.Router();

router.get(
  "/:candidateId/:jobId",
  skillGapController.getSkillGap
);

module.exports = router;