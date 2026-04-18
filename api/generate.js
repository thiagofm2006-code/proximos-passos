import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Metodo nao permitido" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const input = req.body?.input || "";

    if (!input) {
      return res.status(400).json({ error: "Input vazio" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Voce e um Product Owner senior. Estruture a resposta em Objetivo, Contexto, Hipoteses, Plano de acao, Metricas, Riscos e Proximos passos.",
        },
        {
          role: "user",
          content: String(input),
        },
      ],
      temperature: 0.7,
    });

    const result =
      completion.choices?.[0]?.message?.content || "Sem resposta";

    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro interno ao gerar resposta",
    });
  }
}
