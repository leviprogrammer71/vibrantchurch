import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, Youtube, CreditCard, CheckCircle, AlertCircle, Loader2, Globe } from 'lucide-react';
import { hasSupabase } from '@/integrations/supabase/client';

export function HealthStatusWidget() {
  // Hardcoded status since we no longer depend on Supabase edge functions
  const integrations = [
    {
      name: 'PayPal Donate Button',
      icon: CreditCard,
      iconColor: 'text-blue-500',
      status: 'active' as const,
      detail: 'Hosted button ID: 4GTZXSK6DTAGC',
    },
    {
      name: 'YouTube Channel',
      icon: Youtube,
      iconColor: 'text-red-500',
      status: 'active' as const,
      detail: 'Embedded via channel uploads playlist',
    },
    {
      name: 'Church Center Calendar',
      icon: Calendar,
      iconColor: 'text-secondary',
      status: 'active' as const,
      detail: 'Embedded via iframe',
    },
    {
      name: 'Data Storage',
      icon: Globe,
      iconColor: 'text-primary',
      status: hasSupabase ? 'active' as const : 'local' as const,
      detail: hasSupabase ? 'Supabase connected' : 'Using local storage (browser)',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'local':
        return <CheckCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'local': return 'Local Mode';
      default: return 'Error';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Integration Health
        </CardTitle>
        <CardDescription>
          Status of all connected services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <integration.icon className={`w-5 h-5 ${integration.iconColor}`} />
              <div>
                <p className="font-medium text-sm">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.detail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(integration.status)}
              <span className="text-sm font-medium">
                {getStatusText(integration.status)}
              </span>
            </div>
          </div>
        ))}

        {!hasSupabase && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Running in Local Mode</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Content changes are saved to your browser's local storage.
              To use cloud storage, configure Supabase environment variables.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
