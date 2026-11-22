import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { CONTACT } from "@/data/contact";
import "./globals.css";

// only the weights the design system uses: 400 body, 500 labels, 600 headings
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const TITLE = "Victor Amarante | Senior Software Engineer, AI";
const DESCRIPTION =
  "Senior Software Engineer specializing in AI and machine learning, with expertise in software architecture, backend engineering, distributed systems and agentic AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: CONTACT.site,
    siteName: "Victor Amarante",
    locale: "en_US",
    firstName: "Victor",
    lastName: "Amarante",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
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
