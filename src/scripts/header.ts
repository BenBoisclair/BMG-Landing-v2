/**
 * Header Module
 * Handles all header-related functionality including:
 * - Mobile menu toggle
 * - Smooth scrolling for anchor links
 * - Language dropdowns (desktop and mobile)
 * - Header background color change on scroll
 */

import { createDropdown, type DropdownInstance } from './dropdown';
import { throttle } from '../utils/debounce';

// Element IDs - centralized for easy maintenance
const ELEMENTS = {
  header: 'main-header',
  heroSection: 'home',
  projectHeroSection: 'project-hero',
  mobileMenuButton: 'mobile-menu-button',
  mobileMenu: 'mobile-menu',
  desktopLangButton: 'language-dropdown-button',
  desktopLangMenu: 'language-dropdown-menu',
  mobileLangButton: 'mobile-language-dropdown-button',
  mobileLangMenu: 'mobile-language-dropdown-menu',
} as const;

// CSS classes for header states
const HEADER_CLASSES = {
  transparent: 'bg-transparent',
  scrolled: 'bg-brand-primary',
} as const;

let dropdownInstances: DropdownInstance[] = [];
let throttledScrollHandler: ((() => void) & { cancel: () => void }) | null = null;

/**
 * Initializes the mobile menu toggle functionality
 */
function initMobileMenu(): void {
  const menuButton = document.getElementById(ELEMENTS.mobileMenuButton);
  const mobileMenu = document.getElementById(ELEMENTS.mobileMenu);

  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking navigation links (except language dropdown links)
  mobileMenu.querySelectorAll('a:not([id^="mobile-language"])').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/**
 * Closes the mobile menu if it's open
 */
function closeMobileMenu(): void {
  const mobileMenu = document.getElementById(ELEMENTS.mobileMenu);
  mobileMenu?.classList.add('hidden');
}

/**
 * Handles smooth scrolling for anchor links
 */
function handleAnchorClick(e: Event): void {
  const link = e.currentTarget as HTMLAnchorElement;
  const href = link.getAttribute('href');

  if (href && href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update URL hash without jumping
      history.pushState(null, '', href);

      // Close mobile menu if open
      closeMobileMenu();
    }
  }
}

/**
 * Initializes smooth scrolling for all anchor links in the header
 */
function initSmoothScrolling(): void {
  const header = document.getElementById(ELEMENTS.header);
  if (!header) return;

  header.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });
}

/**
 * Initializes language dropdown functionality for both desktop and mobile
 */
function initLanguageDropdowns(): void {
  // Desktop language dropdown
  const desktopDropdown = createDropdown({
    buttonId: ELEMENTS.desktopLangButton,
    menuId: ELEMENTS.desktopLangMenu,
    closeOnOutsideClick: true,
  });

  // Mobile language dropdown (no outside click close - handled by mobile menu)
  const mobileDropdown = createDropdown({
    buttonId: ELEMENTS.mobileLangButton,
    menuId: ELEMENTS.mobileLangMenu,
    closeOnOutsideClick: false,
  });

  // Store instances for potential cleanup
  if (desktopDropdown) dropdownInstances.push(desktopDropdown);
  if (mobileDropdown) dropdownInstances.push(mobileDropdown);
}

/**
 * Updates header background color based on scroll position
 * Adds solid background when scrolled past hero section
 * Supports different hero sections based on page type (landing vs project)
 */
function updateHeaderBackground(): void {
  const header = document.getElementById(ELEMENTS.header);
  if (!header) return;

  // Determine which hero section to use based on page type
  const pageType = header.dataset.pageType || 'landing';
  const heroId = pageType === 'project' ? ELEMENTS.projectHeroSection : ELEMENTS.heroSection;
  const heroSection = document.getElementById(heroId);

  // If no hero section exists, keep solid background
  if (!heroSection) {
    header.classList.remove(HEADER_CLASSES.transparent);
    header.classList.add(HEADER_CLASSES.scrolled);
    return;
  }

  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition > heroBottom) {
    header.classList.remove(HEADER_CLASSES.transparent);
    header.classList.add(HEADER_CLASSES.scrolled);
  } else {
    header.classList.remove(HEADER_CLASSES.scrolled);
    header.classList.add(HEADER_CLASSES.transparent);
  }
}

/**
 * Initializes scroll-based header background changes
 * Uses throttling to limit scroll event handler execution for better performance
 */
function initScrollBehavior(): void {
  // Create throttled version of the scroll handler (100ms interval)
  // Throttle is preferred over debounce for scroll events as it provides
  // smoother visual feedback while still limiting execution frequency
  throttledScrollHandler = throttle(updateHeaderBackground, 100);

  // Run on scroll with throttling
  window.addEventListener('scroll', throttledScrollHandler);

  // Set initial state immediately (no throttle)
  updateHeaderBackground();
}

/**
 * Main initialization function - sets up all header functionality
 * Should be called when the DOM is ready
 */
export function initHeader(): void {
  initMobileMenu();
  initSmoothScrolling();
  initLanguageDropdowns();
  initScrollBehavior();
}

/**
 * Cleanup function - removes event listeners and dropdown instances
 * Useful for SPA navigation or component unmounting
 */
export function destroyHeader(): void {
  // Cleanup dropdown instances
  dropdownInstances.forEach(instance => instance.destroy());
  dropdownInstances = [];

  // Remove scroll listener and cancel any pending throttled calls
  if (throttledScrollHandler) {
    window.removeEventListener('scroll', throttledScrollHandler);
    throttledScrollHandler.cancel();
    throttledScrollHandler = null;
  }
}

// Auto-initialize when this script is loaded
// This works with Astro's client-side script handling
initHeader();
