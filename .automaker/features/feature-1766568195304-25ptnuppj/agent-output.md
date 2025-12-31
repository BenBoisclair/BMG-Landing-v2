I'll review the previous context and continue implementing this feature. Let me first explore the codebase to understand the current state and what needs to be done.

🔧 Tool: Glob
Input: {
  "pattern": "**/*.{astro,ts,tsx,js}"
}

🔧 Tool: Grep
Input: {
  "pattern": "unsplash\\.com|placehold\\.co"
}

Let me look at the files that contain placeholder image references to understand what needs to be replaced:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Process.astro"
}

🔧 Tool: Glob
Input: {
  "pattern": "src/**/*.astro"
}

Now let me check what images already exist in the project and understand the folder structure:

🔧 Tool: Glob
Input: {
  "pattern": "public/images/**/*"
}

🔧 Tool: Glob
Input: {
  "pattern": "src/assets/**/*"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/ProcessStep.astro"
}

Now let me check the Astro configuration to understand how images are handled and if there's an existing Image component setup:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/astro.config.mjs"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/benedictboisclair/Projects/BMG-Landing-v2/",
  "description": "List project root directory"
}

Now let me understand the implementation plan. I need to:
1. Create local placeholder images for the showcase thumbnails (3 images for showcase)
2. Create SVG icons for the 6 process steps  
3. Use Astro's Image component for optimization with WebP, lazy loading, and responsive sizes

Let me first create the assets directory structure and the necessary images:

🔧 Tool: Bash
Input: {
  "command": "mkdir -p /Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/showcase /Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process",
  "description": "Create assets directories"
}

Now let me create the SVG placeholder icons for the process steps. These will be simple numbered icons that can be easily replaced with real icons later:

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-01.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">01</text>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-02.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">02</text>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-03.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">03</text>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-04.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">04</text>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-05.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">05</text>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/step-06.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 120 120\" fill=\"none\">\n  <rect width=\"120\" height=\"120\" rx=\"12\" fill=\"#e2e8f0\"/>\n  <text x=\"60\" y=\"70\" text-anchor=\"middle\" font-family=\"system-ui, -apple-system, sans-serif\" font-size=\"36\" font-weight=\"600\" fill=\"#64748b\">06</text>\n</svg>\n"
}

Now let me create placeholder SVG images for the showcase thumbnails (these simulate granite/marble textures):

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/showcase/thumbnail-1.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" fill=\"none\">\n  <defs>\n    <pattern id=\"granite1\" patternUnits=\"userSpaceOnUse\" width=\"20\" height=\"20\">\n      <rect width=\"20\" height=\"20\" fill=\"#374151\"/>\n      <circle cx=\"5\" cy=\"5\" r=\"2\" fill=\"#4b5563\" opacity=\"0.6\"/>\n      <circle cx=\"15\" cy=\"12\" r=\"1.5\" fill=\"#6b7280\" opacity=\"0.4\"/>\n      <circle cx=\"8\" cy=\"16\" r=\"1\" fill=\"#9ca3af\" opacity=\"0.3\"/>\n    </pattern>\n  </defs>\n  <rect width=\"200\" height=\"200\" fill=\"url(#granite1)\"/>\n  <rect width=\"200\" height=\"200\" fill=\"#1f2937\" opacity=\"0.3\"/>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/showcase/thumbnail-2.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" fill=\"none\">\n  <defs>\n    <pattern id=\"marble1\" patternUnits=\"userSpaceOnUse\" width=\"40\" height=\"40\">\n      <rect width=\"40\" height=\"40\" fill=\"#f3f4f6\"/>\n      <path d=\"M0 20 Q10 15 20 20 T40 20\" stroke=\"#d1d5db\" stroke-width=\"1\" fill=\"none\" opacity=\"0.5\"/>\n      <path d=\"M0 30 Q15 25 30 30 T60 30\" stroke=\"#e5e7eb\" stroke-width=\"0.5\" fill=\"none\" opacity=\"0.4\"/>\n    </pattern>\n  </defs>\n  <rect width=\"200\" height=\"200\" fill=\"url(#marble1)\"/>\n  <rect width=\"200\" height=\"200\" fill=\"#e5e7eb\" opacity=\"0.2\"/>\n</svg>\n"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/showcase/thumbnail-3.svg",
  "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" fill=\"none\">\n  <defs>\n    <pattern id=\"granite2\" patternUnits=\"userSpaceOnUse\" width=\"25\" height=\"25\">\n      <rect width=\"25\" height=\"25\" fill=\"#78716c\"/>\n      <circle cx=\"6\" cy=\"6\" r=\"2.5\" fill=\"#a8a29e\" opacity=\"0.5\"/>\n      <circle cx=\"18\" cy=\"10\" r=\"2\" fill=\"#57534e\" opacity=\"0.6\"/>\n      <circle cx=\"10\" cy=\"20\" r=\"1.5\" fill=\"#d6d3d1\" opacity=\"0.4\"/>\n      <circle cx=\"22\" cy=\"22\" r=\"1\" fill=\"#44403c\" opacity=\"0.5\"/>\n    </pattern>\n  </defs>\n  <rect width=\"200\" height=\"200\" fill=\"url(#granite2)\"/>\n  <rect width=\"200\" height=\"200\" fill=\"#44403c\" opacity=\"0.2\"/>\n</svg>\n"
}

