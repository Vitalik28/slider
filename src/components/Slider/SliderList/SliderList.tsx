import React, { useContext } from 'react';
import { SliderContext } from '../Slider';
import Slide from './Slide/Slide';

const SliderList = () => {
  const { items, slideNumber } = useContext(SliderContext);
   
  return (
    <div
      className="slider-list"
      style={{ transform: `translateX(-${slideNumber * 100}%)` }}
    >
      {items.map((item) => (
        <Slide item={item} key={item.id} />
      ))}
    </div>
  );
};

export default SliderList;
