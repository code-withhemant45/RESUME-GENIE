import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
const ThemeToggle = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="text-amber-600">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>;
};
export default ThemeToggle;