Now I need to update the Process.astro component to use the local SVG icons and implement Astro's Image component for optimization:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Process.astro",
  "old_string": "---\nimport Button from '../ui/Button.astro';\nimport ProcessStep from '../ui/ProcessStep.astro';\nimport { useI18n } from '../../i18n/utils';\n\nconst { t } = useI18n(Astro.url);\n\nconst steps = [\n  {\n    number: t.process.steps['1'].number,\n    title: t.process.steps['1'].title,\n    description: t.process.steps['1'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=01',\n  },\n  {\n    number: t.process.steps['2'].number,\n    title: t.process.steps['2'].title,\n    description: t.process.steps['2'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=02',\n  },\n  {\n    number: t.process.steps['3'].number,\n    title: t.process.steps['3'].title,\n    description: t.process.steps['3'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=03',\n  },\n  {\n    number: t.process.steps['4'].number,\n    title: t.process.steps['4'].title,\n    description: t.process.steps['4'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=04',\n  },\n  {\n    number: t.process.steps['5'].number,\n    title: t.process.steps['5'].title,\n    description: t.process.steps['5'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=05',\n  },\n  {\n    number: t.process.steps['6'].number,\n    title: t.process.steps['6'].title,\n    description: t.process.steps['6'].description,\n    icon: 'https://placehold.co/120x120/e2e8f0/64748b?text=06',\n  },\n];\n---",
  "new_string": "---\nimport { Image } from 'astro:assets';\nimport Button from '../ui/Button.astro';\nimport ProcessStep from '../ui/ProcessStep.astro';\nimport { useI18n } from '../../i18n/utils';\n\n// Import local process step icons\nimport step01Icon from '../../assets/images/process/step-01.svg';\nimport step02Icon from '../../assets/images/process/step-02.svg';\nimport step03Icon from '../../assets/images/process/step-03.svg';\nimport step04Icon from '../../assets/images/process/step-04.svg';\nimport step05Icon from '../../assets/images/process/step-05.svg';\nimport step06Icon from '../../assets/images/process/step-06.svg';\n// Import process main image for optimization\nimport processImage from '../../../public/images/Landing/ProcessImage.jpg';\n\nconst { t } = useI18n(Astro.url);\n\nconst steps = [\n  {\n    number: t.process.steps['1'].number,\n    title: t.process.steps['1'].title,\n    description: t.process.steps['1'].description,\n    icon: step01Icon,\n  },\n  {\n    number: t.process.steps['2'].number,\n    title: t.process.steps['2'].title,\n    description: t.process.steps['2'].description,\n    icon: step02Icon,\n  },\n  {\n    number: t.process.steps['3'].number,\n    title: t.process.steps['3'].title,\n    description: t.process.steps['3'].description,\n    icon: step03Icon,\n  },\n  {\n    number: t.process.steps['4'].number,\n    title: t.process.steps['4'].title,\n    description: t.process.steps['4'].description,\n    icon: step04Icon,\n  },\n  {\n    number: t.process.steps['5'].number,\n    title: t.process.steps['5'].title,\n    description: t.process.steps['5'].description,\n    icon: step05Icon,\n  },\n  {\n    number: t.process.steps['6'].number,\n    title: t.process.steps['6'].title,\n    description: t.process.steps['6'].description,\n    icon: step06Icon,\n  },\n];\n---"
}

Now let me update the image in the Process section to use Astro's Image component:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Process.astro",
  "old_string": "    <div class=\"grid lg:grid-cols-2 gap-8 lg:gap-12\">\n      <!-- Left Column: Main Image + Description -->\n      <div>\n        <div class=\"aspect-[3/4] rounded-2xl overflow-hidden shadow-xl mb-6\">\n          <img\n            src=\"/images/Landing/ProcessImage.jpg\"\n            alt={t.process.craftingAlt}\n            class=\"w-full h-full object-cover\"\n          />\n        </div>",
  "new_string": "    <div class=\"grid lg:grid-cols-2 gap-8 lg:gap-12\">\n      <!-- Left Column: Main Image + Description -->\n      <div>\n        <div class=\"aspect-[3/4] rounded-2xl overflow-hidden shadow-xl mb-6\">\n          <Image\n            src={processImage}\n            alt={t.process.craftingAlt}\n            class=\"w-full h-full object-cover\"\n            widths={[400, 600, 800]}\n            sizes=\"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px\"\n            format=\"webp\"\n            quality={80}\n            loading=\"lazy\"\n            decoding=\"async\"\n          />\n        </div>"
}

