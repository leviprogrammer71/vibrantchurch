import { useState, useEffect } from 'react';
import { Save, MapPin, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface WhatHappensItem {
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface VisitPageContent {
  // Hero
  heroTitle: string;
  heroDescription: string;
  
  // Service Info
  parkingDescription: string;
  
  // What Happens
  whatHappensHeadline: string;
  whatHappensDescription: string;
  whatHappensItems: WhatHappensItem[];
  
  // Getting Here
  dressCodeText: string;
  arrivalText: string;
  directionsButtonText: string;
  
  // Kids Section
  kidsEnabled: boolean;
  kidsHeadline: string;
  kidsDescription: string;
  kidsFeatures: string[];
  kidsFootnote: string;
  
  // Accessibility (optional toggle)
  accessibilityEnabled: boolean;
  accessibilityText: string;
  
  // FAQ (optional)
  faqEnabled: boolean;
  faqItems: FAQItem[];
  
  // CTA
  ctaHeadline: string;
  ctaDescription: string;
  ctaButtonText: string;
}

interface VisitPageEditorProps {
  initialData?: Partial<VisitPageContent>;
  onSave: (data: VisitPageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: VisitPageContent = {
  heroTitle: 'Plan Your Visit',
  heroDescription: 'We know visiting a new church can feel intimidating — we want you to feel comfortable from the moment you arrive.',
  
  parkingDescription: 'Free parking available in our lot. Look for guest parking signs near the entrance.',
  
  whatHappensHeadline: 'What Happens on Sunday',
  whatHappensDescription: 'Our services include:',
  whatHappensItems: [
    { title: 'Uplifting worship music', description: 'Our service includes about 20-25 minutes of contemporary worship music.' },
    { title: 'Prayer', description: 'We take time to pray together and bring our praises and needs before God.' },
    { title: 'A message based on the Bible', description: 'Our pastor shares a practical, Bible-based message.' },
    { title: 'Time to connect', description: 'Before and after service, there\'s time to meet others.' },
  ],
  
  dressCodeText: 'Come as you are — dress casually and feel at home.',
  arrivalText: 'We recommend arriving 10-15 minutes early for your first visit.',
  directionsButtonText: 'Get Directions',
  
  kidsEnabled: true,
  kidsHeadline: 'We Love Kids!',
  kidsDescription: 'Vibrant Church offers a safe, loving environment where children can learn about God in a fun and engaging way.',
  kidsFeatures: [
    'Safe, loving environment',
    'Fun and engaging activities',
    'Age-appropriate teaching',
    'Secure check-in system',
    'Trained, caring volunteers',
  ],
  kidsFootnote: 'Just look for the Kids Check-In area when you arrive.',
  
  accessibilityEnabled: false,
  accessibilityText: 'Our building is fully wheelchair accessible with reserved parking near the entrance.',
  
  faqEnabled: false,
  faqItems: [],
  
  ctaHeadline: 'Have Questions?',
  ctaDescription: 'We\'d love to hear from you! Reach out with any questions about visiting Vibrant Church.',
  ctaButtonText: 'Contact Us',
};

export function VisitPageEditor({ initialData, onSave, isSaving }: VisitPageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<VisitPageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultContent, ...initialData });
    }
  }, [initialData]);

  const handleChange = <K extends keyof VisitPageContent>(key: K, value: VisitPageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleWhatHappensChange = (index: number, field: keyof WhatHappensItem, value: string) => {
    const newItems = [...formData.whatHappensItems];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('whatHappensItems', newItems);
  };

  const addWhatHappensItem = () => {
    if (formData.whatHappensItems.length < 6) {
      handleChange('whatHappensItems', [...formData.whatHappensItems, { title: '', description: '' }]);
    }
  };

  const removeWhatHappensItem = (index: number) => {
    if (formData.whatHappensItems.length > 2) {
      handleChange('whatHappensItems', formData.whatHappensItems.filter((_, i) => i !== index));
    }
  };

  const handleKidsFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.kidsFeatures];
    newFeatures[index] = value;
    handleChange('kidsFeatures', newFeatures);
  };

  const addKidsFeature = () => {
    if (formData.kidsFeatures.length < 8) {
      handleChange('kidsFeatures', [...formData.kidsFeatures, '']);
    }
  };

  const removeKidsFeature = (index: number) => {
    if (formData.kidsFeatures.length > 2) {
      handleChange('kidsFeatures', formData.kidsFeatures.filter((_, i) => i !== index));
    }
  };

  const handleFAQChange = (index: number, field: keyof FAQItem, value: string) => {
    const newItems = [...formData.faqItems];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('faqItems', newItems);
  };

  const addFAQ = () => {
    if (formData.faqItems.length < 10) {
      handleChange('faqItems', [...formData.faqItems, { question: '', answer: '' }]);
    }
  };

  const removeFAQ = (index: number) => {
    handleChange('faqItems', formData.faqItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform flat structure to nested structure expected by Visit.tsx
      const nestedData = {
        hero: {
          title: formData.heroTitle,
          description: formData.heroDescription,
        },
        serviceInfo: {
          serviceTimeTitle: 'Service Time',
          locationTitle: 'Location',
          parkingTitle: 'Parking',
          parkingDescription: formData.parkingDescription,
        },
        findUs: {
          headline: 'How to Find Us',
        },
        whatHappens: {
          headline: formData.whatHappensHeadline,
          description: formData.whatHappensDescription,
          items: formData.whatHappensItems,
        },
        gettingHere: {
          headline: 'Getting Here',
          addressLabel: 'Address',
          dressCodeLabel: 'What to Wear',
          dressCodeText: formData.dressCodeText,
          arrivalLabel: 'When to Arrive',
          arrivalText: formData.arrivalText,
          buttonText: formData.directionsButtonText,
        },
        kids: {
          tagText: 'Kids Ministry',
          headline: formData.kidsHeadline,
          description: formData.kidsDescription,
          features: formData.kidsFeatures,
          footnote: formData.kidsFootnote,
        },
        cta: {
          headline: formData.ctaHeadline,
          description: formData.ctaDescription,
          buttonText: formData.ctaButtonText,
        },
      };
      await onSave(nestedData as any);
      toast({
        title: 'Visit page saved!',
        description: 'Your changes are now live.',
      });
    } catch (error) {
      toast({
        title: 'Error saving',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="single" collapsible defaultValue="hero" className="space-y-4">
        {/* Hero Section */}
        <AccordionItem value="hero" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-semibold">Hero Section</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Introduction Paragraph</Label>
              <Textarea
                value={formData.heroDescription}
                onChange={(e) => handleChange('heroDescription', e.target.value)}
                maxLength={300}
                rows={3}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Service Info */}
        <AccordionItem value="serviceInfo" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Parking & Arrival Info</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Parking Description</Label>
              <Textarea
                value={formData.parkingDescription}
                onChange={(e) => handleChange('parkingDescription', e.target.value)}
                maxLength={200}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Dress Code</Label>
              <Input
                value={formData.dressCodeText}
                onChange={(e) => handleChange('dressCodeText', e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label>When to Arrive</Label>
              <Input
                value={formData.arrivalText}
                onChange={(e) => handleChange('arrivalText', e.target.value)}
                maxLength={150}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Note: Service time and address come from Global Settings.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* What Happens */}
        <AccordionItem value="whatHappens" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">What Happens on Sunday ({formData.whatHappensItems.length} items)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Section Headline</Label>
              <Input
                value={formData.whatHappensHeadline}
                onChange={(e) => handleChange('whatHappensHeadline', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.whatHappensDescription}
                onChange={(e) => handleChange('whatHappensDescription', e.target.value)}
                maxLength={100}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              {formData.whatHappensItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={item.title}
                      onChange={(e) => handleWhatHappensChange(index, 'title', e.target.value)}
                      placeholder="Title"
                      maxLength={50}
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleWhatHappensChange(index, 'description', e.target.value)}
                      placeholder="Description"
                      maxLength={200}
                      rows={2}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWhatHappensItem(index)}
                    disabled={formData.whatHappensItems.length <= 2}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            
            {formData.whatHappensItems.length < 6 && (
              <Button type="button" variant="outline" onClick={addWhatHappensItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Kids Section */}
        <AccordionItem value="kids" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Kids Ministry Section</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label>Show Kids Section</Label>
              <Switch
                checked={formData.kidsEnabled}
                onCheckedChange={(checked) => handleChange('kidsEnabled', checked)}
              />
            </div>
            
            {formData.kidsEnabled && (
              <>
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={formData.kidsHeadline}
                    onChange={(e) => handleChange('kidsHeadline', e.target.value)}
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.kidsDescription}
                    onChange={(e) => handleChange('kidsDescription', e.target.value)}
                    maxLength={300}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Features (bullet points)</Label>
                  {formData.kidsFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleKidsFeatureChange(index, e.target.value)}
                        maxLength={50}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeKidsFeature(index)}
                        disabled={formData.kidsFeatures.length <= 2}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  {formData.kidsFeatures.length < 8 && (
                    <Button type="button" variant="outline" size="sm" onClick={addKidsFeature}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Footnote</Label>
                  <Input
                    value={formData.kidsFootnote}
                    onChange={(e) => handleChange('kidsFootnote', e.target.value)}
                    maxLength={150}
                  />
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Accessibility Section */}
        <AccordionItem value="accessibility" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Accessibility Info (Optional)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label>Show Accessibility Section</Label>
              <Switch
                checked={formData.accessibilityEnabled}
                onCheckedChange={(checked) => handleChange('accessibilityEnabled', checked)}
              />
            </div>
            
            {formData.accessibilityEnabled && (
              <div className="space-y-2">
                <Label>Accessibility Information</Label>
                <Textarea
                  value={formData.accessibilityText}
                  onChange={(e) => handleChange('accessibilityText', e.target.value)}
                  maxLength={300}
                  rows={3}
                />
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* FAQ Section */}
        <AccordionItem value="faq" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">FAQ Section (Optional)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label>Show FAQ Section</Label>
              <Switch
                checked={formData.faqEnabled}
                onCheckedChange={(checked) => handleChange('faqEnabled', checked)}
              />
            </div>
            
            {formData.faqEnabled && (
              <>
                <div className="space-y-3">
                  {formData.faqItems.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1 space-y-2">
                        <Input
                          value={item.question}
                          onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                          placeholder="Question"
                          maxLength={100}
                        />
                        <Textarea
                          value={item.answer}
                          onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                          placeholder="Answer"
                          maxLength={300}
                          rows={2}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFAQ(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {formData.faqItems.length < 10 && (
                  <Button type="button" variant="outline" onClick={addFAQ}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ (max 10)
                  </Button>
                )}
              </>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* CTA Section */}
        <AccordionItem value="cta" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Contact CTA Section</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.ctaHeadline}
                onChange={(e) => handleChange('ctaHeadline', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.ctaDescription}
                onChange={(e) => handleChange('ctaDescription', e.target.value)}
                maxLength={200}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.ctaButtonText}
                onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                maxLength={30}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end sticky bottom-4">
        <Button type="submit" disabled={isSaving} size="lg" className="shadow-lg">
          {isSaving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Visit Page
        </Button>
      </div>
    </form>
  );
}
