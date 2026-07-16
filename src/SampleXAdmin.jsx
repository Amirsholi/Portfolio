import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Gift, KeyRound, LogOut, Plus, RefreshCw, ShieldCheck } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const adminEmail = import.meta.env.VITE_SAMPLEX_ADMIN_EMAIL || "amirsholi999@gmail.com";
const SESSION_KEY = "samplexAdminSession";

export function SampleXAdmin() {
  const [session, setSession] = useState(() => readSession());
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "SampleX License Control";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex,nofollow,noarchive");
  }, []);

  const token = session?.access_token || "";

  useEffect(() => {
    if (!session?.refresh_token || !session.expires_at) return undefined;
    const delay = Math.max(1000, session.expires_at - Date.now() - 60_000);
    const timer = window.setTimeout(() => void refreshAdminSession(session.refresh_token, setSession, signOut), delay);
    return () => window.clearTimeout(timer);
  }, [session]);

  const loadLicenses = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/licenses", { headers: { Authorization: `Bearer ${token}` } });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not load licenses.");
      setLicenses(body.licenses || []);
    } catch (requestError) {
      setError(requestError.message);
      if (/session|token|unauthorized/i.test(requestError.message)) signOut();
    } finally {
      setBusy(false);
    }
  }, [token]);

  useEffect(() => { void loadLicenses(); }, [loadLicenses]);

  async function requestLogin(event) {
    event.preventDefault();
    if (!supabaseUrl || !supabasePublishableKey) {
      setLoginMessage("Supabase is not configured yet.");
      return;
    }
    if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
      setLoginMessage("This email is not authorized.");
      return;
    }
    setBusy(true);
    setLoginMessage("");
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: { apikey: supabasePublishableKey, "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const body = await response.json();
      if (!response.ok || !body.access_token) throw new Error("Incorrect email or password.");
      const nextSession = normalizeSession(body);
      saveSession(nextSession);
      setSession(nextSession);
      setPassword("");
    } catch (requestError) {
      setLoginMessage(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
    setLicenses([]);
  }

  if (!token) return <AdminLogin email={email} password={password} message={loginMessage} busy={busy} onEmail={setEmail} onPassword={setPassword} onSubmit={requestLogin} />;

  return (
    <main className="sx-admin-shell">
      <header className="sx-admin-header">
        <div><span className="sx-admin-mark"><ShieldCheck size={17} /></span><div><small>SAMPLEX</small><strong>License control</strong></div></div>
        <button type="button" onClick={signOut}><LogOut size={14} /> Sign out</button>
      </header>
      <section className="sx-admin-summary">
        <div><small>ACTIVE RECORDS</small><strong>{licenses.filter((license) => license.status === "active").length}</strong></div>
        <div><small>COMPLIMENTARY</small><strong>{licenses.filter((license) => license.kind === "promo").length}</strong></div>
        <div><small>PERMANENT</small><strong>{licenses.filter((license) => license.kind === "permanent").length}</strong></div>
      </section>
      <section className="sx-admin-grid">
        <LicenseCreator token={token} onCreated={loadLicenses} />
        <div className="sx-admin-records">
          <div className="sx-section-heading"><div><small>REGISTRY</small><h2>Issued licenses</h2></div><button type="button" onClick={() => void loadLicenses()} disabled={busy} aria-label="Refresh licenses"><RefreshCw size={14} /></button></div>
          {error && <p className="sx-admin-error">{error}</p>}
          {!error && licenses.length === 0 ? <div className="sx-empty"><KeyRound size={20} /><span>No licenses issued yet.</span></div> : null}
          <div className="sx-license-list">
            {licenses.map((license) => <LicenseRow key={license.id} license={license} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminLogin({ email, password, message, busy, onEmail, onPassword, onSubmit }) {
  return (
    <main className="sx-login-shell">
      <section className="sx-login-card">
        <span className="sx-login-icon"><KeyRound size={22} /></span>
        <small>PRIVATE ACCESS</small>
        <h1>SampleX licenses</h1>
        <p>Sign in with the authorized administrator account.</p>
        <form onSubmit={onSubmit}>
          <input type="email" value={email} onChange={(event) => onEmail(event.target.value)} aria-label="Administrator email" autoComplete="email" required />
          <input type="password" value={password} onChange={(event) => onPassword(event.target.value)} aria-label="Administrator password" autoComplete="current-password" placeholder="Password" required />
          <button type="submit" disabled={busy}>{busy ? "SIGNING IN" : "SIGN IN"}</button>
        </form>
        {message && <span className="sx-login-message" role="status">{message}</span>}
        <a href="/">← Return to portfolio</a>
      </section>
    </main>
  );
}

function LicenseCreator({ token, onCreated }) {
  const [kind, setKind] = useState("promo");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [note, setNote] = useState("");
  const [created, setCreated] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function createLicense(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    setCreated(null);
    try {
      const response = await fetch("/api/admin/licenses", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ kind, email: recipientEmail.trim() || null, note: note.trim() || null }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "License generation failed.");
      setCreated(body.license);
      setMessage("License generated and registered.");
      await onCreated();
    } catch (requestError) {
      setMessage(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="sx-license-creator">
      <div className="sx-section-heading"><div><small>GENERATOR</small><h2>Issue a license</h2></div><Gift size={18} /></div>
      <form onSubmit={createLicense}>
        <label>TYPE<select value={kind} onChange={(event) => setKind(event.target.value)}><option value="promo">Complimentary permanent</option><option value="permanent">Paid permanent</option></select></label>
        <label>RECIPIENT EMAIL <span>OPTIONAL</span><input type="email" value={recipientEmail} onChange={(event) => setRecipientEmail(event.target.value)} placeholder="client@example.com" /></label>
        <label>NOTE <span>OPTIONAL</span><textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={240} placeholder="Tester, replacement, payment reference…" /></label>
        <button type="submit" disabled={busy}><Plus size={14} /> {busy ? "GENERATING" : "GENERATE LICENSE"}</button>
      </form>
      {created ? <div className="sx-created-license"><code>{created.token}</code><CopyButton value={created.token} /></div> : null}
      {message && <p className="sx-generator-message" role="status">{message}</p>}
    </section>
  );
}

function LicenseRow({ license }) {
  const date = useMemo(() => new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(license.issued_at)), [license.issued_at]);
  return <article className="sx-license-row"><div><strong>{license.kind.toUpperCase()}</strong><span>{license.email || "No recipient"}</span></div><div><code>SX-{license.id.slice(-4).toUpperCase()}</code><span>{date}</span></div><CopyButton value={license.token} /></article>;
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }
  return <button type="button" onClick={() => void copy()} aria-label="Copy license code" title="Copy license code"><Copy size={13} />{copied ? <span>COPIED</span> : null}</button>;
}

function readSession() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    return stored?.access_token && stored?.refresh_token ? stored : null;
  } catch {
    return null;
  }
}

function normalizeSession(response) {
  return { access_token: response.access_token, refresh_token: response.refresh_token, expires_at: Date.now() + Number(response.expires_in || 3600) * 1000 };
}

function saveSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function refreshAdminSession(refreshToken, setSession, onFailure) {
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: supabasePublishableKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const body = await response.json();
    if (!response.ok || !body.access_token) throw new Error("Session refresh failed.");
    const nextSession = normalizeSession(body);
    saveSession(nextSession);
    setSession(nextSession);
  } catch {
    onFailure();
  }
}
