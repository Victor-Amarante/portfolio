import LocalTime from "../LocalTime";

// A /now line: what the work is this month.
// Update NOW_UPDATED whenever the list changes.
const NOW_UPDATED = "Nov 2026";
const NOW = [
  { k: "Building", v: "a card-services AI assistant at Getronics, with Banco do Brasil" },
  { k: "Researching", v: "role-specialized small language models at CIn/UFPE, with Zup" },
  { k: "Finishing", v: "a B.Sc. in Information Systems — expected Dec 2026" },
];

export default function Now() {
  return (
    <section id="now" aria-labelledby="now-label">
      <div className="container now-inner">
        <p className="now-label" id="now-label">
          Now <span>updated {NOW_UPDATED}</span>
        </p>
        <ul className="now-list">
          {NOW.map(({ k, v }) => (
            <li key={k}>
              <strong>{k}</strong> {v}
            </li>
          ))}
        </ul>
        <p className="now-clock">
          <span>Recife</span>
          <LocalTime />
          <span>UTC−3</span>
        </p>
      </div>
    </section>
  );
}
