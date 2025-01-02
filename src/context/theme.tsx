"use client"

import { createContext, useState, useContext } from "react"

const ThemeContext = createContext<{
  theme: string
  setTheme: (theme: string) => void
}>({
  theme: "gray",
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("rainforest")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
