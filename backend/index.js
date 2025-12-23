const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Gap2Hire Backend Running");
});

// ANALYZE ROUTE
app.post("/api/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Resume text missing" });
  }

  // Dummy AI response (industry demo)
  res.json({
    strengths: [
      "Good knowledge in AWS",
      "Hands-on Docker experience"
    ],
    gaps: [
      "Deployment details missing",
      "System design explanation needed"
    ],
    suggestions: [
      "Add AWS project deployment steps",
      "Mention scalability approaches"
    ]
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
