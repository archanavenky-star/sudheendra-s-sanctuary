export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  user: SupabaseUser;
}

export interface SupabaseUser {
  id: string;
  email?: string;
}

const STORAGE_KEY = "iatw-supabase-session";

export const supabaseConfig = {
  url: (import.meta.env.VITE_SUPABASE_URL ?? "").replace(/\/$/, ""),
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

let cachedSession: SupabaseSession | null = null;

const loadSession = (): SupabaseSession | null => {
  if (cachedSession) return cachedSession;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cachedSession = raw ? JSON.parse(raw) : null;
    return cachedSession;
  } catch {
    return null;
  }
};

const saveSession = (session: SupabaseSession | null) => {
  cachedSession = session;
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures; auth still works for the current session.
  }
};

const headers = (accessToken?: string, extra?: Record<string, string>) => ({
  apikey: supabaseConfig.anonKey,
  Authorization: `Bearer ${accessToken ?? supabaseConfig.anonKey}`,
  ...extra,
});

const parseError = async (response: Response) => {
  try {
    const body = await response.json();
    return body.message || body.error_description || body.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
};

export async function signIn(email: string, password: string): Promise<SupabaseSession> {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured yet.");

  const response = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: headers(undefined, { "Content-Type": "application/json" }),
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error(await parseError(response));
  const data = await response.json();
  const session: SupabaseSession = {
    ...data,
    expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600),
  };
  saveSession(session);
  return session;
}

export async function refreshSession(): Promise<SupabaseSession | null> {
  const session = loadSession();
  if (!session?.refresh_token || !isSupabaseConfigured) return null;

  const response = await fetch(`${supabaseConfig.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: headers(undefined, { "Content-Type": "application/json" }),
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });

  if (!response.ok) {
    saveSession(null);
    return null;
  }

  const data = await response.json();
  const refreshed: SupabaseSession = {
    ...data,
    expires_at: Math.floor(Date.now() / 1000) + Number(data.expires_in ?? 3600),
  };
  saveSession(refreshed);
  return refreshed;
}

export async function getSession(): Promise<SupabaseSession | null> {
  const session = loadSession();
  if (!session) return null;
  const expiresAt = session.expires_at ?? 0;
  if (expiresAt && expiresAt - Math.floor(Date.now() / 1000) < 60) {
    return refreshSession();
  }
  return session;
}

export async function signOut() {
  const session = loadSession();
  if (session && isSupabaseConfigured) {
    await fetch(`${supabaseConfig.url}/auth/v1/logout`, {
      method: "POST",
      headers: headers(session.access_token),
    }).catch(() => undefined);
  }
  saveSession(null);
}

export async function supabaseFetch<T = unknown>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured. Copy .env.example to .env.local and add your project values.");

  const session = await getSession();
  const response = await fetch(`${supabaseConfig.url}${path}`, {
    ...options,
    headers: {
      ...headers(session?.access_token),
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401 && retry && session?.refresh_token) {
    const refreshed = await refreshSession();
    if (refreshed) return supabaseFetch<T>(path, options, false);
  }

  if (!response.ok) throw new Error(await parseError(response));
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function uploadBlogImage(file: File): Promise<string> {
  const session = await getSession();
  if (!session) throw new Error("Please sign in first.");

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const response = await fetch(`${supabaseConfig.url}/storage/v1/object/blog-images/${path}`, {
    method: "POST",
    headers: headers(session.access_token, { "Content-Type": file.type || "application/octet-stream", "x-upsert": "false" }),
    body: file,
  });

  if (!response.ok) throw new Error(await parseError(response));
  return `${supabaseConfig.url}/storage/v1/object/public/blog-images/${path}`;
}
