import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Metodo nao permitido",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API key ausente",
      });
    }

    const input =
      typeof req.body?.input === "string"
        ? req.body.input
        : "";

    const cleanInput = input
      .normalize("NFKD")
      .replace(/[^\x00-\x7F]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanInput) {
      return res.status(400).json({
        error: "Input vazio",
      });
    }

    const client = new OpenAI({
      apiKey,
    });

    const completion =
      await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a senior Product Owner. Answer in structured Portuguese.",
          },
          {
            role: "user",
            content: cleanInput,
          },
        ],
        temperature: 0.7,
      });

    const result =
      completion?.choices?.[0]?.message?.content ||
      "Sem resposta";

    return res.status(200).json({
      result: String(result),
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      error: "Falha interna",
    });
  }
}
