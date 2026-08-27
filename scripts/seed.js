require("dotenv").config({ path: "./server/.env" });

const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

const skills = [
  { id: "s1", name: "JavaScript", category: "Programming" },
  { id: "s2", name: "TypeScript", category: "Programming" },
  { id: "s3", name: "React", category: "Frontend" },
  { id: "s4", name: "Node.js", category: "Backend" },
  { id: "s5", name: "Express.js", category: "Backend" },
  { id: "s6", name: "PostgreSQL", category: "Database" },
  { id: "s7", name: "MongoDB", category: "Database" },
  { id: "s8", name: "Docker", category: "DevOps" },
  { id: "s9", name: "AWS", category: "Cloud" },
  { id: "s10", name: "Next.js", category: "Frontend" },
  { id: "s11", name: "Python", category: "Programming" },
  { id: "s12", name: "FastAPI", category: "Backend" },
];

const companies = [
  {
    id: "c1",
    name: "TechNova",
    industry: "Software",
  },
  {
    id: "c2",
    name: "CloudWorks",
    industry: "Cloud Computing",
  },
  {
    id: "c3",
    name: "DataSphere",
    industry: "Data & AI",
  },
];

const jobs = [
  {
    id: "j1",
    title: "Full Stack Developer",
    level: "Mid",
    description: "Build and maintain modern web applications.",
    companyId: "c1",
  },
  {
    id: "j2",
    title: "Frontend Engineer",
    level: "Junior",
    description: "Build responsive interfaces using modern frontend technologies.",
    companyId: "c1",
  },
  {
    id: "j3",
    title: "Backend Engineer",
    level: "Mid",
    description: "Develop scalable APIs and backend services.",
    companyId: "c2",
  },
  {
    id: "j4",
    title: "Cloud Software Engineer",
    level: "Senior",
    description: "Build and deploy cloud-native applications.",
    companyId: "c2",
  },
  {
    id: "j5",
    title: "Python Backend Developer",
    level: "Mid",
    description: "Develop APIs and services using Python.",
    companyId: "c3",
  },
];

const candidates = [
  {
    id: "candidate1",
    name: "Afnan",
    title: "Software Engineer",
  },
  {
    id: "candidate2",
    name: "Musa",
    title: "Frontend Developer",
  },
  {
    id: "candidate3",
    name: "Omar",
    title: "Backend Developer",
  },
];

const candidateSkills = [
  { candidateId: "candidate1", skillId: "s1", level: "Advanced" },
  { candidateId: "candidate1", skillId: "s3", level: "Advanced" },
  { candidateId: "candidate1", skillId: "s4", level: "Intermediate" },

  { candidateId: "candidate2", skillId: "s1", level: "Advanced" },
  { candidateId: "candidate2", skillId: "s3", level: "Advanced" },
  { candidateId: "candidate2", skillId: "s10", level: "Intermediate" },

  { candidateId: "candidate3", skillId: "s1", level: "Intermediate" },
  { candidateId: "candidate3", skillId: "s4", level: "Advanced" },
  { candidateId: "candidate3", skillId: "s5", level: "Advanced" },
  { candidateId: "candidate3", skillId: "s6", level: "Intermediate" },
];

