import { useEffect, useState, type ReactNode } from "react";
import { Search, Grid3x3, Menu, User as UserIcon, LogOut, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { AppSwitcher } from "./AppSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { withSso } from "./sso";
import { cn } from "./cn";
import type {
  SuiteHeaderProps,
  SuiteLinkComponent,
  SuiteNavLinkComponent,
} from "./types";

function DefaultLink({
  to,
  className,
  children,
  onClick,
  ...rest
}: {
  to: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <a href={to} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

function DefaultNavLink({
  to,
  className,
  children,
  onClick,
  end: _end,
}: {
  to: string;
  end?: boolean;
  className?: string | ((s: { isActive: boolean }) => string);
  children?: ReactNode;
  onClick?: () => void;
}) {
  const path =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isActive =
    path === to || (to !== "/" && path.startsWith(to + "/"));
  const cls =
    typeof className === "function" ? className({ isActive }) : className;
  return (
    <a href={to} className={cls} onClick={onClick}>
      {children}
    </a>
  );
}

const DEFAULT_VERIFY_HREF = "https://www.careernav.ai/verify";
const VERIFY_DISMISS_KEY = "cn-suite-verify-dismissed";

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(VERIFY_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function SuiteHeader({
  productId,
  productName: _productName,
  productInitial: _productInitial,
  logoSrc: _logoSrc,
  logoAlt: _logoAlt,
  navItems = [],
  user,
  isAuthenticated,
  onLogout,
  onLoginClick,
  onSearchClick,
  searchPlaceholder = "Search…",
  Link: LinkComp,
  NavLink: NavLinkComp,
  productUrls,
  getSsoToken,
  accountSettingsHref,
  verifyHref = DEFAULT_VERIFY_HREF,
  accountLabel,
  loginHref = "/login",
  homeHref = "/",
  showThemeToggle = true,
  colorTokens = "hsl",
  theme,
  onThemeToggle,
  className,
}: SuiteHeaderProps) {
  const Link = (LinkComp || DefaultLink) as SuiteLinkComponent;
  const NavLink = (NavLinkComp || DefaultNavLink) as SuiteNavLinkComponent;
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const tokenClass = colorTokens === "hsl" ? "cn-suite-hsl-tokens" : undefined;
  const brandAlt = "CareerNav";
  const authed = isAuthenticated ?? !!user;
  const [verifyDismissed, setVerifyDismissed] = useState(readDismissed);
  const showVerify = authed && user?.emailVerified === false && !verifyDismissed;
  const dismissVerify = () => {
    setVerifyDismissed(true);
    try {
      sessionStorage.setItem(VERIFY_DISMISS_KEY, "1");
    } catch {
      /* private mode: it just comes back next visit */
    }
  };

  // PM design: the compass mark and the word CareerNav, the same in every app.
  const brandMark = (
    <span className="cn-suite-brand-compass" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20.9 10.5 18.1 18l-7 3 2.9-7.5 6.9-3Z" fill="currentColor" />
        <circle cx="16" cy="16" r="1.2" fill="#302e4e" />
      </svg>
    </span>
  );
  const brandCrumb = <span className="cn-suite-brand-word">CareerNav</span>;

  const initials = (user?.name || user?.email || "U")
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    if (!onSearchClick) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearchClick();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearchClick]);

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "cn-suite-nav-link",
      isActive ? "cn-suite-nav-link--active" : "cn-suite-nav-link--idle",
    );

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "cn-suite-nav-link cn-suite-nav-link--mobile",
      isActive ? "cn-suite-nav-link--active" : "cn-suite-nav-link--idle",
    );

  return (
    <header
      className={cn(
        "cn-suite-root cn-suite-header",
        `cn-suite-header--${productId}`,
        tokenClass,
        className,
      )}
    >
      {showVerify ? (
        <div className="cn-suite-verify mx-auto max-w-7xl mb-2 flex items-center justify-center gap-2 rounded-full px-3 py-1 text-xs" role="status">
          <span>Verify your account to unlock referral rewards.</span>
          <a href={withSso(verifyHref, getSsoToken?.())} className="cn-suite-verify-link font-semibold underline underline-offset-2">
            Verify now
          </a>
          <button type="button" className="cn-suite-verify-close ml-1 rounded-full p-0.5" aria-label="Hide for now" onClick={dismissVerify}>
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : null}
      <div className="cn-suite-bar">
        <div className="flex items-center gap-1.5 shrink-0">
          {navItems.length > 0 ? (
            <>
              <button
                type="button"
                className="lg:hidden -ml-1 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              {mobileNavOpen ? (
                <div className="fixed inset-0 z-[90] lg:hidden">
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/40"
                    aria-label="Close menu"
                    onClick={() => setMobileNavOpen(false)}
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3 min-w-0">
                        {brandMark}
                        {brandCrumb}
                      </div>
                      <button
                        type="button"
                        onClick={() => setMobileNavOpen(false)}
                        className="p-2 rounded-full hover:bg-muted"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                      {navItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          end={item.end}
                          onClick={() => setMobileNavOpen(false)}
                          className={mobileNavClass}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          <Link
            to={homeHref}
            className="cn-suite-brand flex items-center space-x-3 group min-w-0"
            aria-label={brandAlt}
          >
            {brandMark}
            {brandCrumb}
          </Link>
        </div>

        {navItems.length > 0 ? (
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}

        {onSearchClick ? (
          <div className="hidden md:block flex-1 max-w-md px-8">
            <button
              type="button"
              onClick={onSearchClick}
              className="group w-full flex items-center gap-2 bg-muted hover:bg-muted/70 rounded-full py-2 pl-3 pr-2 text-sm transition-colors outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Open search"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 text-left text-muted-foreground truncate">
                {searchPlaceholder}
              </span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground">
                {isMac ? "⌘" : "Ctrl"}K
              </kbd>
            </button>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center space-x-1 md:space-x-2 shrink-0">
          {onSearchClick ? (
            <button
              type="button"
              onClick={onSearchClick}
              className="md:hidden p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          ) : null}

          {showThemeToggle ? (
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          ) : null}

          <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="cn-suite-icon-btn"
                aria-label="Open app switcher"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className={cn(
                "p-0 w-auto rounded-3xl shadow-2xl border border-border",
                tokenClass,
              )}
            >
              <AppSwitcher
                productId={productId}
                productUrls={productUrls}
                getSsoToken={getSsoToken}
                onNavigate={() => setSwitcherOpen(false)}
                onLogout={onLogout}
                accountSettingsHref={accountSettingsHref}
                accountLabel={accountLabel}
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="cn-suite-avatar-btn"
                aria-label="Account menu"
              >
                <Avatar className="cn-suite-avatar">
                  <AvatarImage
                    src={user?.avatarUrl || undefined}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="cn-suite-avatar-fallback">
                    {initials || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className={cn(
                "cn-suite-popover-surface w-56 rounded-2xl shadow-xl border border-border p-2",
                tokenClass,
              )}
            >
              {authed ? (
                <>
                  <DropdownMenuLabel className="px-2 py-1.5">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {user?.name || "User"}
                    </div>
                    {user?.email ? (
                      <div className="text-xs font-normal text-muted-foreground truncate">
                        {user.email}
                      </div>
                    ) : null}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {accountSettingsHref ? (
                    <>
                      <DropdownMenuItem asChild>
                        <a
                          href={accountSettingsHref}
                          className="flex items-center gap-2 rounded-lg cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground/80">
                            {accountLabel || "Account"}
                          </span>
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  ) : null}
                  {onLogout ? (
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        onLogout();
                      }}
                      className="flex items-center gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Log out</span>
                    </DropdownMenuItem>
                  ) : null}
                </>
              ) : (
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    if (onLoginClick) onLoginClick();
                    else if (loginHref) window.location.href = loginHref;
                  }}
                  className="flex items-center gap-2 rounded-lg cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground/80">Log in</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
