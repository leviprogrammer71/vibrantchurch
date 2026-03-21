import { useSiteContent } from './useSiteContent';
import { Json } from '@/integrations/supabase/types';

/**
 * Hook to fetch page content from the database and merge with defaults.
 * Falls back to default values if database content is missing.
 */
export function usePageContent<T>(
  sectionKey: string,
  defaultContent: T
): { content: T; isLoading: boolean; error: Error | null } {
  const { data, isLoading, error } = useSiteContent(sectionKey);

  // Deep merge function to combine database content with defaults
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mergeContent = (defaultValues: any, dbContent: any): any => {
    if (!dbContent) return defaultValues;

    const result = { ...defaultValues };

    for (const key of Object.keys(defaultValues)) {
      const defaultValue = defaultValues[key];
      const dbValue = dbContent[key];

      if (dbValue === undefined || dbValue === null) {
        continue; // Keep default
      }

      if (
        typeof defaultValue === 'object' &&
        defaultValue !== null &&
        !Array.isArray(defaultValue) &&
        typeof dbValue === 'object' &&
        dbValue !== null &&
        !Array.isArray(dbValue)
      ) {
        // Recursively merge nested objects
        result[key] = mergeContent(
          defaultValue as Record<string, unknown>,
          dbValue as Record<string, unknown>
        );
      } else {
        // Use database value for primitives and arrays
        result[key] = dbValue;
      }
    }

    return result;
  };

  const content = mergeContent(defaultContent, data?.content as Record<string, unknown> | null) as T;

  return {
    content,
    isLoading,
    error: error as Error | null,
  };
}

/**
 * Hook to fetch global settings (church info, etc.) from the database.
 */
export function useGlobalSettings() {
  const { data, isLoading, error } = useSiteContent('global');

  const defaultGlobal = {
    churchName: '',
    missionStatement: '',
    tagline: '',
    serviceTimeLabel: '',
    serviceTime: '',
    locationLabel: '',
    streetAddress: '',
    cityStateZip: '',
    contactLabel: '',
    phone: '',
    email: '',
    copyrightText: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      youtube: '',
    },
  };

  const parseContent = (json: Json | undefined): typeof defaultGlobal | null => {
    if (!json || typeof json !== 'object' || Array.isArray(json)) return null;
    return json as unknown as typeof defaultGlobal;
  };

  const content = parseContent(data?.content);

  return {
    settings: content || defaultGlobal,
    isLoading,
    error: error as Error | null,
    hasData: !!data,
  };
}

/**
 * Hook to fetch announcement bar settings from the database.
 */
export function useAnnouncement() {
  const { data, isLoading, error } = useSiteContent('announcement');

  interface AnnouncementContent {
    enabled: boolean;
    message: string;
    buttonText: string;
    buttonLink: string;
    colorTheme: 'primary' | 'secondary' | 'accent';
    startDate: string;
    endDate: string;
  }

  const defaultAnnouncement: AnnouncementContent = {
    enabled: false,
    message: '',
    buttonText: '',
    buttonLink: '',
    colorTheme: 'secondary',
    startDate: '',
    endDate: '',
  };

  const parseContent = (json: Json | undefined): AnnouncementContent | null => {
    if (!json || typeof json !== 'object' || Array.isArray(json)) return null;
    return json as unknown as AnnouncementContent;
  };

  const content = parseContent(data?.content);

  // Check if announcement is within date range
  const isActive = () => {
    if (!content?.enabled) return false;
    
    const now = new Date();
    
    if (content.startDate) {
      const startDate = new Date(content.startDate);
      if (now < startDate) return false;
    }
    
    if (content.endDate) {
      const endDate = new Date(content.endDate);
      if (now > endDate) return false;
    }
    
    return true;
  };

  return {
    announcement: content || defaultAnnouncement,
    isActive: isActive(),
    isLoading,
    error: error as Error | null,
  };
}
