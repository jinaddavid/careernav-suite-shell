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
    <div className="w-80 p-6">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-xs font-bold text-muted-foreground/70 uppercase tracking-widest">
          Product Suite
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-y-6 gap-x-4">
        {SUITE_PRODUCTS.map((p) => {
          const isCurrent = p.id === productId;
          const Icon = p.Icon;
          const href = resolveProductHref(p, productUrls, token);
          return (
            <a
              key={p.id}
              href={href}
              onClick={onNavigate}
              className="flex flex-col items-center group cursor-pointer outline-none"
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all",
                  isCurrent
                    ? cn(p.activeBg, "ring-2", p.ringColor, "shadow-md")
                    : cn("bg-muted", p.hoverBg),
                )}
              >
                <Icon className={cn("w-7 h-7", p.iconColor)} strokeWidth={2} />
              </div>
              <span
                className={cn(
                  "text-[11px] transition-colors",
                  isCurrent
                    ? "font-bold text-foreground"
                    : "font-medium text-muted-foreground group-hover:text-foreground",
                )}
              >
                {p.name}
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-border flex flex-col space-y-1">
        {accountSettingsHref ? (
          <a
            href={accountSettingsHref}
            onClick={onNavigate}
            className="flex items-center space-x-3 px-2 py-2 hover:bg-muted rounded-xl transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-card group-hover:shadow-sm transition-all">
              <Settings className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {accountLabel}
            </span>
          </a>
        ) : null}
        {onLogout ? (
          <button
            type="button"
            onClick={() => {
              onLogout();
              onNavigate?.();
            }}
            className="flex items-center space-x-3 px-2 py-2 hover:bg-muted rounded-xl transition-colors group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-rose-500 group-hover:bg-card group-hover:shadow-sm transition-all">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-rose-500">Sign Out</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
