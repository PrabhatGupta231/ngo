import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SewaPrith Foundation - Empowering Slums & Rural Communities",
    template: "%s | SewaPrith Foundation",
  },
  description: "SewaPrith Foundation is a registered NGO (12A & 80G Tax Exempted) dedicated to medical camp setups, slum child education, and food relief drives in India.",
  keywords: ["NGO", "Charity", "Slum Education", "Rural Healthcare", "Food Relief India", "SewaPrith", "80G Tax Exemption Donation"],
  authors: [{ name: "SewaPrith Foundation" }],
  creator: "SewaPrith Foundation",
  metadataBase: new URL("https://sewaprith-ngo.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sewaprith-ngo.vercel.app",
    title: "SewaPrith Foundation - Empowering Slums & Rural Communities",
    description: "SewaPrith is a non-profit NGO working on direct ground impact programs. Save tax under Section 80G.",
    siteName: "SewaPrith Foundation",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SewaPrith Foundation Ground Relief Camp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaPrith Foundation",
    description: "SewaPrith is a registered 12A/80G NGO dedicated to rural healthcare and slum education.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "SewaPrith Foundation",
    "url": "https://sewaprith-ngo.vercel.app",
    "logo": "https://sewaprith-ngo.vercel.app/logo.png",
    "description": "SewaPrith Foundation is a registered 12A/80G non-profit organization in India dedicated to medical camp setups, slum child education, and food relief drives.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No 20, Nahar Road, Madiyon",
      "addressLocality": "Lucknow",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "226021",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8417801736",
      "contactType": "donor support",
      "email": "info@sewaprith.org"
    },
    "taxID": "AAAAS9283F"
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-secondary selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
