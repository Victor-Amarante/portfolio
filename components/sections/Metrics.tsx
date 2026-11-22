const METRICS = [
  { val: "7.5×", label: "Automated scheduling increase" },
  { val: "200%+", label: "Confirmation rate growth" },
  { val: "~90%", label: "Response quality improvement" },
  { val: "50+", label: "Automation projects delivered" },
  { val: "10k+", label: "Monthly appointments scaled" },
  { val: "1st", label: "Place · PoloTec DemoDay 2024" },
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
