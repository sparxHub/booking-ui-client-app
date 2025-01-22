//app/home/page.tsx

import { SettingsService } from "@/services/settings-service";
import HomePageClient from "./home-client";

/**
 * Dynamically generate metadata based on settings.
 */
export async function generateMetadata() {
  const settings = await SettingsService.loadSettings();
  const texts = settings.texts || {};

  return {
    title: texts.title || "Default Title",
    description: texts.description || "Default Description",
  };
}

export default function Page() {
  return <HomePageClient />;
}
