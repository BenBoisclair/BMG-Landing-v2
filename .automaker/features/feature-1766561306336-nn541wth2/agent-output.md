
🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/.automaker/features/feature-1766561306336-nn541wth2/images/pasted-image-2025-12-24T07-26-01-427Z-1766561161439.png"
}

Now I can see both the current implementation and the reference design. The reference shows:
1. A "Price Estimation" title
2. Two tabs side-by-side: "Bust" (darker purple, selected) and "Relief" (lighter purple)
3. The tabs should be clickable to show different content/options for calculating statue prices

Let me update the todo list and implement this design:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Replace current card grid with tab toggle UI matching reference design",
      "status": "in_progress",
      "activeForm": "Creating tab toggle UI structure"
    },
    {
      "content": "Add tab styling with dark purple colors",
      "status": "pending",
      "activeForm": "Adding tab styling"
    },
    {
      "content": "Create BustCalculator content section with options",
      "status": "pending",
      "activeForm": "Creating Bust calculator options"
    },
    {
      "content": "Create ReliefCalculator content section with options",
      "status": "pending",
      "activeForm": "Creating Relief calculator options"
    },
    {
      "content": "Add client-side JavaScript for tab switching",
      "status": "pending",
      "activeForm": "Adding tab switching JavaScript"
    },
    {
      "content": "Add ARIA attributes and keyboard navigation",
      "status": "pending",
      "activeForm": "Adding accessibility features"
    }
  ]
}

Let me check the project for existing color variables and patterns:

🔧 Tool: Grep
Input: {
  "pattern": "bmg-primary|--bmg",
  "glob": "*.css"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/tailwind.config.*"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/styles/global.css"
}

