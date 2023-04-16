import { ProfileQuery, TrainingTypes } from '@fit-friends/shared';
import { ChangeEvent, useState } from 'react';
import { checkValueInCollection } from '../../utils/helpers';

const TRAINING_TYPE_QUANTITY = 4;

export interface FilterTrainingTypeProps {
  queryValue: string[];
  onQueryChange: (value: ProfileQuery) => void;
}

export function FilterTrainingType({ queryValue, onQueryChange }: FilterTrainingTypeProps) {

  const [ offset, setOffset ] = useState(TRAINING_TYPE_QUANTITY);

  const handleTrainingTypeChange = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    onQueryChange({ trainingType: checkValueInCollection(queryValue, value) });
  };

  return (
    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
      <h4 className="user-catalog-form__block-title">Специализация</h4>
      <ul className="user-catalog-form__check-list">
        { TrainingTypes.slice(0, offset).map(type => (
          <li className="user-catalog-form__check-list-item" key={ type }>
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  value={ type }
                  name="trainingType"
                  checked={ queryValue.includes(type) }
                  onChange={ handleTrainingTypeChange } />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span><span className="custom-toggle__label capitalize">{ type }</span>
              </label>
            </div>
          </li>
        )) }
      </ul>
      {
        offset !== TrainingTypes.length &&
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={ () => setOffset(TrainingTypes.length) }
        >
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      }
    </div>
  );
}

export default FilterTrainingType;
