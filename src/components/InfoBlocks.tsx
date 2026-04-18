type Item = {
  title: string;
  content: string;
};

type Props = {
  items: Item[];
};

export function InfoBlocks({ items }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))",
            border: "1px solid rgba(37,99,235,0.1)",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 6,
              color: "#0f172a",
              fontSize: 14,
            }}
          >
            {item.title}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}