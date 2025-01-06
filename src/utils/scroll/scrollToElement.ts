import { ScrollToElementOptions } from './types';
import { PREVIEW_SECTION_OFFSET } from './constants';
import { calculateElementPosition, calculatePreviewPosition } from './calculatePosition';

export function scrollToElement({ 
  elementId, 
  offset = 0,
  behavior = 'smooth' 
}: ScrollToElementOptions): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const position = elementId === 'preview'
    ? calculatePreviewPosition(PREVIEW_SECTION_OFFSET)
    : calculateElementPosition(element);

  window.scrollTo({
    top: position + offset,
    behavior
  });
}