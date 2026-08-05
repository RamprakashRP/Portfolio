require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testSelect() {
  const { data, error } = await supabase
    .from('achievements')
    .select('id, rpRank')
    .gt('rpRank', 2);

  console.log('Data:', data);
  console.log('Error:', error);
}

testSelect();
