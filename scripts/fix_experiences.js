require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: experiences, error } = await supabase.from('experiences').select('*');
  if (error) {
    console.error('Error fetching experiences', error);
    return;
  }

  for (let exp of experiences) {
    if (exp.roles && Array.isArray(exp.roles)) {
      let changed = false;
      exp.roles = exp.roles.map(role => {
        // Fix based on duration string if present
        if (role.duration) {
          console.log(`Processing duration: ${role.duration}`);
          const parts = role.duration.split('-').map(s => s.trim());
          if (parts.length === 2) {
            role.startDate = parts[0];
            const end = parts[1].toLowerCase();
            if (end === 'present' || end === 'current') {
              role.isCurrent = true;
              role.endDate = '';
            } else {
              role.isCurrent = false;
              role.endDate = parts[1];
            }
            changed = true;
          }
        }
        return role;
      });
      
      if (changed) {
        console.log(`Updating ${exp.company}...`);
        await supabase.from('experiences').update({ roles: exp.roles }).eq('id', exp.id);
      }
    }
  }
  console.log('Done processing experiences.');
}

run();
