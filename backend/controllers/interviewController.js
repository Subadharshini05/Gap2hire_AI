import axios from "axios";

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
You are an experienced interviewer.

Evaluate the candidate's answer using the STAR method.

Return ONLY valid JSON.

JSON FORMAT:
{
  "situation": "feedback",
  "task": "feedback",
  "action": "feedback",
  "result": "feedback",
  "overallFeedback": "short improvement advice"
}

Interview Question:
${question}

Candidate Answer:
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

  } catch (err) {
    res.json({
      situation: "Situation not clearly explained",
      task: "Task is unclear",
      action: "Actions lack detail",
      result: "Result not measurable",
      overallFeedback: "Structure your answer clearly using STAR."
    });
  }
};
