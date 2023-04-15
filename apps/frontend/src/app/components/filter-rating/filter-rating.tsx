import { WorkoutQuery } from '@fit-friends/shared';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slider';
import { AppRoute, DEFAULT_RATING } from '../../utils/constants';
import { debounce } from '../../utils/helpers';

export interface FilterRatingProps {
  onChangeQuery: (value: WorkoutQuery) => void;
}

export function FilterRating({ onChangeQuery }: FilterRatingProps) {

  const { pathname } = useLocation();
  const [ ratingRange, setRatingRange ] = useState([ DEFAULT_RATING.MIN, DEFAULT_RATING.MAX ]);

  const handleSliderChange = (value: number[], index: number): void => {
    setRatingRange((prevState) => {
      prevState[ index ] = value[ index ];
      return [ ...prevState ];
    });
    setQuery();
  };

  const setQuery = () => {
    debounce(onChangeQuery)({ ratingRange: ratingRange as number[] });
  };

  const classPrefix = pathname.includes(AppRoute.CustomerWorkoutCatalog) ? 'gym-catalog' : 'my-training';

  return (
    <div className={ `${classPrefix}-form__block ${classPrefix}-form__block--raiting` }>
      <h4 className={ `${classPrefix}-form__block-title` }>Рейтинг</h4>
      <Slider
        className='range-slider'
        min={ DEFAULT_RATING.MIN }
        max={ DEFAULT_RATING.MAX }
        onChange={ handleSliderChange }
        value={ ratingRange }
        renderThumb={ (props, state) => <div { ...props }><span>{ state.valueNow }</span></div> }
        pearling
      />
    </div>
  );
}

export default FilterRating;
