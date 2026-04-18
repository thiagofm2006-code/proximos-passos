import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY não encontrada",
      });
    }

    const { input } = req.body || {};

    if (!input) {
      return res.status(400).json({
        error: "Input vazio",
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um Product Owner sênior e responde de forma estratégica e estruturada.",
        },
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0.7,
    });

    const result =
      completion.choices?.[0]?.message?.content || "Sem resposta";

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error("ERRO API:", error);

    return res.status(500).json({
      error: error?.message || "Erro interno",
    });
  }
}
