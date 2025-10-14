/**
 * Common className patterns for consistent page layouts
 * These functions generate standardized Tailwind class strings
 */

/**
 * Page container with consistent max-width and spacing
 */
export const pageContainer = 'max-w-7xl mx-auto px-4 py-8';

/**
 * Page title styles
 */
export const pageTitle = 'text-4xl md:text-5xl font-bold text-primary dark:text-background mb-6 md:mb-8';

/**
 * Section title styles
 */
export const sectionTitle = 'text-2xl md:text-3xl font-bold text-primary dark:text-background mb-4 md:mb-6';

/**
 * Section subtitle styles
 */
export const sectionSubtitle = 'text-lg md:text-xl font-semibold text-primary dark:text-background mb-3 md:mb-4';

/**
 * Body text styles
 */
export const bodyText = 'text-base text-gray-700 dark:text-gray-300 leading-relaxed';

/**
 * Muted text styles (for secondary information)
 */
export const mutedText = 'text-sm text-secondary dark:text-secondary-light';

/**
 * Link styles
 */
export const linkText = 'text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors duration-300 underline decoration-2 underline-offset-2';

/**
 * Form container
 */
export const formContainer = 'space-y-6';

/**
 * Form field spacing
 */
export const formField = 'space-y-2';

/**
 * Grid layouts
 */
export const gridLayouts = {
  cols1: 'grid grid-cols-1 gap-6',
  cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
};

/**
 * Flex layouts
 */
export const flexLayouts = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-start justify-between',
  col: 'flex flex-col',
  colCenter: 'flex flex-col items-center justify-center',
};

/**
 * Spacing utilities
 */
export const spacing = {
  section: 'mb-8 md:mb-12',
  element: 'mb-4 md:mb-6',
  small: 'mb-2 md:mb-3',
};

/**
 * Empty state container
 */
export const emptyState = 'text-center py-12 md:py-16';

/**
 * Empty state icon
 */
export const emptyStateIcon = 'w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 text-secondary dark:text-secondary-light';

/**
 * Empty state title
 */
export const emptyStateTitle = 'text-xl md:text-2xl font-bold text-primary dark:text-background mb-2';

/**
 * Empty state description
 */
export const emptyStateDescription = 'text-base text-secondary dark:text-secondary-light mb-6';

/**
 * Badge styles
 */
export const badge = 'px-3 py-1 text-xs font-semibold rounded-full';

export const badgeVariants = {
  primary: `${badge} bg-primary text-background`,
  secondary: `${badge} bg-secondary text-white`,
  accent: `${badge} bg-accent text-white`,
  success: `${badge} bg-green-500 text-white`,
  warning: `${badge} bg-yellow-500 text-white`,
  error: `${badge} bg-red-500 text-white`,
  neutral: `${badge} bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300`,
};

/**
 * Divider
 */
export const divider = 'border-t border-gray-200 dark:border-gray-700 my-6 md:my-8';

/**
 * Responsive show/hide utilities
 */
export const responsive = {
  hideOnMobile: 'hidden md:block',
  hideOnDesktop: 'block md:hidden',
  showOnMobile: 'block md:hidden',
  showOnDesktop: 'hidden md:block',
};
