import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// only the weights the design system uses: 400 body, 500 labels, 600 headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Victor Amarante — Senior Applied AI Engineer",
  description:
    "Victor Amarante — Senior Applied AI Engineer specializing in LLMs & agentic systems: multi-agent architectures, RAG & GraphRAG, LLMOps. A statistics foundation applied to AI systems running in production at scale.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9fe",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the inline script sets data-theme / class="js" before hydration, hence the warning suppression
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* set the theme before first paint so there's no flash of the wrong one */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
