import { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";
import { useToggle } from "../hooks/useToggle/useToggle";

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const [theme, toggleTheme] = useToggle("theme", "dark", "light");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
