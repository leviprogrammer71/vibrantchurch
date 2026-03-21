import { useState, useEffect } from 'react';
import { Save, Bell, Eye, EyeOff, Calendar, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AnnouncementSettings {
  enabled: boolean;
  message: string;
  buttonText: string;
  buttonLink: string;
  colorTheme: 'primary' | 'secondary' | 'accent';
  showOnAllPages: boolean;
  startDate: string;
  endDate: string;
}

interface AnnouncementEditorProps {
  initialData?: AnnouncementSettings;
  onSave: (data: AnnouncementSettings) => Promise<void>;
  isSaving: boolean;
}

const defaultAnnouncement: AnnouncementSettings = {
  enabled: false,
  message: '',
  buttonText: '',
  buttonLink: '',
  colorTheme: 'primary',
  showOnAllPages: true,
  startDate: '',
  endDate: '',
};

export function AnnouncementEditor({ initialData, onSave, isSaving }: AnnouncementEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AnnouncementSettings>(initialData || defaultAnnouncement);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultAnnouncement, ...initialData });
    }
  }, [initialData]);

  const handleChange = <K extends keyof AnnouncementSettings>(key: K, value: AnnouncementSettings[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({
        title: 'Announcement saved!',
        description: formData.enabled 
          ? 'The announcement bar is now visible on your site.'
          : 'The announcement bar has been updated but is currently hidden.',
      });
    } catch (error) {
      toast({
        title: 'Error saving',
        description: 'Failed to save announcement. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Announcement Bar
          </CardTitle>
          <CardDescription>
            Display a temporary banner at the top of your site for important announcements, events, or promotions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="enabled" className="text-base font-medium">
                Show Announcement Bar
              </Label>
              <p className="text-sm text-muted-foreground">
                Toggle to show or hide the announcement on your site
              </p>
            </div>
            <Switch
              id="enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) => handleChange('enabled', checked)}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Announcement Message</Label>
            <Input
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Join us for our special Christmas Eve service!"
              maxLength={150}
            />
            <p className="text-xs text-muted-foreground">
              {formData.message.length}/150 characters
            </p>
          </div>

          {/* Button */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text (optional)</Label>
              <Input
                id="buttonText"
                value={formData.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                placeholder="Learn More"
                maxLength={30}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buttonLink">Button Link</Label>
              <Input
                id="buttonLink"
                value={formData.buttonLink}
                onChange={(e) => handleChange('buttonLink', e.target.value)}
                placeholder="/events or https://..."
              />
            </div>
          </div>

          {/* Color Theme */}
          <div className="space-y-2">
            <Label>Color Theme</Label>
            <Select
              value={formData.colorTheme}
              onValueChange={(value: 'primary' | 'secondary' | 'accent') => handleChange('colorTheme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary (Blue)</SelectItem>
                <SelectItem value="secondary">Secondary (Gold)</SelectItem>
                <SelectItem value="accent">Accent (Warm)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show on all pages */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showOnAllPages">Show on all pages</Label>
              <p className="text-sm text-muted-foreground">
                If disabled, only shows on home page
              </p>
            </div>
            <Switch
              id="showOnAllPages"
              checked={formData.showOnAllPages}
              onCheckedChange={(checked) => handleChange('showOnAllPages', checked)}
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule (Optional)
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Set dates to automatically show/hide the announcement
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {formData.message && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className={`p-3 rounded-lg text-center text-sm ${
                formData.colorTheme === 'primary' 
                  ? 'bg-primary text-primary-foreground'
                  : formData.colorTheme === 'secondary'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-accent text-accent-foreground'
              }`}
            >
              <span>{formData.message}</span>
              {formData.buttonText && (
                <span className="ml-3 underline cursor-pointer font-medium">
                  {formData.buttonText}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving} size="lg">
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Announcement
        </Button>
      </div>
    </form>
  );
}
