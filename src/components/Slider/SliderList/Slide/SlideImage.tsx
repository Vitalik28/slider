import React, { FC } from 'react';

interface SlideImageProps {
  src: string;
  alt: string;
}
const SlideImage: FC<SlideImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="slide-image" />;
};

export default SlideImage;
