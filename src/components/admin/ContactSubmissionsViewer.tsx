import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, User, MessageSquare, Phone, RefreshCw, Loader2, Inbox, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  read_at: string | null;
}

export function ContactSubmissionsViewer() {
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  const { data: submissions, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  const markAsRead = async (id: string) => {
    await supabase
      .from('contact_submissions')
      .update({ read_at: new Date().toISOString(), status: 'read' })
      .eq('id', id);
    refetch();
  };

  const getStatusBadge = (status: string, readAt: string | null) => {
    if (readAt || status === 'read') {
      return <Badge variant="secondary">Read</Badge>;
    }
    return <Badge variant="default" className="bg-secondary text-secondary-foreground">New</Badge>;
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-destructive">
            <p>Failed to load submissions. Please try again.</p>
            <Button onClick={() => refetch()} variant="outline" className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Submissions
              </CardTitle>
              <CardDescription>
                View messages received through the contact form
              </CardDescription>
            </div>
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              size="sm"
              disabled={isFetching}
            >
              {isFetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : submissions?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No contact submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions?.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedMessage(submission);
                    if (!submission.read_at) markAsRead(submission.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium truncate">{submission.name}</span>
                        {getStatusBadge(submission.status, submission.read_at)}
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {submission.subject}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {submission.message}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(parseISO(submission.created_at), 'MMM d, h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              Received {selectedMessage && format(parseISO(selectedMessage.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <User className="w-4 h-4" /> Name
                  </p>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Email
                  </p>
                  <a 
                    href={`mailto:${selectedMessage.email}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Phone className="w-4 h-4" /> Phone
                    </p>
                    <a 
                      href={`tel:${selectedMessage.phone}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-muted-foreground flex items-center gap-1 mb-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </p>
                <div className="p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
