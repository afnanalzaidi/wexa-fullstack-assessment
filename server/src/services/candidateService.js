const driver = require("../db/cognodb");

async function getCandidateSkills(candidateId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(skill:Skill)

      RETURN
        skill.id AS id,
        skill.name AS name,
        skill.category AS category

      ORDER BY skill.name
      `,
      {
        candidateId,
      },
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      category: record.get("category"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getCandidateSkills,
};