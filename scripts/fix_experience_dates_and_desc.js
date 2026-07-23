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
        // Fix Start Date
        if (role.startDate && !role.startDate.includes(', ')) {
          const parts = role.startDate.split(' ');
          if (parts.length === 2) {
            role.startDate = `${parts[0]}, ${parts[1]}`;
            changed = true;
          }
        }
        
        // Fix End Date
        if (role.endDate && !role.endDate.includes(', ') && role.endDate.toLowerCase() !== 'present' && role.endDate !== '') {
          const parts = role.endDate.split(' ');
          if (parts.length === 2) {
            role.endDate = `${parts[0]}, ${parts[1]}`;
            changed = true;
          }
        }

        // Fix Description
        if (role.description && (!role.points || role.points.length === 0)) {
          role.points = [role.description];
          changed = true;
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
