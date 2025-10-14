import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { componentStyles } from '../../styles/designTokens';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = componentStyles.button.base;
  const sizeStyles = componentStyles.button.sizes[size];
  const variantStyles = componentStyles.button.variants[variant];
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} transform hover:-translate-y-0.5 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
