I'll start by exploring the codebase to understand the existing structure and the form components mentioned in the feature description.

🔧 Tool: Glob
Input: {
  "pattern": "**/*.{tsx,ts}"
}

🔧 Tool: Grep
Input: {
  "pattern": "FormInput|FormSelect|FormPhoneInput",
  "output_mode": "files_with_matches"
}

Let me search more specifically in the source directory and look at the existing components:

🔧 Tool: Glob
Input: {
  "pattern": "src/**/*.{tsx,ts,astro}"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro"
}

Now let me read the existing form components to understand their structure:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/FormInput.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/FormSelect.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/FormPhoneInput.astro"
}

Now I have a good understanding of the existing form components. I can see that:

1. **FormInput.astro** - Handles text, email, tel, textarea, url inputs with validation
2. **FormSelect.astro** - Handles dropdown selects with options
3. **FormPhoneInput.astro** - Handles phone input with country code selector

All three components share common patterns:
- Similar styling (border, focus states, error states)
- Same data attributes (`data-form-field`, `data-input`, `data-error-message`)
- Similar error/valid styling via CSS

Let me create a unified `FormField` component that wraps all these with a common interface and reduces code duplication. First, let me check if there's already any work done on this:

🔧 Tool: Grep
Input: {
  "pattern": "FormField|FormComponent",
  "output_mode": "files_with_matches"
}

Let me check the previous agent output to see what work was done:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/.automaker/features/feature-1766568048531-wqbl4ewd9/agent-output.md"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/utils/validation.ts"
}

I can see the previous agent was just exploring the codebase when it got cut off. There's already a `validation.ts` utility file with form validation logic. Now I need to create the unified `FormField` component wrapper. Let me create the implementation:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create FormField wrapper component",
      "status": "in_progress",
      "activeForm": "Creating FormField wrapper component"
    },
    {
      "content": "Add shared styles to FormField component",
      "status": "pending",
      "activeForm": "Adding shared styles to FormField"
    },
    {
      "content": "Update Contact.astro to use new FormField component",
      "status": "pending",
      "activeForm": "Updating Contact.astro to use FormField"
    },
    {
      "content": "Test the implementation",
      "status": "pending",
      "activeForm": "Testing the implementation"
    }
  ]
}

Now let me create the unified `FormField` component that combines all three input types:

