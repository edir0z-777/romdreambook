import React from 'react';
import { IMAGES } from '../../constants/images';

export function AuthorImage() {
  return (
    <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden shadow-lg">
      <img 
        src={IMAGES.AUTHOR_PROFILE.src}
        alt={IMAGES.AUTHOR_PROFILE.alt}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}