const AUTH_STORAGE_KEY = "careernav_auth";

/** Read JWT from careernav_auth localStorage blob. */
export function getCareernavAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { token?: string };
    return parsed.token || null;
  } catch {
    return null;
  }
}

/**
 * Append ?sso=token when navigating to a different origin.
 * Same-origin URLs are returned unchanged.
 */
export function withSso(
  href: string,
  token?: string | null,
): string {
  if (!href) return href;
  const t = token ?? getCareernavAuthToken();
  if (!t) return href;

  try {
    const url = new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    if (typeof window !== "undefined" && url.origin === window.location.origin) {
      return href.startsWith("http") ? url.pathname + url.search + url.hash : href;
    }
    url.searchParams.set("sso", t);
    return url.toString();
  } catch {
    const join = href.includes("?") ? "&" : "?";
    return `${href}${join}sso=${encodeURIComponent(t)}`;
  }
}

export { AUTH_STORAGE_KEY };
