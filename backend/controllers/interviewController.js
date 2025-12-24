import axios from "axios";

/**
 * Generate interview questions based on skill gaps
 */
export const generateQuestions = async (req, res) => {
  try {
    const { gaps } = req.body;

    if (!gaps || gaps.length === 0) {
      return res.json({
        questions: [
          "Explain a project you worked on and the challenges you faced."
        ]
      });
    }

    const prompt = `
You are a technical interviewer.

Based on the following skill gaps, generate 3 interview questions.
Questions must be practical and role-oriented.

Return ONLY valid JSON.

JSON FORMAT:
{
  "questions": ["string"]
}

Skill Gaps:
${gaps.join(", ")}
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

    const parsed = JSON.parse(response.data.choices[0].message.content);

    res.json({
      questions: parsed.questions || []
    });

  } catch (err) {
    res.json({
      questions: [
        "Explain a time you worked on a real-world project.",
        "How do you approach learning new technologies?"
      ]
    });
  }
};

/**
 * STAR evaluation (already used)
 */
export const evaluateSTAR = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.json({
        situation: "",
        task: "",
        action: "",
        result: "",
        overallFeedback: "Please answer the question to get feedback."
      });
    }

    const prompt = `
Evaluate the answer using STAR method.

Return ONLY valid JSON.

JSON FORMAT:
{
  "situation": "feedback",
  "task": "feedback",
  "action": "feedback",
  "result": "feedback",
  "overallFeedback": "short advice"
}

Question:
${question}

Answer:
${answer}
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

    const parsed = JSON.parse(response.data.choices[0].message.content);
    res.json(parsed);

  } catch {
    res.json({
      situation: "Not clearly explained",
      task: "Task unclear",
      action: "Action lacks depth",
      result: "Result not measurable",
      overallFeedback: "Improve structure using STAR."
    });
  }
};
