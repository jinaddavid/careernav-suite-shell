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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover, var(--card))",
          foreground: "var(--popover-foreground, var(--card-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary, var(--muted))",
          foreground: "var(--secondary-foreground, var(--foreground))",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent, var(--muted))",
          foreground: "var(--accent-foreground, var(--foreground))",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground, var(--primary-foreground))",
        },
        border: "var(--border)",
        input: "var(--input, var(--border))",
        ring: "var(--ring, var(--primary))",
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
