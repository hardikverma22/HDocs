import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.LIGHT);

  const { loggedInUser } = useAuth();

  const toggleTheme = (isDark) => {
    const theme = isDark ? THEMES.DARK : THEMES.LIGHT;
    setTheme(theme);
    localStorage.setItem(`${loggedInUser.uid}-theme`, theme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem(`${loggedInUser.uid}-theme`);
    if (localTheme) {
      document.body.className = localTheme;
      setTheme(localTheme);
    } else {
      document.body.className = theme;
    }
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
