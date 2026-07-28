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
  description: "Ramprakash Raja — AI Engineer | Vector AI Scholar | MDSAI Co-op @ UWaterloo | Google & Microsoft Student Ambassador. Freelance Web Developer.",
  keywords: [
    "Ramprakash Raja",
    "AI Engineer",
    "Freelancer",
    "Freelance Web Developer",
    "Community Builder",
    "Student Community Leader",
    "Software Developer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "AIML Professional",
    "Vector Scholar",
    "Vector AI Scholarship",
    "Vector Institute",
    "Google Student Ambassador",
    "Microsoft Student Ambassador",
    "University of Waterloo",
    "Waterloo Student",
    "MDSAI",
    "India AI Impact Summit",
    "Best Outgoing Student SRM IST",
    "SRM Institute of Science and Technology",
    "Tech Speaker",
    "AI Film Festival Dubai"
  ],
  authors: [{ name: "Ramprakash Raja" }],
  creator: "Ramprakash Raja",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramprakash Raja | AI Engineer & Vector Scholar",
    description: "AI Engineer | Vector AI Scholar | MDSAI Co-op @ UWaterloo | Google & Microsoft Student Ambassador.",
    url: siteUrl,
    siteName: "Ramprakash Raja Portfolio",
    images: [
      {
        url: "/profile-pic.jpeg",
        width: 1200,
        height: 630,
        alt: "Ramprakash Raja - AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramprakash Raja | AI Engineer & Vector Scholar",
    description: "AI Engineer | Vector AI Scholar | MDSAI Co-op @ UWaterloo | Google & Microsoft Student Ambassador.",
    images: ["/profile-pic.jpeg"],
  },
  icons: {
    icon: "/rp-logo.png",
    apple: "/rp-logo.png",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ramprakash Raja",
    jobTitle: "AI Engineer | Vector AI Scholar | MDSAI Co-op @ UWaterloo",
    description: "Ramprakash Raja is an AI Engineer, Vector AI Scholar (1 of 100 in Canada), and Google & Microsoft Student Ambassador. Incoming MDSAI student at the University of Waterloo.",
    url: siteUrl,
    image: `${siteUrl}/profile-pic.jpeg`,
    sameAs: [
      "https://www.linkedin.com/in/ramprakashraja",
      "https://github.com/RamprakashRP",
      "https://www.instagram.com/ramprakash.raja_2004",
      "https://vectorinstitute.ai/research-talent/students/scholarships/"
    ],
    award: [
      "Vector Scholarship in Artificial Intelligence (Vector Institute)",
      "Top 6 Google Student Ambassador India",
      "Best Outgoing Student SRM IST"
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "SRM Institute of Science and Technology"
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Waterloo"
      }
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Full Stack Development",
      "Community Building",
      "Public Speaking"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ramprakash Raja - Freelance AI Consultant",
    description: "Top-tier AI engineering services specializing in custom LLM solutions, RAG pipelines, and full-stack web development.",
    url: `${siteUrl}/#services`,
    image: `${siteUrl}/profile-pic.jpeg`,
    areaServed: ["Waterloo", "Ontario", "Canada", "Remote"],
    priceRange: "$$",
    provider: {
      "@type": "Person",
      name: "Ramprakash Raja"
    }
  }
];

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
