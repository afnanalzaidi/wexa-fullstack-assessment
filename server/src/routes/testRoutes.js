const express = require("express");
const driver = require("../db/cognodb");

const router = express.Router();

router.post("/test-person", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MERGE (p:Person {name: $name})
      RETURN p
      `,
      {
        name: "Afnan",
      }
    );

    const person = result.records[0].get("p");

    res.json({
      success: true,
      message: "Person created/found",
      person: person.properties,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database error",
    });
  } finally {
    await session.close();
  }
});

module.exports = router;