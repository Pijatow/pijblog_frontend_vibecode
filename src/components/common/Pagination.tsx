interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  hasNext,
  hasPrevious,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-3 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious && currentPage === 1}
        className="px-5 py-2.5 rounded-xl font-medium bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-primary dark:text-background hover:bg-gradient-to-r hover:from-accent hover:to-accent-dark hover:text-white hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-primary shadow-lg hover:shadow-xl active:scale-95"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400 font-medium"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`
                min-w-[44px] px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95
                ${
                  isActive
                    ? 'bg-gradient-to-r from-accent to-accent-dark text-white border-2 border-accent scale-105'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-primary dark:text-background hover:bg-gradient-to-r hover:from-secondary/20 hover:to-accent/20 hover:border-accent'
                }
              `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext && currentPage === totalPages}
        className="px-5 py-2.5 rounded-xl font-medium bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-primary dark:text-background hover:bg-gradient-to-r hover:from-accent hover:to-accent-dark hover:text-white hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:text-primary shadow-lg hover:shadow-xl active:scale-95"
      >
        <span className="flex items-center gap-2">
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
}
