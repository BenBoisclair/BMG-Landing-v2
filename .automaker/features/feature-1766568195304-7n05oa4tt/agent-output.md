
🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "in_progress",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Review Header component scroll event listener",
      "status": "pending",
      "activeForm": "Reviewing Header component"
    },
    {
      "content": "Review Showcase component resize event listener",
      "status": "pending",
      "activeForm": "Reviewing Showcase component"
    },
    {
      "content": "Review Testimonials component resize event listener",
      "status": "pending",
      "activeForm": "Reviewing Testimonials component"
    },
    {
      "content": "Implement debouncing utility and apply to event listeners",
      "status": "pending",
      "activeForm": "Implementing debouncing and cleanup"
    }
  ]
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.{tsx,ts,jsx,js}"
}

🔧 Tool: Grep
Input: {
  "pattern": "Header",
  "glob": "*.{tsx,ts,jsx,js}"
}

🔧 Tool: Grep
Input: {
  "pattern": "handleHeaderScroll|scroll.*event|addEventListener.*scroll"
}

🔧 Tool: Grep
Input: {
  "pattern": "Showcase|Testimonials",
  "glob": "*.{tsx,ts,jsx,js}"
}

Let me explore the source code structure more specifically:

🔧 Tool: Glob
Input: {
  "pattern": "src/**/*.{tsx,ts,jsx,js,astro}"
}

Now let me read the relevant files - Header script, Showcase component, and Testimonials component:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Testimonials.astro"
}

Now let me check if there's an existing utilities folder or debounce function already in the project:

🔧 Tool: Glob
Input: {
  "pattern": "src/utils/**/*.ts"
}

🔧 Tool: Grep
Input: {
  "pattern": "debounce|throttle"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/layout/Header.astro"
}

Now I have a clear picture of what needs to be done. Let me update my todo list and start implementing:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Create debounce utility function",
      "status": "in_progress",
      "activeForm": "Creating debounce utility function"
    },
    {
      "content": "Add debouncing to Header scroll event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Header scroll event"
    },
    {
      "content": "Add debouncing to Showcase resize event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Showcase resize event"
    },
    {
      "content": "Add debouncing to Testimonials resize event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Testimonials resize event"
    }
  ]
}

Now let me create the debounce utility:

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/utils/debounce.ts",
  "content": "/**\n * Debounce Utility\n * Delays execution of a function until after a specified wait time\n * has elapsed since the last time it was invoked.\n */\n\n/**\n * Creates a debounced version of a function that delays its execution\n * until after `wait` milliseconds have elapsed since the last call.\n *\n * @param func - The function to debounce\n * @param wait - The number of milliseconds to delay (default: 150ms)\n * @returns A debounced version of the function with a cancel method\n *\n * @example\n * const debouncedResize = debounce(() => {\n *   console.log('Window resized');\n * }, 200);\n *\n * window.addEventListener('resize', debouncedResize);\n *\n * // To cleanup:\n * window.removeEventListener('resize', debouncedResize);\n * debouncedResize.cancel();\n */\nexport function debounce<T extends (...args: unknown[]) => void>(\n  func: T,\n  wait: number = 150\n): T & { cancel: () => void } {\n  let timeoutId: ReturnType<typeof setTimeout> | null = null;\n\n  const debounced = function (this: unknown, ...args: Parameters<T>): void {\n    // Clear existing timeout\n    if (timeoutId !== null) {\n      clearTimeout(timeoutId);\n    }\n\n    // Set new timeout\n    timeoutId = setTimeout(() => {\n      func.apply(this, args);\n      timeoutId = null;\n    }, wait);\n  } as T & { cancel: () => void };\n\n  // Add cancel method for cleanup\n  debounced.cancel = (): void => {\n    if (timeoutId !== null) {\n      clearTimeout(timeoutId);\n      timeoutId = null;\n    }\n  };\n\n  return debounced;\n}\n\n/**\n * Creates a throttled version of a function that only executes\n * at most once per `wait` milliseconds.\n *\n * Unlike debounce, throttle guarantees the function runs at regular intervals\n * during continuous events, making it better for scroll handlers.\n *\n * @param func - The function to throttle\n * @param wait - The minimum time between function calls (default: 100ms)\n * @returns A throttled version of the function with a cancel method\n *\n * @example\n * const throttledScroll = throttle(() => {\n *   console.log('Scroll position:', window.scrollY);\n * }, 100);\n *\n * window.addEventListener('scroll', throttledScroll);\n *\n * // To cleanup:\n * window.removeEventListener('scroll', throttledScroll);\n * throttledScroll.cancel();\n */\nexport function throttle<T extends (...args: unknown[]) => void>(\n  func: T,\n  wait: number = 100\n): T & { cancel: () => void } {\n  let lastTime = 0;\n  let timeoutId: ReturnType<typeof setTimeout> | null = null;\n\n  const throttled = function (this: unknown, ...args: Parameters<T>): void {\n    const now = Date.now();\n    const remaining = wait - (now - lastTime);\n\n    if (remaining <= 0 || remaining > wait) {\n      // Clear any pending timeout\n      if (timeoutId !== null) {\n        clearTimeout(timeoutId);\n        timeoutId = null;\n      }\n\n      lastTime = now;\n      func.apply(this, args);\n    } else if (timeoutId === null) {\n      // Schedule a trailing call\n      timeoutId = setTimeout(() => {\n        lastTime = Date.now();\n        timeoutId = null;\n        func.apply(this, args);\n      }, remaining);\n    }\n  } as T & { cancel: () => void };\n\n  // Add cancel method for cleanup\n  throttled.cancel = (): void => {\n    if (timeoutId !== null) {\n      clearTimeout(timeoutId);\n      timeoutId = null;\n    }\n    lastTime = 0;\n  };\n\n  return throttled;\n}\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Create debounce utility function",
      "status": "completed",
      "activeForm": "Creating debounce utility function"
    },
    {
      "content": "Add throttling to Header scroll event listener",
      "status": "in_progress",
      "activeForm": "Adding throttling to Header scroll event"
    },
    {
      "content": "Add debouncing to Showcase resize event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Showcase resize event"
    },
    {
      "content": "Add debouncing to Testimonials resize event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Testimonials resize event"
    }
  ]
}

