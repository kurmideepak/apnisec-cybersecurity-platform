import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apnisec.com'),
  title: {
    default: "ApniSec - Advanced Cybersecurity Solutions",
    template: "%s | ApniSec"
  },
  description: "Secure your digital infrastructure with ApniSec's top-tier Cloud Security, Reteam Assessments, and VAPT services.",
  keywords: ["Cybersecurity", "Pentesting", "VAPT", "Cloud Security", "Red Teaming", "InfoSec", "Network Security"],
  authors: [{ name: "ApniSec Team" }],
  openGraph: {
    title: "ApniSec - Secure Your Digital Fortress",
    description: "Next-gen cybersecurity platform for comprehensive assessments and vulnerability management.",
    url: "https://apnisec.com",
    siteName: "ApniSec",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "ApniSec Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApniSec - Advanced Cybersecurity Solutions",
    description: "Manage vulnerabilities and ensure compliance with ApniSec.",
    images: ["/hero-bg.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
