import * as React3 from 'react';
import { useState, useEffect } from 'react';
import { Headphones, Briefcase, FlaskConical, Radio, Dumbbell, Route, Sun, Moon, X, Menu, Search, Grid3x3, User, LogOut } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// src/SuiteHeader.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverContent = React3.forwardRef(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: "cn-suite-root",
    ...props,
    children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          // Portals mount on document.body — must carry cn-suite-root so scoped CSS applies
          "cn-suite-root cn-suite-popover-surface z-[100] rounded-3xl border border-border bg-card text-card-foreground shadow-2xl outline-none",
          className
        ),
        children
      }
    )
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
var Avatar = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuContent = React3.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: "cn-suite-root",
    ...props,
    children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          // Portals mount on document.body — must carry cn-suite-root so scoped CSS applies
          "cn-suite-root z-[100] min-w-[8rem] overflow-hidden rounded-2xl border border-border bg-card p-1 text-card-foreground shadow-xl",
          className
        ),
        children
      }
    )
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuLabel = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// src/sso.ts
var AUTH_STORAGE_KEY = "careernav_auth";
function getCareernavAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.token || null;
  } catch {
    return null;
  }
}
function withSso(href, token) {
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

// src/products.ts
var SUITE_PRODUCTS = [
  { id: "studio", name: "Studio", Icon: Headphones },
  { id: "jobs", name: "Pathfinder", Icon: Briefcase },
  { id: "lab", name: "Lab", Icon: FlaskConical },
  { id: "live", name: "Live", Icon: Radio },
  { id: "gym", name: "Gym", Icon: Dumbbell },
  { id: "my-paths", name: "My Paths", Icon: Route, studioPath: "/my-paths" }
];
function productDisplayName(id) {
  return SUITE_PRODUCTS.find((p) => p.id === id)?.name ?? id;
}
function resolveProductHref(product, urls, token) {
  let base;
  if (product.id === "studio") {
    base = urls.studio.replace(/\/$/, "") + "/";
  } else if (product.id === "lab") {
    base = urls.lab;
  } else if (product.id === "live") {
    base = urls.live;
  } else if (product.id === "gym") {
    base = urls.gym;
  } else if (product.id === "jobs") {
    base = urls.pathfinder?.replace(/\/$/, "") || "https://pathfinder.careernav.ai";
  } else if (product.studioPath) {
    base = urls.studio.replace(/\/$/, "") + product.studioPath;
  } else {
    base = urls.studio;
  }
  return withSso(base, token);
}
var DEFAULT_PORTFOLIO_URL = "https://www.careernav.ai/portfolio";
var ICONS = {
  discover: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 32 32", fill: "none", strokeWidth: "1.8", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("rect", { x: "6", y: "7", width: "20", height: "18", rx: "3" }),
    /* @__PURE__ */ jsx("path", { d: "M12 7V5.5h8V7M6 14h20M14 16h4" })
  ] }),
  practice: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 32 32", fill: "none", strokeWidth: "2", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M4 12v8M8 9v14M24 9v14M28 12v8M8 16h16" }) }),
  showcase: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 32 32", fill: "none", strokeWidth: "1.8", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("rect", { x: "6", y: "5", width: "20", height: "22", rx: "3" }),
    /* @__PURE__ */ jsx("path", { d: "M10 11h8M10 16h12M10 21h8M23 6l.7 2.1L26 9l-2.3.9L23 12l-.8-2.1L20 9l2.2-.9L23 6Z" })
  ] })
};
var APPS = [
  { key: "discover", suiteId: "jobs", kicker: "Pathfinder", verb: "Discover", description: "Find fresh roles and adjacent paths." },
  { key: "practice", suiteId: "gym", kicker: "Gym", verb: "Practice", description: "Rehearse interviews and build your story bank." },
  { key: "showcase", suiteId: null, kicker: "Portfolio", verb: "Showcase", description: "Turn your experience into a shareable page." }
];
function AppSwitcher({ productId, productUrls, getSsoToken, onNavigate }) {
  const token = getSsoToken?.() ?? null;
  const hrefFor = (suiteId) => {
    if (!suiteId) return withSso(productUrls.portfolio || DEFAULT_PORTFOLIO_URL, token);
    const product = SUITE_PRODUCTS.find((p) => p.id === suiteId);
    return product ? resolveProductHref(product, productUrls, token) : "#";
  };
  return /* @__PURE__ */ jsxs("div", { className: "cn-suite-switcher", children: [
    /* @__PURE__ */ jsx("h3", { className: "cn-suite-switcher__title", children: "CareerNav products" }),
    /* @__PURE__ */ jsx("div", { className: "cn-suite-switcher__grid", children: APPS.map((app) => {
      const isCurrent = app.suiteId === productId;
      return /* @__PURE__ */ jsxs(
        "a",
        {
          href: hrefFor(app.suiteId),
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: onNavigate,
          className: cn("cn-suite-tile", `cn-suite-tile--${app.key}`, isCurrent && "cn-suite-tile--current"),
          "aria-current": isCurrent ? "page" : void 0,
          children: [
            /* @__PURE__ */ jsx("span", { className: "cn-suite-tile__icon-wrap", children: ICONS[app.key] }),
            /* @__PURE__ */ jsx("span", { className: "cn-suite-tile__kicker", children: app.kicker }),
            /* @__PURE__ */ jsx("strong", { className: "cn-suite-tile__verb", children: app.verb }),
            /* @__PURE__ */ jsx("small", { className: "cn-suite-tile__desc", children: app.description })
          ]
        },
        app.key
      );
    }) })
  ] });
}
function ThemeToggle({ theme = "light", onToggle }) {
  if (!onToggle) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: "cn-suite-icon-btn",
      "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
    }
  );
}
function DefaultLink({
  to,
  className,
  children,
  onClick,
  ...rest
}) {
  return /* @__PURE__ */ jsx("a", { href: to, className, onClick, ...rest, children });
}
function DefaultNavLink({
  to,
  className,
  children,
  onClick,
  end: _end
}) {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const isActive = path === to || to !== "/" && path.startsWith(to + "/");
  const cls = typeof className === "function" ? className({ isActive }) : className;
  return /* @__PURE__ */ jsx("a", { href: to, className: cls, onClick, children });
}
var DEFAULT_VERIFY_HREF = "https://www.careernav.ai/verify";
var VERIFY_DISMISS_KEY = "cn-suite-verify-dismissed";
function readDismissed() {
  try {
    return sessionStorage.getItem(VERIFY_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}
function SuiteHeader({
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
  searchPlaceholder = "Search\u2026",
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
  className
}) {
  const Link = LinkComp || DefaultLink;
  const NavLink = NavLinkComp || DefaultNavLink;
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const tokenClass = colorTokens === "hsl" ? "cn-suite-hsl-tokens" : void 0;
  const brandAlt = "CareerNav";
  const authed = isAuthenticated ?? !!user;
  const [verifyDismissed, setVerifyDismissed] = useState(readDismissed);
  const showVerify = authed && user?.emailVerified === false && !verifyDismissed;
  const dismissVerify = () => {
    setVerifyDismissed(true);
    try {
      sessionStorage.setItem(VERIFY_DISMISS_KEY, "1");
    } catch {
    }
  };
  const brandMark = /* @__PURE__ */ jsx("span", { className: "cn-suite-brand-compass", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 32 32", fill: "none", children: [
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "12.2", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx("path", { d: "M20.9 10.5 18.1 18l-7 3 2.9-7.5 6.9-3Z", fill: "currentColor" }),
    /* @__PURE__ */ jsx("circle", { cx: "16", cy: "16", r: "1.2", fill: "#302e4e" })
  ] }) });
  const brandCrumb = /* @__PURE__ */ jsx("span", { className: "cn-suite-brand-word", children: "CareerNav" });
  const initials = (user?.name || user?.email || "U").split(/[\s@]/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
  useEffect(() => {
    if (!onSearchClick) return;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onSearchClick();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearchClick]);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  const navClass = ({ isActive }) => cn(
    "cn-suite-nav-link",
    isActive ? "cn-suite-nav-link--active" : "cn-suite-nav-link--idle"
  );
  const mobileNavClass = ({ isActive }) => cn(
    "cn-suite-nav-link cn-suite-nav-link--mobile",
    isActive ? "cn-suite-nav-link--active" : "cn-suite-nav-link--idle"
  );
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn(
        "cn-suite-root cn-suite-header",
        `cn-suite-header--${productId}`,
        tokenClass,
        className
      ),
      children: [
        showVerify ? /* @__PURE__ */ jsxs("div", { className: "cn-suite-verify mx-auto max-w-7xl mb-2 flex items-center justify-center gap-2 rounded-full px-3 py-1 text-xs", role: "status", children: [
          /* @__PURE__ */ jsx("span", { children: "Verify your account to unlock referral rewards." }),
          /* @__PURE__ */ jsx("a", { href: withSso(verifyHref, getSsoToken?.()), className: "cn-suite-verify-link font-semibold underline underline-offset-2", children: "Verify now" }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "cn-suite-verify-close ml-1 rounded-full p-0.5", "aria-label": "Hide for now", onClick: dismissVerify, children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "cn-suite-bar", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            navItems.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "lg:hidden -ml-1 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
                  "aria-label": "Open menu",
                  onClick: () => setMobileNavOpen(true),
                  children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
                }
              ),
              mobileNavOpen ? /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[90] lg:hidden", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute inset-0 bg-black/40",
                    "aria-label": "Close menu",
                    onClick: () => setMobileNavOpen(false)
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 shadow-xl", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      brandMark,
                      brandCrumb
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setMobileNavOpen(false),
                        className: "p-2 rounded-full hover:bg-muted",
                        "aria-label": "Close",
                        children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => /* @__PURE__ */ jsx(
                    NavLink,
                    {
                      to: item.to,
                      end: item.end,
                      onClick: () => setMobileNavOpen(false),
                      className: mobileNavClass,
                      children: item.label
                    },
                    item.to
                  )) })
                ] })
              ] }) : null
            ] }) : null,
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: homeHref,
                className: "cn-suite-brand flex items-center space-x-3 group min-w-0",
                "aria-label": brandAlt,
                children: [
                  brandMark,
                  brandCrumb
                ]
              }
            )
          ] }),
          navItems.length > 0 ? /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-1 ml-4", children: navItems.map((item) => /* @__PURE__ */ jsx(
            NavLink,
            {
              to: item.to,
              end: item.end,
              className: navClass,
              children: item.label
            },
            item.to
          )) }) : null,
          onSearchClick ? /* @__PURE__ */ jsx("div", { className: "hidden md:block flex-1 max-w-md px-8", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: onSearchClick,
              className: "group w-full flex items-center gap-2 bg-muted hover:bg-muted/70 rounded-full py-2 pl-3 pr-2 text-sm transition-colors outline-none focus:ring-2 focus:ring-primary/30",
              "aria-label": "Open search",
              children: [
                /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsx("span", { className: "flex-1 text-left text-muted-foreground truncate", children: searchPlaceholder }),
                /* @__PURE__ */ jsxs("kbd", { className: "hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground", children: [
                  isMac ? "\u2318" : "Ctrl",
                  "K"
                ] })
              ]
            }
          ) }) : /* @__PURE__ */ jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1 md:space-x-2 shrink-0", children: [
            onSearchClick ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onSearchClick,
                className: "md:hidden p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
                "aria-label": "Search",
                children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
              }
            ) : null,
            showThemeToggle ? /* @__PURE__ */ jsx(ThemeToggle, { theme, onToggle: onThemeToggle }) : null,
            /* @__PURE__ */ jsxs(Popover, { open: switcherOpen, onOpenChange: setSwitcherOpen, children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "cn-suite-icon-btn",
                  "aria-label": "Open app switcher",
                  children: /* @__PURE__ */ jsx(Grid3x3, { className: "w-5 h-5" })
                }
              ) }),
              /* @__PURE__ */ jsx(
                PopoverContent,
                {
                  align: "end",
                  sideOffset: 10,
                  className: cn(
                    "p-0 w-auto rounded-3xl shadow-2xl border border-border",
                    tokenClass
                  ),
                  children: /* @__PURE__ */ jsx(
                    AppSwitcher,
                    {
                      productId,
                      productUrls,
                      getSsoToken,
                      onNavigate: () => setSwitcherOpen(false),
                      onLogout,
                      accountSettingsHref,
                      accountLabel
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "cn-suite-avatar-btn",
                  "aria-label": "Account menu",
                  children: /* @__PURE__ */ jsxs(Avatar, { className: "cn-suite-avatar", children: [
                    /* @__PURE__ */ jsx(
                      AvatarImage,
                      {
                        src: user?.avatarUrl || void 0,
                        alt: user?.name || "User"
                      }
                    ),
                    /* @__PURE__ */ jsx(AvatarFallback, { className: "cn-suite-avatar-fallback", children: initials || "U" })
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsx(
                DropdownMenuContent,
                {
                  align: "end",
                  sideOffset: 10,
                  className: cn(
                    "cn-suite-popover-surface w-56 rounded-2xl shadow-xl border border-border p-2",
                    tokenClass
                  ),
                  children: authed ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs(DropdownMenuLabel, { className: "px-2 py-1.5", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground truncate", children: user?.name || "User" }),
                      user?.email ? /* @__PURE__ */ jsx("div", { className: "text-xs font-normal text-muted-foreground truncate", children: user.email }) : null
                    ] }),
                    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                    accountSettingsHref ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxs(
                        "a",
                        {
                          href: accountSettingsHref,
                          className: "flex items-center gap-2 rounded-lg cursor-pointer",
                          children: [
                            /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
                            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground/80", children: accountLabel || "Account" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsx(DropdownMenuSeparator, {})
                    ] }) : null,
                    onLogout ? /* @__PURE__ */ jsxs(
                      DropdownMenuItem,
                      {
                        onSelect: (event) => {
                          event.preventDefault();
                          onLogout();
                        },
                        className: "flex items-center gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive",
                        children: [
                          /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Log out" })
                        ]
                      }
                    ) : null
                  ] }) : /* @__PURE__ */ jsxs(
                    DropdownMenuItem,
                    {
                      onSelect: (e) => {
                        e.preventDefault();
                        if (onLoginClick) onLoginClick();
                        else if (loginHref) window.location.href = loginHref;
                      },
                      className: "flex items-center gap-2 rounded-lg cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-muted-foreground" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground/80", children: "Log in" })
                      ]
                    }
                  )
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}

export { AUTH_STORAGE_KEY, AppSwitcher, SUITE_PRODUCTS, SuiteHeader, ThemeToggle, getCareernavAuthToken, productDisplayName, resolveProductHref, withSso };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map