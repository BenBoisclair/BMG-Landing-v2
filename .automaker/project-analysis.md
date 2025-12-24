# BMG Landing v2 - Project Analysis

## 1. Project Structure and Architecture

The project follows a standard **Astro.js file-based routing architecture** with clear separation of concerns:

```
BMG-Landing-v2/
├── src/
│   ├── pages/                    # File-based routing (auto-routes)
│   │   └── index.astro          # Root page (/)
│   ├── layouts/
│   │   └── BaseLayout.astro     # Root HTML layout wrapper
│   ├── components/
│   │   ├── layout/              # Layout components (Header, Footer)
│   │   ├── sections/            # Page section components
│   │   │   ├── Hero.astro
│   │   │   ├── Showcase.astro   # 3D model viewer showcase
│   │   │   ├── Process.astro
│   │   │   ├── PriceEstimation.astro
│   │   │   ├── TrustedCultures.astro
│   │   │   ├── Testimonials.astro
│   │   │   └── Contact.astro
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button.astro
│   │       ├── FormInput.astro
│   │       ├── ProcessStep.astro
│   │       ├── StatItem.astro
│   │       └── TestimonialCard.astro
│   └── styles/
│       └── global.css           # Global styles, Tailwind config
├── public/
│   ├── images/                  # Static images
│   └── models/                  # 3D model files (GLB format)
├── astro.config.mjs             # Astro configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

**Architecture Pattern**: Component-based, modular architecture with:
- **File-based routing**: Pages in `src/pages/` automatically become routes
- **Section-based layout**: Each major section is a separate component
- **Atomic UI components**: Reusable UI elements (Button, FormInput, etc.)
- **Server-side rendering**: All components use Astro's static rendering

---

## 2. Main Technologies and Frameworks

| Category | Technology | Version |
|----------|-----------|---------|
| **Core Framework** | Astro | 5.16.6 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **3D Visualization** | @google/model-viewer | 4.1.0 |
| **Language** | TypeScript | Strict mode |
| **Build Tool** | Vite | (integrated with Astro) |
| **Module System** | ES Modules | `"type": "module"` |

**Additional Features:**
- **Inter font** from Google Fonts (weights: 400, 500, 600, 700)
- **Custom CSS variables** for BMG branding colors

---

## 3. Key Components and Their Responsibilities

### Layout Components

| Component | Responsibility |
|-----------|---------------|
| `BaseLayout.astro` | Root HTML template with meta tags, global styles, SEO defaults |
| `Header.astro` | Fixed navigation bar with logo, desktop/mobile navigation, language button |
| `Footer.astro` | Privacy/Terms links, company info, dynamic year |

### Content Sections

| Section | Responsibility |
|---------|---------------|
| `Hero.astro` | Full-screen background with purple overlay and CTA button |
| `Showcase.astro` | 3D product showcase with model-viewer, thumbnail gallery, pagination |
| `Process.astro` | 6-step manufacturing process display with icons |
| `PriceEstimation.astro` | Pricing cards for "Bust" and "Relief" products |
| `TrustedCultures.astro` | Global credibility section with SVG world map and statistics |
| `Testimonials.astro` | Client reviews carousel with star ratings |
| `Contact.astro` | Contact form and company information |

### UI Components

| Component | Responsibility |
|-----------|---------------|
| `Button.astro` | Polymorphic button (primary/secondary/outline variants, sm/md/lg sizes) |
| `FormInput.astro` | Form field wrapper with label, validation states |
| `ProcessStep.astro` | Process step display with number, title, description |
| `StatItem.astro` | Statistics display with value and label |
| `TestimonialCard.astro` | Testimonial card with rating, quote, author |

---

## 4. Build and Test Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321

# Production
npm run build        # Build for production to ./dist/
npm run preview      # Preview production build locally

# Direct CLI access
npm run astro        # Access Astro CLI directly
```

> **Note**: No test framework is currently configured. This is a landing page without unit tests.

---

## 5. Existing Conventions and Patterns

### Naming Conventions
- **Components**: PascalCase with `.astro` extension (e.g., `BaseLayout.astro`)
- **Directories**: kebab-case (e.g., `Landing/HeroSection/`)
- **CSS Classes**: Tailwind convention with custom utilities
- **IDs/Data attributes**: kebab-case (e.g., `mobile-menu-button`, `data-index`)

### Styling Approach
```css
/* Custom BMG Theme Colors */
--color-bmg-primary: #1a1a2e   /* Dark navy */
--color-bmg-secondary: #16213e /* Darker blue */
--color-bmg-accent: #e94560    /* Red/pink */
--color-bmg-light: #f8f8f8     /* Off-white */
--color-bmg-gold: #c9a962      /* Gold accent */
```

- **Utility-first CSS** with Tailwind
- **Mobile-first responsive design** with `sm:`, `md:`, `lg:` breakpoints
- **Custom utilities** defined in global.css (e.g., `font-inter`)

### State Management
- **Vanilla JavaScript** in `<script>` tags for interactivity
- **Direct DOM manipulation** with `document.querySelector`
- **Data attributes** for tracking component state

### Component Patterns
- **Props typing** with TypeScript interfaces in frontmatter
- **Default props** via destructuring with defaults
- **Slot usage** for component children
- **Conditional rendering** with ternary operators and `.map()`
- **Class composition** using `class:list` directive

### Accessibility Features
- `alt` attributes on images
- `aria-label` on interactive elements
- `for` attributes linking labels to inputs
- Semantic HTML elements

### Performance Optimizations
- Lazy loading on model-viewer (`loading="lazy"`)
- Aspect ratio containers for images
- Hardware-accelerated CSS transitions

---

## Summary

This is a **modern landing page for Bangkok Modern Granite (BMG)**, a premium granite sculpture company. The project leverages:

- **Astro 5** for fast, static site generation
- **Tailwind CSS 4** for utility-first styling
- **Google Model Viewer** for interactive 3D product showcase
- **TypeScript** for type safety
- **Clean component architecture** with reusable UI patterns