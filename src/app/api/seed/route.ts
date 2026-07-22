import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { projectsList } from '@/data/projects';
import { achievements } from '@/data/achievements';
import { experiences } from '@/data/experience';

export async function GET() {
  try {
    // 1. Seed Projects
    const projectsData = projectsList.map(p => ({
      id: p.id,
      name: p.name,
      imageType: p.imageType,
      description: p.description,
      category: p.category,
      date: p.date,
      period: p.period,
      sortDate: p.sortDate,
      tags: p.tags,
      rpRank: p.rpRank,
      media: p.media,
      isHighlighted: p.isHighlighted,
      liveUrl: p.liveUrl,
      client: p.client,
      service: p.service,
      infoGoal: p.info?.goal,
      infoChallenge: p.info?.challenge,
      infoResult: p.info?.result,
      homeCover: p.media?.[0] || null,
      previewCover: p.media?.[0] || null,
      highlightCover: p.media?.[0] || null,
    }));
    const { error: pErr } = await supabase.from('projects').upsert(projectsData);
    if (pErr) console.error('Projects Error:', pErr);

    // 2. Seed Achievements
    const achievementsData = achievements.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      tags: a.tags,
      date: a.date,
      rpRank: a.rpRank,
      media: a.media,
      homeCover: a.media?.[0] || null,
      previewCover: a.media?.[0] || null,
      highlightCover: a.media?.[0] || null,
    }));
    const { error: aErr } = await supabase.from('achievements').upsert(achievementsData);
    if (aErr) console.error('Achievements Error:', aErr);

    // 3. Seed Experiences
    const experiencesData = experiences.map((e: any) => ({
      company: e.company,
      logo: e.logo,
      location: e.location,
      rpRank: e.rpRank,
      roles: e.roles,
    }));
    const { error: eErr } = await supabase.from('experiences').upsert(experiencesData);
    if (eErr) console.error('Experiences Error:', eErr);

    return NextResponse.json({ success: true, message: 'Data seeded successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
