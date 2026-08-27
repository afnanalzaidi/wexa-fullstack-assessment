const express = require("express");
const cors = require("cors");
require("dotenv").config();

const driver = require("./db/cognodb");
const testRoutes = require("./routes/testRoutes");
const jobRoutes = require("./routes/jobRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const skillGapRoutes = require("./routes/skillGapRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const skillRoutes = require("./routes/skillRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", testRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", recommendationRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/skills", skillRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Wexa backend is running" });
});

app.get("/test-db", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      RETURN "CognoDB connected!" AS message
    `);

    res.json({
      success: true,
      message: result.records[0].get("message"),
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Could not connect to CognoDB",
    });
  } finally {
    await session.close();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});