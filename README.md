# @careernav/suite-shell

Shared CareerNav suite chrome: pill header, Product Suite waffle, SSO URL helper.

## Install

**Local sibling (dev):**

```json
"@careernav/suite-shell": "file:../careernav-suite-shell"
```

**GitHub Packages:**

```
@careernav:registry=https://npm.pkg.github.com
```

```bash
npm install @careernav/suite-shell@0.1.0
```

**Git dependency (Vercel-friendly):**

```json
"@careernav/suite-shell": "github:jinaddavid/careernav-suite-shell#v0.1.0"
```

## Usage

```tsx
import { SuiteHeader, getCareernavAuthToken } from "@careernav/suite-shell";
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

Host apps must provide Tailwind utility classes used by the shell (or include the same design tokens as Studio).

## Publish

```bash
npm run build
npm publish
```

Requires `NODE_AUTH_TOKEN` with `write:packages` for GitHub Packages.
