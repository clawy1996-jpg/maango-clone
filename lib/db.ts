import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function createTable() {
  // In Supabase, we don't need to manually create tables via raw SQL if we use the API,
  // but if the table 'scans' doesn't exist yet, we'll need to create it manually in the Supabase dashboard
  // or use the SQL editor. For this integration, we'll assume the table exists or fail gracefully.
  return true;
}
