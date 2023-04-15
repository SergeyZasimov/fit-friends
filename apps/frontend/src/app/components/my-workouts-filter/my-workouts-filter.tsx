import { TrainingTimes, WorkoutQuery } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { fetchWorkouts, fetchWorkoutsInfo } from '../../store/features/workout/api-actions';
import { useAppDispatch } from '../../store/store.hooks';
import { checkValueInCollection, createQueryString } from '../../utils/helpers';
import FilterCalories from '../filter-calories/filter-calories';
import FilterPrice from '../filter-price/filter-price';
import FilterRating from '../filter-rating/filter-rating';


export function MyWorkoutsFilter() {

  const dispatch = useAppDispatch();

  const [ query, setQuery ] = useState<WorkoutQuery>({});

  useEffect(() => {
    dispatch(fetchWorkoutsInfo());
  }, []);

  useEffect(() => {
    const queryString = createQueryString(query);
    dispatch(fetchWorkouts(queryString));
  }, [ query ]);

  const handleChangeQuery = (value: WorkoutQuery) => {
    setQuery({ ...query, ...value });
  };

  const handleTrainingTypeChange = (item: string) => {
    let newValues: string[];
    if (query.trainingTime) {
      newValues = checkValueInCollection(query.trainingTime, item);
    } else {
      newValues = [ item ];
    }
    setQuery({ ...query, trainingTime: newValues });
  };

  return (
    <form className="my-training-form__form">
      <FilterPrice
        onChangeQuery={ handleChangeQuery }
      />
      <FilterCalories onChangeQuery={ handleChangeQuery } />
      <FilterRating onChangeQuery={ handleChangeQuery } />
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <ul className="my-training-form__check-list">
          {
            TrainingTimes.map((item) => (
              <li className="my-training-form__check-list-item" key={ item }>
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={ item }
                      name="trainingTime"
                      checked={ query.trainingTime?.includes(item) }
                      onChange={ () => handleTrainingTypeChange(item) }
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">{ item }</span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </form>
  );
}

export default MyWorkoutsFilter;
