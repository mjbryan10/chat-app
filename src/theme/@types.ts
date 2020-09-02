export interface Color {
  // primary: string;
  // secondary: string;
  // success: string;
  // warning: string;
  // info: string;
  // dark: string;
  // light: string;
  text: string;
}

export interface Theme {
  color: Color;
  //pageBackground: string;
  //messageBackground: string;
  buttonBackground: string;
  inputBackground: string;
}

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
    return true
  };
  return false;
}