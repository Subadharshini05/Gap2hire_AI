const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gap2Hire AI Backend Running");
});

app.post("/analyze-resume", (req, res) => {
  res.json({
    matchScore: 72,
    missingSkills: ["AWS", "Docker"],
    resumeFeedback: [
      "Projects lack deployment details",
      "Cloud skills not mentioned"
    ],
    interviewQuestions: [
      "How would you deploy a MERN app on AWS?",
      "What problem does Docker solve?"
    ]
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});