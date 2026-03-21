-- Add explicit DELETE policy for site_content table (admins only)
CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));