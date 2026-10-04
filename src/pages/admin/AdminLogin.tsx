import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminLogin = () => {
  const { session, loading, error, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking access…</div>;
  if (session) return <Navigate to={(location.state as any)?.from?.pathname ?? "/admin/blogs"} replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await login(email, password);
      navigate("/admin/blogs", { replace: true });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-md">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Private area</p>
        <h1 className="mt-4 font-heading text-5xl text-primary">Blog admin</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Sign in with the Supabase account that has administrator access.</p>

        {!isSupabaseConfigured && (
          <div className="mt-8 border border-destructive/30 bg-destructive/5 p-5 text-sm leading-6">
            Supabase is not configured. Copy <code>.env.example</code> to <code>.env.local</code> and add your project URL and publishable/anon key.
          </div>
        )}

        {(formError || error) && <div className="mt-8 border border-destructive/30 bg-destructive/5 p-5 text-sm leading-6 text-destructive">{formError || error}</div>}

        <form onSubmit={submit} className="mt-10 space-y-6 border border-border bg-card/40 p-6 md:p-8">
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <Button className="w-full" disabled={submitting || !isSupabaseConfigured}>{submitting ? "Signing in…" : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
