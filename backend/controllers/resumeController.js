exports.analyzeResume = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    // TEMP DUMMY RESPONSE
    res.json({
      strengths: ["Good knowledge in AWS", "Hands-on Docker experience"],
      gaps: ["Deployment details missing", "System design explanation needed"],
      suggestions: [
        "Add AWS project deployment steps",
        "Mention scalability approaches",
      ],
    });
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
