# @careernav/suite-shell

Shared CareerNav suite chrome: pill header, Product Suite waffle, SSO URL helper.

## CSS isolation (no host conflicts)

The package ships **its own** stylesheet (`@careernav/suite-shell/styles.css`):

- **No Tailwind Preflight** — does not reset the host page
- Utilities are compiled with `important: '.cn-suite-root'` — they only apply inside suite chrome
- Colors use `--cn-*` tokens bridged from the host (see below)
- Host apps **do not** need to scan this package in their Tailwind `content` / `@source`
- **Portaled** menus (Product Suite, account) also carry `.cn-suite-root` so scoped styles still apply

Always import the stylesheet once in the host:

```ts
import "@careernav/suite-shell/styles.css";
```

**Color bridge**

| Host token style | What to do |
|---|---|
| shadcn HSL channels (`--primary: 239 84% 67%`) — Lab / Studio / Gym | Nothing — package maps `hsl(var(--primary))` → `--cn-primary` |
| Hex / full colors (`--primary: #006a70`) — Live | Override `--cn-*` on `.cn-suite-root` (see Live `styles.css`) |

## Install

**Local sibling (dev):**

```json
"@careernav/suite-shell": "file:../careernav-suite-shell"
```

**Git dependency (Vercel-friendly):**

```json
"@careernav/suite-shell": "github:jinaddavid/careernav-suite-shell#v0.1.4"
```

## Usage

```tsx
import { SuiteHeader, getCareernavAuthToken } from "@careernav/suite-shell";
import "@careernav/suite-shell/styles.css";
import { Link, NavLink } from "react-router-dom";

<SuiteHeader
  productId="studio"
  navItems={[
    { to: "/home", label: "Home" },
    { to: "/learning-paths", label: "Learning Paths" },
  ]}
  Link={Link}
  NavLink={NavLink}
  user={user}
  isAuthenticated={!!user}
  onLogout={logout}
  onSearchClick={() => navigate("/search")}
  productUrls={{
    studio: import.meta.env.VITE_STUDIO_URL,
    gym: import.meta.env.VITE_GYM_URL,
    lab: import.meta.env.VITE_LAB_URL,
    live: import.meta.env.VITE_LIVE_URL,
  }}
  getSsoToken={getCareernavAuthToken}
  accountSettingsHref="/account"
/>
```

Host apps should define the usual design tokens (`--primary`, `--card`, `--border`, `--muted`, …).

## Publish

```bash
npm run build
NODE_AUTH_TOKEN=<pat-with-write:packages> npm publish
```

`dist/` (JS + `suite-shell.css`) is committed so `github:` installs work without a local build.
