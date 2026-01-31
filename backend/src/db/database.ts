import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ WARN: SUPABASE_URL or SUPABASE_KEY is missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to keep the existing API contract mostly valid (optional, but good for transition)
export const initializeDatabase = () => {
  console.log('✅ Supabase Client Initialized');
};

export const closeDatabase = () => {
  // Supabase client handles connections automatically
};

export default supabase;
