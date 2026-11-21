"use client";

import { useEffect, useState } from "react";

// The export is static, so the build year is baked into the HTML; this
// corrects it on load if the site hasn't been rebuilt since New Year.
export default function Year({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span id="year">{year}</span>;
}
