import type { ReactNode } from 'react';
import { componentStyles } from '../../styles/designTokens';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingStyles = {
    none: '',
    ...componentStyles.card.padding,
  };

  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer'
    : 'transition-shadow duration-300';

  return (
    <div
      className={`
        ${componentStyles.card.background}
        ${componentStyles.card.rounded}
        ${componentStyles.card.shadow}
        ${componentStyles.card.border}
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
