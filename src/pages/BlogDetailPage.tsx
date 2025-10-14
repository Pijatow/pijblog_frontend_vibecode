import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { commentService } from '../services/commentService';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { CommentForm } from '../components/comment/CommentForm';
import { CommentItem } from '../components/comment/CommentItem';
import { Pagination } from '../components/common/Pagination';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Card } from '../components/common/Card';
import { formatDateTime } from '../utils/formatDate';
import { useAuth } from '../hooks/useAuth';
import { usePagination } from '../hooks/usePagination';
import type { BlogEntry, Comment, PaginatedResponse } from '../types';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState<BlogEntry | null>(null);
  const [comments, setComments] = useState<PaginatedResponse<Comment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentPage, goToPage } = usePagination(1);

  const loadBlog = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const blogData = await blogService.getBySlug(slug);
      setBlog(blogData);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    if (!slug) return;

    try {
      const commentsData = await commentService.getBySlug(slug, currentPage);
      setComments(commentsData);
    } catch (err: any) {
      console.error('Failed to load comments:', err);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      loadComments();
    }
  }, [blog, currentPage]);

  const handleAddComment = async (content: string) => {
    if (!slug) return;
    await commentService.createBySlug(slug, { content });
    await loadComments();
  };

  const handleUpdateComment = async (commentNumber: number, content: string) => {
    if (!slug) return;
    await commentService.updateBySlug(slug, commentNumber, { content });
    await loadComments();
  };

  const handleDeleteComment = async (commentNumber: number) => {
    if (!slug) return;
    await commentService.deleteBySlug(slug, commentNumber);
    await loadComments();
  };

  if (loading) {
    return <Loading message="Loading blog post..." />;
  }

  if (error || !blog) {
    return (
      <ErrorMessage
        title="Blog Post Not Found"
        message={error || 'The requested blog post could not be found'}
        onRetry={loadBlog}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card padding="lg">
        {/* Blog Header */}
        <header className="mb-8 pb-6 border-b border-secondary-light dark:border-secondary">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-gray-100 mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-secondary dark:text-secondary-light mb-4">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {blog.author}
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDateTime(blog.created_at)}
            </span>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent hover:bg-accent-dark text-white text-sm rounded-full transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <MarkdownRenderer content={blog.content} />
        </article>
      </Card>

      {/* Comments Section */}
      <div className="mt-8">
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-primary dark:text-gray-100 mb-6">
            Comments {comments && `(${comments.count})`}
          </h2>

          {/* Comment Form */}
          {isAuthenticated ? (
            <div className="mb-8">
              <CommentForm onSubmit={handleAddComment} />
            </div>
          ) : (
            <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg text-center border-2 border-gray-300 dark:border-gray-600">
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-lg">
                Please log in to leave a comment
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/login"
                  className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  Sign Up
                </a>
              </div>
            </div>
          )}

          {/* Comments List */}
          {comments && comments.results.length > 0 ? (
            <>
              <div className="space-y-4">
                {comments.results.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                  />
                ))}
              </div>

              {comments.count > 10 && (
                <Pagination
                  currentPage={currentPage}
                  totalCount={comments.count}
                  pageSize={10}
                  onPageChange={goToPage}
                  hasNext={!!comments.next}
                  hasPrevious={!!comments.previous}
                />
              )}
            </>
          ) : (
            <p className="text-secondary text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
