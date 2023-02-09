import React, { FC, useContext } from 'react';
import { SliderContext } from '../Slider';

interface IDot {
  number: number;
}

const Dot: FC<IDot> = ({ number }) => {
  const { slideNumber, goToSlide } = useContext(SliderContext);
  return (
    <div
      className={`dot ${slideNumber === number ? 'selected' : ''}`}
      onClick={() => goToSlide(number)}
    ></div>
  );
};

export default Dot;