Now I understand the color scheme. Looking at the reference image:
- Active "Bust" tab: dark purple (like #2d2d5a or similar)
- Inactive "Relief" tab: lighter purple (like #5c5c8a or similar)

Let me create the new tab-based Price Estimation component:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "---\n\n---\n\n<section class=\"py-16 lg:py-24 bg-white\">\n  <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <!-- Section Header -->\n    <h2 class=\"text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12\">\n      Price Estimation\n    </h2>\n\n    <!-- Price Cards -->\n    <div class=\"grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto\">\n      <!-- Bust Card -->\n      <a\n        href=\"#contact\"\n        class=\"group relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300\"\n      >\n        <img\n          src=\"https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80\"\n          alt=\"Bust sculpture\"\n          class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\"\n        />\n        <div class=\"absolute inset-0 bg-gradient-to-t from-bmg-primary/80 to-transparent\"></div>\n        <div class=\"absolute bottom-0 left-0 right-0 p-6\">\n          <h3 class=\"text-2xl lg:text-3xl font-bold text-white\">Bust</h3>\n        </div>\n      </a>\n\n      <!-- Relief Card -->\n      <a\n        href=\"#contact\"\n        class=\"group relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300\"\n      >\n        <img\n          src=\"https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80\"\n          alt=\"Relief sculpture\"\n          class=\"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500\"\n        />\n        <div class=\"absolute inset-0 bg-gradient-to-t from-bmg-primary/80 to-transparent\"></div>\n        <div class=\"absolute bottom-0 left-0 right-0 p-6\">\n          <h3 class=\"text-2xl lg:text-3xl font-bold text-white\">Relief</h3>\n        </div>\n      </a>\n    </div>\n  </div>\n</section>",
  "new_string": "---\n\n---\n\n<section class=\"py-16 lg:py-24 bg-white\" id=\"price-estimation\">\n  <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <!-- Section Header -->\n    <h2 class=\"text-3xl lg:text-4xl font-bold text-center text-[#2d2d5a] mb-8\">\n      Price Estimation\n    </h2>\n\n    <!-- Tab Container -->\n    <div class=\"w-full\">\n      <!-- Tab Buttons -->\n      <div class=\"flex rounded-lg overflow-hidden border-2 border-[#2d2d5a]\" role=\"tablist\" aria-label=\"Price estimation calculator type\">\n        <button\n          id=\"bust-tab\"\n          role=\"tab\"\n          aria-selected=\"true\"\n          aria-controls=\"bust-panel\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#2d2d5a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"bust\"\n        >\n          Bust\n        </button>\n        <button\n          id=\"relief-tab\"\n          role=\"tab\"\n          aria-selected=\"false\"\n          aria-controls=\"relief-panel\"\n          tabindex=\"-1\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#6b6b9d] hover:bg-[#5a5a8a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"relief\"\n        >\n          Relief\n        </button>\n      </div>\n\n      <!-- Tab Panels -->\n      <!-- Bust Calculator Panel -->\n      <div\n        id=\"bust-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"bust-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200\"\n      >\n        <h3 class=\"text-xl font-semibold text-[#2d2d5a] mb-4\">Bust Price Calculator</h3>\n\n        <!-- Size Selection -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Select Size</label>\n          <div class=\"grid grid-cols-2 md:grid-cols-4 gap-3\">\n            <button class=\"bust-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"small\" data-price=\"2500\">\n              <span class=\"block font-semibold\">Small</span>\n              <span class=\"block text-sm\">12\" height</span>\n            </button>\n            <button class=\"bust-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"medium\" data-price=\"4500\">\n              <span class=\"block font-semibold\">Medium</span>\n              <span class=\"block text-sm\">18\" height</span>\n            </button>\n            <button class=\"bust-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"large\" data-price=\"7500\">\n              <span class=\"block font-semibold\">Large</span>\n              <span class=\"block text-sm\">24\" height</span>\n            </button>\n            <button class=\"bust-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"lifesize\" data-price=\"12000\">\n              <span class=\"block font-semibold\">Life Size</span>\n              <span class=\"block text-sm\">30\"+ height</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Material Selection -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Select Material</label>\n          <div class=\"grid grid-cols-2 md:grid-cols-3 gap-3\">\n            <button class=\"bust-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"bronze\" data-multiplier=\"1\">\n              <span class=\"block font-semibold\">Bronze</span>\n            </button>\n            <button class=\"bust-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"marble\" data-multiplier=\"1.3\">\n              <span class=\"block font-semibold\">Marble</span>\n            </button>\n            <button class=\"bust-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"resin\" data-multiplier=\"0.6\">\n              <span class=\"block font-semibold\">Resin</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Detail Level -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Detail Level</label>\n          <div class=\"grid grid-cols-3 gap-3\">\n            <button class=\"bust-detail-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-detail=\"standard\" data-addition=\"0\">\n              <span class=\"block font-semibold\">Standard</span>\n            </button>\n            <button class=\"bust-detail-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-detail=\"detailed\" data-addition=\"1500\">\n              <span class=\"block font-semibold\">Detailed</span>\n            </button>\n            <button class=\"bust-detail-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-detail=\"premium\" data-addition=\"3500\">\n              <span class=\"block font-semibold\">Premium</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Estimated Price Display -->\n        <div class=\"mt-8 p-4 bg-[#2d2d5a] rounded-lg text-center\">\n          <p class=\"text-white text-sm mb-1\">Estimated Price</p>\n          <p id=\"bust-price\" class=\"text-3xl font-bold text-white\">Select options above</p>\n          <p class=\"text-white/70 text-xs mt-2\">*Final price may vary based on specific requirements</p>\n        </div>\n\n        <!-- Contact CTA -->\n        <div class=\"mt-4 text-center\">\n          <a href=\"#contact\" class=\"inline-block px-8 py-3 bg-bmg-gold text-white font-semibold rounded-lg hover:bg-bmg-gold/90 transition-colors\">\n            Get Custom Quote\n          </a>\n        </div>\n      </div>\n\n      <!-- Relief Calculator Panel -->\n      <div\n        id=\"relief-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"relief-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 hidden\"\n      >\n        <h3 class=\"text-xl font-semibold text-[#2d2d5a] mb-4\">Relief Price Calculator</h3>\n\n        <!-- Size Selection -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Select Size (dimensions)</label>\n          <div class=\"grid grid-cols-2 md:grid-cols-4 gap-3\">\n            <button class=\"relief-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"small\" data-price=\"1800\">\n              <span class=\"block font-semibold\">Small</span>\n              <span class=\"block text-sm\">12\" x 16\"</span>\n            </button>\n            <button class=\"relief-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"medium\" data-price=\"3500\">\n              <span class=\"block font-semibold\">Medium</span>\n              <span class=\"block text-sm\">18\" x 24\"</span>\n            </button>\n            <button class=\"relief-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"large\" data-price=\"6000\">\n              <span class=\"block font-semibold\">Large</span>\n              <span class=\"block text-sm\">24\" x 36\"</span>\n            </button>\n            <button class=\"relief-size-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-size=\"mural\" data-price=\"10000\">\n              <span class=\"block font-semibold\">Mural</span>\n              <span class=\"block text-sm\">36\"+ custom</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Relief Type -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Relief Type</label>\n          <div class=\"grid grid-cols-3 gap-3\">\n            <button class=\"relief-type-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-type=\"bas\" data-multiplier=\"1\">\n              <span class=\"block font-semibold\">Bas Relief</span>\n              <span class=\"block text-xs\">Low projection</span>\n            </button>\n            <button class=\"relief-type-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-type=\"mezzo\" data-multiplier=\"1.25\">\n              <span class=\"block font-semibold\">Mezzo Relief</span>\n              <span class=\"block text-xs\">Medium projection</span>\n            </button>\n            <button class=\"relief-type-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-type=\"alto\" data-multiplier=\"1.5\">\n              <span class=\"block font-semibold\">Alto Relief</span>\n              <span class=\"block text-xs\">High projection</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Material Selection -->\n        <div class=\"mb-6\">\n          <label class=\"block text-sm font-medium text-gray-700 mb-2\">Select Material</label>\n          <div class=\"grid grid-cols-2 md:grid-cols-3 gap-3\">\n            <button class=\"relief-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"bronze\" data-addition=\"800\">\n              <span class=\"block font-semibold\">Bronze</span>\n            </button>\n            <button class=\"relief-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"plaster\" data-addition=\"0\">\n              <span class=\"block font-semibold\">Plaster</span>\n            </button>\n            <button class=\"relief-material-btn px-4 py-3 border-2 border-[#2d2d5a] rounded-lg text-[#2d2d5a] hover:bg-[#2d2d5a] hover:text-white transition-colors\" data-material=\"stone\" data-addition=\"1200\">\n              <span class=\"block font-semibold\">Stone</span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Estimated Price Display -->\n        <div class=\"mt-8 p-4 bg-[#2d2d5a] rounded-lg text-center\">\n          <p class=\"text-white text-sm mb-1\">Estimated Price</p>\n          <p id=\"relief-price\" class=\"text-3xl font-bold text-white\">Select options above</p>\n          <p class=\"text-white/70 text-xs mt-2\">*Final price may vary based on specific requirements</p>\n        </div>\n\n        <!-- Contact CTA -->\n        <div class=\"mt-4 text-center\">\n          <a href=\"#contact\" class=\"inline-block px-8 py-3 bg-bmg-gold text-white font-semibold rounded-lg hover:bg-bmg-gold/90 transition-colors\">\n            Get Custom Quote\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        bustPanel?.classList.remove('hidden');\n        reliefPanel?.classList.add('hidden');\n      } else {\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        reliefPanel?.classList.remove('hidden');\n        bustPanel?.classList.add('hidden');\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    document.querySelectorAll('.bust-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-detail-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-detail-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.detail = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateBustPrice();\n      });\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    document.querySelectorAll('.relief-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-type-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-type-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.type = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>"
}

The implementation is complete. Let me update the todo list to reflect the progress:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Replace current card grid with tab toggle UI matching reference design",
      "status": "completed",
      "activeForm": "Creating tab toggle UI structure"
    },
    {
      "content": "Add tab styling with dark purple colors",
      "status": "completed",
      "activeForm": "Adding tab styling"
    },
    {
      "content": "Create BustCalculator content section with options",
      "status": "completed",
      "activeForm": "Creating Bust calculator options"
    },
    {
      "content": "Create ReliefCalculator content section with options",
      "status": "completed",
      "activeForm": "Creating Relief calculator options"
    },
    {
      "content": "Add client-side JavaScript for tab switching",
      "status": "completed",
      "activeForm": "Adding tab switching JavaScript"
    },
    {
      "content": "Add ARIA attributes and keyboard navigation",
      "status": "completed",
      "activeForm": "Adding accessibility features"
    },
    {
      "content": "Verify implementation works correctly",
      "status": "in_progress",
      "activeForm": "Verifying implementation"
    }
  ]
}

