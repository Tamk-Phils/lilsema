import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import {
  createPageMetadata,
  organizationJsonLd,
  personJsonLd,
  siteConfig,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = Geist({
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
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: "Lil Sema's Pro Shots | Photographer & Videographer in Douala, Cameroon",
    description: siteConfig.description,
    path: "/",
    ogImageAlt: "Lil Sema's Pro Shots — Professional Photography in Cameroon",
  }),
  title: {
    default: "Lil Sema's Pro Shots | Photographer & Videographer in Douala, Cameroon",
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.svg",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd
          data={[websiteJsonLd(), organizationJsonLd(), personJsonLd()]}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
