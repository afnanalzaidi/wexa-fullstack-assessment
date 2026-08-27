const driver = require("../db/cognodb");

async function getSkillGap(candidateId, jobId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})
      MATCH (job:Job {id: $jobId})
      MATCH (job)-[:REQUIRES]->(requiredSkill:Skill)

      OPTIONAL MATCH (c)-[:HAS_SKILL]->(candidateSkill:Skill)

      WITH
        c,
        job,
        collect(DISTINCT requiredSkill) AS requiredSkills,
        collect(DISTINCT candidateSkill) AS candidateSkills

      WITH
        c,
        job,
        [
          skill IN requiredSkills
          WHERE NOT skill IN candidateSkills
        ] AS missingSkills

      RETURN
        c.id AS candidateId,
        c.name AS candidateName,
        job.id AS jobId,
        job.title AS jobTitle,
        missingSkills
      `,
      {
        candidateId,
        jobId,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      candidateId: record.get("candidateId"),
      candidateName: record.get("candidateName"),
      jobId: record.get("jobId"),
      jobTitle: record.get("jobTitle"),
      missingSkills: record.get("missingSkills").map((skill) => ({
        id: skill.properties.id,
        name: skill.properties.name,
        category: skill.properties.category,
      })),
    };
  } finally {
    await session.close();
  }
}

module.exports = {
  getSkillGap,
};