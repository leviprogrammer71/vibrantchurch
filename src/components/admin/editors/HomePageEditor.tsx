import { useState, useEffect } from 'react';
import { Save, Home, ImageIcon, Link as LinkIcon, Plus, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FeatureCard {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

interface ExpectationItem {
  title: string;
  description: string;
}

interface HomePageContent {
  // Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroSubheadlineLine2: string;
  heroCtaText: string;
  heroCtaLink: string;
  
  // Mission
  missionHeadline: string;
  missionHighlight: string;
  missionContinued: string;
  missionParagraph: string;
  
  // Feature Cards
  featureCards: FeatureCard[];
  
  // Beliefs Section
  beliefsEyebrow: string;
  beliefsHeadline: string;
  beliefsParagraph: string;
  beliefsButtonText: string;
  
  // What to Expect
  expectationsTitle: string;
  expectationsSubtitle: string;
  expectations: ExpectationItem[];
  
  // Watch Section
  watchHeadline: string;
  watchDescription: string;
  watchButtonText: string;
  featuredVideoUrl: string;
  
  // CTA Section
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaButtonText: string;
}

interface HomePageEditorProps {
  initialData?: Partial<HomePageContent>;
  onSave: (data: HomePageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: HomePageContent = {
  heroHeadline: 'Welcome to',
  heroSubheadline: 'Join us Sundays at 10:00 AM —',
  heroSubheadlineLine2: 'real worship, real community, real purpose.',
  heroCtaText: 'Plan your visit',
  heroCtaLink: '/visit',
  
  missionHeadline: 'A church that believes in Jesus,',
  missionHighlight: 'loves God',
  missionContinued: 'and people',
  missionParagraph: 'Welcome to Vibrant Hill Church — a warm, welcoming church family located in the heart of Terre Hill.',
  
  featureCards: [
    { title: "I'm New", description: "We are glad you are here! We look forward to connecting with you.", buttonText: "Plan a Visit", link: "/visit" },
    { title: "Connect With Us", description: "Our team is here to answer any of your questions or provide more info about our church.", buttonText: "Get Connected", link: "/contact" },
    { title: "Join a Group", description: "We place a high value on connecting in community with others.", buttonText: "View Groups", link: "/about" },
  ],
  
  beliefsEyebrow: 'Beliefs That Unite Us',
  beliefsHeadline: 'Empowered by God to reach others for Christ',
  beliefsParagraph: 'Vibrant Hill Church is a community of people who love God and love one another. We believe church should feel like home — a place where you are accepted, supported, and encouraged.',
  beliefsButtonText: 'Learn More About Us',
  
  expectationsTitle: 'What to Expect',
  expectationsSubtitle: 'When you visit Vibrant Hill Church, you can expect:',
  expectations: [
    { title: "Friendly, welcoming people", description: "You'll be greeted with warm smiles and genuine hospitality." },
    { title: "Casual atmosphere", description: "Come as you are! Jeans, shorts, or dresses—whatever makes you comfortable." },
    { title: "Inspiring worship music", description: "Experience uplifting contemporary music that helps connect your heart to God." },
    { title: "Bible-based message", description: "Practical messages from the Bible that apply to your everyday life." },
  ],
  
  watchHeadline: 'Watch Our Latest Service',
  watchDescription: "Couldn't make it in person? Watch our most recent service and stay connected.",
  watchButtonText: 'Watch Now',
  featuredVideoUrl: '',
  
  ctaHeadline: 'You Belong Here',
  ctaSubheadline: "No matter where you are in your faith journey, there's a place for you at Vibrant Hill Church.",
  ctaButtonText: 'Plan Your Visit',
};

export function HomePageEditor({ initialData, onSave, isSaving }: HomePageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<HomePageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultContent, ...initialData });
    }
  }, [initialData]);

  const handleChange = <K extends keyof HomePageContent>(key: K, value: HomePageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFeatureCardChange = (index: number, field: keyof FeatureCard, value: string) => {
    const newCards = [...formData.featureCards];
    newCards[index] = { ...newCards[index], [field]: value };
    handleChange('featureCards', newCards);
  };

  const handleExpectationChange = (index: number, field: keyof ExpectationItem, value: string) => {
    const newItems = [...formData.expectations];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('expectations', newItems);
  };

  const addExpectation = () => {
    if (formData.expectations.length < 8) {
      handleChange('expectations', [...formData.expectations, { title: '', description: '' }]);
    }
  };

  const removeExpectation = (index: number) => {
    if (formData.expectations.length > 2) {
      handleChange('expectations', formData.expectations.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({
        title: 'Home page saved!',
        description: 'Your changes are now live on the site.',
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
              <Home className="w-4 h-4" />
              <span className="font-semibold">Hero Section</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.heroHeadline}
                onChange={(e) => handleChange('heroHeadline', e.target.value)}
                placeholder="Welcome to"
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Subheadline Line 1</Label>
              <Input
                value={formData.heroSubheadline}
                onChange={(e) => handleChange('heroSubheadline', e.target.value)}
                placeholder="Join us Sundays at 10:00 AM —"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label>Subheadline Line 2</Label>
              <Input
                value={formData.heroSubheadlineLine2}
                onChange={(e) => handleChange('heroSubheadlineLine2', e.target.value)}
                placeholder="real worship, real community..."
                maxLength={100}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CTA Button Text</Label>
                <Input
                  value={formData.heroCtaText}
                  onChange={(e) => handleChange('heroCtaText', e.target.value)}
                  placeholder="Plan your visit"
                  maxLength={30}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA Button Link</Label>
                <Input
                  value={formData.heroCtaLink}
                  onChange={(e) => handleChange('heroCtaLink', e.target.value)}
                  placeholder="/visit"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mission Section */}
        <AccordionItem value="mission" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Mission Statement</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline Start</Label>
              <Input
                value={formData.missionHeadline}
                onChange={(e) => handleChange('missionHeadline', e.target.value)}
                placeholder="A church that believes in Jesus,"
                maxLength={100}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Highlighted Text (gold)</Label>
                <Input
                  value={formData.missionHighlight}
                  onChange={(e) => handleChange('missionHighlight', e.target.value)}
                  placeholder="loves God"
                  maxLength={30}
                />
              </div>
              <div className="space-y-2">
                <Label>Headline Continued</Label>
                <Input
                  value={formData.missionContinued}
                  onChange={(e) => handleChange('missionContinued', e.target.value)}
                  placeholder="and people"
                  maxLength={30}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description Paragraph</Label>
              <Textarea
                value={formData.missionParagraph}
                onChange={(e) => handleChange('missionParagraph', e.target.value)}
                placeholder="Welcome to Vibrant Hill Church..."
                maxLength={500}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">{formData.missionParagraph.length}/500 characters</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Feature Cards */}
        <AccordionItem value="cards" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Feature Cards (I'm New, Connect, Join)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            {formData.featureCards.map((card, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="pt-4 space-y-3">
                  <div className="space-y-2">
                    <Label>Card {index + 1} Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => handleFeatureCardChange(index, 'title', e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={card.description}
                      onChange={(e) => handleFeatureCardChange(index, 'description', e.target.value)}
                      maxLength={150}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={card.buttonText}
                        onChange={(e) => handleFeatureCardChange(index, 'buttonText', e.target.value)}
                        maxLength={30}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input
                        value={card.link}
                        onChange={(e) => handleFeatureCardChange(index, 'link', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Beliefs Section */}
        <AccordionItem value="beliefs" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Beliefs Section</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Eyebrow Text</Label>
              <Input
                value={formData.beliefsEyebrow}
                onChange={(e) => handleChange('beliefsEyebrow', e.target.value)}
                placeholder="Beliefs That Unite Us"
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.beliefsHeadline}
                onChange={(e) => handleChange('beliefsHeadline', e.target.value)}
                placeholder="Empowered by God..."
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label>Paragraph</Label>
              <Textarea
                value={formData.beliefsParagraph}
                onChange={(e) => handleChange('beliefsParagraph', e.target.value)}
                maxLength={500}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.beliefsButtonText}
                onChange={(e) => handleChange('beliefsButtonText', e.target.value)}
                maxLength={30}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* What to Expect */}
        <AccordionItem value="expectations" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">What to Expect ({formData.expectations.length} items)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input
                  value={formData.expectationsTitle}
                  onChange={(e) => handleChange('expectationsTitle', e.target.value)}
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={formData.expectationsSubtitle}
                  onChange={(e) => handleChange('expectationsSubtitle', e.target.value)}
                  maxLength={100}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              {formData.expectations.map((item, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={item.title}
                      onChange={(e) => handleExpectationChange(index, 'title', e.target.value)}
                      placeholder="Title"
                      maxLength={50}
                    />
                    <Input
                      value={item.description}
                      onChange={(e) => handleExpectationChange(index, 'description', e.target.value)}
                      placeholder="Short description"
                      maxLength={150}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExpectation(index)}
                    disabled={formData.expectations.length <= 2}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            
            {formData.expectations.length < 8 && (
              <Button type="button" variant="outline" onClick={addExpectation}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item (max 8)
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Watch Section */}
        <AccordionItem value="watch" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Watch Section</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.watchHeadline}
                onChange={(e) => handleChange('watchHeadline', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.watchDescription}
                onChange={(e) => handleChange('watchDescription', e.target.value)}
                maxLength={200}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.watchButtonText}
                onChange={(e) => handleChange('watchButtonText', e.target.value)}
                maxLength={30}
              />
            </div>
            <div className="space-y-2">
              <Label>Featured Video URL (optional override)</Label>
              <Input
                value={formData.featuredVideoUrl}
                onChange={(e) => handleChange('featuredVideoUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use the auto-feed from YouTube
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* CTA Section */}
        <AccordionItem value="cta" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Final CTA Section</span>
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
              <Label>Subheadline</Label>
              <Textarea
                value={formData.ctaSubheadline}
                onChange={(e) => handleChange('ctaSubheadline', e.target.value)}
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
          Save Home Page
        </Button>
      </div>
    </form>
  );
}
