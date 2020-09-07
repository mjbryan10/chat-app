/**
 * Class for making an array of colors
 * 
 * 
 * Technique to avoid hard typing names into array:
 * @see https://stackoverflow.com/a/59806829/12873927
 */
class ColorSpectrumList {
   /**
    * 
    */
   constructor(
      readonly blue?: string,
      readonly red?: string,
      readonly green?: string,
      readonly purple?: string,
      readonly orange?: string,
      readonly pink?: string,
      readonly indigo?: string,
      readonly teal?: string,
      readonly yellow?: string,
      readonly cyan?: string,
   ){}
}
export type SpectrumColor = keyof ColorSpectrumList;
/**
 * An array of color names for use.
 */
export const colorSpectrumArray = Object.keys(new ColorSpectrumList()) as SpectrumColor[]; 
/**
 * Color Spectrum
 * 
 * Implements class and makes fields no longer optional.
 */
export interface ColorSpectrum extends ColorSpectrumList {
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
   /**
    * Color for the owner of message/conversation
    */
   owner: string;
}
/**
 * Colors found on the theme
 */
export interface ThemeColors extends ColorSpectrum {
   primary: string;
   secondary: string;
   success: string;
   warning: string;
   danger: string;
   info: string;
   dark: string;
   light: string;
   text: string;
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
   message: string;
   buttonPrimary: string;
   inputField: string;
   conversation: string;
   conversationSelected: string;
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
