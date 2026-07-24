import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim()
  );
}

function getPublishableKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

export function isSupabaseBrowserConfigured(): boolean {
  const url = getUrl();
  const key = getPublishableKey();
  return Boolean(url && key && url.startsWith("http"));
}

/** Browser-safe client (publishable / anon). Quote writes use the API + secret key. */
export function createBrowserClient(): SupabaseClient {
  const url = getUrl();
  const key = getPublishableKey();
  if (!url || !key) {
    throw new Error(
      "Supabase browser client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createClient(url, key);
}
