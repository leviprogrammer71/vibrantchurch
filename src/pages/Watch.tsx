import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { YouTubeVideoModal } from '@/components/YouTubeVideoModal';
import { format, parseISO } from 'date-fns';
import { siteImages } from '@/data/siteContent';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@vibrantchurchterrehill7120';

export default function Watch() {
  const { data, isLoading, error } = useYouTubeVideos();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  
  const videos = data?.videos?.slice(0, 12) || [];
  const featuredVideo = videos[0];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Play className="w-12 h-12 text-secondary mb-6" />
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Watch Our Services
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-4">
              Missed a Sunday? Catch up on our latest services, worship, and messages from Vibrant Church.
            </p>
            <p className="text-lg text-white/80 mb-8">
              New videos added automatically from our YouTube channel.
            </p>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Video Section */}
      {featuredVideo && !isLoading && !error && (
        <section className="py-20 lg:py-28 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Latest Message
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch our most recent service from Vibrant Church.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => setSelectedVideoId(featuredVideo.id)}
              >
                <img 
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-secondary-foreground ml-1" />
                  </div>
                  <p className="text-white text-lg font-medium text-center px-4">{featuredVideo.title}</p>
                  <p className="text-white/70 text-sm mt-2">
                    {format(parseISO(featuredVideo.publishedAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Video Grid Section */}
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
              <span className="font-medium">Auto-Updated Every 30 Minutes</span>
            </div>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recent Videos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our recent services and messages.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading videos...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <p className="text-muted-foreground mb-4">Unable to load videos at this time.</p>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </Button>
              </a>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && videos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Youtube className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-4">No videos available yet.</p>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  <Youtube className="w-5 h-5 mr-2" />
                  Visit Our YouTube Channel
                </Button>
              </a>
            </div>
          )}

          {/* Video Grid */}
          {!isLoading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
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
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                          <Play className="w-6 h-6 text-secondary-foreground ml-0.5" />
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

          {/* Last Updated */}
          {data?.lastUpdated && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Last updated: {format(parseISO(data.lastUpdated), 'MMM d, yyyy h:mm a')}
            </p>
          )}
        </div>
      </section>

      {/* Subscribe CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Youtube className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold mb-6">
              Never Miss a Message
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our YouTube channel to get notified when new services are uploaded.
            </p>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <YouTubeVideoModal 
        videoId={selectedVideoId} 
        onClose={() => setSelectedVideoId(null)} 
      />
    </div>
  );
}
