// Each proof point keeps its unit and its source (`ctx`) visible.
const METRICS = [
  { val: "7.5×", label: "Increase in automated scheduling", ctx: "Amigo Flow" },
  { val: "200%+", label: "Increase in confirmations", ctx: "Amigo Flow" },
  { val: "~90%", label: "Better response quality and accuracy after the redesign", ctx: "Amigo Flow" },
  { val: "90%+", label: "Efficiency gains in selected workflows", ctx: "Queiroz Cavalcanti" },
  { val: "10+", label: "Statistical consulting projects for healthcare clients", ctx: "Fisher Consultoria" },
  { val: "1st", label: "Place at PoloTec Pre-Incubation & DemoDay 2024", ctx: "Redduo.AI" },
];

// Impact at a glance — a still, scannable grid (it used to be a marquee).
export default function Metrics() {
  return (
    <section id="metrics" aria-label="Impact metrics">
      <div className="container">
        <ul className="metrics-grid">
          {METRICS.map((m) => (
            <li key={m.label} className="metric">
              <span className="metric-val">{m.val}</span>
              <span className="metric-label">{m.label}</span>
              <span className="metric-context">{m.ctx}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
