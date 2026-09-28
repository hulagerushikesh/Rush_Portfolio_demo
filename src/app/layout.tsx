import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Space Grotesk is the display face — a geometric grotesk with technical
// character for headings on the dark "Signal" theme. Body copy stays Inter.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const POSITIONING =
  "Rushikesh Hulage — identity & backend engineer at Telstra (Java/Spring Boot, AWS, OAuth2/OIDC, mTLS, WAF) who also builds and ships applied-AI systems: agentic RAG, computer vision, and quantitative platforms.";

export const metadata: Metadata = {
  title: "Rushikesh Hulage — Identity & Backend Engineer, Telstra",
  description: POSITIONING,
  keywords: [
    "Rushikesh Hulage",
    "Software Engineer",
    "Identity & Access Management",
    "OAuth2",
    "OpenID Connect",
    "Backend Engineer",
    "AWS",
    "Applied AI",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "Rushikesh Hulage" }],
  openGraph: {
    title: "Rushikesh Hulage — Identity & Backend Engineer, Telstra",
    description: POSITIONING,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushikesh Hulage — Identity & Backend Engineer, Telstra",
    description: POSITIONING,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <CursorSpotlight />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
