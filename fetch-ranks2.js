require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkRanks() {
  const { data, error } = await supabase
    .from('achievements')
    .select('id, title, "rpRank"')
    .not('rpRank', 'is', null)
    .order('rpRank', { ascending: true });

  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

checkRanks();
