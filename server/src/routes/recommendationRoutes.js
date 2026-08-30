const express = require("express");
const recommendationController = require("../controllers/recommendationController");

const router = express.Router();

router.get("/:candidateId",recommendationController.getJobRecommendations);

module.exports = router;