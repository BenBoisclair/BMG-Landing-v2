/**
 * Custom Select Component Script
 * Handles desktop dropdown and mobile bottom sheet interactions
 */

const MOBILE_BREAKPOINT = 640;

function isMobile(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

let savedScrollY = 0;

/** Lock body scroll (with iOS Safari fix) */
function lockScroll(): void {
  savedScrollY = window.scrollY;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${savedScrollY}px`;
}

/** Unlock body scroll and restore position */
function unlockScroll(): void {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scrollTo(0, savedScrollY);
}

function initSelect(container: HTMLElement): void {
  const hiddenInput = container.querySelector<HTMLInputElement>('[data-input]');
  const trigger = container.querySelector<HTMLButtonElement>('[data-select-trigger]');
  const label = container.querySelector<HTMLSpanElement>('[data-select-label]');
  const chevron = container.querySelector<SVGElement>('[data-select-chevron]');
  const dropdown = container.querySelector<HTMLUListElement>('[data-select-dropdown]');
  const sheet = container.querySelector<HTMLDivElement>('[data-select-sheet]');
  const sheetBackdrop = container.querySelector<HTMLDivElement>('[data-select-sheet-backdrop]');
  const sheetClose = container.querySelector<HTMLButtonElement>('[data-select-sheet-close]');
  const sheetPanel = container.querySelector<HTMLDivElement>('[data-select-sheet-panel]');
  const dropdownOptions = container.querySelectorAll<HTMLLIElement>('[data-select-option]');
  const sheetOptions = container.querySelectorAll<HTMLLIElement>('[data-select-sheet-option]');

  if (!hiddenInput || !trigger || !label || !dropdown || !sheet) return;

  const placeholderText = label.textContent || 'Please Select...';
  let isOpen = false;
  let focusedIndex = -1;

  function setValue(value: string, optionLabel: string): void {
    hiddenInput!.value = value;
    label!.textContent = optionLabel;
    label!.classList.remove('text-gray-500');
    label!.classList.add('text-gray-900');

    // Mark selected in dropdown
    dropdownOptions.forEach((opt) => {
      opt.classList.toggle('is-selected', opt.dataset.value === value);
    });

    // Mark selected in sheet + show/hide checkmark
    sheetOptions.forEach((opt) => {
      const isSelected = opt.dataset.value === value;
      opt.classList.toggle('is-selected', isSelected);
      const check = opt.querySelector('[data-check-icon]');
      if (check) {
        check.classList.toggle('hidden', !isSelected);
      }
    });

    // Dispatch events for validation
    hiddenInput!.dispatchEvent(new Event('input', { bubbles: true }));
    hiddenInput!.dispatchEvent(new Event('change', { bubbles: true }));
    hiddenInput!.dispatchEvent(new Event('blur', { bubbles: true }));
  }

  function openDropdown(): void {
    if (isOpen) return;
    isOpen = true;
    focusedIndex = -1;

    if (isMobile()) {
      // Mobile: show bottom sheet
      sheet!.classList.remove('hidden');
      // Force reflow before adding open class for transition
      void sheetPanel?.offsetHeight;
      sheet!.classList.add('open');
      lockScroll();
    } else {
      // Desktop: show dropdown
      dropdown!.classList.remove('hidden');
      // Force reflow
      void dropdown!.offsetHeight;
      dropdown!.classList.add('open');
      chevron?.classList.add('rotate-180');
    }

    trigger!.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown(): void {
    if (!isOpen) return;
    isOpen = false;
    focusedIndex = -1;

    if (sheet!.classList.contains('open')) {
      // Close mobile sheet
      sheet!.classList.remove('open');
      unlockScroll();
      // Wait for animation to finish before hiding
      setTimeout(() => {
        if (!isOpen) {
          sheet!.classList.add('hidden');
        }
      }, 300);
    }

    if (dropdown!.classList.contains('open')) {
      // Close desktop dropdown
      dropdown!.classList.remove('open');
      setTimeout(() => {
        if (!isOpen) {
          dropdown!.classList.add('hidden');
        }
      }, 150);
      chevron?.classList.remove('rotate-180');
    }

    trigger!.setAttribute('aria-expanded', 'false');
  }

  function setFocusedOption(index: number): void {
    const options = Array.from(dropdownOptions);
    if (index < 0 || index >= options.length) return;

    // Remove previous focus
    options.forEach((opt) => opt.classList.remove('is-focused'));

    focusedIndex = index;
    options[focusedIndex].classList.add('is-focused');
    options[focusedIndex].scrollIntoView({ block: 'nearest' });
  }

  // Trigger click
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  // Desktop dropdown option click
  dropdownOptions.forEach((opt, i) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = opt.dataset.value || '';
      const optLabel = opt.textContent?.trim() || '';
      setValue(value, optLabel);
      closeDropdown();
      trigger.focus();
    });
  });

  // Mobile sheet option click
  sheetOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = opt.dataset.value || '';
      const optLabel = opt.querySelector('span')?.textContent?.trim() || opt.textContent?.trim() || '';
      setValue(value, optLabel);
      closeDropdown();
    });
  });

  // Sheet backdrop click
  sheetBackdrop?.addEventListener('click', () => {
    closeDropdown();
  });

  // Sheet close button
  sheetClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDropdown();
  });

  // Keyboard navigation
  trigger.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'Down':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        }
        setFocusedOption(focusedIndex < dropdownOptions.length - 1 ? focusedIndex + 1 : 0);
        break;
      case 'ArrowUp':
      case 'Up':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        }
        setFocusedOption(focusedIndex > 0 ? focusedIndex - 1 : dropdownOptions.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const opt = dropdownOptions[focusedIndex];
          const value = opt.dataset.value || '';
          const optLabel = opt.textContent?.trim() || '';
          setValue(value, optLabel);
          closeDropdown();
        } else if (!isOpen) {
          openDropdown();
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        trigger.focus();
        break;
      case 'Tab':
        if (isOpen) {
          closeDropdown();
        }
        break;
    }
  });

  // Outside click (desktop)
  document.addEventListener('click', (e) => {
    if (isOpen && !container.contains(e.target as Node)) {
      closeDropdown();
    }
  });

  // Escape key global (for mobile sheet)
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      closeDropdown();
    }
  });

  // Form reset support
  const form = container.closest('form');
  if (form) {
    form.addEventListener('reset', () => {
      // Defer to after the form reset completes
      setTimeout(() => {
        hiddenInput!.value = '';
        label!.textContent = placeholderText;
        label!.classList.add('text-gray-500');
        label!.classList.remove('text-gray-900');

        dropdownOptions.forEach((opt) => opt.classList.remove('is-selected'));
        sheetOptions.forEach((opt) => {
          opt.classList.remove('is-selected');
          const check = opt.querySelector('[data-check-icon]');
          if (check) check.classList.add('hidden');
        });
      }, 0);
    });
  }
}

export function initAllSelects(): void {
  const selects = document.querySelectorAll<HTMLElement>('[data-select]');
  selects.forEach((el) => initSelect(el));
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initAllSelects();
});
