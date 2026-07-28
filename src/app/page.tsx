import Hero from '@/components/Hero';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;
import Profile from '@/components/Profile';
import Experience from '@/components/Experience';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import RecentProjects from '@/components/RecentProjects';
import Benefits from '@/components/Benefits';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';

export default async function Home() {
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .lte('rpRank', 4)
    .gte('rpRank', 1)
    .order('rpRank', { ascending: true });

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .lte('rpRank', 4)
    .gte('rpRank', 1)
    .order('rpRank', { ascending: true });

  const topAchievements = achievements || [];
  const topProjects = projects || [];
  return (
    <main className="min-h-screen text-white selection:bg-purple-500/30">
      <Hero topAchievements={topAchievements} />
      <Profile />
      <Experience />
      <Stats />
      <Services />
      <RecentProjects topProjects={topProjects} />
      <Benefits />
      <Reviews />
      <FAQ />
    </main>
  );
}
