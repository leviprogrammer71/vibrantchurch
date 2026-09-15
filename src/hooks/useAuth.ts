import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, hasSupabase } from '@/integrations/supabase/client';

// ─── Local admin credentials ────────────────────────────────
// Change these directly or set VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD env vars.
const LOCAL_ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'VibrantAdmin2026!';
const LOCAL_AUTH_KEY = 'vibrant_admin_session';

interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  adminStatusReady: boolean;
}

function getLocalSession(): { username: string; loggedIn: boolean } | null {
  try {
    const raw = localStorage.getItem(LOCAL_AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function setLocalSession(username: string) {
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify({ username, loggedIn: true }));
}

function clearLocalSession() {
  localStorage.removeItem(LOCAL_AUTH_KEY);
}

function fakeUser(username: string): User {
  return {
    id: 'local-admin',
    email: `${username}@vibranttchurch.org`,
    app_metadata: {},
    user_metadata: { full_name: 'Admin' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isAdmin: false,
    loading: true,
    adminStatusReady: false,
  });

  const checkAdminRole = useCallback(async (userId: string) => {
    if (!hasSupabase) return true;
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      if (error) return false;
      return !!data;
    } catch { return false; }
  }, []);

  useEffect(() => {
    // Always check local session first — works with or without Supabase
    const stored = getLocalSession();
    if (stored?.loggedIn) {
      setAuthState({
        user: fakeUser(stored.username),
        session: null,
        isAdmin: true,
        loading: false,
        adminStatusReady: true,
      });
      return;
    }

    // If no local session and no Supabase, done
    if (!hasSupabase) {
      setAuthState({ user: null, session: null, isAdmin: false, loading: false, adminStatusReady: true });
      return;
    }

    // Supabase mode
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
        adminStatusReady: !session?.user,
      }));
      if (session?.user) {
        setTimeout(async () => {
          const isAdmin = await checkAdminRole(session.user.id);
          setAuthState(prev => ({ ...prev, isAdmin, adminStatusReady: true }));
        }, 0);
      } else {
        setAuthState(prev => ({ ...prev, isAdmin: false, adminStatusReady: true }));
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
        adminStatusReady: !session?.user,
      }));
      if (session?.user) {
        checkAdminRole(session.user.id).then(isAdmin => {
          setAuthState(prev => ({ ...prev, isAdmin, adminStatusReady: true }));
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  // ── Sign-in: always try local credentials first ──
  const signIn = async (username: string, password: string) => {
    // Check local credentials first (always available)
    if (username === LOCAL_ADMIN_USERNAME && password === LOCAL_ADMIN_PASSWORD) {
      setLocalSession(username);
      setAuthState({
        user: fakeUser(username),
        session: null,
        isAdmin: true,
        loading: false,
        adminStatusReady: true,
      });
      return { data: {} as any, error: null };
    }

    // If Supabase is configured, try that as fallback (treat username as email)
    if (hasSupabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: username,
          password,
        });
        return { data, error };
      } catch {
        // Supabase unreachable, only local login works
      }
    }

    return { data: null, error: { message: 'Invalid username or password' } as any };
  };

  const signUp = async (_email: string, _password: string, _fullName?: string) => {
    return { data: null, error: { message: 'Sign-up is not available.' } as any };
  };

  const signOut = async () => {
    clearLocalSession();
    if (hasSupabase) {
      try { await supabase.auth.signOut(); } catch { /* ignore */ }
    }
    setAuthState({ user: null, session: null, isAdmin: false, loading: false, adminStatusReady: true });
    return { error: null };
  };

  return { ...authState, signIn, signUp, signOut };
}
