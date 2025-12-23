const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Gap2Hire AI Backend Running");
});

// Resume / Interview Analysis API
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  // Mock AI-style response (perfect for hackathon demo)
  const response = {
    strengths: [
      "Strong AWS fundamentals",
      "Hands-on Docker knowledge",
      "Good understanding of MERN stack"
    ],
    gaps: [
      "Deployment steps are not clearly explained",
      "System design depth needs improvement"
    ],
    suggestions: [
      "Explain CI/CD pipeline usage",
      "Mention scalability strategies like load balancers and caching",
      "Add cloud deployment experience"
    ]
  };

  res.json(response);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});