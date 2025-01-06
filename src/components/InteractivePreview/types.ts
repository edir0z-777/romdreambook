export interface BookPage {
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  title: string;
  description: string;
}

export interface PreviewState {
  currentPage: number;
  isTransitioning: boolean;
  changePage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}