/**
 * Materials Filter State Management
 *
 * Handles client-side filtering of materials with:
 * - Search by name/description
 * - Tier filter (A++, A+, A)
 * - Category filter (semi-precious, luxury, classic)
 * - Color filter
 * - Stone type filter
 * - Origin filter
 * - URL state persistence
 */

interface FilterState {
  search: string;
  tiers: string[];
  categories: string[];
  colors: string[];
  stoneTypes: string[];
  origins: string[];
}

interface MaterialCard extends HTMLElement {
  dataset: {
    materialId: string;
    category: string;
    tier: string;
    colors: string;
    stoneType: string;
    origin: string;
    name: string;
    description: string;
  };
}

class MaterialsFilterManager {
  private state: FilterState = {
    search: '',
    tiers: [],
    categories: [],
    colors: [],
    stoneTypes: [],
    origins: [],
  };

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;

    // Load state from URL
    this.loadFromUrl();

    // Set up event listeners
    this.setupSearchListener();
    this.setupCheckboxListeners();
    this.setupColorListeners();
    this.setupClearButton();
    this.setupCollapseToggles();
    this.setupMobileDrawer();

    // Apply initial filters
    this.applyFilters();

    this.initialized = true;
  }

  private loadFromUrl() {
    const params = new URLSearchParams(window.location.search);

    this.state.search = params.get('search') || '';
    this.state.tiers = params.get('tiers')?.split(',').filter(Boolean) || [];
    this.state.categories = params.get('categories')?.split(',').filter(Boolean) || [];
    this.state.colors = params.get('colors')?.split(',').filter(Boolean) || [];
    this.state.stoneTypes = params.get('stoneTypes')?.split(',').filter(Boolean) || [];
    this.state.origins = params.get('origins')?.split(',').filter(Boolean) || [];

    // Restore UI state from URL
    this.restoreUIState();
  }

  private restoreUIState() {
    // Restore search input
    const searchInput = document.querySelector('[data-filter-search]') as HTMLInputElement;
    if (searchInput && this.state.search) {
      searchInput.value = this.state.search;
      this.toggleSearchClear(true);
    }

    // Restore checkboxes
    this.restoreCheckboxes('tiers', this.state.tiers);
    this.restoreCheckboxes('categories', this.state.categories);
    this.restoreCheckboxes('stoneTypes', this.state.stoneTypes);
    this.restoreCheckboxes('origins', this.state.origins);

    // Restore color swatches
    this.state.colors.forEach(color => {
      const swatch = document.querySelector(`[data-filter-color="${color}"]`);
      swatch?.classList.add('active');
    });
  }

  private restoreCheckboxes(filterKey: string, values: string[]) {
    values.forEach(value => {
      const checkbox = document.querySelector(
        `[data-filter-checkbox="${filterKey}"][value="${value}"]`
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }

  private saveToUrl() {
    const params = new URLSearchParams();

    if (this.state.search) params.set('search', this.state.search);
    if (this.state.tiers.length) params.set('tiers', this.state.tiers.join(','));
    if (this.state.categories.length) params.set('categories', this.state.categories.join(','));
    if (this.state.colors.length) params.set('colors', this.state.colors.join(','));
    if (this.state.stoneTypes.length) params.set('stoneTypes', this.state.stoneTypes.join(','));
    if (this.state.origins.length) params.set('origins', this.state.origins.join(','));

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }

  private setupSearchListener() {
    const searchInput = document.querySelector('[data-filter-search]') as HTMLInputElement;
    const clearBtn = document.querySelector('[data-search-clear]') as HTMLButtonElement;

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const value = (e.target as HTMLInputElement).value;

      // Debounce search
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        this.state.search = value;
        this.toggleSearchClear(value.length > 0);
        this.applyFilters();
      }, 300);
    });

    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      this.state.search = '';
      this.toggleSearchClear(false);
      this.applyFilters();
    });
  }

  private toggleSearchClear(show: boolean) {
    const clearBtn = document.querySelector('[data-search-clear]');
    const searchIcon = document.querySelector('[data-search-icon]');

    if (show) {
      clearBtn?.classList.remove('hidden');
      searchIcon?.classList.add('hidden');
    } else {
      clearBtn?.classList.add('hidden');
      searchIcon?.classList.remove('hidden');
    }
  }

  private setupCheckboxListeners() {
    const checkboxes = document.querySelectorAll('[data-filter-checkbox]');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const filterKey = target.dataset.filterCheckbox as keyof FilterState;
        const value = target.value;

        if (target.checked) {
          (this.state[filterKey] as string[]).push(value);
        } else {
          const index = (this.state[filterKey] as string[]).indexOf(value);
          if (index > -1) {
            (this.state[filterKey] as string[]).splice(index, 1);
          }
        }

        this.applyFilters();
      });
    });
  }

  private setupColorListeners() {
    const swatches = document.querySelectorAll('[data-filter-color]');

    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = (swatch as HTMLElement).dataset.filterColor!;

        if (swatch.classList.contains('active')) {
          swatch.classList.remove('active');
          const index = this.state.colors.indexOf(color);
          if (index > -1) {
            this.state.colors.splice(index, 1);
          }
        } else {
          swatch.classList.add('active');
          this.state.colors.push(color);
        }

        this.applyFilters();
      });
    });
  }

  private setupClearButton() {
    const clearBtn = document.querySelector('[data-clear-filters]');

    clearBtn?.addEventListener('click', () => {
      this.clearAllFilters();
    });
  }

  private clearAllFilters() {
    // Reset state
    this.state = {
      search: '',
      tiers: [],
      categories: [],
      colors: [],
      stoneTypes: [],
      origins: [],
    };

    // Reset UI
    const searchInput = document.querySelector('[data-filter-search]') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    this.toggleSearchClear(false);

    document.querySelectorAll('[data-filter-checkbox]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });

    document.querySelectorAll('[data-filter-color]').forEach(swatch => {
      swatch.classList.remove('active');
    });

    this.applyFilters();
  }

  private setupCollapseToggles() {
    const toggles = document.querySelectorAll('[data-collapse-toggle]');

    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const key = (toggle as HTMLElement).dataset.collapseToggle;
        const content = document.querySelector(`[data-collapse-content="${key}"]`);
        const icon = toggle.querySelector('[data-collapse-icon]');

        content?.classList.toggle('collapsed');
        icon?.classList.toggle('collapsed');

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', (!isExpanded).toString());
      });
    });
  }

  private setupMobileDrawer() {
    const toggleBtn = document.querySelector('[data-filter-modal-toggle]');
    const closeBtn = document.querySelector('[data-filter-modal-close]');
    const applyBtn = document.querySelector('[data-filter-modal-apply]');
    const overlay = document.querySelector('[data-filter-modal-overlay]');
    const container = document.querySelector('[data-filter-modal-container]');
    const modal = document.querySelector('[data-filter-modal]');

    const openModal = () => {
      overlay?.classList.remove('hidden');
      container?.classList.remove('hidden');
      container?.classList.add('open');

      // Trigger animation after display change
      requestAnimationFrame(() => {
        overlay?.classList.add('open');
        modal?.classList.add('open');
      });

      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      overlay?.classList.remove('open');
      modal?.classList.remove('open');

      // Wait for animation to complete before hiding
      setTimeout(() => {
        overlay?.classList.add('hidden');
        container?.classList.add('hidden');
        container?.classList.remove('open');
      }, 300);

      document.body.style.overflow = '';
    };

    toggleBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);
    applyBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && container?.classList.contains('open')) {
        closeModal();
      }
    });
  }

  private applyFilters() {
    const cards = document.querySelectorAll('[data-material-id]') as NodeListOf<MaterialCard>;
    const carouselsContainer = document.querySelector('[data-carousels-container]');
    const gridContainer = document.querySelector('[data-material-grid]');
    const noResults = document.querySelector('[data-no-results]');
    const gridContent = document.querySelector('[data-grid-content]');

    let visibleCount = 0;
    const hasActiveFilters = this.hasActiveFilters();

    // Toggle between carousel and grid view
    if (hasActiveFilters) {
      carouselsContainer?.classList.add('hidden');
      gridContainer?.classList.remove('hidden');
    } else {
      carouselsContainer?.classList.remove('hidden');
      gridContainer?.classList.add('hidden');
    }

    // Filter materials
    cards.forEach(card => {
      const matches = this.matchesFilters(card);

      if (matches) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide no results message
    if (hasActiveFilters) {
      if (visibleCount === 0) {
        noResults?.classList.remove('hidden');
        gridContent?.classList.add('hidden');
      } else {
        noResults?.classList.add('hidden');
        gridContent?.classList.remove('hidden');
      }
    }

    // Update results count
    const countEl = document.querySelector('[data-count]');
    if (countEl) {
      countEl.textContent = visibleCount.toString();
    }

    // Show/hide clear button
    const clearBtn = document.querySelector('[data-clear-filters]');
    if (hasActiveFilters) {
      clearBtn?.classList.remove('hidden');
    } else {
      clearBtn?.classList.add('hidden');
    }

    // Update mobile filter badge
    const badge = document.querySelector('[data-filter-badge]');
    const activeCount = this.getActiveFilterCount();
    if (badge) {
      if (activeCount > 0) {
        badge.textContent = activeCount.toString();
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    // Save to URL
    this.saveToUrl();
  }

  private hasActiveFilters(): boolean {
    return !!(
      this.state.search ||
      this.state.tiers.length ||
      this.state.categories.length ||
      this.state.colors.length ||
      this.state.stoneTypes.length ||
      this.state.origins.length
    );
  }

  private getActiveFilterCount(): number {
    let count = 0;
    if (this.state.search) count++;
    count += this.state.tiers.length;
    count += this.state.categories.length;
    count += this.state.colors.length;
    count += this.state.stoneTypes.length;
    count += this.state.origins.length;
    return count;
  }

  private matchesFilters(card: MaterialCard): boolean {
    const { search, tiers, categories, colors, stoneTypes, origins } = this.state;

    // Search filter
    if (search) {
      const name = card.dataset.name || '';
      const description = card.dataset.description || '';
      const searchLower = search.toLowerCase();
      if (!name.includes(searchLower) && !description.includes(searchLower)) {
        return false;
      }
    }

    // Tier filter
    if (tiers.length > 0) {
      if (!tiers.includes(card.dataset.tier)) {
        return false;
      }
    }

    // Category filter
    if (categories.length > 0) {
      if (!categories.includes(card.dataset.category)) {
        return false;
      }
    }

    // Color filter
    if (colors.length > 0) {
      const cardColors: string[] = JSON.parse(card.dataset.colors || '[]');
      if (!colors.some(c => cardColors.includes(c))) {
        return false;
      }
    }

    // Stone type filter
    if (stoneTypes.length > 0) {
      if (!stoneTypes.includes(card.dataset.stoneType)) {
        return false;
      }
    }

    // Origin filter
    if (origins.length > 0) {
      if (!origins.includes(card.dataset.origin)) {
        return false;
      }
    }

    return true;
  }
}

// Initialize on page load
function initMaterialsFilter() {
  new MaterialsFilterManager();
}

// Initialize
initMaterialsFilter();

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initMaterialsFilter);

export { MaterialsFilterManager };
