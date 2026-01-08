# Responsive Fix Plan: Materials & Projects Pages

## Problem Summary
The materials and projects pages have horizontal scrolling issues caused by:
1. **Swiper carousels with `overflow: visible`** allowing coverflow effect elements to extend beyond viewport
2. **Missing intermediate breakpoints** (no `md: 768px` handling)
3. **Insufficient container padding** on smaller screens
4. **No global overflow-x protection** on body/html

---

## Implementation Plan

### Phase 1: Fix Horizontal Scroll (Critical)

#### 1.1 Add global overflow protection
**File:** `src/styles/global.css`

Add to the base layer:
```css
body {
  overflow-x: hidden;
}
```

This prevents any child overflow from causing page-level horizontal scroll while preserving the coverflow visual effect within carousels.

#### 1.2 Fix MaterialCarousel overflow containment
**File:** `src/components/sections/MaterialCarousel.astro`

Wrap the carousel in an overflow container:
- Add a wrapper div with `overflow-x: clip` (allows visual overflow but clips scrollbar)
- Keep `overflow: visible` for the Swiper internal elements to preserve 3D coverflow effect
- Add `position: relative` to establish containing block

#### 1.3 Fix ProjectGrid overflow containment
**File:** `src/components/sections/ProjectGrid.astro`

Add overflow protection to `.project-swiper-container`:
```css
.project-swiper-container {
  overflow: hidden;
}
```

---

### Phase 2: Add Tablet Breakpoint (md: 768px)

#### 2.1 Update MaterialCarousel Swiper breakpoints
**File:** `src/components/sections/MaterialCarousel.astro`

Current breakpoints: 320, 640, 1024, 1280
Add 768px breakpoint:

```javascript
breakpoints: {
  320: { slidesPerView: 1.2 },
  640: { slidesPerView: 1.8 },
  768: { slidesPerView: 2.5 },  // NEW tablet breakpoint
  1024: { slidesPerView: 3.5 },
  1280: { slidesPerView: 4 }
}
```

Update CSS slide widths:
```css
.material-slide { width: 260px; }  /* mobile - slightly smaller */

@media (min-width: 640px) { .material-slide { width: 280px; } }
@media (min-width: 768px) { .material-slide { width: 300px; } }  /* NEW */
@media (min-width: 1024px) { .material-slide { width: 340px; } }
@media (min-width: 1280px) { .material-slide { width: 380px; } }
```

#### 2.2 Update ProjectGrid Swiper breakpoints
**File:** `src/components/sections/ProjectGrid.astro`

Current breakpoints: 640, 1024
Add 768px breakpoint:

```javascript
breakpoints: {
  480: { slidesPerView: 1.5, spaceBetween: 12 },  // NEW small mobile
  640: { slidesPerView: 2, spaceBetween: 16 },
  768: { slidesPerView: 2.5, spaceBetween: 16 },  // NEW tablet
  1024: { slidesPerView: 3.5, spaceBetween: 20 },
  1280: { slidesPerView: 4, spaceBetween: 24 }
}
```

---

### Phase 3: Improve Container & Spacing

#### 3.1 Increase Container padding
**File:** `src/components/ui/Container.astro`

Update padding from `px-2 sm:px-3 lg:px-4` to:
```
px-4 sm:px-6 md:px-8 lg:px-8
```
This provides more breathing room: 16px → 24px → 32px → 32px

#### 3.2 Add responsive padding to MaterialCarousel section
**File:** `src/components/sections/MaterialCarousel.astro`

Update section wrapper:
```html
<section class="py-8 sm:py-10 md:py-12 lg:py-16">
```

Update inner container padding:
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
```

---

### Phase 4: Responsive Text & Elements

#### 4.1 Add responsive text scaling for MaterialCarousel
**File:** `src/components/sections/MaterialCarousel.astro`

Update title:
```html
<h2 class="text-2xl sm:text-3xl md:text-3xl lg:text-4xl ...">
```

Update material name:
```html
<h3 class="material-name text-xl sm:text-2xl md:text-2xl lg:text-3xl ...">
```

#### 4.2 Add responsive text scaling for ProjectGrid
**File:** `src/components/sections/ProjectGrid.astro`

Update section title:
```html
<h2 class="text-2xl sm:text-3xl md:text-3xl lg:text-4xl ...">
```

#### 4.3 Improve ProjectCard responsiveness
**File:** `src/components/ui/ProjectCard.astro`

Add responsive padding and text:
```html
<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
  <h3 class="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4 leading-5 sm:leading-6">
```

Make category tags responsive:
```html
<span class="px-2 py-0.5 border border-white/25 rounded-full text-[10px] sm:text-xs text-white">
```

---

### Phase 5: Hero Section Responsiveness

#### 5.1 Make Materials hero height responsive
**File:** `src/pages/materials.astro`

Update hero section:
```html
<section id="materials-hero" class="relative h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] pt-16 sm:pt-18 md:pt-20 lg:pt-24">
```

#### 5.2 Make Projects hero responsive (if using ProjectHero component)
**File:** `src/components/sections/ProjectHero.astro`

Apply similar responsive height treatment.

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/styles/global.css` | Add body overflow-x: hidden |
| `src/components/ui/Container.astro` | Increase responsive padding |
| `src/components/sections/MaterialCarousel.astro` | Overflow fix, tablet breakpoint, responsive text |
| `src/components/sections/ProjectGrid.astro` | Overflow fix, tablet breakpoint, responsive text |
| `src/components/ui/ProjectCard.astro` | Responsive text and padding |
| `src/pages/materials.astro` | Responsive hero height |
| `src/components/sections/ProjectHero.astro` | Responsive hero height |

---

## Testing Checklist

After implementation, test at these viewport widths:
- [ ] 320px (small mobile)
- [ ] 375px (iPhone SE/mini)
- [ ] 414px (iPhone Plus/Max)
- [ ] 480px (large mobile)
- [ ] 640px (small tablet)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape / small laptop)
- [ ] 1280px (laptop)
- [ ] 1440px+ (desktop)

Verify:
- [ ] No horizontal scrolling at any width
- [ ] Carousels function properly with touch/swipe
- [ ] Text is readable at all sizes
- [ ] Cards have adequate spacing
- [ ] Coverflow effect still works visually on materials page
