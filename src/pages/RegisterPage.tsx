import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { InlineError } from '../components/common/ErrorMessage';
import { isValidEmail, isValidPassword, isValidUsername } from '../utils/validators';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    // Username validation
    const usernameValidation = isValidUsername(formData.username);
    if (!usernameValidation.valid) {
      newErrors.username = usernameValidation.error;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    const passwordValidation = isValidPassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.errors[0];
    }

    // Password confirmation
    if (!formData.password2) {
      newErrors.password2 = 'Please confirm your password';
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await register(formData);
      navigate('/');
    } catch (error: any) {
      const serverErrors = error.response?.data;
      const newErrors: typeof errors = {};

      if (serverErrors) {
        if (serverErrors.username) {
          newErrors.username = serverErrors.username[0];
        }
        if (serverErrors.email) {
          newErrors.email = serverErrors.email[0];
        }
        if (serverErrors.password) {
          newErrors.password = serverErrors.password[0];
        }
        if (!newErrors.username && !newErrors.email && !newErrors.password) {
          newErrors.general = 'Registration failed. Please try again.';
        }
      } else {
        newErrors.general = 'An unexpected error occurred';
      }

      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center shadow-xl mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-center">
            Join PijBlog and start sharing your thoughts
          </p>
        </div>

        {errors.general && (
          <div className="mb-4">
            <InlineError message={errors.general} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Username"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange('username')}
            error={errors.username}
            autoComplete="username"
          />

          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            autoComplete="new-password"
            helperText="At least 8 characters with uppercase, lowercase, and numbers"
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.password2}
            onChange={handleChange('password2')}
            error={errors.password2}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="accent"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-accent hover:text-accent-dark font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