Let me verify the build works correctly:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | head -50",
  "description": "Build Astro project to verify changes",
  "timeout": 60000
}

The build succeeded. Let me also mark the verification as complete:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Replace current card grid with tab toggle UI matching reference design",
      "status": "completed",
      "activeForm": "Creating tab toggle UI structure"
    },
    {
      "content": "Add tab styling with dark purple colors",
      "status": "completed",
      "activeForm": "Adding tab styling"
    },
    {
      "content": "Create BustCalculator content section with options",
      "status": "completed",
      "activeForm": "Creating Bust calculator options"
    },
    {
      "content": "Create ReliefCalculator content section with options",
      "status": "completed",
      "activeForm": "Creating Relief calculator options"
    },
    {
      "content": "Add client-side JavaScript for tab switching",
      "status": "completed",
      "activeForm": "Adding tab switching JavaScript"
    },
    {
      "content": "Add ARIA attributes and keyboard navigation",
      "status": "completed",
      "activeForm": "Adding accessibility features"
    },
    {
      "content": "Verify implementation works correctly",
      "status": "completed",
      "activeForm": "Verifying implementation"
    }
  ]
}

<summary>
## Summary: Price Estimation Tab Toggle UI with Calculators

### Changes Implemented
- Replaced the original card-based grid layout with a tab-based UI matching the reference design
- Created two-tab toggle interface with "Bust" and "Relief" buttons using the dark purple color scheme (#2d2d5a active, #6b6b9d inactive)
- Built complete **Bust Price Calculator** with:
  - Size selection (Small 12", Medium 18", Large 24", Life Size 30"+)
  - Material selection (Bronze, Marble, Resin)
  - Detail level selection (Standard, Detailed, Premium)
  - Dynamic price calculation display
- Built complete **Relief Price Calculator** with:
  - Size selection (Small, Medium, Large, Mural)
  - Relief type selection (Bas Relief, Mezzo Relief, Alto Relief)
  - Material selection (Bronze, Plaster, Stone)
  - Dynamic price calculation display
- Added client-side JavaScript for:
  - Tab switching functionality with visual feedback
  - Price calculation logic for both calculator types
  - Button selection state management
- Implemented full accessibility support:
  - ARIA roles and attributes (role="tablist", role="tab", role="tabpanel")
  - aria-selected states for active tabs
  - aria-controls/aria-labelledby connections
  - Keyboard navigation (ArrowLeft/ArrowRight)
  - Proper focus management

### Files Modified
- `/src/components/sections/PriceEstimation.astro` - Complete rewrite with new tab UI and calculator functionality

### Notes for Developer
- Prices are configurable via data attributes on the buttons (data-price, data-multiplier, data-addition)
- The calculation formula: `(base price × material multiplier) + detail/material addition`
- Colors used: #2d2d5a (active/primary), #6b6b9d (inactive), matching the reference design
- "Get Custom Quote" buttons link to the #contact section
- Build verified successfully - no errors
</summary>

---

## Follow-up Session


🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro"
}

Now I understand the current state. I need to make these changes:
1. Hide both panels initially (neither Bust nor Relief tab should be "selected" until clicked)
2. Add smooth, classy animations for the panel reveal