Now let me update the header.ts to use throttling for the scroll event (throttle is better for scroll events as it provides smoother visual feedback compared to debounce):

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts",
  "old_string": "/**\n * Header Module\n * Handles all header-related functionality including:\n * - Mobile menu toggle\n * - Smooth scrolling for anchor links\n * - Language dropdowns (desktop and mobile)\n * - Header background color change on scroll\n */\n\nimport { createDropdown, type DropdownInstance } from './dropdown';",
  "new_string": "/**\n * Header Module\n * Handles all header-related functionality including:\n * - Mobile menu toggle\n * - Smooth scrolling for anchor links\n * - Language dropdowns (desktop and mobile)\n * - Header background color change on scroll\n */\n\nimport { createDropdown, type DropdownInstance } from './dropdown';\nimport { throttle } from '../utils/debounce';"
}

Now let me update the scroll behavior section to use throttling and store a reference for cleanup:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts",
  "old_string": "let dropdownInstances: DropdownInstance[] = [];",
  "new_string": "let dropdownInstances: DropdownInstance[] = [];\nlet throttledScrollHandler: ((() => void) & { cancel: () => void }) | null = null;"
}

Now let me update the initScrollBehavior function to use throttling:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts",
  "old_string": "/**\n * Initializes scroll-based header background changes\n */\nfunction initScrollBehavior(): void {\n  // Run on scroll\n  window.addEventListener('scroll', updateHeaderBackground);\n\n  // Set initial state\n  updateHeaderBackground();\n}",
  "new_string": "/**\n * Initializes scroll-based header background changes\n * Uses throttling to limit scroll event handler execution for better performance\n */\nfunction initScrollBehavior(): void {\n  // Create throttled version of the scroll handler (100ms interval)\n  // Throttle is preferred over debounce for scroll events as it provides\n  // smoother visual feedback while still limiting execution frequency\n  throttledScrollHandler = throttle(updateHeaderBackground, 100);\n\n  // Run on scroll with throttling\n  window.addEventListener('scroll', throttledScrollHandler);\n\n  // Set initial state immediately (no throttle)\n  updateHeaderBackground();\n}"
}

