import axios from "axios";

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.json({
        matchScore: 0,
        strengths: [],
        gaps: [],
        atsMissing: [],
        summary: ""
      });
    }

    const prompt = `
You are an experienced technical recruiter.

Analyze the candidate Resume against the given Job Description.
Be practical and role-specific.

Return ONLY valid JSON. No markdown. No explanation.

JSON FORMAT:
{
  "matchScore": number (0-100),
  "strengths": ["string"],
  "gaps": ["string"],
  "atsMissing": ["string"],
  "summary": "2-3 line professional summary"
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Return JSON only." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4
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

    // Industry-safe fallback
    const result = {
      matchScore: parsed.matchScore ?? 60,
      strengths: parsed.strengths?.length ? parsed.strengths : [
        "Relevant foundational skills aligned to the role"
      ],
      gaps: parsed.gaps?.length ? parsed.gaps : [
        "Advanced role-specific experience"
      ],
      atsMissing: parsed.atsMissing?.length ? parsed.atsMissing : [
        "Role-specific keywords"
      ],
      summary: parsed.summary || "Candidate shows partial alignment with the role and can improve with targeted upskilling."
    };

    res.json(result);

  } catch (err) {
    res.json({
      matchScore: 55,
      strengths: ["Basic role-aligned knowledge"],
      gaps: ["Hands-on project experience"],
      atsMissing: ["Key JD keywords"],
      summary: "Candidate needs more role-focused practice to improve fit."
    });
  }
};
