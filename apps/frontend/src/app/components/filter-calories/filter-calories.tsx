import { WorkoutQuery } from '@fit-friends/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/store.hooks';
import { getWorkoutsCaloriesInfo } from '../../store/features/workout/workout-slice';
import { HIGH_INDEX, LOW_INDEX } from '../../utils/constants';
import { debounce } from '../../utils/helpers';
import RangeSlider from '../range-slider/range-slider';

export interface FilterCaloriesProps {
  onChangeQuery: (value: WorkoutQuery) => void;
}

export function FilterCalories({ onChangeQuery }: FilterCaloriesProps) {

  const caloriesInfo = useAppSelector(getWorkoutsCaloriesInfo);

  const [ caloriesRange, setCaloriesRange ] = useState([ caloriesInfo?.min, caloriesInfo?.max ]);

  useEffect(() => {
    setCaloriesRange([ caloriesInfo?.min, caloriesInfo?.max ]);
  }, [ caloriesInfo ]);


  const handleInputChange = (evt: ChangeEvent, index: number) => {
    const target = evt.target as HTMLInputElement;
    const value = parseInt(target.value);
    if (!isNaN(value)) {
      setCaloriesRange((prevState) => {
        prevState[ index ] = value;
        return [ ...prevState ];
      });
      setQuery();
    }
  };

  const handleSliderChange = (value: number[], index: number) => {
    setCaloriesRange((prevState) => {
      prevState[ index ] = value[ index ];
      return [ ...prevState ];
    });
    setQuery();
  };

  const setQuery = () => {
    debounce(onChangeQuery)({ caloriesRange: caloriesRange as number[] });
  };

  return (
    <div className="my-training-form__block my-training-form__block--calories">
      <h4 className="my-training-form__block-title">Калории</h4>
      <div className="filter-calories">
        <div className="filter-calories__input-text filter-calories__input-text--min">
          <input
            type="number"
            id="text-min-cal"
            name="text-min-cal"
            value={ caloriesRange[ LOW_INDEX ] }
            onChange={ (evt: ChangeEvent) => handleInputChange(evt, LOW_INDEX) }

          />
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className="filter-calories__input-text filter-calories__input-text--max">
          <input
            type="number"
            id="text-max-cal"
            name="text-max-cal"
            value={ caloriesRange[ HIGH_INDEX ] }
            onChange={ (evt: ChangeEvent) => handleInputChange(evt, HIGH_INDEX) }
          />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>
      <RangeSlider
        rangeValue={ caloriesRange as number[] }
        min={ caloriesInfo?.min as number }
        max={ caloriesInfo?.max as number }
        onChange={ handleSliderChange }
      />
    </div>
  );
}

export default FilterCalories;
