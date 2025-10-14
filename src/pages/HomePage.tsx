import { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { BlogCard } from '../components/blog/BlogCard';
import { Pagination } from '../components/common/Pagination';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { usePagination } from '../hooks/usePagination';
import { emptyState, emptyStateIcon, emptyStateTitle, emptyStateDescription, gridLayouts } from '../styles/classNames';
import type { BlogEntry, PaginatedResponse } from '../types';

export function HomePage() {
  const [blogs, setBlogs] = useState<PaginatedResponse<BlogEntry> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentPage, goToPage } = usePagination(1);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAll(currentPage);
      setBlogs(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [currentPage]);

  if (loading) {
    return <Loading message="Loading blog posts..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to Load Posts"
        message={error}
        onRetry={loadBlogs}
      />
    );
  }

  if (!blogs || blogs.results.length === 0) {
    return (
      <div className={emptyState}>
        <svg
          className={emptyStateIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className={emptyStateTitle}>
          No Posts Yet
        </h2>
        <p className={emptyStateDescription}>
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-gradient-to-r from-secondary to-secondary-light text-white rounded-full text-sm font-semibold shadow-lg">
            ✨ Welcome to PijBlog
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary dark:text-gray-100 mb-4">
          Latest Blog Posts
        </h1>
        <p className="text-secondary dark:text-secondary-light text-xl max-w-2xl mx-auto leading-relaxed">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      {/* Blog Grid */}
      <div className={`${gridLayouts.cols3} mb-12`}>
        {blogs.results.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination */}
      {blogs.count > 10 && (
        <Pagination
          currentPage={currentPage}
          totalCount={blogs.count}
          pageSize={10}
          onPageChange={goToPage}
          hasNext={!!blogs.next}
          hasPrevious={!!blogs.previous}
        />
      )}
    </div>
  );
}
