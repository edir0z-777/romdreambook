export function scrollToPreview(): void {
  // Wait for next tick to ensure preview section is mounted
  setTimeout(() => {
    const previewSection = document.getElementById('preview');
    
    if (previewSection) {
      const offset = 80; // Header height
      const elementPosition = previewSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 0);
}

export function scrollToElement(elementId: string): void {
  if (elementId === 'preview') {
    scrollToPreview();
    return;
  }

  const element = document.getElementById(elementId);
  if (!element) return;

  const offset = 80; // Header height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}