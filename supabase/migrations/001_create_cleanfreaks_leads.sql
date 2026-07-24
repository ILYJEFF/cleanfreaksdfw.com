-- Clean Freaks DFW Lead Capture Table
-- Run this in your Supabase SQL Editor to create the leads table

CREATE TABLE IF NOT EXISTS cleanfreaks_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  property_type TEXT,
  city TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'Clean Freaks DFW',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add an index for faster queries by status and date
CREATE INDEX IF NOT EXISTS idx_cleanfreaks_leads_status ON cleanfreaks_leads(status);
CREATE INDEX IF NOT EXISTS idx_cleanfreaks_leads_created ON cleanfreaks_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cleanfreaks_leads_email ON cleanfreaks_leads(email);

-- Enable Row Level Security (RLS)
ALTER TABLE cleanfreaks_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for API inserts)
CREATE POLICY "Service role has full access" ON cleanfreaks_leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cleanfreaks_leads_updated_at
  BEFORE UPDATE ON cleanfreaks_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comment on table for documentation
COMMENT ON TABLE cleanfreaks_leads IS 'Contact form submissions from cleanfreaksdfw.com';
COMMENT ON COLUMN cleanfreaks_leads.property_type IS 'commercial, airbnb, or residential';
COMMENT ON COLUMN cleanfreaks_leads.status IS 'new, contacted, quoted, converted, closed';
