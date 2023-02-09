import React, { FC, useEffect, useState, createContext } from 'react';
import Arrows from './Arrows/Arrows';
import Dots from './Dots/Dots';
import SliderList from './SliderList/SliderList';
import './slider.css';

interface SliderProps {
  autoPlay?: boolean;
  autoPlayTime?: number;
  width?: '%' | 'px';
  height?: '%' | 'px';
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface ISliderContext {
  items: IPhoto[];
  slideNumber: number;
  slideCount: number;
  changeSlide: (value: number) => void;
  goToSlide: (value: number) => void;
}

export const SliderContext = createContext<ISliderContext>(
  {} as ISliderContext
);

const Slider: FC<SliderProps> = ({
  autoPlay = false,
  autoPlayTime = 5000,
  height = '100%',
  width = '100%',
}) => {
  const [items, setItems] = useState<IPhoto[]>([]);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<null | number>(null);

  const fetchImages = () => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => {
        json = json.slice(0, 10);
        setItems(json);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }
    setSlide(slideNumber);
  };

  const goToSlide = (number: number) => {
    setSlide(number % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };


  useEffect(() => {
    if (!autoPlay) return;

    let auto = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);

    return () => clearInterval(auto);
  }, [items.length, slide]);

  return (
    <div
      style={{ width, height }}
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <SliderContext.Provider
        value={{
          items,
          slideNumber: slide,
          slideCount: items.length,
          changeSlide,
          goToSlide,
        }}
      >
        <Arrows />
        <SliderList />
        <Dots />
      </SliderContext.Provider>
    </div>
  );
};

export default Slider;
