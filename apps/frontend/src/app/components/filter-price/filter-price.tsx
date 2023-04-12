import { WorkoutQuery } from '@fit-friends/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/store.hooks';
import { getWorkoutsPriceInfo } from '../../store/features/workout/workout-slice';
import { HIGH_INDEX, LOW_INDEX } from '../../utils/constants';
import { debounce } from '../../utils/helpers';
import RangeSlider from '../range-slider/range-slider';

export interface FilterPriceProps {
  onChangeQuery: (value: WorkoutQuery) => void;
}

export function FilterPrice({ onChangeQuery }: FilterPriceProps) {

  const priceInfo = useAppSelector(getWorkoutsPriceInfo);

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
    debounce(onChangeQuery)({ priceRange: priceRange as number[] });
  };

  return (
    <div className="my-training-form__block my-training-form__block--price">
      <h4 className="my-training-form__block-title">Цена, ₽</h4>
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
        min={ priceInfo?.min as number }
        max={ priceInfo?.max as number }
        onChange={ handleSliderChange }
      />
    </div>
  );
}

export default FilterPrice;
