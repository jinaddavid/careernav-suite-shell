import type { ReactNode } from "react";
import { resolveProductHref, SUITE_PRODUCTS } from "./products";
import { withSso } from "./sso";
import { cn } from "./cn";
import type { SuiteProductId, SuiteProductUrls } from "./types";

type Props = {
  productId: SuiteProductId;
  productUrls: SuiteProductUrls;
  getSsoToken?: () => string | null | undefined;
  onNavigate?: () => void;
  /** Accepted for compatibility; sign out and account now live in the avatar menu. */
  onLogout?: () => void;
  accountSettingsHref?: string;
  accountLabel?: string;
};

const DEFAULT_PORTFOLIO_URL = "https://www.careernav.ai/portfolio";

const ICONS: Record<string, ReactNode> = {
  discover: (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.8" aria-hidden="true">
      <rect x="6" y="7" width="20" height="18" rx="3" />
      <path d="M12 7V5.5h8V7M6 14h20M14 16h4" />
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="2" aria-hidden="true">
      <path d="M4 12v8M8 9v14M24 9v14M28 12v8M8 16h16" />
    </svg>
  ),
  showcase: (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.8" aria-hidden="true">
      <rect x="6" y="5" width="20" height="22" rx="3" />
      <path d="M10 11h8M10 16h12M10 21h8M23 6l.7 2.1L26 9l-2.3.9L23 12l-.8-2.1L20 9l2.2-.9L23 6Z" />
    </svg>
  ),
};

/** The three apps in the PM design: what each one is called, and what it does. */
const APPS = [
  { key: "discover", suiteId: "jobs", kicker: "Pathfinder", verb: "Discover", description: "Find fresh roles and adjacent paths." },
  { key: "practice", suiteId: "gym", kicker: "Gym", verb: "Practice", description: "Rehearse interviews and build your story bank." },
  { key: "showcase", suiteId: null, kicker: "Portfolio", verb: "Showcase", description: "Turn your experience into a shareable page." },
] as const;

export function AppSwitcher({ productId, productUrls, getSsoToken, onNavigate }: Props) {
  const token = getSsoToken?.() ?? null;

  const hrefFor = (suiteId: string | null) => {
    if (!suiteId) return withSso(productUrls.portfolio || DEFAULT_PORTFOLIO_URL, token);
    const product = SUITE_PRODUCTS.find((p) => p.id === suiteId);
    return product ? resolveProductHref(product, productUrls, token) : "#";
  };

  return (
    <div className="cn-suite-switcher">
      <h3 className="cn-suite-switcher__title">CareerNav products</h3>
      <div className="cn-suite-switcher__grid">
        {APPS.map((app) => {
          const isCurrent = app.suiteId === productId;
          return (
            <a
              key={app.key}
              href={hrefFor(app.suiteId)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className={cn("cn-suite-tile", `cn-suite-tile--${app.key}`, isCurrent && "cn-suite-tile--current")}
              aria-current={isCurrent ? "page" : undefined}
            >
              <span className="cn-suite-tile__icon-wrap">{ICONS[app.key]}</span>
              <span className="cn-suite-tile__kicker">{app.kicker}</span>
              <strong className="cn-suite-tile__verb">{app.verb}</strong>
              <small className="cn-suite-tile__desc">{app.description}</small>
            </a>
          );
        })}
      </div>
    </div>
  );
}