Now let me update the destroyHeader function to properly clean up the throttled handler:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts",
  "old_string": "/**\n * Cleanup function - removes event listeners and dropdown instances\n * Useful for SPA navigation or component unmounting\n */\nexport function destroyHeader(): void {\n  // Cleanup dropdown instances\n  dropdownInstances.forEach(instance => instance.destroy());\n  dropdownInstances = [];\n\n  // Remove scroll listener\n  window.removeEventListener('scroll', updateHeaderBackground);\n}",
  "new_string": "/**\n * Cleanup function - removes event listeners and dropdown instances\n * Useful for SPA navigation or component unmounting\n */\nexport function destroyHeader(): void {\n  // Cleanup dropdown instances\n  dropdownInstances.forEach(instance => instance.destroy());\n  dropdownInstances = [];\n\n  // Remove scroll listener and cancel any pending throttled calls\n  if (throttledScrollHandler) {\n    window.removeEventListener('scroll', throttledScrollHandler);\n    throttledScrollHandler.cancel();\n    throttledScrollHandler = null;\n  }\n}"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Create debounce utility function",
      "status": "completed",
      "activeForm": "Creating debounce utility function"
    },
    {
      "content": "Add throttling to Header scroll event listener",
      "status": "completed",
      "activeForm": "Adding throttling to Header scroll event"
    },
    {
      "content": "Add debouncing to Showcase resize event listener",
      "status": "in_progress",
      "activeForm": "Adding debouncing to Showcase resize event"
    },
    {
      "content": "Add debouncing to Testimonials resize event listener",
      "status": "pending",
      "activeForm": "Adding debouncing to Testimonials resize event"
    }
  ]
}

Now let me update the Showcase component to add debouncing to the resize event:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "offset": 125,
  "limit": 100
}

Now I need to update the Showcase component's script section to add debouncing. I'll add the import and create a debounced version of the resize handler:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "old_string": "<script>\n  // State to track if model-viewer has been loaded\n  let modelViewerLoaded = false;\n  let modelViewerLoading = false;\n\n  // Responsive camera distance calculation\n  function getResponsiveCameraDistance(): string {",
  "new_string": "<script>\n  import { debounce } from '../../utils/debounce';\n\n  // State to track if model-viewer has been loaded\n  let modelViewerLoaded = false;\n  let modelViewerLoading = false;\n\n  // Debounced resize handler reference for cleanup\n  let debouncedResizeHandler: ((() => void) & { cancel: () => void }) | null = null;\n\n  // Responsive camera distance calculation\n  function getResponsiveCameraDistance(): string {"
}

Now let me update the resize event listener to use the debounced version:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "old_string": "        // Update camera orbit for responsive sizing\n          updateCameraOrbit();\n        }, { once: true });\n\n        // Update on resize\n        window.addEventListener('resize', updateCameraOrbit);\n      }",
  "new_string": "        // Update camera orbit for responsive sizing\n          updateCameraOrbit();\n        }, { once: true });\n\n        // Update on resize with debouncing to prevent excessive recalculations\n        // Using 200ms delay as resize events fire rapidly during window resizing\n        debouncedResizeHandler = debounce(updateCameraOrbit, 200);\n        window.addEventListener('resize', debouncedResizeHandler);\n      }"
}

Now I need to add cleanup for the resize handler when the component is unmounted. Let me read the end of the Showcase script to see the best place to add cleanup:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "offset": 310,
  "limit": 50
}

Now let me add cleanup logic to the Showcase component:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Showcase.astro",
  "old_string": "  // Initialize lazy loading\n  setupLazyLoading();\n  setupInteractionTriggers();\n</script>",
  "new_string": "  // Initialize lazy loading\n  setupLazyLoading();\n  setupInteractionTriggers();\n\n  // Cleanup function for when component is unmounted (SPA navigation)\n  function cleanup() {\n    if (debouncedResizeHandler) {\n      window.removeEventListener('resize', debouncedResizeHandler);\n      debouncedResizeHandler.cancel();\n      debouncedResizeHandler = null;\n    }\n  }\n\n  // Listen for Astro page transitions to cleanup\n  document.addEventListener('astro:before-swap', cleanup, { once: true });\n</script>"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Create debounce utility function",
      "status": "completed",
      "activeForm": "Creating debounce utility function"
    },
    {
      "content": "Add throttling to Header scroll event listener",
      "status": "completed",
      "activeForm": "Adding throttling to Header scroll event"
    },
    {
      "content": "Add debouncing to Showcase resize event listener",
      "status": "completed",
      "activeForm": "Adding debouncing to Showcase resize event"
    },
    {
      "content": "Add debouncing to Testimonials resize event listener",
      "status": "in_progress",
      "activeForm": "Adding debouncing to Testimonials resize event"
    }
  ]
}

