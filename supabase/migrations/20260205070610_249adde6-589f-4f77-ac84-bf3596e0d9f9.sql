-- Create api_cache table to persist API responses across cold starts
CREATE TABLE public.api_cache (
  cache_key TEXT PRIMARY KEY,
  cached_data JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS - only service role will access this table
ALTER TABLE public.api_cache ENABLE ROW LEVEL SECURITY;

-- Deny all public access - edge functions use service role which bypasses RLS
CREATE POLICY "Deny all access to api_cache" 
  ON public.api_cache FOR ALL TO anon, authenticated USING (false);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_api_cache_updated_at
  BEFORE UPDATE ON public.api_cache
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();