import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Youtube, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { format, parseISO } from 'date-fns';

export function HealthStatusWidget() {
  const youtube = useYouTubeVideos();
  const calendar = useCalendarEvents();

  const getStatusIcon = (isLoading: boolean, error: unknown, hasData: boolean) => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
    if (error) return <AlertCircle className="w-4 h-4 text-destructive" />;
    if (hasData) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <AlertCircle className="w-4 h-4 text-amber-500" />;
  };

  const getStatusText = (isLoading: boolean, error: unknown, hasData: boolean) => {
    if (isLoading) return 'Syncing...';
    if (error) return 'Error';
    if (hasData) return 'Connected';
    return 'No data';
  };

  const formatLastUpdated = (timestamp: string | undefined) => {
    if (!timestamp) return 'Never';
    try {
      return format(parseISO(timestamp), 'MMM d, h:mm a');
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Integration Health
        </CardTitle>
        <CardDescription>
          Status of external feed connections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* YouTube Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <Youtube className="w-5 h-5 text-destructive" />
            <div>
              <p className="font-medium text-sm">YouTube Videos</p>
              <p className="text-xs text-muted-foreground">
                Last sync: {formatLastUpdated(youtube.data?.lastUpdated)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(youtube.isLoading, youtube.error, !!youtube.data?.videos?.length)}
            <span className="text-sm font-medium">
              {getStatusText(youtube.isLoading, youtube.error, !!youtube.data?.videos?.length)}
            </span>
          </div>
        </div>

        {/* Calendar Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-secondary" />
            <div>
              <p className="font-medium text-sm">Church Calendar</p>
              <p className="text-xs text-muted-foreground">
                Last sync: {formatLastUpdated(calendar.data?.lastUpdated)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(calendar.isLoading, calendar.error, !!calendar.data?.events?.length)}
            <span className="text-sm font-medium">
              {getStatusText(calendar.isLoading, calendar.error, !!calendar.data?.events?.length)}
            </span>
          </div>
        </div>

        {/* Error Messages */}
        {(youtube.error || calendar.error) && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive mb-2">Recent Errors</p>
            {youtube.error && (
              <p className="text-xs text-destructive/80 mb-1">
                YouTube: {youtube.error instanceof Error ? youtube.error.message : 'Failed to fetch'}
              </p>
            )}
            {calendar.error && (
              <p className="text-xs text-destructive/80">
                Calendar: {calendar.error instanceof Error ? calendar.error.message : 'Failed to fetch'}
              </p>
            )}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-2 bg-muted/50 rounded">
            <p className="text-2xl font-bold text-foreground">{youtube.data?.videos?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Videos loaded</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <p className="text-2xl font-bold text-foreground">{calendar.data?.events?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Events loaded</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
