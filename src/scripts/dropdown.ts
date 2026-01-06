/**
 * Dropdown Utility Module
 * Provides reusable dropdown functionality that can be used across components
 */

export interface DropdownConfig {
  buttonId: string;
  menuId: string;
  onToggle?: (isOpen: boolean) => void;
  closeOnOutsideClick?: boolean;
}

export interface DropdownInstance {
  toggle: () => void;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
  destroy: () => void;
}

/**
 * Creates a dropdown instance with toggle, open, close functionality
 * Handles accessibility attributes and optional chevron rotation
 */
export function createDropdown(config: DropdownConfig): DropdownInstance | null {
  const { buttonId, menuId, onToggle, closeOnOutsideClick = true } = config;

  const button = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  if (!button || !menu) {
    console.warn(`Dropdown: Could not find elements with IDs "${buttonId}" and/or "${menuId}"`);
    return null;
  }

  let isDropdownOpen = false;

  const updateState = (open: boolean) => {
    isDropdownOpen = open;

    // Update menu visibility
    if (open) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }

    // Update ARIA attributes
    button.setAttribute('aria-expanded', String(open));

    // Rotate chevron icon if present
    const svg = button.querySelector('svg');
    if (svg) {
      if (open) {
        svg.classList.add('rotate-180');
      } else {
        svg.classList.remove('rotate-180');
      }
    }

    // Call optional callback
    onToggle?.(open);
  };

  const toggle = () => updateState(!isDropdownOpen);
  const open = () => updateState(true);
  const close = () => updateState(false);
  const isOpen = () => isDropdownOpen;

  // Button click handler
  const handleButtonClick = (e: Event) => {
    e.stopPropagation();
    toggle();
  };

  // Outside click handler
  const handleOutsideClick = (e: Event) => {
    const target = e.target as Node;
    if (!button.contains(target) && !menu.contains(target)) {
      close();
    }
  };

  // Attach event listeners
  button.addEventListener('click', handleButtonClick);

  if (closeOnOutsideClick) {
    document.addEventListener('click', handleOutsideClick);
  }

  // Cleanup function
  const destroy = () => {
    button.removeEventListener('click', handleButtonClick);
    if (closeOnOutsideClick) {
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  return {
    toggle,
    open,
    close,
    isOpen,
    destroy,
  };
}

/**
 * Creates multiple dropdown instances from a configuration array
 */
export function createDropdowns(configs: DropdownConfig[]): DropdownInstance[] {
  return configs
    .map(config => createDropdown(config))
    .filter((instance): instance is DropdownInstance => instance !== null);
}

/**
 * Configuration for hover-triggered dropdowns
 */
export interface HoverDropdownConfig {
  containerId: string;      // Container element ID that wraps trigger and menu
  menuId: string;           // Dropdown menu ID
  closeDelay?: number;      // Delay before closing on mouse leave (default: 150ms)
  onToggle?: (isOpen: boolean) => void;
}

/**
 * Creates a hover-triggered dropdown instance
 * - Opens on mouseenter (desktop) or click (touch devices)
 * - Closes on mouseleave with configurable delay
 * - Falls back to click behavior on touch devices
 */
export function createHoverDropdown(config: HoverDropdownConfig): DropdownInstance | null {
  const { containerId, menuId, closeDelay = 150, onToggle } = config;

  const container = document.getElementById(containerId);
  const menu = document.getElementById(menuId);

  if (!container || !menu) {
    console.warn(`HoverDropdown: Could not find elements with IDs "${containerId}" and/or "${menuId}"`);
    return null;
  }

  // Find the trigger button/element within container
  const trigger = container.querySelector('[data-dropdown-trigger]') as HTMLElement ||
                  container.querySelector('button') as HTMLElement ||
                  container.firstElementChild as HTMLElement;

  let isDropdownOpen = false;
  let closeTimeout: ReturnType<typeof setTimeout> | null = null;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const updateState = (open: boolean) => {
    isDropdownOpen = open;

    // Update menu visibility with animation classes
    if (open) {
      menu.classList.remove('hidden');
      menu.classList.add('open');
    } else {
      menu.classList.remove('open');
      menu.classList.add('hidden');
    }

    // Update ARIA attributes
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(open));
    }

    // Rotate chevron icon if present
    const svg = trigger?.querySelector('svg');
    if (svg) {
      if (open) {
        svg.classList.add('rotate-180');
      } else {
        svg.classList.remove('rotate-180');
      }
    }

    // Call optional callback
    onToggle?.(open);
  };

  const toggle = () => updateState(!isDropdownOpen);
  const open = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    updateState(true);
  };
  const close = () => updateState(false);
  const closeWithDelay = () => {
    closeTimeout = setTimeout(() => {
      updateState(false);
    }, closeDelay);
  };
  const isOpen = () => isDropdownOpen;

  // Mouse event handlers (desktop)
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      open();
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      closeWithDelay();
    }
  };

  // Click handler (touch devices and fallback)
  const handleClick = (e: Event) => {
    if (isTouchDevice) {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    }
  };

  // Outside click handler for touch devices
  const handleOutsideClick = (e: Event) => {
    if (isTouchDevice && isDropdownOpen) {
      const target = e.target as Node;
      if (!container.contains(target)) {
        close();
      }
    }
  };

  // Attach event listeners
  container.addEventListener('mouseenter', handleMouseEnter);
  container.addEventListener('mouseleave', handleMouseLeave);

  if (trigger) {
    trigger.addEventListener('click', handleClick);
  }

  document.addEventListener('click', handleOutsideClick);

  // Cleanup function
  const destroy = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }
    container.removeEventListener('mouseenter', handleMouseEnter);
    container.removeEventListener('mouseleave', handleMouseLeave);
    if (trigger) {
      trigger.removeEventListener('click', handleClick);
    }
    document.removeEventListener('click', handleOutsideClick);
  };

  return {
    toggle,
    open,
    close,
    isOpen,
    destroy,
  };
}
