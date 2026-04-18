import { useState, useEffect } from "react";
import { InputArea } from "../components/InputArea";
import { OutputPanel } from "../components/OutputPanel";
import { InfoBlocks } from "../components/InfoBlocks";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [generated, setGenerated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setGenerated(true);
    setLoading(true);

    try {
      const cleanInput = input
        .replace(/\u2028/g, " ")
        .replace(/\u2029/g, " ")
        .trim();

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: cleanInput,
        }),
      });

      const text = await res.text();

      console.log("RESPOSTA RAW:", text);

      if (!text) {
        throw new Error("Resposta vazia");
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.error || "Erro ao gerar");
      }

      setResult(data.result || "Sem resposta");
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
        "Transforme pedidos confusos em direcionamentos claros, objetivos e acionáveis.",
    },
    {
      title: "Executar sem estruturar custa caro",
      content:
        "Reduza retrabalho, desalinhamento e decisões baseadas em achismo.",
    },
    {
      title: "Pense como Product Owners de alto nível",
      content:
        "Receba raciocínios estratégicos, hipóteses fortes e planos bem organizados.",
    },
    {
      title: "Mais clareza. Mais velocidade.",
      content:
        "Use IA para acelerar análises e ganhar confiança nas próximas decisões.",
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
    textAlign: "center",
  };

  return (
    <div
      style={{
        padding: isMobile ? 20 : 40,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* TOPO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 12,
            color: "#64748b",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          Próximos Passos
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 40,
          marginBottom: 50,
          alignItems: "center",
        }}
      >
        {/* TEXTO */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: isMobile ? 28 : 42,
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: 14,
              color: "#0f172a",
            }}
          >
            Recebeu uma demanda
            <br />
            <span style={{ color: "#2563eb" }}>
              e não sabe por onde começar?
            </span>
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            Descreva o cenário e receba um plano estruturado com visão de
            Product Owner experiente.
          </p>
        </div>

        {/* INPUT */}
        <div
          style={{
            flex: 1,
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.75))",
            borderRadius: 22,
            padding: isMobile ? 16 : 24,
            boxShadow: "0 25px 80px rgba(37,99,235,0.14)",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                color: "#0f172a",
              }}
            >
              Escolha um exemplo ou escreva sua demanda:
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Entender o aumento do churn nos últimos 3 meses e identificar causas principais."
                )
              }
            >
              Entender aumento do churn
            </button>

            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Criar um plano para aumentar o NPS e melhorar a percepção de valor do produto."
                )
              }
            >
              Aumentar o NPS
            </button>

            <button
              style={chipStyle}
              onClick={() =>
                setInput(
                  "Mapear a jornada do usuário e encontrar pontos de atrito com oportunidades de melhoria."
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

      {/* BLOCOS */}
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
