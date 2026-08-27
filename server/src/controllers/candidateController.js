const {
  getCandidateSkills,
} = require("../services/candidateService");

async function getSkills(req, res) {
  try {
    const { candidateId } = req.params;

    const skills = await getCandidateSkills(candidateId);

    res.json({
      success: true,
      candidateId,
      skills,
    });
  } catch (error) {
    console.error("Failed to get candidate skills:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load candidate skills.",
    });
  }
}

module.exports = {
  getSkills,
};