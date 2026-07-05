import { createClient } from '@supabase/supabase-js';

// Mock Supabase connection — replace with real URL/key before production.
// These values are placeholders; the app uses local mock auth until Supabase
// credentials are provided via environment variables.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock sign-in for prototype testing (no real Supabase required)
export async function mockSignIn(email, password) {
  await new Promise(r => setTimeout(r, 600)); // simulate network
  if (!email || !password) throw new Error('Email and password are required.');
  if (password.length < 4) throw new Error('Invalid credentials.');
  return { user: { email, id: 'mock-user-id' } };
}
