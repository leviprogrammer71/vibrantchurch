import { useState, useEffect } from 'react';
import { Save, Users, Plus, Trash2, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ValueItem {
  title: string;
  description: string;
}

interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
}

interface AboutPageContent {
  // Hero
  heroTitle: string;
  heroDescription: string;
  
  // Who We Are
  whoWeAreEyebrow: string;
  whoWeAreHeadline: string;
  whoWeAreParagraphs: string[];
  
  // Vision
  visionHeadline: string;
  visionStatement: string;
  
  // Values
  valuesEyebrow: string;
  valuesHeadline: string;
  values: ValueItem[];
  
  // Beliefs
  beliefsHeadline: string;
  beliefsIntro: string;
  beliefs: string[];
  
  // Leadership
  leadershipEyebrow: string;
  leadershipHeadline: string;
  leadershipDescription: string;
  seniorPastor: LeaderProfile;
  overseer: LeaderProfile;
  leaders: LeaderProfile[];
}

interface AboutPageEditorProps {
  initialData?: Partial<AboutPageContent>;
  onSave: (data: AboutPageContent) => Promise<void>;
  isSaving: boolean;
}

const defaultContent: AboutPageContent = {
  heroTitle: 'About Us',
  heroDescription: 'Vibrant Church is a welcoming community of Christ-followers in Terre Hill, Pennsylvania.',
  
  whoWeAreEyebrow: 'Who We Are',
  whoWeAreHeadline: 'A Place to Belong',
  whoWeAreParagraphs: [
    'Vibrant Church is a community of people who love God and love one another.',
    'We are passionate about helping people grow in their relationship with Jesus.',
  ],
  
  visionHeadline: 'Our Vision',
  visionStatement: 'To be a church that brings hope, healing, and new life to our community through the love of Jesus Christ.',
  
  valuesEyebrow: 'Our Purpose',
  valuesHeadline: 'Our Values',
  values: [
    { title: 'Jesus First', description: 'Everything we do points to Him' },
    { title: 'People Matter', description: 'Everyone is valued and loved' },
    { title: 'Authentic Community', description: 'We grow better together' },
    { title: 'Biblical Truth', description: "God's Word guides our lives" },
    { title: 'Compassion & Service', description: 'We serve our community with love' },
  ],
  
  beliefsHeadline: 'What We Believe',
  beliefsIntro: 'We believe:',
  beliefs: [
    'The Bible is the inspired Word of God',
    'Jesus Christ is the Son of God and Savior of the world',
    'Salvation is found through faith in Jesus',
    'The Holy Spirit guides and empowers believers',
    'The Church exists to share God\'s love and truth',
  ],
  
  leadershipEyebrow: 'Our Team',
  leadershipHeadline: 'Our Leadership Team',
  leadershipDescription: 'Meet the dedicated leaders serving our church family.',
  seniorPastor: {
    name: 'Samy Kengela',
    role: 'Senior Pastor',
    bio: 'Pastor Samy leads Vibrant Church with a passion for reaching others for Christ.',
  },
  overseer: {
    name: 'Brian Sauder',
    role: 'Overseer',
    bio: 'Brian provides apostolic oversight and guidance to our church family.',
  },
  leaders: [
    { name: 'Nelson & Sue Martin', role: 'Leadership Team', bio: 'Nelson and Sue serve faithfully on our leadership team.' },
    { name: 'Craig & Denise Sensenig', role: 'Leadership Team', bio: 'Craig and Denise bring wisdom and experience to our leadership.' },
  ],
};

