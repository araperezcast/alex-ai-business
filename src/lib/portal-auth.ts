export type PortalRole = "joffroy" | "alex" | "chapman";

export const SESSION_KEY = "joffroy-portal-session";

export const UNIVERSAL_PASSWORD = "123000";

const ACCOUNTS: { email: string; password: string; role: PortalRole; name: string }[] = [
  {
    email: "operaciones@joffroy.com",
    password: UNIVERSAL_PASSWORD,
    role: "joffroy",
    name: "Grupo Joffroy · Operations",
  },
  {
    email: "desk@alexai.cloud",
    password: UNIVERSAL_PASSWORD,
    role: "alex",
    name: "Alex AI · Underwriting Desk",
  },
  {
    email: "producer@chapman.com",
    password: UNIVERSAL_PASSWORD,
    role: "chapman",
    name: "Chapman · Producer",
  },
];

const ALLOWED_DOMAINS = ["joffroy.com", "joffroy.com.mx", "alexai.cloud", "chapman.com"];

export type Session = { email: string; role: PortalRole; name: string };

export function authenticate(email: string, password: string): Session | null {
  const clean = email.trim().toLowerCase();
  const domain = clean.split("@")[1] ?? "";
  if (!ALLOWED_DOMAINS.includes(domain)) return null;
  const match = ACCOUNTS.find((a) => a.email === clean && a.password === password);
  if (!match) return null;
  return { email: match.email, role: match.role, name: match.name };
}

export function saveSession(s: Session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

export function loadSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
