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

    let body = req.body;

    // Se vier string, parse manual
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const input =
      typeof body?.input === "string"
        ? body.input
        : "";

    if (!input.trim()) {
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
              "Voce e um Product Owner senior.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      });

    return res.status(200).json({
      result:
        completion.choices?.[0]?.message
          ?.content || "Sem resposta",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        error?.message || "Erro interno",
    });
  }
}
