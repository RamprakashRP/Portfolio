require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkRank1() {
  const { data, error } = await supabase
    .from('achievements')
    .select('title, description, tags, date')
    .eq('id', 'sundar-pichai')
    .single();

  console.log('Data:', data);
  console.log('Error:', error);
}

checkRank1();
