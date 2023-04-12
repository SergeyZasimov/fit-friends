import Slider from 'react-slider';

/* eslint-disable-next-line */
export interface RangeSliderProps {
  rangeValue: number[];
  min: number;
  max: number;
  onChange: (value: number[], index: number) => void;
}

export function RangeSlider({rangeValue, max, min, onChange }: RangeSliderProps) {
  return (
    <Slider
      className='range-slider'
      value={ rangeValue }
      onChange={ onChange }
      min={ min }
      max={ max }
      pearling
    />
  );
}

export default RangeSlider;
