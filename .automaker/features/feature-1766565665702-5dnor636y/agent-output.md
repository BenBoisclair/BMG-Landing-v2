I'll help you implement this feature. Let me start by exploring the codebase to understand the structure of the Contact.astro file and the available icons in the images folder.

🔧 Tool: Glob
Input: {
  "pattern": "**/Contact.astro"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/images/**/*"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/contact.*"
}

Great! I can see there are several icons in the `/public/images/Landing/` folder that appear to be contact-related:
- email.svg
- property-location.svg
- mobile-chat.svg
- facebook.svg
- line.svg
- instagram.svg
- youtube.svg

Now let me read the Contact.astro file to understand its current structure:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro"
}

Perfect! I can see the Contact.astro file currently uses inline SVG icons for the contact information section (address, phone, email) and social media links. The task is to replace these inline SVGs with the actual icon files from the `/public/images/Landing/` folder.

Let me check what icons are available:

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/*.svg",
  "description": "List SVG icons in images folder"
}

Excellent! Now let me check what these icons look like to understand how they should be used:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/property-location.svg"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/mobile-chat.svg"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/email.svg"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/facebook.svg"
}

Perfect! Now I understand the structure. The icons in the images folder are already styled with the brand colors (#2C266C). Now let me check the other social media icons:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/line.svg"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/instagram.svg"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/public/images/Landing/youtube.svg"
}

Perfect! Now I have a complete understanding. I need to replace the inline SVG icons in the Contact.astro file with `<img>` tags that reference the icon files from the `/public/images/Landing/` folder. The icons are:

**For contact info (left side icons):**
- Address: `property-location.svg`
- Phone: `mobile-chat.svg`
- Email: `email.svg`

**For social media:**
- Facebook: `facebook.svg`
- Line: `line.svg`
- Instagram: `instagram.svg`
- YouTube: `youtube.svg`

Now I'll implement the changes:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "          <!-- Address -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6 text-bmg-gold\">\n              <svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\" />\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 11a3 3 0 11-6 0 3 3 0 016 0z\" />\n              </svg>\n            </div>\n            <div class=\"text-gray-600\">\n              {contactInfo.address.map((line) => (\n                <p>{line}</p>\n              ))}\n            </div>\n          </div>",
  "new_string": "          <!-- Address -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6\">\n              <img src=\"/images/Landing/property-location.svg\" alt=\"Location\" class=\"w-full h-full\" />\n            </div>\n            <div class=\"text-gray-600\">\n              {contactInfo.address.map((line) => (\n                <p>{line}</p>\n              ))}\n            </div>\n          </div>"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "          <!-- Phone -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6 text-bmg-gold\">\n              <svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z\" />\n              </svg>\n            </div>\n            <div class=\"text-gray-600\">\n              {contactInfo.phone.map((phone) => (\n                <p>{phone}</p>\n              ))}\n            </div>\n          </div>",
  "new_string": "          <!-- Phone -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6\">\n              <img src=\"/images/Landing/mobile-chat.svg\" alt=\"Phone\" class=\"w-full h-full\" />\n            </div>\n            <div class=\"text-gray-600\">\n              {contactInfo.phone.map((phone) => (\n                <p>{phone}</p>\n              ))}\n            </div>\n          </div>"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "          <!-- Email -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6 text-bmg-gold\">\n              <svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" />\n              </svg>\n            </div>\n            <a href={`mailto:${contactInfo.email}`} class=\"text-gray-600 hover:text-bmg-primary transition-colors\">\n              {contactInfo.email}\n            </a>\n          </div>",
  "new_string": "          <!-- Email -->\n          <div class=\"flex gap-4\">\n            <div class=\"flex-shrink-0 w-6 h-6\">\n              <img src=\"/images/Landing/email.svg\" alt=\"Email\" class=\"w-full h-full\" />\n            </div>\n            <a href={`mailto:${contactInfo.email}`} class=\"text-gray-600 hover:text-bmg-primary transition-colors\">\n              {contactInfo.email}\n            </a>\n          </div>"
}

Now I need to replace the social media icons. Let me update those:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "old_string": "          <!-- Social Links -->\n          <div class=\"pt-4 space-y-4\">\n            {contactInfo.socials.map((social) => (\n              <a href={social.url} target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex items-center gap-4 hover:opacity-70 transition-opacity group\">\n                <div class=\"w-8 h-8 rounded-full bg-bmg-primary flex items-center justify-center\">\n                  {social.icon === 'facebook' && (\n                    <svg class=\"w-4 h-4 text-white\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                      <path d=\"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z\"/>\n                    </svg>\n                  )}\n                  {social.icon === 'line' && (\n                    <svg class=\"w-4 h-4 text-white\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                      <path d=\"M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314\"/>\n                    </svg>\n                  )}\n                  {social.icon === 'instagram' && (\n                    <svg class=\"w-4 h-4 text-white\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                      <path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z\"/>\n                    </svg>\n                  )}\n                  {social.icon === 'youtube' && (\n                    <svg class=\"w-4 h-4 text-white\" fill=\"currentColor\" viewBox=\"0 0 24 24\">\n                      <path d=\"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z\"/>\n                    </svg>\n                  )}\n                </div>\n                <span class=\"text-gray-600 group-hover:text-bmg-primary transition-colors\">{social.handle}</span>\n              </a>\n            ))}\n          </div>",
  "new_string": "          <!-- Social Links -->\n          <div class=\"pt-4 space-y-4\">\n            {contactInfo.socials.map((social) => (\n              <a href={social.url} target=\"_blank\" rel=\"noopener noreferrer\" class=\"flex items-center gap-4 hover:opacity-70 transition-opacity group\">\n                <div class=\"w-8 h-8 flex items-center justify-center\">\n                  <img src={`/images/Landing/${social.icon}.svg`} alt={social.name} class=\"w-full h-full\" />\n                </div>\n                <span class=\"text-gray-600 group-hover:text-bmg-primary transition-colors\">{social.handle}</span>\n              </a>\n            ))}\n          </div>"
}

Perfect! Now let me verify the changes by reading the updated file to ensure everything looks correct:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro",
  "offset": 120,
  "limit": 50
}

Excellent! The changes have been successfully implemented. Let me verify that the build still works:

🔧 Tool: Bash
Input: {
  "command": "npm run build",
  "description": "Build the project to verify changes",
  "timeout": 120000
}

Perfect! The build completed successfully. Let me create a quick summary of what was implemented:

<summary>
## Summary: Update Contact.astro to Use Icons from Images Folder

### Changes Implemented
- Replaced all inline SVG icons in the Contact section with `<img>` tags referencing the icon files from `/public/images/Landing/`
- Updated the Address icon to use `property-location.svg`
- Updated the Phone icon to use `mobile-chat.svg`
- Updated the Email icon to use `email.svg`
- Updated all social media icons (Facebook, Line, Instagram, YouTube) to dynamically load from the images folder using the `${social.icon}.svg` pattern
- Removed unnecessary CSS classes (like `text-bmg-gold` and `bg-bmg-primary`) from icon containers since the SVG files already contain the proper brand colors (#2C266C)
- Maintained all existing functionality and hover states

### Files Modified
- `/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/sections/Contact.astro`

### Notes for Developer
- The SVG icons in `/public/images/Landing/` are already styled with the brand color (#2C266C), so no additional color styling is needed
- The social media icons now use a dynamic path `${social.icon}.svg` which maps to the icon property in the contactInfo.socials array
- All icons maintain their responsive sizing with `w-full h-full` classes
- The build completed successfully with no errors
- The implementation follows existing Astro patterns and maintains consistency with the codebase
</summary>