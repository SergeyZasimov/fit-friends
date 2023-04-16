import { Locations, ProfileQuery } from '@fit-friends/shared';
import { ChangeEvent, useState } from 'react';
import { checkValueInCollection } from '../../utils/helpers';

const LOCATION_QUANTITY = 4;

export interface FilterLocationProps {
  queryValue: string[];
  onQueryChange: (value: ProfileQuery) => void;
}

export function FilterLocation({ queryValue, onQueryChange }: FilterLocationProps) {

  const [ offset, setOffset ] = useState(LOCATION_QUANTITY);

  const handleLocationChange = (evt: ChangeEvent) => {
    const value = (evt.target as HTMLInputElement).value;
    onQueryChange({ location: checkValueInCollection(queryValue, value) });
  };

  return (
    <div className="user-catalog-form__block user-catalog-form__block--location">
      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
      <ul className="user-catalog-form__check-list">
        {
          Locations.slice(0, offset).map((location) => (
            <li className="user-catalog-form__check-list-item" key={ location }>
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={ location }
                    name="location"
                    onChange={ handleLocationChange }
                    checked={ queryValue.includes(location) }
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg></span><span className="custom-toggle__label">{ location }</span>
                </label>
              </div>
            </li>
          ))
        }
      </ul>
      {
        offset !== Locations.length &&
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={ () => setOffset(Locations.length) }
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

export default FilterLocation;
