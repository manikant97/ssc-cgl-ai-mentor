import OpenAI from "openai";

let client;

function getClient() {
  if (client) return client;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is missing or empty");
  }

  client = new OpenAI({ apiKey });
  return client;
}

function extractJson(text) {
  if (!text) return null;

  const trimmed = text.trim();

  if (trimmed.startsWith("```")) {
    const withoutFirstFence = trimmed.replace(/^```[a-zA-Z]*\n?/, "");
    const withoutLastFence = withoutFirstFence.replace(/```\s*$/, "");
    return withoutLastFence.trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function normalizeQuestionPayload(payload) {
  const difficulty = typeof payload.difficulty === "string" ? payload.difficulty.toLowerCase() : payload.difficulty;

  return {
    subject: payload.subject,
    topic: payload.topic,
    difficulty,
    questionText: payload.questionText,
    options: payload.options,
    correctOption: payload.correctOption,
    baseExplanation: payload.baseExplanation,
    expectedTime: payload.expectedTime,
  };
}

export async function generateQuestion() {
  const client = getClient();
  const prompt = `
Generate ONE SSC CGL Quant MCQ.

Rules:
- Difficulty: Easy
- Topic: Percentage
- 4 options
- One correct answer
- SSC exam style
- Hinglish explanation

Return ONLY JSON in this format:
{
  "subject": "Quant",
  "topic": "Percentage",
  "difficulty": "Easy",
  "questionText": "",
  "options": ["", "", "", ""],
  "correctOption": 0,
  "baseExplanation": "",
  "expectedTime": 30
}
`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const content = res?.choices?.[0]?.message?.content;
  const jsonText = extractJson(content);
  const parsed = JSON.parse(jsonText);

  return normalizeQuestionPayload(parsed);
}
