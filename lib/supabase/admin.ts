import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim()
  );
}

function getSecretKey(): string | undefined {
  return (
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

export function isSupabaseConfigured(): boolean {
  const url = getUrl();
  const key = getSecretKey();
  return Boolean(url && key && url.startsWith("http"));
}

/** Server-only client. Bypasses RLS. Never import from client components. */
export function createServiceClient(): SupabaseClient {
  const url = getUrl();
  const key = getSecretKey();
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SECRET_KEY.",
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
