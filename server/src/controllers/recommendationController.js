const recommendationService = require("../services/recommendationService");

async function getJobRecommendations(req, res) {
  try {
    const { candidateId } = req.params;

    const recommendations =
      await recommendationService.getJobRecommendations(candidateId);

    if (recommendations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found or no recommendations available",
      });
    }

    res.json({
      success: true,
      candidate: {
        id: recommendations[0].candidateId,
        name: recommendations[0].candidateName,
      },
      recommendations: recommendations.map((job) => ({
        jobId: job.jobId,
        title: job.title,
        level: job.level,
        description: job.description,
        company: job.company,
        matchingSkills: job.matchingSkills,
        totalRequiredSkills: job.totalRequiredSkills,
        matchPercentage: job.matchPercentage,
      })),
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch job recommendations",
    });
  }
}

module.exports = {
  getJobRecommendations,
};
