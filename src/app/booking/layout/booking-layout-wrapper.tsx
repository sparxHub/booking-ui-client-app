'use client';

import { Open_Sans } from 'next/font/google';
import { I18nProvider, useLocale } from 'react-aria';

import { ThemeProvider, useTheme } from '@/context/theme';
import { SelectedDateProvider } from '@/context/selected-date';
import { BookingAvailabilitiesProvider } from '@/context/booking-availabilities';

import { BookingShell } from '@/app/booking/layout/booking-shell';
import { BookingTypesProvider, useBookingTypes } from '@/context/booking-types';
import { ManagersProvider } from '@/context/managers';

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

  return <Body>{children}</Body>;
}

// Body with active theme applied
function Body({ children }) {
  const { theme } = useTheme();

  return (
    <SelectedDateProvider>
      <BookingTypesProvider>
        <ManagersProvider>
          <NestedProviders>{children}</NestedProviders>
        </ManagersProvider>
      </BookingTypesProvider>
    </SelectedDateProvider>
  );
}

function NestedProviders({ children }: { children: React.ReactNode }) {
  const { selectedBookingType } = useBookingTypes();

  return (
    <BookingAvailabilitiesProvider selectedBookingType={selectedBookingType}>
      <BookingShell>{children}</BookingShell>
    </BookingAvailabilitiesProvider>
  );
}
