import axios from "axios";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim() === "") {
      return res.json({
        strengths: [],
        gaps: [],
        suggestions: []
      });
    }

    const prompt = `
You are a professional technical recruiter.

Analyze the input and return ONLY valid JSON.
Even if input is short skills, infer reasonable points.

JSON FORMAT:
{
  "strengths": ["string"],
  "gaps": ["string"],
  "suggestions": ["string"]
}

Input:
${resumeText}
`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Return JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let parsed;
    try {
      parsed = JSON.parse(response.data.choices[0].message.content);
    } catch {
      parsed = {};
    }

    // 🧠 INDUSTRY FALLBACK (IMPORTANT)
    const strengths =
      parsed.strengths && parsed.strengths.length > 0
        ? parsed.strengths
        : [
            "Basic understanding of cloud technologies",
            "Familiarity with containerization concepts"
          ];

    const gaps =
      parsed.gaps && parsed.gaps.length > 0
        ? parsed.gaps
        : [
            "Hands-on deployment experience",
            "CI/CD pipeline knowledge"
          ];

    const suggestions =
      parsed.suggestions && parsed.suggestions.length > 0
        ? parsed.suggestions
        : [
            "Build a small AWS deployment project",
            "Practice Dockerizing a simple application",
            "Learn basics of CI/CD using GitHub Actions"
          ];

    res.json({
      strengths,
      gaps,
      suggestions
    });

  } catch (err) {
    res.json({
      strengths: [
        "Basic technical foundation"
      ],
      gaps: [
        "Real-world project exposure"
      ],
      suggestions: [
        "Work on small deployment projects",
        "Strengthen fundamentals with practice"
      ]
    });
  }
};
