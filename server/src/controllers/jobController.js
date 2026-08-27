const jobService = require("../services/jobService");

async function getAllJobs(req, res) {
  try {
    const jobs = await jobService.getAllJobs();

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
}

module.exports = {
  getAllJobs,
};