-- Clean Freaks DFW tables on the shared Supabase project.
-- Namespace: cf_* (coexists with as_*, crm_*, Contact, etc.)
-- Safe to re-run.

CREATE TABLE IF NOT EXISTS public.cf_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  property_type text,
  city text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  source text NOT NULL DEFAULT 'website',
  email_sent boolean NOT NULL DEFAULT false,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS cf_quote_requests_created_at_idx
  ON public.cf_quote_requests (created_at DESC);

CREATE INDEX IF NOT EXISTS cf_quote_requests_email_idx
  ON public.cf_quote_requests (email);

ALTER TABLE public.cf_quote_requests ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.cf_quote_requests TO service_role;
GRANT ALL ON TABLE public.cf_quote_requests TO postgres;
REVOKE ALL ON TABLE public.cf_quote_requests FROM anon;
REVOKE ALL ON TABLE public.cf_quote_requests FROM authenticated;
