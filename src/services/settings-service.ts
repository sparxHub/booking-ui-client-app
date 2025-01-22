// services/settings-service.ts
import { serverRequest } from "@/api/server-adapter";

export type Settings = Record<string, any>;

export class SettingsService {
  private static settings: Record<string, any> = {};
  private static initialized = false;
  private static initPromise: Promise<void> | null = null;

  /**
   * Initialize the settings service.
   */
  private static async init(): Promise<void> {
    if (this.initialized) return;

    // Avoid initializing multiple times
    if (!this.initPromise) {
      this.initPromise = (async () => {
        try {
          // Load default and persisted settings
          const defaults = await this.loadDefaults();
          const persistedSettings = this.loadPersistedSettings();
          this.settings = { ...defaults, ...persistedSettings };

          // Mark as initialized
          this.initialized = true;

          // Schedule fetching server settings
          this.scheduleFetchServerSettings();
        } catch (error) {
          console.error("Settings initialization failed:", error);
        }
      })();
    }

    return this.initPromise;
  }

  /**
   * Schedule fetching server-side settings after initialization.
   */
  private static scheduleFetchServerSettings(): void {
    setTimeout(async () => {
      try {
        await this.fetchServerSettings();
      } catch (error) {
        console.error("Failed to fetch server settings:", error);
      }
    }, 0);
  }

  /**
   * Load settings from `app_settings.json`.
   */
  private static async loadDefaults(): Promise<Record<string, any>> {
    try {
      const url =
        process.env.NEXT_PUBLIC_EXPORT_MODE === "true"
          ? "/assets/app_settings.json"
          : `${process.env.NEXT_PUBLIC_BASE_URL || ""}/assets/app_settings.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load default settings");
      }
      return response.json();
    } catch (error) {
      throw new Error(`Failed to load default settings: ${error.message}`);
    }
  }

  /**
   * Load persisted settings from local storage.
   */
  private static loadPersistedSettings(): Record<string, any> {
    if (typeof window === "undefined") return {};
    const persisted = localStorage.getItem("appSettings");
    return persisted ? JSON.parse(persisted) : {};
  }

  /**
   * Fetch server-side settings.
   */
  private static async fetchServerSettings(): Promise<void> {
    try {
      const response = await serverRequest<{ settings: Record<string, any> }>(
        "GET",
        "/settings/getSettings"
      );
      if (response.status === 0 && response.params?.settings) {
        this.settings = { ...this.settings, ...response.params.settings };
      } else {
        console.warn("Failed to fetch server settings");
      }
    } catch (error) {
      console.error("Error fetching server settings:", error);
    }
  }

  /**
   * Get a setting by key with a default value.
   */
  static async get<T = any>(key: string, defaultValue: T): Promise<T> {
    if (!this.initialized) {
      await this.init();
    }
    return this.settings[key] !== undefined ? this.settings[key] : defaultValue;
  }

  /**
   * Get a text string by key with a default fallback.
   */
  static async getText(key: string, defaultText: string): Promise<string> {
    if (!this.initialized) {
      await this.init();
    }
    const texts = this.settings["texts"] || {};
    return texts[key] !== undefined ? texts[key] : defaultText;
  }

  /**
   * Load settings directly for server-side usage.
   */
  static async loadSettings(): Promise<Record<string, any>> {
    if (!this.initialized) {
      await this.init();
    }
    return this.settings;
  }
}
