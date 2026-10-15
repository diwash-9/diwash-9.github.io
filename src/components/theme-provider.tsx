import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeProviderState = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

function getInitialTheme(): Theme {
  // The pre-paint script in index.html has already applied the correct class,
  // so just mirror whatever is on the document to avoid a mismatch.
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  }
  return "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const value: ThemeProviderState = {
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
