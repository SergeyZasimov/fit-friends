import { SortType, TrainingTypes } from '@fit-friends/shared';
import { useEffect } from 'react';
import FilterCalories from '../../../components/filter-calories/filter-calories';
import FilterPrice from '../../../components/filter-price/filter-price';
import FilterRating from '../../../components/filter-rating/filter-rating';
import { useWorkoutsQuery } from '../../../hooks/use-workouts-query';
import { fetchWorkoutsInfo } from '../../../store/features/workout/api-actions';
import { getWorkoutsPriceInfo } from '../../../store/features/workout/workout-slice';
import { useAppDispatch, useAppSelector } from '../../../store/store.hooks';

export function CustomerTrainingCatalogFilter() {

  const dispatch = useAppDispatch();
  const priceInfo = useAppSelector(getWorkoutsPriceInfo);
  useEffect(() => {
    dispatch(fetchWorkoutsInfo());
  }, []);

  const { handleChangeQuery, handleTrainingTypeChange, handleSortChange, handleFreeWorkoutClick } = useWorkoutsQuery();

  return (
    <form className="gym-catalog-form__form">
      <div className='gym-catalog-form__block gym-catalog-form__block--price'>
        <h4 className='gym-catalog-form__block-title'>Цена, ₽</h4>
        <FilterPrice onChangeQuery={ handleChangeQuery } priceInfo={ priceInfo } />
      </div>
      <FilterCalories onChangeQuery={ handleChangeQuery } />
      <FilterRating onChangeQuery={ handleChangeQuery } />
      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <ul className="gym-catalog-form__check-list">
          {
            TrainingTypes.map(type => (
              <li className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={ type }
                      name="trainingType"
                      onChange={ () => handleTrainingTypeChange(type) }
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">{ type }</span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          <label>
            <input
              type="radio"
              name="sort"
              onChange={ () => handleSortChange(SortType.Asc) }
            />
            <span className="btn-radio-sort__label" >Дешевле</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={ () => handleSortChange(SortType.Desc) }
            />
            <span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              onChange={ handleFreeWorkoutClick }
            />
            <span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default CustomerTrainingCatalogFilter;
