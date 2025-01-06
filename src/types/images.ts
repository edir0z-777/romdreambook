export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface BookPreviewImage extends ImageAsset {
  width: number;
  height: number;
}