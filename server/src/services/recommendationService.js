const driver = require("../db/cognodb");

async function getJobRecommendations(candidateId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(candidateSkill:Skill)
      MATCH (job:Job)-[:REQUIRES]->(requiredSkill:Skill)

      WITH
        c,
        job,
        collect(DISTINCT candidateSkill) AS candidateSkills,
        collect(DISTINCT requiredSkill) AS requiredSkills

      WITH
        c,
        job,
        candidateSkills,
        requiredSkills,
        [skill IN requiredSkills
          WHERE skill IN candidateSkills] AS matchedSkills

      MATCH (job)-[:OFFERS_AT]->(company:Company)

      RETURN
        c.id AS candidateId,
        c.name AS candidateName,
        job.id AS jobId,
        job.title AS title,
        job.level AS level,
        job.description AS description,
        company.name AS company,
        size(matchedSkills) AS matchingSkills,
        size(requiredSkills) AS totalRequiredSkills,
        round(
          100.0 * size(matchedSkills) / size(requiredSkills)
        ) AS matchPercentage

      ORDER BY matchPercentage DESC
      `,
      {
        candidateId,
      },
    );

    return result.records.map((record) => ({
      candidateId: record.get("candidateId"),
      candidateName: record.get("candidateName"),
      jobId: record.get("jobId"),
      title: record.get("title"),
      level: record.get("level"),
      description: record.get("description"),
      company: record.get("company"),
      matchingSkills: record.get("matchingSkills").toNumber(),
      totalRequiredSkills: record.get("totalRequiredSkills").toNumber(),
      matchPercentage: record.get("matchPercentage"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getJobRecommendations,
};
