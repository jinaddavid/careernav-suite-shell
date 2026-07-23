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
import { productDisplayName } from "./products";
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

export function SuiteHeader({
  productId,
  productName,
  productInitial,
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
  accountLabel,
  loginHref = "/login",
  homeHref = "/",
  showThemeToggle = true,
  theme,
  onThemeToggle,
  className,
}: SuiteHeaderProps) {
  const Link = (LinkComp || DefaultLink) as SuiteLinkComponent;
  const NavLink = (NavLinkComp || DefaultNavLink) as SuiteNavLinkComponent;
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const name = productName ?? productDisplayName(productId);
  const mark = (productInitial ?? name.charAt(0) ?? "C").toUpperCase();
  const authed = isAuthenticated ?? !!user;

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
      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted",
    );

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted",
    );

  return (
    <header
      className={cn(
        "cn-suite-root cn-suite-header sticky top-0 z-50 w-full px-3 md:px-6 pt-3",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-3 md:px-6 bg-card text-card-foreground border border-border rounded-2xl shadow-sm">
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
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-primary text-primary-foreground">
                          {mark}
                        </div>
                        <span className="font-bold text-primary">{name}</span>
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

          <Link to={homeHref} className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm bg-primary text-primary-foreground">
              {mark}
            </div>
            <nav className="flex items-center text-sm font-semibold tracking-tight">
              <span className="hidden sm:inline text-muted-foreground">Suite</span>
              <span className="mx-2 hidden sm:inline text-border">/</span>
              <span className="font-bold text-primary">{name}</span>
            </nav>
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
                className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors data-[state=open]:bg-muted"
                aria-label="Open app switcher"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className="p-0 w-auto rounded-3xl shadow-2xl border border-border"
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
                className="relative ml-1 overflow-hidden rounded-full ring-2 ring-card shadow-sm focus:outline-none"
                aria-label="Account menu"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.avatarUrl || undefined}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                    {initials || "U"}
                  </AvatarFallback>
                </Avatar>
                {authed ? (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-card bg-primary" />
                ) : null}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-56 rounded-2xl shadow-xl border border-border p-2"
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
