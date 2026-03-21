import { 
  Home, 
  FileText, 
  MapPin, 
  Users, 
  Play, 
  Heart, 
  Phone, 
  Settings, 
  LogOut, 
  Bell, 
  Image, 
  History,
  Globe,
  X,
  Menu,
  Inbox
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type AdminSection = 
  | 'global'
  | 'announcement'
  | 'home'
  | 'visit'
  | 'about'
  | 'watch'
  | 'give'
  | 'contact'
  | 'messages'
  | 'media'
  | 'integrations';

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  onSignOut: () => void;
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const navGroups = [
  {
    label: 'Site Settings',
    items: [
      { id: 'global' as AdminSection, label: 'Global Settings', icon: Globe },
      { id: 'announcement' as AdminSection, label: 'Announcement Bar', icon: Bell },
    ],
  },
  {
    label: 'Page Content',
    items: [
      { id: 'home' as AdminSection, label: 'Home Page', icon: Home },
      { id: 'visit' as AdminSection, label: 'Visit Page', icon: MapPin },
      { id: 'about' as AdminSection, label: 'About Page', icon: Users },
      { id: 'watch' as AdminSection, label: 'Watch Page', icon: Play },
      { id: 'give' as AdminSection, label: 'Give Page', icon: Heart },
      { id: 'contact' as AdminSection, label: 'Contact Page', icon: Phone },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'messages' as AdminSection, label: 'Contact Messages', icon: Inbox },
      { id: 'media' as AdminSection, label: 'Media Library', icon: Image },
      { id: 'integrations' as AdminSection, label: 'Integrations', icon: Settings },
    ],
  },
];

export function AdminSidebar({ 
  activeSection, 
  onSectionChange, 
  onSignOut,
  sidebarOpen,
  onCloseSidebar,
}: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b p-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
        <button onClick={onCloseSidebar}>
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-card border-r transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-6 border-b">
          <h1 className="font-bold text-xl">Vibrant Church</h1>
          <p className="text-sm text-muted-foreground">Content Manager</p>
        </div>

        <nav className="p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      onCloseSidebar();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onSignOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onCloseSidebar}
        />
      )}
    </>
  );
}
