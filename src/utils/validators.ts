/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate username
 */
export function isValidUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  if (username.length < 3) {
    return {
      valid: false,
      error: 'Username must be at least 3 characters long',
    };
  }

  if (username.length > 30) {
    return {
      valid: false,
      error: 'Username must be less than 30 characters',
    };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, and underscores',
    };
  }

  return { valid: true };
}

/**
 * Validate blog title
 */
export function isValidBlogTitle(title: string): {
  valid: boolean;
  error?: string;
} {
  if (title.trim().length === 0) {
    return {
      valid: false,
      error: 'Title is required',
    };
  }

  if (title.length > 200) {
    return {
      valid: false,
      error: 'Title must be less than 200 characters',
    };
  }

  return { valid: true };
}

/**
 * Validate blog content
 */
export function isValidBlogContent(content: string): {
  valid: boolean;
  error?: string;
} {
  if (content.trim().length === 0) {
    return {
      valid: false,
      error: 'Content is required',
    };
  }

  return { valid: true };
}
