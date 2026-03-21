import { useQuery } from '@tanstack/react-query';
import { supabase, hasSupabase } from '@/integrations/supabase/client';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  allDay: boolean;
}

export function useCalendarEvents() {
  return useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      if (!hasSupabase) return { events: [], lastUpdated: '' };

      const { data, error } = await supabase.functions.invoke('fetch-calendar');

      if (error) {
        console.error('Error fetching calendar events:', error);
        throw error;
      }

      return data as { events: CalendarEvent[]; lastUpdated: string };
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: hasSupabase ? 1000 * 60 * 30 : false,
    retry: hasSupabase ? 3 : false,
  });
}
