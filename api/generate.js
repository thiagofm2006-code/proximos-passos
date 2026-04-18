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

    if (!input.trim()) {
      return res.status(400).json({
        error: "Input vazio",
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.8,
          messages: [
            {
              role: "system",
              content: `
Voce e um Product Owner senior altamente estrategico.

Transforme qualquer demanda vaga em um plano premium.

RESPONDA SEMPRE EM PORTUGUES.

FORMATO OBRIGATORIO:

🎯 Objetivo
Texto claro e estrategico.

🧠 Contexto
Explique o cenario e o problema real.

🔍 Hipóteses
- item
- item
- item

🛠 Plano de ação
1. passo
2. passo
3. passo

📊 Métricas
- item
- item

⚠️ Riscos
- item
- item

👉 Próximos passos
- item
- item

💡 Exemplos práticos
- item
- item

🧠 Aprendizados
- item
- item

REGRAS:
- Nunca use ###
- Nunca use markdown
- Nunca use tabela
- Seja profundo
- Seja objetivo
- Seja executivo
- Gere valor real
              `,
            },
            {
              role: "user",
              content: input,
            },
          ],
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
