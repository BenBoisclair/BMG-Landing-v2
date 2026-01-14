/**
 * Utility functions for transforming project data into map markers
 */

import type { MapMarker, MarkerCluster, GeocodedLocation } from '../../types/map';

interface ProjectData {
  id: string;
  image: string;
  categories: string[];
}

interface ProjectTranslation {
  name: string;
  location: string;
}

/**
 * Transform project data into map markers by merging with geocoded locations
 */
export function createMapMarkers(
  projects: ProjectData[],
  translations: Record<string, ProjectTranslation>,
  geocodedLocations: Record<string, GeocodedLocation>
): MapMarker[] {
  return projects
    .filter(project => geocodedLocations[project.id])
    .map(project => {
      const translation = translations[project.id];
      const geo = geocodedLocations[project.id];

      return {
        id: project.id,
        name: translation?.name || project.id,
        location: translation?.location || '',
        lat: geo.lat,
        lng: geo.lng,
        image: project.image,
        categories: project.categories,
        region: geo.region,
        country: geo.country,
      };
    });
}

/**
 * Group markers by location for stacking/clustering
 */
export function clusterMarkersByLocation(markers: MapMarker[]): MarkerCluster[] {
  const locationMap = new Map<string, MapMarker[]>();

  markers.forEach(marker => {
    // Use lat/lng as key (rounded to avoid floating point issues)
    const key = `${marker.lat.toFixed(4)},${marker.lng.toFixed(4)}`;
    const existing = locationMap.get(key) || [];
    locationMap.set(key, [...existing, marker]);
  });

  return Array.from(locationMap.entries()).map(([key, markers]) => ({
    lat: markers[0].lat,
    lng: markers[0].lng,
    markers,
    count: markers.length,
  }));
}

/**
 * Filter markers by region
 */
export function filterByRegion(markers: MapMarker[], region: string | null): MapMarker[] {
  if (!region || region === 'all') return markers;
  return markers.filter(marker => marker.region === region);
}

/**
 * Filter markers by categories (multi-select)
 */
export function filterByCategories(markers: MapMarker[], categories: string[]): MapMarker[] {
  if (categories.length === 0) return markers;
  return markers.filter(marker =>
    marker.categories.some(cat => categories.includes(cat))
  );
}

/**
 * Apply all filters to markers
 */
export function applyFilters(
  markers: MapMarker[],
  region: string | null,
  categories: string[]
): MapMarker[] {
  let filtered = filterByRegion(markers, region);
  filtered = filterByCategories(filtered, categories);
  return filtered;
}
