const skillGapService = require("../services/skillGapService");

async function getSkillGap(req, res) {
  try {
    const { candidateId, jobId } = req.params;

    const skillGap = await skillGapService.getSkillGap(
      candidateId,
      jobId
    );

    if (!skillGap) {
      return res.status(404).json({
        success: false,
        message: "Candidate or job not found",
      });
    }

    res.json({
      success: true,
      ...skillGap,
    });
  } catch (error) {
    console.error("Error fetching skill gap:", error);

    res.status(500).json({
      success: false,
      message: "Unable to calculate skill gap",
    });
  }
}

module.exports = {
  getSkillGap,
};