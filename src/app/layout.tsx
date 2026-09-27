import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Plus Jakarta Sans is the display face for the "Glass" identity — soft,
// premium, rounded headlines. No monospace: the code-log motif is gone.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rushikesh Hulage — Identity & Platform Engineer",
  description:
    "Portfolio of Rushikesh Hulage — Software Engineer at Telstra specializing in identity, platform engineering, security, backend, cloud, and applied AI. Building and securing the systems other teams ship on.",
  keywords: [
    "Rushikesh Hulage",
    "Software Engineer",
    "Machine Learning",
    "AI",
    "Cloud",
    "Backend",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rushikesh Hulage" }],
  openGraph: {
    title: "Rushikesh Hulage | Software Engineer · ML · Cloud",
    description:
      "Portfolio of Rushikesh Hulage — Software Engineer specializing in AI/ML, Backend Development, and Cloud Technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushikesh Hulage | Software Engineer · ML · Cloud",
    description:
      "Portfolio of Rushikesh Hulage — Software Engineer specializing in AI/ML, Backend Development, and Cloud Technologies.",
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
        className={`${inter.variable} ${jakarta.variable} antialiased`}
      >
        <CursorSpotlight />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