🔧 Tool: Write
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/ui/FormField.astro",
  "content": "---\n/**\n * FormField - A unified form field component that combines FormInput, FormSelect, and FormPhoneInput\n * with consistent validation, error handling, and styling.\n *\n * Usage:\n *   <FormField type=\"text\" label=\"Name\" name=\"name\" required />\n *   <FormField type=\"email\" label=\"Email\" name=\"email\" required />\n *   <FormField type=\"phone\" label=\"Phone\" name=\"phone\" required />\n *   <FormField type=\"select\" label=\"Country\" name=\"country\" options={countries} />\n *   <FormField type=\"textarea\" label=\"Message\" name=\"message\" rows={4} />\n */\n\ninterface Props {\n  /** Field type - determines the input element and validation */\n  type: 'text' | 'email' | 'tel' | 'phone' | 'textarea' | 'url' | 'select';\n  /** Field label text */\n  label: string;\n  /** Field name attribute */\n  name: string;\n  /** Placeholder text (defaults to label if not provided) */\n  placeholder?: string;\n  /** Whether the field is required */\n  required?: boolean;\n  /** Number of rows for textarea */\n  rows?: number;\n  /** Maximum character length */\n  maxLength?: number;\n  /** HTML pattern attribute for validation */\n  pattern?: string;\n  /** Validation type override (email, phone, url, name, text) */\n  validationType?: 'email' | 'phone' | 'url' | 'name' | 'text' | 'select';\n  /** Options for select type */\n  options?: string[] | { value: string; label: string }[];\n  /** Select placeholder text */\n  selectPlaceholder?: string;\n  /** Additional CSS classes */\n  class?: string;\n}\n\nconst {\n  type,\n  label,\n  name,\n  placeholder = '',\n  required = false,\n  rows = 4,\n  maxLength,\n  pattern,\n  validationType,\n  options = [],\n  selectPlaceholder = 'Please Select...',\n  class: className = '',\n} = Astro.props;\n\n// Determine validation type based on input type or explicit validationType\nconst getValidationType = () => {\n  if (validationType) return validationType;\n  if (type === 'email') return 'email';\n  if (type === 'tel' || type === 'phone') return 'phone';\n  if (type === 'url') return 'url';\n  if (type === 'select') return 'select';\n  return 'text';\n};\n\n// Check if type is phone (with country code selector)\nconst isPhoneWithCountry = type === 'phone';\nconst isSelect = type === 'select';\nconst isTextarea = type === 'textarea';\n\n// Common country codes for phone input\nconst countryCodes = [\n  { code: '+66', country: 'Thailand' },\n  { code: '+1', country: 'USA/Canada' },\n  { code: '+44', country: 'UK' },\n  { code: '+86', country: 'China' },\n  { code: '+91', country: 'India' },\n  { code: '+81', country: 'Japan' },\n  { code: '+82', country: 'South Korea' },\n  { code: '+65', country: 'Singapore' },\n  { code: '+971', country: 'UAE' },\n  { code: '+966', country: 'Saudi Arabia' },\n  { code: '+61', country: 'Australia' },\n  { code: '+49', country: 'Germany' },\n  { code: '+33', country: 'France' },\n];\n\n// Normalize options to { value, label } format\nconst normalizedOptions = options.map(opt =>\n  typeof opt === 'string' ? { value: opt, label: opt } : opt\n);\n\n// Shared styles\nconst baseInputClasses = 'w-full px-3 rounded-md border border-border bg-white focus:ring-2 focus:ring-bmg-primary focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500';\nconst inputClasses = `${baseInputClasses} h-[50px] flex flex-col justify-center items-start gap-3`;\nconst textareaClasses = `${baseInputClasses} py-3 flex flex-col justify-start items-start gap-3`;\nconst selectClasses = `${inputClasses} appearance-none cursor-pointer bg-[url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")] bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-10`;\nconst phoneSelectClasses = 'h-[50px] px-3 border-r border-border bg-white focus:ring-2 focus:ring-bmg-primary focus:outline-none transition-all duration-200 text-gray-900 appearance-none cursor-pointer bg-[url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'%3e%3cpolyline points=\\'6 9 12 15 18 9\\'%3e%3c/polyline%3e%3c/svg%3e\")] bg-[length:1em_1em] bg-[right_0.25rem_center] bg-no-repeat pr-6';\nconst phoneInputClasses = 'flex-1 h-[50px] px-3 bg-white focus:ring-2 focus:ring-bmg-primary focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500';\n---\n\n<div\n  class:list={['form-field space-y-2', className]}\n  data-form-field\n  data-field-name={name}\n  data-validation-type={getValidationType()}\n  data-required={required.toString()}\n>\n  <label for={name} class=\"block text-sm font-medium text-gray-900\">\n    {label}\n    {required && <span class=\"text-red-500\">*</span>}\n  </label>\n\n  {isPhoneWithCountry ? (\n    <!-- Phone input with country code selector -->\n    <div class=\"flex rounded-md border border-border bg-white overflow-hidden\" data-phone-wrapper>\n      <select\n        id={`${name}-country`}\n        name={`${name}-country`}\n        class={phoneSelectClasses}\n        aria-label=\"Country code\"\n        data-country-select\n      >\n        {countryCodes.map(({ code, country }) => (\n          <option value={code} title={country}>{code}</option>\n        ))}\n      </select>\n      <input\n        type=\"tel\"\n        id={name}\n        name={name}\n        placeholder={placeholder || label}\n        required={required}\n        class={phoneInputClasses}\n        inputmode=\"tel\"\n        autocomplete=\"tel\"\n        data-input\n      />\n    </div>\n  ) : isSelect ? (\n    <!-- Select dropdown -->\n    <select\n      id={name}\n      name={name}\n      required={required}\n      class={selectClasses}\n      data-input\n    >\n      <option value=\"\" disabled selected>{selectPlaceholder}</option>\n      {normalizedOptions.map((opt) => (\n        <option value={opt.value}>{opt.label}</option>\n      ))}\n    </select>\n  ) : isTextarea ? (\n    <!-- Textarea -->\n    <textarea\n      id={name}\n      name={name}\n      rows={rows}\n      placeholder={placeholder || label}\n      required={required}\n      maxlength={maxLength}\n      class={textareaClasses}\n      data-input\n    />\n  ) : (\n    <!-- Standard input (text, email, tel, url) -->\n    <input\n      type={type === 'phone' ? 'tel' : type}\n      id={name}\n      name={name}\n      placeholder={placeholder || label}\n      required={required}\n      maxlength={maxLength}\n      pattern={pattern}\n      class={inputClasses}\n      data-input\n    />\n  )}\n\n  <p class=\"form-field__error text-xs text-red-500 mt-1 hidden\" data-error-message aria-live=\"polite\"></p>\n</div>\n\n<style>\n  /* Error state styling */\n  .form-field.has-error [data-input],\n  .form-field.has-error [data-phone-wrapper] {\n    border-color: #ef4444;\n  }\n\n  .form-field.has-error [data-input]:focus,\n  .form-field.has-error [data-country-select]:focus {\n    --tw-ring-color: #ef4444;\n  }\n\n  .form-field.has-error .form-field__error {\n    display: block;\n  }\n\n  /* Valid state styling */\n  .form-field.is-valid [data-input],\n  .form-field.is-valid [data-phone-wrapper] {\n    border-color: #22c55e;\n  }\n</style>\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create FormField wrapper component",
      "status": "completed",
      "activeForm": "Creating FormField wrapper component"
    },
    {
      "content": "Add shared styles to FormField component",
      "status": "completed",
      "activeForm": "Adding shared styles to FormField"
    },
    {
      "content": "Update Contact.astro to use new FormField component",
      "status": "in_progress",
      "activeForm": "Updating Contact.astro to use FormField"
    },
    {
      "content": "Test the implementation",
      "status": "pending",
      "activeForm": "Testing the implementation"
    }
  ]
}

Now let me update the Contact.astro to use the new FormField component:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "---\nimport Button from '../ui/Button.astro';\nimport FormInput from '../ui/FormInput.astro';\nimport FormSelect from '../ui/FormSelect.astro';\nimport FormPhoneInput from '../ui/FormPhoneInput.astro';\nimport { useI18n } from '../../i18n/utils';",
  "new_string": "---\nimport Button from '../ui/Button.astro';\nimport FormField from '../ui/FormField.astro';\nimport { useI18n } from '../../i18n/utils';"
}

Now let me update the form fields to use the new FormField component:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "        <form class=\"space-y-6\" id=\"contact-form\" novalidate>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormInput label={t.contact.form.firstName} name=\"firstName\" validationType=\"name\" required />\n            <FormInput label={t.contact.form.surname} name=\"surname\" validationType=\"name\" required />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormPhoneInput label={t.contact.form.phone} name=\"phone\" required />\n            <FormInput label={t.contact.form.email} name=\"email\" type=\"email\" required />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormInput label={t.contact.form.whatsapp} name=\"whatsapp\" type=\"tel\" />\n            <FormSelect label={t.contact.form.position} name=\"position\" options={positions} />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormSelect label={t.contact.form.projectType} name=\"projectType\" options={projectTypes} />\n            <FormSelect label={t.contact.form.budget} name=\"budget\" options={budgetRanges} />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormSelect label={t.contact.form.consideration} name=\"consideration\" options={considerations} />\n            <FormSelect label={t.contact.form.timeline} name=\"timeline\" options={timelines} />\n          </div>\n          <FormInput label={t.contact.form.remark} name=\"remark\" type=\"textarea\" rows={4} maxLength={2000} />",
  "new_string": "        <form class=\"space-y-6\" id=\"contact-form\" novalidate>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormField type=\"text\" label={t.contact.form.firstName} name=\"firstName\" validationType=\"name\" required />\n            <FormField type=\"text\" label={t.contact.form.surname} name=\"surname\" validationType=\"name\" required />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormField type=\"phone\" label={t.contact.form.phone} name=\"phone\" required />\n            <FormField type=\"email\" label={t.contact.form.email} name=\"email\" required />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormField type=\"tel\" label={t.contact.form.whatsapp} name=\"whatsapp\" />\n            <FormField type=\"select\" label={t.contact.form.position} name=\"position\" options={positions} />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormField type=\"select\" label={t.contact.form.projectType} name=\"projectType\" options={projectTypes} />\n            <FormField type=\"select\" label={t.contact.form.budget} name=\"budget\" options={budgetRanges} />\n          </div>\n          <div class=\"grid sm:grid-cols-2 gap-6\">\n            <FormField type=\"select\" label={t.contact.form.consideration} name=\"consideration\" options={considerations} />\n            <FormField type=\"select\" label={t.contact.form.timeline} name=\"timeline\" options={timelines} />\n          </div>\n          <FormField type=\"textarea\" label={t.contact.form.remark} name=\"remark\" rows={4} maxLength={2000} />"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create FormField wrapper component",
      "status": "completed",
      "activeForm": "Creating FormField wrapper component"
    },
    {
      "content": "Add shared styles to FormField component",
      "status": "completed",
      "activeForm": "Adding shared styles to FormField"
    },
    {
      "content": "Update Contact.astro to use new FormField component",
      "status": "completed",
      "activeForm": "Updating Contact.astro to use FormField"
    },
    {
      "content": "Test the implementation by running build",
      "status": "in_progress",
      "activeForm": "Testing the implementation by running build"
    }
  ]
}

Now let's verify the implementation by running the build to ensure there are no errors:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | head -100",
  "description": "Run build to verify no errors",
  "timeout": 120000
}

The build completed successfully. Now let's also verify the component works by reading the updated Contact.astro file:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "limit": 120
}

The implementation is complete and the build passes. Let me update the todos and provide the summary:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create FormField wrapper component",
      "status": "completed",
      "activeForm": "Creating FormField wrapper component"
    },
    {
      "content": "Add shared styles to FormField component",
      "status": "completed",
      "activeForm": "Adding shared styles to FormField"
    },
    {
      "content": "Update Contact.astro to use new FormField component",
      "status": "completed",
      "activeForm": "Updating Contact.astro to use FormField"
    },
    {
      "content": "Test the implementation by running build",
      "status": "completed",
      "activeForm": "Testing the implementation by running build"
    }
  ]
}

<summary>
## Summary: Create a shared FormComponent wrapper that combines FormInput, FormSelect, and FormPhoneInput

### Changes Implemented
- Created a new unified `FormField.astro` component that combines `FormInput`, `FormSelect`, and `FormPhoneInput` with a single consistent API
- The FormField component supports all field types: `text`, `email`, `tel`, `phone` (with country code), `textarea`, `url`, and `select`
- Consolidated all styling and validation state handling (error/valid states) into one component
- Updated `Contact.astro` to use the new `FormField` component, reducing imports from 3 to 1

### Files Modified
- `src/components/ui/FormField.astro` (NEW) - Unified form field component
- `src/components/sections/Contact.astro` - Updated to use FormField instead of separate components

### Notes for Developer
- The original `FormInput.astro`, `FormSelect.astro`, and `FormPhoneInput.astro` components are still available for backward compatibility if needed elsewhere
- The `FormField` component supports the same validation types: `email`, `phone`, `url`, `name`, `text`, `select`
- Options can be passed as strings (`['Option 1', 'Option 2']`) or objects (`[{ value: 'opt1', label: 'Option 1' }]`)
- The `type="phone"` variant includes the country code selector automatically
- All existing form validation logic in the Contact section's inline script continues to work as-is
- Build passes successfully with no errors
</summary>