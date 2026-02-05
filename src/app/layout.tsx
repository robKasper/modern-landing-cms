import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://taskflow.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TaskFlow - Project Management for Remote Teams",
    template: "%s | TaskFlow",
  },
  description:
    "Collaborate seamlessly, ship faster, stay organized. TaskFlow brings tasks, time tracking, and team collaboration into one beautiful workspace.",
  keywords: [
    "project management",
    "remote teams",
    "collaboration",
    "task management",
    "time tracking",
    "team productivity",
  ],
  authors: [{ name: "TaskFlow" }],
  creator: "TaskFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TaskFlow",
    title: "TaskFlow - Project Management for Remote Teams",
    description:
      "Collaborate seamlessly, ship faster, stay organized. TaskFlow brings tasks, time tracking, and team collaboration into one beautiful workspace.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow - Project Management for Remote Teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Project Management for Remote Teams",
    description:
      "Collaborate seamlessly, ship faster, stay organized. TaskFlow brings tasks, time tracking, and team collaboration into one beautiful workspace.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>{children}</body>
    </html>
  );
}
