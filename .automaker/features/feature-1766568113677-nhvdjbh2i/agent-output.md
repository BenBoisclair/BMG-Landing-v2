I'll continue the implementation of HTTP security headers. Let me first explore the current state of the codebase to understand what may have been done previously.

🔧 Tool: Glob
Input: {
  "pattern": "**/*middleware*"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/astro.config.*"
}

🔧 Tool: Grep
Input: {
  "pattern": "security|X-Content-Type|X-Frame-Options|HSTS|Strict-Transport",
  "-i": true
}

There's already a `src/middleware.ts` file. Let me check its current contents along with the astro.config.mjs:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/middleware.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/astro.config.mjs"
}

The security headers middleware is already implemented. I can see:

1. **`src/middleware.ts`** - Contains a well-documented middleware that sets:
   - `X-Content-Type-Options: nosniff` ✅
   - `X-XSS-Protection: 1; mode=block` ✅
   - `X-Frame-Options: SAMEORIGIN` ✅
   - `Referrer-Policy: strict-origin-when-cross-origin` ✅
   - `Permissions-Policy` (with comprehensive feature restrictions) ✅

2. **`astro.config.mjs`** - Contains security settings and CSP configuration via the experimental flag ✅

However, I notice that **Strict-Transport-Security (HSTS)** is missing from the middleware, which was requested in the feature description. Let me add that:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/middleware.ts",
  "old_string": "    // Control referrer information\n    // 'strict-origin-when-cross-origin' is a good balance of security and functionality\n    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');",
  "new_string": "    // Control referrer information\n    // 'strict-origin-when-cross-origin' is a good balance of security and functionality\n    newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');\n\n    // HTTP Strict Transport Security (HSTS)\n    // Forces browsers to use HTTPS for all future requests to this domain\n    // max-age=31536000 (1 year) is the recommended minimum for HSTS preload\n    // includeSubDomains: applies HSTS to all subdomains\n    // Note: Only add HSTS when the site is served over HTTPS\n    // The header is ignored over HTTP, but it's good practice to check\n    newHeaders.set(\n      'Strict-Transport-Security',\n      'max-age=31536000; includeSubDomains'\n    );"
}

Now let me also update the header comment block to include HSTS in the documentation:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/middleware.ts",
  "old_string": " * Headers added:\n * - X-Content-Type-Options: Prevents MIME type sniffing\n * - X-Frame-Options: Controls iframe embedding (legacy, also in CSP)\n * - X-XSS-Protection: XSS filter for older browsers\n * - Referrer-Policy: Controls referrer information leakage\n * - Permissions-Policy: Restricts access to sensitive browser features",
  "new_string": " * Headers added:\n * - X-Content-Type-Options: Prevents MIME type sniffing\n * - X-Frame-Options: Controls iframe embedding (legacy, also in CSP)\n * - X-XSS-Protection: XSS filter for older browsers\n * - Referrer-Policy: Controls referrer information leakage\n * - Strict-Transport-Security: Forces HTTPS connections (HSTS)\n * - Permissions-Policy: Restricts access to sensitive browser features"
}

Let me verify the complete middleware file to ensure everything is correct:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/middleware.ts"
}

The middleware is now complete with all requested security headers. Let me verify the build works correctly:

🔧 Tool: Bash
Input: {
  "command": "npm run build 2>&1 | tail -30",
  "description": "Build Astro project to verify changes",
  "timeout": 120000
}

The build completed successfully. Let me also run TypeScript checks to ensure there are no type errors:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit 2>&1 | tail -20",
  "description": "Type-check the project",
  "timeout": 60000
}

TypeScript check passes without errors. The implementation is complete.

<summary>
## Summary: Configure Essential HTTP Security Headers

### Changes Implemented
- Added **Strict-Transport-Security (HSTS)** header to the existing security middleware
  - Configured with `max-age=31536000` (1 year) for strong HTTPS enforcement
  - Included `includeSubDomains` directive for subdomain protection
- Updated middleware documentation to include HSTS in the list of security headers

### All Security Headers Now Configured
The middleware (`src/middleware.ts`) now includes all requested headers:
1. **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
2. **X-Frame-Options: SAMEORIGIN** - Controls iframe embedding
3. **X-XSS-Protection: 1; mode=block** - XSS filter for legacy browsers
4. **Referrer-Policy: strict-origin-when-cross-origin** - Controls referrer leakage
5. **Strict-Transport-Security: max-age=31536000; includeSubDomains** - Forces HTTPS (HSTS)
6. **Permissions-Policy** - Restricts access to sensitive browser features (camera, microphone, geolocation, etc.)

### Files Modified
- `src/middleware.ts` - Added HSTS header and updated documentation comments

### Notes for Developer
- HSTS headers are only meaningful when served over HTTPS; browsers ignore them on HTTP
- The 1-year `max-age` is the recommended minimum for HSTS preload submission
- If you need HSTS preloading (inclusion in browser preload lists), add `preload` to the directive: `'max-age=31536000; includeSubDomains; preload'`
- All security headers are only added to HTML responses (content-type: text/html)
- CSP (Content Security Policy) is separately configured in `astro.config.mjs` using Astro's experimental CSP feature
</summary>