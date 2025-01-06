import { useState } from 'react';

export function usePageTransition(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changePage = (newPage: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentPage(newPage);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextPage = () => {
    changePage((currentPage + 1) % totalPages);
  };

  const prevPage = () => {
    changePage((currentPage - 1 + totalPages) % totalPages);
  };

  return {
    currentPage,
    isTransitioning,
    changePage,
    nextPage,
    prevPage
  };
}