Now I need to update the ProcessStep component to handle the imported image objects properly. Let me check and update it:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/ProcessStep.astro",
  "old_string": "---\ninterface Props {\n  number: string;\n  title: string;\n  description: string;\n  icon?: string;\n}\n\nconst { number, title, description, icon } = Astro.props;\n---\n\n<div class=\"flex gap-4 lg:gap-6 items-start\">\n  <div class=\"flex-shrink-0\">\n    <span class=\"text-2xl lg:text-3xl font-bold text-bmg-gold\">{number}</span>\n  </div>\n  <div class=\"flex-1\">\n    <h3 class=\"text-lg lg:text-xl font-semibold text-gray-900 mb-2\">{title}</h3>\n    <p class=\"text-gray-600 text-sm lg:text-base leading-relaxed\">{description}</p>\n  </div>\n  {icon && (\n    <div class=\"hidden lg:block flex-shrink-0\">\n      <div class=\"w-20 h-20 rounded-xl overflow-hidden bg-gray-200\">\n        <img\n          src={icon}\n          alt={`Step ${number} icon`}\n          class=\"w-full h-full object-cover\"\n        />\n      </div>\n    </div>\n  )}\n</div>",
  "new_string": "---\nimport type { ImageMetadata } from 'astro';\n\ninterface Props {\n  number: string;\n  title: string;\n  description: string;\n  icon?: ImageMetadata | string;\n}\n\nconst { number, title, description, icon } = Astro.props;\n\n// Get the src for the icon (handles both ImageMetadata objects and string URLs)\nconst iconSrc = typeof icon === 'string' ? icon : icon?.src;\n---\n\n<div class=\"flex gap-4 lg:gap-6 items-start\">\n  <div class=\"flex-shrink-0\">\n    <span class=\"text-2xl lg:text-3xl font-bold text-bmg-gold\">{number}</span>\n  </div>\n  <div class=\"flex-1\">\n    <h3 class=\"text-lg lg:text-xl font-semibold text-gray-900 mb-2\">{title}</h3>\n    <p class=\"text-gray-600 text-sm lg:text-base leading-relaxed\">{description}</p>\n  </div>\n  {iconSrc && (\n    <div class=\"hidden lg:block flex-shrink-0\">\n      <div class=\"w-20 h-20 rounded-xl overflow-hidden bg-gray-200\">\n        <img\n          src={iconSrc}\n          alt={`Step ${number} icon`}\n          class=\"w-full h-full object-cover\"\n          width=\"80\"\n          height=\"80\"\n          loading=\"lazy\"\n          decoding=\"async\"\n        />\n      </div>\n    </div>\n  )}\n</div>"
}

Now let me update the Showcase.astro component to use local SVG images instead of external unsplash URLs. This component is trickier because it uses JavaScript to dynamically switch between models:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "old_string": "---\nimport Button from '../ui/Button.astro';\nimport { useI18n } from '../../i18n/utils';\n\nconst { t } = useI18n(Astro.url);\n\ninterface ShowcaseModel {\n  id: string;\n  name: string;\n  description: string;\n  glbPath: string;\n  thumbnailPath: string;\n}\n\nconst models: ShowcaseModel[] = [\n  {\n    id: '1',\n    name: t.showcase.models['1'].name,\n    description: t.showcase.models['1'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=200&h=200&fit=crop',\n  },\n  {\n    id: '2',\n    name: t.showcase.models['2'].name,\n    description: t.showcase.models['2'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=200&h=200&fit=crop',\n  },\n  {\n    id: '3',\n    name: t.showcase.models['3'].name,\n    description: t.showcase.models['3'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=200&h=200&fit=crop',\n  },\n];\n---",
  "new_string": "---\nimport Button from '../ui/Button.astro';\nimport { useI18n } from '../../i18n/utils';\n\n// Import local showcase thumbnail images\nimport thumbnail1 from '../../assets/images/showcase/thumbnail-1.svg';\nimport thumbnail2 from '../../assets/images/showcase/thumbnail-2.svg';\nimport thumbnail3 from '../../assets/images/showcase/thumbnail-3.svg';\n\nconst { t } = useI18n(Astro.url);\n\ninterface ShowcaseModel {\n  id: string;\n  name: string;\n  description: string;\n  glbPath: string;\n  thumbnailPath: string;\n}\n\nconst models: ShowcaseModel[] = [\n  {\n    id: '1',\n    name: t.showcase.models['1'].name,\n    description: t.showcase.models['1'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: thumbnail1.src,\n  },\n  {\n    id: '2',\n    name: t.showcase.models['2'].name,\n    description: t.showcase.models['2'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: thumbnail2.src,\n  },\n  {\n    id: '3',\n    name: t.showcase.models['3'].name,\n    description: t.showcase.models['3'].description,\n    glbPath: '/models/placeholder.glb',\n    thumbnailPath: thumbnail3.src,\n  },\n];\n---"
}

