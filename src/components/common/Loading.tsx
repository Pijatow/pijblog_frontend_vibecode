export function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-secondary-light dark:border-secondary rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-secondary dark:text-secondary-light text-lg font-medium">{message}</p>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="relative inline-block">
      <div className={`${sizeClasses[size]} border-secondary-light dark:border-secondary rounded-full`}></div>
      <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-accent border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}
