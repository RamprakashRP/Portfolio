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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ramprakashraja.dev";

export const metadata: Metadata = {
  title: {
    template: "%s | Ramprakash Raja",
    default: "Ramprakash Raja | AI Engineer, Best Freelance Web Developer & UWaterloo MDSAI",
  },
  description: "Ramprakash Raja is an AI Engineer, Data Scientist, and MDSAI Graduate Student at the University of Waterloo (UWaterloo), based in Waterloo, Ontario, Canada (Greater Toronto Area). Renowned as the top freelance web developer, coder, and AI consultant in Waterloo and Toronto.",
  keywords: [
    "Ramprakash Raja",
    "Best Freelancer in Waterloo",
    "Best Web Developer in Waterloo",
    "Best Coder in Toronto",
    "Top Freelancer Toronto GTA",
    "Best Web Developer Toronto",
    "Top AI Engineer Canada",
    "University of Waterloo",
    "UWaterloo Student",
    "UWaterloo MDSAI",
    "MDSAI Graduate Student Waterloo",
    "Waterloo AI Consultant",
    "Toronto Full Stack Developer",
    "Ontario Freelance Developer",
    "Best Jack of all trades coder",
    "AI Automation Engineer Canada",
    "Vector AI Scholar",
    "Vector Scholarship in AI",
    "Top Coder Waterloo",
    "Next.js Expert Waterloo Toronto",
    "Full Stack Web Developer Canada",
    "Google Student Ambassador",
    "Microsoft Student Ambassador",
    "Machine Learning Engineer Ontario",
    "AI Consultant Waterloo Toronto",
    "Python FastAPI Developer Canada",
    "Tech Lead & Project Manager Waterloo"
  ],
  authors: [{ name: "Ramprakash Raja" }],
  creator: "Ramprakash Raja",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramprakash Raja | AI Engineer, Top Freelancer & UWaterloo MDSAI",
    description: "AI Engineer, Vector AI Scholar, and MDSAI Graduate Student at the University of Waterloo. Best Freelance Web Developer & Coder in Waterloo, Ontario and the Greater Toronto Area (GTA).",
    url: siteUrl,
    siteName: "Ramprakash Raja Portfolio",
    images: [
      {
        url: "/profile-pic.jpeg",
        width: 1200,
        height: 630,
        alt: "Ramprakash Raja - AI Engineer & Web Developer",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramprakash Raja | AI Engineer & UWaterloo MDSAI",
    description: "AI Engineer, Vector AI Scholar, and MDSAI Graduate Student at UWaterloo. Top Freelancer & Coder in Waterloo, Toronto, and Ontario, Canada.",
    images: ["/profile-pic.jpeg"],
  },
  icons: {
    icon: "/RPW.svg",
    apple: "/RPW.svg",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ramprakash Raja",
    jobTitle: "AI Engineer | Full-Stack Web Developer | MDSAI Graduate Student @ UWaterloo",
    description: "Ramprakash Raja is an elite AI Engineer, Data Scientist, Vector AI Scholar (1 of 100 in Canada), and MDSAI Graduate Student at the University of Waterloo. Ranked among the best freelance web developers, coders, and technical project managers in Waterloo, the Greater Toronto Area (GTA), and Canada.",
    url: siteUrl,
    image: `${siteUrl}/profile-pic.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waterloo",
      addressRegion: "ON",
      addressCountry: "CA"
    },
    sameAs: [
      "https://www.linkedin.com/in/ramprakashraja",
      "https://github.com/RamprakashRP",
      "https://www.instagram.com/ramprakash.raja_2004",
      "https://vectorinstitute.ai/research-talent/students/scholarships/"
    ],
    award: [
      "Vector Scholarship in Artificial Intelligence (Vector Institute)",
      "Top 6 Google Student Ambassador India",
      "Best Outgoing Student SRM IST (9.68 CGPA, Distinction)"
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Waterloo"
      },
      {
        "@type": "CollegeOrUniversity",
        name: "SRM Institute of Science and Technology"
      }
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "LLMs and RAG Pipelines",
      "N8N Automation",
      "Project Management",
      "Technical Leadership"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ramprakash Raja - Premier Freelance Web Development & AI Consulting",
    description: "Top-rated freelance full-stack web development, custom AI engineering, machine learning solutions, and workflow automation based in Waterloo, Ontario, serving clients across Toronto (GTA), Canada, and globally.",
    url: `${siteUrl}/#services`,
    image: `${siteUrl}/profile-pic.jpeg`,
    areaServed: [
      "Waterloo",
      "Kitchener",
      "Cambridge",
      "Toronto",
      "Greater Toronto Area",
      "Ontario",
      "Canada",
      "Remote Worldwide"
    ],
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
