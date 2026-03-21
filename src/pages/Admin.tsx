import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useAllSiteContent, useUpdateSiteContent } from '@/hooks/useSiteContent';
import {
  AdminSidebar,
  AdminSection,
  HealthStatusWidget,
  ContactSubmissionsViewer,
  GlobalSettingsEditor,
  AnnouncementEditor,
  HomePageEditor,
  VisitPageEditor,
  AboutPageEditor,
  WatchPageEditor,
  GivePageEditor,
  ContactPageEditor,
  IntegrationsEditor,
} from '@/components/admin';

export default function Admin() {
  const navigate = useNavigate();
  const { data: allContent, isLoading: contentLoading } = useAllSiteContent();
  const updateContent = useUpdateSiteContent();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('global');
  const [saving, setSaving] = useState(false);

  // Content state for each section
  const [contentData, setContentData] = useState<Record<string, Record<string, unknown>>>({});

  const { user, isAdmin, loading, adminStatusReady, signOut } = useAuth();

  // Redirect if not admin (wait for adminStatusReady)
  useEffect(() => {
    if (!loading && adminStatusReady && (!user || !isAdmin)) {
      navigate('/staff');
    }
  }, [user, isAdmin, loading, adminStatusReady, navigate]);

  // Load existing content from database
  useEffect(() => {
    if (allContent) {
      const newContentData: Record<string, Record<string, unknown>> = {};
      allContent.forEach((item) => {
        if (item.content && typeof item.content === 'object' && !Array.isArray(item.content)) {
          newContentData[item.section_key] = item.content as Record<string, unknown>;
        }
      });
      setContentData(newContentData);
    }
  }, [allContent]);

  const handleSave = async <T extends object>(sectionKey: string, data: T) => {
    setSaving(true);
    try {
      await updateContent.mutateAsync({
        sectionKey,
        content: data as unknown as Record<string, unknown>,
      });
      // Update local state
      setContentData(prev => ({
        ...prev,
        [sectionKey]: data as unknown as Record<string, unknown>,
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || contentLoading || !adminStatusReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderEditor = () => {
    switch (activeSection) {
      case 'global':
        return (
          <div className="space-y-6">
            <HealthStatusWidget />
            <GlobalSettingsEditor
              initialData={contentData['global'] as any}
              onSave={(data) => handleSave('global', data)}
              isSaving={saving}
            />
          </div>
        );
      case 'announcement':
        return (
          <AnnouncementEditor
            initialData={contentData['announcement'] as any}
            onSave={(data) => handleSave('announcement', data)}
            isSaving={saving}
          />
        );
      case 'home':
        return (
          <HomePageEditor
            initialData={contentData['home'] as any}
            onSave={(data) => handleSave('home', data)}
            isSaving={saving}
          />
        );
      case 'visit':
        return (
          <VisitPageEditor
            initialData={contentData['visit'] as any}
            onSave={(data) => handleSave('visit', data)}
            isSaving={saving}
          />
        );
      case 'about':
        return (
          <AboutPageEditor
            initialData={contentData['about'] as any}
            onSave={(data) => handleSave('about', data)}
            isSaving={saving}
          />
        );
      case 'watch':
        return (
          <WatchPageEditor
            initialData={contentData['watch'] as any}
            onSave={(data) => handleSave('watch', data)}
            isSaving={saving}
          />
        );
      case 'give':
        return (
          <GivePageEditor
            initialData={contentData['give'] as any}
            onSave={(data) => handleSave('give', data)}
            isSaving={saving}
          />
        );
      case 'contact':
        return (
          <ContactPageEditor
            initialData={contentData['contact'] as any}
            onSave={(data) => handleSave('contact', data)}
            isSaving={saving}
          />
        );
      case 'messages':
        return <ContactSubmissionsViewer />;
      case 'media':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Media Library
              </CardTitle>
              <CardDescription>
                Upload and manage images used across the site. Coming soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Media library functionality coming soon.</p>
                <p className="text-sm mt-2">For now, images are managed directly in the page editors.</p>
              </div>
            </CardContent>
          </Card>
        );
      case 'integrations':
        return (
          <IntegrationsEditor
            initialData={contentData['integrations'] as any}
            onSave={(data) => handleSave('integrations', data)}
            isSaving={saving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSignOut={handleSignOut}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="lg:ml-72 pt-20 lg:pt-0 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderEditor()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
