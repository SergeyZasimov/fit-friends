import { useState } from 'react';

const DEFAULT_MARGIN_RIGHT = 20;

export const useSlider = (
  offset: number,
  quantity: number,
  maxLength: number
) => {
  const [count, setCount] = useState(0);

  const handlePrevClick = () => {
    if (count < 0) {
      setCount(count + 1);
    }
  };

  const handleNextClick = () => {
    if (maxLength > quantity && Math.abs(count - quantity) < maxLength) {
      setCount(count - 1);
    }
  };

  const style = {
    transform: `translateX(${(offset + DEFAULT_MARGIN_RIGHT) * count}px)`,
    transition: 'all 0.25s ease',
  };

  return { handleNextClick, handlePrevClick, style };
};
