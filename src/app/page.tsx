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
    jobTitle: "Software Developer & Student Ambassador",
    description: "Final-year engineering student headed to the MDSAI program at University of Waterloo, top 10 Google Student Ambassador (India), and Microsoft Student Ambassador.",
    sameAs: [
      "https://linkedin.com/in/YOUR_LINKEDIN", // TODO: Replace with actual URL
      "https://github.com/YOUR_GITHUB",       // TODO: Replace with actual URL
      "https://instagram.com/YOUR_INSTAGRAM"  // TODO: Replace with actual URL
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
