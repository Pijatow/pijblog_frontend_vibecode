import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { Card } from '../components/common/Card';
import { Input, TextArea } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { InlineError } from '../components/common/ErrorMessage';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { isValidBlogTitle, isValidBlogContent } from '../utils/validators';
import type { BlogStatus } from '../types';

export function CreateBlogPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'PUBLIC' as BlogStatus,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    const titleValidation = isValidBlogTitle(formData.title);
    if (!titleValidation.valid) {
      newErrors.title = titleValidation.error;
    }

    const contentValidation = isValidBlogContent(formData.content);
    if (!contentValidation.valid) {
      newErrors.content = contentValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const blog = await blogService.create({
        title: formData.title,
        content: formData.content,
        tags,
        status: formData.status,
      });

      navigate(`/blog/${blog.slug}`);
    } catch (err: any) {
      setErrors({
        general: err.response?.data?.detail || 'Failed to create blog post',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | BlogStatus
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-primary dark:text-gray-100 mb-8">Create New Post</h1>

      {errors.general && (
        <div className="mb-4">
          <InlineError message={errors.general} />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <Input
                label="Title"
                placeholder="Enter your blog post title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
              />
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-primary dark:text-gray-200">
                  Content
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-3 py-1.5 text-accent hover:text-accent-dark text-sm font-medium rounded-lg hover:bg-accent/10 transition-all duration-300"
                >
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
              </div>

              {showPreview ? (
                <div className="min-h-[400px] p-4 border border-secondary-light rounded-lg bg-background-light">
                  <MarkdownRenderer content={formData.content} />
                </div>
              ) : (
                <TextArea
                  placeholder="Write your blog post in Markdown..."
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  error={errors.content}
                  rows={20}
                  className="font-mono"
                />
              )}

              <p className="mt-2 text-sm text-secondary">
                Supports Markdown formatting
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-primary mb-4">Publish</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      handleChange('status', e.target.value as BlogStatus)
                    }
                    className="w-full px-4 py-2 border border-secondary rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="PUBLIC">Public</option>
                    <option value="UNLISTED">Unlisted</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                  <p className="mt-1 text-xs text-secondary">
                    {formData.status === 'PUBLIC' && 'Visible to everyone'}
                    {formData.status === 'UNLISTED' &&
                      'Only accessible via direct link'}
                    {formData.status === 'PRIVATE' && 'Only visible to you'}
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-primary mb-4">Tags</h3>
              <Input
                placeholder="tag1, tag2, tag3"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                helperText="Separate tags with commas"
              />
            </Card>

            <Card>
              <h3 className="font-semibold text-primary mb-3">
                Markdown Guide
              </h3>
              <div className="text-sm text-secondary space-y-2">
                <p>
                  <code className="bg-primary text-background px-1 rounded">
                    # Heading
                  </code>
                </p>
                <p>
                  <code className="bg-primary text-background px-1 rounded">
                    **bold**
                  </code>
                </p>
                <p>
                  <code className="bg-primary text-background px-1 rounded">
                    *italic*
                  </code>
                </p>
                <p>
                  <code className="bg-primary text-background px-1 rounded">
                    [link](url)
                  </code>
                </p>
                <p>
                  <code className="bg-primary text-background px-1 rounded">
                    `code`
                  </code>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
