import React from 'react';
import { PreviewContent } from './InteractivePreview/PreviewContent';
import { PreviewNavigation } from './InteractivePreview/PreviewNavigation';
import { PreviewPagination } from './InteractivePreview/PreviewPagination';
import { bookPages } from './InteractivePreview/previewData';
import { usePageTransition } from './InteractivePreview/hooks/usePageTransition';
import { SectionTitle } from './common/SectionTitle';

export function InteractivePreview() {
  const { currentPage, isTransitioning, nextPage, prevPage, changePage } = usePageTransition(bookPages.length);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="הצצה לספר"
          subtitle="דפדפו בין העמודים לטעימה קטנה"
          className="mb-12"
        />
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] group">
            <PreviewContent {...bookPages[currentPage]} isTransitioning={isTransitioning} />
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