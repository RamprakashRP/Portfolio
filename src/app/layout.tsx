import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBackground from "@/components/GlobalBackground";
import GradualBlur from "@/components/GradualBlur";
import Loader from "@/components/Loader";
import ScrollHandler from "@/components/ScrollHandler";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    template: "%s | Ramprakash Raja",
    default: "Ramprakash Raja - Portfolio",
  },
  description: "Ramprakash Raja — final-year engineering student headed to the MDSAI program at University of Waterloo, top 10 Google Student Ambassador (India), and Microsoft Student Ambassador.",
  keywords: [
    "Ramprakash Raja",
    "Software Developer",
    "AIML Professional",
    "Google Student Ambassador",
    "Microsoft Student Ambassador",
    "University of Waterloo",
    "India Impact Summit",
  ],
  authors: [{ name: "Ramprakash Raja" }],
  creator: "Ramprakash Raja",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramprakash Raja - Portfolio",
    description: "Ramprakash Raja — final-year engineering student headed to the MDSAI program at University of Waterloo, top 10 Google Student Ambassador (India), and Microsoft Student Ambassador.",
    url: siteUrl,
    siteName: "Ramprakash Raja Portfolio",
    images: [
      {
        url: "/profile-pic.jpeg",
        width: 1200,
        height: 630,
        alt: "Ramprakash Raja",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramprakash Raja - Portfolio",
    description: "Ramprakash Raja — final-year engineering student headed to the MDSAI program at University of Waterloo, top 10 Google Student Ambassador (India), and Microsoft Student Ambassador.",
    images: ["/profile-pic.jpeg"],
  },
  icons: {
    icon: "/rp-logo.png",
    apple: "/rp-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent" suppressHydrationWarning>
        <Loader />
        <ScrollHandler />
        <GlobalBackground />
        
        {/* Global Fading Edges (Bottom Only, Small & Smooth) */}
        <GradualBlur 
          target="page" 
          position="bottom" 
          height="2.5rem" 
          strength={2}
          divCount={8}
          exponential={true}
          curve="bezier"
          zIndex={-10} 
        />
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
