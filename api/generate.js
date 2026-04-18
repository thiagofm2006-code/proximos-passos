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
      typeof req.body === "string"
        ? req.body
        : req.body?.input || "";

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Voce e um Product Owner senior estrategico. Responda em portugues estruturando em Objetivo, Contexto, Hipoteses, Plano de acao, Metricas, Riscos e Proximos passos.",
            },
            {
              role: "user",
              content: input,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error:
          data?.error?.message ||
          "Erro OpenAI",
      });
    }

    return res.status(200).json({
      result:
        data?.choices?.[0]?.message?.content ||
        "Sem resposta",
    });
  } catch (error) {
    return res.status(500).json({
      error:
        error?.message ||
        "Erro interno",
    });
  }
}
