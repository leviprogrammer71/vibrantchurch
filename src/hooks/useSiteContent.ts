import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, hasSupabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

interface SiteContentRow {
  id: string;
  section_key: string;
  content: Json;
  updated_at: string;
  updated_by: string | null;
}

export function useSiteContent(sectionKey: string) {
  return useQuery({
    queryKey: ['site-content', sectionKey],
    queryFn: async () => {
      // When Supabase isn't configured, return null so defaults are used
      if (!hasSupabase) return null;

      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section_key', sectionKey)
        .maybeSingle();

      if (error) throw error;
      return data as SiteContentRow | null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Don't retry when Supabase isn't configured
    retry: hasSupabase ? 3 : false,
  });
}

export function useAllSiteContent() {
  return useQuery({
    queryKey: ['site-content', 'all'],
    queryFn: async () => {
      if (!hasSupabase) return [];

      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section_key');

      if (error) throw error;
      return data as SiteContentRow[];
    },
    staleTime: 1000 * 60 * 5,
    retry: hasSupabase ? 3 : false,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, unknown> }) => {
      if (!hasSupabase) throw new Error('Supabase is not configured');

      // First check if the section exists
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('section_key', sectionKey)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('site_content')
          .update({ content: content as unknown as Json })
          .eq('section_key', sectionKey)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('site_content')
          .insert({ section_key: sectionKey, content: content as unknown as Json })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['site-content', variables.sectionKey] });
      queryClient.invalidateQueries({ queryKey: ['site-content', 'all'] });
    },
  });
}
