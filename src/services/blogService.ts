import api from './api';
import type { BlogEntry, CreateBlogEntry, UpdateBlogEntry, PaginatedResponse } from '../types';

export const blogService = {
  // Get all blog entries (paginated)
  async getAll(page: number = 1): Promise<PaginatedResponse<BlogEntry>> {
    const response = await api.get<PaginatedResponse<BlogEntry>>('/api/blog/', {
      params: { page },
    });
    return response.data;
  },

  // Get blog entry by ID
  async getById(id: number): Promise<BlogEntry> {
    const response = await api.get<BlogEntry>(`/api/blog/id/${id}/`);
    return response.data;
  },

  // Get blog entry by slug
  async getBySlug(slug: string): Promise<BlogEntry> {
    const response = await api.get<BlogEntry>(`/api/blog/slug/${slug}/`);
    return response.data;
  },

  // Get blog entry by short URL
  async getByShortUrl(shortUrl: string): Promise<BlogEntry> {
    const response = await api.get<BlogEntry>(`/api/blog/short/${shortUrl}/`);
    return response.data;
  },

  // Create new blog entry
  async create(data: CreateBlogEntry): Promise<BlogEntry> {
    const response = await api.post<BlogEntry>('/api/blog/', data);
    return response.data;
  },

  // Update blog entry by ID
  async updateById(id: number, data: UpdateBlogEntry): Promise<BlogEntry> {
    const response = await api.patch<BlogEntry>(`/api/blog/id/${id}/`, data);
    return response.data;
  },

  // Update blog entry by slug
  async updateBySlug(slug: string, data: UpdateBlogEntry): Promise<BlogEntry> {
    const response = await api.patch<BlogEntry>(`/api/blog/slug/${slug}/`, data);
    return response.data;
  },

  // Delete blog entry by ID
  async deleteById(id: number): Promise<void> {
    await api.delete(`/api/blog/id/${id}/`);
  },

  // Delete blog entry by slug
  async deleteBySlug(slug: string): Promise<void> {
    await api.delete(`/api/blog/slug/${slug}/`);
  },
};
