# Tailwind CSS v4 Migration Guide

## Overview

This project has been successfully migrated from Tailwind CSS v3 to **Tailwind CSS v4** (currently v4.1.18). Tailwind v4 introduces a completely new architecture with significant improvements in performance, developer experience, and capabilities.

## What Changed

### 1. **Installation & Dependencies**

**Packages Updated:**

- `tailwindcss`: `^4.1.18` (UI package & Web app)
- `@tailwindcss/vite`: `^4.1.18` (UI package)
- `@tailwindcss/postcss`: `^4.1.18` (Web app)

### 2. **Configuration Approach**

**Before (v3):**

```javascript
// tailwind.config.cjs
module.exports = {
  content: ["./apps/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**After (v4):**

- ❌ **Removed**: `tailwind.config.cjs` file at the root
- ✅ **New**: Configuration is now done **entirely in CSS** using the `@theme` directive

### 3. **CSS Import Syntax**

**Before (v3):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v4):**

```css
@import "tailwindcss";
```

This single import replaces all three v3 directives and provides better integration with CSS modules and build tools.

### 4. **File Changes**

#### Updated Files:

1. **`packages/ui/src/styles/globals.css`**
   - Added `@import "tailwindcss";` at the top
   - Kept all existing custom properties and theme configuration
   - Already using v4 features: `@theme inline` and `@custom-variant`

2. **`apps/web/app/globals.css`**
   - Changed from `@tailwind` directives to `@import "tailwindcss";`
   - Continues to import UI package styles

3. **`apps/web/postcss.config.ts`**
   - Already configured with `@tailwindcss/postcss` plugin ✅

#### Removed Files:

- **`tailwind.config.cjs`** (root) - No longer needed!

## New Tailwind v4 Features

### 1. **CSS-Based Configuration with `@theme`**

Your project already uses this! The `@theme inline` directive in `globals.css` allows you to define design tokens directly in CSS:

```css
@theme inline {
  --font-sans: Trispace, ui-sans-serif, sans-serif, system-ui;
  --font-mono: IBM Plex Mono, monospace;
  --radius-lg: var(--radius);
  --color-primary: var(--primary);
  /* ... and more */
}
```

**Benefits:**

- No JavaScript config file needed
- Better IDE autocomplete
- Faster build times
- Type-safe with CSS variables

### 2. **Custom Variants with `@custom-variant`**

Your project uses this for dark mode:

```css
@custom-variant dark (&:is(.dark *));
```

This creates a custom variant that applies when an element or its parent has the `.dark` class.

### 3. **Native CSS Variable Support**

Tailwind v4 has first-class support for CSS variables. Your existing color scheme using OKLCH colors works seamlessly:

```css
:root {
  --background: oklch(0.9779 0.0042 56.3756);
  --foreground: oklch(0.2178 0 0);
  /* ... */
}
```

You can use these directly in utility classes:

```html
<div class="bg-[color:var(--background)]">...</div>
```

### 4. **Improved Performance**

- **Up to 10x faster** build times
- **Smaller CSS output** due to better optimization
- **Lightning-fast HMR** in development

## How to Use Tailwind v4 in Your Project

### 1. **In the UI Package (`packages/ui`)**

The UI package is configured to use:

- **@tailwindcss/vite** plugin (if using Vite)
- All design tokens defined in `src/styles/globals.css`

### 2. **In the Web App (`apps/web`)**

The web app uses:

- **Next.js** with PostCSS
- **@tailwindcss/postcss** plugin configured in `postcss.config.ts`
- Imports UI package styles via `@import "@repo/ui/styles/globals.css";`

### 3. **Using Tailwind Classes**

Nothing changes! Your existing Tailwind classes work exactly the same:

```tsx
<div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-lg">
  <span>Hello Tailwind v4!</span>
</div>
```

### 4. **Adding Custom Utilities**

Use the `@utility` directive in your CSS:

```css
@utility btn-custom {
  @apply px-4 py-2 rounded-lg font-semibold;
  background: linear-gradient(to right, var(--primary), var(--secondary));
}
```

Then use it:

```html
<button class="btn-custom">Click me</button>
```

## Migration Notes

### ✅ What's Working

- ✅ All existing components and styles
- ✅ CSS custom properties and variables
- ✅ Dark mode with custom variant
- ✅ Custom fonts (Trispace, Libre Baskerville, IBM Plex Mono)
- ✅ OKLCH color scheme
- ✅ Custom shadows and spacing
- ✅ Next.js integration via PostCSS

### ⚠️ Known Lint Warnings (Safe to Ignore)

Your IDE may show warnings for:

- `Unknown at rule @custom-variant`
- `Unknown at rule @theme`

These are **valid Tailwind v4 directives** and will work correctly. The CSS language server doesn't recognize them yet, but Tailwind processes them properly.

### 🔄 Differences from v3

1. **No more `tailwind.config.js`** - Configure in CSS instead
2. **`@import` instead of `@tailwind`** - Simpler, more standard
3. **Better CSS variable integration** - Use them directly everywhere
4. **Faster builds** - Enjoy the speed!

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Vite Plugin Guide](https://tailwindcss.com/docs/installation/using-vite)
- [PostCSS Plugin Guide](https://tailwindcss.com/docs/installation/using-postcss)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

## Testing the Migration

To verify everything works:

```bash
# Install dependencies (if not done)
pnpm install

# Start the dev server
pnpm dev

# Build the project
pnpm build
```

All your existing styles should work without any changes!

## Next Steps

1. ✅ **Migration Complete** - Tailwind v4 is now active
2. 💡 **Explore new features** - Try `@utility`, `@variant`, and advanced CSS-based theming
3. 🎨 **Leverage CSS variables** - Use your design tokens more flexibly
4. 🚀 **Enjoy faster builds** - v4 is significantly faster than v3

---

**Last Updated:** February 6, 2026  
**Tailwind Version:** 4.1.18  
**Migration Status:** ✅ Complete
