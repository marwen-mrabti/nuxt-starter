export const AUTHED_ROUTES = new Set(["/dashboard", "/profile", "/settings"]);

export const themeOptions = ["system", "light", "dark", "sepia"] as const;
export type ThemeOption = (typeof themeOptions)[number];
