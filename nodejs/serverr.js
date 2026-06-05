const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors({
  origin: [
    "https://football-project-murex.vercel.app/"
  ]
}));
app.get("/standings", async (req, res) => {
  try {
    const token = process.env.FOOTBALL_API_KEY;

    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/standings",
      {
        headers: {
          "X-Auth-Token": token,
        },
      },
    );

    const footballData = await response.json();

    res.json(footballData.standings[0].table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});