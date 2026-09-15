import { useState, useEffect } from 'react';
import { Save, Settings, Youtube, Calendar, MapPin, CreditCard, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface IntegrationSettings {
  // PayPal
  paypalClientId: string;
  paypalHostedButtonId: string;
  paypalDonateUrl: string;
  paypalEmail: string;
  // YouTube
  youtubeChannelUrl: string;
  youtubeChannelId: string;
  // Church Center Calendar
  churchCenterCalendarUrl: string;
  // Google Maps
  googleMapsApiKey: string;
}

interface IntegrationsEditorProps {
  initialData?: Partial<IntegrationSettings>;
  onSave: (data: IntegrationSettings) => Promise<void>;
  isSaving: boolean;
}

const defaultSettings: IntegrationSettings = {
  paypalClientId: 'BAAbXLPTxJuPIwDZykMVU1',
  paypalHostedButtonId: '4GTZXSK6DTAGC',
  paypalDonateUrl: 'https://www.paypal.com/ncp/payment/4GTZXSK6DTAGC',
  paypalEmail: 'vibrantchurch113@gmail.com',
  youtubeChannelUrl: 'https://youtube.com/@vibrantchurchterrehill7120',
  youtubeChannelId: 'UCzWxTItXMHZMS75vl0tJybw',
  churchCenterCalendarUrl: 'https://vibrant-church-506100.churchcenter.com/calendar?view=list',
  googleMapsApiKey: '',
};

export function IntegrationsEditor({ initialData, onSave, isSaving }: IntegrationsEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<IntegrationSettings>({ ...defaultSettings, ...initialData });

  useEffect(() => {
    if (initialData) setFormData({ ...defaultSettings, ...initialData });
  }, [initialData]);

  const handleChange = (key: keyof IntegrationSettings, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({ title: 'Integrations saved!', description: 'Your integration settings have been updated.' });
    } catch {
      toast({ title: 'Error saving', description: 'Failed to save settings. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PayPal Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            PayPal Integration
          </CardTitle>
          <CardDescription>
            Configure your PayPal donate button for the Give page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paypalEmail">PayPal Email</Label>
            <Input
              id="paypalEmail"
              type="email"
              value={formData.paypalEmail}
              onChange={(e) => handleChange('paypalEmail', e.target.value)}
              placeholder="vibrantchurch113@gmail.com"
            />
            <p className="text-xs text-muted-foreground">Your PayPal business email address</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paypalClientId">PayPal Client ID</Label>
            <Input
              id="paypalClientId"
              value={formData.paypalClientId}
              onChange={(e) => handleChange('paypalClientId', e.target.value)}
              placeholder="BAAbXLPTxJuPIwDZykMVU1"
            />
            <p className="text-xs text-muted-foreground">Found in your PayPal Developer dashboard</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paypalHostedButtonId">PayPal Hosted Button ID</Label>
            <Input
              id="paypalHostedButtonId"
              value={formData.paypalHostedButtonId}
              onChange={(e) => handleChange('paypalHostedButtonId', e.target.value)}
              placeholder="4GTZXSK6DTAGC"
            />
            <p className="text-xs text-muted-foreground">
              The hosted button ID from PayPal Business → Payment Buttons
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paypalDonateUrl">PayPal Donate Link</Label>
            <Input
              id="paypalDonateUrl"
              type="url"
              value={formData.paypalDonateUrl}
              onChange={(e) => handleChange('paypalDonateUrl', e.target.value)}
              placeholder="https://www.paypal.com/ncp/payment/4GTZXSK6DTAGC"
            />
            <p className="text-xs text-muted-foreground">Direct link for QR codes and sharing</p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <a
              href={formData.paypalDonateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Test donate link
            </a>
          </div>
        </CardContent>
      </Card>

      {/* YouTube Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="w-5 h-5" />
            YouTube Integration
          </CardTitle>
          <CardDescription>
            Connect your YouTube channel for the Watch page and homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtubeChannelUrl">YouTube Channel URL</Label>
            <Input
              id="youtubeChannelUrl"
              type="url"
              value={formData.youtubeChannelUrl}
              onChange={(e) => handleChange('youtubeChannelUrl', e.target.value)}
              placeholder="https://youtube.com/@vibrantchurchterrehill7120"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeChannelId">YouTube Channel ID</Label>
            <Input
              id="youtubeChannelId"
              value={formData.youtubeChannelId}
              onChange={(e) => handleChange('youtubeChannelId', e.target.value)}
              placeholder="UCzWxTItXMHZMS75vl0tJybw"
            />
            <p className="text-xs text-muted-foreground">
              Find this in your YouTube channel settings or URL (starts with UC...)
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <a
              href={formData.youtubeChannelUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              View channel
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Church Center Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Church Center Calendar
          </CardTitle>
          <CardDescription>
            Embed your Church Center calendar on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="churchCenterCalendarUrl">Calendar Embed URL</Label>
            <Input
              id="churchCenterCalendarUrl"
              type="url"
              value={formData.churchCenterCalendarUrl}
              onChange={(e) => handleChange('churchCenterCalendarUrl', e.target.value)}
              placeholder="https://vibrant-church-506100.churchcenter.com/calendar?view=list"
            />
            <p className="text-xs text-muted-foreground">
              The full URL to your Church Center public calendar page
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <a
              href={formData.churchCenterCalendarUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              Preview calendar
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Google Maps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Google Maps
          </CardTitle>
          <CardDescription>
            API key for the interactive map on the Visit page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
            <Input
              id="googleMapsApiKey"
              value={formData.googleMapsApiKey}
              onChange={(e) => handleChange('googleMapsApiKey', e.target.value)}
              placeholder="AIza..."
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              Get this from the Google Cloud Console → APIs & Services → Credentials.
              Restrict it to your domain for security.
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You can also set this via the <code className="bg-muted px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> environment variable.
              The env variable takes priority over this setting.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          Changes to integration settings may take a few seconds to appear on the live site. Hard-refresh your browser if needed.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end sticky bottom-4">
        <Button type="submit" disabled={isSaving} size="lg" className="shadow-lg">
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Integration Settings
        </Button>
      </div>
    </form>
  );
}
