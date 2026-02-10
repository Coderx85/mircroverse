# @repo/ui - UI Component Library

A shared UI component library for the e-commerce monorepo, built with React and styled with **Tailwind CSS v4**.

## 🚀 Features

- ✅ **Tailwind CSS v4** - Latest version with CSS-based configuration
- ✅ **TypeScript** - Full type safety
- ✅ **React 19** - Latest React features
- ✅ **Custom Design System** - OKLCH color space for perceptual uniformity
- ✅ **Dark Mode** - Built-in dark theme support
- ✅ **Component Variants** - Using `class-variance-authority`
- ✅ **Accessible** - Base UI components for accessibility

## 📦 Installation

This is a workspace package. It's already installed in your monorepo via `pnpm`.

To use in an app:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

## 🎨 Tailwind v4 Setup

This package uses **Tailwind CSS v4.1.18** with the following configuration:

### CSS Import

```css
/* src/styles/globals.css */
@import "tailwindcss";

/* Your custom CSS variables and theme */
:root {
  --background: oklch(0.9779 0.0042 56.3756);
  --foreground: oklch(0.2178 0 0);
  /* ... more variables */
}

@theme inline {
  /* Tailwind theme tokens */
  --font-sans: Trispace, ui-sans-serif, sans-serif, system-ui;
  --color-primary: var(--primary);
  /* ... more tokens */
}

@custom-variant dark (&:is(.dark *));
```

### Import in Your App

```tsx
// In your Next.js app/layout.tsx or main entry
import "@repo/ui/styles/globals.css";
```

## 📚 Documentation

- **[TAILWIND_V4_MIGRATION.md](./TAILWIND_V4_MIGRATION.md)** - Complete migration guide and what changed
- **[TAILWIND_V4_FEATURES.md](./TAILWIND_V4_FEATURES.md)** - Quick reference for v4 CSS features

## 🎨 Design System

### Colors

Uses the OKLCH color space for better perceptual uniformity and gamut coverage:

- `--background` / `--foreground` - Base colors
- `--primary` / `--primary-foreground` - Primary brand colors
- `--secondary` / `--secondary-foreground` - Secondary colors
- `--accent` / `--accent-foreground` - Accent colors
- `--muted` / `--muted-foreground` - Muted/subtle colors
- `--destructive` / `--destructive-foreground` - Error/danger colors
- `--card` / `--card-foreground` - Card component colors
- `--popover` / `--popover-foreground` - Popover/dialog colors

### Typography

Custom font stack:

- **Sans**: Trispace
- **Serif**: Libre Baskerville
- **Mono**: IBM Plex Mono

### Shadows

Custom shadow system with configurable parameters:

- `--shadow-2xs` through `--shadow-2xl`
- Customizable via `--shadow-color`, `--shadow-blur`, etc.

## 🧩 Components

Current components:

- **Button** - Versatile button component with variants
- **Card** - Container component with header/content/footer
- **Code** - Inline code display
- **Spinner** - Loading spinner

## 📖 Usage Examples

### Using Tailwind Classes

```tsx
import { Button } from "@repo/ui/button";

export function MyComponent() {
  return (
    <div className="flex items-center gap-4 p-6 bg-background text-foreground">
      <Button variant="default" size="lg">
        Click me
      </Button>
    </div>
  );
}
```

### Using CSS Variables

```tsx
<div className="bg-[color:var(--primary)] text-[color:var(--primary-foreground)]">
  Custom colored div
</div>
```

### Dark Mode

```tsx
<div className="dark:bg-gray-900 dark:text-white">
  This changes in dark mode
</div>
```

Add the `dark` class to a parent element to enable dark mode:

```tsx
<html className="dark">{/* Everything inside uses dark mode colors */}</html>
```

## 🛠️ Development

### Scripts

```bash
# Type checking
pnpm check-types

# Linting
pnpm lint

# Generate new component (if configured)
pnpm generate:component
```

## 📦 Exports

This package exports components and styles:

```json
{
  "exports": {
    "./*": "./src/*.tsx",
    "./styles/*": "./src/styles/*"
  }
}
```

Import components:

```tsx
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
```

Import styles:

```tsx
import "@repo/ui/styles/globals.css";
```

## 🤝 Contributing

When adding new components:

1. **Follow the existing patterns** - Use `class-variance-authority` for variants
2. **Use design tokens** - Reference CSS variables from `globals.css`
3. **Support dark mode** - Use the `dark:` variant
4. **Type everything** - Full TypeScript support
5. **Keep it accessible** - Use Base UI or similar for accessibility

## 🔗 Related Packages

- `@repo/types` - Shared TypeScript types
- `@repo/eslint-config` - Shared ESLint configuration
- `@repo/typescript-config` - Shared TypeScript configuration

## 📄 License

Private package for internal use in the e-commerce monorepo.

---

Built with ❤️ using Tailwind CSS v4
