'use client';

import { Open_Sans } from 'next/font/google';
import { I18nProvider, useLocale } from 'react-aria';

import { ThemeProvider, useTheme } from '@/context/theme';
import { SelectedDateProvider } from '@/context/selected-date';
import { BookingAvailabilitiesProvider } from '@/context/booking-availabilities';

import { BookingShell } from '@/app/booking/layout/booking-shell';
// import { ThemeSwitcher } from "./theme-switcher"
import { NavBar } from '@/components/navbar';
import { BackgroundDecoration } from '@/components/background-decoration';

const openSans = Open_Sans({
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, direction } = useLocale();

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <html lang={locale} dir={direction} className={openSans.className}>
          <Body>{children}</Body>
        </html>
      </ThemeProvider>
    </I18nProvider>
  );
}

// Body with active theme applied
function Body({ children }) {
  const { theme } = useTheme();
  return (
    <body className="antialiased" data-theme={theme}>
      <NavBar />
      <div className="grid min-h-screen place-items-center">
        <BackgroundDecoration />
        <div className="mx-auto w-full max-w-5xl px-2 py-16 sm:px-6 lg:max-w-7xl lg:px-3 xl:px-8">
          <div className="relative">{children}</div>
        </div>
      </div>
    </body>
  );
}
