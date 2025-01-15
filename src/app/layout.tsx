import { Metadata } from "next";
import AppLayout from "@/components/layout/app-layout";
import "@/styles/tailwind.css";

import {
  sharedOgMetadata,
  sharedTwitterMetadata,
} from "@/utils/shared-metadata";

import { SettingsService } from "@/services/settings-service";

const title = "Pro Tailwind Coaching";
const description =
  "A fictive booking application to support the Pro Tailwind workshops";

export const metadata: Metadata = {
  metadataBase: new URL("https://calendar-app.protailwind.com/"),
  title: {
    template: "%s | Pro Tailwind Coaching",
    default: title,
  },
  description,
  openGraph: {
    ...sharedOgMetadata,
    title: {
      template: "%s | Pro Tailwind Coaching",
      default: title,
    },
    description,
  },
  twitter: {
    ...sharedTwitterMetadata,
    title: {
      template: "%s | Pro Tailwind Coaching",
      default: title,
    },
    description,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
