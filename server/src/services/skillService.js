const driver = require("../db/cognodb");

async function getSkillOpportunities(candidateId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})
      OPTIONAL MATCH (c)-[:HAS_SKILL]->(currentSkill:Skill)

      WITH c, collect(DISTINCT currentSkill.id) AS currentSkillIds

      MATCH (job:Job)-[:REQUIRES]->(skill:Skill)

      WHERE NOT skill.id IN currentSkillIds

      WITH
        skill,
        count(DISTINCT job) AS jobsUnlocked

      RETURN
        skill.id AS id,
        skill.name AS name,
        skill.category AS category,
        jobsUnlocked

      ORDER BY jobsUnlocked DESC, name ASC
      `,
      {
        candidateId,
      },
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
      jobsUnlocked: record.get("jobsUnlocked").toNumber(),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getSkillOpportunities,
};