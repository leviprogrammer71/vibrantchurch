import { useState, useEffect } from 'react';
import { Save, Globe, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface GlobalSettings {
  churchName: string;
  missionTagline: string;
  serviceTime: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

interface GlobalSettingsEditorProps {
  initialData?: GlobalSettings;
  onSave: (data: GlobalSettings) => Promise<void>;
  isSaving: boolean;
}

const defaultSettings: GlobalSettings = {
  churchName: 'Vibrant Church',
  missionTagline: 'We exist to love God, love people, and welcome everyone.',
  serviceTime: 'Sundays at 10:00 AM',
  address: '113 Conestoga Street',
  city: 'Terre Hill',
  state: 'PA',
  zip: '17581',
  phone: '+1 (559) 207-8144',
  email: 'hello@vibranttchurch.org',
  facebookUrl: 'https://www.facebook.com/share/19ZCVw6QcX/',
  instagramUrl: 'https://www.instagram.com/vibrantchurchterrehill',
  youtubeUrl: 'https://youtube.com/@vibrantchurch',
};

export function GlobalSettingsEditor({ initialData, onSave, isSaving }: GlobalSettingsEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<GlobalSettings>(initialData || defaultSettings);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultSettings, ...initialData });
    }
  }, [initialData]);

  const handleChange = (key: keyof GlobalSettings, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({
        title: 'Settings saved!',
        description: 'Global settings have been updated across the site.',
      });
    } catch (error) {
      toast({
        title: 'Error saving',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Church Information
          </CardTitle>
          <CardDescription>
            These settings are used across the entire site — header, footer, and all pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="churchName">Church Name</Label>
            <Input
              id="churchName"
              value={formData.churchName}
              onChange={(e) => handleChange('churchName', e.target.value)}
              placeholder="Vibrant Hill Church"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="missionTagline">Mission Tagline</Label>
            <Textarea
              id="missionTagline"
              value={formData.missionTagline}
              onChange={(e) => handleChange('missionTagline', e.target.value)}
              placeholder="We exist to love God, love people..."
              maxLength={200}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">Used in footer and about page</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Service Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="serviceTime">Service Schedule</Label>
            <Input
              id="serviceTime"
              value={formData.serviceTime}
              onChange={(e) => handleChange('serviceTime', e.target.value)}
              placeholder="Sundays at 10:00 AM"
              maxLength={100}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="113 Conestoga Street"
              maxLength={100}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Terre Hill"
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="PA"
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={formData.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
                placeholder="17581"
                maxLength={10}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(717) 445-1234"
                maxLength={20}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="hello@vibranttchurch.org"
                maxLength={100}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Links to your social media profiles (must be valid URLs starting with https://)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebookUrl" className="flex items-center gap-2">
              <Facebook className="w-4 h-4" /> Facebook
            </Label>
            <Input
              id="facebookUrl"
              value={formData.facebookUrl}
              onChange={(e) => handleChange('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/yourchurch"
              type="url"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instagramUrl" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </Label>
            <Input
              id="instagramUrl"
              value={formData.instagramUrl}
              onChange={(e) => handleChange('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/yourchurch"
              type="url"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtubeUrl" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" /> YouTube
            </Label>
            <Input
              id="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={(e) => handleChange('youtubeUrl', e.target.value)}
              placeholder="https://youtube.com/@yourchurch"
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>Single Source of Truth:</strong> When you update these settings, they'll automatically update everywhere on the site — header, footer, Visit page, Contact page, etc.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} size="lg">
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Global Settings
        </Button>
      </div>
    </form>
  );
}
