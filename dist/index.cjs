'use strict';

var React3 = require('react');
var lucideReact = require('lucide-react');
var PopoverPrimitive = require('@radix-ui/react-popover');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var AvatarPrimitive = require('@radix-ui/react-avatar');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React3__namespace = /*#__PURE__*/_interopNamespace(React3);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespace(AvatarPrimitive);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);

// src/SuiteHeader.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var Popover = PopoverPrimitive__namespace.Root;
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverContent = React3__namespace.forwardRef(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  PopoverPrimitive__namespace.Content,
  {
    ref,
    align,
    sideOffset,
    className: "cn-suite-root",
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: cn(
          // Portals mount on document.body — must carry cn-suite-root so scoped CSS applies
          "cn-suite-root z-[100] rounded-3xl border border-border bg-card text-card-foreground shadow-2xl outline-none",
          className
        ),
        children
      }
    )
  }
) }));
PopoverContent.displayName = PopoverPrimitive__namespace.Content.displayName;
var Avatar = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Root,
  {
    ref,
    className: cn(
      "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive__namespace.Root.displayName;
var AvatarImage = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive__namespace.Image.displayName;
var AvatarFallback = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  AvatarPrimitive__namespace.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive__namespace.Fallback.displayName;
var DropdownMenu = DropdownMenuPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
var DropdownMenuContent = React3__namespace.forwardRef(({ className, sideOffset = 4, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Content,
  {
    ref,
    sideOffset,
    className: "cn-suite-root",
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(
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
DropdownMenuContent.displayName = DropdownMenuPrimitive__namespace.Content.displayName;
var DropdownMenuItem = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive__namespace.Item.displayName;
var DropdownMenuLabel = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive__namespace.Label.displayName;
var DropdownMenuSeparator = React3__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive__namespace.Separator.displayName;

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
  { id: "studio", name: "Studio", Icon: lucideReact.Headphones },
  { id: "jobs", name: "Jobs", Icon: lucideReact.Briefcase, studioPath: "/jobs" },
  { id: "lab", name: "Lab", Icon: lucideReact.FlaskConical },
  { id: "live", name: "Live", Icon: lucideReact.Radio },
  { id: "gym", name: "Gym", Icon: lucideReact.Dumbbell },
  { id: "my-paths", name: "My Paths", Icon: lucideReact.Route, studioPath: "/my-paths" }
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
  } else if (product.studioPath) {
    base = urls.studio.replace(/\/$/, "") + product.studioPath;
  } else {
    base = urls.studio;
  }
  return withSso(base, token);
}
function AppSwitcher({
  productId,
  productUrls,
  getSsoToken,
  onNavigate,
  onLogout,
  accountSettingsHref,
  accountLabel = "Account Settings"
}) {
  const token = getSsoToken?.() ?? null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "cn-suite-switcher", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cn-suite-switcher__head", children: /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "cn-suite-switcher__title", children: "Product Suite" }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cn-suite-switcher__grid", children: SUITE_PRODUCTS.map((p) => {
      const isCurrent = p.id === productId;
      const Icon = p.Icon;
      const href = resolveProductHref(p, productUrls, token);
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "a",
        {
          href,
          onClick: onNavigate,
          className: cn(
            "cn-suite-tile",
            `cn-suite-tile--${p.id}`,
            isCurrent && "cn-suite-tile--current"
          ),
          "aria-current": isCurrent ? "page" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cn-suite-tile__icon-wrap", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "cn-suite-tile__icon", strokeWidth: 2, "aria-hidden": true }) }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-tile__label", children: p.name })
          ]
        },
        p.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "cn-suite-switcher__footer", children: [
      accountSettingsHref ? /* @__PURE__ */ jsxRuntime.jsxs(
        "a",
        {
          href: accountSettingsHref,
          onClick: onNavigate,
          className: "cn-suite-switcher__action",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-switcher__action-icon", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Settings, { className: "cn-suite-switcher__action-svg", "aria-hidden": true }) }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-switcher__action-label", children: accountLabel })
          ]
        }
      ) : null,
      onLogout ? /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onLogout();
            onNavigate?.();
          },
          className: "cn-suite-switcher__action cn-suite-switcher__action--danger",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-switcher__action-icon", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, { className: "cn-suite-switcher__action-svg", "aria-hidden": true }) }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-switcher__action-label", children: "Sign Out" })
          ]
        }
      ) : null
    ] })
  ] });
}
function ThemeToggle({ theme = "light", onToggle }) {
  if (!onToggle) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
      "aria-label": theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Moon, { className: "w-5 h-5" })
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
  return /* @__PURE__ */ jsxRuntime.jsx("a", { href: to, className, onClick, ...rest, children });
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
  return /* @__PURE__ */ jsxRuntime.jsx("a", { href: to, className: cls, onClick, children });
}
function SuiteHeader({
  productId,
  productName,
  productInitial,
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
  accountLabel,
  loginHref = "/login",
  homeHref = "/",
  showThemeToggle = true,
  theme,
  onThemeToggle,
  className
}) {
  const Link = LinkComp || DefaultLink;
  const NavLink = NavLinkComp || DefaultNavLink;
  const [switcherOpen, setSwitcherOpen] = React3.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React3.useState(false);
  const name = productName ?? productDisplayName(productId);
  const mark = (productInitial ?? name.charAt(0) ?? "C").toUpperCase();
  const authed = isAuthenticated ?? !!user;
  const initials = (user?.name || user?.email || "U").split(/[\s@]/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
  React3.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    "header",
    {
      className: cn(
        "cn-suite-root cn-suite-header sticky top-0 z-50 w-full px-3 md:px-6 pt-3",
        `cn-suite-header--${productId}`,
        className
      ),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mx-auto max-w-7xl flex items-center justify-between h-16 px-3 md:px-6 bg-card text-card-foreground border border-border rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
          navItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "lg:hidden -ml-1 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
                "aria-label": "Open menu",
                onClick: () => setMobileNavOpen(true),
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Menu, { className: "w-5 h-5" })
              }
            ),
            mobileNavOpen ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "fixed inset-0 z-[90] lg:hidden", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute inset-0 bg-black/40",
                  "aria-label": "Close menu",
                  onClick: () => setMobileNavOpen(false)
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 shadow-xl", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cn-suite-brand-mark", children: mark }),
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-brand-name", children: name })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setMobileNavOpen(false),
                      className: "p-2 rounded-full hover:bg-muted",
                      "aria-label": "Close",
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs(Link, { to: homeHref, className: "cn-suite-brand flex items-center space-x-3 group", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "cn-suite-brand-mark", children: mark }),
            /* @__PURE__ */ jsxRuntime.jsxs("nav", { className: "cn-suite-brand-crumb flex items-center text-sm font-semibold tracking-tight", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-brand-suite hidden sm:inline", children: "Suite" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-brand-sep mx-2 hidden sm:inline", children: "/" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "cn-suite-brand-name", children: name })
            ] })
          ] })
        ] }),
        navItems.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "hidden lg:flex items-center gap-1 ml-4", children: navItems.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
          NavLink,
          {
            to: item.to,
            end: item.end,
            className: navClass,
            children: item.label
          },
          item.to
        )) }) : null,
        onSearchClick ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "hidden md:block flex-1 max-w-md px-8", children: /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            onClick: onSearchClick,
            className: "group w-full flex items-center gap-2 bg-muted hover:bg-muted/70 rounded-full py-2 pl-3 pr-2 text-sm transition-colors outline-none focus:ring-2 focus:ring-primary/30",
            "aria-label": "Open search",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1 text-left text-muted-foreground truncate", children: searchPlaceholder }),
              /* @__PURE__ */ jsxRuntime.jsxs("kbd", { className: "hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-medium text-muted-foreground", children: [
                isMac ? "\u2318" : "Ctrl",
                "K"
              ] })
            ]
          }
        ) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-1 md:space-x-2 shrink-0", children: [
          onSearchClick ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: onSearchClick,
              className: "md:hidden p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors",
              "aria-label": "Search",
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "w-5 h-5" })
            }
          ) : null,
          showThemeToggle ? /* @__PURE__ */ jsxRuntime.jsx(ThemeToggle, { theme, onToggle: onThemeToggle }) : null,
          /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open: switcherOpen, onOpenChange: setSwitcherOpen, children: [
            /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors data-[state=open]:bg-muted",
                "aria-label": "Open app switcher",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Grid3x3, { className: "w-5 h-5" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              PopoverContent,
              {
                align: "end",
                sideOffset: 10,
                className: "p-0 w-auto rounded-3xl shadow-2xl border border-border",
                children: /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                className: "relative ml-1 overflow-hidden rounded-full ring-2 ring-card shadow-sm focus:outline-none",
                "aria-label": "Account menu",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(Avatar, { className: "w-8 h-8", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      AvatarImage,
                      {
                        src: user?.avatarUrl || void 0,
                        alt: user?.name || "User"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(AvatarFallback, { className: "text-xs font-semibold bg-primary text-primary-foreground", children: initials || "U" })
                  ] }),
                  authed ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-card bg-primary" }) : null
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              DropdownMenuContent,
              {
                align: "end",
                sideOffset: 10,
                className: "w-56 rounded-2xl shadow-xl border border-border p-2",
                children: authed ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenuLabel, { className: "px-2 py-1.5", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm font-semibold text-foreground truncate", children: user?.name || "User" }),
                    user?.email ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs font-normal text-muted-foreground truncate", children: user.email }) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuSeparator, {}),
                  accountSettingsHref ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
                      "a",
                      {
                        href: accountSettingsHref,
                        className: "flex items-center gap-2 rounded-lg cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.User, { className: "w-4 h-4 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-foreground/80", children: accountLabel || "Account" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuSeparator, {})
                  ] }) : null,
                  onLogout ? /* @__PURE__ */ jsxRuntime.jsxs(
                    DropdownMenuItem,
                    {
                      onSelect: (event) => {
                        event.preventDefault();
                        onLogout();
                      },
                      className: "flex items-center gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive",
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: "Log out" })
                      ]
                    }
                  ) : null
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs(
                  DropdownMenuItem,
                  {
                    onSelect: (e) => {
                      e.preventDefault();
                      if (onLoginClick) onLoginClick();
                      else if (loginHref) window.location.href = loginHref;
                    },
                    className: "flex items-center gap-2 rounded-lg cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.User, { className: "w-4 h-4 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm text-foreground/80", children: "Log in" })
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}

exports.AUTH_STORAGE_KEY = AUTH_STORAGE_KEY;
exports.AppSwitcher = AppSwitcher;
exports.SUITE_PRODUCTS = SUITE_PRODUCTS;
exports.SuiteHeader = SuiteHeader;
exports.ThemeToggle = ThemeToggle;
exports.getCareernavAuthToken = getCareernavAuthToken;
exports.productDisplayName = productDisplayName;
exports.resolveProductHref = resolveProductHref;
exports.withSso = withSso;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map