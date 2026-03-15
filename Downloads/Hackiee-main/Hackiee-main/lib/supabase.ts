import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Persistence Logic for Interrogation Status:
 * 
 * To ensure the "Interrogation Pending" status persists across page refreshes:
 * 1. On submit, update the candidate's status in the `assessments` table to `pending_interrogation`.
 * 2. In the Student Dashboard's `useEffect`, check the current user's session and 
 *    fetch their status from Supabase.
 * 3. Update the Zustand store with this persisted state.
 * 4. Only once the interrogation is successfully verified, update the state to `completed`.
 */