Now let me also update the thumbnail img element in Showcase.astro to include proper loading and decoding attributes:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "old_string": "            <img\n              src={model.thumbnailPath}\n              alt={model.name}\n              class=\"w-full h-full object-cover hover:scale-110 transition-transform duration-300\"\n            />",
  "new_string": "            <img\n              src={model.thumbnailPath}\n              alt={model.name}\n              width=\"160\"\n              height=\"160\"\n              loading=\"lazy\"\n              decoding=\"async\"\n              class=\"w-full h-full object-cover hover:scale-110 transition-transform duration-300\"\n            />"
}

Now let me verify the build works correctly:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | head -100",
  "description": "Build to verify changes",
  "timeout": 120000
}

The build succeeded and we can see the image optimization is working. The ProcessImage.jpg was optimized:
- Original: 5802kB (5.8MB)
- Generated WebP variants: 39kB, 81kB, 128kB, 546kB (different sizes for responsive images)

Let me verify that the external URLs are no longer present in the codebase:

🔧 Tool: Grep
Input: {
  "pattern": "unsplash\\.com|placehold\\.co",
  "path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src"
}

All external placeholder URLs have been removed from the source files. Let me also check the final build output to make sure everything is in order:

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/benedictboisclair/Projects/BMG-Landing-v2/dist/client/_astro/ | grep -E \"\\.webp|\\.svg\" | head -20",
  "description": "Check optimized images in dist"
}

All images are properly included in the build output:
- 4 optimized WebP variants of ProcessImage (40KB to 559KB for different screen sizes)
- 6 process step SVG icons
- 3 showcase thumbnail SVGs

Let me also verify the final files to ensure everything is in order:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Process.astro"
}

All the components are correctly updated. Let me list out the files that were created and modified:

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/showcase/ /Users/benedictboisclair/Projects/BMG-Landing-v2/src/assets/images/process/",
  "description": "List created asset files"
}

<summary>
## Summary: Replace placeholder image services with self-hosted or optimized image assets

### Changes Implemented
- Removed all external CDN URLs (unsplash.com, placehold.co) from the codebase
- Created self-hosted SVG placeholder images for showcase thumbnails (3 granite/marble texture SVGs)
- Created self-hosted SVG icons for process steps (6 numbered step icons)
- Implemented Astro's `Image` component for the Process section main image with:
  - Automatic WebP format conversion
  - Responsive image generation (widths: 400px, 600px, 800px)
  - Lazy loading and async decoding
  - Quality optimization (80%)
  - Proper `sizes` attribute for responsive behavior
- Updated ProcessStep component to handle both ImageMetadata objects and string URLs
- Added proper `width`, `height`, `loading="lazy"`, and `decoding="async"` attributes to all images

### Files Modified
- `src/components/sections/Showcase.astro` - Replaced unsplash URLs with local SVG imports
- `src/components/sections/Process.astro` - Replaced placehold.co URLs with local SVG imports and used Astro Image component
- `src/components/ui/ProcessStep.astro` - Updated to handle ImageMetadata type and added optimization attributes

### Files Created
- `src/assets/images/showcase/thumbnail-1.svg` - Dark granite texture placeholder
- `src/assets/images/showcase/thumbnail-2.svg` - Light marble texture placeholder  
- `src/assets/images/showcase/thumbnail-3.svg` - Brown granite texture placeholder
- `src/assets/images/process/step-01.svg` through `step-06.svg` - Numbered step icons

### Notes for Developer
- Build verified successful with image optimization working (ProcessImage reduced from 5.8MB to 40-560KB WebP variants)
- All external placeholder URLs have been removed from the source code
- The placeholder SVGs are designed to be easily replaced with actual product images when available
- The process step SVGs use simple numbered designs - these can be replaced with custom icons matching the branding
- Astro automatically generates responsive WebP images at build time for the Process section main image
</summary>