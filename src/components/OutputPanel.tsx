import { useEffect, useState } from "react";

type Props = {
  loading: boolean;
  result: string;
};

const messages = [
  "Organizando o problema...",
  "Pensando como um PO sênior...",
  "Estruturando o plano...",
  "Quase pronto...",
  "Transformando o caos em requisito...",
  "Preparando uma xícara de Café...",
  "Revisando o texto criado...",
  "Quase lá, aguenta firme...",
  "Dando os últimos retoques...",
  "Finalizando o plano de ação...",
  "Concluindo os detalhes finais...",
  "Feiito! Preparando para entregar o plano estruturado..."
];

// 🔥 LIMPA MARKDOWN (resolve ###)
function cleanText(text: string) {
  return text
    .replace(/###\s*/g, "") // remove ###
    .replace(/\*\*/g, "") // remove bold **
    .trim();
}

// 🔥 PARSER ROBUSTO (não depende de \n\n)
function parseSections(text: string) {
  const cleaned = cleanText(text);

  return cleaned
    .split(/(?=🎯|🧠|🔍|🛠|📊|⚠️|👉|💡)/g)
    .map((section) => {
      const lines = section.trim().split("\n");

      return {
        title: lines[0],
        content: lines.slice(1).join("\n"),
      };
    });
}

// 🔥 CORES POR SEÇÃO
function getAccent(title: string) {
  if (title.includes("Objetivo")) return "#2563eb";
  if (title.includes("Contexto")) return "#7c3aed";
  if (title.includes("Hipóteses")) return "#0ea5e9";
  if (title.includes("Plano")) return "#16a34a";
  if (title.includes("Métricas")) return "#f59e0b";
  if (title.includes("Riscos")) return "#ef4444";
  if (title.includes("Próximos")) return "#2563eb";
  if (title.includes("Exemplos")) return "#9333ea";
  if (title.includes("Aprendizados")) return "#0f172a";
  return "#64748b";
}

export function OutputPanel({ loading, result }: Props) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading) {
      setProgress(100);
      return;
    }

    setProgress(0);

    const p = setInterval(() => {
      setProgress((v) => Math.min(v + Math.random() * 10, 95));
    }, 300);

    const m = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(p);
      clearInterval(m);
    };
  }, [loading]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div>
        <p style={{ color: "#64748b", marginBottom: 10 }}>
          {messages[msgIndex]}
        </p>

        <div style={{ height: 8, background: "#e5e7eb", borderRadius: 999 }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #2563eb, #3b82f6)",
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    );
  }

  if (!result) return null;

  const sections = parseSections(result);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          Plano estruturado
        </h2>

        <button
          onClick={handleCopy}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>

      {/* SEÇÕES */}
      {sections.map((sec, i) => {
        const accent = getAccent(sec.title);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            {/* BARRA */}
            <div
              style={{
                width: 4,
                background: accent,
                borderRadius: 999,
              }}
            />

            {/* CARD */}
            <div
              style={{
                flex: 1,
                backdropFilter: "blur(12px)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
                border: `1px solid ${accent}30`,
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 6,
                  color: accent,
                }}
              >
                {sec.title}
              </div>

              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                {sec.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}