Let me update the component:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Hide both calculator panels initially until user selects Bust or Relief",
      "status": "in_progress",
      "activeForm": "Hiding panels initially"
    },
    {
      "content": "Add classy fade/slide animations for panel reveal",
      "status": "pending",
      "activeForm": "Adding smooth animations"
    },
    {
      "content": "Update tab styling for initial 'unselected' state",
      "status": "pending",
      "activeForm": "Updating tab styling"
    },
    {
      "content": "Test build and verify changes",
      "status": "pending",
      "activeForm": "Testing build"
    }
  ]
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "---\n\n---\n\n<section class=\"py-16 lg:py-24 bg-white\" id=\"price-estimation\">\n  <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <!-- Section Header -->\n    <h2 class=\"text-3xl lg:text-4xl font-bold text-center text-[#2d2d5a] mb-8\">\n      Price Estimation\n    </h2>\n\n    <!-- Tab Container -->\n    <div class=\"w-full\">\n      <!-- Tab Buttons -->\n      <div class=\"flex rounded-lg overflow-hidden border-2 border-[#2d2d5a]\" role=\"tablist\" aria-label=\"Price estimation calculator type\">\n        <button\n          id=\"bust-tab\"\n          role=\"tab\"\n          aria-selected=\"true\"\n          aria-controls=\"bust-panel\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#2d2d5a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"bust\"\n        >\n          Bust\n        </button>\n        <button\n          id=\"relief-tab\"\n          role=\"tab\"\n          aria-selected=\"false\"\n          aria-controls=\"relief-panel\"\n          tabindex=\"-1\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#6b6b9d] hover:bg-[#5a5a8a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"relief\"\n        >\n          Relief\n        </button>\n      </div>\n\n      <!-- Tab Panels -->\n      <!-- Bust Calculator Panel -->\n      <div\n        id=\"bust-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"bust-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200\"\n      >",
  "new_string": "---\n\n---\n\n<section class=\"py-16 lg:py-24 bg-white\" id=\"price-estimation\">\n  <div class=\"max-w-4xl mx-auto px-4 sm:px-6 lg:px-8\">\n    <!-- Section Header -->\n    <h2 class=\"text-3xl lg:text-4xl font-bold text-center text-[#2d2d5a] mb-8\">\n      Price Estimation\n    </h2>\n\n    <!-- Tab Container -->\n    <div class=\"w-full\">\n      <!-- Tab Buttons -->\n      <div class=\"flex rounded-lg overflow-hidden border-2 border-[#2d2d5a]\" role=\"tablist\" aria-label=\"Price estimation calculator type\">\n        <button\n          id=\"bust-tab\"\n          role=\"tab\"\n          aria-selected=\"false\"\n          aria-controls=\"bust-panel\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#6b6b9d] hover:bg-[#5a5a8a] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"bust\"\n        >\n          Bust\n        </button>\n        <button\n          id=\"relief-tab\"\n          role=\"tab\"\n          aria-selected=\"false\"\n          aria-controls=\"relief-panel\"\n          class=\"flex-1 py-4 px-6 text-xl lg:text-2xl font-semibold text-white bg-[#6b6b9d] hover:bg-[#5a5a8a] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#2d2d5a] focus:ring-offset-2\"\n          data-tab=\"relief\"\n        >\n          Relief\n        </button>\n      </div>\n\n      <!-- Tab Panels -->\n      <!-- Bust Calculator Panel -->\n      <div\n        id=\"bust-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"bust-tab\"\n        class=\"panel-container mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-out\"\n        style=\"margin-top: 0; padding: 0; border: none;\"\n      >"
}

Now let me update the Relief panel similarly:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "      <!-- Relief Calculator Panel -->\n      <div\n        id=\"relief-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"relief-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 hidden\"\n      >",
  "new_string": "      <!-- Relief Calculator Panel -->\n      <div\n        id=\"relief-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"relief-tab\"\n        class=\"panel-container mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-out\"\n        style=\"margin-top: 0; padding: 0; border: none;\"\n      >"
}

Now let me update the JavaScript to handle the animation properly with the initial hidden state and smooth reveal:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        bustPanel?.classList.remove('hidden');\n        reliefPanel?.classList.add('hidden');\n      } else {\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        reliefPanel?.classList.remove('hidden');\n        bustPanel?.classList.add('hidden');\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    document.querySelectorAll('.bust-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-detail-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-detail-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.detail = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateBustPrice();\n      });\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    document.querySelectorAll('.relief-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-type-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-type-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.type = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>",
  "new_string": "<style>\n  /* Panel animation styles */\n  .panel-container {\n    transform: translateY(-10px);\n  }\n\n  .panel-container.panel-visible {\n    opacity: 1 !important;\n    max-height: 2000px !important;\n    margin-top: 1.5rem !important;\n    padding: 1.5rem !important;\n    border: 1px solid rgb(229 231 235) !important;\n    transform: translateY(0);\n  }\n\n  .panel-container.panel-hidden {\n    opacity: 0;\n    max-height: 0;\n    margin-top: 0;\n    padding: 0;\n    border: none;\n    transform: translateY(-10px);\n    pointer-events: none;\n  }\n\n  /* Option button animation */\n  .option-btn {\n    transition: all 0.2s ease-out;\n    transform: scale(1);\n  }\n\n  .option-btn:hover {\n    transform: scale(1.02);\n  }\n\n  .option-btn:active {\n    transform: scale(0.98);\n  }\n\n  .option-btn.selected {\n    transform: scale(1);\n    box-shadow: 0 4px 12px rgba(45, 45, 90, 0.25);\n  }\n</style>\n\n<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    // Track if any tab has been selected\n    let hasSelectedTab = false;\n\n    function showPanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      // Remove inline styles that override the classes\n      panel.removeAttribute('style');\n\n      // Add visible class with slight delay for smooth animation\n      requestAnimationFrame(() => {\n        panel.classList.remove('panel-hidden');\n        panel.classList.add('panel-visible');\n      });\n    }\n\n    function hidePanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      panel.classList.remove('panel-visible');\n      panel.classList.add('panel-hidden');\n    }\n\n    function switchTab(activeTab: string) {\n      hasSelectedTab = true;\n\n      if (activeTab === 'bust') {\n        // Update tab styles\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(reliefPanel);\n        showPanel(bustPanel);\n      } else {\n        // Update tab styles\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(bustPanel);\n        showPanel(reliefPanel);\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Helper function to add selection animation to buttons\n    function setupOptionButtons(selector: string, callback: (btn: HTMLElement) => void) {\n      document.querySelectorAll(selector).forEach(btn => {\n        btn.classList.add('option-btn');\n        btn.addEventListener('click', (e) => {\n          // Remove selected state from siblings\n          document.querySelectorAll(selector).forEach(b => {\n            b.classList.remove('bg-[#2d2d5a]', 'text-white', 'selected');\n            b.classList.add('text-[#2d2d5a]');\n          });\n\n          // Add selected state to clicked button\n          const target = e.currentTarget as HTMLElement;\n          target.classList.add('bg-[#2d2d5a]', 'text-white', 'selected');\n          target.classList.remove('text-[#2d2d5a]');\n\n          callback(target);\n        });\n      });\n    }\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    setupOptionButtons('.bust-size-btn', (btn) => {\n      bustSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-material-btn', (btn) => {\n      bustSelections.material = parseFloat(btn.dataset.multiplier || '1');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-detail-btn', (btn) => {\n      bustSelections.detail = parseFloat(btn.dataset.addition || '0');\n      calculateBustPrice();\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) {\n          // Animate the price change\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    setupOptionButtons('.relief-size-btn', (btn) => {\n      reliefSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-type-btn', (btn) => {\n      reliefSelections.type = parseFloat(btn.dataset.multiplier || '1');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-material-btn', (btn) => {\n      reliefSelections.material = parseFloat(btn.dataset.addition || '0');\n      calculateReliefPrice();\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) {\n          // Animate the price change\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>"
}

The file was modified by the user or a linter. Let me re-read it to see the current state:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro"
}

