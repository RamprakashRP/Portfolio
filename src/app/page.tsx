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
  return (
    <main className="min-h-screen text-white selection:bg-purple-500/30">
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
