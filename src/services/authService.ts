import api from './api';
import type { LoginCredentials, RegisterData, TokenResponse, User } from '../types';

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/api/account/login/', credentials);
    const { access, refresh } = response.data;

    // Store tokens in localStorage
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    return response.data;
  },

  // Register new user
  async register(data: RegisterData): Promise<void> {
    await api.post('/api/account/register/', data);
  },

  // Logout user
  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token');

    // Attempt to revoke the refresh token
    if (refreshToken) {
      api.post('/api/account/revoke/', { refresh: refreshToken }).catch(() => {
        // Ignore errors during logout
      });
    }

    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await api.get<User>('/api/account/profile/');
    return response.data;
  },

  // Verify token
  async verifyToken(token: string): Promise<boolean> {
    try {
      await api.post('/api/account/verify/', { token });
      return true;
    } catch {
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
