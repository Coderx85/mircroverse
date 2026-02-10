# Tailwind v4 CSS Features Quick Reference

## CSS-Based Configuration

### Theme Definition

Use `@theme` to define your design system:

```css
@theme {
  /* Colors */
  --color-brand: #ff6b6b;
  --color-accent: #4ecdc4;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;

  /* Typography */
  --font-sans: Inter, system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Border Radius */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) - 0.125rem);
  --radius-lg: calc(var(--radius) + 0.125rem);
}
```

Use inline theme (like your project does):

```css
@theme inline {
  /* Your theme tokens here */
}
```

### Custom Variants

Create reusable state variants:

```css
/* Dark mode variant (already in your project) */
@custom-variant dark (&:is(.dark *));

/* Hover on parent */
@custom-variant parent-hover (:hover > &);

/* Group hover variant */
@custom-variant group-hover (:where(.group):hover &);

/* Desktop only */
@custom-variant desktop (@media (min-width: 1024px));

/* Mobile only */
@custom-variant mobile (@media (max-width: 768px));

/* Print styles */
@custom-variant print (@media print);
```

Usage:

```html
<div class="dark:bg-gray-900 parent-hover:scale-105">Content</div>
```

### Custom Utilities

Define custom utility classes:

```css
@utility text-gradient {
  background: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@utility shine {
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
}
```

Usage:

```html
<h1 class="text-gradient text-4xl font-bold">Gradient Text</h1>
<div class="glass p-6 rounded-lg">Glassmorphism</div>
<button class="shine px-4 py-2">Shiny Button</button>
```

### Custom Media Queries

Define reusable breakpoints:

```css
@custom-media --mobile (max-width: 640px);
@custom-media --tablet (min-width: 641px) and (max-width: 1024px);
@custom-media --desktop (min-width: 1025px);
@custom-media --dark (prefers-color-scheme: dark);
@custom-media --motion (prefers-reduced-motion: no-preference);
```

## CSS Variable Integration

### Direct Variable Usage

```html
<!-- Use CSS variables directly -->
<div class="bg-[color:var(--background)]">Background</div>
<div class="text-[color:var(--primary)]">Primary color</div>

<!-- Use in arbitrary values -->
<div class="w-[var(--sidebar-width)]">Width from variable</div>
<div class="p-[var(--spacing)]">Padding from variable</div>
```

### Variable-Based Colors

Your project uses this pattern:

```css
:root {
  --primary: oklch(0.465 0.147 24.9381);
  --primary-foreground: oklch(1 0 0);
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

Then use:

```html
<button class="bg-primary text-primary-foreground">Button</button>
```

## Advanced Examples

### Dynamic Theme Switching

```css
@theme inline {
  /* Light mode colors */
  --color-bg: oklch(0.98 0 0);
  --color-text: oklch(0.22 0 0);
}

@custom-variant dark (&:is(.dark *));

.dark {
  /* Dark mode colors */
  --color-bg: oklch(0.22 0 0);
  --color-text: oklch(0.98 0 0);
}
```

### Responsive Variants

```css
@custom-variant tablet (@media (min-width: 640px));
@custom-variant laptop (@media (min-width: 1024px));
@custom-variant desktop (@media (min-width: 1280px));
```

```html
<div
  class="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
>
  <!-- Responsive grid -->
</div>
```

### Animation Utilities

```css
@utility animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@utility animate-slide-up {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Container Queries (New in v4!)

```css
@custom-variant container-sm (@container (min-width: 320px));
@custom-variant container-md (@container (min-width: 768px));
@custom-variant container-lg (@container (min-width: 1024px));
```

```html
<div class="@container">
  <div class="container-md:flex container-lg:grid">
    <!-- Changes layout based on container size! -->
  </div>
</div>
```

## Best Practices

### 1. **Use CSS Variables for Theming**

```css
:root {
  /* Define base tokens */
  --space-unit: 0.25rem;
  --color-brand: #ff6b6b;
}

@theme inline {
  /* Map to Tailwind utilities */
  --spacing: var(--space-unit);
  --color-primary: var(--color-brand);
}
```

### 2. **Organize Variants by Purpose**

```css
/* State variants */
@custom-variant dark (&:is(.dark *));
@custom-variant loading (&:is(.loading *));

/* Responsive variants */
@custom-variant mobile (@media (max-width: 640px));
@custom-variant tablet (@media (min-width: 641px));

/* User preference variants */
@custom-variant motion (@media (prefers-reduced-motion: no-preference));
@custom-variant dark-mode (@media (prefers-color-scheme: dark));
```

### 3. **Create Semantic Utilities**

Instead of:

```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg"></button>
```

Create:

```css
@utility btn-primary {
  @apply px-4 py-2 bg-primary text-primary-foreground rounded-lg;
  @apply hover:bg-primary/90 transition-colors;
}
```

And use:

```html
<button class="btn-primary">Click me</button>
```

## Debugging Tips

### Check Generated CSS

```bash
# See what Tailwind generates
pnpm dev

# Check the compiled CSS in DevTools
```

### Validate Theme Variables

```css
/* Add this temporarily to debug */
:root {
  --debug: var(--color-primary); /* Check if variable exists */
}
```

### Use Browser DevTools

1. Open DevTools → Elements
2. Select an element
3. Check "Computed" tab to see final CSS
4. Verify CSS variables are resolving correctly

## Resources

- [Tailwind v4 Docs](https://tailwindcss.com/docs/v4-beta)
- [CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [@theme directive](https://tailwindcss.com/docs/theme)
- [@utility directive](https://tailwindcss.com/docs/adding-custom-styles#using-utilities)

---

**Pro Tip:** Tailwind v4 embraces CSS! Leverage modern CSS features like `:has()`, `:is()`, `:where()`, and container queries for powerful styling.
