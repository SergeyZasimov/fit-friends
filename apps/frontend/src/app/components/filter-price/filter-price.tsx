import { QuerySportGym, WorkoutQuery } from '@fit-friends/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { HIGH_INDEX, LOW_INDEX } from '../../utils/constants';
import { debounce } from '../../utils/helpers';
import RangeSlider from '../range-slider/range-slider';

export interface FilterPriceProps<T> {
  onChangeQuery: (value: T) => void;
  priceInfo: { min: number, max: number; } | null;
}

export function FilterPrice<T extends WorkoutQuery | QuerySportGym>({ onChangeQuery, priceInfo }: FilterPriceProps<T>) {

  const [ priceRange, setPriceRange ] = useState([ priceInfo?.min, priceInfo?.max ]);

  useEffect(() => {
    setPriceRange([ priceInfo?.min, priceInfo?.max ]);
  }, [ priceInfo ]);

  const handleInputChange = (evt: ChangeEvent, index: number) => {
    const target = evt.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      setPriceRange((prevState) => {
        prevState[ index ] = value;
        return [ ...prevState ];
      });
      setQuery();
    }
  };

  const handleSliderChange = (value: number[], index: number): void => {
    setPriceRange((prevState) => {
      prevState[ index ] = value[ index ];
      return [ ...prevState ];
    });
    setQuery();
  };

  const setQuery = () => {
    debounce(onChangeQuery)({ priceRange: priceRange as number[] } as T);
  };

  return (
    <>
      <div className="filter-price">
        <div className="filter-price__input-text filter-price__input-text--min">
          <input
            type="number"
            id="text-min"
            name="price-min"
            value={ priceRange[ LOW_INDEX ] }
            onChange={ (evt: ChangeEvent) => handleInputChange(evt, LOW_INDEX) }
          />
          <label htmlFor="text-min">от</label>
        </div>
        <div className="filter-price__input-text filter-price__input-text--max">
          <input
            type="number"
            id="text-max"
            name="price-max"
            value={ priceRange[ HIGH_INDEX ] }
            onChange={ (evt: ChangeEvent) => handleInputChange(evt, HIGH_INDEX) }
          />
          <label htmlFor="text-max">до</label>
        </div>
      </div>
      <RangeSlider
        rangeValue={ priceRange as number[] }
        min={ priceInfo?.min as number || 0 }
        max={ priceInfo?.max as number || 0 }
        onChange={ handleSliderChange }
      />
    </>
  );
}

export default FilterPrice;
