import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { formatDate, getExcerpt } from '../../utils/formatDate';
import type { BlogEntry } from '../../types';

interface BlogCardProps {
  blog: BlogEntry;
}

export function BlogCard({ blog }: BlogCardProps) {
  const excerpt = getExcerpt(blog.content, 150);

  return (
    <Card hover className="h-full flex flex-col group">
      <Link to={`/blog/${blog.slug}`} className="flex-grow flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent dark:group-hover:text-accent-light transition-colors duration-300 mb-3 line-clamp-2">
            {blog.title}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-secondary dark:text-secondary-light">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5"
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
                className="w-4 h-4 mr-1.5"
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
              {formatDate(blog.created_at)}
            </span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed font-normal">{excerpt}</p>

        <div className="mt-auto pt-2 flex items-center text-secondary dark:text-secondary-light font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
          Read more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-3 py-1.5 bg-secondary-light/30 dark:bg-gray-700 text-primary dark:text-gray-300 text-xs font-semibold rounded-full">
              +{blog.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
