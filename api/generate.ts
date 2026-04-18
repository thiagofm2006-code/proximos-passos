import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Metodo nao permitido" });
    }

    const { input } = req.body || {};

    if (!input) {
      return res.status(400).json({ error: "Input vazio" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Voce e um Product Owner senior. Transforme qualquer demanda em um plano claro com secoes: Objetivo, Contexto, Hipoteses, Plano de acao, Metricas, Riscos e Proximos passos.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const result =
      completion.choices?.[0]?.message?.content || "Sem resposta";

    return res.status(200).json({ result });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "Erro interno",
    });
  }
}
