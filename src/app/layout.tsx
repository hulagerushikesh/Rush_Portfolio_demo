import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rushikesh Hulage | Software Engineer · ML · Cloud",
  description:
    "Portfolio of Rushikesh Hulage — Software Engineer at Telstra specializing in AI/ML, Backend Development, and Cloud Technologies. Building intelligent systems at scale.",
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
    <html lang="en" className="dark" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
