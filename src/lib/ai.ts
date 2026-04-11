import axios from "axios";

export const getAIResponse = async (message: string) => {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a medical assistant.

- Give general advice
- Suggest possible causes
- Do NOT prescribe exact medicine
- Tell when to see doctor
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.choices[0].message.content;
};

export const getMedicineRecommendation = async (
  userQuery: string,
  medicines: any[]
) => {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a medical assistant.

- Suggest relevant medicines from given list
- Explain why they are useful
- Do NOT give dosage
- Keep it simple
          `,
        },
        {
          role: "user",
          content: `
User problem: ${userQuery}

Available medicines:
${medicines.map((m) => m.name).join(", ")}

Recommend helpful medicines and explain briefly.
          `,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.choices[0].message.content;
};