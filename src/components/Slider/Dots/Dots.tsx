import React, { useContext } from 'react';
import { SliderContext } from '../Slider';
import Dot from './Dot';

const Dots = () => {
  const { slideCount } = useContext(SliderContext);

  const dots = Array.from({ length: slideCount }, (_, index) => (
    <Dot key={index} number={index} />
  ));

  return <div className="dots">{dots}</div>;
};

export default Dots;
