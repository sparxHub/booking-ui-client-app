// booking-shell.tsx

import { Metadata } from "next"

import { BookingSidePanel } from "./booking-side-panel"
import { BookingMainPanel } from "./booking-main-panel"
import { BackgroundDecoration } from "../../../components/background-decoration"
import { Ribbon } from "../../../components/ribbon"

const title = "Pro Tailwind Coaching"
const description =
  "A fictive booking application to support the Pro Tailwind workshops"

const seoImagePath = "/img/seo-image.jpg"

export const metadata: Metadata = {
  metadataBase: new URL("https://calendar-app.protailwind.com/"),
  title: {
    template: "%s | Pro Tailwind Coaching",
    default: title,
  },
  description: description,
  openGraph: {
    title,
    description,
    locale: "en_AU",
    url: "https://calendar-app.protailwind.com",
    images: [
      {
        url: seoImagePath,
        width: 1200,
        height: 630,
        alt: "Pro Tailwind Coaching",
      },
    ],
  },
  twitter: {
    title,
    description,
    site: "@protailwind",
    creator: "@protailwind",
    card: "summary_large_image",
    images: [
      {
        url: seoImagePath,
        width: 1200,
        height: 630,
        alt: "Pro Tailwind Coaching",
      },
    ],
  },
}

export function BookingShell({ children }) {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="mx-auto w-full max-w-5xl sm:px-6 sm:py-16 lg:max-w-7xl lg:px-3 xl:px-8">
        <div className="relative">
          {/* <Ribbon /> */}
          <div className="grid h-full shadow-lg lg:grid-cols-[theme(width.80),1fr] xl:grid-cols-[theme(width.96),1fr]">
            <BookingSidePanel />
            <BookingMainPanel>{children}</BookingMainPanel>
          </div>
        </div>
      </div>
    </div>
  );
}

