import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Refresh every 4 minutes (well before any token expiry)
const REFRESH_INTERVAL_MS = 4 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hadSessionRef = useRef(false);

  const checkAdminRole = useCallback((userId: string) => {
    setTimeout(async () => {
      try {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      } catch {
        setIsAdmin(false);
      }
    }, 0);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      // Try refreshSession first (actively renews tokens)
      const { data, error } = await supabase.auth.refreshSession();
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.session.user);
        hadSessionRef.current = true;
        return true;
      }
      // If refresh fails, try getSession as fallback
      const { data: fallback } = await supabase.auth.getSession();
      if (fallback.session) {
        setSession(fallback.session);
        setUser(fallback.session.user);
        hadSessionRef.current = true;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  // Proactive session refresh on interval
  const startSessionRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    refreshIntervalRef.current = setInterval(() => {
      refreshSession();
    }, REFRESH_INTERVAL_MS);
  }, [refreshSession]);

  const stopSessionRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          hadSessionRef.current = true;
          checkAdminRole(currentSession.user.id);
          startSessionRefresh();
        } else {
          // Only clear admin if user explicitly signed out
          if (event === "SIGNED_OUT") {
            setIsAdmin(false);
            hadSessionRef.current = false;
            stopSessionRefresh();
          } else if (hadSessionRef.current && event === "TOKEN_REFRESHED") {
            // Token refreshed but no session — try recovery
            refreshSession();
          }
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      if (existingSession?.user) {
        setSession(existingSession);
        setUser(existingSession.user);
        hadSessionRef.current = true;
        checkAdminRole(existingSession.user.id);
        startSessionRefresh();
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      stopSessionRefresh();
    };
  }, [checkAdminRole, startSessionRefresh, stopSessionRefresh, refreshSession]);

  // Refresh on visibility change AND focus (covers all scenarios)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && hadSessionRef.current) {
        refreshSession();
      }
    };

    const handleFocus = () => {
      if (hadSessionRef.current) {
        refreshSession();
      }
    };

    // Also handle online event (reconnecting after network loss)
    const handleOnline = () => {
      if (hadSessionRef.current) {
        refreshSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("online", handleOnline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("online", handleOnline);
    };
  }, [refreshSession]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName },
      },
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    hadSessionRef.current = false;
    stopSessionRefresh();
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