const jobSkills = [
  // Full Stack Developer
  { jobId: "j1", skillId: "s1", importance: "Required" },
  { jobId: "j1", skillId: "s3", importance: "Required" },
  { jobId: "j1", skillId: "s4", importance: "Required" },
  { jobId: "j1", skillId: "s6", importance: "Required" },
  { jobId: "j1", skillId: "s8", importance: "Preferred" },

  // Frontend Engineer
  { jobId: "j2", skillId: "s1", importance: "Required" },
  { jobId: "j2", skillId: "s3", importance: "Required" },
  { jobId: "j2", skillId: "s2", importance: "Preferred" },
  { jobId: "j2", skillId: "s10", importance: "Preferred" },

  // Backend Engineer
  { jobId: "j3", skillId: "s1", importance: "Required" },
  { jobId: "j3", skillId: "s4", importance: "Required" },
  { jobId: "j3", skillId: "s5", importance: "Required" },
  { jobId: "j3", skillId: "s6", importance: "Required" },
  { jobId: "j3", skillId: "s8", importance: "Preferred" },

  // Cloud Software Engineer
  { jobId: "j4", skillId: "s4", importance: "Required" },
  { jobId: "j4", skillId: "s8", importance: "Required" },
  { jobId: "j4", skillId: "s9", importance: "Required" },
  { jobId: "j4", skillId: "s6", importance: "Preferred" },

  // Python Backend Developer
  { jobId: "j5", skillId: "s11", importance: "Required" },
  { jobId: "j5", skillId: "s12", importance: "Required" },
  { jobId: "j5", skillId: "s6", importance: "Preferred" },
];

const relatedSkills = [
  ["s1", "s2"],   // JavaScript → TypeScript
  ["s1", "s3"],   // JavaScript → React
  ["s2", "s3"],   // TypeScript → React
  ["s3", "s10"],  // React → Next.js
  ["s4", "s5"],   // Node.js → Express.js
  ["s4", "s6"],   // Node.js → PostgreSQL
  ["s6", "s7"],   // PostgreSQL → MongoDB
  ["s8", "s9"],   // Docker → AWS
  ["s11", "s12"], // Python → FastAPI
];

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Starting CareerGraph seed...");

    // Clear existing demo data.
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Existing graph cleared.");

    // Create skills.
    for (const skill of skills) {
      await session.run(
        `
        CREATE (s:Skill {
          id: $id,
          name: $name,
          category: $category
        })
        `,
        skill
      );
    }

    console.log(`Created ${skills.length} skills.`);

    // Create companies.
    for (const company of companies) {
      await session.run(
        `
        CREATE (c:Company {
          id: $id,
          name: $name,
          industry: $industry
        })
        `,
        company
      );
    }

    console.log(`Created ${companies.length} companies.`);

    // Create jobs and connect them to companies.
    for (const job of jobs) {
      await session.run(
        `
        MATCH (c:Company {id: $companyId})
        CREATE (j:Job {
          id: $id,
          title: $title,
          level: $level,
          description: $description
        })
        CREATE (j)-[:OFFERS_AT]->(c)
        `,
        job
      );
    }

    console.log(`Created ${jobs.length} jobs.`);

    // Create candidates.
    for (const candidate of candidates) {
      await session.run(
        `
        CREATE (c:Candidate {
          id: $id,
          name: $name,
          title: $title
        })
        `,
        candidate
      );
    }

    console.log(`Created ${candidates.length} candidates.`);

    // Candidate → Skill relationships.
    for (const item of candidateSkills) {
      await session.run(
        `
        MATCH (c:Candidate {id: $candidateId})
        MATCH (s:Skill {id: $skillId})
        CREATE (c)-[:HAS_SKILL {level: $level}]->(s)
        `,
        item
      );
    }

    console.log(`Created ${candidateSkills.length} candidate-skill relationships.`);

    // Job → Skill relationships.
    for (const item of jobSkills) {
      await session.run(
        `
        MATCH (j:Job {id: $jobId})
        MATCH (s:Skill {id: $skillId})
        CREATE (j)-[:REQUIRES {importance: $importance}]->(s)
        `,
        item
      );
    }

    console.log(`Created ${jobSkills.length} job-skill relationships.`);

    // Skill → Skill relationships.
    for (const [fromSkillId, toSkillId] of relatedSkills) {
      await session.run(
        `
        MATCH (a:Skill {id: $fromSkillId})
        MATCH (b:Skill {id: $toSkillId})
        CREATE (a)-[:RELATED_TO]->(b)
        `,
        {
          fromSkillId,
          toSkillId,
        }
      );
    }

    console.log(`Created ${relatedSkills.length} skill relationships.`);

    console.log("CareerGraph seed completed successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();