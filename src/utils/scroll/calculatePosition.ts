import { HEADER_HEIGHT } from './constants';

export function calculateElementPosition(element: HTMLElement): number {
  const elementPosition = element.getBoundingClientRect().top;
  return elementPosition + window.scrollY - HEADER_HEIGHT;
}

export function calculatePreviewPosition(offset: number): number {
  return document.documentElement.scrollHeight - window.innerHeight - offset;
}