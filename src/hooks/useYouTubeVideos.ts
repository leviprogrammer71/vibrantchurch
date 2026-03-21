import { useQuery } from '@tanstack/react-query';
import { supabase, hasSupabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  videoUrl: string;
}

export function useYouTubeVideos(channelId?: string) {
  return useQuery({
    queryKey: ['youtube-videos', channelId],
    queryFn: async () => {
      if (!hasSupabase) return { videos: [], channelId: '', lastUpdated: '' };

      const { data, error } = await supabase.functions.invoke('fetch-youtube', {
        body: { channelId },
      });

      if (error) {
        console.error('Error fetching YouTube videos:', error);
        throw error;
      }

      return data as { videos: YouTubeVideo[]; channelId: string; lastUpdated: string };
    },
    staleTime: 1000 * 60 * 30,
    refetchInterval: hasSupabase ? 1000 * 60 * 30 : false,
    retry: hasSupabase ? 3 : false,
  });
}
