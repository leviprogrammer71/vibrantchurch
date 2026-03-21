import { Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface IntegrationSettings {
  youtubeChannelId: string;
  planningCenterCalendarUrl: string;
}

interface IntegrationsEditorProps {
  initialData?: IntegrationSettings;
  onSave: (data: IntegrationSettings) => Promise<void>;
  isSaving: boolean;
}

export function IntegrationsEditor({ initialData, onSave, isSaving }: IntegrationsEditorProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Integration Settings
          </CardTitle>
          <CardDescription>
            Configure external services like YouTube and Planning Center
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>YouTube Channel ID</Label>
            <Input
              defaultValue={initialData?.youtubeChannelId}
              placeholder="UCxxxxxxxx"
            />
            <p className="text-xs text-muted-foreground">
              Find this in your YouTube channel URL (youtube.com/channel/UCxxxxx)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Planning Center Calendar URL</Label>
            <Input
              defaultValue={initialData?.planningCenterCalendarUrl}
              placeholder="https://calendar.planningcenteronline.com/..."
            />
            <p className="text-xs text-muted-foreground">
              The iCal feed URL from Planning Center for events
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              These integrations enable automatic sermon feeds and event syncing. Changes may take a few minutes to appear on the site.
            </AlertDescription>
          </Alert>

          <Button disabled={isSaving}>
            Save Integration Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            Upload and manage images for your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Media library coming soon. For now, contact your administrator to update images.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
