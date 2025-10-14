import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { formatDate } from '../utils/formatDate';
import type { BlogEntry, PaginatedResponse } from '../types';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<PaginatedResponse<BlogEntry> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAll(1);
      setBlogs(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await blogService.deleteById(id);
      await loadBlogs();
    } catch (err: any) {
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return <Loading message="Loading your profile..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to Load Profile"
        message={error}
        onRetry={loadBlogs}
      />
    );
  }

  // Filter user's own posts
  const userBlogs = blogs?.results.filter((blog) => blog.author === user?.username) || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg" className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary dark:text-gray-100 mb-2">
              {user?.username}
            </h1>
            <p className="text-secondary dark:text-secondary-light">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/create">
              <Button variant="accent">Write New Post</Button>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Card>

      <h2 className="text-2xl font-bold text-primary dark:text-gray-100 mb-6">
        Your Posts ({userBlogs.length})
      </h2>

      {userBlogs.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-secondary mb-4">
            <svg
              className="w-24 h-24 mx-auto"
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
          </div>
          <h3 className="text-xl font-semibold text-primary dark:text-gray-100 mb-2">
            No Posts Yet
          </h3>
          <p className="text-secondary dark:text-secondary-light mb-4">
            Start sharing your thoughts with the world!
          </p>
          <Link to="/create">
            <Button variant="accent">Create Your First Post</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {userBlogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-xl font-bold text-primary dark:text-gray-100 hover:text-accent mb-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-4 text-sm text-secondary dark:text-secondary-light mb-2">
                    <span>{formatDate(blog.created_at)}</span>
                    <span className="px-2 py-1 bg-secondary text-white text-xs rounded">
                      {blog.status}
                    </span>
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary-light dark:bg-secondary text-primary dark:text-white text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link to={`/edit/${blog.slug}`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
