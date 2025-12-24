export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        strengths: [],
        gaps: [],
        suggestions: []
      });
    }

    // 🔥 Hackathon logic (SAFE)
    const fileName = req.file.originalname.toLowerCase();

    const strengths = [];
    const gaps = [];
    const suggestions = [];

    if (fileName.includes("aws") || fileName.includes("docker")) {
      strengths.push("Basic cloud & container knowledge");
    } else {
      gaps.push("Cloud fundamentals");
      suggestions.push("Learn AWS & Docker basics");
    }

    res.json({
      strengths,
      gaps,
      suggestions
    });

  } catch (err) {
    console.error("Resume analysis error:", err);
    res.json({
      strengths: [],
      gaps: [],
      suggestions: []
    });
  }
};
