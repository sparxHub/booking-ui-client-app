"use client"

import { Open_Sans } from "next/font/google"
import { ThemeProvider } from "@/context/theme"

import { HomeShell } from "./home-shell"

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
          <HomeShell>{children}</HomeShell>
  )
}
