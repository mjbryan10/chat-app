/**
 * Colors found on the theme
 */
export interface ThemeColors {
   primary: string;
   secondary: string;
   success: string;
   warning: string;
   danger: string;
   info: string;
   dark: string;
   light: string;
   text: string;
   blue: string;
   indigo: string;
   purple: string;
   pink: string;
   red: string;
   orange: string;
   yellow: string;
   green: string;
   teal: string;
   cyan: string;
   white: string;
   gray: string;
   grayDark: string;
}
/**
 * Possible colors available for use in theme
 */
export type ThemeColor = keyof ThemeColors;
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
   /**
    * Theme interface
    */
   export interface Theme {
      color: ThemeColors;
      background: ThemeBackgrounds;
      border: string;
   }
   /**
    * Possible colors available for use in theme
    */
   export type ThemeColor = keyof ThemeColors;
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
