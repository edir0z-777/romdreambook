import React from 'react';
import { PreviewImage } from './PreviewImage';
import { PreviewControls } from './PreviewControls';
import { PreviewPagination } from './PreviewPagination';
import { PreviewCaption } from './PreviewCaption';
import { bookPages } from './previewData';
import { usePreviewNavigation } from './hooks/usePreviewNavigation';

export function PreviewGallery() {
  const { currentPage, isTransitioning, nextPage, prevPage, goToPage } = usePreviewNavigation(bookPages.length);
  const currentImage = bookPages[currentPage];

  return (
    <div className="space-y-6">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] group">
        <PreviewImage 
          image={currentImage.image}
          isTransitioning={isTransitioning}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
        
        <PreviewControls 
          onNext={nextPage} 
          onPrev={prevPage}
          disabled={isTransitioning}
        />
        
        <PreviewCaption 
          title={currentImage.title}
          description={currentImage.description}
        />
      </div>

      <PreviewPagination 
        total={bookPages.length}
        current={currentPage}
        onChange={goToPage}
        disabled={isTransitioning}
      />
    </div>
  );
}