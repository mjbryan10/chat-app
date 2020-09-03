/**
 * Colors found on the theme
 */
export interface ThemeColors {
   // primary: string;
   // secondary: string;
   // success: string;
   // warning: string;
   // info: string;
   dark: string;
   // light: string;
   text: string;
}
/**
 * Background styles found on the theme
 */
export interface ThemeBackgrounds {
   page: string;
   //messageBackground: string;
   buttonPrimary: string;
   inputField: string;
}

/**
 * Export of Theme to 'styled-components'
 */
declare module 'styled-components' {
   export interface Theme {
      color: ThemeColors;
      background: ThemeBackgrounds;
      border: string;
   }
}
/**
 * Theme types
 */
export type ThemeName = 'dark' | 'light';

/**
 * Checks if given value is a valid theme name.
 *
 * Returns `true` if given value is a valid theme name.
 *
 * Returns `false` if given value is not a valid theme name.
 * @param value Any given value to check if matches theme names
 */
export function isThemeName(value: any): value is ThemeName {
   if (value === 'light' || value === 'dark') {
      return true;
   }
   return false;
}