Good, I see the file was modified (the h2 color changed to inline style). Now I can see the current state. The panels are already set up with the initial hidden state (opacity-0, max-h-0, inline style for margin/padding/border). Now I need to update the JavaScript to handle the smooth animations. Let me replace the script section:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        bustPanel?.classList.remove('hidden');\n        reliefPanel?.classList.add('hidden');\n      } else {\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        reliefPanel?.classList.remove('hidden');\n        bustPanel?.classList.add('hidden');\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    document.querySelectorAll('.bust-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateBustPrice();\n      });\n    });\n\n    document.querySelectorAll('.bust-detail-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.bust-detail-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        bustSelections.detail = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateBustPrice();\n      });\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    document.querySelectorAll('.relief-size-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-size-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.size = parseFloat((e.currentTarget as HTMLElement).dataset.price || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-type-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-type-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.type = parseFloat((e.currentTarget as HTMLElement).dataset.multiplier || '1');\n        calculateReliefPrice();\n      });\n    });\n\n    document.querySelectorAll('.relief-material-btn').forEach(btn => {\n      btn.addEventListener('click', (e) => {\n        document.querySelectorAll('.relief-material-btn').forEach(b => {\n          b.classList.remove('bg-[#2d2d5a]', 'text-white');\n          b.classList.add('text-[#2d2d5a]');\n        });\n        (e.currentTarget as HTMLElement).classList.add('bg-[#2d2d5a]', 'text-white');\n        (e.currentTarget as HTMLElement).classList.remove('text-[#2d2d5a]');\n        reliefSelections.material = parseFloat((e.currentTarget as HTMLElement).dataset.addition || '0');\n        calculateReliefPrice();\n      });\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>",
  "new_string": "<style>\n  /* Panel animation styles */\n  .panel-container {\n    transform: translateY(-10px);\n  }\n\n  .panel-visible {\n    opacity: 1 !important;\n    max-height: 2000px !important;\n    margin-top: 1.5rem !important;\n    padding: 1.5rem !important;\n    border: 1px solid rgb(229 231 235) !important;\n    transform: translateY(0) !important;\n    pointer-events: auto !important;\n  }\n\n  .panel-hidden {\n    opacity: 0 !important;\n    max-height: 0 !important;\n    margin-top: 0 !important;\n    padding: 0 !important;\n    border: none !important;\n    transform: translateY(-10px) !important;\n    pointer-events: none !important;\n  }\n\n  /* Option button animation */\n  .option-btn {\n    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    transform: scale(1);\n  }\n\n  .option-btn:hover {\n    transform: scale(1.02);\n    box-shadow: 0 2px 8px rgba(45, 45, 90, 0.15);\n  }\n\n  .option-btn:active {\n    transform: scale(0.98);\n  }\n\n  .option-btn.selected {\n    transform: scale(1);\n    box-shadow: 0 4px 12px rgba(45, 45, 90, 0.25);\n  }\n</style>\n\n<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    // Show panel with smooth animation\n    function showPanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      // Remove inline styles that override the animation\n      panel.removeAttribute('style');\n\n      // Trigger animation on next frame\n      requestAnimationFrame(() => {\n        panel.classList.remove('panel-hidden');\n        panel.classList.add('panel-visible');\n      });\n    }\n\n    // Hide panel with smooth animation\n    function hidePanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      panel.classList.remove('panel-visible');\n      panel.classList.add('panel-hidden');\n    }\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        // Update tab styles\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(reliefPanel);\n        showPanel(bustPanel);\n      } else {\n        // Update tab styles\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(bustPanel);\n        showPanel(reliefPanel);\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Helper function to setup option buttons with animations\n    function setupOptionButtons(selector: string, callback: (btn: HTMLElement) => void) {\n      document.querySelectorAll(selector).forEach(btn => {\n        btn.classList.add('option-btn');\n        btn.addEventListener('click', (e) => {\n          // Remove selected state from siblings\n          document.querySelectorAll(selector).forEach(b => {\n            b.classList.remove('bg-[#2d2d5a]', 'text-white', 'selected');\n            b.classList.add('text-[#2d2d5a]');\n          });\n\n          // Add selected state to clicked button\n          const target = e.currentTarget as HTMLElement;\n          target.classList.add('bg-[#2d2d5a]', 'text-white', 'selected');\n          target.classList.remove('text-[#2d2d5a]');\n\n          callback(target);\n        });\n      });\n    }\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    setupOptionButtons('.bust-size-btn', (btn) => {\n      bustSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-material-btn', (btn) => {\n      bustSelections.material = parseFloat(btn.dataset.multiplier || '1');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-detail-btn', (btn) => {\n      bustSelections.detail = parseFloat(btn.dataset.addition || '0');\n      calculateBustPrice();\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) {\n          // Subtle price change animation\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    setupOptionButtons('.relief-size-btn', (btn) => {\n      reliefSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-type-btn', (btn) => {\n      reliefSelections.type = parseFloat(btn.dataset.multiplier || '1');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-material-btn', (btn) => {\n      reliefSelections.material = parseFloat(btn.dataset.addition || '0');\n      calculateReliefPrice();\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) {\n          // Subtle price change animation\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>"
}

Now let me build and verify the changes:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | head -50",
  "description": "Build Astro project to verify changes",
  "timeout": 60000
}

