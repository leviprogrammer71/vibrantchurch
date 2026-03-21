import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';

interface YouTubeVideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export function YouTubeVideoModal({ videoId, onClose }: YouTubeVideoModalProps) {
  if (!videoId) return null;

  return (
    <Dialog open={!!videoId} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-none">
        <VisuallyHidden>
          <DialogTitle>Video Player</DialogTitle>
          <DialogDescription>Playing YouTube video in embedded player</DialogDescription>
        </VisuallyHidden>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-secondary transition-colors z-50"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
