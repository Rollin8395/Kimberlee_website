const stats = [
  { num: "100+",  label: "Photos" },
  { num: "50+",   label: "Videos" },
  { num: "★ 5.0", label: "Client Rating" },
  { num: "5+",    label: "Years Active" },
];

export default function Stats() {
  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      borderTop: "0.5px solid rgba(201,168,76,0.18)",
      borderBottom: "0.5px solid rgba(201,168,76,0.18)",
      background: "#070503",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: "36px 24px",
          textAlign: "center",
          borderRight: i < stats.length - 1 ? "0.5px solid rgba(201,168,76,0.12)" : "none",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: 42, fontWeight: 300,
            color: "var(--gold)",
            lineHeight: 1,
            marginBottom: 8,
            letterSpacing: "0.02em",
          }}>
            {s.num}
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 9, fontWeight: 400,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}>
            {s.label}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 640px) {
          section { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}