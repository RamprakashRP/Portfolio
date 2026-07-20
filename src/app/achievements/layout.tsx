import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Explore the milestones, awards, and continuous innovation of Ramprakash Raja.',
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
