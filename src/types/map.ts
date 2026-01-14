/**
 * TypeScript interfaces for the interactive map feature
 */

export interface MapMarker {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  image: string;
  categories: string[];
  region: string;
  country: string;
}

export interface MarkerCluster {
  lat: number;
  lng: number;
  markers: MapMarker[];
  count: number;
}

export interface GeocodedLocation {
  lat: number;
  lng: number;
  region: string;
  country: string;
}

export interface RegionBounds {
  id: string;
  name: string;
  bounds: [[number, number], [number, number]];
}

export interface MapState {
  zoomLevel: 'world' | 'country';
  selectedRegion: string | null;
  selectedCategories: string[];
  activeMarker: string | null;
  isPopupOpen: boolean;
}

export interface MapConfig {
  tileUrl: string;
  attribution: string;
  defaultCenter: [number, number];
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
}

export type RegionId = 'all' | 'americas' | 'europe' | 'asia' | 'middle-east' | 'oceania' | 'africa';

export type CategoryId = 'construction' | 'mechanical' | 'electrical';
