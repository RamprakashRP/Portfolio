require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fixRanks() {
  const updates = [
    { id: 'best-outgoing-student', rpRank: 3 },
    { id: 'overall-champions', rpRank: 4 },
    { id: 'dubai-ai-film-festival', rpRank: 5 }
  ];

  for (const item of updates) {
    const { error } = await supabase
      .from('achievements')
      .update({ rpRank: item.rpRank })
      .eq('id', item.id);
      
    if (error) {
      console.error(`Error updating ${item.id}:`, error);
    } else {
      console.log(`Updated ${item.id} to rank ${item.rpRank}`);
    }
  }
}

fixRanks();
