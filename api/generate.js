export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Metodo nao permitido",
      });
    }

    return res.status(200).json({
      ok: true,
      body: req.body,
      message: "POST funcionando",
    });
  } catch (error) {
    return res.status(500).json({
      error: String(error.message || error),
    });
  }
}
