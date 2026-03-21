import { churchInfo } from '@/data/church';

interface GoogleMapProps {
  className?: string;
  height?: string;
}

// Google Maps API key from environment variable (publishable browser key with domain restrictions)
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

/**
 * Google Maps embed component for church location
 */
export function GoogleMap({ className = '', height = '400px' }: GoogleMapProps) {
  // Encode the address for the Google Maps embed URL
  const encodedAddress = encodeURIComponent(churchInfo.fullAddress);
  
  if (!GOOGLE_MAPS_KEY) {
    return (
      <div className={`w-full rounded-xl overflow-hidden shadow-lg bg-muted flex items-center justify-center ${className}`} style={{ height }}>
        <p className="text-muted-foreground text-center p-4">
          Map unavailable. Please configure VITE_GOOGLE_MAPS_API_KEY.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`w-full rounded-xl overflow-hidden shadow-lg ${className}`} style={{ height }}>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${encodedAddress}&zoom=15`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing location of ${churchInfo.name}`}
      />
    </div>
  );
}
