// BREAKPOINTS;

const device = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const breakpoint = {
  mobileS: `(min-width: ${device.mobileS})`,
  mobileM: `(min-width: ${device.mobileM})`,
  mobileL: `(min-width: ${device.mobileL})`,
  tablet: `(min-width: ${device.tablet})`,
  laptop: `(min-width: ${device.laptop})`,
  laptopL: `(min-width: ${device.laptopL})`,
  desktop: `(min-width: ${device.desktop})`,
  desktopL: `(min-width: ${device.desktop})`
};