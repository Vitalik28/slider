import React, { FC } from 'react';
import { IPhoto } from '../../Slider';
import SlideImage from './SlideImage';
import SlideTittle from './SlideTittle';

interface ISlideProps {
  item: IPhoto;
}

const Slide: FC<ISlideProps> = ({ item }) => {
  return (
    <div className='slide'>
      <SlideImage src={item.url} alt={item.title} />
      <SlideTittle tittle={item.title} />
    </div>
  );
};

export default Slide;
