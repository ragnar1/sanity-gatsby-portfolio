// WCAG AA-compliant maritime colour palette
// All text/background combinations meet minimum 4.5:1 contrast ratio
export const COLORS = {
  // Core brand
  navy: '#0A1628',         // background for headers/tabs – contrast vs white: ~19:1
  navyMedium: '#1B3F7A',   // card headers – contrast vs white: ~9:1
  navyLight: '#2D5BA3',    // borders/dividers

  // Foreground on navy
  white: '#FFFFFF',
  lightBlue: '#4DA8FF',    // active tab / accent – contrast vs navy: ~8:1
  grey: '#A0B0C0',         // muted text on navy – contrast vs navy: ~5:1

  // Content backgrounds
  background: '#F0F4F8',   // screen background
  card: '#FFFFFF',         // card background

  // Text on white/light backgrounds
  text: '#1A2540',         // primary text – contrast vs white: ~16:1
  textSecondary: '#4A5568',// secondary text – contrast vs white: ~8.7:1

  // Semantic colours
  accent: '#0055AA',       // links/buttons – contrast vs white: ~7.5:1
  danger: '#B91C1C',       // danger/warning – contrast vs white: ~5.9:1
  success: '#15592E',      // positive – contrast vs white: ~9:1
  warning: '#92400E',      // caution – contrast vs white: ~7.1:1

  // Sea mark standard IALA colours
  markRed: '#CC0000',
  markGreen: '#006633',
  markYellow: '#E8B400',
  markBlack: '#1A1A1A',
  markWhite: '#F5F5F5',

  // UI details
  border: '#D1DCE8',
  shadow: '#0A1628',
  water: '#1A6BA3',
  waterLight: '#4A9CC8',
};
