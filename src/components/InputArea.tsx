type Props = {
  value: string;
  onChange: (v: string) => void;
  onGenerate: () => void;
  loading: boolean;
};

export function InputArea({ value, onChange, onGenerate, loading }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      
      {/* HEADER */}
      <div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 4,
            color: "#0f172a"
          }}
        >
          Descreva sua demanda
        </h2>

        <p
          style={{
            fontSize: 14,
            color: "#64748b",
            maxWidth: 420
          }}
        >
          Explique o contexto, objetivo e o que precisa ser analisado.
          Quanto mais claro, melhor o resultado.
        </p>
      </div>

      {/* TEXTAREA */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Ex: Preciso avaliar se usuários que utilizam relatórios têm menor churn.

Hoje não temos clareza sobre isso e preciso estruturar essa análise para tomar decisão.`}
        style={{
          width: "100%",
          minHeight: 160,
          padding: 14,
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          background: "#f8fafc",
          fontSize: 14,
          lineHeight: 1.5,
          outline: "none",
          transition: "all 0.2s"
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid #3b82f6";
          e.target.style.background = "#ffffff";
          e.target.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.15)";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid #e2e8f0";
          e.target.style.background = "#f8fafc";
          e.target.style.boxShadow = "none";
        }}
      />

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* HINT */}
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          Dica: descreva problema + contexto + objetivo
        </span>

        {/* BOTÃO */}
        <button
          onClick={onGenerate}
          disabled={loading || !value}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s",
            opacity: loading || !value ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (!loading && value) {
              e.currentTarget.style.background = "#1d4ed8";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2563eb";
          }}
        >
          {loading ? "Gerando..." : "Gerar próximos passos"}
        </button>
      </div>

    </div>
  );
}