const express = require("express");

const {
  getSkillOpportunitiesController,
} = require("../controllers/skillController");

const router = express.Router();

router.get(
  "/opportunities/:candidateId",
  getSkillOpportunitiesController,
);

module.exports = router;