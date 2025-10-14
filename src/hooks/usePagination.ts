import { useState, useCallback } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export function usePagination(initialPage: number = 1): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = useCallback((page: number) => {
    if (page >= 1) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
}
