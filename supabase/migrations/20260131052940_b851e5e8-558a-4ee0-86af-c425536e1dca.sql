-- Add explicit denial policies for anonymous users (defense-in-depth)
-- These policies ensure anonymous users cannot access sensitive tables even if other policies are misconfigured

-- Deny anonymous access to profiles table
CREATE POLICY "Deny anonymous access to profiles"
  ON public.profiles FOR ALL
  TO anon
  USING (false);

-- Deny anonymous access to user_roles table
CREATE POLICY "Deny anonymous access to user_roles"
  ON public.user_roles FOR ALL
  TO anon
  USING (false);

-- Deny anonymous access to contact_submissions table
CREATE POLICY "Deny anonymous access to contact_submissions"
  ON public.contact_submissions FOR ALL
  TO anon
  USING (false);