import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Youtube, Loader2, RefreshCw, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useYouTubeVideos, YouTubeVideo } from '@/hooks/useYouTubeVideos';
import { YouTubeVideoModal } from './YouTubeVideoModal';
import { format, parseISO } from 'date-fns';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@vibrantchurchterrehill7120';

interface LatestVideosSectionProps {
  maxVideos?: number;
  showViewAll?: boolean;
}

export function LatestVideosSection({ maxVideos = 6, showViewAll = true }: LatestVideosSectionProps) {
  const { data, isLoading, error } = useYouTubeVideos();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  const videos = data?.videos?.slice(0, maxVideos) || [];
  const showFallback = !!error || (!isLoading && videos.length === 0);

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">Auto-Updated from YouTube</span>
          </div>
          <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest Videos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our recent services, worship, and messages from Vibrant Church.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading videos...</p>
          </div>
        )}

        {/* Fallback State (error or no data) */}
        {showFallback && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Youtube className="w-12 h-12 text-secondary mb-4" />
            <p className="text-lg text-foreground font-medium mb-2">Videos are updating—please check back soon</p>
            <p className="text-muted-foreground mb-6">You can always watch and subscribe on our channel.</p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </Button>
              </a>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  Subscribe
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {!isLoading && !showFallback && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="overflow-hidden bg-card border-none shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                  onClick={() => setSelectedVideoId(video.id)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Play className="w-8 h-8 text-secondary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(video.publishedAt), 'MMMM d, yyyy')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          {showViewAll && (
            <Link to="/watch">
              <Button variant="outline" size="lg">
                View All Videos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <Youtube className="w-5 h-5 mr-2" />
              Subscribe on YouTube
            </Button>
          </a>
        </motion.div>

        {/* Last Updated */}
        {data?.lastUpdated && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Last updated: {format(parseISO(data.lastUpdated), 'MMM d, yyyy h:mm a')}
          </p>
        )}
      </div>

      {/* Video Modal */}
      <YouTubeVideoModal 
        videoId={selectedVideoId} 
        onClose={() => setSelectedVideoId(null)} 
      />
    </section>
  );
}
