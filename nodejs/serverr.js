const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.get("/standings", (req, res) => {
  fs.readFile("file.txt", "utf8", async (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const token = data.trim();

      const response = await fetch(
        "https://api.football-data.org/v4/competitions/PL/standings",
        {
          headers: {
            "X-Auth-Token": token,
          },
        }
      );

      const footballData = await response.json();

      res.json(footballData.standings[0].table);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});