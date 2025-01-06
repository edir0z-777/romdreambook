import React from 'react';
import { PreviewContent } from './PreviewContent';
import { PreviewNavigation } from './PreviewNavigation';
import { PreviewPagination } from './PreviewPagination';
import { bookPages } from './previewData';
import { usePageTransition } from './hooks/usePageTransition';
import { SectionTitle } from '../common/SectionTitle';

export function InteractivePreview() {
  const { currentPage, isTransitioning, nextPage, prevPage, changePage } = usePageTransition(bookPages.length);

  return (
    <section 
      id="preview" 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50"
    >
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="הצצה לספר"
          subtitle="דפדפו בין העמודים לטעימה קטנה"
          className="mb-12"
        />
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] group">
            <PreviewContent 
              {...bookPages[currentPage]} 
              isTransitioning={isTransitioning}
              currentPage={currentPage}
              onPageChange={changePage}
            />
            <PreviewNavigation 
              onNext={nextPage} 
              onPrev={prevPage} 
              disabled={isTransitioning} 
            />
          </div>
          <PreviewPagination 
            total={bookPages.length}
            current={currentPage}
            onChange={changePage}
            disabled={isTransitioning}
          />
        </div>
      </div>
    </section>
  );
}