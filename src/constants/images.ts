// Import images directly from assets
import preview1 from '../assets/images/02.jpg';
import preview2 from '../assets/images/03.jpg';
import preview3 from '../assets/images/04.jpg';
import bookCover from '../assets/images/Anat Rozenstein 3D.png';
import authorProfile from '../assets/images/Anat_Temp.avif';
import romiImage from '../assets/images/Romi_white_100-removebg-preview_Final.png';

export const BOOK_PREVIEW = {
  PAGE_1: {
    src: preview1,
    alt: "עמוד ראשון מתוך הספר עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי",
    width: 1920,
    height: 1080
  },
  PAGE_2: {
    src: preview2,
    alt: "עמוד שני מתוך הספר עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי",
    width: 1920,
    height: 1080
  },
  PAGE_3: {
    src: preview3,
    alt: "עמוד שלישי מתוך הספר עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי",
    width: 1920,
    height: 1080
  }
};

export const IMAGES = {
  BOOK_COVER: {
    src: bookCover,
    alt: "ספר עולם החלומות של רומי"
  },
  AUTHOR_PROFILE: {
    src: authorProfile,
    alt: "ענת רוזנשטיין"
  },
  ROMI: {
    src: romiImage,
    alt: "רומי"
  }
} as const;