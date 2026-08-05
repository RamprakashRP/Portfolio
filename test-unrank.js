require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testUnrankCascade() {
  const oldR = 2; // Assuming rank 2 was unranked
  const tableName = 'achievements';
  
  const { data, error } = await supabase.from(tableName).select('id, rpRank').gt('rpRank', oldR);
  
  console.log('Fetched to shift:', data);
  if (error) console.error('Fetch error:', error);
  
  if (data) {
    for (const item of data) {
      console.log(`Shifting ${item.id} from ${item.rpRank} to ${item.rpRank - 1}`);
      const { error: updErr } = await supabase.from(tableName).update({ rpRank: item.rpRank - 1 }).eq('id', item.id);
      if (updErr) {
        console.error(`Error updating ${item.id}:`, updErr);
      }
    }
  }
}

testUnrankCascade();
