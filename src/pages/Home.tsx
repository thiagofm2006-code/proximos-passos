import { useState, useEffect } from "react";
import { InputArea } from "../components/InputArea";
import { OutputPanel } from "../components/OutputPanel";
import { InfoBlocks } from "../components/InfoBlocks";

const API_URL = "";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [generated, setGenerated] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

const handleGenerate = async () => {
  if (!input.trim()) return;

  setGenerated(true);
  setLoading(true);

  try {
    const cleanInput = input
      .normalize("NFKD")
      .replace(/[^\x00-\x7F]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: cleanInput,
    });

    const text = await res.text();

    console.log("RESPOSTA RAW:", text);

    const data = JSON.parse(text);

    if (!res.ok) {
      throw new Error(data.error || "Erro");
    }

    setResult(data.result || "");
  } catch (error) {
    console.error(error);
    setResult("Erro ao gerar resposta.");
  } finally {
    setLoading(false);
  }
};
  
  const infoItems = [
    {
      title: "Demandas vagas travam decisões",
      content:
        "A maioria das demandas chega sem contexto, sem objetivo claro e sem direcionamento.",
    },
    {
      title: "Executar sem estruturar é o erro silencioso",
      content:
        "Ir direto para execução gera desalinhamento, retrabalho e baixo impacto.",
    },
    {
      title: "Product Owners de alto nível pensam diferente",
      content:
        "Eles estruturam antes de agir: objetivo, hipóteses e plano claro.",
    },
    {
      title: "Transforme qualquer demanda em um plano claro",
      content:
        "Com poucos inputs, você gera direcionamento real e acionável.",
    },
  ];

  const chipStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    cursor: "pointer",
    fontSize: 12,
    width: isMobile ? "100%" : "auto",
  };

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        maxWidth: 1200,
        margin: "0 auto",
      }}

      {/* HERO */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 40,
          marginBottom: 50,
        }}
      >
        {/* TEXTO */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: isMobile ? 26 : 38,
              fontWeight: 800,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Recebeu uma demanda e não sabe o que fazer?
            <br />
            <span style={{ color: "#2563eb" }}>
              Gere um guia completo para te guiar.
            </span>
          </h1>

          <p style={{ color: "#64748b" }}>
            Escreva o problema e receba um plano estruturado mostrando como um Product Owner faria.
          </p>
        </div>

        {/* INPUT */}
        <div
          style={{
            flex: 1,
            width: "100%",
            backdropFilter: "blur(16px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
            borderRadius: 20,
            padding: isMobile ? 16 : 24,
            boxShadow: "0 25px 80px rgba(37,99,235,0.18)",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <h3>Escolha um exemplo abaixo ou escreva a sua demanda:</h3>
          </div>

          {/* EXEMPLOS */}
          <div style={{ marginBottom: 10 }}>
            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Entender o aumento do Churn nos últimos 3 meses e identificar os principais fatores."
                )
              }
            >
              Entender o aumento do Churn
            </button>
          </div>

          <div style={{ marginBottom: 10 }}>
            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Criar um plano para aumento do NPS e identificar quais funcionalidades geram mais valor."
                )
              }
            >
              Fazer plano para aumentar o NPS
            </button>
          </div>

          <div style={{ marginBottom: 10 }}>
            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Mapear a jornada do usuário completa e identificar pontos de atrito e oportunidades de melhoria."
                )
              }
            >
              Mapear jornada do usuário
            </button>
          </div>

          <InputArea
            value={input}
            onChange={setInput}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </div>
      </div>

      {/* RESULTADO */}
      {generated && (
        <div style={{ marginBottom: 40 }}>
          <OutputPanel loading={loading} result={result} />
        </div>
      )}

      {/* INFO */}
      <InfoBlocks items={infoItems} />

      {/* FOOTER */}
      <p
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 12,
          color: "#94a3b8",
        }}
      >
        Feito por Product Owner para Product Owner
      </p>
    </div>
  );
}