Now let me update the Testimonials component to add debouncing to its resize event listener:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Testimonials.astro",
  "old_string": "<script>\n  document.addEventListener('DOMContentLoaded', () => {\n    const track = document.getElementById('testimonials-track') as HTMLElement;\n    const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;\n    const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;\n\n    if (!track || !prevBtn || !nextBtn) return;",
  "new_string": "<script>\n  import { debounce } from '../../utils/debounce';\n\n  document.addEventListener('DOMContentLoaded', () => {\n    const track = document.getElementById('testimonials-track') as HTMLElement;\n    const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;\n    const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;\n\n    if (!track || !prevBtn || !nextBtn) return;\n\n    // Debounced resize handler reference for cleanup\n    let debouncedResizeHandler: ((() => void) & { cancel: () => void }) | null = null;"
}

Now let me update the resize event handler to use debouncing:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Testimonials.astro",
  "old_string": "    // Handle window resize\n    window.addEventListener('resize', () => {\n      updateCarousel();\n    });\n\n    // Initial update\n    updateCarousel();\n  });\n</script>",
  "new_string": "    // Handle window resize with debouncing to prevent excessive recalculations\n    // Using 200ms delay as resize events fire rapidly during window resizing\n    debouncedResizeHandler = debounce(updateCarousel, 200);\n    window.addEventListener('resize', debouncedResizeHandler);\n\n    // Initial update\n    updateCarousel();\n\n    // Cleanup function for when component is unmounted (SPA navigation)\n    function cleanup() {\n      if (debouncedResizeHandler) {\n        window.removeEventListener('resize', debouncedResizeHandler);\n        debouncedResizeHandler.cancel();\n        debouncedResizeHandler = null;\n      }\n    }\n\n    // Listen for Astro page transitions to cleanup\n    document.addEventListener('astro:before-swap', cleanup, { once: true });\n  });\n</script>"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore the codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring the codebase structure"
    },
    {
      "content": "Create debounce utility function",
      "status": "completed",
      "activeForm": "Creating debounce utility function"
    },
    {
      "content": "Add throttling to Header scroll event listener",
      "status": "completed",
      "activeForm": "Adding throttling to Header scroll event"
    },
    {
      "content": "Add debouncing to Showcase resize event listener",
      "status": "completed",
      "activeForm": "Adding debouncing to Showcase resize event"
    },
    {
      "content": "Add debouncing to Testimonials resize event listener",
      "status": "completed",
      "activeForm": "Adding debouncing to Testimonials resize event"
    }
  ]
}

Now let me verify that all the changes are correctly in place by reading the updated files:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/scripts/header.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/utils/debounce.ts"
}

Let me verify the changes in the Showcase and Testimonials components as well:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit --skipLibCheck 2>&1 | head -50",
  "description": "Check TypeScript compilation"
}

TypeScript compilation passes. Let me also run the build to make sure everything works correctly:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | tail -30",
  "description": "Run build to verify changes",
  "timeout": 120000
}

The build completes successfully. All changes are working correctly. Let me provide a summary of the implementation:

<summary>
## Summary: Implement proper event listener cleanup and debouncing for scroll and resize events

### Changes Implemented
- Created a new utility file `src/utils/debounce.ts` with both `debounce` and `throttle` functions, each with proper TypeScript typing and a `cancel()` method for cleanup
- Added throttling (100ms) to the Header component's scroll event listener (`handleHeaderScroll`) for smoother performance during scrolling
- Added proper cleanup in `destroyHeader()` to remove the scroll listener and cancel pending throttled calls
- Added debouncing (200ms) to the Showcase component's resize event listener that recalculates camera orbit
- Added cleanup logic for Showcase component using Astro's `astro:before-swap` event for SPA navigation
- Added debouncing (200ms) to the Testimonials component's resize event listener that recalculates visible slides
- Added cleanup logic for Testimonials component using Astro's `astro:before-swap` event

### Files Modified
- `src/utils/debounce.ts` (NEW) - Debounce and throttle utility functions
- `src/scripts/header.ts` - Added throttling to scroll event listener with proper cleanup
- `src/components/sections/Showcase.astro` - Added debouncing to resize event listener with cleanup
- `src/components/sections/Testimonials.astro` - Added debouncing to resize event listener with cleanup

### Notes for Developer
- **Throttle vs Debounce**: Throttle is used for scroll events (provides smoother visual feedback during continuous scrolling), while debounce is used for resize events (batches multiple resize events into one at the end)
- **Timing values**: 100ms for scroll throttling, 200ms for resize debouncing - these can be adjusted based on performance needs
- **Cleanup**: All event listeners are properly cleaned up using Astro's `astro:before-swap` lifecycle event to prevent memory leaks during SPA navigation
- **Build verified**: The project builds successfully with all TypeScript checks passing
</summary>