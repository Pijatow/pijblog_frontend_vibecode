import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../common/Button';
import { TextArea } from '../common/Input';
import { InlineError } from '../common/ErrorMessage';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  initialValue?: string;
  submitLabel?: string;
  onCancel?: () => void;
}

export function CommentForm({
  onSubmit,
  initialValue = '',
  submitLabel = 'Post Comment',
  onCancel,
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(content);
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <InlineError message={error} />}

      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        rows={4}
        disabled={isSubmitting}
      />

      <div className="flex space-x-3">
        <Button
          type="submit"
          variant="accent"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Posting...' : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
