import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Victor Amarante — Senior Applied AI Engineer",
  description:
    "Victor Amarante — Senior Applied AI Engineer specializing in LLMs & agentic systems: multi-agent architectures, RAG & GraphRAG, LLMOps. A statistics foundation applied to AI systems running in production at scale.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by the inline script before hydration, hence the warning suppression
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* set the theme before first paint so there's no flash of the wrong one */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
