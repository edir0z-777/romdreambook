import { useState } from 'react';

export function usePreviewNavigation(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = (newPage: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentPage(newPage);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextPage = () => {
    navigate((currentPage + 1) % totalPages);
  };

  const prevPage = () => {
    navigate((currentPage - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      navigate(page);
    }
  };

  return {
    currentPage,
    isTransitioning,
    nextPage,
    prevPage,
    goToPage
  };
}