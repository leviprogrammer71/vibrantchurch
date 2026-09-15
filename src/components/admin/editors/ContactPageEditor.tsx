import { useState, useEffect } from 'react';
import { Save, Phone, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface OfficeHour { day: string; time: string; }

interface ContactPageContent {
  heroTitle: string;
  heroDescription: string;
  heroSubtext: string;
  formHeadline: string;
  formDescription: string;
  submitButtonText: string;
  successTitle: string;
  successDescription: string;
  recipientEmail: string;
  showPrayerRequestField: boolean;
  showImNewField: boolean;
  showVolunteerField: boolean;
  officeHoursHeadline: string;
  officeHours: OfficeHour[];
  prayerHeadline: string;
  prayerDescription: string;
}

interface ContactPageEditorProps {
  initialData?: Partial<ContactPageContent>;
  onSave: (data: ContactPageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: ContactPageContent = {
  heroTitle: 'Get Connected',
  heroDescription: 'We would love to connect with you.',
  heroSubtext: 'Whether you have a question, need prayer, or want to get involved.',
  formHeadline: 'Send Us a Message',
  formDescription: 'Send us a message and we\'ll get back to you soon.',
  submitButtonText: 'Send Message',
  successTitle: 'Message Sent!',
  successDescription: 'Thank you for reaching out. We\'ll get back to you soon!',
  recipientEmail: 'hello@vibranttchurch.org',
  showPrayerRequestField: true,
  showImNewField: true,
  showVolunteerField: false,
  officeHoursHeadline: 'Office Hours',
  officeHours: [
    { day: 'Monday - Thursday', time: '9:00 AM - 4:00 PM' },
    { day: 'Friday', time: '9:00 AM - 12:00 PM' },
    { day: 'Saturday', time: 'Closed' },
    { day: 'Sunday', time: 'Service at 10 AM' },
  ],
  prayerHeadline: 'Need Prayer?',
  prayerDescription: 'We believe in the power of prayer. We would be honored to pray with you.',
};

export function ContactPageEditor({ initialData, onSave, isSaving }: ContactPageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactPageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) setFormData({ ...defaultContent, ...initialData });
  }, [initialData]);

  const handleChange = <K extends keyof ContactPageContent>(key: K, value: ContactPageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform flat structure to nested structure expected by Contact.tsx
      const nestedData = {
        hero: {
          title: formData.heroTitle,
          description: formData.heroDescription,
          subtext: formData.heroSubtext,
        },
        contactInfo: {
          addressTitle: 'Address',
          phoneTitle: 'Phone',
          emailTitle: 'Email',
          serviceTimesTitle: 'Service Times',
        },
        contactForm: {
          headline: formData.formHeadline,
          description: formData.formDescription,
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'Your Email',
          phonePlaceholder: 'Your Phone (optional)',
          subjectPlaceholder: 'Subject',
          messagePlaceholder: 'Your Message',
          submitButtonText: formData.submitButtonText,
          submittingText: 'Sending...',
          successTitle: formData.successTitle,
          successDescription: formData.successDescription,
        },
        officeHours: {
          headline: formData.officeHoursHeadline,
          hours: formData.officeHours,
        },
        prayerRequest: {
          headline: formData.prayerHeadline,
          description: formData.prayerDescription,
          footnote: 'Contact us to request prayer.',
        },
      };
      await onSave(nestedData as any);
      toast({ title: 'Contact page saved!', description: 'Your changes are now live.' });
    } catch { toast({ title: 'Error saving', variant: 'destructive' }); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="single" collapsible defaultValue="hero" className="space-y-4">
        <AccordionItem value="hero" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span className="font-semibold">Hero Section</span></div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2"><Label>Page Title</Label><Input value={formData.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} maxLength={50} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formData.heroDescription} onChange={(e) => handleChange('heroDescription', e.target.value)} maxLength={200} rows={2} /></div>
            <div className="space-y-2"><Label>Subtext</Label><Input value={formData.heroSubtext} onChange={(e) => handleChange('heroSubtext', e.target.value)} maxLength={100} /></div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="form" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline"><span className="font-semibold">Contact Form Settings</span></AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2"><Label>Form Headline</Label><Input value={formData.formHeadline} onChange={(e) => handleChange('formHeadline', e.target.value)} maxLength={50} /></div>
            <div className="space-y-2"><Label>Form Description</Label><Input value={formData.formDescription} onChange={(e) => handleChange('formDescription', e.target.value)} maxLength={100} /></div>
            <div className="space-y-2"><Label>Recipient Email</Label><Input type="email" value={formData.recipientEmail} onChange={(e) => handleChange('recipientEmail', e.target.value)} /></div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Label>Show "Prayer Request" checkbox</Label>
                <Switch checked={formData.showPrayerRequestField} onCheckedChange={(v) => handleChange('showPrayerRequestField', v)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Label>Show "I'm New" checkbox</Label>
                <Switch checked={formData.showImNewField} onCheckedChange={(v) => handleChange('showImNewField', v)} />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <Label>Show "Interested in Volunteering" checkbox</Label>
                <Switch checked={formData.showVolunteerField} onCheckedChange={(v) => handleChange('showVolunteerField', v)} />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Note: Address, phone, and email come from Global Settings.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prayer" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline"><span className="font-semibold">Prayer Request Section</span></AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2"><Label>Headline</Label><Input value={formData.prayerHeadline} onChange={(e) => handleChange('prayerHeadline', e.target.value)} maxLength={50} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formData.prayerDescription} onChange={(e) => handleChange('prayerDescription', e.target.value)} maxLength={200} rows={2} /></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end sticky bottom-4">
        <Button type="submit" disabled={isSaving} size="lg" className="shadow-lg">
          {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Contact Page
        </Button>
      </div>
    </form>
  );
}
