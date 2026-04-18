const OpenAI = require("openai");

module.exports = async function handler(req, res) {
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

    const client = new OpenAI({
      apiKey,
    });

    const input =
      typeof req.body?.input === "string"
        ? req.body.input
        : "teste";

    const completion =
      await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });

    return res.status(200).json({
      result:
        completion.choices?.[0]?.message?.content ||
        "Sem resposta",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: String(error.message || error),
    });
  }
};
