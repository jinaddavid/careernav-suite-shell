/** @type {import('tailwindcss').Config} */
export default {
  // Scope every utility under .cn-suite-root so host `.flex` rules are unaffected
  // and shell utilities only apply inside the suite chrome (incl. portaled menus).
  important: ".cn-suite-root",
  corePlugins: {
    // Never emit a global Preflight reset into host pages
    preflight: false,
  },
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Use --cn-* tokens (set on .cn-suite-root) so hex hosts (Live) and
      // hsl-channel hosts (Lab/Studio/Gym) can both bridge without conflict.
      colors: {
        background: "var(--cn-bg)",
        foreground: "var(--cn-fg)",
        card: {
          DEFAULT: "var(--cn-card)",
          foreground: "var(--cn-card-fg)",
        },
        popover: {
          DEFAULT: "var(--cn-card)",
          foreground: "var(--cn-card-fg)",
        },
        primary: {
          DEFAULT: "var(--cn-primary)",
          foreground: "var(--cn-primary-fg)",
        },
        secondary: {
          DEFAULT: "var(--cn-muted)",
          foreground: "var(--cn-fg)",
        },
        muted: {
          DEFAULT: "var(--cn-muted)",
          foreground: "var(--cn-muted-fg)",
        },
        accent: {
          DEFAULT: "var(--cn-muted)",
          foreground: "var(--cn-fg)",
        },
        destructive: {
          DEFAULT: "var(--cn-destructive)",
          foreground: "var(--cn-primary-fg)",
        },
        border: "var(--cn-border)",
        input: "var(--cn-border)",
        ring: "var(--cn-primary)",
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
    },
  },
  plugins: [],
};
