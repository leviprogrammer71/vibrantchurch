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

// ─── localStorage helpers ───────────────────────────────────
const LS_PREFIX = 'vc_content_';

function lsGet(key: string): SiteContentRow | null {
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${key}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function lsSet(key: string, content: Record<string, unknown>): SiteContentRow {
  const row: SiteContentRow = {
    id: key,
    section_key: key,
    content: content as unknown as Json,
    updated_at: new Date().toISOString(),
    updated_by: 'local-admin',
  };
  localStorage.setItem(`${LS_PREFIX}${key}`, JSON.stringify(row));
  return row;
}

function lsGetAll(): SiteContentRow[] {
  const rows: SiteContentRow[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(LS_PREFIX)) {
      try { rows.push(JSON.parse(localStorage.getItem(k)!)); } catch { /* skip */ }
    }
  }
  return rows.sort((a, b) => a.section_key.localeCompare(b.section_key));
}

// ─── Hooks ──────────────────────────────────────────────────
export function useSiteContent(sectionKey: string) {
  return useQuery({
    queryKey: ['site-content', sectionKey],
    queryFn: async () => {
      if (!hasSupabase) return lsGet(sectionKey);

      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .eq('section_key', sectionKey)
          .maybeSingle();
        if (error) throw error;
        return data as SiteContentRow | null;
      } catch {
        return lsGet(sectionKey);
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: hasSupabase ? 3 : false,
  });
}

export function useAllSiteContent() {
  return useQuery({
    queryKey: ['site-content', 'all'],
    queryFn: async () => {
      if (!hasSupabase) return lsGetAll();

      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('*')
          .order('section_key');
        if (error) throw error;
        return data as SiteContentRow[];
      } catch {
        return lsGetAll();
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: hasSupabase ? 3 : false,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, unknown> }) => {
      // ── LOCAL MODE ──
      if (!hasSupabase) {
        return lsSet(sectionKey, content);
      }

      // ── SUPABASE MODE ──
      const { data: existing } = await supabase
        .from('site_content')
        .select('id')
        .eq('section_key', sectionKey)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from('site_content')
          .update({ content: content as unknown as Json })
          .eq('section_key', sectionKey)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
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
