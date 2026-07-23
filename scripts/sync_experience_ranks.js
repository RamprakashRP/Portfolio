require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const linkedInOrder = [
  "Google",
  "Microsoft",
  "NextGen Intelligence Club",
  "Shiftzzy",
  "SRM Vadapalani Model United Nations",
  "Ayaan Foundation",
  "Association of Computer Science Engineers",
  "SRM IST Vadapalani Campus",
  "Design and Innovation Club",
  "White Hat Hackers Club (WHHC)",
  "Life",
  "ShadowFox",
  "SkillCraft Technology",
  "Prodigy InfoTech",
  "APT SKILLS",
  "SIMS Hospital (SRM Institutes For Medical Science)"
];

async function updateRanks() {
  const { data: experiences, error } = await supabase.from('experiences').select('id, company');
  if (error) {
    console.error(error);
    return;
  }

  for (const exp of experiences) {
    const rank = linkedInOrder.findIndex(name => exp.company.trim().toLowerCase() === name.trim().toLowerCase());
    if (rank !== -1) {
      // 1-indexed rank
      await supabase.from('experiences').update({ rpRank: rank + 1 }).eq('id', exp.id);
      console.log(`Updated ${exp.company} to rpRank ${rank + 1}`);
    } else {
      console.log(`Could not find ${exp.company} in the ordered list`);
    }
  }
}

updateRanks();