export function AboutPageEditor({ initialData, onSave, isSaving }: AboutPageEditorProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AboutPageContent>({ ...defaultContent, ...initialData });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultContent, ...initialData });
    }
  }, [initialData]);

  const handleChange = <K extends keyof AboutPageContent>(key: K, value: AboutPageContent[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Senior Pastor handlers
  const handleSeniorPastorChange = (field: keyof LeaderProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      seniorPastor: { ...prev.seniorPastor, [field]: value },
    }));
  };

  // Overseer handlers
  const handleOverseerChange = (field: keyof LeaderProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      overseer: { ...prev.overseer, [field]: value },
    }));
  };

  // Values handlers
  const handleValueChange = (index: number, field: keyof ValueItem, value: string) => {
    const newItems = [...formData.values];
    newItems[index] = { ...newItems[index], [field]: value };
    handleChange('values', newItems);
  };

  const addValue = () => {
    if (formData.values.length < 6) {
      handleChange('values', [...formData.values, { title: '', description: '' }]);
    }
  };

  const removeValue = (index: number) => {
    if (formData.values.length > 2) {
      handleChange('values', formData.values.filter((_, i) => i !== index));
    }
  };

  // Beliefs handlers
  const handleBeliefChange = (index: number, value: string) => {
    const newBeliefs = [...formData.beliefs];
    newBeliefs[index] = value;
    handleChange('beliefs', newBeliefs);
  };

  const addBelief = () => {
    if (formData.beliefs.length < 10) {
      handleChange('beliefs', [...formData.beliefs, '']);
    }
  };

  const removeBelief = (index: number) => {
    if (formData.beliefs.length > 2) {
      handleChange('beliefs', formData.beliefs.filter((_, i) => i !== index));
    }
  };

  // Leaders handlers
  const handleLeaderChange = (index: number, field: keyof LeaderProfile, value: string) => {
    const newLeaders = [...formData.leaders];
    newLeaders[index] = { ...newLeaders[index], [field]: value };
    handleChange('leaders', newLeaders);
  };

  const addLeader = () => {
    if (formData.leaders.length < 10) {
      handleChange('leaders', [...formData.leaders, { name: '', role: '', bio: '' }]);
    }
  };

  const removeLeader = (index: number) => {
    handleChange('leaders', formData.leaders.filter((_, i) => i !== index));
  };

  // Paragraphs handlers
  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...formData.whoWeAreParagraphs];
    newParagraphs[index] = value;
    handleChange('whoWeAreParagraphs', newParagraphs);
  };

  const addParagraph = () => {
    if (formData.whoWeAreParagraphs.length < 4) {
      handleChange('whoWeAreParagraphs', [...formData.whoWeAreParagraphs, '']);
    }
  };

  const removeParagraph = (index: number) => {
    if (formData.whoWeAreParagraphs.length > 1) {
      handleChange('whoWeAreParagraphs', formData.whoWeAreParagraphs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
      toast({
        title: 'About page saved!',
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
        {/* Hero */}
        <AccordionItem value="hero" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
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
              <Label>Description</Label>
              <Textarea
                value={formData.heroDescription}
                onChange={(e) => handleChange('heroDescription', e.target.value)}
                maxLength={300}
                rows={3}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Who We Are */}
        <AccordionItem value="whoWeAre" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Who We Are Section</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Eyebrow Text</Label>
                <Input
                  value={formData.whoWeAreEyebrow}
                  onChange={(e) => handleChange('whoWeAreEyebrow', e.target.value)}
                  maxLength={30}
                />
              </div>
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.whoWeAreHeadline}
                  onChange={(e) => handleChange('whoWeAreHeadline', e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Paragraphs</Label>
              {formData.whoWeAreParagraphs.map((para, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={para}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    maxLength={500}
                    rows={3}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeParagraph(index)}
                    disabled={formData.whoWeAreParagraphs.length <= 1}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {formData.whoWeAreParagraphs.length < 4 && (
                <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paragraph
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Vision */}
        <AccordionItem value="vision" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Vision Statement</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={formData.visionHeadline}
                onChange={(e) => handleChange('visionHeadline', e.target.value)}
                maxLength={50}
              />
            </div>
            <div className="space-y-2">
              <Label>Vision Statement</Label>
              <Textarea
                value={formData.visionStatement}
                onChange={(e) => handleChange('visionStatement', e.target.value)}
                maxLength={300}
                rows={3}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Values */}
        <AccordionItem value="values" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Values ({formData.values.length} items)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Eyebrow Text</Label>
                <Input
                  value={formData.valuesEyebrow}
                  onChange={(e) => handleChange('valuesEyebrow', e.target.value)}
                  maxLength={30}
                />
              </div>
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.valuesHeadline}
                  onChange={(e) => handleChange('valuesHeadline', e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              {formData.values.map((value, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Input
                      value={value.title}
                      onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                      placeholder="Value title"
                      maxLength={30}
                    />
                    <Input
                      value={value.description}
                      onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                      placeholder="One sentence description"
                      maxLength={60}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeValue(index)}
                    disabled={formData.values.length <= 2}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            
            {formData.values.length < 6 && (
              <Button type="button" variant="outline" onClick={addValue}>
                <Plus className="w-4 h-4 mr-2" />
                Add Value (max 6)
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Beliefs */}
        <AccordionItem value="beliefs" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <span className="font-semibold">Beliefs ({formData.beliefs.length} items)</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.beliefsHeadline}
                  onChange={(e) => handleChange('beliefsHeadline', e.target.value)}
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label>Intro Text</Label>
                <Input
                  value={formData.beliefsIntro}
                  onChange={(e) => handleChange('beliefsIntro', e.target.value)}
                  maxLength={30}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Belief Statements</Label>
              {formData.beliefs.map((belief, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={belief}
                    onChange={(e) => handleBeliefChange(index, e.target.value)}
                    placeholder="Belief statement"
                    maxLength={100}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBelief(index)}
                    disabled={formData.beliefs.length <= 2}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {formData.beliefs.length < 10 && (
                <Button type="button" variant="outline" size="sm" onClick={addBelief}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Belief
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Leadership */}
        <AccordionItem value="leadership" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="font-semibold">Leadership & Staff</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Eyebrow Text</Label>
                <Input
                  value={formData.leadershipEyebrow}
                  onChange={(e) => handleChange('leadershipEyebrow', e.target.value)}
                  maxLength={30}
                />
              </div>
              <div className="space-y-2">
                <Label>Headline</Label>
                <Input
                  value={formData.leadershipHeadline}
                  onChange={(e) => handleChange('leadershipHeadline', e.target.value)}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.leadershipDescription}
                onChange={(e) => handleChange('leadershipDescription', e.target.value)}
                maxLength={150}
              />
            </div>
            
            <Separator />
            
            {/* Senior Pastor */}
            <Card className="bg-secondary/5 border-secondary/30">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  <Crown className="w-4 h-4" />
                  <span>Senior Pastor</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={formData.seniorPastor.name}
                      onChange={(e) => handleSeniorPastorChange('name', e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Title</Label>
                    <Input
                      value={formData.seniorPastor.role}
                      onChange={(e) => handleSeniorPastorChange('role', e.target.value)}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.seniorPastor.bio}
                    onChange={(e) => handleSeniorPastorChange('bio', e.target.value)}
                    maxLength={300}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{formData.seniorPastor.bio.length}/300 characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Overseer */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground font-semibold">
                  <Users className="w-4 h-4" />
                  <span>Overseer</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={formData.overseer.name}
                      onChange={(e) => handleOverseerChange('name', e.target.value)}
                      maxLength={50}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Title</Label>
                    <Input
                      value={formData.overseer.role}
                      onChange={(e) => handleOverseerChange('role', e.target.value)}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={formData.overseer.bio}
                    onChange={(e) => handleOverseerChange('bio', e.target.value)}
                    maxLength={300}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Separator />
            
            {/* Leadership Team */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Leadership Team</Label>
              {formData.leaders.map((leader, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-muted-foreground">Team Member {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLeader(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={leader.name}
                          onChange={(e) => handleLeaderChange(index, 'name', e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input
                          value={leader.role}
                          onChange={(e) => handleLeaderChange(index, 'role', e.target.value)}
                          maxLength={50}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bio (max 300 characters)</Label>
                      <Textarea
                        value={leader.bio}
                        onChange={(e) => handleLeaderChange(index, 'bio', e.target.value)}
                        maxLength={300}
                        rows={2}
                      />
                      <p className="text-xs text-muted-foreground">{leader.bio.length}/300 characters</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {formData.leaders.length < 10 && (
              <Button type="button" variant="outline" onClick={addLeader}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            )}
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
          Save About Page
        </Button>
      </div>
    </form>
  );
}
