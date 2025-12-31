/**
 * BMG Brand Colors - Centralized color constants
 *
 * This file contains all brand colors used throughout the application.
 * Import these constants instead of using hardcoded hex values.
 *
 * Usage:
 * - In TypeScript/JavaScript: import { COLORS } from '@/styles/colors';
 * - In CSS/Tailwind: Use the CSS custom properties defined in global.css
 */

// Primary Brand Colors
export const COLORS = {
  // Primary brand blue - used for headers, footers, titles, CTA buttons
  brand: {
    primary: '#2C266C',
    primaryHover: '#231f56',
    // Alternative dark purple variants
    dark: '#2d2d5a',
    medium: '#6b6b9d',
    mediumHover: '#5a5a8a',
  },

  // Accent colors
  accent: {
    red: '#B41E23',
    redLight: '#CF2228',
    redDark: '#85152D',
    showcaseRed: '#d01e2a',
    gold: '#c9a962',
  },

  // Map colors (for InteractiveMap and countries data)
  map: {
    primaryBlue: '#392DCA',
    orange: '#FF881B',
    red: '#E23A45',
    lightPurple: '#ACA7E9',
    coverage: '#EBECF7',
    background: '#2C266C',
  },

  // Text colors
  text: {
    primary: '#313131',
    secondary: '#425466',
    muted: '#828282',
    light: '#6b7280',
  },

  // UI colors
  ui: {
    border: '#D2D5DA',
    lightGray: '#d9d9d9',
    background: '#f8f8f8',
    white: '#FFFFFF',
  },

  // Legacy colors (kept for backward compatibility with existing CSS variables)
  legacy: {
    bmgPrimary: '#1a1a2e',
    bmgSecondary: '#16213e',
    bmgAccent: '#e94560',
    bmgLight: '#f8f8f8',
    bmgGold: '#c9a962',
    bmgGray: '#6b7280',
    bmgFooter: '#2C266C',
  },
} as const;

// CSS class mappings for Tailwind arbitrary values
// Use these when you need to reference colors in Tailwind classes
export const TAILWIND_COLORS = {
  // Brand colors as Tailwind arbitrary values
  'brand-primary': 'bg-[#2C266C]',
  'brand-primary-hover': 'hover:bg-[#231f56]',
  'brand-dark': 'bg-[#2d2d5a]',
  'brand-medium': 'bg-[#6b6b9d]',
  'brand-medium-hover': 'hover:bg-[#5a5a8a]',

  // Text colors
  'text-brand-primary': 'text-[#2C266C]',
  'text-brand-dark': 'text-[#2d2d5a]',
  'text-secondary': 'text-[#425466]',
  'text-muted': 'text-[#828282]',
  'text-primary': 'text-[#313131]',

  // Border colors
  'border-brand-dark': 'border-[#2d2d5a]',
  'border-ui': 'border-[#D2D5DA]',

  // Accent colors
  'accent-red': 'bg-[#B41E23]',
  'showcase-red': 'bg-[#d01e2a]',
} as const;

// CSS custom property names (for use in inline styles or CSS)
export const CSS_VARS = {
  brandPrimary: '--color-brand-primary',
  brandDark: '--color-brand-dark',
  brandMedium: '--color-brand-medium',
  accentRed: '--color-accent-red',
  textSecondary: '--color-text-secondary',
  textMuted: '--color-text-muted',
  borderColor: '--color-border',
} as const;

// Type exports for TypeScript usage
export type ColorKey = keyof typeof COLORS;
export type BrandColor = keyof typeof COLORS.brand;
export type AccentColor = keyof typeof COLORS.accent;
export type MapColor = keyof typeof COLORS.map;
export type TextColor = keyof typeof COLORS.text;
export type UIColor = keyof typeof COLORS.ui;
