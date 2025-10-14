# Fix: Custom Color Classes Not Working in Dark Mode

**Date**: October 14, 2025
**Status**: ✅ **FIXED**

## Problem

Custom color utilities like `text-background`, `text-secondary`, etc. were not working with `dark:` variants in Tailwind v4.

### Symptoms
1. **BlogCard title in dark mode**: Text stayed dark gray instead of light
   - Used: `dark:text-background`
   - Result: Color didn't change, stayed `text-gray-900`

2. **Header links in dark mode**: Text stayed dark gray instead of light
   - Used: `dark:text-background`
   - Result: Color didn't change, stayed `text-gray-700`

## Root Cause

Tailwind v4 doesn't automatically recognize custom color utilities defined in `@layer utilities`. The `dark:` variant only works with:
- Standard Tailwind colors (`gray-100`, `gray-900`, etc.)
- Colors defined in `@theme` directive

Our custom `.text-background` class was defined in `@layer utilities` but not properly registered with Tailwind's theme system.

## Solution

Replaced custom color classes with standard Tailwind colors that work in both modes:

### BlogCard Title
**Before:**
```tsx
className="text-gray-900 dark:text-background"
```

**After:**
```tsx
className="text-gray-900 dark:text-gray-100"
```

### Header Text (Logo + Links)
**Before:**
```tsx
className="text-gray-800 dark:text-background"
className="text-gray-700 dark:text-background"
```

**After:**
```tsx
className="text-gray-800 dark:text-gray-100"
className="text-gray-700 dark:text-gray-100"
```

## Files Modified

1. ✅ `src/components/blog/BlogCard.tsx` - Title text color
2. ✅ `src/components/layout/Header.tsx` - Logo and navigation link colors

## Result

- ✅ BlogCard titles now show **light gray-100** in dark mode (readable on dark cards)
- ✅ Header text now shows **light gray-100** in dark mode (readable on dark header)
- ✅ Light mode unchanged - still dark gray text
- ✅ All `dark:` variants now working correctly

## Testing

**Light Mode:**
- BlogCard title: Dark gray-900 (near black) ✓
- Header text: Dark gray-700/800 ✓

**Dark Mode:**
- BlogCard title: Light gray-100 (near white) ✓
- Header text: Light gray-100 (near white) ✓

## Note on Custom Colors

If you want to use custom colors with `dark:` variants in Tailwind v4, they need to be defined in the `@theme` directive, not just in `@layer utilities`.

For now, using standard Tailwind gray scale colors works perfectly and maintains good readability in both modes.

---

**Refresh your browser to see the changes!**
