import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getSession, signIn, signOut, supabaseFetch, type SupabaseSession } from "@/lib/supabase";

interface AdminAuthContextValue {
  session: SupabaseSession | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const verifyAdmin = async (nextSession: SupabaseSession | null) => {
    if (!nextSession) return null;
    try {
      const admins = await supabaseFetch<{ user_id: string }[]>(`/rest/v1/admin_users?select=user_id&user_id=eq.${encodeURIComponent(nextSession.user.id)}&limit=1`);
      if (!admins.length) {
        await signOut();
        throw new Error("This account is not configured as an administrator.");
      }
      return nextSession;
    } catch (err) {
      await signOut();
      throw err;
    }
  };

  useEffect(() => {
    void getSession().then(async (current) => {
      try {
        setSession(await verifyAdmin(current));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not verify administrator access.");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AdminAuthContextValue>(() => ({
    session,
    loading,
    error,
    login: async (email, password) => {
      setError(null);
      const next = await signIn(email, password);
      const adminSession = await verifyAdmin(next);
      setSession(adminSession);
    },
    logout: async () => {
      await signOut();
      setSession(null);
    },
  }), [session, loading, error]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return context;
};
