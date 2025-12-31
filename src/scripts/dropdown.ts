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
