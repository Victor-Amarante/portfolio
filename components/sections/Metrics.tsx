const METRICS = [
  { val: "7.5×", label: "Automated scheduling increase" },
  { val: "200%+", label: "Confirmation rate growth" },
  { val: "~90%", label: "Response quality improvement" },
  { val: "50+", label: "Automation projects delivered" },
  { val: "10k+", label: "Monthly appointments scaled" },
  { val: "1st", label: "Place · PoloTec DemoDay 2024" },
];

export default function Metrics() {
  return (
    <section id="metrics">
      <div className="metrics-wrap">
        <div className="metrics-track" id="metricsTrack">
          {/* rendered twice so the marquee loops seamlessly */}
          {[...METRICS, ...METRICS].map((m, i) => (
            <div key={i} className="metric-pill">
              <div className="metric-dot"></div>
              <span className="metric-val">{m.val}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
