import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-foreground hover:bg-accent"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Use resolvedTheme to get the actual theme (light/dark) even when theme is "system"
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (theme === "system") {
      // If system, toggle based on current resolved theme
      setTheme(isDark ? "light" : "dark");
    } else {
      // Otherwise toggle between light and dark
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-foreground hover:bg-accent"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

