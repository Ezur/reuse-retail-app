import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Upload an item's photos to the `item-photos` storage bucket and return the
 * full list of photo URLs for the item (already-saved URLs + newly uploaded).
 *
 * photos: [{ file: File | null, url: string }] — entries with file: null are
 * existing saved photos and are kept as-is; entries with a File are uploaded.
 * Upload failures are skipped so saving never blocks on a bad network.
 */
export async function uploadItemPhotos(itemId, photos) {
  const urls = [];
  for (const [i, p] of photos.entries()) {
    if (!p.file) { urls.push(p.url); continue; }
    const ext = (p.file.name.split('.').pop() || 'jpg').toLowerCase();
    const path = `${itemId}/${Date.now()}-${i}.${ext}`;
    const { error } = await supabase.storage.from('item-photos').upload(path, p.file, { contentType: p.file.type });
    if (!error) {
      const { data } = supabase.storage.from('item-photos').getPublicUrl(path);
      if (data?.publicUrl) urls.push(data.publicUrl);
    }
  }
  return urls;
}

// Mock sign-in for prototype testing
export async function mockSignIn(email, password) {
  await new Promise(r => setTimeout(r, 600));
  if (!email || !password) throw new Error('Email and password are required.');
  if (password.length < 4) throw new Error('Invalid credentials.');
  return { user: { email, id: 'mock-user-id' } };
}
