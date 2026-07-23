import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { error } = await supabase.rpc('execute_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS passkey_credentials (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        public_key TEXT NOT NULL,
        sign_count BIGINT DEFAULT 0,
        transports TEXT[],
        device_type TEXT,
        backed_up BOOLEAN,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
        last_used_at TIMESTAMP WITH TIME ZONE
      );
    `
  });
  
  if (error) {
    console.error('Error creating table via RPC:', error.message);
    console.log('We may need to use REST API or directly create it if execute_sql is not defined.');
  } else {
    console.log('Successfully created passkey_credentials table!');
  }
}
main();
