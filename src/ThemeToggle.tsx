import { Moon, Sun } from "lucide-react";

type Props = {
  theme?: "light" | "dark";
  onToggle?: () => void;
};

export function ThemeToggle({ theme = "light", onToggle }: Props) {
  if (!onToggle) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