The build succeeded. Let me update the todo list to reflect completion:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Hide both calculator panels initially until user selects Bust or Relief",
      "status": "completed",
      "activeForm": "Hiding panels initially"
    },
    {
      "content": "Add classy fade/slide animations for panel reveal",
      "status": "completed",
      "activeForm": "Adding smooth animations"
    },
    {
      "content": "Update tab styling for initial 'unselected' state",
      "status": "completed",
      "activeForm": "Updating tab styling"
    },
    {
      "content": "Test build and verify changes",
      "status": "completed",
      "activeForm": "Testing build"
    }
  ]
}

<summary>
## Summary: Price Estimation - Hide Options Until Tab Selected + Classy Animations

### Changes Implemented
- **Panels hidden initially**: Both Bust and Relief calculator panels are now hidden on page load. They only appear when the user clicks on the respective tab
- **Both tabs start unselected**: Changed initial tab styling so neither Bust nor Relief appears "active" - both start with the lighter purple color (`#6b6b9d`)
- **Added classy slide/fade animations**:
  - Panel reveal: Smooth opacity fade + subtle 10px upward slide with 500ms duration and ease-out timing
  - Panel hide: Reverse animation with opacity fade out and slight downward slide
  - Option buttons: Subtle scale (1.02x) and shadow on hover with 250ms cubic-bezier easing
  - Selected button shadow: Deeper shadow effect for selected state
  - Price display: Gentle scale/opacity pulse animation when price updates

### Files Modified
- `/src/components/sections/PriceEstimation.astro` - Updated HTML structure, added CSS animations, and refactored JavaScript for animated tab switching

### Notes for Developer
- The animations use `transition-all duration-500 ease-out` for the panels and `cubic-bezier(0.4, 0, 0.2, 1)` for the option buttons for a premium feel
- `pointer-events: none` is applied to hidden panels to prevent accidental clicks
- `requestAnimationFrame` is used to ensure smooth animation triggering
- The price change animation uses a 150ms delay for a subtle "processing" effect
- All animations are intentionally understated and elegant per the request for "classy, not too complicated"
</summary>

---

## Follow-up Session

I'll fix the animation bug by simplifying it. Let me first read the current state of the file and then make it simpler.

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro"
}

Now I understand the issue. The animation is overly complex with `max-height`, `margin`, `padding`, and `transform` transitions plus `requestAnimationFrame` which can cause flickering. Let me simplify it to just use a simple `hidden` class toggle with a subtle fade:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "      <!-- Tab Panels -->\n      <!-- Bust Calculator Panel -->\n      <div\n        id=\"bust-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"bust-tab\"\n        class=\"panel-container mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-out\"\n        style=\"margin-top: 0; padding: 0; border: none;\"\n      >",
  "new_string": "      <!-- Tab Panels -->\n      <!-- Bust Calculator Panel -->\n      <div\n        id=\"bust-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"bust-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 hidden\"\n      >"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "      <!-- Relief Calculator Panel -->\n      <div\n        id=\"relief-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"relief-tab\"\n        class=\"panel-container mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 opacity-0 max-h-0 overflow-hidden transition-all duration-500 ease-out\"\n        style=\"margin-top: 0; padding: 0; border: none;\"\n      >",
  "new_string": "      <!-- Relief Calculator Panel -->\n      <div\n        id=\"relief-panel\"\n        role=\"tabpanel\"\n        aria-labelledby=\"relief-tab\"\n        class=\"mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 hidden\"\n      >"
}

