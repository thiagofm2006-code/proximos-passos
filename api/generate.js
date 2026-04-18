import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    // Apenas POST
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Metodo nao permitido",
      });
    }

    // Confere API Key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY nao encontrada",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Body
    const input = req.body?.input || "";

    if (!input.trim()) {
      return res.status(400).json({
        error: "Input vazio",
      });
    }

    // OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Voce e um Product Owner senior estrategico. Transforme qualquer demanda em resposta estruturada contendo: Objetivo, Contexto, Hipoteses, Plano de acao, Metricas, Riscos, Proximos passos, Exemplos praticos e Aprendizados.",
        },
        {
          role: "user",
          content: String(input),
        },
      ],
    });

    const result =
      completion?.choices?.[0]?.message?.content || "Sem resposta";

    return res.status(200).json({
      result,
    });
  } catch (error) {
    console.error("ERRO OPENAI:", error);

    return res.status(500).json({
      error:
        error?.message ||
        error?.error?.message ||
        "Erro interno ao gerar resposta",
    });
  }
}
