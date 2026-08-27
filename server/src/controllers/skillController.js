const {
  getSkillOpportunities,
} = require("../services/skillService");

async function getSkillOpportunitiesController(req, res) {
  try {
    const { candidateId } = req.params;

    const skills = await getSkillOpportunities(candidateId);

    res.json({
      success: true,
      candidateId,
      skills,
    });
  } catch (error) {
    console.error("Failed to get skill opportunities:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load skill opportunities.",
    });
  }
}

module.exports = {
  getSkillOpportunitiesController,
};