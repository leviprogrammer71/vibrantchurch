import { useState, useEffect } from 'react';
import { Save, Play, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
}

interface WatchPageContent {
  heroTitle: string;
  heroDescription: string;
  heroSubtext: string;
  liveHeadline: string;
  liveDescription: string;
  youtubeButtonText: string;
  facebookButtonText: string;
  archiveHeadline: string;
  archiveDescription: string;
  viewAllButtonText: string;
  sermons: Sermon[];
  sermonsDisplayCount: number;
  subscribeHeadline: string;
  subscribeDescription: string;
  subscribeButtonText: string;
  featuredVideoUrl: string;
}

interface WatchPageEditorProps {
  initialData?: Partial<WatchPageContent>;
  onSave: (data: WatchPageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: WatchPageContent = {
  heroTitle: 'Watch Online',
  heroDescription: 'Join us online or watch past messages anytime.',
  heroSubtext: 'Experience uplifting worship and encouraging messages.',
  liveHeadline: 'Live Every Sunday',
  liveDescription: 'Join us live every Sunday at 10 AM EST.',
  youtubeButtonText: 'Watch on YouTube',
  facebookButtonText: 'Watch on Facebook',
  archiveHeadline: 'Recent Sermons',
  archiveDescription: 'Catch up on messages you may have missed.',
  viewAllButtonText: 'View All Sermons',
  sermons: [],
  sermonsDisplayCount: 6,
  subscribeHeadline: 'Never Miss a Message',
  subscribeDescription: 'Subscribe to our YouTube channel to get notified.',
  subscribeButtonText: 'Subscribe on YouTube',
  featuredVideoUrl: '',
};

export function WatchPageEditor({ initialData, onSave, isSaving }: WatchPageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<WatchPageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultContent, ...initialData });
    }
  }, [initialData]);

  const handleChange = <K extends keyof WatchPageContent>(key: K, value: WatchPageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({ title: 'Watch page saved!', description: 'Your changes are now live.' });
    } catch {
      toast({ title: 'Error saving', description: 'Please try again.', variant: 'destructive' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="single" collapsible defaultValue="hero" className="space-y-4">
        <AccordionItem value="hero" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span className="font-semibold">Hero & Live Stream</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input value={formData.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.heroDescription} onChange={(e) => handleChange('heroDescription', e.target.value)} maxLength={200} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Live Stream Headline</Label>
              <Input value={formData.liveHeadline} onChange={(e) => handleChange('liveHeadline', e.target.value)} maxLength={50} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>YouTube Button</Label>
                <Input value={formData.youtubeButtonText} onChange={(e) => handleChange('youtubeButtonText', e.target.value)} maxLength={30} />
              </div>
              <div className="space-y-2">
                <Label>Facebook Button</Label>
                <Input value={formData.facebookButtonText} onChange={(e) => handleChange('facebookButtonText', e.target.value)} maxLength={30} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Featured Video URL (optional override)</Label>
              <Input value={formData.featuredVideoUrl} onChange={(e) => handleChange('featuredVideoUrl', e.target.value)} placeholder="https://youtube.com/watch?v=..." />
              <p className="text-xs text-muted-foreground">Leave empty to use YouTube auto-feed</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="archive" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Sermon Archive Settings</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Section Headline</Label>
              <Input value={formData.archiveHeadline} onChange={(e) => handleChange('archiveHeadline', e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Display Count</Label>
              <Select value={formData.sermonsDisplayCount.toString()} onValueChange={(v) => handleChange('sermonsDisplayCount', parseInt(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 sermons</SelectItem>
                  <SelectItem value="9">9 sermons</SelectItem>
                  <SelectItem value="12">12 sermons</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">Sermons are auto-fed from YouTube. Use Global Settings to configure channel.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subscribe" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Subscribe CTA</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input value={formData.subscribeHeadline} onChange={(e) => handleChange('subscribeHeadline', e.target.value)} maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.subscribeDescription} onChange={(e) => handleChange('subscribeDescription', e.target.value)} maxLength={200} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input value={formData.subscribeButtonText} onChange={(e) => handleChange('subscribeButtonText', e.target.value)} maxLength={30} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end sticky bottom-4">
        <Button type="submit" disabled={isSaving} size="lg" className="shadow-lg">
          {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Watch Page
        </Button>
      </div>
    </form>
  );
}
