const driver = require("../db/cognodb");

async function getAllJobs() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (job:Job)-[:OFFERS_AT]->(company:Company)
      RETURN
        job.id AS id,
        job.title AS title,
        job.level AS level,
        job.description AS description,
        company.name AS company
      ORDER BY job.title
    `);

    return result.records.map((record) => ({
      id: record.get("id"),
      title: record.get("title"),
      level: record.get("level"),
      description: record.get("description"),
      company: record.get("company"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getAllJobs,
};