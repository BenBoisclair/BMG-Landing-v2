/**
 * Leaflet map configuration for the interactive world map
 */

import type { MapConfig, RegionBounds } from '../../types/map';

// Stadia Alidade Smooth (Light) tile layer - free for low-traffic sites
export const STADIA_LIGHT_TILES = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';

export const TILE_ATTRIBUTION = '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>';

export const mapConfig: MapConfig = {
  tileUrl: STADIA_LIGHT_TILES,
  attribution: TILE_ATTRIBUTION,
  defaultCenter: [20, 40], // Centered to show most project locations
  defaultZoom: 2,
  minZoom: 2,
  maxZoom: 12,
};

// Region bounds for click-to-zoom navigation
export const regionBounds: Record<string, RegionBounds> = {
  all: {
    id: 'all',
    name: 'All Regions',
    bounds: [[-60, -180], [80, 180]],
  },
  americas: {
    id: 'americas',
    name: 'Americas',
    bounds: [[-55, -170], [72, -30]],
  },
  europe: {
    id: 'europe',
    name: 'Europe',
    bounds: [[35, -25], [72, 45]],
  },
  asia: {
    id: 'asia',
    name: 'Asia',
    bounds: [[-10, 60], [55, 150]],
  },
  'middle-east': {
    id: 'middle-east',
    name: 'Middle East',
    bounds: [[10, 30], [45, 65]],
  },
  oceania: {
    id: 'oceania',
    name: 'Oceania',
    bounds: [[-50, 110], [0, 180]],
  },
  africa: {
    id: 'africa',
    name: 'Africa',
    bounds: [[-35, -20], [38, 55]],
  },
};

// Animation timing constants (in milliseconds)
export const TIMING = {
  tooltip: {
    show: 100,
    hide: 150,
  },
  popup: {
    open: 200,
    close: 150,
  },
  marker: {
    pulse: 1500,
    hover: 150,
  },
  map: {
    pan: 300,
    zoom: 250,
  },
  filter: {
    toggle: 150,
  },
};

// Marker styling
export const markerStyles = {
  dotSize: 12,
  dotColor: '#392DCA', // map-blue
  dotBorder: '#FFFFFF',
  dotBorderWidth: 2,
  pulseColor: 'rgba(57, 45, 202, 0.4)',
  hoverScale: 1.2,
  badgeColor: '#2C266C', // brand-primary
  badgeTextColor: '#FFFFFF',
};

// Map container responsive heights
export const containerHeights = {
  mobile: '350px',    // < 640px
  tablet: '450px',    // 640-1024px
  desktop: '600px',   // > 1024px
};