Now let me simplify the styles and script:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/PriceEstimation.astro",
  "old_string": "<style>\n  /* Panel animation styles */\n  .panel-container {\n    transform: translateY(-10px);\n  }\n\n  .panel-visible {\n    opacity: 1 !important;\n    max-height: 2000px !important;\n    margin-top: 1.5rem !important;\n    padding: 1.5rem !important;\n    border: 1px solid rgb(229 231 235) !important;\n    transform: translateY(0) !important;\n    pointer-events: auto !important;\n  }\n\n  .panel-hidden {\n    opacity: 0 !important;\n    max-height: 0 !important;\n    margin-top: 0 !important;\n    padding: 0 !important;\n    border: none !important;\n    transform: translateY(-10px) !important;\n    pointer-events: none !important;\n  }\n\n  /* Option button animation */\n  .option-btn {\n    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    transform: scale(1);\n  }\n\n  .option-btn:hover {\n    transform: scale(1.02);\n    box-shadow: 0 2px 8px rgba(45, 45, 90, 0.15);\n  }\n\n  .option-btn:active {\n    transform: scale(0.98);\n  }\n\n  .option-btn.selected {\n    transform: scale(1);\n    box-shadow: 0 4px 12px rgba(45, 45, 90, 0.25);\n  }\n</style>\n\n<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    const activeTabClasses = 'bg-[#2d2d5a]';\n    const inactiveTabClasses = 'bg-[#6b6b9d] hover:bg-[#5a5a8a]';\n\n    // Show panel with smooth animation\n    function showPanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      // Remove inline styles that override the animation\n      panel.removeAttribute('style');\n\n      // Trigger animation on next frame\n      requestAnimationFrame(() => {\n        panel.classList.remove('panel-hidden');\n        panel.classList.add('panel-visible');\n      });\n    }\n\n    // Hide panel with smooth animation\n    function hidePanel(panel: HTMLElement | null) {\n      if (!panel) return;\n\n      panel.classList.remove('panel-visible');\n      panel.classList.add('panel-hidden');\n    }\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        // Update tab styles\n        bustTab?.classList.remove(...inactiveTabClasses.split(' '));\n        bustTab?.classList.add(activeTabClasses);\n        bustTab?.setAttribute('aria-selected', 'true');\n        bustTab?.removeAttribute('tabindex');\n\n        reliefTab?.classList.remove(activeTabClasses);\n        reliefTab?.classList.add(...inactiveTabClasses.split(' '));\n        reliefTab?.setAttribute('aria-selected', 'false');\n        reliefTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(reliefPanel);\n        showPanel(bustPanel);\n      } else {\n        // Update tab styles\n        reliefTab?.classList.remove(...inactiveTabClasses.split(' '));\n        reliefTab?.classList.add(activeTabClasses);\n        reliefTab?.setAttribute('aria-selected', 'true');\n        reliefTab?.removeAttribute('tabindex');\n\n        bustTab?.classList.remove(activeTabClasses);\n        bustTab?.classList.add(...inactiveTabClasses.split(' '));\n        bustTab?.setAttribute('aria-selected', 'false');\n        bustTab?.setAttribute('tabindex', '-1');\n\n        // Animate panels\n        hidePanel(bustPanel);\n        showPanel(reliefPanel);\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Helper function to setup option buttons with animations\n    function setupOptionButtons(selector: string, callback: (btn: HTMLElement) => void) {\n      document.querySelectorAll(selector).forEach(btn => {\n        btn.classList.add('option-btn');\n        btn.addEventListener('click', (e) => {\n          // Remove selected state from siblings\n          document.querySelectorAll(selector).forEach(b => {\n            b.classList.remove('bg-[#2d2d5a]', 'text-white', 'selected');\n            b.classList.add('text-[#2d2d5a]');\n          });\n\n          // Add selected state to clicked button\n          const target = e.currentTarget as HTMLElement;\n          target.classList.add('bg-[#2d2d5a]', 'text-white', 'selected');\n          target.classList.remove('text-[#2d2d5a]');\n\n          callback(target);\n        });\n      });\n    }\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    setupOptionButtons('.bust-size-btn', (btn) => {\n      bustSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-material-btn', (btn) => {\n      bustSelections.material = parseFloat(btn.dataset.multiplier || '1');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-detail-btn', (btn) => {\n      bustSelections.detail = parseFloat(btn.dataset.addition || '0');\n      calculateBustPrice();\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) {\n          // Subtle price change animation\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    setupOptionButtons('.relief-size-btn', (btn) => {\n      reliefSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-type-btn', (btn) => {\n      reliefSelections.type = parseFloat(btn.dataset.multiplier || '1');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-material-btn', (btn) => {\n      reliefSelections.material = parseFloat(btn.dataset.addition || '0');\n      calculateReliefPrice();\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) {\n          // Subtle price change animation\n          priceEl.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';\n          priceEl.style.transform = 'scale(0.95)';\n          priceEl.style.opacity = '0.7';\n\n          setTimeout(() => {\n            priceEl.textContent = `$${total.toLocaleString()}`;\n            priceEl.style.transform = 'scale(1)';\n            priceEl.style.opacity = '1';\n          }, 150);\n        }\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>",
  "new_string": "<script>\n  // Tab switching functionality\n  document.addEventListener('DOMContentLoaded', () => {\n    const bustTab = document.getElementById('bust-tab');\n    const reliefTab = document.getElementById('relief-tab');\n    const bustPanel = document.getElementById('bust-panel');\n    const reliefPanel = document.getElementById('relief-panel');\n\n    function switchTab(activeTab: string) {\n      if (activeTab === 'bust') {\n        // Update tab styles\n        bustTab?.classList.remove('bg-[#6b6b9d]', 'hover:bg-[#5a5a8a]');\n        bustTab?.classList.add('bg-[#2d2d5a]');\n        bustTab?.setAttribute('aria-selected', 'true');\n\n        reliefTab?.classList.remove('bg-[#2d2d5a]');\n        reliefTab?.classList.add('bg-[#6b6b9d]', 'hover:bg-[#5a5a8a]');\n        reliefTab?.setAttribute('aria-selected', 'false');\n\n        // Show/hide panels\n        bustPanel?.classList.remove('hidden');\n        reliefPanel?.classList.add('hidden');\n      } else {\n        // Update tab styles\n        reliefTab?.classList.remove('bg-[#6b6b9d]', 'hover:bg-[#5a5a8a]');\n        reliefTab?.classList.add('bg-[#2d2d5a]');\n        reliefTab?.setAttribute('aria-selected', 'true');\n\n        bustTab?.classList.remove('bg-[#2d2d5a]');\n        bustTab?.classList.add('bg-[#6b6b9d]', 'hover:bg-[#5a5a8a]');\n        bustTab?.setAttribute('aria-selected', 'false');\n\n        // Show/hide panels\n        reliefPanel?.classList.remove('hidden');\n        bustPanel?.classList.add('hidden');\n      }\n    }\n\n    bustTab?.addEventListener('click', () => switchTab('bust'));\n    reliefTab?.addEventListener('click', () => switchTab('relief'));\n\n    // Keyboard navigation\n    [bustTab, reliefTab].forEach(tab => {\n      tab?.addEventListener('keydown', (e: KeyboardEvent) => {\n        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n          e.preventDefault();\n          const currentTab = e.key === 'ArrowRight' ? 'relief' : 'bust';\n          switchTab(currentTab);\n          (currentTab === 'bust' ? bustTab : reliefTab)?.focus();\n        }\n      });\n    });\n\n    // Helper function to setup option buttons\n    function setupOptionButtons(selector: string, callback: (btn: HTMLElement) => void) {\n      document.querySelectorAll(selector).forEach(btn => {\n        btn.addEventListener('click', (e) => {\n          // Remove selected state from siblings\n          document.querySelectorAll(selector).forEach(b => {\n            b.classList.remove('bg-[#2d2d5a]', 'text-white');\n            b.classList.add('text-[#2d2d5a]');\n          });\n\n          // Add selected state to clicked button\n          const target = e.currentTarget as HTMLElement;\n          target.classList.add('bg-[#2d2d5a]', 'text-white');\n          target.classList.remove('text-[#2d2d5a]');\n\n          callback(target);\n        });\n      });\n    }\n\n    // Bust Calculator Logic\n    let bustSelections = { size: null as number | null, material: null as number | null, detail: null as number | null };\n\n    setupOptionButtons('.bust-size-btn', (btn) => {\n      bustSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-material-btn', (btn) => {\n      bustSelections.material = parseFloat(btn.dataset.multiplier || '1');\n      calculateBustPrice();\n    });\n\n    setupOptionButtons('.bust-detail-btn', (btn) => {\n      bustSelections.detail = parseFloat(btn.dataset.addition || '0');\n      calculateBustPrice();\n    });\n\n    function calculateBustPrice() {\n      const priceEl = document.getElementById('bust-price');\n      if (bustSelections.size !== null && bustSelections.material !== null && bustSelections.detail !== null) {\n        const total = (bustSelections.size * bustSelections.material) + bustSelections.detail;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n\n    // Relief Calculator Logic\n    let reliefSelections = { size: null as number | null, type: null as number | null, material: null as number | null };\n\n    setupOptionButtons('.relief-size-btn', (btn) => {\n      reliefSelections.size = parseFloat(btn.dataset.price || '0');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-type-btn', (btn) => {\n      reliefSelections.type = parseFloat(btn.dataset.multiplier || '1');\n      calculateReliefPrice();\n    });\n\n    setupOptionButtons('.relief-material-btn', (btn) => {\n      reliefSelections.material = parseFloat(btn.dataset.addition || '0');\n      calculateReliefPrice();\n    });\n\n    function calculateReliefPrice() {\n      const priceEl = document.getElementById('relief-price');\n      if (reliefSelections.size !== null && reliefSelections.type !== null && reliefSelections.material !== null) {\n        const total = (reliefSelections.size * reliefSelections.type) + reliefSelections.material;\n        if (priceEl) priceEl.textContent = `$${total.toLocaleString()}`;\n      } else {\n        if (priceEl) priceEl.textContent = 'Select all options';\n      }\n    }\n  });\n</script>"
}

