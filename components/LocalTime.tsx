"use client";

import { useEffect, useState } from "react";

// Victor's wall-clock time in Recife (UTC−3, no daylight saving).
// Empty in the static HTML, filled on load, refreshed every 20s.
const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Recife",
  hour: "2-digit",
  minute: "2-digit",
});

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return <time className="local-time">{time ?? "--:--"}</time>;
}
