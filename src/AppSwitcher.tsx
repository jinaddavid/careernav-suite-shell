import { Settings, LogOut } from "lucide-react";
import { SUITE_PRODUCTS, resolveProductHref } from "./products";
import { cn } from "./cn";
import type { SuiteProductId, SuiteProductUrls } from "./types";

type Props = {
  productId: SuiteProductId;
  productUrls: SuiteProductUrls;
  getSsoToken?: () => string | null | undefined;
  onNavigate?: () => void;
  onLogout?: () => void;
  accountSettingsHref?: string;
  accountLabel?: string;
};

export function AppSwitcher({
  productId,
  productUrls,
  getSsoToken,
  onNavigate,
  onLogout,
  accountSettingsHref,
  accountLabel = "Account Settings",
}: Props) {
  const token = getSsoToken?.() ?? null;

  return (
    <div className="cn-suite-switcher">
      <div className="cn-suite-switcher__head">
        <h3 className="cn-suite-switcher__title">Product Suite</h3>
      </div>

      <div className="cn-suite-switcher__grid">
        {SUITE_PRODUCTS.map((p) => {
          const isCurrent = p.id === productId;
          const Icon = p.Icon;
          const href = resolveProductHref(p, productUrls, token);
          return (
            <a
              key={p.id}
              href={href}
              onClick={onNavigate}
              className={cn(
                "cn-suite-tile",
                `cn-suite-tile--${p.id}`,
                isCurrent && "cn-suite-tile--current",
              )}
              aria-current={isCurrent ? "page" : undefined}
            >
              <div className="cn-suite-tile__icon-wrap">
                <Icon className="cn-suite-tile__icon" strokeWidth={2} aria-hidden />
              </div>
              <span className="cn-suite-tile__label">{p.name}</span>
            </a>
          );
        })}
      </div>

      <div className="cn-suite-switcher__footer">
        {accountSettingsHref ? (
          <a
            href={accountSettingsHref}
            onClick={onNavigate}
            className="cn-suite-switcher__action"
          >
            <span className="cn-suite-switcher__action-icon">
              <Settings className="cn-suite-switcher__action-svg" aria-hidden />
            </span>
            <span className="cn-suite-switcher__action-label">{accountLabel}</span>
          </a>
        ) : null}
        {onLogout ? (
          <button
            type="button"
            onClick={() => {
              onLogout();
              onNavigate?.();
            }}
            className="cn-suite-switcher__action cn-suite-switcher__action--danger"
          >
            <span className="cn-suite-switcher__action-icon">
              <LogOut className="cn-suite-switcher__action-svg" aria-hidden />
            </span>
            <span className="cn-suite-switcher__action-label">Sign Out</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