Now let me verify the build:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | head -30",
  "description": "Build Astro project to verify changes",
  "timeout": 60000
}

Build succeeded. The animation is now simplified - it just uses a simple `hidden` class toggle without any complex animations that could cause the opening/closing loop bug.

<summary>
## Summary: Simplified Price Estimation Panel Animation

### Changes Implemented
- **Removed all complex animations** that were causing the opening/closing bug:
  - Removed the CSS `<style>` block with `panel-container`, `panel-visible`, `panel-hidden` classes
  - Removed `max-height`, `opacity`, `transform`, and `transition` animations
  - Removed `requestAnimationFrame` calls
  - Removed the scale/opacity price change animations
  - Removed `option-btn` class and hover/active animations

- **Simplified to basic show/hide**:
  - Both panels now use simple `hidden` class (Tailwind's `display: none`)
  - Clicking a tab just adds/removes the `hidden` class - instant and reliable
  - Tab color switching still works with direct class manipulation

### Files Modified
- `/src/components/sections/PriceEstimation.astro` - Simplified panel classes and completely rewrote the script to remove animation complexity

### Notes for Developer
- The animation bug was likely caused by the combination of `transition-all`, `requestAnimationFrame`, and the CSS class toggling fighting with inline styles
- The new implementation is much simpler and more reliable - just `hidden` class toggling
- Both panels still start hidden until user clicks Bust or Relief
- All calculator functionality (size/material/detail selection and price calculation) remains intact
</summary>