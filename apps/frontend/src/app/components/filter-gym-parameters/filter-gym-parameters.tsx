import { GymParameters, QuerySportGym } from '@fit-friends/shared';
import { ChangeEvent } from 'react';
import { checkValueInCollection } from '../../utils/helpers';

export interface FilterGymParametersProps {
  queryValue: string[],
  onQueryChange: (value: QuerySportGym) => void;
}

export function FilterGymParameters({ queryValue, onQueryChange }: FilterGymParametersProps) {

  const handleParametersChange = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    onQueryChange({ parameters: checkValueInCollection(queryValue, value) });
  };

  return (
    <ul className="gym-hall-form__check-list">
      { GymParameters.map(param => (
        <li className="gym-hall-form__check-list-item" key={ param }>
          <div className="custom-toggle custom-toggle--checkbox">
            <label>
              <input
                type="checkbox"
                value={ param }
                name="parameters"
                onChange={ handleParametersChange }
              />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span>
              <span className="custom-toggle__label">{ param }</span>
            </label>
          </div>
        </li>
      )) }
    </ul>
  );
}

export default FilterGymParameters;
