import api from './api';
import type { Comment, CreateComment, UpdateComment, PaginatedResponse } from '../types';

export const commentService = {
  // Get comments for a blog entry by ID
  async getByBlogId(blogId: number, page: number = 1): Promise<PaginatedResponse<Comment>> {
    const response = await api.get<PaginatedResponse<Comment>>(
      `/api/blog/id/${blogId}/comments/`,
      { params: { page } }
    );
    return response.data;
  },

  // Get comments for a blog entry by short URL
  async getByShortUrl(shortUrl: string, page: number = 1): Promise<PaginatedResponse<Comment>> {
    const response = await api.get<PaginatedResponse<Comment>>(
      `/api/blog/short/${shortUrl}/comments/`,
      { params: { page } }
    );
    return response.data;
  },

  // Get comments for a blog entry by slug
  async getBySlug(slug: string, page: number = 1): Promise<PaginatedResponse<Comment>> {
    const response = await api.get<PaginatedResponse<Comment>>(
      `/api/blog/slug/${slug}/comments/`,
      { params: { page } }
    );
    return response.data;
  },

  // Create comment on blog entry by ID
  async createByBlogId(blogId: number, data: CreateComment): Promise<Comment> {
    const response = await api.post<Comment>(`/api/blog/id/${blogId}/comments/`, data);
    return response.data;
  },

  // Create comment on blog entry by short URL
  async createByShortUrl(shortUrl: string, data: CreateComment): Promise<Comment> {
    const response = await api.post<Comment>(`/api/blog/short/${shortUrl}/comments/`, data);
    return response.data;
  },

  // Create comment on blog entry by slug
  async createBySlug(slug: string, data: CreateComment): Promise<Comment> {
    const response = await api.post<Comment>(`/api/blog/slug/${slug}/comments/`, data);
    return response.data;
  },

  // Get single comment by blog ID and comment number
  async getCommentById(blogId: number, commentNumber: number): Promise<Comment> {
    const response = await api.get<Comment>(
      `/api/blog/id/${blogId}/comments/${commentNumber}/`
    );
    return response.data;
  },

  // Update comment by blog ID and comment number
  async updateByBlogId(
    blogId: number,
    commentNumber: number,
    data: UpdateComment
  ): Promise<Comment> {
    const response = await api.patch<Comment>(
      `/api/blog/id/${blogId}/comments/${commentNumber}/`,
      data
    );
    return response.data;
  },

  // Update comment by short URL and comment number
  async updateByShortUrl(
    shortUrl: string,
    commentNumber: number,
    data: UpdateComment
  ): Promise<Comment> {
    const response = await api.patch<Comment>(
      `/api/blog/short/${shortUrl}/comments/${commentNumber}/`,
      data
    );
    return response.data;
  },

  // Update comment by slug and comment number
  async updateBySlug(
    slug: string,
    commentNumber: number,
    data: UpdateComment
  ): Promise<Comment> {
    const response = await api.patch<Comment>(
      `/api/blog/slug/${slug}/comments/${commentNumber}/`,
      data
    );
    return response.data;
  },

  // Delete comment by blog ID and comment number
  async deleteByBlogId(blogId: number, commentNumber: number): Promise<void> {
    await api.delete(`/api/blog/id/${blogId}/comments/${commentNumber}/`);
  },

  // Delete comment by short URL and comment number
  async deleteByShortUrl(shortUrl: string, commentNumber: number): Promise<void> {
    await api.delete(`/api/blog/short/${shortUrl}/comments/${commentNumber}/`);
  },

  // Delete comment by slug and comment number
  async deleteBySlug(slug: string, commentNumber: number): Promise<void> {
    await api.delete(`/api/blog/slug/${slug}/comments/${commentNumber}/`);
  },
};
