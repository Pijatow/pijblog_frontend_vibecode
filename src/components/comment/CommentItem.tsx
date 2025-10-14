import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { CommentForm } from './CommentForm';
import { useAuth } from '../../hooks/useAuth';
import type { Comment } from '../../types';

interface CommentItemProps {
  comment: Comment;
  onUpdate: (commentNumber: number, content: string) => Promise<void>;
  onDelete: (commentNumber: number) => Promise<void>;
}

export function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isAuthor = user?.username === comment.author;

  const handleUpdate = async (content: string) => {
    await onUpdate(comment.comment_number, content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(comment.comment_number);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-primary dark:text-background">{comment.author}</span>
          <span className="text-sm text-secondary dark:text-secondary-light">
            {formatDate(comment.created_at)}
          </span>
          {comment.created_at !== comment.updated_at && (
            <span className="text-xs text-secondary dark:text-secondary-light italic">(edited)</span>
          )}
        </div>

        {isAuthor && !isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-secondary hover:text-accent dark:hover:text-accent-light text-sm font-medium transition-colors duration-300 px-2 py-1 rounded hover:bg-accent/10"
              disabled={isDeleting}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-secondary hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition-colors duration-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <CommentForm
          initialValue={comment.content}
          onSubmit={handleUpdate}
          submitLabel="Update"
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <p className="text-primary dark:text-background whitespace-pre-wrap leading-relaxed">{comment.content}</p>
      )}
    </div>
  );
}
