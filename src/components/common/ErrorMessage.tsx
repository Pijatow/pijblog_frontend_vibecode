import type { ReactNode } from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  children?: ReactNode;
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
  children,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">{title}</h2>
        <p className="text-red-600 mb-4">{message}</p>
        {children}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

interface InlineErrorProps {
  message: string;
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
      <svg
        className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}
