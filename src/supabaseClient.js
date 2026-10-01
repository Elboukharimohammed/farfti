import { createClient } from '@supabase/supabase-js';

// ============================================================================
// 1. PASTE YOUR SUPABASE PROJECT URL HERE
// (Default base URL format: https://your-project-id.supabase.co)
// ============================================================================
const SUPABASE_URL = 'https://tsffzmcencqdqbzrdail.supabase.co';

// ============================================================================
// 2. PASTE YOUR SUPABASE PUBLIC / ANON KEY HERE
// ============================================================================
const SUPABASE_PUBLIC_KEY = 'sb_publishable_vMmUpLiKqSGGR6AydBZcWg_MmcKTsel';

// ============================================================================
// 3. INITIALIZE AND EXPORT SUPABASE CLIENT
// ============================================================================
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
