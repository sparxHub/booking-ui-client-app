import { serverRequest } from "@/api/server-adapter";

export type Settings = Record<string, any>;

export class SettingsService {
  private static settings: Settings = {};
  private static initialized = false;

  /**
   * Initialize the settings service by loading defaults and applying overrides.
   * @param overrides Optional overrides for default settings.
   */
  static async init(overrides: Settings = {}): Promise<void> {
    if (this.initialized) return;

    // Load default settings from JSON file
    const defaults = await this.loadDefaults();

    // Merge defaults with overrides
    this.settings = { ...defaults, ...overrides };

    // Load persisted settings
    const persistedSettings = this.loadPersistedSettings();
    this.settings = { ...this.settings, ...persistedSettings };

    // Fetch server settings and apply
    await this.fetchServerSettings();

    this.initialized = true;
  }

  /**
   * Load default settings from a JSON file.
   */
  private static async loadDefaults(): Promise<Settings> {
    const response = await fetch("/assets/app_settings.json");
    if (!response.ok) {
      throw new Error("Failed to load default settings");
    }
    return response.json();
  }

  /**
   * Load persisted settings from local storage.
   */
  private static loadPersistedSettings(): Settings {
    const persisted = localStorage.getItem("appSettings");
    return persisted ? JSON.parse(persisted) : {};
  }

  /**
   * Fetch settings from the server and merge with current settings.
   */
  private static async fetchServerSettings(): Promise<void> {
    try {
      const response = await serverRequest<{ settings: Settings }>(
        "GET",
        "/settings/getSettings"
      );
      if (response.status === 0 && response.params?.settings) {
        const serverSettings = response.params.settings;
        this.settings = { ...this.settings, ...serverSettings };
        this.persistSettings();
      } else {
        console.error("Error fetching server settings:", response.message);
      }
    } catch (error) {
      console.error("Failed to fetch server settings:", error);
    }
  }

  /**
   * Persist current settings to local storage.
   */
  private static persistSettings(): void {
    localStorage.setItem("appSettings", JSON.stringify(this.settings));
  }

  /**
   * Get a setting by key with an optional default value.
   */
  static get<T = any>(key: string, defaultValue: T): T {
    return this.settings[key] !== undefined ? this.settings[key] : defaultValue;
  }

  /**
   * Set or update a setting and persist it.
   */
  static set(key: string, value: any): void {
    this.settings[key] = value;
    this.persistSettings();
  }

  /**
   * Reset a setting to its default value.
   */
  static reset(key: string): void {
    delete this.settings[key];
    this.persistSettings();
  }

  /**
   * Get all current settings.
   */
  static getAll(): Settings {
    return { ...this.settings };
  }
}
