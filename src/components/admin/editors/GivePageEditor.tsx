import { useState, useEffect } from 'react';
import { Save, Heart, Plus, Trash2, QrCode, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem { question: string; answer: string; }
interface ImpactArea { title: string; description: string; }

interface GivePageContent {
  heroTitle: string;
  heroDescription: string;
  giveNowButtonText: string;
  giveNowLink: string;
  recurringButtonText: string;
  recurringLink: string;
  specialGiftButtonText: string;
  specialGiftLink: string;
  otherWaysHeadline: string;
  inPersonText: string;
  byMailText: string;
  textToGiveText: string;
  impactHeadline: string;
  impactDescription: string;
  impactAreas: ImpactArea[];
  thankYouMessage: string;
  faqHeadline: string;
  faqItems: FAQItem[];
  scriptureVerse: string;
  scriptureReference: string;
  // PayPal & QR Code settings
  hostedButtonId: string;
  showQrCode: boolean;
}

interface GivePageEditorProps {
  initialData?: Partial<GivePageContent>;
  onSave: (data: GivePageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: GivePageContent = {
  heroTitle: 'Give Generously',
  heroDescription: 'Your generosity helps make ministry possible.',
  giveNowButtonText: 'Give Now',
  giveNowLink: '',
  recurringButtonText: 'Set Up Recurring',
  recurringLink: '',
  specialGiftButtonText: 'Special Gift',
  specialGiftLink: '',
  otherWaysHeadline: 'Other Ways to Give',
  inPersonText: 'Drop your gift in the offering during Sunday service',
  byMailText: 'Send a check to',
  textToGiveText: 'Text "GIVE" to (717) 445-GIVE',
  impactHeadline: 'Where Your Gift Goes',
  impactDescription: 'When you give, you support:',
  impactAreas: [
    { title: 'Community Outreach', description: 'Serving neighbors in need' },
    { title: 'Kids & Youth', description: 'Investing in the next generation' },
    { title: 'Worship & Teaching', description: 'Creating meaningful experiences' },
    { title: 'Operations', description: 'Maintaining facilities' },
  ],
  thankYouMessage: 'Thank you for being part of what God is doing here.',
  faqHeadline: 'Giving FAQs',
  faqItems: [
    { question: 'Is my gift tax-deductible?', answer: 'Yes! We are a 501(c)(3) nonprofit.' },
    { question: 'How do I set up recurring giving?', answer: 'Click Give Now and select recurring option.' },
  ],
  scriptureVerse: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
  scriptureReference: '2 Corinthians 9:7',
  hostedButtonId: '4GTZXSK6DTAGC',
  showQrCode: true,
};

export function GivePageEditor({ initialData, onSave, isSaving }: GivePageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<GivePageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) setFormData({ ...defaultContent, ...initialData });
  }, [initialData]);

  const handleChange = <K extends keyof GivePageContent>(key: K, value: GivePageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFAQChange = (index: number, field: keyof FAQItem, value: string) => {
    const newItems = [...formData.faqItems];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('faqItems', newItems);
  };

  const addFAQ = () => { if (formData.faqItems.length < 12) handleChange('faqItems', [...formData.faqItems, { question: '', answer: '' }]); };
  const removeFAQ = (index: number) => { handleChange('faqItems', formData.faqItems.filter((_, i) => i !== index)); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate hosted button ID
    if (!formData.hostedButtonId.trim()) {
      toast({ 
        title: 'Validation Error', 
        description: 'PayPal Hosted Button ID is required.',
        variant: 'destructive' 
      });
      return;
    }
    
    try {
      await onSave(formData);
      toast({ title: 'Give page saved!', description: 'Your changes are now live.' });
    } catch { toast({ title: 'Error saving', variant: 'destructive' }); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="single" collapsible defaultValue="hero" className="space-y-4">
        <AccordionItem value="hero" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2"><Heart className="w-4 h-4" /><span className="font-semibold">Hero & Giving Buttons</span></div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2"><Label>Page Title</Label><Input value={formData.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} maxLength={50} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={formData.heroDescription} onChange={(e) => handleChange('heroDescription', e.target.value)} maxLength={200} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Give Now Button</Label><Input value={formData.giveNowButtonText} onChange={(e) => handleChange('giveNowButtonText', e.target.value)} maxLength={30} /></div>
              <div className="space-y-2"><Label>Give Now Link (https://)</Label><Input value={formData.giveNowLink} onChange={(e) => handleChange('giveNowLink', e.target.value)} type="url" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Recurring Button</Label><Input value={formData.recurringButtonText} onChange={(e) => handleChange('recurringButtonText', e.target.value)} maxLength={30} /></div>
              <div className="space-y-2"><Label>Recurring Link</Label><Input value={formData.recurringLink} onChange={(e) => handleChange('recurringLink', e.target.value)} type="url" /></div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PayPal Settings Section */}
        <AccordionItem value="paypal" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" /><span className="font-semibold">PayPal Integration</span></div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>PayPal Hosted Button ID *</Label>
              <Input 
                value={formData.hostedButtonId} 
                onChange={(e) => handleChange('hostedButtonId', e.target.value)} 
                placeholder="e.g., 4GTZXSK6DTAGC"
                required
              />
              <p className="text-xs text-muted-foreground">
                Find this in your PayPal Business account under Payment Buttons → Hosted Button ID
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* QR Code Settings Section */}
        <AccordionItem value="qrcode" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2"><QrCode className="w-4 h-4" /><span className="font-semibold">QR Code Section</span></div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show QR Code Section</Label>
                <p className="text-xs text-muted-foreground">
                  Display the QR code for mobile giving on the Give page
                </p>
              </div>
              <Switch
                checked={formData.showQrCode}
                onCheckedChange={(checked) => handleChange('showQrCode', checked)}
              />
            </div>
            
            {formData.showQrCode && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Current QR Code</p>
                <img 
                  src="/images/giving-qr-code.jpeg" 
                  alt="Current giving QR code" 
                  className="w-32 h-32 rounded border bg-white p-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  To update the QR code image, contact your administrator to replace the file at <code>public/images/giving-qr-code.jpeg</code>
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline"><span className="font-semibold">FAQs ({formData.faqItems.length})</span></AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {formData.faqItems.map((item, index) => (
              <div key={index} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input value={item.question} onChange={(e) => handleFAQChange(index, 'question', e.target.value)} placeholder="Question" maxLength={100} />
                  <Textarea value={item.answer} onChange={(e) => handleFAQChange(index, 'answer', e.target.value)} placeholder="Answer" maxLength={300} rows={2} />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeFAQ(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            ))}
            {formData.faqItems.length < 12 && <Button type="button" variant="outline" onClick={addFAQ}><Plus className="w-4 h-4 mr-2" />Add FAQ</Button>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scripture" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline"><span className="font-semibold">Scripture Quote</span></AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2"><Label>Verse</Label><Textarea value={formData.scriptureVerse} onChange={(e) => handleChange('scriptureVerse', e.target.value)} maxLength={300} rows={3} /></div>
            <div className="space-y-2"><Label>Reference</Label><Input value={formData.scriptureReference} onChange={(e) => handleChange('scriptureReference', e.target.value)} maxLength={50} /></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end sticky bottom-4">
        <Button type="submit" disabled={isSaving} size="lg" className="shadow-lg">
          {isSaving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Give Page
        </Button>
      </div>
    </form>
  );
}
