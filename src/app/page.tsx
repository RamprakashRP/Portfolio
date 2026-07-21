import Hero from '@/components/Hero';
import Profile from '@/components/Profile';
import Experience from '@/components/Experience';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import RecentProjects from '@/components/RecentProjects';
import Benefits from '@/components/Benefits';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ramprakash Raja",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-future-domain.com",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-future-domain.com"}/profile-pic.jpeg`,
    jobTitle: "AI & Machine Learning Developer",
    description: "Final-year engineering student headed to the MDSAI program at University of Waterloo, top 10 Google Student Ambassador (India), and Microsoft Student Ambassador.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "SRM Institute of Science and Technology"
    },
    memberOf: {
      "@type": "Organization",
      name: "Google Student Ambassador"
    },
    sameAs: [
      "https://www.linkedin.com/in/ramprakashraja",
      "https://github.com/RamprakashRP",
      "https://www.instagram.com/ramprakash.raja_2004"
    ]
  };

  return (
    <main className="min-h-screen text-white selection:bg-purple-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Profile />
      <Experience />
      <Stats />
      <Services />
      <RecentProjects />
      <Benefits />
      <Reviews />
      <FAQ />
    </main>
  );
}
