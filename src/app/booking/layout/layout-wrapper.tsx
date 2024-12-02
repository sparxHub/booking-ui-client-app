"use client"

import { Open_Sans } from "next/font/google"
import { I18nProvider, useLocale } from "react-aria"

import { ThemeProvider, useTheme } from "@/context/theme"
import { SelectedDateProvider } from "@/context/selected-date"
import { BookingAvailabilitiesProvider } from "@/context/booking-availabilities"

import { Shell } from "@/app/booking/layout/shell"
// import { ThemeSwitcher } from "./theme-switcher"
import { HeaderBar } from "../../../components/header-bar"

const openSans = Open_Sans({
  display: "swap",
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, direction } = useLocale()

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <html lang={locale} dir={direction} className={openSans.className}>
          <Body>{children}</Body>
        </html>
      </ThemeProvider>
    </I18nProvider>
  )
}

// Body with active theme applied
function Body({ children }) {
  const { theme } = useTheme()
  return (
    <body className="antialiased" data-theme={theme}>
			<HeaderBar />
      <SelectedDateProvider>
        <BookingAvailabilitiesProvider>
          
          <Shell>{children}</Shell>
        </BookingAvailabilitiesProvider>
      </SelectedDateProvider>
    </body>
  )
}
