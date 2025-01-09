import React, { useState, useRef, TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ColoringBookViewerProps {
  url: string;
  onClose: () => void;
}

export function ColoringBookViewer({ url, onClose }: ColoringBookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const [touchDelta, setTouchDelta] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const nextPage = () => pageNumber < numPages && setPageNumber(prev => prev + 1);
  const prevPage = () => pageNumber > 1 && setPageNumber(prev => prev - 1);
  const handlePrint = () => window.open(url, '_blank')?.print();
  const handleDownload = () => window.open(url, '_blank');

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setTouchDelta(0);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    setTouchDelta(deltaX);
  };

  const handleTouchEnd = () => {
    const threshold = window.innerWidth * 0.2; // 20% of screen width
    if (Math.abs(touchDelta) > threshold) {
      if (touchDelta > 0 && pageNumber > 1) {
        prevPage();
      } else if (touchDelta < 0 && pageNumber < numPages) {
        nextPage();
      }
    }
    setTouchDelta(0);
  };

  // Lock body scroll when viewer is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const content = (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/10">
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            <span className="hidden md:inline">הדפסה</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">פתיחה בחלון חדש</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-white/90 hover:text-white transition-colors"
          aria-label="סגור"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="relative transition-transform duration-200"
          style={{ transform: `translateX(${touchDelta}px)` }}
        >
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="max-w-full"
            loading={
              <div className="text-white text-center">
                <div className="mb-2">טוען את הקובץ...</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              className="shadow-xl max-w-full"
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={Math.min(window.innerWidth - 64, 800)}
              loading={
                <div className="w-full h-[600px] bg-white/5 animate-pulse rounded-lg" />
              }
            />
          </Document>
        </div>

        {/* Show navigation buttons only on desktop */}
        {numPages > 1 && window.innerWidth >= 768 && (
          <>
            <button
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="fixed right-4 top-1/2 p-4 text-white/90 hover:text-white disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="fixed left-4 top-1/2 p-4 text-white/90 hover:text-white disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </>
        )}
      </div>

      {numPages > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
          עמוד {pageNumber} מתוך {numPages}
        </div>
      )}
    </div>
  );

  return createPortal(content, document.body);
}