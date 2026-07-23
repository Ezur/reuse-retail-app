import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock sign-in for prototype testing
export async function mockSignIn(email, password) {
  await new Promise(r => setTimeout(r, 600));
  if (!email || !password) throw new Error('Email and password are required.');
  if (password.length < 4) throw new Error('Invalid credentials.');
  return { user: { email, id: 'mock-user-id' } };
}
