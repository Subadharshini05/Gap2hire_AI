import axios from "axios";

/* Generate interview questions from gaps */
export const generateQuestions = async (req, res) => {
  try {
    const { gaps } = req.body;

    const prompt = `
You are a technical interviewer.
Generate 3 practical interview questions based on these gaps.
Return ONLY valid JSON.

JSON FORMAT:
{ "questions": ["string"] }

Gaps:
${(gaps || []).join(", ")}
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
    res.json({ questions: parsed.questions || [] });
  } catch {
    res.json({
      questions: [
        "Explain a project you worked on and challenges faced.",
        "How do you learn and apply new technologies?"
      ]
    });
  }
};

/* STAR evaluation */
export const evaluateSTAR = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
Evaluate the answer using STAR.
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
      situation: "Unclear context",
      task: "Task not specific",
      action: "Actions lack detail",
      result: "Results not quantified",
      overallFeedback: "Structure answer clearly using STAR."
    });
  }
};

/* STAR Answer Rewriter */
export const rewriteSTAR = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
Rewrite the candidate's answer into a strong STAR-based answer.
Be professional and concise.
Return ONLY valid JSON.

JSON FORMAT:
{ "rewrittenAnswer": "string" }

Question:
${question}

Original Answer:
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
        temperature: 0.3
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
      rewrittenAnswer:
        "Using STAR: In a recent project, I identified the requirement, took ownership of the task, implemented the solution with best practices, and achieved measurable results."
    });
  }
};
