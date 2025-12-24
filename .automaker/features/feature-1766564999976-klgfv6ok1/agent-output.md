I'll start by exploring the codebase to understand its structure and then implement the footer color change to #2C266C.

🔧 Tool: Glob
Input: {
  "pattern": "**/*.{tsx,ts,jsx,js,css,scss}"
}

Let me search more specifically for the source code structure:

🔧 Tool: Glob
Input: {
  "pattern": "src/**/*.{tsx,ts,jsx,js,css,scss}"
}

Let me explore the project structure:

🔧 Tool: Bash
Input: {
  "command": "find /Users/benedictboisclair/Projects/BMG-Landing-v2 -maxdepth 3 -type f \\( -name \"*.tsx\" -o -name \"*.ts\" -o -name \"*.jsx\" -o -name \"*.js\" -o -name \"*.css\" -o -name \"*.scss\" \\) ! -path \"*/node_modules/*\" | head -50",
  "description": "Find source files excluding node_modules"
}

Let me look at the project's directory structure more carefully:

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/benedictboisclair/Projects/BMG-Landing-v2/ | head -30",
  "description": "List project root directory contents"
}

Now let me explore the src directory:

🔧 Tool: Bash
Input: {
  "command": "find /Users/benedictboisclair/Projects/BMG-Landing-v2/src -type f | sort",
  "description": "List all files in src directory"
}

Perfect! I found the Footer component. Let me examine it:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/layout/Footer.astro"
}

Now let me check the global CSS file to see how colors are defined:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/styles/global.css"
}

Let me check the Tailwind config to understand how colors are configured:

🔧 Tool: Bash
Input: {
  "command": "find /Users/benedictboisclair/Projects/BMG-Landing-v2 -maxdepth 2 -name \"*tailwind*\" -o -name \"*config*\" | grep -v node_modules",
  "description": "Find tailwind and config files"
}

Let me check the astro config file:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/astro.config.mjs"
}

Now let me search for any other references to the footer color or bg-gray-900 in the codebase:

🔧 Tool: Grep
Input: {
  "pattern": "bg-gray-900|footer|#2C266C|2C266C",
  "path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src"
}

Let me check the Footer specifically:

🔧 Tool: Grep
Input: {
  "pattern": "bg-gray-900|footer",
  "path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/layout/Footer.astro",
  "output_mode": "content"
}

Perfect! I can see the Footer component is using Tailwind's `bg-gray-900` class for the background color. The requirement is to change the footer color to #2C266C. 

Let me check if there's a custom color defined in the Tailwind config or if I need to add one. Let me look at the package.json to understand the project setup better:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/package.json"
}

Now I understand the project structure. It's an Astro project with Tailwind CSS. The Footer component is using `bg-gray-900` from Tailwind. I have two approaches:

1. **Add a custom color variable to the global CSS** and use it in the Footer
2. **Use the hex color directly with inline styles** or a Tailwind arbitrary value

The cleanest approach would be to add a custom color variable in the global.css file (where other BMG colors are defined) and then use it in the Footer. Let me implement this:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/styles/global.css",
  "old_string": "@theme {\n  --color-bmg-primary: #1a1a2e;\n  --color-bmg-secondary: #16213e;\n  --color-bmg-accent: #e94560;\n  --color-bmg-light: #f8f8f8;\n  --color-bmg-gold: #c9a962;\n  --color-bmg-gray: #6b7280;\n}",
  "new_string": "@theme {\n  --color-bmg-primary: #1a1a2e;\n  --color-bmg-secondary: #16213e;\n  --color-bmg-accent: #e94560;\n  --color-bmg-light: #f8f8f8;\n  --color-bmg-gold: #c9a962;\n  --color-bmg-gray: #6b7280;\n  --color-bmg-footer: #2C266C;\n}"
}

Now let me update the Footer component to use this new color:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/layout/Footer.astro",
  "old_string": "<footer class=\"bg-gray-900 text-gray-400 py-6\">",
  "new_string": "<footer class=\"bg-bmg-footer text-gray-400 py-6\">"
}

Perfect! Let me verify the changes were made correctly by reading both files:

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/components/layout/Footer.astro"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/benedictboisclair/Projects/BMG-Landing-v2/src/styles/global.css"
}

Excellent! Both files have been updated correctly. Let me verify the build works by running the build command:

🔧 Tool: Bash
Input: {
  "command": "npm run build",
  "description": "Build the Astro project to verify changes work",
  "timeout": 60000
}

Perfect! The build completed successfully with no errors. Now let me create a git commit to document the changes:

🔧 Tool: Bash
Input: {
  "command": "git status",
  "description": "Check git status for modified files"
}

Let me check what's actually in git to see the status better:

🔧 Tool: Bash
Input: {
  "command": "git diff src/styles/global.css src/components/layout/Footer.astro",
  "description": "Show the actual changes made to footer files"
}

Let me check if the files are tracked:

🔧 Tool: Bash
Input: {
  "command": "git log --oneline -5",
  "description": "Check recent commits"
}
