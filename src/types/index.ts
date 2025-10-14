// API Response Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface User {
  username: string;
  email: string;
}

// Blog Types
export type BlogStatus = 'PUBLIC' | 'UNLISTED' | 'PRIVATE';

export interface BlogEntry {
  id: number;
  title: string;
  slug: string;
  short_url_id: string;
  content: string;
  author: string;
  status: BlogStatus;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface CreateBlogEntry {
  title: string;
  content: string;
  status: BlogStatus;
  tags: string[];
}

export interface UpdateBlogEntry {
  title?: string;
  content?: string;
  status?: BlogStatus;
  tags?: string[];
}

// Comment Types
export interface Comment {
  id: number;
  blog_entry: number;
  comment_number: number;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateComment {
  content: string;
}

export interface UpdateComment {
  content: string;
}

// UI Types
export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
