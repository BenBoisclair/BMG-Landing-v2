# Map Section Redesign - Feature Tracking

## Status: Planning Complete - Awaiting Approval

---

## User Decisions (All Confirmed)

### Technical Choices
| Question | Decision | Reasoning |
|----------|----------|-----------|
| Map Technology | Leaflet + Stadia Dark | Free, beautiful dark theme, geographic accuracy |
| Navigation Model | Click-to-zoom | World → Country, two levels, intuitive |
| Data Source | projects.json | Single source of truth, existing data |
| Coordinate Method | Auto-geocode | Convert "City, Country" to lat/lng automatically |
| Tile Provider | Stadia Dark | Free tier, no API key for low traffic |

### Visual Design
| Question | Decision |
|----------|----------|
| Visual Style | Modern dark theme (matches brand #2C266C) |
| Marker Style | Pulsing dots with count badge |
| Mobile UX | Touch-friendly map with gestures |
| Zoom Depth | World → Country (two levels) |
| Animation Style | Snappy & modern (150-200ms) |

### Interactions
| Question | Decision |
|----------|----------|
| Modal Design | Quick preview (compact popup) |
| Stats Display | Keep current stats below map |
| Multi-project Locations | Stack with count badge |
| Filters | Region quick-select + Category chips |

---

## Architecture Overview

### New Files to Create
```
src/components/ui/
├── InteractiveMapV2.astro      # Main Leaflet container
└── map/
    ├── MapFilters.astro        # Region & category filters
    ├── MapPopup.astro          # Click modal
    └── MapTooltip.astro        # Hover tooltip

src/utils/map/
├── mapConfig.ts                # Leaflet configuration
├── geocode.ts                  # Build-time geocoding
└── projectMarkers.ts           # Data transformation

src/data/
└── geocoded-locations.json     # Cached coordinates

src/types/
└── map.ts                      # TypeScript interfaces
```

### Files to Archive
- `src/components/ui/InteractiveMap.astro` → `InteractiveMap.legacy.astro`

### Files to Modify
- `src/components/sections/TrustedCultures.astro` - Swap component
- `package.json` - Add leaflet dependencies
- `astro.config.mjs` - Add CSP for tile requests

---

## Implementation Phases

### Phase 1: Setup & Data
- [ ] Add Leaflet dependencies to package.json
- [ ] Create TypeScript interfaces (map.ts)
- [ ] Build geocoding utility script
- [ ] Generate geocoded-locations.json
- [ ] Create mapConfig.ts with Stadia Dark tiles

### Phase 2: Core Map Component
- [ ] Create InteractiveMapV2.astro container
- [ ] Initialize Leaflet with dark tiles
- [ ] Implement custom pulsing marker class
- [ ] Render markers from geocoded data
- [ ] Add loading skeleton and error fallback

### Phase 3: Interactions
- [ ] Create MapTooltip.astro for hover previews
- [ ] Create MapPopup.astro for click details
- [ ] Implement click-to-zoom navigation
- [ ] Add marker count badges for stacked locations
- [ ] Handle zoom level state management

### Phase 4: Filters
- [ ] Create MapFilters.astro component
- [ ] Implement region quick-select buttons
- [ ] Implement category filter chips
- [ ] Connect filters to marker visibility
- [ ] Mobile horizontal scroll for filters

### Phase 5: Polish & Integration
- [ ] Responsive height adjustments
- [ ] Touch gesture optimization
- [ ] Animation timing fine-tuning
- [ ] Accessibility (keyboard nav, ARIA labels)
- [ ] Archive old InteractiveMap.astro
- [ ] Update TrustedCultures.astro to use new map

---

## Current Project Locations (from en.json)

| Project ID | Location |
|------------|----------|
| type1-project-1 | Massachusetts, United States |
| type1-project-2 | Bangkok, Thailand |
| type1-project-3 | California, United States |
| type1-project-4 | Chiang Mai, Thailand |
| type2-project-* | TBD (check translations) |
| type3-project-* | TBD (check translations) |

---

## Dependencies to Add

```json
{
  "dependencies": {
    "leaflet": "^1.9.4"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.8"
  }
}
```

---

## Brand Colors Reference

```css
--color-brand-primary: #2C266C    /* Deep purple - main brand */
--color-map-blue: #392DCA         /* Marker primary color */
--color-map-orange: #FF881B       /* Growing markets */
--color-map-red: #E23A45          /* Emerging markets */
--color-map-purple: #ACA7E9       /* Partner regions */
```

---

## Verification Checklist

### Functionality
- [ ] Map loads with Stadia Dark tiles
- [ ] All markers appear at correct locations
- [ ] Hover shows tooltip preview
- [ ] Click opens quick preview popup
- [ ] "View Project" button navigates correctly
- [ ] Click-to-zoom works (region → country)
- [ ] Region filter buttons zoom to region
- [ ] Category chips filter markers
- [ ] Multiple projects show count badge

### Responsiveness
- [ ] Mobile (320-640px): 350px height, touch works
- [ ] Tablet (640-1024px): 450px height
- [ ] Desktop (1024px+): 600px height
- [ ] Filters scroll horizontally on mobile
- [ ] Pinch-to-zoom works on touch devices

### Performance
- [ ] Map initializes within 2 seconds
- [ ] Animations run at 60fps
- [ ] No layout shift on load
- [ ] Graceful fallback on tile error

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announces markers
- [ ] Focus states visible
- [ ] Reduced motion respected

---

## Notes

- Stadia Dark tiles are free for low-traffic sites (no API key needed)
- Geocoding uses Nominatim (OpenStreetMap) - rate limited, so we cache results
- The current hexagonal map design will be archived, not deleted
- Stats section below map remains unchanged
