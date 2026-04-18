import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Input vazio" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
Você é um Product Owner sênior extremamente estratégico.

Transforme qualquer demanda vaga em um plano profundo e acionável.

Formato obrigatório:

🎯 Objetivo

🧠 Contexto

🔍 Hipóteses

🛠 Plano de ação

📊 Métricas

⚠️ Riscos

👉 Próximos passos

💡 Exemplos práticos

🧠 Aprendizados
          `,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const result = completion.choices?.[0]?.message?.content || "Sem resposta";

    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao gerar resposta",
    });
  }
}
