# PijBlog Design System

This document outlines the design system and styling conventions used throughout the PijBlog project.

## 📁 File Structure

```
src/
├── styles/
│   ├── designTokens.ts    # Core design tokens (spacing, colors, shadows, etc.)
│   └── classNames.ts      # Reusable className patterns for pages
├── index.css              # Global styles and Tailwind utilities
└── App.css                # Minimal app-specific styles
```

## 🎨 Design Tokens

All design tokens are centralized in `src/styles/designTokens.ts`. Import and use them in your components:

```tsx
import { componentStyles, zIndex, spacing } from '../styles/designTokens';
```

### Available Tokens

- **spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- **borderRadius**: Border radius values (sm, md, lg, xl, 2xl, full)
- **shadows**: Shadow definitions (sm, md, lg, xl, 2xl)
- **transitions**: Transition durations (fast, normal, slow, slower)
- **zIndex**: Z-index layers (base, dropdown, sticky, fixed, modalBackdrop, modal, popover, tooltip)
- **fontSize**: Typography scale
- **fontWeight**: Font weight values
- **componentStyles**: Pre-configured styles for common components

## 🎯 Color System

Colors are defined using CSS custom properties in `src/index.css` and adapt to light/dark mode automatically.

### Primary Colors

- `bg-primary` / `text-primary` - Main brand color
- `bg-accent` / `text-accent` - Accent/call-to-action color
- `bg-secondary` / `text-secondary` - Secondary brand color
- `bg-background` / `text-background` - Background color

### Color Variants

Each color has variants: `default`, `dark`, and `light`

- Example: `bg-primary-dark`, `text-accent-light`

### Usage in Components

```tsx
<div className="bg-primary dark:bg-primary-dark text-background dark:text-gray-100">
  Content
</div>
```

## 🧩 Component Patterns

### Button Component

Uses design tokens from `componentStyles.button`:

```tsx
import { Button } from './components/common/Button';

<Button variant="primary" size="md">Click me</Button>
<Button variant="accent" size="lg" fullWidth>Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

**Variants**: `primary`, `secondary`, `accent`, `outline`, `ghost`
**Sizes**: `sm`, `md`, `lg`

### Card Component

Uses design tokens from `componentStyles.card`:

```tsx
import { Card } from './components/common/Card';

<Card padding="md" hover>
  {/* Content */}
</Card>
```

**Padding**: `none`, `sm`, `md`, `lg`
**Props**: `hover` - Adds hover effects

### Input Component

Uses design tokens from `componentStyles.input`:

```tsx
import { Input, TextArea } from './components/common/Input';

<Input
  label="Username"
  placeholder="Enter username"
  error={errors.username}
/>

<TextArea
  label="Bio"
  rows={4}
  helperText="Tell us about yourself"
/>
```

### Modal Component

```tsx
import { Modal } from './components/common/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  {/* Modal content */}
</Modal>
```

**Sizes**: `sm`, `md`, `lg`, `xl`

## 📄 Page Layout Patterns

Import reusable className patterns from `src/styles/classNames.ts`:

```tsx
import {
  pageContainer,
  pageTitle,
  sectionTitle,
  gridLayouts,
  emptyState
} from '../styles/classNames';

// Page structure
<div className={pageContainer}>
  <h1 className={pageTitle}>Page Title</h1>

  <div className={gridLayouts.cols3}>
    {/* Grid items */}
  </div>
</div>

// Empty state
<div className={emptyState}>
  <svg className={emptyStateIcon}>...</svg>
  <h2 className={emptyStateTitle}>No Items Found</h2>
  <p className={emptyStateDescription}>Try adjusting your filters</p>
</div>
```

### Available Page Patterns

- `pageContainer` - Main page wrapper
- `pageTitle` - Page heading
- `sectionTitle` - Section heading
- `bodyText` - Standard body text
- `mutedText` - Secondary/muted text
- `linkText` - Styled links
- `formContainer` - Form wrapper
- `gridLayouts.cols1/2/3/4` - Responsive grid layouts
- `flexLayouts.center/between/start` - Flex layouts
- `emptyState*` - Empty state components
- `badge*` - Badge components
- `divider` - Section divider

## 🌓 Dark Mode

Dark mode is managed through the `ThemeContext` and applied using Tailwind's `dark:` prefix.

### Best Practices

1. Always provide dark mode variants for colors:

   ```tsx
   className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
   ```

2. Use semantic color tokens when possible:

   ```tsx
   className="text-primary dark:text-background"
   ```

3. Test all components in both light and dark mode

## ✨ Animation & Transitions

### Standard Transition

Use for most interactive elements:

```tsx
className="transition-all duration-300"
```

### Hover Effects

```tsx
className="hover:scale-105 hover:shadow-lg transition-all duration-300"
```

### Common Animations

- `animate-spin` - Loading spinners
- `animate-pulse` - Subtle pulsing
- `hover:-translate-y-1` - Lift on hover
- `active:scale-95` - Press effect

## 📐 Spacing System

Follow the spacing scale from `designTokens.ts`:

- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

Use Tailwind classes: `p-4`, `m-6`, `gap-8`, etc.

## 🔤 Typography

### Font Sizes

- Page titles: `text-4xl md:text-5xl`
- Section titles: `text-2xl md:text-3xl`
- Body text: `text-base`
- Small text: `text-sm`
- Tiny text: `text-xs`

### Font Weights

- Light: `font-light` (300)
- Normal: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

## 📱 Responsive Design

Use Tailwind's responsive prefixes:

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
```

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🛠️ Best Practices

1. **Use Design Tokens**: Import from `designTokens.ts` instead of hard-coding values
2. **Consistent Spacing**: Use the spacing scale for margins, padding, and gaps
3. **Component Reuse**: Use common components instead of recreating similar UI elements
4. **Dark Mode First**: Always consider dark mode when styling
5. **Semantic HTML**: Use appropriate HTML elements with ARIA labels
6. **Accessibility**: Ensure sufficient color contrast and keyboard navigation
7. **Performance**: Use Tailwind's utility classes to minimize CSS bundle size

## 🔄 Migration Guide

When updating existing components:

1. Replace hard-coded values with design tokens
2. Use common component patterns from `classNames.ts`
3. Ensure dark mode support with `dark:` variants
4. Test in both themes and all breakpoints
5. Remove unused custom CSS

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- Design Tokens: `src/styles/designTokens.ts`
- Class Name Patterns: `src/styles/classNames.ts`
- Global Styles: `src/index.css`
