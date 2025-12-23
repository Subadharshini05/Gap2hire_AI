const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Gap2Hire Backend Running");
});

// Resume / Interview analysis API
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  // Dummy AI response (for hackathon demo)
  const response = {
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
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});